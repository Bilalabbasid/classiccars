"use client"

import { Star } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import type { Review } from "@/types/review"
import { format, parseISO } from "date-fns"

interface ReviewCarouselProps {
  reviews: Review[]
  className?: string
}

export default function ReviewCarousel({ reviews, className = "" }: ReviewCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  )

  return (
    <div className={`overflow-hidden ${className}`} ref={emblaRef}>
      <div className="flex">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="min-w-0 flex-[0_0_100%] px-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
          >
            <div className="rounded-lg border border-graphite/10 bg-paper p-6 h-full">
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-gold text-gold" : "text-graphite/30"}`}
                  />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-carbon">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <div className="mt-4 border-t border-graphite/10 pt-3">
                <p className="text-sm font-medium text-carbon">{review.author}</p>
                <p className="text-xs text-muted">
                  {format(parseISO(review.date), "MMM yyyy")}
                  {review.car && ` · ${review.car}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
