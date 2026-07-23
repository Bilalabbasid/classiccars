interface SpecGroup {
  group: string
  items: { label: string; value: string }[]
}

interface SpecListProps {
  specs: SpecGroup[]
  className?: string
}

export default function SpecList({ specs, className = "" }: SpecListProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {specs.map((group) => (
        <div key={group.group}>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-chrome">
            {group.group}
          </h4>
          <dl className="grid gap-2">
            {group.items.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between border-b border-graphite/10 pb-2"
              >
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="text-sm font-medium text-carbon text-right">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}
