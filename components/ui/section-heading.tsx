interface SectionHeadingProps {
  eyebrow?: string
  title: string
  intro?: string
  className?: string
  light?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  className = "",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      {eyebrow && (
        <span className={`mb-4 block text-xs font-semibold uppercase tracking-[0.18em] ${light ? "text-chrome" : "text-muted"}`}>
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight ${
          light ? "text-ivory" : "text-carbon"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed ${light ? "text-chrome-lo" : "text-muted"}`}>
          {intro}
        </p>
      )}
    </div>
  )
}
