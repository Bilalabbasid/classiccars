"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import SectionHeading from "@/components/ui/section-heading"
import CarCard from "@/components/ui/car-card"
import { Button } from "@/components/ui/button"
import { getSoldCars } from "@/lib/data"

export default function SoldCarsPage() {
  const soldCars = getSoldCars()

  return (
    <>
      <Container className="pt-24 pb-10">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-carbon">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-carbon">Recently Sold</span>
        </div>
        <SectionHeading title="Recently Sold" intro="A selection of exceptional cars we have recently sold. Looking for something similar? Get in touch — we can help source your ideal car." className="mt-6" />
      </Container>
      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {soldCars.map((car, i) => (
            <Reveal key={car.id} delay={i * 0.06}><CarCard car={car} /></Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <p className="text-muted mb-4">Looking for something similar?</p>
          <Link href="/services/find-a-car"><Button variant="outline" size="lg">Source Me One Like This</Button></Link>
        </Reveal>
      </Container>
    </>
  )
}
