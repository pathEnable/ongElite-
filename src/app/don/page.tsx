"use client";

import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DonPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Merci pour votre générosité ! Nous vous contacterons prochainement avec plus de détails.");
  }

  return (
    <div className="container py-12 md:py-24 px-4 md:px-6 max-w-3xl">
      <div className="mb-10 text-center space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Faire un don</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Chaque contribution, même modeste, nous permet de financer des projets concrets sur le terrain :
          éducation, santé, accès à l&apos;eau potable et aide d&apos;urgence.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de don</CardTitle>
          <CardDescription>Ce formulaire est un exemple côté front. Il pourra être relié plus tard à une solution de paiement sécurisée.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Montant du don</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Button type="button" variant="outline">10 €</Button>
                <Button type="button" variant="outline">25 €</Button>
                <Button type="button" variant="outline">50 €</Button>
                <Button type="button" variant="outline">100 €</Button>
              </div>
              <Input type="number" min={1} placeholder="Autre montant" className="mt-2" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Fréquence</Label>
              <select
                id="frequency"
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                defaultValue="ponctuel"
              >
                <option value="ponctuel">Don ponctuel</option>
                <option value="mensuel">Don mensuel</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (optionnel)</Label>
              <Textarea id="message" placeholder="Précisez si vous souhaitez soutenir un projet particulier..." className="min-h-[120px]" />
            </div>

            <Button type="submit" className="w-full text-base py-6">Confirmer le don</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
