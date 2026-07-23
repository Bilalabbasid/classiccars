import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import Container from "@/components/ui/container"
import { format, parseISO } from "date-fns"

// Shared data - same as news page
const allPosts = [
  { id: "p1", slug: "classic-cars-appreciating-asset", title: "Classic Cars as an Appreciating Asset", excerpt: "Why discerning collectors are looking beyond stocks and property.", body: "In an era of volatile markets and uncertain returns, an increasing number of high-net-worth individuals are looking beyond traditional asset classes and towards tangible investments they can enjoy. Classic cars, once the preserve of passionate enthusiasts, have emerged as a compelling alternative asset — one that combines potential appreciation with the visceral pleasure of ownership and use.\n\nData from the major auction houses and specialist insurers confirms that carefully selected classic and collectible cars have outperformed many conventional investment classes over the past two decades. The key, as with any investment, is curation — buying the right car, at the right price, with the right provenance. At Classic Chrome, we advise our clients not just on what to buy, but on what makes a car special: originality, history, rarity, and that indefinable quality of desirability that separates the merely valuable from the truly sought-after.\n\nOf course, the financial case is only part of the story. Unlike a share certificate or a government bond, a classic car can be driven, shown, and shared. It can take you on a tour of the Scottish Highlands, turn heads at the Goodwood Revival, or simply provide a moment of mechanical escape on a Sunday morning. That is, ultimately, what makes the classic car market so resilient — the cars exist to be enjoyed, and that enjoyment will always have value.", coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&h=600&q=80", date: "2026-07-10", author: "Classic Chrome", category: "Market", featured: true },
  { id: "p2", slug: "ulez-mot-exemption-40-year-classics", title: "Understanding ULEZ & MOT Exemption for 40+ Year-Old Classics", excerpt: "A practical guide to ULEZ and historic vehicle MOT exemption.", body: "With the expansion of London's Ultra Low Emission Zone (ULEZ) and the ongoing conversation around emissions regulations, classic car owners have legitimate questions about where they stand. The good news is that vehicles with a 'historic' tax class — those aged 40 years or more — are exempt from ULEZ charges.\n\nSeparately, vehicles over 40 years old that have not been substantially modified are exempt from mandatory MOT testing. However, you must declare your vehicle as a Vehicle of Historic Interest (VHI) when taxing it, and it remains your responsibility to ensure the vehicle is roadworthy. At Classic Chrome, we strongly recommend that all our clients continue to have their cars inspected annually.\n\nIf you're unsure whether your classic qualifies, or if you'd like guidance on keeping your historic vehicle in top mechanical condition, our team is always happy to advise.", coverImage: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=1200&h=600&q=80", date: "2026-06-22", author: "Classic Chrome", category: "Ownership", featured: false },
  { id: "p3", slug: "prepare-classic-winter-storage", title: "How to Prepare Your Classic for Winter Storage", excerpt: "Our essential checklist for winter storage.", body: "Whether you store your classic in a heated garage or under a breathable cover in a barn, proper winter preparation is the single most effective thing you can do to protect your car. The enemies are moisture, stale fuel, flat-spotted tyres, and flat batteries — all entirely preventable.\n\nStart with a thorough clean. Wax the paintwork, treat the leather, and ensure no moisture is trapped anywhere. Fill the fuel tank to the brim and add a fuel stabiliser. Connect a quality trickle charger — we recommend CTEK. Over-inflate tyres by 5–8 PSI to prevent flat spots. Finally, cover with a breathable indoor cover — never plastic.\n\nIf you need any storage products, our showroom stocks CTEK chargers, specialist covers, and storage accessories — just ask.", coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&h=600&q=80", date: "2026-05-14", author: "Classic Chrome", category: "Ownership", featured: false },
  { id: "p4", slug: "e10-fuel-classic-cars", title: "E10 Fuel and Your Classic: What to Know", excerpt: "The introduction of E10 petrol — what classic owners need to know.", body: "Since the introduction of E10 as the standard unleaded petrol grade, many classic car owners have expressed concern. E10 contains up to 10% ethanol, which can cause issues in older fuel systems — particularly rubber hoses, seals, and carburettor components.\n\nThe solution is straightforward: use E5 (Super Unleaded) instead, which contains a maximum of 5% ethanol and is still widely available. Some specialist fuel suppliers also offer ethanol-free petrol. If your car has been run on E10 inadvertently, a single tank is unlikely to cause immediate damage, but switch to E5 for ongoing use. Our workshop can advise on any preventative measures specific to your car.", coverImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&h=600&q=80", date: "2026-04-08", author: "Classic Chrome", category: "Ownership", featured: false },
  { id: "p5", slug: "goodwood-revival-2026-preview", title: "Goodwood Revival 2026: What to Expect", excerpt: "The most anticipated event on the classic motoring calendar returns.", body: "The Goodwood Revival is more than a motor race — it is a time machine. Every September, the Goodwood Motor Circuit transforms into a faithful recreation of its 1948–1966 heyday, with period dress, historic aircraft, and some of the most valuable racing cars in the world being driven as their creators intended.\n\nThe 2026 event promises to be one of the finest yet. The entry list includes an extraordinary gathering of Ford GT40s — marking 60 years since the legendary 1-2-3 Le Mans finish — along with spectacular grids of 1950s sports cars and 1960s saloons. Classic Chrome will be in attendance throughout the weekend. If you'd like to meet the team, do get in touch beforehand.", coverImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&h=600&q=80", date: "2026-03-20", author: "Classic Chrome", category: "Events", featured: true },
  { id: "p6", slug: "summer-maintenance-checklist", title: "Summer Maintenance Checklist for Your Classic", excerpt: "Six simple checks to ensure your classic is ready for summer.", body: "Summer is the season when classic cars truly come into their own. But before you set off, a few simple checks can prevent a breakdown. Start with the cooling system — check coolant levels, inspect hoses, and ensure the radiator is clear. Check tyre pressures cold. Brake fluid absorbs moisture — if it's more than two years old, a change is good insurance. Test all lights and ensure your breakdown cover is up to date.\n\nIf you'd prefer a professional pre-season once-over, our workshop is always happy to help. A summer health check takes less than an hour.", coverImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&h=600&q=80", date: "2026-02-15", author: "Classic Chrome", category: "Ownership", featured: false },
]

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = allPosts.filter((p) => p.id !== post.id).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="bg-carbon py-20 md:py-24">
        <Container>
          <Link href="/news" className="inline-flex items-center gap-1 text-xs text-chrome hover:text-ivory transition-colors mb-6">
            <ArrowLeft className="h-3 w-3" /> Back to News
          </Link>
          <span className="text-xs font-medium uppercase tracking-wider text-accent">{post.category}</span>
          <h1 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-ivory">{post.title}</h1>
          <p className="mt-3 text-sm text-chrome-lo">{format(parseISO(post.date), "d MMMM yyyy")} · {post.author}</p>
        </Container>
      </section>

      <Container className="py-16 md:py-20">
        <article className="mx-auto max-w-3xl">
          <div className="relative aspect-video overflow-hidden rounded-lg mb-10">
            <Image src={post.coverImage} alt={post.title} fill sizes="100vw" className="object-cover" priority />
          </div>
          <div className="space-y-5 text-base leading-relaxed text-carbon/80">
            {post.body.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {/* Share row */}
          <div className="mt-10 flex items-center gap-4 border-t border-graphite/10 pt-6">
            <span className="text-xs text-muted">Share:</span>
            {["Twitter", "Facebook", "Email"].map((platform) => (
              <button key={platform} className="text-xs text-accent hover:underline">{platform}</button>
            ))}
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-graphite/10 pt-16">
            <h3 className="font-display text-2xl tracking-tight mb-8">Related Articles</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} href={`/news/${p.slug}`} className="group block">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image src={p.coverImage} alt={p.title} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <span className="mt-3 block text-xs font-medium uppercase tracking-wider text-muted">{p.category}</span>
                  <h4 className="mt-1 font-display text-lg leading-tight group-hover:text-accent transition-colors">{p.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug)
  if (!post) return { title: "Not Found" }
  return { title: post.title, description: post.excerpt }
}
