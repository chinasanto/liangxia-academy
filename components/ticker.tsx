export function Ticker() {
  const items = [
    { cn: "虾链场", en: "CrayfishEx" },
    { cn: "造虾局", en: "AlphaForge" },
    { cn: "AI量化学院", en: "AI Quant Academy" },
    { cn: "虾货铺", en: "LobsterOS" },
    { cn: "领虾营", en: "ShrimpSeed" },
    { cn: "Web 4.0 量化新纪元", en: "▲" },
  ]

  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-white/[0.06] bg-card py-2.5 relative z-10">
      <div className="flex gap-16 whitespace-nowrap animate-ticker">
        {doubled.map((item, i) => (
          <span key={i} className="font-mono text-[11px] text-muted-foreground tracking-[0.1em] shrink-0">
            {item.cn} <span className="text-primary">{item.en}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
