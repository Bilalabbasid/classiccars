"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/store/useAuth"

const stepSchemas = [
  z.object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(7, "Required"),
    address: z.string().min(1, "Required"),
    city: z.string().min(1, "Required"),
    postcode: z.string().min(1, "Required"),
  }),
  z.object({
    idDoc: z.string().min(1, "Document name required"),
  }),
  z.object({
    cardholder: z.string().min(1, "Required"),
    cardNumber: z.string().min(16, "Enter valid card number"),
    expiry: z.string().min(5, "MM/YY required"),
    cvv: z.string().min(3, "Required"),
  }),
]

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [complete, setComplete] = useState(false)
  const auth = useAuth()

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(stepSchemas[step] as any),
  })

  const onSubmit = () => {
    if (step < 2) {
      setStep(step + 1)
      reset()
    } else {
      setComplete(true)
      auth.register()
      toast.success("Registration complete! You can now place bids.")
    }
  }

  if (complete) {
    return (
      <Container className="pt-24 pb-20 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-2/10 text-accent-2">
            <Check className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-3xl tracking-tight">Registration Complete</h1>
          <p className="mt-4 text-muted">Your account has been created and is pending approval. You'll receive a confirmation email within 24 hours.</p>
          <Link href="/auctions" className="mt-6 inline-block"><Button size="lg">Browse Auctions</Button></Link>
        </div>
      </Container>
    )
  }

  return (
    <Container className="pt-24 pb-20">
      <div className="flex items-center gap-2 text-sm text-muted mb-10">
        <Link href="/" className="hover:text-carbon">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/auctions" className="hover:text-carbon">Auctions</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-carbon">Register to Bid</span>
      </div>

      <div className="mx-auto max-w-lg">
        <SectionHeading
          title={["Personal Details", "ID Verification", "Payment Method"][step]}
          intro={["Enter your contact information.", "Upload a form of identification.", "Add a card for bid verification."][step]}
        />

        {/* Progress */}
        <div className="mb-8 flex gap-2">
          {[0, 1, 2].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? "bg-accent" : "bg-graphite/20"}`} />
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === 0 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted">First Name *</label>
                  <Input {...register("firstName")} className="mt-1" />
                  {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message as string}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted">Last Name *</label>
                  <Input {...register("lastName")} className="mt-1" />
                  {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message as string}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Email *</label>
                <Input {...register("email")} type="email" className="mt-1" />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message as string}</p>}
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Phone *</label>
                <Input {...register("phone")} className="mt-1" />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message as string}</p>}
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
            </>
          )}

          {step === 1 && (
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted">ID Document Type *</label>
              <Input {...register("idDoc")} placeholder="Passport / Driving Licence" className="mt-1" />
              <p className="mt-2 text-xs text-muted">You will be asked to upload a photo after registration.</p>
            </div>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Cardholder Name *</label>
                <Input {...register("cardholder")} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted">Card Number *</label>
                <Input {...register("cardNumber")} placeholder="0000 0000 0000 0000" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted">Expiry *</label>
                  <Input {...register("expiry")} placeholder="MM/YY" className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted">CVV *</label>
                  <Input {...register("cvv")} className="mt-1" />
                </div>
              </div>
              <p className="text-xs text-muted">No charge will be made. This card is for identity verification only.</p>
            </>
          )}

          <div className="flex gap-3 pt-4">
            {step > 0 && <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
            <Button type="submit" className="flex-1">{step === 2 ? "Complete Registration" : "Continue"}</Button>
          </div>
        </form>
      </div>
    </Container>
  )
}
