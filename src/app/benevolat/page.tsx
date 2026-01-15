"use client";

import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BenevolatPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Merci pour votre engagement ! Nous reviendrons vers vous pour échanger sur les possibilités de bénévolat.");
  }

  return (
    <div className="container py-12 md:py-24 px-4 md:px-6 max-w-3xl">
      <div className="mb-10 text-center space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Devenir bénévole</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Rejoignez une communauté de personnes engagées qui donnent de leur temps et de leurs compétences
          pour soutenir nos actions sur le terrain et à distance.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulaire de bénévolat</CardTitle>
          <CardDescription>Indiquez-nous vos disponibilités et vos domaines d&apos;intérêt pour que nous puissions vous proposer une mission adaptée.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <Label htmlFor="phone">Téléphone (optionnel)</Label>
              <Input id="phone" type="tel" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest">Domaines d&apos;intérêt</Label>
              <select
                id="interest"
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                defaultValue="terrain"
              >
                <option value="terrain">Actions sur le terrain</option>
                <option value="communication">Communication / réseaux sociaux</option>
                <option value="collecte">Collecte de fonds / événements</option>
                <option value="administratif">Support administratif</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Disponibilités</Label>
              <Textarea
                id="availability"
                placeholder="Ex : Soirs de semaine, week-ends, quelques heures par mois..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (optionnel)</Label>
              <Textarea
                id="message"
                placeholder="Parlez-nous un peu de vous et de ce qui vous motive à nous rejoindre."
                className="min-h-[120px]"
              />
            </div>

            <Button type="submit" className="w-full text-base py-6">Envoyer ma candidature</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
