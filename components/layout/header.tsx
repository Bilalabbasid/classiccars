"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Heart, ShoppingBag, ChevronDown, Phone, Mail, Star } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useWatchlist } from "@/store/useWatchlist"
import { useCart } from "@/store/useCart"

const navItems = [
  {
    label: "Cars for Sale",
    href: "/cars",
    children: [
      { label: "Current Stock", href: "/cars" },
      { label: "Recently Sold", href: "/cars/sold" },
    ],
  },
  {
    label: "Auctions",
    href: "/auctions",
    children: [
      { label: "Live & Upcoming", href: "/auctions" },
      { label: "Auction Results", href: "/auctions/results" },
      { label: "How Bidding Works", href: "/auctions/how-it-works" },
      { label: "Register to Bid", href: "/auctions/register" },
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Merchandise", href: "/shop" },
      { label: "Collectibles", href: "/collectibles" },
    ],
  },
  {
    label: "Sell Your Car",
    href: "/sell",
    children: [
      { label: "Sale or Return", href: "/sell/sale-or-return" },
      { label: "Part Exchange", href: "/sell/part-exchange" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Find Me a Car", href: "/services/find-a-car" },
      { label: "Servicing & MOT", href: "/services/servicing" },
      { label: "Valeting & Detailing", href: "/services/valeting" },
      { label: "Valuations", href: "/services/valuations" },
      { label: "Film & Photo Hire", href: "/services/film-photo-hire" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Reviews", href: "/reviews" },
      { label: "News", href: "/news" },
    ],
  },
  { label: "Useful Links", href: "/useful-links" },
  { label: "Contact", href: "/contact" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const watchlist = useWatchlist()
  const cart = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 bg-carbon/95 backdrop-blur-md border-b border-graphite/30 text-ivory shadow-xl ${
        scrolled ? "py-1 bg-carbon/98" : ""
      }`}
    >
      {/* Utility bar */}
      <div
        className={`hidden border-b border-graphite/20 transition-all duration-500 lg:block ${
          scrolled ? "h-0 opacity-0 overflow-hidden" : "h-9 opacity-100"
        }`}
      >
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-10 lg:px-16 text-xs text-chrome-lo">
          <div className="flex items-center gap-6">
            <a href="tel:02088768171" className="flex items-center gap-1.5 hover:text-ivory transition-colors">
              <Phone className="h-3 w-3" /> 020 8876 8171
            </a>
            <a href="mailto:sales@classic-chrome.net" className="flex items-center gap-1.5 hover:text-ivory transition-colors">
              <Mail className="h-3 w-3" /> sales@classic-chrome.net
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-gold text-gold" />
              <Star className="h-3 w-3 fill-gold text-gold" />
              <Star className="h-3 w-3 fill-gold text-gold" />
              <Star className="h-3 w-3 fill-gold text-gold" />
              <Star className="h-3 w-3 fill-gold text-gold" />
              <span className="ml-1 text-ivory">Google Reviews</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-16">
        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button className="p-2 -ml-2 text-ivory hover:text-chrome" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-sm overflow-y-auto bg-carbon text-ivory border-graphite/30">
            <div className="mt-8">
              <Accordion type="single" collapsible>
                {navItems.map((item) =>
                  "children" in item && item.children ? (
                    <AccordionItem key={item.label} value={item.label} className="border-graphite/20">
                      <AccordionTrigger className="text-base font-medium text-ivory hover:text-chrome">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-3 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-sm text-chrome-lo hover:text-ivory transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <div key={item.label} className="border-b border-graphite/20">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between py-5 text-base font-medium text-ivory hover:text-chrome transition-colors"
                      >
                        {item.label}
                      </Link>
                    </div>
                  )
                )}
              </Accordion>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo - transparent & high visibility */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Classic Chrome Logo"
            width={200}
            height={64}
            className="h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => "children" in item && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium tracking-wide text-ivory/90 hover:text-ivory hover:bg-ivory/10 transition-colors rounded-md"
              >
                {item.label}
                {"children" in item && item.children && (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                )}
              </Link>

              <AnimatePresence>
                {"children" in item && item.children && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-1 min-w-[200px] rounded-lg border border-graphite/30 bg-carbon/95 backdrop-blur-md p-2 shadow-2xl z-50"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-4 py-2.5 text-sm text-ivory/90 hover:text-ivory hover:bg-ivory/10 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <button
            className="relative p-2 text-ivory/90 hover:text-ivory transition-colors"
            aria-label="Watchlist"
          >
            <Heart className="h-5 w-5" />
            {watchlist.count() > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-ivory">
                {watchlist.count()}
              </span>
            )}
          </button>
          <button
            className="relative p-2 text-ivory/90 hover:text-ivory transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cart.itemCount() > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-ivory">
                {cart.itemCount()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
