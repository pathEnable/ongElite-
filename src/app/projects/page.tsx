"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";

const allProjects = [
    {
        title: "Éducation pour Tous",
        description: "Construction d'écoles et fourniture de matériel scolaire pour les enfants défavorisés.",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2604&auto=format&fit=crop",
        link: "#",
        theme: "education",
        status: "en-cours",
    },
    {
        title: "Eau Potable & Santé",
        description: "Installation de puits et campagnes de vaccination dans les zones rurales.",
        imageUrl: "https://images.unsplash.com/photo-1574482620826-406ce75da93c?q=80&w=2669&auto=format&fit=crop",
        link: "#",
        theme: "sante",
        status: "en-cours",
    },
    {
        title: "Protection de l'Environnement",
        description: "Programmes de reboisement et sensibilisation au changement climatique.",
        imageUrl: "https://images.unsplash.com/photo-1542601906990-24d4c16419d0?q=80&w=2574&auto=format&fit=crop",
        link: "#",
        theme: "environnement",
        status: "en-cours",
    },
    {
        title: "Autonomisation des Femmes",
        description: "Formation professionnelle et micro-crédits pour les femmes entrepreneures.",
        imageUrl: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2670&auto=format&fit=crop",
        link: "#",
        theme: "social",
        status: "termine",
    },
    {
        title: "Aide Alimentaire d'Urgence",
        description: "Distribution de vivres dans les zones touchées par la famine.",
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop",
        link: "#",
        theme: "urgence",
        status: "en-cours",
    },
    {
        title: "Soins Médicaux Mobiles",
        description: "Cliniques mobiles pour atteindre les villages isolés.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
        link: "#",
        theme: "sante",
        status: "termine",
    },
];

export default function ProjectsPage() {
    const [selectedTheme, setSelectedTheme] = useState<string>("tous");
    const [selectedStatus, setSelectedStatus] = useState<string>("tous");

    const filteredProjects = allProjects.filter((project) => {
        const matchTheme = selectedTheme === "tous" || project.theme === selectedTheme;
        const matchStatus = selectedStatus === "tous" || project.status === selectedStatus;
        return matchTheme && matchStatus;
    });

    return (
        <div className="container py-12 md:py-24 px-4 md:px-6">
            <div className="text-center mb-10 md:mb-16">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Nos Projets</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Découvrez l'ensemble de nos actions sur le terrain. Grâce à vos dons, nous pouvons réaliser ces
                    projets et changer des vies.
                </p>
            </div>

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
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </div>
    );
}
