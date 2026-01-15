"use client"

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Folder } from "lucide-react";

// Mock data for albums
const albums = [
  {
    id: "education",
    title: "Éducation",
    description: "Nos actions dans les écoles et lycées.",
    cover: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2604&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2604&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1427504743005-584343a7b6aa?q=80&w=2667&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2622&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop",
    ]
  },
  {
    id: "health",
    title: "Santé",
    description: "Campagnes de vaccination et soins.",
    cover: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584515933487-9bfa05d1f94d?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2832&auto=format&fit=crop",
    ]
  },
  {
    id: "environment",
    title: "Environnement",
    description: "Reboisement et protection de la nature.",
    cover: "https://images.unsplash.com/photo-1542601906990-24d4c16419d0?q=80&w=2574&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542601906990-24d4c16419d0?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop",
    ]
  },
  {
    id: "community",
    title: "Communauté",
    description: "Moments de partage et d'entraide.",
    cover: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2670&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2832&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop",
    ]
  }
];

export default function GaleriePage() {
  const [selectedAlbum, setSelectedAlbum] = useState<typeof albums[0] | null>(null);

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
            {selectedAlbum.images.map((src, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted group cursor-pointer"
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
          {albums.map((album) => (
            <div
              key={album.id}
              className="group relative cursor-pointer overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
              onClick={() => setSelectedAlbum(album)}
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={album.cover}
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
                    <span>{album.images.length} photos</span>
                  </div>
                </div>
                <p className="text-muted-foreground">{album.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
