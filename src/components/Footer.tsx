"use client"

import Link from "next/link"
import { MapPin, Mail, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container px-4 py-8 md:px-6 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Les Élites de Demain</h3>
                        <p className="text-sm text-muted-foreground">
                            Le dynamisme d'une jeunesse engagée. Contribuer au développement de l'homme et de son cadre de vie.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Liens Rapides</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/" className="hover:text-primary">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary">
                                    À Propos
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" className="hover:text-primary">
                                    Projets
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Contact</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                                <span>
                                    OKEDAMA<br />
                                    Parakou, Bénin
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 shrink-0" />
                                <span>contact@ong-espoir.org</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 shrink-0" />
                                <span>+229 69 69 69 69</span>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Newsletter</h4>
                        <p className="text-sm text-muted-foreground">
                            Inscrivez-vous pour recevoir nos dernières actualités.
                        </p>
                        <form
                            className="flex flex-col gap-2 sm:flex-row sm:items-center"
                            action={async (formData) => {
                                const { subscribeToNewsletter } = await import("@/app/actions/newsletter");
                                const { toast } = await import("sonner");
                                const result = await subscribeToNewsletter(formData);
                                if (result.success) {
                                    toast.success(result.message);
                                    (document.getElementById('newsletter-form') as HTMLFormElement)?.reset();
                                } else {
                                    toast.error(result.message);
                                }
                            }}
                            id="newsletter-form"
                        >
                            <Input
                                type="email"
                                name="email"
                                required
                                placeholder="Votre adresse email"
                                className="sm:max-w-xs"
                            />
                            <Button type="submit" className="w-full sm:w-auto">
                                S&apos;inscrire
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Les Élites de Demain. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    )
}
