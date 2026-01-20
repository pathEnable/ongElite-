import { db } from "@/db";
import { projects } from "@/db/schema";
import { ProjectsClient } from "@/components/ProjectsClient";

export default async function ProjectsPage() {
    const allProjects = await db.select().from(projects);

    // Transform DB data to match component expectations if needed,
    // or update the component to match DB schema.
    // The DB schema uses snake_case for some fields in DB but camelCase in TS definition which Drizzle handles.
    // We need to map 'goalAmount' and 'currentAmount' from string (decimal in DB) to number or string for display.

    const formattedProjects = allProjects.map(p => ({
        ...p,
        goalAmount: p.goalAmount.toString(),
        currentAmount: p.currentAmount?.toString() || "0",
    }));

    return (
        <div className="container py-12 md:py-24 px-4 md:px-6">
            <div className="text-center mb-10 md:mb-16">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Nos Projets</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Découvrez l'ensemble de nos actions sur le terrain. Grâce à vos dons, nous pouvons réaliser ces
                    projets et changer des vies.
                </p>
            </div>

            <ProjectsClient initialProjects={formattedProjects} />
        </div>
    );
}

