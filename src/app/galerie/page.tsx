import { db } from "@/db"
import { projects } from "@/db/schema"
import GalerieClient from "./GalerieClient"

export default async function GaleriePage() {
    const allProjects = await db.select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        cover: projects.imageUrl,
        images: projects.images,
    }).from(projects)

    // Map to the format expected by the client component
    const albums = allProjects.map(p => ({
        ...p,
        id: p.id.toString(),
    }))

    return <GalerieClient initialAlbums={albums} />
}
