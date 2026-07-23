"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import type { Product } from "@/types/product"
import { formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/store/useCart"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const cart = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    cart.addItem(product)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-lg border border-graphite/10 bg-ivory transition-shadow hover:shadow-lg ${className}`}
      whileHover={{ y: -2 }}
    >
      <Link href={`/${product.kind === "merch" ? "shop" : "collectibles"}/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-charcoal/10">
          <Image
            src={product.images[0] || "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            onError={(e) => {
              // Fallback to high resolution automotive product photo if local image fails
              const target = e.target as HTMLImageElement
              target.srcset = "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80"
              target.src = "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80"
            }}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Quick add to cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-ivory text-carbon opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:bg-accent hover:text-ivory"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>

          {product.limited && (
            <Badge variant="gold" className="absolute left-3 top-3 z-10">
              Limited Edition
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-carbon/50">
              <Badge variant="sold">Sold Out</Badge>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/${product.kind === "merch" ? "shop" : "collectibles"}/${product.slug}`}>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            {product.category}
          </p>
          <h3 className="mt-1 font-body text-sm font-medium group-hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-muted line-clamp-1">{product.shortDescription}</p>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-display text-lg font-semibold">{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className="text-sm text-muted line-through">{formatPrice(product.compareAt)}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
