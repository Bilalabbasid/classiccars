import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "accent" | "outline" | "sold"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest transition-colors",
        variant === "default" && "bg-charcoal/10 text-carbon",
        variant === "gold" && "bg-gold/15 text-gold",
        variant === "accent" && "bg-accent/10 text-accent",
        variant === "outline" && "border border-graphite/30 text-muted",
        variant === "sold" && "bg-accent text-ivory",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
