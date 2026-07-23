import Link from "next/link"
import Container from "@/components/ui/container"

const pages = [
  { label: "Home", href: "/" },
  { label: "Cars for Sale", href: "/cars" },
  { label: "Recently Sold", href: "/cars/sold" },
  { label: "Auctions", href: "/auctions" },
  { label: "Auction Results", href: "/auctions/results" },
  { label: "How Bidding Works", href: "/auctions/how-it-works" },
  { label: "Register to Bid", href: "/auctions/register" },
  { label: "Merchandise", href: "/shop" },
  { label: "Collectibles", href: "/collectibles" },
  { label: "Sell Your Car", href: "/sell" },
  { label: "Sale or Return", href: "/sell/sale-or-return" },
  { label: "Part Exchange", href: "/sell/part-exchange" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "News", href: "/news" },
  { label: "Useful Links", href: "/useful-links" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Disclaimer", href: "/disclaimer" },
]

export default function SitemapPage() {
  return (
    <Container className="pt-24 pb-20">
      <h1 className="font-display text-3xl tracking-tight mb-8">Sitemap</h1>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {pages.map((p) => (
          <Link key={p.href} href={p.href} className="text-sm text-muted hover:text-carbon transition-colors py-1.5">
            {p.label}
          </Link>
        ))}
      </div>
    </Container>
  )
}
