"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Heart, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import Gallery from "@/components/ui/gallery"
import PriceTag from "@/components/ui/price-tag"
import SpecList from "@/components/ui/spec-list"
import EnquiryDialog from "@/components/ui/enquiry-dialog"
import CarCard from "@/components/ui/car-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useWatchlist } from "@/store/useWatchlist"
import { getRelatedCars } from "@/lib/data"
import type { Car } from "@/types/car"

export default function CarDetailClient({ car }: { car: Car }) {
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const watchlist = useWatchlist()
  const isWatched = watchlist.hasItem(car.id)
  const related = getRelatedCars(car)

  return (
    <>
      <Container className="pt-24 pb-10">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-carbon">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/cars" className="hover:text-carbon">Cars for Sale</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-carbon">{car.make} {car.model}</span>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <Reveal>
            <Gallery images={car.images} alt={`${car.make} ${car.model}`} />
          </Reveal>

          {/* Details panel */}
          <Reveal direction="left">
            <div className="lg:sticky lg:top-24">
              {car.badge && <Badge variant="accent" className="mb-3">{car.badge}</Badge>}
              <h1 className="font-display text-3xl leading-[1.05] tracking-tight md:text-4xl">
                {car.make} {car.model}
              </h1>
              <p className="mt-1 text-lg text-muted">{car.variant}</p>
              {car.strapline && <p className="mt-1 text-sm italic text-muted/70">{car.strapline}</p>}
              <div className="mt-4">
                <PriceTag price={car.price} status={car.status} size="lg" />
              </div>

              {/* Quick spec chips */}
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { label: "Year", value: String(car.year) },
                  { label: "Mileage", value: `${car.mileage.toLocaleString()} mi` },
                  { label: "Transmission", value: car.transmission },
                  { label: "Colour", value: car.colour },
                  { label: "BHP", value: String(car.bhp) },
                  { label: "0-62", value: car.zeroToSixty },
                ].map((chip) => (
                  <div key={chip.label} className="rounded-lg border border-graphite/10 bg-charcoal/5 px-3 py-2 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-muted">{chip.label}</p>
                    <p className="text-sm font-medium">{chip.value}</p>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={() => setEnquiryOpen(true)} size="lg">Enquire Now</Button>
                <Button variant="outline" size="lg">Request Call Back</Button>
                <button
                  onClick={() => watchlist.toggleItem(car.id)}
                  className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${isWatched ? "border-accent bg-accent/10 text-accent" : "border-graphite/20 text-muted hover:text-accent"}`}
                  aria-label={isWatched ? "Remove from watchlist" : "Add to watchlist"}
                >
                  <Heart className={`h-5 w-5 ${isWatched ? "fill-accent" : ""}`} />
                </button>
                <button className="flex h-11 w-11 items-center justify-center rounded-lg border border-graphite/20 text-muted hover:text-carbon transition-colors" aria-label="Share">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Key specs band */}
        <Reveal className="mt-16">
          <div className="grid grid-cols-3 gap-4 rounded-lg border border-graphite/10 p-6 sm:grid-cols-5 md:grid-cols-10">
            {[
              { l: "Year", v: car.year },
              { l: "Mileage", v: `${car.mileage.toLocaleString()} mi` },
              { l: "Engine", v: car.engineSize },
              { l: "BHP", v: car.bhp },
              { l: "Torque", v: car.torque },
              { l: "0-62", v: car.zeroToSixty },
              { l: "Top Speed", v: car.topSpeed },
              { l: "Fuel", v: car.fuel },
              { l: "Gears", v: car.transmission },
              { l: "Steering", v: car.steering },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted">{s.l}</p>
                <p className="text-sm font-medium">{s.v}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Description */}
        <Reveal className="mt-16">
          <h3 className="font-display text-2xl tracking-tight">About this {car.make}</h3>
          <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-carbon/80">
            {car.description.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        {/* Full specification */}
        <Reveal className="mt-16">
          <h3 className="font-display text-2xl tracking-tight mb-6">Full Specification</h3>
          <Accordion type="single" collapsible className="max-w-3xl">
            {car.specs.map((group, i) => (
              <AccordionItem key={i} value={group.group}>
                <AccordionTrigger>{group.group}</AccordionTrigger>
                <AccordionContent>
                  <dl className="grid gap-2">
                    {group.items.map((item) => (
                      <div key={item.label} className="flex items-baseline justify-between border-b border-graphite/5 pb-2">
                        <dt className="text-sm text-muted">{item.label}</dt>
                        <dd className="text-sm font-medium text-right">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        {/* Related cars */}
        {related.length > 0 && (
          <Reveal className="mt-20 border-t border-graphite/10 pt-16">
            <h3 className="font-display text-2xl tracking-tight mb-8">You Might Also Like</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((c) => (
                <CarCard key={c.id} car={c} />
              ))}
            </div>
          </Reveal>
        )}
      </Container>

      <EnquiryDialog
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        title={`Enquire: ${car.make} ${car.model}`}
        subject={`${car.make} ${car.model} ${car.variant}`}
      />
    </>
  )
}
