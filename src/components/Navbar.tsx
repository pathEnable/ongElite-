"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Home, Info, FolderGit2, Image as ImageIcon, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    const navigation = [
        { name: "Accueil", href: "/" },
        { name: "À Propos", href: "/about" },
        { name: "Projets", href: "/projects" },
        { name: "Galerie", href: "/galerie" },
        { name: "Contact", href: "/contact" },
    ]

    const pathname = usePathname()

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-auto py-4 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight">"ONG Brand"</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:items-center lg:gap-6">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-sm font-medium transition-colors hover:text-primary focus:outline-none rounded-sm px-2 py-1 ${pathname === item.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <ThemeToggle />
                    <Button asChild className="hover:scale-105 transition-transform">
                        <Link href="/don">Faire un don</Link>
                    </Button>
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Ouvrir menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetTitle className="text-left flex items-center gap-2 border-b pb-4">
                                <Image
                                    src="/logo.png"
                                    alt="Logo Les Élites de Demain"
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                                ONG ELIDe
                            </SheetTitle>
                            <div className="flex flex-col gap-6 mt-8">
                                <div className="flex flex-col gap-2">
                                    {navigation.map((item) => {
                                        const Icon = item.href === "/" ? Home :
                                            item.href === "/about" ? Info :
                                                item.href === "/projects" ? FolderGit2 :
                                                    item.href === "/galerie" ? ImageIcon :
                                                        Mail;
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`flex items-center gap-4 px-4 py-3 text-lg font-medium rounded-md transition-colors ${isActive
                                                    ? "bg-primary/10 text-primary"
                                                    : "hover:bg-muted hover:text-primary text-muted-foreground"
                                                    }`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <Icon className="h-5 w-5" />
                                                {item.name}
                                            </Link>
                                        )
                                    })}
                                </div>

                                <div className="border-t pt-6 space-y-4">
                                    <div className="flex items-center justify-between px-4">
                                        <span className="text-sm font-medium text-muted-foreground">Mode sombre</span>
                                        <ThemeToggle />
                                    </div>
                                    <Button className="w-full" size="lg" asChild onClick={() => setIsOpen(false)}>
                                        <Link href="/don">Faire un don</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}
