"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Maximize } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface GalleryProps {
  images: string[]
  alt: string
  className?: string
}

export default function Gallery({ images, alt, className = "" }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + images.length) % images.length)
  }, [images.length])

  return (
    <div className={className}>
      {/* Main image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-graphite/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative h-full w-full"
          >
            <Image
              src={images[activeIndex]}
              alt={`${alt} - Image ${activeIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={() => goTo(activeIndex - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/80 text-carbon shadow-md hover:bg-ivory transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => goTo(activeIndex + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/80 text-carbon shadow-md hover:bg-ivory transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Fullscreen */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-carbon/40 text-ivory hover:bg-carbon/60 transition-colors"
          aria-label="Open fullscreen"
        >
          <Maximize className="h-4 w-4" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
              i === activeIndex ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`${alt} thumbnail ${i + 1}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] border-none bg-transparent p-0">
          <div className="relative flex items-center justify-center">
            <Image
              src={images[activeIndex]}
              alt={`${alt} - Image ${activeIndex + 1}`}
              width={1400}
              height={1050}
              className="max-h-[85vh] object-contain rounded-lg"
            />
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-ivory/80 text-carbon hover:bg-ivory transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-ivory/80 text-carbon hover:bg-ivory transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
