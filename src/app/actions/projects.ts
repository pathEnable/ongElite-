'use server'

import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const projectSchema = z.object({
    title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
    description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
    imageUrl: z.string().url("L'URL de l'image est invalide").optional().or(z.literal('')),
    category: z.enum(['education', 'sante', 'environnement', 'social', 'urgence']),
    goalAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Le montant doit être un nombre positif"),
});

export async function createProject(formData: FormData) {
    const rawData = {
        title: formData.get('title'),
        description: formData.get('description'),
        imageUrl: formData.get('imageUrl'),
        category: formData.get('category'),
        goalAmount: formData.get('goalAmount'),
    };

    const validatedFields = projectSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Erreur de validation des données"
        };
    }

    const { title, description, imageUrl, category, goalAmount } = validatedFields.data;

    // Generate a simple slug from title
    const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") + "-" + Date.now(); // Add timestamp to ensure uniqueness easily

    try {
        await db.insert(projects).values({
            title,
            slug,
            description,
            imageUrl: imageUrl || null,
            category,
            goalAmount: goalAmount, // Drizzle handles string -> decimal
            currentAmount: "0",
            status: 'active'
        });

        revalidatePath('/projects');
        return { success: true, message: "Projet créé avec succès !" };
    } catch (error) {
        console.error('Failed to create project:', error);
        return { success: false, message: "Une erreur est survenue lors de la création du projet." };
    }
}

export async function updateProjectGallery(projectId: number, images: string[]) {
    try {
        await db
            .update(projects)
            .set({ images })
            .where(eq(projects.id, projectId));

        revalidatePath('/galerie');
        revalidatePath('/projects');
        return { success: true, message: "Galerie mise à jour avec succès !" };
    } catch (error) {
        console.error('Failed to update gallery:', error);
        return { success: false, message: "Erreur lors de la mise à jour de la galerie." };
    }
}
