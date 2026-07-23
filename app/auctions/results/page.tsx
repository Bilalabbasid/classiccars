"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import LotCard from "@/components/ui/lot-card"
import { Input } from "@/components/ui/input"
import { getEndedLots } from "@/lib/data"
import { useState } from "react"

export default function AuctionResultsPage() {
  const [search, setSearch] = useState("")
  const ended = getEndedLots()
  const filtered = ended.filter((l) =>
    search ? `${l.make} ${l.model}`.toLowerCase().includes(search.toLowerCase()) : true
  )

  return (
    <Container className="pt-24 pb-20">
      <div className="flex items-center gap-2 text-sm text-muted mb-10">
        <Link href="/" className="hover:text-carbon">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/auctions" className="hover:text-carbon">Auctions</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-carbon">Results</span>
      </div>
      <SectionHeading title="Auction Results" intro="Browse past auction results. All hammer prices include buyer's premium." />
      <div className="mb-8 max-w-sm">
        <Input placeholder="Search by make or model..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((lot) => <LotCard key={lot.id} lot={lot} />)}
      </div>
    </Container>
  )
}
