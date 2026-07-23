import Link from "next/link"
import { Check } from "lucide-react"
import Container from "@/components/ui/container"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  return (
    <Container className="pt-24 pb-20 text-center">
      <div className="mx-auto max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-2/10 text-accent-2">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-3xl tracking-tight">Order Confirmed</h1>
        <p className="mt-4 text-muted">Thank you for your order. You will receive a confirmation email shortly with your order details and tracking information.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop"><Button size="lg">Continue Shopping</Button></Link>
          <Link href="/"><Button variant="outline" size="lg">Return Home</Button></Link>
        </div>
      </div>
    </Container>
  )
}
