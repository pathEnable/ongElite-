'use server'

import { db } from "@/db";
import { donations, projects } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { sendDonationReceiptEmail } from "@/lib/mail";
import { revalidatePath } from "next/cache";

const donationSchema = z.object({
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1, "Le montant doit être d'au moins 1 FCFA"),
    donorName: z.string().min(2, "Le nom est requis"),
    donorEmail: z.string().email("Email invalide"),
    projectId: z.string().optional().nullable(),
});

export async function processDonation(formData: FormData) {
    const rawData = {
        amount: formData.get('amount'),
        donorName: formData.get('donorName'),
        donorEmail: formData.get('donorEmail'),
        projectId: formData.get('projectId'),
    };

    const validatedFields = donationSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Veuillez vérifier vos informations",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { amount, donorName, donorEmail, projectId } = validatedFields.data;
    const numericAmount = Number(amount);

    try {
        // 1. Transaction to ensure both donation and project update succeed
        await db.transaction(async (tx) => {
            // Record the donation
            await tx.insert(donations).values({
                amount: amount,
                donorName,
                donorEmail,
                projectId: projectId ? Number(projectId) : null,
                status: 'paid', // For this demo we assume payment is successful
            });

            // If tied to a project, update the project's currentAmount
            if (projectId) {
                await tx
                    .update(projects)
                    .set({
                        currentAmount: sql`${projects.currentAmount} + ${amount}`,
                    })
                    .where(eq(projects.id, Number(projectId)));
            }
        });

        // 2. Send receipt email (non-blocking)
        sendDonationReceiptEmail(donorEmail, donorName, numericAmount).catch(err => console.error('Silent email failure:', err));

        revalidatePath('/projects');
        revalidatePath(`/projects/${projectId}`); // revalidate specific project page

        return {
            success: true,
            message: "Merci infiniment ! Votre don a été enregistré et un reçu vous a été envoyé par email."
        };
    } catch (error) {
        console.error('Donation processing failed:', error);
        return { success: false, message: "Une erreur est survenue lors du traitement de votre don." };
    }
}
