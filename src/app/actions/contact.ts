'use server'

import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { z } from "zod";
import { sendContactConfirmationEmail, sendAdminAlertEmail } from "@/lib/mail";

const contactSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Veuillez entrer une adresse email valide"),
    subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export async function sendContactMessage(formData: FormData) {
    const rawData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    };

    const validatedFields = contactSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Erreur de validation",
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await db.insert(contactMessages).values(validatedFields.data);

        // Send confirmation email (non-blocking)
        sendContactConfirmationEmail(validatedFields.data.email, validatedFields.data.name).catch(err => console.error('Silent email failure:', err));

        // Send admin alert (non-blocking)
        sendAdminAlertEmail(validatedFields.data).catch(err => console.error('Silent admin alert failure:', err));

        return { success: true, message: "Merci pour votre message ! Nous vous répondrons bientôt." };
    } catch (error) {
        console.error('Failed to send contact message:', error);
        return { success: false, message: "Une erreur est survenue lors de l'envoi du message." };
    }
}
