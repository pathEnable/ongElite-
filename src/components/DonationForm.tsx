"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { processDonation } from "@/app/actions/donations";

interface Project {
    id: number;
    title: string;
}

interface DonationFormProps {
    projects: Project[];
    initialProjectId?: string | null;
}

export function DonationForm({ projects, initialProjectId }: DonationFormProps) {
    const [amount, setAmount] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedProjectName = initialProjectId ? projects.find(p => p.id === Number(initialProjectId))?.title : null;

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        try {
            const result = await processDonation(formData);
            if (result.success) {
                toast.success(result.message);
                setAmount("");
                (document.getElementById('donation-form') as HTMLFormElement)?.reset();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Une erreur inattendue est survenue.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="order-1 lg:order-2 shadow-xl border-t-4 border-t-primary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary fill-primary" />
                    Mon Don
                </CardTitle>
                <CardDescription>
                    {selectedProjectName
                        ? `Vous soutenez le projet : ${selectedProjectName}`
                        : "Choisissez un montant pour soutenir nos actions globales."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    action={handleSubmit}
                    id="donation-form"
                    className="space-y-6"
                >
                    <input type="hidden" name="projectId" value={initialProjectId || ""} />

                    <div className="space-y-4">
                        <Label>Montant du don (FCFA)</Label>
                        <div className="grid grid-cols-3 gap-3">
                            {['2000', '5000', '10000'].map((val) => (
                                <Button
                                    key={val}
                                    type="button"
                                    variant={amount === val ? "default" : "outline"}
                                    className={`h-12 text-lg hover:bg-primary/10 hover:border-primary ${amount === val ? 'bg-primary text-white' : ''}`}
                                    onClick={() => setAmount(val)}
                                >
                                    {val} FCFA
                                </Button>
                            ))}
                        </div>
                        <div className="relative">
                            <Input
                                type="number"
                                name="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Montant libre"
                                className="h-12 pl-10 text-lg"
                                required
                                min="1"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">FCFA</span>
                        </div>
                    </div>

                    {!initialProjectId && (
                        <div className="space-y-2">
                            <Label htmlFor="project-select">Affecter mon don à :</Label>
                            <select
                                id="project-select"
                                name="projectId"
                                className="w-full h-12 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue=""
                            >
                                <option value="">Actions les plus urgentes (Général)</option>
                                {projects.map((p) => (
                                    <option key={p.id} value={p.id}>Projet : {p.title}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="space-y-4 pt-4 border-t border-dashed">
                        <div className="space-y-2">
                            <Label htmlFor="donorName">Votre nom complet</Label>
                            <Input id="donorName" name="donorName" placeholder="Jean Dupont" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="donorEmail">Votre adresse email (pour le reçu)</Label>
                            <Input id="donorEmail" name="donorEmail" type="email" placeholder="jean.dupont@exemple.com" required />
                        </div>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg font-bold">
                        {isSubmitting ? "Traitement..." : "Confirmer mon don"}
                    </Button>

                    <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                        Transaction 100% sécurisée
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
