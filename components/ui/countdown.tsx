"use client"

import { useState, useEffect } from "react"
import { differenceInSeconds } from "date-fns"

interface CountdownProps {
  targetDate: string
  compact?: boolean
  className?: string
}

function pad(n: number): string {
  return n.toString().padStart(2, "0")
}

export default function Countdown({ targetDate, compact = false, className = "" }: CountdownProps) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const calc = () => {
      const diff = differenceInSeconds(new Date(targetDate), new Date())
      setSeconds(Math.max(0, diff))
    }
    calc()
    const interval = setInterval(calc, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  if (seconds <= 0) return <span className={className}>Ended</span>

  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  const isUrgent = seconds < 3600

  if (compact) {
    return (
      <span className={`font-mono text-xs tabular-nums ${isUrgent ? "text-red-500" : "text-carbon"} ${className}`}>
        {d > 0 && `${d}d `}{pad(h)}h {pad(m)}m {pad(s)}s
      </span>
    )
  }

  return (
    <div className={`flex gap-3 md:gap-5 ${className}`}>
      {[
        { value: d, label: "Days" },
        { value: h, label: "Hours" },
        { value: m, label: "Min" },
        { value: s, label: "Sec" },
      ].map((unit) => (
        <div key={unit.label} className="text-center">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-lg border text-xl font-mono font-bold tabular-nums md:h-16 md:w-16 md:text-2xl ${
              isUrgent
                ? "border-red-500/30 bg-red-50 text-red-500"
                : "border-graphite/20 bg-charcoal/5 text-carbon"
            }`}
          >
            {pad(unit.value)}
          </div>
          <span className="mt-1 block text-[10px] uppercase tracking-widest text-muted">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
