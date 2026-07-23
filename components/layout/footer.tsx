"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export default function Footer() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = () => {
    toast.success("You're subscribed! Welcome to the Classic Chrome family.")
    reset()
  }

  return (
    <footer className="border-t border-graphite/20 bg-carbon text-ivory">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-2">
              <Image src="/logo.png" alt="Classic Chrome Logo" width={180} height={56} className="h-12 w-auto object-contain" />
            </Link>
            <p className="mt-4 text-sm text-muted">12 Sheen Lane, Mortlake, London SW14 8LN</p>
            <p className="mt-1 text-sm text-muted">Mon–Fri 09:00–18:00 · Sat 09:00–15:00</p>
            <p className="mt-1 text-sm text-muted">Sun: By appointment</p>
            <p className="mt-2 text-sm text-muted">
              <a href="tel:02088768171" className="hover:text-ivory transition-colors">020 8876 8171</a>
              {" · "}
              <a href="mailto:sales@classic-chrome.net" className="hover:text-ivory transition-colors">sales@classic-chrome.net</a>
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-chrome mb-3">New Arrivals Newsletter</h4>
              <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 rounded-lg border border-graphite/40 bg-charcoal/60 px-3 py-2 text-sm text-ivory placeholder:text-muted focus:border-chrome focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ivory hover:bg-accent/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message as string}</p>}
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="text-muted hover:text-ivory transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="text-muted hover:text-ivory transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="text-muted hover:text-ivory transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" aria-label="X / Twitter" className="text-muted hover:text-ivory transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Cars */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Cars</h4>
            <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
              <Link href="/cars" className="hover:text-ivory transition-colors">Current Stock</Link>
              <Link href="/cars/sold" className="hover:text-ivory transition-colors">Recently Sold</Link>
              <Link href="/sell" className="hover:text-ivory transition-colors">Sell Your Car</Link>
              <Link href="/sell/sale-or-return" className="hover:text-ivory transition-colors">Sale or Return</Link>
              <Link href="/sell/part-exchange" className="hover:text-ivory transition-colors">Part Exchange</Link>
            </div>
          </div>

          {/* Auctions & Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Auctions & Shop</h4>
            <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
              <Link href="/auctions" className="hover:text-ivory transition-colors">Live Auctions</Link>
              <Link href="/auctions/results" className="hover:text-ivory transition-colors">Past Results</Link>
              <Link href="/auctions/how-it-works" className="hover:text-ivory transition-colors">How It Works</Link>
              <Link href="/shop" className="hover:text-ivory transition-colors">Merchandise</Link>
              <Link href="/collectibles" className="hover:text-ivory transition-colors">Collectibles</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Company</h4>
            <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
              <Link href="/about" className="hover:text-ivory transition-colors">About</Link>
              <Link href="/services" className="hover:text-ivory transition-colors">Services</Link>
              <Link href="/reviews" className="hover:text-ivory transition-colors">Reviews</Link>
              <Link href="/news" className="hover:text-ivory transition-colors">News</Link>
              <Link href="/useful-links" className="hover:text-ivory transition-colors">Useful Links</Link>
              <Link href="/contact" className="hover:text-ivory transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-graphite/30 pt-8 text-center text-xs text-muted">
          <p>&copy; 2026 Classic Chrome. Company Reg 3081237 · VAT 662636718</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/privacy" className="hover:text-ivory transition-colors">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-ivory transition-colors">Disclaimer</Link>
            <Link href="/sitemap" className="hover:text-ivory transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
