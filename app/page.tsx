"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown, Search, ArrowRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import SectionHeading from "@/components/ui/section-heading"
import CarCard from "@/components/ui/car-card"
import LotCard from "@/components/ui/lot-card"
import ProductCard from "@/components/ui/product-card"
import StatCounter from "@/components/ui/stat-counter"
import ReviewCarousel from "@/components/ui/review-carousel"
import Marquee from "@/components/ui/marquee"

import { getFeaturedCars, getAvailableCars, getLiveLots, getMerchProducts, getCollectibles, getReviews } from "@/lib/data"

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=1600&q=80",
    title: "Classic & Sports Car Specialists",
    subtitle: "A curated collection of the world's finest automobiles, since 1989",
  },
  {
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=80",
    title: "Live Auctions Now Open",
    subtitle: "Bid on exceptional classic and collectible cars from anywhere in the world",
  },
  {
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    title: "Find Your Next Classic",
    subtitle: "From Porsche to Ferrari, Jaguar to Aston Martin — your dream car awaits",
  },
]

const quickLinks = [
  { label: "Cars for Sale", href: "/cars", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80" },
  { label: "Auctions", href: "/auctions", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=600&q=80" },
  { label: "Sell Your Car", href: "/sell", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80" },
  { label: "Merch & Collectibles", href: "/shop", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80" },
]

export default function HomePage() {
  const [makeFilter, setMakeFilter] = useState("all")
  const featuredCars = getFeaturedCars()
  const availableCars = getAvailableCars()
  const liveLots = getLiveLots()
  const merch = getMerchProducts().slice(0, 2)
  const collectibles = getCollectibles().slice(0, 2)
  const reviews = getReviews()
  const makes = [...new Set(availableCars.map((c) => c.make))].sort()

  const [heroRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  )

  return (
    <>
      {/* HERO */}
      <section className="relative h-[92vh] overflow-hidden bg-carbon" ref={heroRef}>
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onEnded={(e) => {
              e.currentTarget.currentTime = 0
              e.currentTarget.play().catch(() => {})
            }}
            className="h-full w-full object-cover"
          >
            <source src="/Herovideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-carbon/70 via-carbon/40 to-carbon/80" />
        </div>

        <div className="relative z-10 flex h-full">
          {heroSlides.map((slide, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-6 text-center max-w-4xl">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-chrome"
                  >
                    Est. London 1989
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.05] tracking-tight text-ivory"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="mt-6 mx-auto max-w-2xl text-base md:text-lg text-chrome-lo"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                  >
                    <Link href="/cars"><Button size="lg" variant="chrome">View Current Stock</Button></Link>
                    <Link href="/auctions"><Button size="lg" variant="outline" className="border-ivory/30 text-ivory hover:bg-ivory/10">Live Auctions</Button></Link>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-chrome z-20">
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      {/* SEARCH BAR */}
      <section className="relative z-10 -mt-10">
        <Container>
          <div className="mx-auto max-w-3xl rounded-lg border border-graphite/10 bg-ivory p-5 shadow-lg md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Make</label>
                <Select value={makeFilter} onValueChange={setMakeFilter}>
                  <SelectTrigger><SelectValue placeholder="All Makes" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Makes</SelectItem>
                    {makes.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Model</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="All Models" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All Models</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Max Price</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="No Limit" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">No Limit</SelectItem>
                    <SelectItem value="50000">£50,000</SelectItem>
                    <SelectItem value="100000">£100,000</SelectItem>
                    <SelectItem value="250000">£250,000</SelectItem>
                    <SelectItem value="500000">£500,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Link href={makeFilter !== "all" ? `/cars?make=${makeFilter}` : "/cars"}>
                <Button className="w-full sm:w-auto" size="lg"><Search className="h-4 w-4" /> Search Stock</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* QUICK ACCESS TILES */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {quickLinks.map((link, i) => (
              <Reveal key={link.label} delay={i * 0.1}>
                <Link href={link.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                    <Image src={link.image} alt={link.label} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 via-carbon/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-xl text-ivory">{link.label}</h3>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-chrome opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Explore <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED STOCK */}
      <section className="py-24 md:py-32 border-t border-graphite/10">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Featured Stock" title="Curated Selection" intro="Hand-picked highlights from our current collection. Each car has been carefully selected for its provenance, condition, and driving experience." />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCars.slice(0, 6).map((car, i) => (
              <Reveal key={car.id} delay={i * 0.06}><CarCard car={car} /></Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link href="/cars"><Button variant="outline" size="lg">View All Stock <ArrowRight className="h-4 w-4" /></Button></Link>
          </Reveal>
        </Container>
      </section>

      {/* HERITAGE */}
      <section className="bg-carbon py-24 md:py-32">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <Reveal>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">Our Heritage</span>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-ivory">Since 1989</h2>
              <p className="mt-6 text-base leading-relaxed text-chrome-lo">
                Founded by Garry Shortt in a modest mews garage in Mortlake, Classic Chrome has grown into one of London&apos;s most respected classic and sports car dealerships. For over three decades, we have connected discerning enthusiasts with exceptional automobiles — from concours-winning vintage icons to low-mileage modern classics.
              </p>
              <p className="mt-4 text-base leading-relaxed text-chrome-lo">
                Our philosophy remains unchanged: every car we offer must meet the standards we would demand for our own collections. This commitment to quality, transparency, and genuine passion is what brings our clients back.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <StatCounter value={36} suffix="+" label="Years of Excellence" />
                <StatCounter value={5000} suffix="+" label="Cars Sold" />
                <StatCounter value={5.0} suffix="" label="★ Google Rating" />
              </div>
            </Reveal>
            <Reveal direction="left">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=600&h=750&q=80" alt="Classic Chrome showroom" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 aspect-square w-40 overflow-hidden rounded-lg border-4 border-carbon md:w-52">
                  <Image src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&h=400&q=80" alt="Classic car detail" fill sizes="200px" className="object-cover" />
                </div>
                <div className="absolute -right-4 -top-4 aspect-video w-36 overflow-hidden rounded-lg border-4 border-carbon md:w-44">
                  <Image src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&h=300&q=80" alt="Engine detail" fill sizes="180px" className="object-cover" />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* LIVE AUCTIONS TEASER */}
      <section className="py-24 md:py-32 border-t border-graphite/10">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Live Auctions" title="Bid Now" intro="Exclusive lots open for bidding. Place your bids from anywhere in the world." />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {liveLots.map((lot, i) => (
              <Reveal key={lot.id} delay={i * 0.1}><LotCard lot={lot} /></Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link href="/auctions"><Button variant="outline" size="lg">Explore All Auctions <ArrowRight className="h-4 w-4" /></Button></Link>
          </Reveal>
        </Container>
      </section>

      {/* SHOP TEASER */}
      <section className="bg-charcoal py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Shop" title="Merchandise & Collectibles" intro="From limited-edition scale models to our own range of apparel and accessories." light />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...merch, ...collectibles].map((product, i) => (
              <Reveal key={product.id} delay={i * 0.06}><ProductCard product={product} /></Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop"><Button variant="ivory" size="lg">Shop Merchandise <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/collectibles"><Button variant="outline" size="lg" className="border-ivory/40 text-ivory hover:bg-ivory/10 hover:border-ivory">Browse Collectibles <ArrowRight className="h-4 w-4" /></Button></Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* REVIEWS */}
      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" intro="We're proud to hold a 5.0★ rating on Google." />
          </Reveal>
          <ReviewCarousel reviews={reviews} />
        </Container>
      </section>

      {/* MARQUEE + NEWSLETTER */}
      <section className="border-t border-graphite/10 py-16">
        <Container>
          <Marquee items={["Classic Cars","Sports Cars","Auctions","Collectibles","Heritage","Excellence","London","Since 1989"]} className="mb-12" />
          <div className="mx-auto max-w-xl text-center">
            <h3 className="font-display text-2xl tracking-tight">Stay in the Loop</h3>
            <p className="mt-2 text-sm text-muted">Be the first to know about new arrivals, upcoming auctions, and exclusive events.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex gap-3">
              <input type="email" placeholder="Your email address" className="flex-1 h-11 rounded-lg border border-graphite/30 bg-transparent px-4 text-sm focus:border-chrome focus:outline-none focus:ring-1 focus:ring-chrome" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </Container>
      </section>
    </>
  )
}
