"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, Gavel, Clock } from "lucide-react"
import type { AuctionLot } from "@/types/auction"
import { formatCompactPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useWatchlist } from "@/store/useWatchlist"
import Countdown from "@/components/ui/countdown"

interface LotCardProps {
  lot: AuctionLot
  className?: string
}

export default function LotCard({ lot, className = "" }: LotCardProps) {
  const watchlist = useWatchlist()
  const isWatched = watchlist.hasItem(lot.id)

  const statusBadge = {
    live: { label: "LIVE", variant: "accent" as const, dot: true },
    upcoming: { label: "Upcoming", variant: "outline" as const, dot: false },
    ended: { label: "Ended", variant: "sold" as const, dot: false },
  }[lot.status]

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-lg border border-graphite/10 bg-ivory transition-shadow hover:shadow-lg ${className}`}
      whileHover={{ y: -2 }}
    >
      <Link href={`/auctions/${lot.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={lot.images[0] || "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1280&q=80"}
            alt={lot.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.srcset = "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1280&q=80"
              target.src = "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1280&q=80"
            }}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <Badge
            variant={statusBadge.variant}
            className="absolute left-3 top-3 z-10"
          >
            {statusBadge.dot && (
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            )}
            {statusBadge.label}
          </Badge>
        </div>
      </Link>

      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between">
          <Link href={`/auctions/${lot.slug}`} className="block flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              Lot {lot.lotNumber}
            </p>
            <h3 className="mt-1 font-display text-lg leading-tight tracking-tight group-hover:text-accent transition-colors">
              {lot.title}
            </h3>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault()
              watchlist.toggleItem(lot.id)
            }}
            className="ml-3 mt-0.5 shrink-0 p-1 text-muted hover:text-accent transition-colors"
            aria-label={isWatched ? "Remove from watchlist" : "Add to watchlist"}
          >
            <Heart className={`h-5 w-5 transition-all ${isWatched ? "fill-accent text-accent" : ""}`} />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted">
              {lot.status === "ended" ? "Final Bid" : "Current Bid"}
            </p>
            <p className="font-display text-xl font-semibold">
              {formatCompactPrice(lot.currentBid)}
            </p>
          </div>
          <div className="text-xs text-muted">
            <span className="flex items-center gap-1">
              <Gavel className="h-3 w-3" /> {lot.bidCount} bids
            </span>
            {lot.status !== "ended" && (
              <span className="mt-1 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <Countdown targetDate={lot.status === "live" ? lot.endsAt : lot.startsAt} compact />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
