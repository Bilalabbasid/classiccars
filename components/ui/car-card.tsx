"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import type { Car } from "@/types/car"
import { formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useWatchlist } from "@/store/useWatchlist"

interface CarCardProps {
  car: Car
  className?: string
}

export default function CarCard({ car, className = "" }: CarCardProps) {
  const watchlist = useWatchlist()
  const isWatched = watchlist.hasItem(car.id)
  const statusLabel =
    car.status === "sold"
      ? "Sold"
      : car.status === "under-offer"
      ? "Under Offer"
      : car.status === "reserved"
      ? "Reserved"
      : null

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-lg border border-graphite/10 bg-ivory transition-shadow hover:shadow-lg ${className}`}
      whileHover={{ y: -2 }}
    >
      <Link href={`/cars/${car.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={car.images[0]}
            alt={`${car.make} ${car.model} ${car.variant}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {/* Chrome shine */}
          <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-[200%] transition-transform duration-1000" />

          {/* Status badge */}
          {statusLabel && (
            <div className={`absolute left-3 top-3 z-10 ${car.status === "sold" ? "bg-accent text-ivory" : "bg-gold text-carbon"} rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-wider`}>
              {statusLabel}
            </div>
          )}
          {car.badge && !statusLabel && (
            <Badge variant="accent" className="absolute left-3 top-3 z-10 bg-ivory/90 text-carbon">
              {car.badge}
            </Badge>
          )}
        </div>
      </Link>

      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between">
          <Link href={`/cars/${car.slug}`} className="block flex-1">
            <h3 className="font-display text-lg leading-tight tracking-tight group-hover:text-accent transition-colors">
              {car.make} {car.model}
            </h3>
            <p className="mt-0.5 text-sm text-muted">{car.variant}</p>
            {car.strapline && (
              <p className="mt-1 text-xs italic text-muted/70">{car.strapline}</p>
            )}
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault()
              watchlist.toggleItem(car.id)
            }}
            className="ml-3 mt-0.5 shrink-0 p-1 text-muted hover:text-accent transition-colors"
            aria-label={isWatched ? "Remove from watchlist" : "Add to watchlist"}
          >
            <Heart className={`h-5 w-5 transition-all ${isWatched ? "fill-accent text-accent" : ""}`} />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span>{car.year}</span>
          <span>·</span>
          <span>{car.mileage.toLocaleString()} mi</span>
          <span>·</span>
          <span>{car.transmission}</span>
        </div>

        <div className="mt-3">
          <span className="font-display text-xl font-semibold tracking-tight">
            {formatPrice(car.price)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
