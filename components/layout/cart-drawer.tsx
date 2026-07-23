"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/store/useCart"
import { formatPrice } from "@/lib/utils"

interface CartDrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function CartDrawer({ open: externalOpen, onOpenChange: externalOnOpenChange }: CartDrawerProps) {
  const cart = useCart()

  if (externalOpen === undefined) return null

  return (
    <Sheet open={externalOpen} onOpenChange={externalOnOpenChange}>
      <SheetContent side="right" className="flex w-full max-w-md flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cart.itemCount()})</SheetTitle>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-muted">Your cart is empty.</p>
            <Link href="/shop" className="mt-4 text-sm text-accent hover:underline">
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={item.product.id + (item.variant ?? "")} className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h4 className="text-sm font-medium">{item.product.name}</h4>
                    {item.variant && (
                      <p className="text-xs text-muted">{item.variant}</p>
                    )}
                    <p className="mt-1 text-sm font-semibold">{formatPrice(item.product.price)}</p>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="flex items-center rounded-md border border-graphite/20">
                        <button
                          onClick={() => cart.updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-muted hover:text-carbon transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-sm tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => cart.updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-muted hover:text-carbon transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => cart.removeItem(item.product.id)}
                        className="text-muted hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-graphite/10 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-display text-xl font-semibold">{formatPrice(cart.subtotal())}</span>
              </div>
              <p className="mt-1 text-xs text-muted">Shipping calculated at checkout</p>
              <Link href="/checkout" className="mt-4 block">
                <Button className="w-full">Checkout</Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
