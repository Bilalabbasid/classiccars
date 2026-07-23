"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/store/useCart"
import { formatPrice } from "@/lib/utils"

const checkoutSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  address: z.string().min(1),
  city: z.string().min(1),
  postcode: z.string().min(1),
})

export default function CheckoutPage() {
  const cart = useCart()
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
  })

  const onSubmit = () => {
    setSuccess(true)
    cart.clearCart()
  }

  if (success) {
    return (
      <Container className="pt-24 pb-20 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-2/10 text-accent-2"><Check className="h-8 w-8" /></div>
          <h1 className="mt-6 font-display text-3xl tracking-tight">Order Confirmed</h1>
          <p className="mt-4 text-muted">Order #CC-{Math.floor(Math.random() * 90000) + 10000} has been placed. You'll receive a confirmation email shortly.</p>
          <Link href="/shop" className="mt-6 inline-block"><Button size="lg">Continue Shopping</Button></Link>
        </div>
      </Container>
    )
  }

  if (cart.items.length === 0) {
    return (
      <Container className="pt-24 pb-20 text-center">
        <h1 className="font-display text-2xl tracking-tight">Your cart is empty</h1>
        <Link href="/shop" className="mt-4 inline-block"><Button variant="outline">Browse the Shop</Button></Link>
      </Container>
    )
  }

  return (
    <Container className="pt-24 pb-20">
      <div className="flex items-center gap-2 text-sm text-muted mb-10">
        <Link href="/" className="hover:text-carbon">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-carbon">Checkout</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading title="Checkout" />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted">Email *</label>
              <Input {...register("email")} type="email" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">First Name *</label>
                <Input {...register("firstName")} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Last Name *</label>
                <Input {...register("lastName")} className="mt-1" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted">Address *</label>
              <Input {...register("address")} className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">City *</label>
                <Input {...register("city")} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Postcode *</label>
                <Input {...register("postcode")} className="mt-1" />
              </div>
            </div>

            <div className="rounded-lg border border-graphite/10 bg-charcoal/5 p-4 mt-6">
              <p className="text-xs font-medium uppercase tracking-wider text-muted mb-2">Payment</p>
              <p className="text-sm text-muted">This is a mock checkout. No actual payment will be processed.</p>
            </div>

            <Button type="submit" size="lg" className="w-full mt-4">Place Order</Button>
          </form>
        </div>

        {/* Order summary */}
        <div className="lg:sticky lg:top-24">
          <h3 className="font-display text-xl tracking-tight mb-4">Order Summary</h3>
          <div className="rounded-lg border border-graphite/10 p-6">
            {cart.items.map((item) => (
              <div key={item.product.id} className="flex justify-between py-3 border-b border-graphite/5 last:border-0">
                <div>
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-muted">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
              </div>
            ))}
            <div className="mt-4 flex justify-between border-t border-graphite/10 pt-4">
              <span className="font-medium">Total</span>
              <span className="font-display text-xl font-semibold">{formatPrice(cart.subtotal())}</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
