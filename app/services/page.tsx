import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ArrowRight, Phone, Mail, MessageCircle } from "lucide-react"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"

const services = [
  { title: "Find Me a Car", href: "/services/find-a-car", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&h=400&q=80", desc: "Can't see it in stock? We'll source it through our trade network." },
  { title: "Servicing & MOT", href: "/services/servicing", image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&h=400&q=80", desc: "On-site workshop servicing plus trusted marque specialists." },
  { title: "Valeting & Detailing", href: "/services/valeting", image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&h=400&q=80", desc: "Professional detailing at our Mortlake showroom." },
  { title: "Valuations", href: "/services/valuations", image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=600&h=400&q=80", desc: "Specialist insurance valuations with certificate." },
  { title: "Film & Photo Hire", href: "/services/film-photo-hire", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&h=400&q=80", desc: "Classic cars for film, TV and photoshoots." },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-carbon py-24 md:py-32">
        <Container>
          <Reveal>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Specialist Services</span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">Our Services</h1>
            <p className="mt-4 max-w-2xl text-base text-chrome-lo">
              Whether you need help finding a car, a professional valuation, expert detailing, servicing, or a car for film and photography — our team is here to help.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, i) => (
            <Reveal key={svc.href} delay={i * 0.08}>
              <Link href={svc.href} className="group block rounded-lg border border-graphite/10 overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={svc.image} alt={svc.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl tracking-tight group-hover:text-accent transition-colors">{svc.title}</h3>
                  <p className="mt-2 text-sm text-muted">{svc.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent">Explore <ArrowRight className="h-3 w-3" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Contact strip */}
        <Reveal className="mt-20 border-t border-graphite/10 pt-12 text-center">
          <p className="text-sm text-muted">Ready to get started? Contact our team today.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-muted">
            <a href="tel:02088768171" className="flex items-center gap-1.5 hover:text-accent transition-colors"><Phone className="h-4 w-4" /> 020 8876 8171</a>
            <a href="mailto:sales@classic-chrome.net" className="flex items-center gap-1.5 hover:text-accent transition-colors"><Mail className="h-4 w-4" /> sales@classic-chrome.net</a>
            <a href="https://wa.me/447881867040" target="_blank" className="flex items-center gap-1.5 hover:text-accent transition-colors"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          </div>
        </Reveal>
      </Container>
    </>
  )
}
