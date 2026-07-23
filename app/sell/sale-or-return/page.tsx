"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Phone } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import StatCounter from "@/components/ui/stat-counter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Required"),
  make: z.string().min(1, "Required"),
  model: z.string().min(1, "Required"),
  year: z.string().min(1, "Required"),
  mileage: z.string().min(1, "Required"),
  message: z.string().optional(),
  consent: z.boolean().optional(),
})

const promotionPlatforms = [
  "Car & Classic", "PistonHeads", "CarGurus", "Classic Cars For Sale",
  "Exchange & Mart", "Classic & Sports Car", "Classic Car Weekly", "Instagram", "Facebook"
]

export default function SaleOrReturnPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = () => {
    toast.success("Thank you. We'll be in touch within 24 hours to discuss consignment.")
    reset()
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-carbon py-24 md:py-32">
        <Container>
          <Reveal>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Consignment & Brokerage</span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">Sale or Return</h1>
            <p className="mt-4 max-w-2xl text-base text-chrome-lo">Professional classic & sports car consignment since 1989.</p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-20 md:py-28">
        <Reveal>
          <p className="max-w-3xl text-base leading-relaxed text-carbon/80">
            Since opening in 1989, Classic Chrome has provided a trusted, professional consignment and brokerage service for classic and sports cars. For over three decades we&apos;ve helped hundreds of clients sell their vehicles quickly, securely and at true market value — with many returning to us time and again.
          </p>
        </Reveal>

        {/* Problem / Solution */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="rounded-lg border border-graphite/10 bg-charcoal/5 p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">The Problem</span>
              <p className="mt-2 text-sm leading-relaxed text-muted">Selling privately can be time-consuming, stressful and uncertain.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-lg border border-graphite/10 bg-accent-2/5 p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-2">The Solution</span>
              <p className="mt-2 text-sm leading-relaxed text-muted">Our Sale or Return service removes the risk. Once we&apos;ve inspected your vehicle and agreed terms, we handle the entire process on your behalf — preparation, marketing, viewings and secure payment.</p>
            </div>
          </Reveal>
        </div>

        {/* How your car is presented */}
        <Reveal className="mt-16 rounded-lg border border-graphite/10 p-8 text-center">
          <p className="text-base leading-relaxed text-carbon/80">
            Professionally photographed and showcased on our website with up to 100 high-quality images and a dedicated video presentation.
          </p>
          <div className="mt-6 flex justify-center gap-12">
            <StatCounter value={100} label="Images" />
            <StatCounter value={1} label="Dedicated Video" />
          </div>
        </Reveal>

        {/* Where we promote */}
        <Reveal className="mt-16">
          <h3 className="font-display text-2xl tracking-tight mb-6">Where We Promote Your Car</h3>
          <p className="text-sm text-muted mb-4">Reaching thousands of engaged enthusiasts across the UK&apos;s top classic car platforms:</p>
          <div className="flex flex-wrap gap-2">
            {promotionPlatforms.map((p) => (
              <span key={p} className="rounded-full border border-graphite/20 px-4 py-2 text-xs font-medium text-muted">{p}</span>
            ))}
          </div>
        </Reveal>

        {/* Transparent Pricing & Rates */}
        <Reveal className="mt-16 rounded-lg border border-graphite/10 p-8">
          <h3 className="font-display text-2xl tracking-tight mb-4">Transparent Pricing & Fee Structure</h3>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-graphite/10 p-5 bg-charcoal/5">
              <h4 className="font-display text-lg font-bold text-accent">10% – 15% + VAT</h4>
              <p className="mt-1 text-xs text-muted">Commission rates tiered between 10%, 12.5%, and 15% + VAT depending on vehicle value, returning you maximum realistic market returns.</p>
            </div>
            <div className="rounded-lg border border-graphite/10 p-5 bg-charcoal/5">
              <h4 className="font-display text-lg font-bold text-accent">£350 + VAT</h4>
              <p className="mt-1 text-xs text-muted">Showroom Preparation Package including full detailing, high-resolution photography, and dedicated video presentation.</p>
            </div>
            <div className="rounded-lg border border-graphite/10 p-5 bg-charcoal/5">
              <h4 className="font-display text-lg font-bold text-accent">£30 + VAT / week</h4>
              <p className="mt-1 text-xs text-muted">Display, marketing, and comprehensive insurance cover while displayed at our Mortlake showroom.</p>
            </div>
          </div>
        </Reveal>

        {/* Why buyers prefer */}
        <Reveal className="mt-16 rounded-lg border border-graphite/10 bg-charcoal/5 p-8">
          <h3 className="font-display text-xl tracking-tight">Why Buyers Prefer a Specialist</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Most buyers prefer to purchase from a recognised specialist dealer for the provenance checks, warranties, finance options and part-exchange facilities we provide — all of which make your car more attractive and help achieve a stronger sale.
          </p>
        </Reveal>

        {/* CTA Form */}
        <Reveal className="mt-20 border-t border-graphite/10 pt-16">
          <h2 className="font-display text-3xl tracking-tight mb-8">Enquire About Sale or Return</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">First Name *</label><Input {...register("firstName")} className="mt-1" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Last Name *</label><Input {...register("lastName")} className="mt-1" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Email *</label><Input {...register("email")} type="email" className="mt-1" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Telephone *</label><Input {...register("phone")} className="mt-1" /></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Make *</label><Input {...register("make")} className="mt-1" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Model *</label><Input {...register("model")} className="mt-1" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Year *</label><Input {...register("year")} className="mt-1" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Mileage *</label><Input {...register("mileage")} className="mt-1" /></div>
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted">Message</label>
              <textarea {...register("message")} rows={3} className="mt-1 flex w-full rounded-lg border border-graphite/30 bg-transparent px-4 py-3 text-sm focus:border-chrome focus:outline-none focus:ring-1 focus:ring-chrome resize-none" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted">Photos</label>
              <div className="mt-1 rounded-lg border-2 border-dashed border-graphite/20 p-6 text-center text-sm text-muted">Drag & drop or click to upload photos (mock)</div>
            </div>
            <label className="flex items-start gap-2 text-sm text-muted">
              <input type="checkbox" {...register("consent")} className="mt-1" /> I&apos;d like to receive news and new arrivals
            </label>
            <Button type="submit" size="lg">Submit Enquiry</Button>
          </form>
          <p className="mt-6 text-sm text-muted">
            Call <a href="tel:02088768171" className="text-accent hover:underline">020 8876 8171</a> to discuss consignment.
          </p>
        </Reveal>
      </Container>
    </>
  )
}
