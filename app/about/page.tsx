import Link from "next/link"
import { ChevronRight, Award, Shield, CheckCircle2 } from "lucide-react"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import StatCounter from "@/components/ui/stat-counter"

export default function AboutPage() {
  return (
    <Container className="pt-24 pb-20">
      <div className="flex items-center gap-2 text-sm text-muted mb-10">
        <Link href="/" className="hover:text-carbon">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-carbon">About</span>
      </div>
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">Est. 18th October 1989</span>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight">About Classic Chrome</h1>
          <p className="mt-6 text-lg leading-relaxed text-carbon/80">
            Since opening our doors on 18th October 1989, Classic Chrome has been dedicated to the restoration, preparation, and sale of exceptional Classic and Sports Cars. Founded by Garry Shortt, our story is rooted in a lifelong passion for British and European motoring excellence.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Garry&apos;s career began as an Engineering Apprentice at British Leyland in Cowley, Oxford. After 16 years with British Leyland and Austin Rover across their Service and Sales & Marketing divisions, Garry established Classic Chrome at our current site in Mortlake, South West London. Over the past three decades, together with Keith, we have become recognized as one of the UK&apos;s leading Classic & Sports Car specialists, renowned for our friendly approach, deep technical knowledge, and the impeccable presentation of our cars.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-3 gap-6 border-t border-graphite/10 pt-12">
          <StatCounter value={36} suffix="+" label="Years of Excellence" />
          <StatCounter value={5000} suffix="+" label="Cars Sold" />
          <StatCounter value={5.0} label="★ Google Rating (46 Reviews)" />
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="font-display text-2xl tracking-tight">Why Choose Classic Chrome?</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            We pride ourselves on our extensive hands-on experience across classic and performance marques. Each vehicle we offer must meet our exacting standards for provenance, history, and mechanical condition. Whether you&apos;re an experienced collector or a first-time classic owner, you&apos;ll find our approach personal, professional, and transparent.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-graphite/10 p-6 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-accent mb-3" />
            <h3 className="font-display text-lg">Road Tax & MOT Exempt</h3>
            <p className="mt-1 text-xs text-muted">Historic cars (40+ years old) qualify for tax & MOT exemption.</p>
          </div>
          <div className="rounded-lg border border-graphite/10 p-6 text-center">
            <Shield className="mx-auto h-8 w-8 text-accent mb-3" />
            <h3 className="font-display text-lg">ULEZ Exempt</h3>
            <p className="mt-1 text-xs text-muted">Drive freely across London&apos;s Ultra Low Emission Zone.</p>
          </div>
          <div className="rounded-lg border border-graphite/10 p-6 text-center">
            <Award className="mx-auto h-8 w-8 text-accent mb-3" />
            <h3 className="font-display text-lg">Classic Insurance</h3>
            <p className="mt-1 text-xs text-muted">Specialist insurance rates — up to 70% cheaper than standard.</p>
          </div>
        </Reveal>

        <Reveal className="mt-16 border-t border-graphite/10 pt-12">
          <h2 className="font-display text-2xl tracking-tight">Our Mortlake Showroom</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Located at 12 Sheen Lane in Mortlake, South West London (SW14 8LN), our showroom is a short walk from Mortlake station and easily accessible from central London. Our doors are open six days a week, and Garry & Keith welcome visitors to view our curated selection of classic motor cars.
          </p>
        </Reveal>
      </div>
    </Container>
  )
}
