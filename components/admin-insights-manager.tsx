'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  ExternalLink,
  FilePlus2,
  Search,
  Save,
  Trash2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { CourseCatalogEntry } from '@/lib/course-types'
import type { InsightArticle } from '@/lib/insight-types'

type AdminInsightsManagerProps = {
  courses: CourseCatalogEntry[]
  onRefreshDatabaseStatus?: () => Promise<void> | void
}

type AdminInsightForm = InsightArticle & {
  isNew?: boolean
  tagsText: string
  relatedCourseSlugsText: string
  keyTakeawaysText: string
  sectionsJson: string
}

function formatJson(value: unknown) {
  return JSON.stringify(value, null, 2)
}

function toForm(article: InsightArticle): AdminInsightForm {
  return {
    ...article,
    isNew: false,
    tagsText: article.tags.join(', '),
    relatedCourseSlugsText: article.relatedCourseSlugs.join(', '),
    keyTakeawaysText: article.keyTakeaways.join('\n'),
    sectionsJson: formatJson(article.sections),
  }
}

function createEmptyForm(): AdminInsightForm {
  const today = new Date().toISOString().slice(0, 10)

  return {
    slug: `insight-${today.replaceAll('-', '')}-${Date.now().toString().slice(-4)}`,
    title: '',
    excerpt: '',
    description: '',
    category: '量化技巧',
    tags: [],
    publishedAt: today,
    readTime: '6分钟',
    featured: false,
    relatedCourseSlugs: [],
    sections: [
      {
        title: '核心问题',
        paragraphs: ['请在这里写入这篇文章要解决的核心问题。'],
      },
      {
        title: '方法拆解',
        paragraphs: ['请在这里继续补充方法、流程和案例。'],
        bullets: ['要点 1', '要点 2'],
      },
    ],
    keyTakeaways: ['总结要点 1', '总结要点 2'],
    isNew: true,
    tagsText: '量化技巧, AI量化',
    relatedCourseSlugsText: '',
    keyTakeawaysText: '总结要点 1\n总结要点 2',
    sectionsJson: formatJson([
      {
        title: '核心问题',
        paragraphs: ['请在这里写入这篇文章要解决的核心问题。'],
      },
      {
        title: '方法拆解',
        paragraphs: ['请在这里继续补充方法、流程和案例。'],
        bullets: ['要点 1', '要点 2'],
      },
    ]),
  }
}

function normalizeList(value: string) {
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function buildPayload(form: AdminInsightForm): InsightArticle {
  let sections: InsightArticle['sections']

  try {
    sections = JSON.parse(form.sectionsJson) as InsightArticle['sections']
  } catch {
    throw new Error('正文结构 JSON 不是合法格式')
  }

  if (!Array.isArray(sections) || sections.length === 0) {
    throw new Error('正文结构至少需要 1 个 section')
  }

  return {
    slug: form.slug.trim(),
    title: form.title.trim(),
    excerpt: form.excerpt.trim(),
    description: form.description.trim(),
    category: form.category.trim(),
    tags: normalizeList(form.tagsText),
    publishedAt: form.publishedAt.trim(),
    readTime: form.readTime.trim(),
    featured: form.featured ?? false,
    relatedCourseSlugs: normalizeList(form.relatedCourseSlugsText),
    sections,
    keyTakeaways: normalizeList(form.keyTakeawaysText),
  }
}

export function AdminInsightsManager({
  courses,
  onRefreshDatabaseStatus,
}: AdminInsightsManagerProps) {
  const [insights, setInsights] = useState<AdminInsightForm[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [savingSlug, setSavingSlug] = useState<string | null>(null)
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null)

  useEffect(() => {
    async function loadInsights() {
      try {
        const response = await fetch('/api/admin/insights')
        if (!response.ok) {
          throw new Error('加载文章失败')
        }

        const data = (await response.json()) as { insights: InsightArticle[] }
        const forms = data.insights.map(toForm)
        setInsights(forms)
        setSelectedSlug(forms[0]?.slug ?? null)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : '加载文章失败')
      } finally {
        setLoading(false)
      }
    }

    void loadInsights()
  }, [])

  const filteredInsights = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    if (!keyword) {
      return insights
    }

    return insights.filter((article) =>
      [
        article.title,
        article.slug,
        article.category,
        article.tagsText,
        article.excerpt,
      ]
        .join(' ')
        .toLowerCase()
        .includes(keyword),
    )
  }, [insights, search])

  const selectedInsight =
    insights.find((article) => article.slug === selectedSlug) ?? null

  function updateInsightField<K extends keyof AdminInsightForm>(
    slug: string,
    key: K,
    value: AdminInsightForm[K],
  ) {
    setInsights((current) =>
      current.map((article) =>
        article.slug === slug ? { ...article, [key]: value } : article,
      ),
    )
  }

  function toggleRelatedCourse(slug: string, courseSlug: string) {
    const article = insights.find((item) => item.slug === slug)
    if (!article) {
      return
    }

    const current = new Set(normalizeList(article.relatedCourseSlugsText))
    if (current.has(courseSlug)) {
      current.delete(courseSlug)
    } else {
      current.add(courseSlug)
    }

    updateInsightField(slug, 'relatedCourseSlugsText', Array.from(current).join(', '))
  }

  function handleCreateInsight() {
    const draft = createEmptyForm()
    setInsights((current) => [draft, ...current])
    setSelectedSlug(draft.slug)
    setNotice('已创建一篇新的文章草稿表单，填好后点击保存即可。')
    setError(null)
  }

  async function handleSaveInsight(article: AdminInsightForm) {
    setSavingSlug(article.slug)
    setNotice(null)
    setError(null)

    try {
      const payload = buildPayload(article)
      const response = await fetch(
        article.isNew ? '/api/admin/insights' : `/api/admin/insights/${article.slug}`,
        {
          method: article.isNew ? 'POST' : 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      )

      const data = (await response.json()) as {
        insight?: InsightArticle
        error?: string
      }

      if (!response.ok || !data.insight) {
        throw new Error(data.error ?? '保存文章失败')
      }

      const next = toForm(data.insight)
      setInsights((current) =>
        current.map((item) => (item.slug === article.slug ? next : item)),
      )
      setSelectedSlug(next.slug)
      setNotice(`已保存文章：${next.title || next.slug}`)
      await onRefreshDatabaseStatus?.()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : '保存文章失败')
    } finally {
      setSavingSlug(null)
    }
  }

  async function handleDeleteInsight(article: AdminInsightForm) {
    if (article.isNew) {
      setInsights((current) => current.filter((item) => item.slug !== article.slug))
      setSelectedSlug((current) =>
        current === article.slug
          ? insights.find((item) => item.slug !== article.slug)?.slug ?? null
          : current,
      )
      return
    }

    if (!window.confirm(`确定要删除文章《${article.title || article.slug}》吗？`)) {
      return
    }

    setDeletingSlug(article.slug)
    setNotice(null)
    setError(null)

    try {
      const response = await fetch(`/api/admin/insights/${article.slug}`, {
        method: 'DELETE',
      })
      const data = (await response.json()) as { ok?: boolean; error?: string }

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? '删除文章失败')
      }

      setInsights((current) => current.filter((item) => item.slug !== article.slug))
      setSelectedSlug((current) =>
        current === article.slug
          ? insights.find((item) => item.slug !== article.slug)?.slug ?? null
          : current,
      )
      setNotice(`已删除文章：${article.title || article.slug}`)
      await onRefreshDatabaseStatus?.()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : '删除文章失败')
    } finally {
      setDeletingSlug(null)
    }
  }

  return (
    <section className="mt-10 rounded-3xl border border-white/[0.08] bg-card/45 p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 font-mono text-[11px] tracking-[0.18em] text-primary">
            // ADMIN · INSIGHTS MANAGEMENT
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground">
            文章后台管理
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
            支持新增、编辑和删除文章。正文暂时采用结构化 JSON 编辑，适合先把内容后台流程跑起来。
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="font-mono text-xs" onClick={handleCreateInsight}>
            <FilePlus2 className="h-4 w-4" />
            新建文章
          </Button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary">
          当前文章 {insights.length} 篇
        </div>
        {notice ? (
          <div className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-green-300">
            {notice}
          </div>
        ) : null}
        {error ? (
          <div className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-red-300">
            {error}
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-[24px] border border-white/[0.08] bg-background/70 p-4">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜索标题、slug、分类"
              className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/90 pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-primary/40"
            />
          </div>

          <div className="max-h-[800px] space-y-2 overflow-y-auto pr-1">
            {loading ? (
              <div className="rounded-2xl border border-white/[0.08] px-4 py-5 text-sm text-muted-foreground">
                正在加载文章...
              </div>
            ) : filteredInsights.length > 0 ? (
              filteredInsights.map((article) => {
                const isActive = selectedSlug === article.slug

                return (
                  <button
                    key={article.slug}
                    type="button"
                    onClick={() => setSelectedSlug(article.slug)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? 'border-primary/30 bg-primary/10'
                        : 'border-white/[0.08] bg-card/50 hover:border-primary/20'
                    }`}
                  >
                    <div className="line-clamp-2 text-sm font-semibold text-foreground">
                      {article.title || article.slug}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {article.category} · {article.publishedAt}
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="rounded-2xl border border-white/[0.08] px-4 py-5 text-sm text-muted-foreground">
                当前筛选下没有文章。
              </div>
            )}
          </div>
        </aside>

        <div className="rounded-[24px] border border-white/[0.08] bg-background/70 p-5">
          {selectedInsight ? (
            <>
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-mono text-primary">
                      {selectedInsight.category || '未分类'}
                    </span>
                    {selectedInsight.featured ? (
                      <span className="rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-mono text-amber-300">
                        精选
                      </span>
                    ) : null}
                    {selectedInsight.isNew ? (
                      <span className="rounded-full bg-sky-500/15 px-3 py-1 text-[11px] font-mono text-sky-300">
                        新建草稿
                      </span>
                    ) : null}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    {selectedInsight.title || '未命名文章'}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    slug：{selectedInsight.slug}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {!selectedInsight.isNew ? (
                    <Button asChild variant="outline" className="font-mono text-xs">
                      <Link href={`/academy/insights/${selectedInsight.slug}`}>
                        预览文章
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  ) : null}
                  <Button
                    className="font-mono text-xs"
                    onClick={() => void handleSaveInsight(selectedInsight)}
                    disabled={savingSlug === selectedInsight.slug}
                  >
                    <Save className="h-4 w-4" />
                    {savingSlug === selectedInsight.slug ? '保存中...' : '保存文章'}
                  </Button>
                  <Button
                    variant="outline"
                    className="font-mono text-xs text-red-300 hover:text-red-200"
                    onClick={() => void handleDeleteInsight(selectedInsight)}
                    disabled={deletingSlug === selectedInsight.slug}
                  >
                    <Trash2 className="h-4 w-4" />
                    {deletingSlug === selectedInsight.slug ? '删除中...' : '删除文章'}
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="space-y-2 text-sm xl:col-span-2">
                  <span className="text-muted-foreground">文章标题</span>
                  <input
                    value={selectedInsight.title}
                    onChange={(event) =>
                      updateInsightField(selectedInsight.slug, 'title', event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/90 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">slug</span>
                  <input
                    value={selectedInsight.slug}
                    disabled={!selectedInsight.isNew}
                    onChange={(event) =>
                      updateInsightField(selectedInsight.slug, 'slug', event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/90 px-4 text-sm text-foreground outline-none transition focus:border-primary/40 disabled:opacity-60"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">文章分类</span>
                  <input
                    value={selectedInsight.category}
                    onChange={(event) =>
                      updateInsightField(selectedInsight.slug, 'category', event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/90 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">发布日期</span>
                  <input
                    value={selectedInsight.publishedAt}
                    onChange={(event) =>
                      updateInsightField(selectedInsight.slug, 'publishedAt', event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/90 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">阅读时长</span>
                  <input
                    value={selectedInsight.readTime}
                    onChange={(event) =>
                      updateInsightField(selectedInsight.slug, 'readTime', event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/90 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <label className="inline-flex items-center gap-3 pt-8 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={selectedInsight.featured ?? false}
                    onChange={(event) =>
                      updateInsightField(selectedInsight.slug, 'featured', event.target.checked)
                    }
                    className="h-4 w-4 rounded border-white/[0.12] bg-background"
                  />
                  设为精选文章
                </label>
              </div>

              <div className="mt-4 grid gap-4">
                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">摘要</span>
                  <textarea
                    value={selectedInsight.excerpt}
                    onChange={(event) =>
                      updateInsightField(selectedInsight.slug, 'excerpt', event.target.value)
                    }
                    rows={3}
                    className="w-full rounded-2xl border border-white/[0.08] bg-background/90 px-4 py-3 text-sm leading-7 text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">SEO 描述</span>
                  <textarea
                    value={selectedInsight.description}
                    onChange={(event) =>
                      updateInsightField(selectedInsight.slug, 'description', event.target.value)
                    }
                    rows={4}
                    className="w-full rounded-2xl border border-white/[0.08] bg-background/90 px-4 py-3 text-sm leading-7 text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    <span className="text-muted-foreground">标签（逗号或换行分隔）</span>
                    <textarea
                      value={selectedInsight.tagsText}
                      onChange={(event) =>
                        updateInsightField(selectedInsight.slug, 'tagsText', event.target.value)
                      }
                      rows={4}
                      className="w-full rounded-2xl border border-white/[0.08] bg-background/90 px-4 py-3 text-sm leading-7 text-foreground outline-none transition focus:border-primary/40"
                    />
                  </label>

                  <label className="space-y-2 text-sm">
                    <span className="text-muted-foreground">关联课程 slug（逗号或换行分隔）</span>
                    <textarea
                      value={selectedInsight.relatedCourseSlugsText}
                      onChange={(event) =>
                        updateInsightField(
                          selectedInsight.slug,
                          'relatedCourseSlugsText',
                          event.target.value,
                        )
                      }
                      rows={4}
                      className="w-full rounded-2xl border border-white/[0.08] bg-background/90 px-4 py-3 text-sm leading-7 text-foreground outline-none transition focus:border-primary/40"
                    />
                  </label>
                </div>

                <div>
                  <div className="mb-2 text-sm text-muted-foreground">快速选择关联课程</div>
                  <div className="flex flex-wrap gap-2">
                    {courses.map((course) => {
                      const active = normalizeList(selectedInsight.relatedCourseSlugsText).includes(course.slug)

                      return (
                        <button
                          key={course.slug}
                          type="button"
                          onClick={() => toggleRelatedCourse(selectedInsight.slug, course.slug)}
                          className={`rounded-full border px-3 py-1.5 text-xs transition ${
                            active
                              ? 'border-primary/30 bg-primary/10 text-primary'
                              : 'border-white/[0.08] text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {course.shortTitle}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">关键结论（每行一条）</span>
                  <textarea
                    value={selectedInsight.keyTakeawaysText}
                    onChange={(event) =>
                      updateInsightField(
                        selectedInsight.slug,
                        'keyTakeawaysText',
                        event.target.value,
                      )
                    }
                    rows={5}
                    className="w-full rounded-2xl border border-white/[0.08] bg-background/90 px-4 py-3 text-sm leading-7 text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">正文结构 JSON</span>
                  <textarea
                    value={selectedInsight.sectionsJson}
                    onChange={(event) =>
                      updateInsightField(
                        selectedInsight.slug,
                        'sectionsJson',
                        event.target.value,
                      )
                    }
                    rows={18}
                    className="w-full rounded-2xl border border-white/[0.08] bg-background/90 px-4 py-3 font-mono text-xs leading-6 text-foreground outline-none transition focus:border-primary/40"
                  />
                  <p className="text-xs leading-6 text-muted-foreground">
                    结构格式：`[{"{"}"title":"标题","paragraphs":["段落1"],"bullets":["要点"]{"}"}]`
                  </p>
                </label>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-white/[0.08] px-6 py-10 text-center text-sm text-muted-foreground">
              先从左侧选择一篇文章，或者新建一篇文章。
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
