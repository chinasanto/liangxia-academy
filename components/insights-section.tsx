import Link from 'next/link'
import { ArrowRight, BookText } from 'lucide-react'

import { InsightCard } from '@/components/insight-card'
import type { InsightArticle } from '@/lib/insight-types'

type InsightsSectionProps = {
  title?: string
  description?: string
  articles: InsightArticle[]
  className?: string
}

export function InsightsSection({
  title = '量化技巧',
  description = '把量化研发中的高频难题拆成可读、可用、可执行的专题文章，帮助你在课程之外持续积累方法与工程意识。',
  articles,
  className,
}: InsightsSectionProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section className={className ?? 'rounded-[28px] border border-white/[0.08] bg-card/45 p-6 sm:p-8'}>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <BookText className="h-3.5 w-3.5" />
            独立模块
          </div>
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>

        <Link
          href="/insights"
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-background/60"
        >
          查看全部文章
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {articles.map((article) => (
          <InsightCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
