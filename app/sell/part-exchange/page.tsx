"use client"

import Link from "next/link"
import { ChevronRight, Calculator, FileCheck, Truck } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const schema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Required"),
  make: z.string().min(1, "Required"),
  model: z.string().min(1, "Required"),
  year: z.string().min(1, "Required"),
  mileage: z.string().min(1, "Required"),
  condition: z.string().optional(),
  priceHoped: z.string().optional(),
  interestedIn: z.string().optional(),
  message: z.string().optional(),
})

export default function PartExchangePage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = () => {
    toast.success("Thank you. We'll assess your part-exchange and get back to you shortly.")
    reset()
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-carbon py-24 md:py-32">
        <Container>
          <Reveal>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Trade & Upgrade</span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">Part Exchange</h1>
            <p className="mt-4 max-w-2xl text-base text-chrome-lo">A trusted, transparent and straightforward way to part exchange your classic.</p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-20 md:py-28">
        <Reveal>
          <p className="max-w-3xl text-base leading-relaxed text-carbon/80">
            If you&apos;re interested in one of the classic or sports cars we currently have in stock — or a specific model you&apos;d like us to source — you may be able to use your current car as a part exchange.
          </p>
        </Reveal>

        {/* What we handle */}
        <Reveal className="mt-16">
          <h3 className="font-display text-2xl tracking-tight mb-8">What We Handle</h3>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Calculator, title: "Fair, Competitive Valuation", desc: "Accurate market assessment by specialists." },
              { icon: FileCheck, title: "Settlement of Outstanding Finance", desc: "We manage the paperwork end to end." },
              { icon: Truck, title: "Collection Arranged", desc: "For your convenience, we can collect from you." },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-graphite/10 p-6 text-center">
                <item.icon className="mx-auto h-8 w-8 text-accent" />
                <h4 className="mt-3 font-medium text-sm">{item.title}</h4>
                <p className="mt-1 text-xs text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted text-center">Our goal is to make the process smooth, transparent and as hassle-free as possible.</p>
        </Reveal>

        {/* Prefer to sell outright */}
        <Reveal className="mt-16 rounded-lg border border-graphite/10 bg-charcoal/5 p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Prefer to Sell Outright?</span>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            We&apos;re always looking for high-quality classics. Complete the form with your make, model, year, mileage and photographs; if your car matches what we&apos;re looking for we&apos;ll provide a no-obligation offer, arrange fast secure payment, and transfer any private plates if needed.
          </p>
        </Reveal>

        {/* CTA Form */}
        <Reveal className="mt-20 border-t border-graphite/10 pt-16">
          <h2 className="font-display text-3xl tracking-tight mb-8">Part Exchange Enquiry</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Name *</label><Input {...register("name")} className="mt-1" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Email *</label><Input {...register("email")} type="email" className="mt-1" /></div>
            </div>
            <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Telephone *</label><Input {...register("phone")} className="mt-1" /></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Make *</label><Input {...register("make")} className="mt-1" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Model *</label><Input {...register("model")} className="mt-1" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Year *</label><Input {...register("year")} className="mt-1" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Mileage *</label><Input {...register("mileage")} className="mt-1" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Condition</label><Input {...register("condition")} className="mt-1" placeholder="Excellent / Good / Fair" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Price Hoped For</label><Input {...register("priceHoped")} placeholder="£" className="mt-1" /></div>
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted">Which of Our Cars Are You Interested In? (optional)</label>
              <Input {...register("interestedIn")} className="mt-1" placeholder="e.g. Ferrari 308 GTB" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted">Message</label>
              <textarea {...register("message")} rows={3} className="mt-1 flex w-full rounded-lg border border-graphite/30 bg-transparent px-4 py-3 text-sm focus:border-chrome focus:outline-none focus:ring-1 focus:ring-chrome resize-none" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted">Photos</label>
              <div className="mt-1 rounded-lg border-2 border-dashed border-graphite/20 p-6 text-center text-sm text-muted">Drag & drop or click to upload photos (mock)</div>
            </div>
            <Button type="submit" size="lg">Submit Part Exchange Enquiry</Button>
          </form>
          <p className="mt-6 text-sm text-muted">
            Or call our Sales Team on <a href="tel:02088768171" className="text-accent hover:underline">020 8876 8171</a>
          </p>
        </Reveal>
      </Container>
    </>
  )
}
