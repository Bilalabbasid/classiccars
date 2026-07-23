"use client"

import Link from "next/link"
import { ChevronRight, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Required"),
  message: z.string().min(10, "At least 10 characters"),
  consent: z.boolean().optional(),
})

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = () => {
    toast.success("Message sent. We'll get back to you shortly.")
    reset()
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-carbon py-24 md:py-32">
        <Container>
          <Reveal>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Visit the Showroom</span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">Contact & Visit Us</h1>
            <p className="mt-4 max-w-2xl text-base text-chrome-lo">We look forward to welcoming you to Classic Chrome.</p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column - details */}
          <Reveal>
            <div className="space-y-6">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-sm text-muted">12 Sheen Lane, Mortlake, London SW14 8LN</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <a href="tel:02088768171" className="text-sm text-muted hover:text-accent transition-colors">020 8876 8171</a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:sales@classic-chrome.net" className="text-sm text-muted hover:text-accent transition-colors">sales@classic-chrome.net</a>
                </div>
              </div>
              <div className="flex gap-3">
                <MessageCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-medium">WhatsApp</h3>
                  <a href="https://wa.me/447881867040" target="_blank" className="text-sm text-muted hover:text-accent transition-colors">+44 7881 867040</a>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-medium">Opening Hours</h3>
                  <div className="text-sm text-muted space-y-0.5">
                    <p>Mon–Fri: 09:00–18:00</p>
                    <p>Sat: 09:00–15:00</p>
                    <p>Sun: By appointment</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg border border-graphite/10 bg-charcoal/5 p-6">
                <h3 className="font-medium text-sm">Getting Here</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Our showroom is located adjacent to Mortlake British Rail Station on Sheen Lane (B351), which runs between Richmond Park and the River Thames, just off the A205 South Circular Road. We&apos;re in the ULEZ zone but not the Congestion Charge zone — 5 minutes from the M4 and A3, 2 minutes from the South Circular, and 10 minutes from the end of the M3 (A316) into London. There&apos;s a BR Station car park behind our premises plus our own bays. GPS: 51.4677° N, 0.2667° W.
                </p>
              </div>

              {/* Social icons */}
              <div className="flex gap-4 text-xs text-muted">
                <a href="#" className="hover:text-accent transition-colors">Instagram</a>
                <a href="#" className="hover:text-accent transition-colors">Facebook</a>
                <a href="#" className="hover:text-accent transition-colors">X / Twitter</a>
                <a href="#" className="hover:text-accent transition-colors">YouTube</a>
              </div>
            </div>
          </Reveal>

          {/* Right column - form */}
          <Reveal direction="left">
            <h2 className="font-display text-2xl tracking-tight mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Message *</label>
                <textarea {...register("message")} rows={5} className="mt-1 flex w-full rounded-lg border border-graphite/30 bg-transparent px-4 py-3 text-sm focus:border-chrome focus:outline-none focus:ring-1 focus:ring-chrome resize-none" />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message as string}</p>}
              </div>
              <label className="flex items-start gap-2 text-sm text-muted">
                <input type="checkbox" {...register("consent")} className="mt-1" />
                I&apos;d like to receive news and new arrivals
              </label>
              <Button type="submit" size="lg" className="w-full">Send Message</Button>
            </form>
          </Reveal>
        </div>

        {/* Map */}
        <div className="mt-16 aspect-[21/9] overflow-hidden rounded-lg bg-charcoal/10 border border-graphite/10 flex items-center justify-center">
          <div className="text-center text-muted">
            <MapPin className="mx-auto h-8 w-8 mb-2" />
            <p className="text-sm">Google Maps — Classic Chrome Showroom</p>
            <p className="text-xs mt-1">12 Sheen Lane, Mortlake, London SW14 8LN</p>
            <p className="text-xs">GPS: 51.4677° N, 0.2667° W</p>
          </div>
        </div>
      </Container>
    </>
  )
}
