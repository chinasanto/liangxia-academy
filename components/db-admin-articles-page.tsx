'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Database, FilePlus2, LogOut, Save, Search, Trash2 } from 'lucide-react'

import type { InsightArticle } from '@/lib/insight-types'
import { Button } from '@/components/ui/button'

type DbStatus = {
  configured: boolean
  count: number
}

type InsightForm = InsightArticle & {
  isNew?: boolean
  tagsText: string
  relatedCourseSlugsText: string
  keyTakeawaysText: string
  sectionsJson: string
}

type DbAdminArticlesPageProps = {
  embedded?: boolean
  previewBasePath?: string
  loginPath?: string
  showLogout?: boolean
}

function formatJson(value: unknown) {
  return JSON.stringify(value, null, 2)
}

function normalizeList(value: string) {
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function toForm(article: InsightArticle): InsightForm {
  return {
    ...article,
    tagsText: article.tags.join(', '),
    relatedCourseSlugsText: article.relatedCourseSlugs.join(', '),
    keyTakeawaysText: article.keyTakeaways.join('\n'),
    sectionsJson: formatJson(article.sections),
  }
}

function createDraft(): InsightForm {
  const today = new Date().toISOString().slice(0, 10)

  return {
    slug: `article-${today.replaceAll('-', '')}-${Date.now().toString().slice(-4)}`,
    title: '',
    excerpt: '',
    description: '',
    category: '量化技巧',
    tags: [],
    publishedAt: today,
    readTime: '6分钟',
    featured: false,
    published: false,
    relatedCourseSlugs: [],
    sections: [
      {
        title: '核心问题',
        paragraphs: ['请先写出这篇文章要解决的核心问题。'],
      },
    ],
    keyTakeaways: ['总结要点 1'],
    isNew: true,
    tagsText: '量化技巧',
    relatedCourseSlugsText: '',
    keyTakeawaysText: '总结要点 1',
    sectionsJson: formatJson([
      {
        title: '核心问题',
        paragraphs: ['请先写出这篇文章要解决的核心问题。'],
      },
    ]),
  }
}

function toPayload(form: InsightForm): InsightArticle {
  const sections = JSON.parse(form.sectionsJson) as InsightArticle['sections']

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
    published: form.published ?? false,
    relatedCourseSlugs: normalizeList(form.relatedCourseSlugsText),
    sections,
    keyTakeaways: normalizeList(form.keyTakeawaysText),
  }
}

export function DbAdminArticlesPage({
  embedded = false,
  previewBasePath = '/admin/preview',
  loginPath = '/admin/login?next=/db-admin',
  showLogout = true,
}: DbAdminArticlesPageProps) {
  const [status, setStatus] = useState<DbStatus | null>(null)
  const [articles, setArticles] = useState<InsightForm[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [savingSlug, setSavingSlug] = useState<string | null>(null)
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null)
  const [bootstrapping, setBootstrapping] = useState(false)

  async function loadStatus() {
    const response = await fetch('/api/db-admin/status')
    if (!response.ok) {
      throw new Error('加载数据库状态失败')
    }

    const data = (await response.json()) as { status: DbStatus }
    setStatus(data.status)
  }

  async function loadArticles() {
    const response = await fetch('/api/db-admin/insights')
    if (!response.ok) {
      throw new Error('加载文章失败')
    }

    const data = (await response.json()) as { insights: InsightArticle[] }
    const forms = data.insights.map(toForm)
    setArticles(forms)
    setSelectedSlug((current) => current ?? forms[0]?.slug ?? null)
  }

  useEffect(() => {
    async function init() {
      try {
        await Promise.all([loadStatus(), loadArticles()])
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : '加载失败')
      }
    }

    void init()
  }, [])

  const filteredArticles = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    if (!keyword) {
      return articles
    }

    return articles.filter((article) =>
      [article.slug, article.title, article.category, article.tagsText]
        .join(' ')
        .toLowerCase()
        .includes(keyword),
    )
  }, [articles, search])

  const selected = articles.find((item) => item.slug === selectedSlug) ?? null

  function updateField<K extends keyof InsightForm>(
    slug: string,
    key: K,
    value: InsightForm[K],
  ) {
    setArticles((current) =>
      current.map((article) =>
        article.slug === slug ? { ...article, [key]: value } : article,
      ),
    )
  }

  async function handleBootstrap() {
    setBootstrapping(true)
    setError(null)
    setNotice(null)

    try {
      const response = await fetch('/api/db-admin/bootstrap', { method: 'POST' })
      const data = (await response.json()) as { error?: string; count?: number }

      if (!response.ok) {
        throw new Error(data.error ?? '初始化失败')
      }

      await Promise.all([loadStatus(), loadArticles()])
      setNotice(`已初始化数据库文章：${data.count ?? 0} 篇`)
    } catch (bootstrapError) {
      setError(bootstrapError instanceof Error ? bootstrapError.message : '初始化失败')
    } finally {
      setBootstrapping(false)
    }
  }

  function handleCreate() {
    const draft = createDraft()
    setArticles((current) => [draft, ...current])
    setSelectedSlug(draft.slug)
    setNotice('已创建新文章草稿。')
    setError(null)
  }

  async function handleSave(article: InsightForm) {
    setSavingSlug(article.slug)
    setError(null)
    setNotice(null)

    try {
      const payload = toPayload(article)
      const response = await fetch(
        article.isNew ? '/api/db-admin/insights' : `/api/db-admin/insights/${article.slug}`,
        {
          method: article.isNew ? 'POST' : 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      )

      const data = (await response.json()) as {
        insight?: InsightArticle
        error?: string
      }

      if (!response.ok || !data.insight) {
        throw new Error(data.error ?? '保存失败')
      }

      const next = toForm(data.insight)
      setArticles((current) =>
        current.map((item) => (item.slug === article.slug ? next : item)),
      )
      setSelectedSlug(next.slug)
      await loadStatus()
      setNotice(`已保存：${next.title || next.slug}`)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : '保存失败')
    } finally {
      setSavingSlug(null)
    }
  }

  async function handleDelete(article: InsightForm) {
    if (article.isNew) {
      setArticles((current) => current.filter((item) => item.slug !== article.slug))
      setSelectedSlug((current) => (current === article.slug ? null : current))
      return
    }

    if (!window.confirm(`确定删除《${article.title || article.slug}》吗？`)) {
      return
    }

    setDeletingSlug(article.slug)
    setError(null)
    setNotice(null)

    try {
      const response = await fetch(`/api/db-admin/insights/${article.slug}`, {
        method: 'DELETE',
      })
      const data = (await response.json()) as { ok?: boolean; error?: string }

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? '删除失败')
      }

      setArticles((current) => current.filter((item) => item.slug !== article.slug))
      setSelectedSlug((current) => (current === article.slug ? null : current))
      await loadStatus()
      setNotice(`已删除：${article.title || article.slug}`)
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : '删除失败')
    } finally {
      setDeletingSlug(null)
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/session', { method: 'DELETE' })
    window.location.href = loginPath
  }

  const content = (
    <div className={embedded ? '' : 'mx-auto max-w-7xl'}>
      <section className="mb-8 rounded-[28px] border border-white/[0.08] bg-card/55 p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 font-mono text-[11px] tracking-[0.18em] text-primary">
              // ADMIN · ARTICLE MANAGEMENT
            </div>
            <h2 className="font-serif text-4xl font-black text-foreground">
              文章管理
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              在统一后台里管理量化技巧文章、发布状态和前台预览。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="font-mono text-xs" onClick={() => void handleBootstrap()} disabled={bootstrapping}>
              <Database className="h-4 w-4" />
              {bootstrapping ? '初始化中...' : '初始化文章'}
            </Button>
            <Button className="font-mono text-xs" onClick={handleCreate}>
              <FilePlus2 className="h-4 w-4" />
              新建文章
            </Button>
            {showLogout ? (
              <Button variant="outline" className="font-mono text-xs" onClick={() => void handleLogout()}>
                <LogOut className="h-4 w-4" />
                退出登录
              </Button>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <div className="rounded-full border border-white/[0.08] bg-background/70 px-4 py-2 text-foreground">
            数据库状态：{status?.configured ? `已配置 · ${status.count} 篇文章` : '未配置 DATABASE_URL'}
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
      </section>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-[24px] border border-white/[0.08] bg-card/45 p-4">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜索标题 / slug"
              className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/85 pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-primary/40"
            />
          </div>

          <div className="max-h-[760px] space-y-2 overflow-y-auto pr-1">
            {filteredArticles.map((article) => (
              <button
                key={article.slug}
                type="button"
                onClick={() => setSelectedSlug(article.slug)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  selectedSlug === article.slug
                    ? 'border-primary/30 bg-primary/10'
                    : 'border-white/[0.08] bg-background/60'
                }`}
              >
                <div className="line-clamp-2 text-sm font-semibold text-foreground">
                  {article.title || article.slug}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {article.category} · {article.publishedAt} · {article.published === false ? '草稿' : '已发布'}
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-[24px] border border-white/[0.08] bg-card/45 p-5">
          {selected ? (
            <>
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="text-xl font-semibold text-foreground">
                    {selected.title || '未命名文章'}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    slug：{selected.slug}
                  </div>
                  {!selected.isNew ? (
                    <div className="mt-2">
                      <Link
                        href={`${previewBasePath}/${selected.slug}`}
                        className="text-sm text-primary underline-offset-4 hover:underline"
                      >
                        前台预览
                      </Link>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button className="font-mono text-xs" onClick={() => void handleSave(selected)} disabled={savingSlug === selected.slug}>
                    <Save className="h-4 w-4" />
                    {savingSlug === selected.slug ? '保存中...' : '保存'}
                  </Button>
                  <Button
                    variant="outline"
                    className="font-mono text-xs text-red-300 hover:text-red-200"
                    onClick={() => void handleDelete(selected)}
                    disabled={deletingSlug === selected.slug}
                  >
                    <Trash2 className="h-4 w-4" />
                    {deletingSlug === selected.slug ? '删除中...' : '删除'}
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="space-y-2 text-sm xl:col-span-2">
                  <span className="text-muted-foreground">标题</span>
                  <input value={selected.title} onChange={(e) => updateField(selected.slug, 'title', e.target.value)} className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/85 px-4 text-sm text-foreground outline-none focus:border-primary/40" />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">slug</span>
                  <input value={selected.slug} disabled={!selected.isNew} onChange={(e) => updateField(selected.slug, 'slug', e.target.value)} className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/85 px-4 text-sm text-foreground outline-none disabled:opacity-60 focus:border-primary/40" />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">分类</span>
                  <input value={selected.category} onChange={(e) => updateField(selected.slug, 'category', e.target.value)} className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/85 px-4 text-sm text-foreground outline-none focus:border-primary/40" />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">发布日期</span>
                  <input value={selected.publishedAt} onChange={(e) => updateField(selected.slug, 'publishedAt', e.target.value)} className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/85 px-4 text-sm text-foreground outline-none focus:border-primary/40" />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">阅读时长</span>
                  <input value={selected.readTime} onChange={(e) => updateField(selected.slug, 'readTime', e.target.value)} className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/85 px-4 text-sm text-foreground outline-none focus:border-primary/40" />
                </label>
                <label className="inline-flex items-center gap-3 pt-8 text-sm text-foreground">
                  <input type="checkbox" checked={selected.featured ?? false} onChange={(e) => updateField(selected.slug, 'featured', e.target.checked)} className="h-4 w-4 rounded border-white/[0.12] bg-background" />
                  设为精选
                </label>
                <label className="inline-flex items-center gap-3 pt-8 text-sm text-foreground">
                  <input type="checkbox" checked={selected.published ?? false} onChange={(e) => updateField(selected.slug, 'published', e.target.checked)} className="h-4 w-4 rounded border-white/[0.12] bg-background" />
                  发布到前台
                </label>
              </div>

              <div className="mt-4 grid gap-4">
                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">摘要</span>
                  <textarea value={selected.excerpt} onChange={(e) => updateField(selected.slug, 'excerpt', e.target.value)} rows={3} className="w-full rounded-2xl border border-white/[0.08] bg-background/85 px-4 py-3 text-sm leading-7 text-foreground outline-none focus:border-primary/40" />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">描述</span>
                  <textarea value={selected.description} onChange={(e) => updateField(selected.slug, 'description', e.target.value)} rows={4} className="w-full rounded-2xl border border-white/[0.08] bg-background/85 px-4 py-3 text-sm leading-7 text-foreground outline-none focus:border-primary/40" />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">标签（逗号或换行分隔）</span>
                  <textarea value={selected.tagsText} onChange={(e) => updateField(selected.slug, 'tagsText', e.target.value)} rows={4} className="w-full rounded-2xl border border-white/[0.08] bg-background/85 px-4 py-3 text-sm leading-7 text-foreground outline-none focus:border-primary/40" />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">关联课程 slug（逗号或换行分隔）</span>
                  <textarea value={selected.relatedCourseSlugsText} onChange={(e) => updateField(selected.slug, 'relatedCourseSlugsText', e.target.value)} rows={3} className="w-full rounded-2xl border border-white/[0.08] bg-background/85 px-4 py-3 text-sm leading-7 text-foreground outline-none focus:border-primary/40" />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">关键结论（每行一条）</span>
                  <textarea value={selected.keyTakeawaysText} onChange={(e) => updateField(selected.slug, 'keyTakeawaysText', e.target.value)} rows={5} className="w-full rounded-2xl border border-white/[0.08] bg-background/85 px-4 py-3 text-sm leading-7 text-foreground outline-none focus:border-primary/40" />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">正文结构 JSON</span>
                  <textarea value={selected.sectionsJson} onChange={(e) => updateField(selected.slug, 'sectionsJson', e.target.value)} rows={18} className="w-full rounded-2xl border border-white/[0.08] bg-background/85 px-4 py-3 font-mono text-xs leading-6 text-foreground outline-none focus:border-primary/40" />
                </label>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-white/[0.08] px-6 py-10 text-center text-sm text-muted-foreground">
              先新建一篇文章，或从左侧选择一篇文章。
            </div>
          )}
        </section>
      </div>
    </div>
  )

  if (embedded) {
    return content
  }

  return (
    <main className="min-h-screen bg-background px-6 pb-16 pt-20 lg:px-12">
      {content}
    </main>
  )
}
