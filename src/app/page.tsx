import { HeroSection } from "@/components/HeroSection";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Users, Globe } from "lucide-react";

export default function Home() {
  const featuredProjects = [
    {
      title: "Éducation pour Tous",
      description: "Construction d'écoles et fourniture de matériel scolaire pour les enfants défavorisés.",
      imageUrl: "/projects/education.png",
      slug: "education-pour-tous",
    },
    {
      title: "Eau Potable & Santé",
      description: "Installation de puits et campagnes de vaccination dans les zones rurales.",
      imageUrl: "/projects/water.png",
      slug: "eau-potable-sante",
    },
    {
      title: "Protection de l'Environnement",
      description: "Programmes de reboisement et sensibilisation au changement climatique.",
      imageUrl: "/projects/environment.png",
      slug: "protection-environnement",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Mission Highlights */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Nos Objectifs</h2>
            <p className="mt-4 text-lg text-muted-foreground w-full max-w-2xl mx-auto">
              Contribuer au développement de l'homme et de son cadre de vie.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Bien-être Social</h3>
              <p className="text-muted-foreground">Soutien aux familles vulnérables et lutte contre la pauvreté.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Communauté</h3>
              <p className="text-muted-foreground">Renforcement des liens sociaux et entraide locale.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <Globe className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Impact Global</h3>
              <p className="text-muted-foreground">Actions coordonnées pour un changement à grande échelle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nos Projets Récents</h2>
              <p className="mt-2 text-lg text-muted-foreground">Découvrez nos actions sur le terrain.</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/projects">Voir tous les projets &rarr;</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button variant="ghost" asChild>
              <Link href="/projects">Voir tous les projets &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How to Help */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Comment nous aider ?</h2>
            <p className="mt-4 text-lg text-muted-foreground w-full max-w-2xl mx-auto">
              Que vous souhaitiez soutenir financièrement, donner de votre temps ou simplement prendre contact, chaque
              geste compte pour faire avancer nos actions.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-start rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Faire un don</h3>
              <p className="text-muted-foreground mb-4">
                Contribuez au financement de nos projets éducatifs, sanitaires et sociaux sur le terrain.
              </p>
              <Button asChild variant="outline">
                <Link href="/don">Soutenir nos actions</Link>
              </Button>
            </div>
            <div className="flex flex-col items-start rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Devenir bénévole</h3>
              <p className="text-muted-foreground mb-4">
                Engagez-vous à nos côtés, sur le terrain ou à distance, selon vos compétences et disponibilités.
              </p>
              <Button asChild variant="outline">
                <Link href="/benevolat">Rejoindre l&apos;équipe</Link>
              </Button>
            </div>
            <div className="flex flex-col items-start rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Devenir partenaire</h3>
              <p className="text-muted-foreground mb-4">
                Entreprises, institutions, associations : construisons ensemble des projets à fort impact.
              </p>
              <Button asChild variant="outline">
                <Link href="/contact">Discuter d&apos;un partenariat</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Prêt à faire une différence ?</h2>
          <p className="mx-auto max-w-[700px] text-lg mb-8 opacity-90">
            Votre soutien est essentiel pour nous permettre de continuer nos actions. Chaque don compte.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/don">Faire un don maintenant</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground hover:bg-primary-foreground/10 text-primary-foreground hover:text-primary-foreground" asChild>
              <Link href="/benevolat">Devenir bénévole</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
