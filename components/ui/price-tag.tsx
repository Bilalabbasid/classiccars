import { formatPrice } from "@/lib/utils"

interface PriceTagProps {
  price: number | null
  status?: "available" | "under-offer" | "sold" | "reserved"
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function PriceTag({ price, status, className = "", size = "md" }: PriceTagProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl md:text-4xl",
  }

  if (status === "sold") {
    return (
      <span className={`font-display font-semibold tracking-tight text-accent ${sizeClasses[size]} ${className}`}>
        Sold
      </span>
    )
  }

  if (status === "under-offer") {
    return (
      <span className={`font-display font-semibold tracking-tight text-gold ${sizeClasses[size]} ${className}`}>
        Under Offer
      </span>
    )
  }

  if (price === null) {
    return (
      <span className={`font-display font-semibold tracking-tight text-carbon ${sizeClasses[size]} ${className}`}>
        POA
      </span>
    )
  }

  return (
    <span className={`font-display font-semibold tracking-tight text-carbon ${sizeClasses[size]} ${className}`}>
      {formatPrice(price)}
    </span>
  )
}
