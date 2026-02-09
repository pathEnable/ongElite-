"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Users, Globe2, HeartHandshake } from "lucide-react"
import { Button } from "@/components/ui/button"

const heroImages = [
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
]

export function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (heroImages.length <= 1) return

        const interval = window.setInterval(() => {
            setCurrentIndex((previous) => (previous + 1) % heroImages.length)
        }, 7000)

        return () => window.clearInterval(interval)
    }, [])

    return (
        <section className="relative flex min-h-[640px] flex-col justify-center overflow-hidden text-center md:min-h-[720px]">
            <div className="absolute inset-0 z-0 overflow-hidden">
                {heroImages.map((src, index) => (
                    <Image
                        key={src}
                        src={src}
                        alt=""
                        fill
                        priority={index === 0}
                        unoptimized
                        className={`object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}
                <div className="absolute inset-0 bg-black/75 dark:bg-black/80" />
            </div>

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center">
                <div className="w-full max-w-4xl rounded-3xl px-6 py-8 md:px-10 md:py-10 flex flex-col items-center gap-6">
                    <p className="inline-flex items-center rounded-full bg-white/10 px-5 py-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                        "ONG Brand"
                    </p>
                    <h1 className="text-[2.3rem] sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.1rem] font-extrabold leading-[1.1] tracking-tight max-w-4xl mx-auto text-white">
                        Le dynamisme d'une
                        <span className="block text-primary mt-1 md:mt-2">jeunesse engagée</span>
                    </h1>
                    <p className="mx-auto max-w-[720px] text-white/85 text-base md:text-lg lg:text-xl leading-relaxed">
                        Une communauté de jeunes dynamiques unis pour le développement de l'homme et de son cadre de vie.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row justify-center mt-4 w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6" asChild>
                            <Link href="/don">Faire un don</Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto text-lg px-8 py-6 border-white/60 bg-transparent text-white hover:bg-white/10"
                            asChild
                        >
                            <Link href="/benevolat">Devenir bénévole</Link>
                        </Button>
                    </div>
                    <div className="mt-6 w-full max-w-3xl text-sm text-white/80">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/30 px-4 py-3 backdrop-blur-sm">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                                    <HeartHandshake className="h-4 w-4 text-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="text-base font-semibold text-white leading-tight">+10 000</p>
                                    <p className="text-xs text-white/75">personnes accompagnées depuis la création de l&apos;ONG.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/30 px-4 py-3 backdrop-blur-sm">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                                    <Globe2 className="h-4 w-4 text-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="text-base font-semibold text-white leading-tight">15 pays</p>
                                    <p className="text-xs text-white/75">dans lesquels nous menons des programmes durables.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/30 px-4 py-3 backdrop-blur-sm">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                                    <Users className="h-4 w-4 text-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="text-base font-semibold text-white leading-tight">200+ bénévoles</p>
                                    <p className="text-xs text-white/75">engagés sur le terrain et à distance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
