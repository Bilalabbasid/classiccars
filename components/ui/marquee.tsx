"use client"

interface MarqueeProps {
  items: string[]
  className?: string
}

export default function Marquee({ items, className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex animate-marquee gap-8 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-xs font-medium uppercase tracking-[0.2em] text-chrome"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
