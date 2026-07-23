import Link from "next/link"
import Container from "@/components/ui/container"

export default function PrivacyPage() {
  return (
    <Container className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl tracking-tight">Privacy Policy</h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted">
          <p>Classic Chrome (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard information about you when you visit our website or use our services.</p>
          <h2 className="font-display text-xl text-carbon">Information We Collect</h2>
          <p>We may collect personal information including your name, email address, phone number, postal address, and details of vehicles you own or are interested in purchasing. We collect this information when you fill out forms on our website, contact us by phone or email, or visit our showroom.</p>
          <h2 className="font-display text-xl text-carbon">How We Use Your Data</h2>
          <p>Your data is used to respond to your enquiries, provide services you have requested, send you information about our stock and services (with your consent), and comply with legal obligations. We do not sell your personal data to third parties.</p>
          <h2 className="font-display text-xl text-carbon">Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. You may withdraw consent for marketing communications at any time. To exercise these rights, please contact us at info@classic-chrome.co.uk.</p>
          <h2 className="font-display text-xl text-carbon">Contact</h2>
          <p>Classic Chrome, 12 Sheen Lane, Mortlake, London SW14 8LN. Company Reg: 3081237. VAT: 662636718.</p>
        </div>
      </div>
    </Container>
  )
}
