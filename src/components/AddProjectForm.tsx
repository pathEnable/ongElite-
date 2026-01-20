"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import { createProject } from "@/app/actions/projects";
import { Loader2 } from "lucide-react";
// If not we can alerting, but let's assume shadcn structure or use simple alert.
// Checking package.json I saw shadcn so toast should be standard but let's check directory later.
// For now I will use standard alert if toast is missing or I will create a simple feedback.

const formSchema = z.object({
    title: z.string().min(3, {
        message: "Le titre doit contenir au moins 3 caractères.",
    }),
    description: z.string().min(10, {
        message: "La description doit contenir au moins 10 caractères.",
    }),
    category: z.enum(["education", "sante", "environnement", "social", "urgence"] as const),
    goalAmount: z.string().min(1, "Le montant est requis"),
    imageUrl: z.string().optional(),
});

export function AddProjectForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            goalAmount: "",
            imageUrl: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("category", values.category);
        formData.append("goalAmount", values.goalAmount);
        if (values.imageUrl) {
            formData.append("imageUrl", values.imageUrl);
        }

        const result = await createProject(formData);

        if (result.success) {
            toast.success("Succès", {
                description: result.message || "Projet créé avec succès !",
            });
            form.reset();
        } else {
            toast.error("Erreur", {
                description: result.message || "Erreur lors de la création.",
            });
        }
        setIsSubmitting(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto p-6 border rounded-lg shadow-sm">

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel>Titre du projet</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Construction d'un puits" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Détaillez le projet..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Catégorie</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner une catégorie" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="education">Éducation</SelectItem>
                                        <SelectItem value="sante">Santé</SelectItem>
                                        <SelectItem value="environnement">Environnement</SelectItem>
                                        <SelectItem value="social">Social</SelectItem>
                                        <SelectItem value="urgence">Urgence</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="goalAmount"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Objectif financier (FCFA)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="5000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel>Image du projet</FormLabel>
                            <FormControl>
                                {/* Visual feedback for image upload */}
                                <div className="flex flex-col gap-4">
                                    {field.value && (
                                        <div className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border">
                                            <img src={field.value} alt="Preview" className="object-cover w-full h-full" />
                                        </div>
                                    )}
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            if (res && res[0]) {
                                                field.onChange(res[0].url);
                                            }
                                        }}
                                        onUploadError={(error: Error) => {
                                            alert(`ERROR! ${error.message}`);
                                        }}
                                    />
                                </div>
                            </FormControl>
                            <FormDescription>
                                Téléchargez une image représentative (Max 4MB).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Créer le projet
                </Button>
            </form>
        </Form>
    );
}
