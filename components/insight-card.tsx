import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react'

import type { InsightArticle } from '@/lib/insight-types'

type InsightCardProps = {
  article: InsightArticle
}

export function InsightCard({ article }: InsightCardProps) {
  return (
    <article className="border-b border-white/[0.08] bg-transparent px-0 pb-5 transition last:border-b-0 sm:rounded-[24px] sm:border sm:bg-background/75 sm:p-5 sm:hover:border-primary/30">
      <div className="mb-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
          {article.category}
        </span>
        {article.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-card/60 px-3 py-1 text-xs text-muted-foreground sm:bg-card"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="text-xl font-semibold text-foreground">{article.title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {article.excerpt}
      </p>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {article.publishedAt}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5" />
          {article.readTime}
        </span>
      </div>

      <Link
        href={`/academy/insights/${article.slug}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-85"
      >
        阅读文章
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  )
}
