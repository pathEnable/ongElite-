"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ImageLightboxProps {
    images: string[]
    initialIndex: number
    isOpen: boolean
    onClose: () => void
}

export function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) {
    const [currentIndex, setCurrentIndex] = React.useState(initialIndex)

    React.useEffect(() => {
        setCurrentIndex(initialIndex)
    }, [initialIndex])

    const goToNext = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const goToPrevious = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    // Handle keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return
            if (e.key === "ArrowRight") goToNext()
            if (e.key === "ArrowLeft") goToPrevious()
            if (e.key === "Escape") onClose()
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, images.length])

    if (!isOpen) return null

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center overflow-hidden">
                <DialogTitle className="sr-only">Visualisation de l'image</DialogTitle>

                <div className="relative w-full h-full flex items-center justify-center group">
                    {/* Main Image */}
                    <div className="relative w-full h-[80vh] md:h-[90vh] aspect-video">
                        <Image
                            src={images[currentIndex]}
                            alt={`Image ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Close Button (Overlay) */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-white hover:bg-white/20 z-50 rounded-full h-10 w-10 md:h-12 md:w-12"
                        onClick={onClose}
                    >
                        <X className="h-6 w-6 md:h-8 md:w-8" />
                    </Button>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full h-12 w-12 md:h-16 md:w-16 z-50 transition-opacity"
                                onClick={goToPrevious}
                            >
                                <ChevronLeft className="h-8 w-8 md:h-12 md:w-12" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full h-12 w-12 md:h-16 md:w-16 z-50 transition-opacity"
                                onClick={goToNext}
                            >
                                <ChevronRight className="h-8 w-8 md:h-12 md:w-12" />
                            </Button>
                        </>
                    )}

                    {/* Counter info */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
