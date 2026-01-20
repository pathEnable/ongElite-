import { db } from "@/db";
import { projects } from "@/db/schema";
import { DonationForm } from "@/components/DonationForm";
import { ShieldCheck, Zap } from "lucide-react";

export default async function DonatePage({ searchParams }: { searchParams: Promise<{ project?: string }> }) {
  const { project: projectId } = await searchParams;
  const allProjects = await db.select().from(projects);

  return (
    <div className="container py-12 md:py-24 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Faire un Don</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Votre générosité est le moteur de nos actions. Chaque don, petit ou grand, contribue à changer des vies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Reassurance Sidebar */}
        <div className="space-y-8 order-2 lg:order-1">
          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Don Sécurisé</h3>
            </div>
            <p className="text-muted-foreground">
              Vos données sont protégées et cryptées. Nous utilisons les standards de sécurité les plus élevés pour garantir la confidentialité de vos informations.
            </p>
          </div>

          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Impact Immédiat</h3>
            </div>
            <p className="text-muted-foreground">
              100% de votre don est alloué au projet de votre choix ou à nos actions les plus urgentes sur le terrain.
            </p>
          </div>

          <div className="p-8">
            <h4 className="font-bold mb-4">Foire aux questions</h4>
            <div className="space-y-4 text-sm">
              <details className="cursor-pointer group">
                <summary className="font-medium list-none flex justify-between items-center group-open:text-primary">
                  Puis-je obtenir un reçu fiscal ?
                  <span className="transition-transform group-open:rotate-180">↓</span>
                </summary>
                <p className="pt-2 text-muted-foreground italic">Oui, un accusé de réception vous est envoyé immédiatement par email. Votre reçu fiscal annuel sera envoyé en début d'année civile suivante.</p>
              </details>
              <details className="cursor-pointer group">
                <summary className="font-medium list-none flex justify-between items-center group-open:text-primary">
                  Comment mon don est-il utilisé ?
                  <span className="transition-transform group-open:rotate-180">↓</span>
                </summary>
                <p className="pt-2 text-muted-foreground italic">Le don est directement versé sur le compte de l'ONG et alloué selon les besoins prioritaires (écoles, santé, puits).</p>
              </details>
            </div>
          </div>
        </div>

        {/* Donation Form */}
        <DonationForm projects={allProjects} initialProjectId={projectId} />
      </div>
    </div>
  );
}
