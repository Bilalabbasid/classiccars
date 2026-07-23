import Link from "next/link"
import Container from "@/components/ui/container"

export default function DisclaimerPage() {
  return (
    <Container className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl tracking-tight">Disclaimer</h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted">
          <p>The information contained on this website is for general information purposes only. While Classic Chrome endeavours to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
          <p>Vehicle specifications, prices, and availability are subject to change without notice. Images may show optional equipment. All vehicle purchases are subject to our standard terms and conditions of sale, a copy of which is available upon request.</p>
          <p>Classic Chrome is authorised and regulated by the Financial Conduct Authority for consumer credit activities. Company Registration Number: 3081237. VAT Registration Number: 662636718.</p>
        </div>
      </div>
    </Container>
  )
}
