"use client"

import { useState, use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Gavel } from "lucide-react"
import { toast } from "sonner"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import Gallery from "@/components/ui/gallery"
import Countdown from "@/components/ui/countdown"
import EnquiryDialog from "@/components/ui/enquiry-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useWatchlist } from "@/store/useWatchlist"
import { useAuth } from "@/store/useAuth"
import { formatCompactPrice } from "@/lib/utils"
import { getLotBySlug, getLiveLots } from "@/lib/data"
import LotCard from "@/components/ui/lot-card"
import type { AuctionLot } from "@/types/auction"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function AuctionDetailPage({ params: paramsPromise }: PageProps) {
  // This is a client component using use() for params
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const { slug } = use(paramsPromise)
  const currentLot = getLotBySlug(slug)

  if (!currentLot) notFound()
  const watchlist = useWatchlist()
  const auth = useAuth()
  const isWatched = watchlist.hasItem(currentLot.id)
  const relatedLots = getLiveLots().filter((l) => l.id !== currentLot.id).slice(0, 3)

  const [bidAmount, setBidAmount] = useState(currentLot.currentBid + 500)
  const [bidSubmitting, setBidSubmitting] = useState(false)
  const [bidHistory, setBidHistory] = useState(currentLot.bidHistory)

  const handleBid = async () => {
    if (!auth.isRegistered) {
      toast.error("Please register to bid first")
      return
    }
    if (bidAmount <= currentLot.currentBid) {
      toast.error("Bid must exceed the current bid")
      return
    }
    setBidSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    const newEntry = { bidder: "You", amount: bidAmount, time: new Date().toISOString() }
    setBidHistory([newEntry, ...bidHistory])
    currentLot.currentBid = bidAmount
    currentLot.bidCount += 1
    setBidAmount(bidAmount + 500)
    setBidSubmitting(false)
    toast.success("Bid placed successfully!")
  }

  const statusBadge = {
    live: { label: "LIVE", variant: "accent" as const },
    upcoming: { label: "Upcoming", variant: "outline" as const },
    ended: { label: "Ended", variant: "sold" as const },
  }[currentLot.status]

  return (
    <>
      <Container className="pt-24 pb-10">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-carbon">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/auctions" className="hover:text-carbon">Auctions</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-carbon">Lot {currentLot.lotNumber}</span>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Gallery images={currentLot.images} alt={currentLot.title} />
          </Reveal>

          <Reveal direction="left">
            <div className="lg:sticky lg:top-24">
              <Badge variant={statusBadge.variant} className="mb-3">
                {currentLot.status === "live" && <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
                {statusBadge.label} · Lot {currentLot.lotNumber}
              </Badge>
              <h1 className="font-display text-3xl leading-[1.05] tracking-tight md:text-4xl">{currentLot.title}</h1>
              <p className="mt-2 text-sm text-muted">{currentLot.make} {currentLot.model} · {currentLot.year}</p>

              {/* Estimate */}
              <div className="mt-4 text-sm text-muted">
                Estimate: {formatCompactPrice(currentLot.estimateLow)} – {formatCompactPrice(currentLot.estimateHigh)}
                {currentLot.status === "live" && (
                  <span className="ml-2 text-xs font-medium text-gold">
                    {currentLot.reserveMet ? "Reserve Met" : "Reserve Not Met"}
                  </span>
                )}
              </div>

              {/* Current bid */}
              <div className="mt-4 rounded-lg border border-graphite/10 bg-charcoal/5 p-5">
                <p className="text-[10px] uppercase tracking-wider text-muted">Current Bid</p>
                <p className="font-display text-3xl font-bold tracking-tight">{formatCompactPrice(currentLot.currentBid)}</p>
                <p className="mt-1 text-xs text-muted flex items-center gap-1"><Gavel className="h-3 w-3" /> {currentLot.bidCount} bids</p>
                {currentLot.status === "live" && (
                  <div className="mt-3">
                    <Countdown targetDate={currentLot.endsAt} />
                  </div>
                )}
                {currentLot.status === "upcoming" && (
                  <div className="mt-3">
                    <p className="text-xs text-muted mb-2">Auction starts in:</p>
                    <Countdown targetDate={currentLot.startsAt} />
                  </div>
                )}
                {currentLot.status === "ended" && (
                  <p className="mt-3 text-sm font-medium text-muted">
                    {currentLot.reserveMet ? "Sold" : "Not Sold"}
                  </p>
                )}
              </div>

              {/* Bid form (live only) */}
              {currentLot.status === "live" && (
                <div className="mt-6">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted">Your Bid</label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      className="flex-1"
                    />
                    <Button onClick={handleBid} disabled={bidSubmitting}>
                      {bidSubmitting ? "Placing..." : "Place Bid"}
                    </Button>
                  </div>
                  <div className="mt-2 flex gap-2">
                    {[500, 1000, 5000].map((inc) => (
                      <button
                        key={inc}
                        onClick={() => setBidAmount(currentLot.currentBid + inc)}
                        className="rounded-md border border-graphite/20 px-3 py-1 text-xs text-muted hover:bg-charcoal/5 transition-colors"
                      >
                        +£{inc.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  {!auth.isRegistered && (
                    <p className="mt-3 text-xs text-accent">
                      <Link href="/auctions/register" className="underline">Register to bid</Link> before placing your bid.
                    </p>
                  )}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => watchlist.toggleItem(currentLot.id)}
                  className={`rounded-lg border px-4 py-2 text-sm transition-colors ${isWatched ? "border-accent bg-accent/10 text-accent" : "border-graphite/20 text-muted hover:text-carbon"}`}
                >
                  {isWatched ? "★ Watching" : "☆ Watch This Lot"}
                </button>
                <Button variant="outline" onClick={() => setEnquiryOpen(true)}>Ask a Question</Button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bid history */}
        <Reveal className="mt-16">
          <h3 className="font-display text-2xl tracking-tight mb-4">Bid History</h3>
          <div className="max-w-xl rounded-lg border border-graphite/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-charcoal/5">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted">Bidder</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted">Amount</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted">Time</th>
                </tr>
              </thead>
              <tbody>
                {bidHistory.map((b, i) => (
                  <tr key={i} className="border-t border-graphite/5">
                    <td className="px-4 py-3 font-medium">{b.bidder}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatCompactPrice(b.amount)}</td>
                    <td className="px-4 py-3 text-right text-muted text-xs">{new Date(b.time).toLocaleString("en-GB")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Description */}
        <Reveal className="mt-16">
          <h3 className="font-display text-2xl tracking-tight mb-4">Description</h3>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-carbon/80">
            {currentLot.description.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Reveal>

        {/* Spec */}
        {currentLot.specs && currentLot.specs.length > 0 && (
          <Reveal className="mt-16">
            <h3 className="font-display text-2xl tracking-tight mb-6">Specification</h3>
            <Accordion type="single" collapsible className="max-w-3xl">
              {currentLot.specs.map((group, i) => (
                <AccordionItem key={i} value={group.group}>
                  <AccordionTrigger>{group.group}</AccordionTrigger>
                  <AccordionContent>
                    <dl className="grid gap-2">
                      {group.items.map((item) => (
                        <div key={item.label} className="flex items-baseline justify-between border-b border-graphite/5 pb-2">
                          <dt className="text-sm text-muted">{item.label}</dt>
                          <dd className="text-sm font-medium text-right">{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        )}

        {/* Related lots */}
        {relatedLots.length > 0 && (
          <Reveal className="mt-20 border-t border-graphite/10 pt-16">
            <h3 className="font-display text-2xl tracking-tight mb-8">Other Live Lots</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedLots.map((l) => <LotCard key={l.id} lot={l} />)}
            </div>
          </Reveal>
        )}
      </Container>

      <EnquiryDialog open={enquiryOpen} onOpenChange={setEnquiryOpen} title={`Ask about Lot ${currentLot.lotNumber}`} subject={currentLot.title} />
    </>
  )
}
