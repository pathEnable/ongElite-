import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="container py-12 md:py-24 px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">Notre Histoire & Mission</h1>
                    <p className="text-lg text-muted-foreground mb-4">
                        Les Élites de Demain est une ONG constituée de jeunes dynamiques qui souhaitent mettre en œuvre leur dynamisme au service de la communauté. La jeunesse est d'une importance capitale dans le processus de développement d'un pays.
                    </p>
                    <p className="text-lg text-muted-foreground mb-4">
                        Notre objectif est de contribuer au développement de l'homme et de son cadre de vie à travers nos interventions dans les domaines qui riment avec nos objectifs.
                    </p>
                    <p className="text-lg font-semibold text-primary mb-6">
                        Notre slogan : Le dynamisme d'une jeunesse engagée.
                    </p>
                    <p className="text-lg text-muted-foreground mb-6">
                        Nous sommes confiants que nous aurons plus tard un monde meilleur et nos objectifs seront atteints.
                    </p>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Button size="lg" asChild>
                            <Link href="/projects">Découvrir nos actions</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/contact">Nous contacter</Link>
                        </Button>
                    </div>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl object-cover object-center lg:aspect-square">
                    {/* Placeholder for About Image */}
                    <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground">
                        <Image
                            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2674&auto=format&fit=crop"
                            alt="Equipe ONG"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-24">
                <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Notre Équipe</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Team Member 1 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-32 h-32 rounded-full bg-muted mb-4">
                            <User className="h-16 w-16 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground font-medium">Directrice Générale</p>
                    </div>
                    {/* Team Member 2 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-32 h-32 rounded-full bg-muted mb-4">
                            <User className="h-16 w-16 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground font-medium">Responsable Projets</p>
                    </div>
                    {/* Team Member 3 */}
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-32 h-32 rounded-full bg-muted mb-4">
                            <User className="h-16 w-16 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground font-medium">Coordinatrice Terrain</p>
                    </div>
                </div>
            </div>

            <div className="mt-24 border-t pt-16">
                <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Notre histoire</h2>
                <div className="mx-auto max-w-3xl space-y-8">
                    <div className="relative pl-8">
                        <div className="absolute left-0 top-1 h-full w-px bg-border" aria-hidden="true" />
                        <div className="absolute -left-1 top-1 h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
                        <p className="text-sm font-semibold text-primary">2010</p>
                        <h3 className="mt-1 text-lg font-semibold">Naissance de Les Élites de Demain</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Création de l&apos;organisation par un groupe de citoyens engagés, avec les premiers projets
                            d&apos;aide d&apos;urgence en Afrique de l&apos;Ouest.
                        </p>
                    </div>
                    <div className="relative pl-8">
                        <div className="absolute left-0 top-1 h-full w-px bg-border" aria-hidden="true" />
                        <div className="absolute -left-1 top-1 h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
                        <p className="text-sm font-semibold text-primary">2015</p>
                        <h3 className="mt-1 text-lg font-semibold">Lancement des programmes éducatifs</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Déploiement de nos premiers programmes d&apos;éducation pour les enfants défavorisés et
                            partenariat avec des écoles locales.
                        </p>
                    </div>
                    <div className="relative pl-8">
                        <div className="absolute left-0 top-1 h-full w-px bg-border" aria-hidden="true" />
                        <div className="absolute -left-1 top-1 h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
                        <p className="text-sm font-semibold text-primary">2020</p>
                        <h3 className="mt-1 text-lg font-semibold">Extension des actions de santé et d&apos;eau potable</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Mise en place de cliniques mobiles et de forages, ainsi que de campagnes de sensibilisation
                            aux enjeux de santé publique.
                        </p>
                    </div>
                    <div className="relative pl-8">
                        <div className="absolute left-0 top-1 h-full w-px bg-border" aria-hidden="true" />
                        <div className="absolute -left-1 top-1 h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
                        <p className="text-sm font-semibold text-primary">Aujourd&apos;hui</p>
                        <h3 className="mt-1 text-lg font-semibold">Une communauté engagée à l&apos;international</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Des milliers de bénéficiaires, des centaines de bénévoles et des projets durables dans
                            plusieurs pays, rendus possibles grâce au soutien de nos donateurs et partenaires.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
