"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import SectionHeading from "@/components/ui/section-heading"
import ProductCard from "@/components/ui/product-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getMerchProducts } from "@/lib/data"

const categories = ["All", "Apparel", "Accessories", "Prints"]

export default function ShopPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState("default")
  const products = getMerchProducts()

  const filtered = useMemo(() => {
    let result = [...products]
    if (category !== "All") result = result.filter((p) => p.category === category)
    if (search) result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break
      case "price-desc": result.sort((a, b) => b.price - a.price); break
    }
    return result
  }, [products, category, search, sort])

  return (
    <>
      <Container className="pt-24 pb-10">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-carbon">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-carbon">Merchandise</span>
        </div>
        <SectionHeading title="Merchandise" intro="Official Classic Chrome apparel, accessories, and limited-edition prints." className="mt-6" />
      </Container>

      <Container className="pb-20">
        {/* Category chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${category === cat ? "bg-carbon text-ivory" : "border border-graphite/20 text-muted hover:text-carbon"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Sort" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.04}><ProductCard product={product} /></Reveal>
          ))}
        </div>
      </Container>
    </>
  )
}
