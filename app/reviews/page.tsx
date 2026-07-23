"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Star, Phone, Mail } from "lucide-react"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, parseISO } from "date-fns"

const allReviews = [
  { id: "r1", author: "James H.", date: "2026-06-15", rating: 5, text: "I purchased my dream 993 from Classic Chrome and the entire experience was exemplary. Garry and the team were knowledgeable, patient, and genuinely passionate about the car. The preparation was meticulous — the 911 arrived in better condition than I could have hoped.", car: "Porsche 911 (993)" },
  { id: "r2", author: "Amanda W.", date: "2026-05-28", rating: 5, text: "Selling my late husband's E-Type through Classic Chrome was handled with the sensitivity and professionalism the car deserved. They achieved a price beyond my expectations and kept me informed at every stage.", car: "Jaguar E-Type Series 1" },
  { id: "r3", author: "Richard T.", date: "2026-05-10", rating: 5, text: "I've dealt with many classic car dealers across Europe and the UK, and Classic Chrome stands apart. Their knowledge of the market is exceptional, their cars are prepared to an exacting standard, and they are straight-talking and transparent." },
  { id: "r4", author: "Sarah K.", date: "2026-04-22", rating: 5, text: "The team sourced a very specific Mercedes 280SL for me — right colour, right spec, right history. It took six months of searching, but they found exactly the car I wanted. True enthusiasts who treat their customers like family.", car: "Mercedes 280SL Pagoda" },
  { id: "r5", author: "Michael D.", date: "2026-04-05", rating: 5, text: "I bought my Ferrari 308 GTB from Classic Chrome two years ago and have since returned for servicing and a valuation. The consistency of their service is remarkable. Whether you're spending £50,000 or £500,000, you receive the same level of attention and care.", car: "Ferrari 308 GTB" },
  { id: "r6", author: "Eleanor B.", date: "2026-03-18", rating: 5, text: "Excellent dealership with a superb selection of cars. I attended one of their open mornings and was made to feel incredibly welcome. The coffee was excellent, the cars were stunning, and the team's enthusiasm was infectious." },
  { id: "r7", author: "David P.", date: "2026-02-28", rating: 5, text: "I've been dealing with Classic Chrome for over a decade and have bought three cars from them in that time. Each transaction has been smooth, transparent, and enjoyable. The after-sales care is what really sets them apart.", car: "Multiple" },
  { id: "r8", author: "Catherine L.", date: "2026-02-10", rating: 5, text: "From the moment I walked into the showroom, I knew I was in the right place. The team's passion for classic cars is evident in everything they do. They helped me navigate the world of classic car ownership with patience and expertise, and my Alfa GTV has been an absolute joy.", car: "Alfa Romeo GTV 2000" },
]

export default function ReviewsPage() {
  const [sort, setSort] = useState("recent")
  const [visible, setVisible] = useState(6)

  const sorted = [...allReviews].sort((a, b) => {
    if (sort === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime()
    return b.rating - a.rating
  })

  return (
    <>
      {/* Hero */}
      <section className="bg-carbon py-24 md:py-32">
        <Container>
          <Reveal>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">What Our Customers Say</span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">Reviews</h1>
            <p className="mt-4 max-w-2xl text-base text-chrome-lo">Rated 5.0 from 46 Google reviews.</p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-20 md:py-28">
        {/* Rating summary */}
        <Reveal>
          <div className="rounded-lg border border-graphite/10 bg-paper p-8 text-center md:p-10">
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-8 w-8 fill-gold text-gold" />)}
            </div>
            <p className="mt-3 font-display text-4xl font-bold tracking-tight">5.0</p>
            <p className="text-sm text-muted">46 Google reviews</p>
            <div className="mt-4 flex justify-center gap-4 text-xs text-muted">
              <span className="rounded-full border border-graphite/20 px-3 py-1">Google ★★★★★</span>
              <span className="rounded-full border border-graphite/20 px-3 py-1">Trustpilot ★★★★★</span>
            </div>
            <Button variant="outline" size="sm" className="mt-6">Leave a Review</Button>
          </div>
        </Reveal>

        {/* Filter */}
        <div className="mt-10 flex items-center justify-between">
          <p className="text-sm text-muted">{allReviews.length} reviews</p>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reviews grid */}
        <div className="mt-6 space-y-4">
          {sorted.slice(0, visible).map((r, i) => (
            <Reveal key={r.id} delay={i * 0.04}>
              <div className="rounded-lg border border-graphite/10 p-6">
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className={`h-4 w-4 ${s <= r.rating ? "fill-gold text-gold" : "text-graphite/30"}`} />)}
                </div>
                <p className="text-sm leading-relaxed text-carbon">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                  <span className="font-medium text-carbon">{r.author}</span>
                  <span>·</span>
                  <span>{format(parseISO(r.date), "d MMMM yyyy")}</span>
                  {r.car && <><span>·</span><span>{r.car}</span></>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {visible < sorted.length && (
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => setVisible(sorted.length)}>Load More Reviews</Button>
          </div>
        )}

        {/* Contact strip */}
        <Reveal className="mt-20 border-t border-graphite/10 pt-12 text-center">
          <p className="text-sm text-muted">Have a question? Get in touch.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-muted">
            <a href="tel:02088768171" className="flex items-center gap-1.5 hover:text-accent transition-colors"><Phone className="h-4 w-4" /> 020 8876 8171</a>
            <a href="mailto:sales@classic-chrome.net" className="flex items-center gap-1.5 hover:text-accent transition-colors"><Mail className="h-4 w-4" /> sales@classic-chrome.net</a>
          </div>
        </Reveal>
      </Container>
    </>
  )
}
