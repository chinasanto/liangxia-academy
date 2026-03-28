'use client'

import { useMemo, useState } from 'react'
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
  const [categoriesExpanded, setCategoriesExpanded] = useState(false)

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

  const visibleCategories = useMemo(() => {
    const collapsedCount = 8

    if (categoriesExpanded || categories.length <= collapsedCount) {
      return categories
    }

    const nextCategories = categories.slice(0, collapsedCount)

    if (selectedCategory !== '全部' && !nextCategories.includes(selectedCategory)) {
      return [...nextCategories, selectedCategory]
    }

    return nextCategories
  }, [categories, categoriesExpanded, selectedCategory])

  const normalizedSearch = normalizeText(search)

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

  return (
    <section className={cn('rounded-[28px] border border-white/[0.08] bg-card/45 p-6 sm:p-8', className)}>
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
            当前展示 {filteredArticles.length} / {articles.length} 篇
          </span>
          {showAllLink ? (
            <Link
              href="/academy/insights"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-background/60"
            >
              查看独立文章页
            </Link>
          ) : null}
        </div>
      </div>

      <div className="mb-6 rounded-[24px] border border-white/[0.08] bg-background/70 p-5">
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
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-3 block text-xs font-semibold tracking-[0.12em] text-muted-foreground">
            文章分类
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {visibleCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'rounded-full px-3 py-2 text-xs font-semibold transition',
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-muted-foreground hover:text-foreground',
                )}
              >
                {category}
              </button>
            ))}
            {categories.length > visibleCategories.length ? (
              <button
                type="button"
                onClick={() => setCategoriesExpanded(true)}
                className="rounded-full border border-white/[0.08] bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
              >
                ...
              </button>
            ) : null}
            {categoriesExpanded && categories.length > 8 ? (
              <button
                type="button"
                onClick={() => setCategoriesExpanded(false)}
                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition hover:opacity-85"
              >
                收起
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <InsightCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-[22px] border border-dashed border-white/[0.08] bg-background/60 p-6 text-sm text-muted-foreground">
          当前筛选条件下没有匹配文章，可以切回“全部”或换一个关键词试试。
        </div>
      )}
    </section>
  )
}
