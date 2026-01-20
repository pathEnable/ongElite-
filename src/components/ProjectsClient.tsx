"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    imageUrl: string | null;
    category: string;
    status: string | null;
    goalAmount: string;
    currentAmount: string | null;
}

interface ProjectsClientProps {
    initialProjects: Project[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
    const [selectedTheme, setSelectedTheme] = useState<string>("tous");
    const [selectedStatus, setSelectedStatus] = useState<string>("tous");

    const filteredProjects = initialProjects.filter((project) => {
        const matchTheme = selectedTheme === "tous" || project.category === selectedTheme;
        const matchStatus = selectedStatus === "tous" || project.status === selectedStatus;
        return matchTheme && matchStatus;
    });

    return (
        <>
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-muted-foreground">
                    {filteredProjects.length} projet(s) correspondant à vos critères.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex flex-col gap-1 text-sm">
                        <span className="font-medium">Thème</span>
                        <select
                            className="min-w-[180px] rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            value={selectedTheme}
                            onChange={(event) => setSelectedTheme(event.target.value)}
                        >
                            <option value="tous">Tous les thèmes</option>
                            <option value="education">Éducation</option>
                            <option value="sante">Santé</option>
                            <option value="environnement">Environnement</option>
                            <option value="social">Social</option>
                            <option value="urgence">Urgence</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                        <span className="font-medium">Statut</span>
                        <select
                            className="min-w-[180px] rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            value={selectedStatus}
                            onChange={(event) => setSelectedStatus(event.target.value)}
                        >
                            <option value="tous">Tous les statuts</option>
                            <option value="en-cours">En cours</option>
                            <option value="termine">Terminé</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        imageUrl={project.imageUrl || "/placeholder.svg"}
                        slug={project.slug}
                    />
                ))}
            </div>
        </>
    );
}
