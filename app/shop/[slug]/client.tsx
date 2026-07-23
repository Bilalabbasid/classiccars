"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Minus, Plus, ShoppingBag } from "lucide-react"
import { toast } from "sonner"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import Gallery from "@/components/ui/gallery"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useCart } from "@/store/useCart"
import { formatPrice } from "@/lib/utils"
import { getProducts } from "@/lib/data"
import ProductCard from "@/components/ui/product-card"
import type { Product } from "@/types/product"

export default function ShopDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>()
  const cart = useCart()
  const related = getProducts(product.kind).filter((p) => p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    cart.addItem(product, quantity, selectedVariant)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <Container className="pt-24 pb-20">
      <div className="flex items-center gap-2 text-sm text-muted mb-10">
        <Link href="/" className="hover:text-carbon">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/${product.kind === "merch" ? "shop" : "collectibles"}`} className="hover:text-carbon">
          {product.kind === "merch" ? "Merchandise" : "Collectibles"}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-carbon">{product.name}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal><Gallery images={product.images} alt={product.name} /></Reveal>
        <Reveal direction="left">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">{product.category}</p>
            <h1 className="mt-1 font-display text-3xl leading-[1.05] tracking-tight">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-display text-2xl font-semibold">{formatPrice(product.price)}</span>
              {product.compareAt && (
                <span className="text-lg text-muted line-through">{formatPrice(product.compareAt)}</span>
              )}
            </div>
            {product.limited && <Badge variant="gold" className="mt-3">Limited Edition</Badge>}

            {/* Variants */}
            {product.variants?.map((v) => (
              <div key={v.label} className="mt-4">
                <label className="text-xs font-medium uppercase tracking-wider text-muted">{v.label}</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {v.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedVariant(opt)}
                      className={`rounded-md border px-4 py-2 text-sm transition-colors ${selectedVariant === opt ? "border-accent bg-accent/10 text-accent" : "border-graphite/20 text-muted hover:text-carbon"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity + Add to cart */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-graphite/20">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 text-muted hover:text-carbon"><Minus className="h-4 w-4" /></button>
                <span className="px-4 text-sm font-medium tabular-nums">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 text-muted hover:text-carbon"><Plus className="h-4 w-4" /></button>
              </div>
              <Button onClick={handleAddToCart} size="lg" className="flex-1">
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Description */}
      <Reveal className="mt-16 max-w-3xl">
        <Accordion type="single" collapsible defaultValue="details">
          <AccordionItem value="details">
            <AccordionTrigger>Product Details</AccordionTrigger>
            <AccordionContent><p className="text-sm text-muted leading-relaxed">{product.description}</p></AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping & Returns</AccordionTrigger>
            <AccordionContent><p className="text-sm text-muted">Free UK shipping on orders over £100. International shipping available. 30-day returns on unworn/unused items.</p></AccordionContent>
          </AccordionItem>
        </Accordion>
      </Reveal>

      {/* Related */}
      {related.length > 0 && (
        <Reveal className="mt-20 border-t border-graphite/10 pt-16">
          <h3 className="font-display text-2xl tracking-tight mb-8">You May Also Like</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </Reveal>
      )}
    </Container>
  )
}
