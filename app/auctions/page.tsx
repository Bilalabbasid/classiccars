"use client"

import Link from "next/link"
import { ChevronRight, ArrowRight } from "lucide-react"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import SectionHeading from "@/components/ui/section-heading"
import LotCard from "@/components/ui/lot-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getLiveLots, getUpcomingLots, getEndedLots } from "@/lib/data"

export default function AuctionsPage() {
  const live = getLiveLots()
  const upcoming = getUpcomingLots()
  const ended = getEndedLots()

  return (
    <>
      <Container className="pt-24 pb-10">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-carbon">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-carbon">Auctions</span>
        </div>
        <SectionHeading title="Classic Chrome Auctions" intro="Bid on exceptional classic and collectible cars from anywhere in the world. Every lot is fully inspected and described by our in-house specialists." className="mt-6" />
        <Link href="/auctions/register"><Button size="lg">Register to Bid</Button></Link>
      </Container>

      <Container className="pb-20">
        <Tabs defaultValue="live">
          <TabsList className="mb-8">
            <TabsTrigger value="live">Live Now ({live.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="ended">Ended ({ended.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="live">
            <div className="grid gap-6 md:grid-cols-2">
              {live.map((lot, i) => (
                <Reveal key={lot.id} delay={i * 0.1}><LotCard lot={lot} /></Reveal>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="upcoming">
            <div className="grid gap-6 md:grid-cols-2">
              {upcoming.map((lot, i) => (
                <Reveal key={lot.id} delay={i * 0.1}><LotCard lot={lot} /></Reveal>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="ended">
            <div className="grid gap-6 md:grid-cols-2">
              {ended.map((lot, i) => (
                <Reveal key={lot.id} delay={i * 0.1}><LotCard lot={lot} /></Reveal>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </>
  )
}
