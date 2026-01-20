"use client"

import { useState } from "react"
import { UploadButton } from "@/lib/uploadthing"
import { updateProjectGallery } from "@/app/actions/projects"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import Image from "next/image"
import { Loader2, Trash2 } from "lucide-react"

interface Project {
    id: number
    title: string
    images: any // jsonb
}

export function GalleryManager({ projects }: { projects: Project[] }) {
    const [selectedProjectId, setSelectedProjectId] = useState<string>("")
    const [isUpdating, setIsUpdating] = useState(false)

    const selectedProject = projects.find(p => p.id.toString() === selectedProjectId)
    const currentImages: string[] = Array.isArray(selectedProject?.images) ? selectedProject.images : []

    const handleAddImage = async (url: string) => {
        if (!selectedProjectId) return
        setIsUpdating(true)
        const newImages = [...currentImages, url]
        const result = await updateProjectGallery(Number(selectedProjectId), newImages)

        if (result.success) {
            toast.success("Image ajoutée")
        } else {
            toast.error("Erreur lors de l'ajout")
        }
        setIsUpdating(false)
    }

    const handleDeleteImage = async (index: number) => {
        if (!selectedProjectId) return
        setIsUpdating(true)
        const newImages = currentImages.filter((_, i) => i !== index)
        const result = await updateProjectGallery(Number(selectedProjectId), newImages)

        if (result.success) {
            toast.success("Image supprimée")
        } else {
            toast.error("Erreur lors de la suppression")
        }
        setIsUpdating(false)
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Sélectionner un projet</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select onValueChange={(value) => setSelectedProjectId(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Choisir un projet à modifier" />
                        </SelectTrigger>
                        <SelectContent>
                            {projects.map((p) => (
                                <SelectItem key={p.id} value={p.id.toString()}>
                                    {p.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {selectedProject && (
                <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Galerie de "{selectedProject.title}"</CardTitle>
                        <div className="flex items-center gap-4">
                            {isUpdating && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    if (res && res[0]) {
                                        handleAddImage(res[0].url)
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    toast.error(`Erreur d'upload: ${error.message}`)
                                }}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {currentImages.length > 0 ? (
                                currentImages.map((src, index) => (
                                    <div key={index} className="group relative aspect-square rounded-lg overflow-hidden border">
                                        <Image
                                            src={src}
                                            alt={`Gallery item ${index}`}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDeleteImage(index)}
                                                disabled={isUpdating}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                                    Aucune photo dans cet album.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
