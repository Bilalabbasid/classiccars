"use client"

import Link from "next/link"
import Image from "next/image"
import { use } from "react"
import { ChevronRight, Phone, Mail, Check, Camera, SprayCan, Search, Wrench, Star, Car } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ServiceKey = "find-a-car" | "servicing" | "valeting" | "valuations" | "film-photo-hire"

const baseSchema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Required"),
})

interface PageProps { params: Promise<{ service: string }> }

export default function ServiceDetailPage({ params }: PageProps) {
  const { service } = use(params) as { service: ServiceKey }
  const { register: reg, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(baseSchema) })

  const onSubmit = () => {
    toast.success("Enquiry sent. We'll be in touch shortly.")
    reset()
  }

  // ---- FIND ME A CAR ----
  if (service === "find-a-car") {
    return (
      <>
        <section className="bg-carbon py-24 md:py-32">
          <Container>
            <Reveal>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Bespoke Sourcing</span>
              <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">Find Me a Car</h1>
              <p className="mt-4 max-w-2xl text-base text-chrome-lo">Looking for something specific? Let us find it for you.</p>
            </Reveal>
          </Container>
        </section>
        <Container className="py-20 md:py-28">
          <Reveal>
            <p className="max-w-3xl text-base leading-relaxed text-carbon/80">
              We pride ourselves on offering an interesting range of hand-picked cars of all makes and models. But if you&apos;re looking for a particular car we don&apos;t currently have in stock, we&apos;ll source it for you using our extensive trade contacts and client network. Complete the enquiry form and we&apos;ll begin the search.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <h3 className="font-display text-2xl tracking-tight mb-8">How It Works</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { num: "01", title: "Tell Us What You Want", desc: "Share your requirements — make, model, budget, colour — everything that matters to you." },
                { num: "02", title: "We Search Our Network", desc: "We tap into our extensive network of trade contacts, private collectors, and industry relationships across the UK and Europe." },
                { num: "03", title: "We Present Matched Cars", desc: "We present only cars that meet our exacting standards — inspected, verified, and ready for your consideration." },
              ].map((step, i) => (
                <div key={i} className="rounded-lg border border-graphite/10 p-6">
                  <span className="text-3xl font-display font-bold text-chrome">{step.num}</span>
                  <h4 className="mt-3 font-display text-lg">{step.title}</h4>
                  <p className="mt-1 text-xs text-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-20 border-t border-graphite/10 pt-16">
            <h2 className="font-display text-3xl tracking-tight mb-2">What Are You Looking For?</h2>
            <p className="text-sm text-muted mb-8">Tell us your ideal car and we&apos;ll start the search.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Name *</label><Input {...reg("name")} className="mt-1" /></div>
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Email *</label><Input {...reg("email")} type="email" className="mt-1" /></div>
              </div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Telephone *</label><Input {...reg("phone")} className="mt-1" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Make</label><Input name="make" className="mt-1" /></div>
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Model</label><Input name="model" className="mt-1" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Preferred Year Range</label><Input name="yearRange" className="mt-1" placeholder="e.g. 1965–1975" /></div>
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Budget Range</label><Input name="budget" className="mt-1" placeholder="£" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Transmission</label><Input name="transmission" className="mt-1" placeholder="Manual / Automatic" /></div>
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Colour Preference</label><Input name="colour" className="mt-1" /></div>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Additional Requirements</label>
                <textarea name="requirements" rows={3} className="mt-1 flex w-full rounded-lg border border-graphite/30 bg-transparent px-4 py-3 text-sm focus:border-chrome focus:outline-none focus:ring-1 focus:ring-chrome resize-none" />
              </div>
              <label className="flex items-start gap-2 text-sm text-muted">
                <input type="checkbox" className="mt-1" /> I&apos;d like to receive news and new arrivals
              </label>
              <Button type="submit" size="lg">Start My Search</Button>
            </form>
          </Reveal>
        </Container>
      </>
    )
  }

  // ---- SERVICING & MOT ----
  if (service === "servicing") {
    return (
      <>
        <section className="bg-carbon py-24 md:py-32">
          <Container>
            <Reveal>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Workshop</span>
              <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">Servicing & Mechanical Repairs</h1>
              <p className="mt-4 max-w-2xl text-base text-chrome-lo">Caring for your classic long after purchase.</p>
            </Reveal>
          </Container>
        </section>
        <Container className="py-20 md:py-28">
          <Reveal>
            <p className="max-w-3xl text-base leading-relaxed text-carbon/80">
              At Classic Chrome we take pride in helping customers maintain and care for their classic and sports cars long after purchase — many cars we&apos;ve sold return to us for servicing, maintenance and repairs over the years.
            </p>
          </Reveal>
          <Reveal className="mt-6">
            <p className="max-w-3xl text-base leading-relaxed text-carbon/80">
              We carry out routine servicing and minor mechanical repairs in our own on-site workshop, with the same precision and care that defines our classic car preparation. For more specialist work, restoration or MOT testing, we work with a trusted network of marque specialists and trade partners who share our commitment to quality.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="rounded-lg border border-graphite/10 p-8">
                <Wrench className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-display text-xl tracking-tight">In-House</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent-2" /> Routine servicing</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent-2" /> Minor mechanical repairs</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent-2" /> Pre-sale preparation</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-lg border border-graphite/10 p-8">
                <Star className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-display text-xl tracking-tight">Via Trusted Partners</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent-2" /> Specialist restoration</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent-2" /> MOT testing</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent-2" /> Marque-specific work</li>
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-16 rounded-lg border border-graphite/10 bg-charcoal/5 p-8">
            <p className="text-sm leading-relaxed text-muted">
              To arrange servicing, repairs or MOT work, call <a href="tel:02088768171" className="text-accent hover:underline">020 8876 8171</a> or email <a href="mailto:sales@classic-chrome.net" className="text-accent hover:underline">sales@classic-chrome.net</a> and we&apos;ll schedule your car into our workshop.
            </p>
          </Reveal>
          <Reveal className="mt-16 border-t border-graphite/10 pt-16">
            <h2 className="font-display text-3xl tracking-tight mb-2">Book Your Car In</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Name *</label><Input {...reg("name")} className="mt-1" /></div>
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Email *</label><Input {...reg("email")} type="email" className="mt-1" /></div>
              </div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Phone *</label><Input {...reg("phone")} className="mt-1" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Vehicle</label><Input name="vehicle" className="mt-1" placeholder="Make, Model, Year" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Service Needed</label><Input name="serviceNeeded" className="mt-1" placeholder="e.g. Annual service, MOT, brake pads" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Preferred Date</label><Input name="preferredDate" type="date" className="mt-1" /></div>
              <Button type="submit" size="lg">Book In</Button>
            </form>
          </Reveal>
        </Container>
      </>
    )
  }

  // ---- VALETING ----
  if (service === "valeting") {
    return (
      <>
        <section className="bg-carbon py-24 md:py-32">
          <Container>
            <Reveal>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Presentation</span>
              <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">Valeting & Detailing</h1>
              <p className="mt-4 max-w-2xl text-base text-chrome-lo">Specialist car valeting and detailing at our Mortlake showroom.</p>
            </Reveal>
          </Container>
        </section>
        <Container className="py-20 md:py-28">
          <Reveal>
            <p className="max-w-3xl text-base leading-relaxed text-carbon/80">
              We offer professional car valeting and detailing carried out by our experienced team at our Mortlake showroom, at competitive prices. Every car we prepare is presented to the same exacting standard that sets our stock apart.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src="https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&w=600&h=450&q=80" alt="Before detailing" fill sizes="50vw" className="object-cover" />
                <span className="absolute bottom-3 left-3 rounded-md bg-carbon/70 px-3 py-1 text-xs text-ivory">Before</span>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&h=450&q=80" alt="After detailing" fill sizes="50vw" className="object-cover" />
                <span className="absolute bottom-3 left-3 rounded-md bg-accent px-3 py-1 text-xs text-ivory">After</span>
              </div>
            </div>
          </Reveal>
          <Reveal className="mt-16">
            <h3 className="font-display text-2xl tracking-tight mb-6">What&apos;s Included</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {["Exterior hand wash & decontamination", "Machine polish & paint correction", "Interior deep clean", "Leather feed & protection", "Engine bay detailing", "Show-standard finish"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-graphite/10 px-4 py-3">
                  <SprayCan className="h-4 w-4 text-accent shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-20 border-t border-graphite/10 pt-16">
            <h2 className="font-display text-3xl tracking-tight mb-8">Interested? Contact Us</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Name *</label><Input {...reg("name")} className="mt-1" /></div>
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Email *</label><Input {...reg("email")} type="email" className="mt-1" /></div>
              </div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Phone *</label><Input {...reg("phone")} className="mt-1" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Vehicle</label><Input name="vehicle" className="mt-1" /></div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Message</label><textarea name="message" rows={3} className="mt-1 flex w-full rounded-lg border border-graphite/30 bg-transparent px-4 py-3 text-sm focus:border-chrome focus:outline-none focus:ring-1 focus:ring-chrome resize-none" /></div>
              <Button type="submit" size="lg">Send Enquiry</Button>
            </form>
          </Reveal>
        </Container>
      </>
    )
  }

  // ---- VALUATIONS ----
  if (service === "valuations") {
    return (
      <>
        <section className="bg-carbon py-24 md:py-32">
          <Container>
            <Reveal>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Insurance Valuations</span>
              <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">Classic Car Valuations</h1>
              <p className="mt-4 max-w-2xl text-base text-chrome-lo">Trusted specialist valuations for insurance — with certificate.</p>
            </Reveal>
          </Container>
        </section>
        <Container className="py-20 md:py-28">
          <Reveal>
            <p className="max-w-3xl text-base leading-relaxed text-carbon/80">
              Many classic car insurance providers and brokers now require annual or bi-annual valuations from a specialist dealer, due to ongoing fluctuations in the values of classic and collector cars. We&apos;ve provided this professional valuation service for many years and are trusted by both owners and insurers for our expertise and accuracy.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <div className="rounded-lg border-2 border-accent bg-accent/5 p-8 text-center md:p-10">
              <span className="font-display text-4xl font-bold tracking-tight">£40</span>
              <span className="ml-2 text-sm text-muted">+ VAT</span>
              <p className="mt-2 text-sm">Includes a comprehensive Valuation Certificate suitable for your insurance company.</p>
              <p className="mt-1 text-xs text-muted">By appointment — please bring your car to our Mortlake showroom.</p>
            </div>
          </Reveal>
          <Reveal className="mt-16">
            <div className="grid gap-4 sm:grid-cols-2">
              {["Required by many insurers", "Protects against under-insurance", "Reflects true current market value", "Carried out by specialists"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border border-graphite/10 px-4 py-3">
                  <Check className="h-4 w-4 text-accent-2 shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-20 border-t border-graphite/10 pt-16">
            <h2 className="font-display text-3xl tracking-tight mb-8">Book a Valuation</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Name *</label><Input {...reg("name")} className="mt-1" /></div>
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Email *</label><Input {...reg("email")} type="email" className="mt-1" /></div>
              </div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Phone *</label><Input {...reg("phone")} className="mt-1" /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Make</label><Input name="make" className="mt-1" /></div>
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Model</label><Input name="model" className="mt-1" /></div>
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Year</label><Input name="year" className="mt-1" /></div>
              </div>
              <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Preferred Date</label><Input name="preferredDate" type="date" className="mt-1" /></div>
              <Button type="submit" size="lg">Book Valuation</Button>
            </form>
            <p className="mt-4 text-sm text-muted">Or call <a href="tel:02088768171" className="text-accent hover:underline">020 8876 8171</a> to arrange an appointment.</p>
          </Reveal>
        </Container>
      </>
    )
  }

  // ---- FILM & PHOTO HIRE ----
  if (service === "film-photo-hire") {
    return (
      <>
        <section className="bg-carbon py-24 md:py-32">
          <Container>
            <Reveal>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Film · TV · Photoshoots</span>
              <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">Classic Cars for Film & Photography</h1>
              <p className="mt-4 max-w-2xl text-base text-chrome-lo">Our classic and sports cars are available to hire for films, television, videos and photoshoots.</p>
            </Reveal>
          </Container>
        </section>
        <Container className="py-20 md:py-28">
          <Reveal>
            <p className="max-w-3xl text-base leading-relaxed text-carbon/80">
              From period dramas to fashion editorials and brand campaigns, our beautifully presented classic and sports cars bring authentic character to any production. We can supply the right car for the era and the look you need, and arrange delivery, driving and positioning on location where required.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <h3 className="font-display text-2xl tracking-tight mb-6">Featured Hire Cars</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { img: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=400&h=300&q=80", name: "Jaguar E-Type Series 1" },
                { img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&h=300&q=80", name: "Porsche 356 Speedster" },
                { img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=400&h=300&q=80", name: "Mercedes 280SL Pagoda" },
              ].map((car) => (
                <div key={car.name} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image src={car.img} alt={car.name} fill sizes="33vw" className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-carbon/70 p-3">
                    <p className="text-xs text-ivory">{car.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-16">
            <h3 className="font-display text-2xl tracking-tight mb-8">How to Book</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { num: "01", title: "Tell Us Your Brief & Dates", desc: "Share your production details, era, and schedule." },
                { num: "02", title: "We Match the Right Car(s)", desc: "We select the perfect vehicle from our curated fleet." },
                { num: "03", title: "We Arrange Delivery & Support", desc: "Full logistics — transport, on-set handling, period-correct advice." },
              ].map((step, i) => (
                <div key={i} className="rounded-lg border border-graphite/10 p-6">
                  <span className="text-3xl font-display font-bold text-chrome">{step.num}</span>
                  <h4 className="mt-3 font-display text-lg">{step.title}</h4>
                  <p className="mt-1 text-xs text-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-20 border-t border-graphite/10 pt-16">
            <h2 className="font-display text-3xl tracking-tight mb-8">Enquire About Film & Photo Hire</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Name *</label><Input {...reg("name")} className="mt-1" /></div>
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Company / Production</label><Input name="company" className="mt-1" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Email *</label><Input {...reg("email")} type="email" className="mt-1" /></div>
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Phone *</label><Input {...reg("phone")} className="mt-1" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Shoot Dates</label><Input name="dates" className="mt-1" /></div>
                <div><label className="text-xs font-medium uppercase tracking-wider text-muted">Location</label><Input name="location" className="mt-1" /></div>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Brief / Requirements</label>
                <textarea name="brief" rows={3} className="mt-1 flex w-full rounded-lg border border-graphite/30 bg-transparent px-4 py-3 text-sm focus:border-chrome focus:outline-none focus:ring-1 focus:ring-chrome resize-none" />
              </div>
              <Button type="submit" size="lg">Send Enquiry</Button>
            </form>
            <p className="mt-4 text-sm text-muted">Call <a href="tel:02088768171" className="text-accent hover:underline">020 8876 8171</a> to discuss your production.</p>
          </Reveal>
        </Container>
      </>
    )
  }

  // Fallback
  return (
    <Container className="pt-24 pb-20 text-center">
      <h1 className="font-display text-3xl tracking-tight">Service Not Found</h1>
      <Link href="/services" className="mt-4 inline-block text-accent hover:underline">View all services</Link>
    </Container>
  )
}
