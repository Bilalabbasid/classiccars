"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ArrowRight, Shield, Award, Banknote, CheckCircle2, Phone } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const sellSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Required"),
  make: z.string().min(1, "Required"),
  model: z.string().min(1, "Required"),
  year: z.string().min(1, "Required"),
  mileage: z.string().min(1, "Required"),
  priceHoped: z.string().optional(),
  message: z.string().min(10, "At least 10 characters").optional(),
  consent: z.boolean().optional(),
})

export default function SellPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(sellSchema),
  })

  const onSubmit = () => {
    toast.success("Thank you for your enquiry. Our team will be in touch within 24 hours.")
    reset()
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-carbon py-24 md:py-32">
        <Container>
          <Reveal>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Sell with Confidence</span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">
              Sell or Part Exchange Your Classic
            </h1>
            <p className="mt-4 max-w-2xl text-base text-chrome-lo">
              With over 36 years of experience in classic and sports car sales, Classic Chrome offers a trusted, transparent and straightforward way to sell your car.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-20 md:py-28">
        {/* Two routes */}
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <Link href="/sell/sale-or-return" className="group block rounded-lg border border-graphite/10 overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=800&h=450&q=80" alt="Sale or Return" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl tracking-tight">Sale or Return</h3>
                <p className="mt-2 text-sm text-muted">Let us market and sell your car on your behalf for the best possible return.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">Learn more <ArrowRight className="h-3 w-3" /></span>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/sell/part-exchange" className="group block rounded-lg border border-graphite/10 overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&h=450&q=80" alt="Part Exchange" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl tracking-tight">Part Exchange</h3>
                <p className="mt-2 text-sm text-muted">Trade your classic against a car from our stock, or one we source for you.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">Learn more <ArrowRight className="h-3 w-3" /></span>
              </div>
            </Link>
          </Reveal>
        </div>

        {/* Sell outright */}
        <Reveal className="mt-16 rounded-lg border border-graphite/10 bg-charcoal/5 p-8 md:p-10">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Sell Outright</span>
          <h3 className="mt-2 font-display text-2xl tracking-tight">Prefer a Clean, Immediate Sale?</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            We&apos;re always looking for high-quality classic and sports cars for our stock and for waiting clients. Tell us about your car and, if it&apos;s right for us, we&apos;ll make a no-obligation offer, arrange fast and secure payment, and handle the transfer of any private registration plates.
          </p>
        </Reveal>

        {/* Why sell with us */}
        <Reveal className="mt-16">
          <h3 className="font-display text-2xl tracking-tight mb-8">Why Sell With Classic Chrome?</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: "36+ Years", desc: "Of expertise in classic and sports car sales." },
              { icon: Shield, title: "Trusted Reputation", desc: "5.0★ rated specialist dealer." },
              { icon: Banknote, title: "Fast, Secure Payment", desc: "Cleared funds before collection." },
              { icon: CheckCircle2, title: "Handled End to End", desc: "From valuation to transfer." },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-graphite/10 p-5 text-center">
                <item.icon className="mx-auto h-8 w-8 text-accent" />
                <h4 className="mt-3 font-display text-lg">{item.title}</h4>
                <p className="mt-1 text-xs text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Valuation form */}
        <Reveal className="mt-20 border-t border-graphite/10 pt-16">
          <h2 className="font-display text-3xl tracking-tight mb-2">Tell Us About Your Car</h2>
          <p className="text-sm text-muted mb-8">Complete the form below and we&apos;ll get back to you promptly.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">First Name *</label>
                <Input {...register("firstName")} className="mt-1" />
                {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message as string}</p>}
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Last Name *</label>
                <Input {...register("lastName")} className="mt-1" />
                {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message as string}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Email *</label>
                <Input {...register("email")} type="email" className="mt-1" />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message as string}</p>}
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Telephone *</label>
                <Input {...register("phone")} className="mt-1" />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message as string}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Make *</label>
                <Input {...register("make")} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Model *</label>
                <Input {...register("model")} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Year *</label>
                <Input {...register("year")} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Mileage *</label>
                <Input {...register("mileage")} className="mt-1" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted">Price You're Hoping to Achieve</label>
              <Input {...register("priceHoped")} placeholder="£" className="mt-1" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted">Message</label>
              <textarea {...register("message")} rows={3} className="mt-1 flex w-full rounded-lg border border-graphite/30 bg-transparent px-4 py-3 text-sm focus:border-chrome focus:outline-none focus:ring-1 focus:ring-chrome resize-none" placeholder="Tell us about your car's history, condition, and any special features..." />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted">Photos</label>
              <div className="mt-1 rounded-lg border-2 border-dashed border-graphite/20 p-6 text-center text-sm text-muted">
                Drag & drop or click to upload photos (mock)
              </div>
            </div>
            <label className="flex items-start gap-2 text-sm text-muted">
              <input type="checkbox" {...register("consent")} className="mt-1" />
              I&apos;d like to receive news and new arrivals
            </label>
            <Button type="submit" size="lg">Submit Valuation Request</Button>
          </form>
          <p className="mt-6 text-sm text-muted">
            Alternatively, call our Sales Team on <a href="tel:02088768171" className="text-accent hover:underline">020 8876 8171</a>
          </p>
        </Reveal>
      </Container>
    </>
  )
}
