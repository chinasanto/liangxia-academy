'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, Sparkles } from 'lucide-react'

import { InsightCard } from '@/components/insight-card'
import { Input } from '@/components/ui/input'
import type { InsightArticle } from '@/lib/insight-types'
import { cn } from '@/lib/utils'

type InsightsExplorerProps = {
  articles: InsightArticle[]
  title?: string
  description?: string
  className?: string
  showAllLink?: boolean
}

function normalizeText(value: string) {
  return value.trim().toLowerCase()
}

export function InsightsExplorer({
  articles,
  title = '量化技巧',
  description = '按关键词和文章分类筛选内容，能更快找到和你当前学习阶段最相关的文章。',
  className,
  showAllLink = false,
}: InsightsExplorerProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [page, setPage] = useState(1)

  const PAGE_SIZE = 12

  const categories = useMemo(() => {
    const counts = new Map<string, number>()

    for (const article of articles) {
      counts.set(article.category, (counts.get(article.category) ?? 0) + 1)
    }

    return [
      '全部',
      ...Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh-CN'))
        .map(([category]) => category),
    ]
  }, [articles])

  const normalizedSearch = normalizeText(search)

  const suggestionPool = useMemo(() => {
    return Array.from(
      new Set(
        articles.flatMap((article) => [
          article.title,
          ...article.tags,
          ...article.keyTakeaways,
        ]),
      ),
    )
  }, [articles])

  const suggestions = useMemo(() => {
    if (normalizedSearch.length === 0) {
      return []
    }

    return suggestionPool
      .filter((item) => item.toLowerCase().includes(normalizedSearch))
      .filter((item) => item.toLowerCase() !== normalizedSearch)
      .slice(0, 6)
  }, [normalizedSearch, suggestionPool])

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchCategory =
        selectedCategory === '全部' || article.category === selectedCategory
      const matchSearch =
        normalizedSearch.length === 0 ||
        [
          article.title,
          article.excerpt,
          article.description,
          article.category,
          ...article.tags,
          ...article.sections.map((section) => section.title),
          ...article.keyTakeaways,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch)

      return matchCategory && matchSearch
    })
  }, [articles, normalizedSearch, selectedCategory])

  useEffect(() => {
    setPage(1)
  }, [search, selectedCategory])

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  return (
    <section className={cn('p-0 sm:rounded-[28px] sm:border sm:border-white/[0.08] sm:bg-card/45 sm:p-8', className)}>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            搜索与分类
          </div>
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-primary/12 px-3 py-1.5 text-sm font-semibold text-primary">
            当前展示 {paginatedArticles.length} / {filteredArticles.length} 篇
          </span>
          {showAllLink ? (
            <Link
              href="/academy/insights"
              className="inline-flex items-center gap-2 rounded-full px-0 py-1 text-sm font-semibold text-primary transition hover:opacity-85 sm:border sm:border-white/[0.08] sm:px-4 sm:py-2 sm:hover:border-primary/30 sm:hover:bg-background/60"
            >
              查看独立文章页
            </Link>
          ) : null}
        </div>
      </div>

      <div className="mb-6 border-b border-white/[0.08] pb-5 sm:rounded-[24px] sm:border sm:bg-background/70 sm:p-5">
        <div>
          <label className="mb-2 block text-xs font-semibold tracking-[0.12em] text-muted-foreground">
            搜索文章
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜索标题、关键词、问题或方法"
              className="border-white/[0.08] bg-card pl-10 text-foreground"
            />
            {suggestions.length > 0 ? (
              <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-[18px] border border-white/[0.08] bg-background shadow-[0_20px_50px_rgba(16,32,46,0.12)]">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSearch(item)}
                    className="flex w-full items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 text-left text-sm text-foreground/88 transition hover:bg-card last:border-b-0"
                  >
                    <span className="line-clamp-1">{item}</span>
                    <span className="shrink-0 text-xs text-primary">建议</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-3 block text-xs font-semibold tracking-[0.12em] text-muted-foreground">
            文章分类
          </div>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="h-11 w-full rounded-xl border border-white/[0.08] bg-card px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {paginatedArticles.map((article) => (
            <InsightCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="border-t border-dashed border-white/[0.08] pt-6 text-sm text-muted-foreground sm:rounded-[22px] sm:border sm:bg-background/60 sm:p-6">
          当前筛选条件下没有匹配文章，可以切回“全部”或换一个关键词试试。
        </div>
      )}

      {totalPages > 1 ? (
        <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            第 {currentPage} / {totalPages} 页
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={currentPage === 1}
              className="rounded-full border border-white/[0.08] px-4 py-2 text-sm font-medium text-foreground transition disabled:cursor-not-allowed disabled:opacity-45 hover:border-primary/30"
            >
              上一页
            </button>
            <button
              type="button"
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              disabled={currentPage === totalPages}
              className="rounded-full border border-white/[0.08] px-4 py-2 text-sm font-medium text-foreground transition disabled:cursor-not-allowed disabled:opacity-45 hover:border-primary/30"
            >
              下一页
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
