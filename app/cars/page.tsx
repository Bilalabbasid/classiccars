"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import SectionHeading from "@/components/ui/section-heading"
import CarCard from "@/components/ui/car-card"
import FilterBar from "@/components/ui/filter-bar"
import { getAvailableCars } from "@/lib/data"
import type { Car } from "@/types/car"

export default function CarsPage() {
  const [make, setMake] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const allCars = getAvailableCars()
  const makes = [...new Set(allCars.map((c) => c.make))].sort()

  const filtered = useMemo(() => {
    let result = [...allCars]
    if (make !== "all") result = result.filter((c) => c.make === make)
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0)); break
      case "price-desc": result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0)); break
      case "year-desc": result.sort((a, b) => b.year - a.year); break
      case "year-asc": result.sort((a, b) => a.year - b.year); break
      default: result.sort((a, b) => b.year - a.year); break
    }
    return result
  }, [allCars, make, sortBy])

  return (
    <>
      {/* HERO HEADER */}
      <section className="relative bg-carbon py-20 md:py-28 overflow-hidden text-ivory">
        <div className="absolute inset-0 z-0">
          <Image
            src="/carssectionheroimg.jpeg"
            alt="Classic Chrome Stock"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/60 to-carbon/40" />
        </div>
        <Container className="relative z-10">
          <div className="flex items-center gap-2 text-sm text-chrome-lo mb-4">
            <Link href="/" className="hover:text-ivory transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-chrome" />
            <span className="text-ivory">Cars for Sale</span>
          </div>
          <Reveal>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-chrome">Curated Collection</span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.05] tracking-tight">Current Stock</h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-chrome-lo">
              Browse our carefully curated collection of classic and sports cars available for immediate purchase.
            </p>
          </Reveal>
        </Container>
      </section>

      <FilterBar
        makes={makes}
        selectedMake={make}
        onMakeChange={setMake}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        resultCount={filtered.length}
      />

      <Container className="py-12">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted">No cars match your filters.</p>
            <button onClick={() => { setMake("all"); setSortBy("newest") }} className="mt-4 text-sm text-accent hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-6"}>
            {filtered.map((car, i) => (
              <Reveal key={car.id} delay={i * 0.04}>
                <CarCard car={car} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}
