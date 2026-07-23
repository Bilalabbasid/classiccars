"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Phone, Search, ExternalLink } from "lucide-react"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface DirectoryEntry {
  name: string
  specialism: string
  location?: string
  phone?: string
}

interface DirectoryGroup {
  title: string
  entries: DirectoryEntry[]
}

const directory: DirectoryGroup[] = [
  {
    title: "Classic Car Inspection Services",
    entries: [
      { name: "Alternative Vehicle Inspections Limited", specialism: "Independent vehicle inspections" },
      { name: "Classic Assessments", specialism: "Independent vehicle inspections", phone: "07968 167331" },
      { name: "Classic/Contemporary Car Surveys", specialism: "Independent vehicle inspections", phone: "07973 708983" },
      { name: "Porsche Inspections", specialism: "Porsche inspections", phone: "01908 460580" },
    ],
  },
  {
    title: "Car Hire for Films, Videos & Photoshoots",
    entries: [
      { name: "Classic Chrome Ltd", specialism: "Cars for films and photo-shoots", phone: "020 8876 8171" },
    ],
  },
  {
    title: "Classic Car Workshops",
    entries: [
      { name: "Roger Edwards Motors", specialism: "Classic Mercedes-Benz Specialists", location: "Amersham", phone: "01494 766766" },
      { name: "Enginuity", specialism: "Triumph TR & TVR Specialists", location: "Acton, London W3", phone: "020 8993 7737" },
      { name: "Colin Ferns", specialism: "Mercedes-Benz Specialist", location: "Richmond", phone: "020 8332 7660" },
      { name: "The Jag Workshop", specialism: "Jaguar Specialist", location: "Shepherds Bush, London", phone: "020 8563 0860" },
      { name: "No5 Garage", specialism: "Independent Porsche Specialist", location: "Acton, London W3", phone: "0208 993 7318" },
      { name: "GP Auto Design", specialism: "Specialist Body & Paintwork", location: "Park Royal, London NW10", phone: "020 8963 0333" },
    ],
  },
  {
    title: "Hoods, Soft Tops & Trimming",
    entries: [
      { name: "Oxted Trimming", specialism: "Car Hoods & Soft Tops", phone: "01883 712 112" },
      { name: "BAS International", specialism: "Cabriolet Hoods", phone: "01633 873 664" },
    ],
  },
  {
    title: "Polishing & Plating",
    entries: [
      { name: "Merridale Polishing and Plating Company Limited", specialism: "Polishing & Plating", location: "Wednesbury / Bilston", phone: "0121 556 3636 / 01902 404191" },
    ],
  },
]

export default function UsefulLinksPage() {
  const [search, setSearch] = useState("")

  const filtered = directory
    .map((group) => ({
      ...group,
      entries: group.entries.filter(
        (e) =>
          !search ||
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.specialism.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.entries.length > 0)

  return (
    <>
      {/* Hero */}
      <section className="bg-carbon py-24 md:py-32">
        <Container>
          <Reveal>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Trusted Partners</span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">Useful Links</h1>
            <p className="mt-4 max-w-2xl text-base text-chrome-lo">
              A directory of trusted specialists and partners from across the classic car community.
            </p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-20 md:py-28">
        <Reveal>
          <p className="mb-8 text-sm text-muted">
            These are independent third parties; please contact them directly.
          </p>
        </Reveal>

        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input
              placeholder="Search by name or specialism..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Accordion type="multiple" defaultValue={directory.map((_, i) => `group-${i}`)}>
          {filtered.map((group, i) => (
            <AccordionItem key={i} value={`group-${i}`}>
              <AccordionTrigger className="text-left">
                <span className="font-display text-lg">{group.title}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {group.entries.map((entry, j) => (
                    <div key={j} className="rounded-lg border border-graphite/10 p-4">
                      <h4 className="font-medium text-sm">{entry.name}</h4>
                      <p className="text-xs text-muted mt-1">
                        {entry.specialism}
                        {entry.location && ` — ${entry.location}`}
                      </p>
                      {entry.phone && (
                        <a
                          href={`tel:${entry.phone.replace(/\s/g, "")}`}
                          className="mt-2 inline-flex items-center gap-1 text-xs text-accent hover:underline"
                        >
                          <Phone className="h-3 w-3" /> {entry.phone}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </>
  )
}
