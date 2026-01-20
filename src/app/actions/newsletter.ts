'use server'

import { db } from "@/db";
import { newsletterSubscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { sendWelcomeEmail } from "@/lib/mail";

const newsletterSchema = z.object({
    email: z.string().email("Veuillez entrer une adresse email valide"),
});

export async function subscribeToNewsletter(formData: FormData) {
    const email = formData.get('email') as string;

    const validatedFields = newsletterSchema.safeParse({ email });

    if (!validatedFields.success) {
        return {
            success: false,
            message: validatedFields.error.flatten().fieldErrors.email?.[0] || "Erreur de validation"
        };
    }

    try {
        // Check if email already exists
        const existing = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.email, email)).limit(1);

        if (existing.length > 0) {
            return { success: true, message: "Vous êtes déjà inscrit à notre newsletter !" };
        }

        await db.insert(newsletterSubscriptions).values({ email });

        // Send welcome email (non-blocking)
        sendWelcomeEmail(email).catch(err => console.error('Silent email failure:', err));

        return { success: true, message: "Merci pour votre inscription à la newsletter !" };
    } catch (error) {
        console.error('Failed to subscribe to newsletter:', error);
        return { success: false, message: "Une erreur est survenue. Veuillez réessayer." };
    }
}
