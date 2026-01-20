import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag, Target, TrendingUp } from "lucide-react";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));

    if (!project) {
        notFound();
    }

    const goal = Number(project.goalAmount);
    const current = Number(project.currentAmount || 0);
    const percentage = Math.min(Math.round((current / goal) * 100), 100);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] w-full">
                <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="container px-4 text-center text-white">
                        <Badge variant="secondary" className="mb-4 uppercase tracking-wider">
                            {project.category}
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">{project.title}</h1>
                        <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                <span>Depuis le {project.createdAt?.toLocaleDateString('fr-FR')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag className="h-5 w-5 text-primary" />
                                <span className="capitalize">{project.category}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container py-12 md:py-20 px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 border-b pb-2">À propos du projet</h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                                {project.description}
                            </div>
                        </div>

                        {/* Impact / Gallery placeholder */}
                        <div className="bg-muted/30 rounded-2xl p-8 border border-border">
                            <h3 className="text-xl font-bold mb-4">Pourquoi ce projet ?</h3>
                            <p className="text-muted-foreground">
                                L'ONG Les Élites de Demain s'engage à travers ce projet pour apporter une solution concrète et durable
                                aux défis de notre communauté. Chaque euro investi sert directement la cause et fait l'objet d'un
                                suivi rigoureux.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar / Donation Status */}
                    <div className="space-y-6">
                        <div className="sticky top-24 p-8 rounded-2xl border bg-card shadow-sm space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm font-medium">
                                    <span className="flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-primary" />
                                        Collecté
                                    </span>
                                    <span>{percentage}%</span>
                                </div>
                                <Progress value={percentage} className="h-3" />
                                <div className="flex justify-between text-sm text-muted-foreground pt-1">
                                    <span>{current.toLocaleString('fr-FR')} FCFA</span>
                                    <span>Objectif: {goal.toLocaleString('fr-FR')} FCFA</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <div className="flex items-center gap-3">
                                    <Target className="h-10 w-10 text-primary bg-primary/10 p-2 rounded-full" />
                                    <div>
                                        <p className="text-sm font-medium">Objectif Final</p>
                                        <p className="text-2xl font-bold">{goal.toLocaleString('fr-FR')} FCFA</p>
                                    </div>
                                </div>

                                <Button size="lg" className="w-full text-lg h-14" asChild>
                                    <Link href={`/don?project=${project.id}`}>Faire un don</Link>
                                </Button>
                                <p className="text-xs text-center text-muted-foreground">
                                    Accusé de réception et reçu fiscal envoyé par email.
                                </p>
                            </div>

                            <div className="pt-6 border-t mt-6">
                                <h4 className="font-bold mb-4">Comment aider autrement ?</h4>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li>• Partager ce projet sur les réseaux</li>
                                    <li>• Devenir bénévole sur le terrain</li>
                                    <li>• Parrainer une action spécifique</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
