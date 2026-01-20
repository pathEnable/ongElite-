"use client"

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Folder } from "lucide-react";
import { ImageLightbox } from "@/components/ImageLightbox";

interface Album {
  id: string;
  title: string;
  description: string;
  cover: string | null;
  images: any; // jsonb
}

export default function GalerieClient({ initialAlbums }: { initialAlbums: Album[] }) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  // Convert jsonb images to string array
  const getImages = (album: Album) => {
    return Array.isArray(album.images) ? (album.images as string[]) : [];
  };

  return (
    <div className="container py-12 md:py-24 px-4 md:px-6">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Galerie</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez nos albums et collections de photos illustrant nos actions sur le terrain.
        </p>
      </div>

      {selectedAlbum ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSelectedAlbum(null)} className="gap-2 hover:bg-muted pl-0">
              <ArrowLeft className="h-4 w-4" />
              Retour aux albums
            </Button>
            <h2 className="text-2xl font-bold">{selectedAlbum.title}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getImages(selectedAlbum).map((src, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={src}
                  alt={`${selectedAlbum.title} photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {initialAlbums.map((album) => (
            <div
              key={album.id}
              className="group relative cursor-pointer overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
              onClick={() => setSelectedAlbum(album)}
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={album.cover || "/placeholder.svg"}
                  alt={album.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-medium px-4 py-2 border border-white/50 rounded-full backdrop-blur-sm">
                    Voir l'album
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{album.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Folder className="h-4 w-4" />
                    <span>{getImages(album).length} photos</span>
                  </div>
                </div>
                <p className="text-muted-foreground">{album.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAlbum && (
        <ImageLightbox
          images={getImages(selectedAlbum)}
          initialIndex={selectedImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
