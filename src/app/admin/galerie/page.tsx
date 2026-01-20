import { db } from "@/db"
import { projects } from "@/db/schema"
import { GalleryManager } from "@/components/GalleryManager"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminGalleryPage() {
    const allProjects = await db.select({
        id: projects.id,
        title: projects.title,
        images: projects.images,
    }).from(projects)

    return (
        <div className="container py-12 px-4 md:px-6 max-w-5xl">
            <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Gestion de la Galerie</h1>
                    <p className="text-muted-foreground">
                        Ajoutez ou supprimez des photos pour les albums de vos projets.
                    </p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/admin/projects/new" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Retour aux projets
                    </Link>
                </Button>
            </div>

            <GalleryManager projects={allProjects} />
        </div>
    )
}
