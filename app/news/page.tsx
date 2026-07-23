"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import Container from "@/components/ui/container"
import Reveal from "@/components/ui/reveal"
import { format, parseISO } from "date-fns"

const allPosts = [
  {
    id: "p1",
    slug: "classic-cars-appreciating-asset",
    title: "Classic Cars as an Appreciating Asset",
    excerpt: "Why discerning collectors are looking beyond stocks and property — and turning to classic automobiles as a tangible, enjoyable investment.",
    body: "In an era of volatile markets and uncertain returns, an increasing number of high-net-worth individuals are looking beyond traditional asset classes and towards tangible investments they can enjoy. Classic cars, once the preserve of passionate enthusiasts, have emerged as a compelling alternative asset — one that combines potential appreciation with the visceral pleasure of ownership and use.\n\nData from the major auction houses and specialist insurers confirms that carefully selected classic and collectible cars have outperformed many conventional investment classes over the past two decades. The key, as with any investment, is curation — buying the right car, at the right price, with the right provenance. At Classic Chrome, we advise our clients not just on what to buy, but on what makes a car special: originality, history, rarity, and that indefinable quality of desirability that separates the merely valuable from the truly sought-after.\n\nOf course, the financial case is only part of the story. Unlike a share certificate or a government bond, a classic car can be driven, shown, and shared. It can take you on a tour of the Scottish Highlands, turn heads at the Goodwood Revival, or simply provide a moment of mechanical escape on a Sunday morning. That is, ultimately, what makes the classic car market so resilient — the cars exist to be enjoyed, and that enjoyment will always have value.",
    coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&h=600&q=80",
    date: "2026-07-10",
    author: "Classic Chrome",
    category: "Market",
    featured: true,
  },
  {
    id: "p2",
    slug: "ulez-mot-exemption-40-year-classics",
    title: "Understanding ULEZ & MOT Exemption for 40+ Year-Old Classics",
    excerpt: "A practical guide to the rules around London's Ultra Low Emission Zone and the historic vehicle MOT exemption for owners of classic cars.",
    body: "With the expansion of London's Ultra Low Emission Zone (ULEZ) and the ongoing conversation around emissions regulations, classic car owners have legitimate questions about where they stand. The good news is that vehicles with a 'historic' tax class — those aged 40 years or more — are exempt from ULEZ charges. This exemption applies automatically, provided your vehicle is registered with the DVLA in the historic tax class.\n\nSeparately, vehicles over 40 years old that have not been substantially modified are exempt from mandatory MOT testing. However — and this is crucial — the exemption is not automatic. You must declare your vehicle as a Vehicle of Historic Interest (VHI) when taxing it, and it remains your responsibility to ensure the vehicle is roadworthy. At Classic Chrome, we strongly recommend that all our clients continue to have their cars inspected annually, regardless of the exemption, as a matter of safety and good practice.\n\nIf you're unsure whether your classic qualifies for these exemptions, or if you'd like guidance on keeping your historic vehicle in top mechanical condition, our team is always happy to advise. A quick call to the showroom can save considerable confusion — and potentially a penalty charge.",
    coverImage: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=1200&h=600&q=80",
    date: "2026-06-22",
    author: "Classic Chrome",
    category: "Ownership",
    featured: false,
  },
  {
    id: "p3",
    slug: "prepare-classic-winter-storage",
    title: "How to Prepare Your Classic for Winter Storage",
    excerpt: "Our essential checklist for storing your classic car over the winter months — protecting your investment and ensuring a trouble-free spring start.",
    body: "Whether you store your classic in a heated garage or under a breathable cover in a barn, proper winter preparation is the single most effective thing you can do to protect your car. The enemies are moisture, stale fuel, flat-spotted tyres, and flat batteries — all entirely preventable with a little forethought.\n\nStart with a thorough clean — inside and out. Wax the paintwork, treat the leather, and ensure no moisture is trapped anywhere. Fill the fuel tank to the brim (to prevent condensation) and add a fuel stabiliser if the car will be stationary for more than three months. Connect a quality trickle charger — we recommend CTEK — to maintain the battery. Over-inflate the tyres by 5–8 PSI to prevent flat spots, or better still, park on tyre cradles. Finally, cover the car with a breathable indoor cover — never a plastic sheet, which traps moisture.\n\nIf you're storing the car remotely, consider a Carcoon or similar inflatable storage system, which actively circulates air and controls humidity. And if you need any of these products, our showroom stocks a selection of CTEK chargers, specialist covers, and storage accessories — just ask.",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&h=600&q=80",
    date: "2026-05-14",
    author: "Classic Chrome",
    category: "Ownership",
    featured: false,
  },
  {
    id: "p4",
    slug: "e10-fuel-classic-cars",
    title: "E10 Fuel and Your Classic: What to Know",
    excerpt: "The introduction of E10 petrol has raised concerns for classic car owners. We explain the risks and the simple steps you can take to protect your engine.",
    body: "Since the introduction of E10 as the standard unleaded petrol grade in the UK, many classic car owners have expressed concern about compatibility. E10 contains up to 10% ethanol, which can cause issues in older fuel systems — particularly rubber hoses, seals, carburettor components, and fibreglass fuel tanks that were never designed to withstand ethanol's corrosive properties.\n\nThe government has confirmed that all cars built before 2000 should avoid E10, and for good reason. Ethanol absorbs water, leading to phase separation in fuel that sits unused for extended periods. It can also attack older rubber and cork components, causing leaks and running issues. The solution is straightforward: use E5 (Super Unleaded) instead, which contains a maximum of 5% ethanol and is still widely available at most filling stations. Some specialist fuel suppliers also offer ethanol-free petrol for particularly sensitive or valuable cars.\n\nIf your car has been run on E10 inadvertently, don't panic — a single tank is unlikely to cause immediate damage. But for ongoing use, switch to E5 and consider having your fuel lines and carburettor seals inspected at your next service. Our workshop can advise on any preventative measures specific to your car.",
    coverImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&h=600&q=80",
    date: "2026-04-08",
    author: "Classic Chrome",
    category: "Ownership",
    featured: false,
  },
  {
    id: "p5",
    slug: "goodwood-revival-2026-preview",
    title: "Goodwood Revival 2026: What to Expect",
    excerpt: "The most anticipated event on the classic motoring calendar returns. Here's our preview of what to look forward to at this year's Revival.",
    body: "The Goodwood Revival is more than a motor race — it is a time machine. Every September, the Goodwood Motor Circuit in West Sussex transforms into a faithful recreation of its 1948–1966 heyday, with period dress, historic aircraft, and some of the most valuable racing cars in the world being driven as their creators intended — flat out.\n\nThe 2026 event promises to be one of the finest yet. The provisional entry list includes an extraordinary gathering of Ford GT40s — marking 60 years since the legendary 1-2-3 Le Mans finish — along with the usual spectacular grids of 1950s sports cars, 1960s saloons, and the ever-thrilling St Mary's Trophy. Off-track, the Revival High Street offers vintage shopping, fairground attractions, and the best people-watching in motorsport.\n\nClassic Chrome will be in attendance throughout the weekend. If you're planning to attend and would like to meet the team or discuss a car, do get in touch beforehand — we'd be delighted to arrange a meeting over a pint of Revival Ale.",
    coverImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&h=600&q=80",
    date: "2026-03-20",
    author: "Classic Chrome",
    category: "Events",
    featured: true,
  },
  {
    id: "p6",
    slug: "summer-maintenance-checklist",
    title: "Summer Maintenance Checklist for Your Classic",
    excerpt: "Six simple checks to ensure your classic car is ready for the summer driving season — from cooling systems to tyre pressures.",
    body: "Summer is the season when classic cars truly come into their own — early morning drives through the countryside, evening runs to the pub, and the occasional continental tour. But before you set off, a few simple checks can prevent a breakdown from spoiling your plans.\n\nStart with the cooling system — the most common cause of summer breakdowns. Check coolant levels, inspect hoses for perishing, and ensure the radiator is free of debris. Next, tyre pressures: hot weather and sustained high-speed driving increase pressures, so check them cold and adjust accordingly. Brake fluid absorbs moisture over time, and that moisture can boil under sustained use — if your fluid is more than two years old, a change is good insurance. Finally, check your battery terminals are clean and tight, test all lights, and ensure your breakdown cover is up to date.\n\nIf you'd prefer to have a professional give your car a pre-season once-over, our workshop is always happy to help. A summer health check takes less than an hour and could save you a long wait at the roadside.",
    coverImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&h=600&q=80",
    date: "2026-02-15",
    author: "Classic Chrome",
    category: "Ownership",
    featured: false,
  },
]

const categories = ["All", "Market", "Events", "Ownership"]

export default function NewsPage() {
  const [category, setCategory] = useState("All")

  const filtered = category === "All" ? allPosts : allPosts.filter((p) => p.category === category)

  return (
    <>
      {/* Hero */}
      <section className="bg-carbon py-24 md:py-32">
        <Container>
          <Reveal>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-chrome">News & Stories</span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ivory">News</h1>
            <p className="mt-4 max-w-2xl text-base text-chrome-lo">Classic car news, market insight and updates from Classic Chrome.</p>
          </Reveal>
        </Container>
      </section>

      <Container className="py-20 md:py-28">
        {/* Featured post */}
        {allPosts.filter((p) => p.featured).slice(0, 1).map((post) => (
          <Reveal key={post.id}>
            <Link href={`/news/${post.slug}`} className="group block rounded-lg border border-graphite/10 overflow-hidden transition-shadow hover:shadow-lg mb-12">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <Image src={post.coverImage} alt={post.title} fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  {/* TODO: replace with real photo */}
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs font-medium uppercase tracking-wider text-accent">{post.category}</span>
                  <h2 className="mt-2 font-display text-2xl leading-tight tracking-tight group-hover:text-accent transition-colors">{post.title}</h2>
                  <p className="mt-3 text-sm text-muted line-clamp-3">{post.excerpt}</p>
                  <p className="mt-4 text-xs text-muted">{format(parseISO(post.date), "d MMMM yyyy")} · {post.author}</p>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
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

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <Link href={`/news/${post.slug}`} className="group block rounded-lg border border-graphite/10 overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={post.coverImage} alt={post.title} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  {/* TODO: replace with real photo */}
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted">{post.category}</span>
                  <h3 className="mt-1 font-display text-lg leading-tight tracking-tight group-hover:text-accent transition-colors">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{post.excerpt}</p>
                  <p className="mt-3 text-xs text-muted">{format(parseISO(post.date), "d MMM yyyy")} · {post.author}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  )
}
