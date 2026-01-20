import { AddProjectForm } from "@/components/AddProjectForm";

export default function NewProjectPage() {
    return (
        <div className="container py-10 px-4 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Ajouter un Projet</h1>
                <p className="text-muted-foreground mt-2">
                    Remplissez ce formulaire pour publier un nouveau projet humanitaire sur le site.
                </p>
            </div>

            <AddProjectForm />
        </div>
    );
}
