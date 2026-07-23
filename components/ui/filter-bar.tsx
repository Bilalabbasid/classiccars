"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LayoutGrid, List } from "lucide-react"

interface FilterBarProps {
  makes: string[]
  selectedMake: string
  onMakeChange: (make: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  resultCount: number
  className?: string
}

export default function FilterBar({
  makes,
  selectedMake,
  onMakeChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  resultCount,
  className = "",
}: FilterBarProps) {
  return (
    <div className={`sticky top-16 z-30 border-b border-graphite/10 bg-ivory/95 backdrop-blur-md py-4 ${className}`}>
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-6 md:px-10 lg:px-16">
        <div className="flex items-center gap-3">
          <Select value={selectedMake} onValueChange={onMakeChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Makes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Makes</SelectItem>
              {makes.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="year-desc">Year: Newest</SelectItem>
              <SelectItem value="year-asc">Year: Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted">{resultCount} results</span>
          <div className="flex rounded-lg border border-graphite/20 overflow-hidden">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 transition-colors ${viewMode === "grid" ? "bg-charcoal/10 text-carbon" : "text-muted hover:text-carbon"}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 transition-colors ${viewMode === "list" ? "bg-charcoal/10 text-carbon" : "text-muted hover:text-carbon"}`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
