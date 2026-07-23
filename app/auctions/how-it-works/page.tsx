import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const steps = [
  { num: "01", title: "Register", desc: "Create your Classic Chrome Auctions account. We'll ask for basic contact information and verify your identity. Registration is free and takes less than five minutes." },
  { num: "02", title: "Get Approved", desc: "Our team reviews your registration within 24 hours. Once approved, you'll receive a bidder number and full access to our auction platform." },
  { num: "03", title: "Browse & Watch", desc: "Explore the catalogue and add lots to your watchlist. Each listing includes a detailed condition report, high-resolution photography, and our specialist's notes." },
  { num: "04", title: "Bid", desc: "Place bids online, by phone, or via commission (absentee) bid. Our live countdown ensures you never miss a closing window. Proxy bidding available." },
  { num: "05", title: "Win", desc: "If you're the highest bidder when the lot closes, you've won! You'll receive immediate notification and an invoice with payment instructions." },
  { num: "06", title: "Pay & Collect", desc: "Payment is due within 7 days. We accept bank transfer and debit/credit cards. Collection or shipping can be arranged — we work with trusted international transport partners." },
]

const faqs = [
  { q: "What is the buyer's premium?", a: "A buyer's premium of 12.5% (incl. VAT) is added to the hammer price of each lot. This covers our cataloguing, photography, condition reporting, and secure transaction handling." },
  { q: "Is there a reserve price?", a: "Most lots have a confidential reserve price agreed with the consignor. If bidding does not reach the reserve, the lot will not be sold. We indicate whether the reserve has been met on each lot page." },
  { q: "Can I view the cars in person?", a: "Absolutely. Viewing days are held at our Mortlake showroom two weeks before each auction closes. Private viewings can also be arranged by appointment." },
  { q: "What payment methods are accepted?", a: "We accept bank transfer (CHAPS/BACS) and debit/credit cards (up to £10,000). International buyers: please contact us about currency and SWIFT transfers." },
  { q: "Do you offer shipping?", a: "Yes. We work with several trusted international vehicle transport partners and can arrange enclosed shipping to most destinations worldwide." },
]

export default function HowItWorksPage() {
  return (
    <Container className="pt-24 pb-20">
      <div className="flex items-center gap-2 text-sm text-muted mb-10">
        <Link href="/" className="hover:text-carbon">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/auctions" className="hover:text-carbon">Auctions</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-carbon">How Bidding Works</span>
      </div>
      <SectionHeading title="How Bidding Works" intro="New to classic car auctions? Here's everything you need to know, from registration to driving away in your new pride and joy." />

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <div key={step.num} className="rounded-lg border border-graphite/10 p-6">
            <span className="text-3xl font-display font-bold text-chrome">{step.num}</span>
            <h3 className="mt-3 font-display text-xl">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl tracking-tight mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent><p className="text-sm text-muted">{faq.a}</p></AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-12 text-center">
        <Link href="/auctions/register"><Button size="lg">Register to Bid</Button></Link>
      </div>
    </Container>
  )
}
