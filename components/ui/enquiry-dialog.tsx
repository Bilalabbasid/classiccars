"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const enquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type EnquiryFormData = z.infer<typeof enquirySchema>

interface EnquiryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  subject?: string
}

export default function EnquiryDialog({ open, onOpenChange, title = "Enquire", subject = "" }: EnquiryDialogProps) {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  })

  const onSubmit = async (data: EnquiryFormData) => {
    setSubmitting(true)
    // Mock submission
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    toast.success("Enquiry sent successfully. We'll be in touch shortly.")
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Fill in your details and we will get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <input type="hidden" value={subject} {...register("message")} />
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted">Name *</label>
            <Input {...register("name")} placeholder="Your full name" className="mt-1" />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted">Email *</label>
            <Input {...register("email")} type="email" placeholder="your@email.com" className="mt-1" />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted">Phone *</label>
            <Input {...register("phone")} type="tel" placeholder="+44 7..." className="mt-1" />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted">Message *</label>
            <textarea
              {...register("message")}
              rows={4}
              className="mt-1 flex w-full rounded-lg border border-graphite/30 bg-transparent px-4 py-3 text-sm text-carbon placeholder:text-muted focus:border-chrome focus:outline-none focus:ring-1 focus:ring-chrome transition-colors resize-none"
              placeholder={`I'm interested in ${subject || "this vehicle"}...`}
            />
            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Sending..." : "Send Enquiry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
