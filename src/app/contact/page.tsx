"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Ici vous connecteriez un service d'envoi d'email ou une API backend
        alert("Merci pour votre message ! Nous vous répondrons bientôt.");
    }

    return (
        <div className="container py-12 md:py-24 px-4 md:px-6">
            <div className="text-center mb-16">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Contactez-nous</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Vous avez une question, vous souhaitez devenir bénévole ou partenaire ? N'hésitez pas à nous écrire.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Nos Coordonnées</CardTitle>
                            <CardDescription>Passez nous voir ou appelez-nous.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold">Adresse</h3>
                                    <p className="text-muted-foreground">OKEDAMA<br />Parakou, Bénin</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="font-semibold">Téléphone</h3>
                                    <p className="text-muted-foreground">+229 69 69 69 69</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-muted-foreground">contact@ong-elide.org</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="relative h-[300px] w-full rounded-xl overflow-hidden bg-muted border">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126839.06822361718!2d2.551717397750198!3d9.355152285642533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102506260ab5305f%3A0xc3c5457632617dfb!2sParakou%2C%20Benin!5e0!3m2!1sen!2sus!4v1710345678901!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Carte de localisation ONG Les Élites de Demain"
                        ></iframe>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Envoyez-nous un message</CardTitle>
                        <CardDescription>Remplissez le formulaire ci-dessous.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Prénom</Label>
                                    <Input id="firstName" placeholder="Jean" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Nom</Label>
                                    <Input id="lastName" placeholder="Dupont" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="jean.dupont@exemple.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Sujet</Label>
                                <Input id="subject" placeholder="Renseignement..." required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Votre message ici..."
                                    className="min-h-[150px]"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">Envoyer le message</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
