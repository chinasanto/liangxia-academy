'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState, useTransition } from 'react'
import {
  Database,
  ExternalLink,
  LogOut,
  RefreshCcw,
  Save,
  Settings2,
  Sparkles,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { CourseCatalogEntry, CourseUpdatePayload } from '@/lib/course-types'

type DatabaseStatus = {
  mode: 'file' | 'neon'
  configured: boolean
  reachable: boolean
  bootstrapped: boolean
  courseCount: number
  insightCount: number
  error?: string
}

function toPayload(course: CourseCatalogEntry): CourseUpdatePayload {
  return {
    title: course.title,
    shortTitle: course.shortTitle,
    subtitle: course.subtitle,
    summary: course.summary,
    category: course.category,
    level: course.level,
    badge: course.badge,
    price: course.price,
    published: course.published,
    featured: course.featured,
    sortOrder: course.sortOrder,
  }
}

export default function AdminPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<CourseCatalogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [databaseStatus, setDatabaseStatus] = useState<DatabaseStatus | null>(null)
  const [syncingDatabase, setSyncingDatabase] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await fetch('/api/admin/courses')
        if (!response.ok) {
          throw new Error('加载课程失败')
        }

        const data = (await response.json()) as { courses: CourseCatalogEntry[] }
        startTransition(() => {
          setCourses(data.courses)
          setLoading(false)
        })
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : '加载课程失败')
        setLoading(false)
      }
    }

    void loadCourses()
  }, [])

  useEffect(() => {
    async function loadDatabaseStatus() {
      try {
        const response = await fetch('/api/admin/database')
        if (!response.ok) {
          return
        }

        const data = (await response.json()) as { status: DatabaseStatus }
        setDatabaseStatus(data.status)
      } catch {
        // Ignore status fetch errors in the UI; course data can still work via file fallback.
      }
    }

    void loadDatabaseStatus()
  }, [])

  const summary = useMemo(() => {
    const publishedCount = courses.filter((course) => course.published).length
    const featuredCount = courses.filter((course) => course.featured).length

    return {
      total: courses.length,
      published: publishedCount,
      drafts: courses.length - publishedCount,
      featured: featuredCount,
    }
  }, [courses])

  function updateField<K extends keyof CourseCatalogEntry>(
    slug: string,
    key: K,
    value: CourseCatalogEntry[K],
  ) {
    setCourses((current) =>
      current.map((course) =>
        course.slug === slug ? { ...course, [key]: value } : course,
      ),
    )
  }

  async function handleSave(course: CourseCatalogEntry) {
    setActiveSlug(course.slug)
    setNotice(null)
    setError(null)

    try {
      const response = await fetch(`/api/admin/courses/${course.slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toPayload(course)),
      })

      if (!response.ok) {
        throw new Error('保存失败')
      }

      const data = (await response.json()) as { course: CourseCatalogEntry }
      setCourses((current) =>
        current.map((item) => (item.slug === data.course.slug ? data.course : item)),
      )
      setNotice(`已保存：${data.course.shortTitle}`)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : '保存失败')
    } finally {
      setActiveSlug(null)
    }
  }

  async function handleLogout() {
    setError(null)
    setNotice(null)

    await fetch('/api/admin/session', {
      method: 'DELETE',
    })

    router.replace('/admin/login')
    router.refresh()
  }

  async function handleSyncDatabase() {
    setSyncingDatabase(true)
    setError(null)
    setNotice(null)

    try {
      const response = await fetch('/api/admin/database', {
        method: 'POST',
      })

      if (!response.ok) {
        const data = (await response.json()) as { error?: string }
        throw new Error(data.error ?? '同步到 Neon 失败')
      }

      const data = (await response.json()) as {
        status: DatabaseStatus
        synced: { courses: number; insights: number }
      }

      setDatabaseStatus(data.status)
      setNotice(`已同步到 Neon：${data.synced.courses} 门课程，${data.synced.insights} 篇文章`)
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : '同步到 Neon 失败')
    } finally {
      setSyncingDatabase(false)
    }
  }

  return (
    <main className="min-h-screen bg-background px-6 pb-20 pt-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 rounded-3xl border border-white/[0.08] bg-card/60 p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 font-mono text-[11px] tracking-[0.18em] text-primary">
                // ADMIN · COURSE MANAGEMENT
              </p>
              <h1 className="mb-4 font-serif text-4xl font-black text-foreground sm:text-5xl">
                AI量化学院后台
              </h1>
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                这里可以直接管理课程标题、摘要、展示顺序和上架状态。现在支持接入 Neon 做数据库管理；
                未配置数据库时，系统会自动回退到本地文件数据。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: '课程总数', value: `${summary.total}` },
                { label: '已上架', value: `${summary.published}` },
                { label: '草稿', value: `${summary.drafts}` },
                { label: '精选', value: `${summary.featured}` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/[0.08] bg-background/80 p-4"
                >
                  <div className="font-mono text-2xl font-bold text-foreground">
                    {item.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-primary">
            <Settings2 className="h-4 w-4" />
            {loading ? '正在加载课程...' : '后台已连接课程数据'}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-background/70 px-4 py-2 text-foreground">
            <Database className="h-4 w-4 text-primary" />
            {databaseStatus?.mode === 'neon'
              ? `Neon 数据库 · 课程 ${databaseStatus.courseCount} · 文章 ${databaseStatus.insightCount}`
              : databaseStatus?.configured
                ? 'Neon 已配置，等待初始化数据'
                : '当前使用本地文件模式'}
          </div>
          <Button
            variant="outline"
            className="font-mono text-xs"
            onClick={() => void handleSyncDatabase()}
            disabled={syncingDatabase}
          >
            <RefreshCcw className={`h-4 w-4 ${syncingDatabase ? 'animate-spin' : ''}`} />
            {syncingDatabase ? '同步中...' : '同步到 Neon'}
          </Button>
          <Button
            variant="outline"
            className="font-mono text-xs"
            onClick={() => void handleLogout()}
          >
            <LogOut className="h-4 w-4" />
            退出登录
          </Button>
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
          {databaseStatus?.error ? (
            <div className="rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-amber-300">
              Neon 状态：{databaseStatus.error}
            </div>
          ) : null}
          {isPending ? (
            <div className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-muted-foreground">
              正在刷新界面...
            </div>
          ) : null}
        </div>

        <section className="space-y-5">
          {courses.map((course) => (
            <article
              key={course.slug}
              className="rounded-3xl border border-white/[0.08] bg-card/45 p-6"
            >
              <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-mono text-primary">
                      {course.level}
                    </span>
                    <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-mono text-muted-foreground">
                      {course.category}
                    </span>
                    {course.featured ? (
                      <span className="rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-mono text-amber-300">
                        精选
                      </span>
                    ) : null}
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-mono ${
                        course.published
                          ? 'bg-green-500/15 text-green-300'
                          : 'bg-red-500/15 text-red-300'
                      }`}
                    >
                      {course.published ? '已上架' : '草稿'}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    {course.shortTitle}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                    来源文件：{course.sourceFile}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline" className="font-mono text-xs">
                    <Link href={`/academy/${course.slug}${course.published ? '' : '?preview=1'}`}>
                      预览课程
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    className="font-mono text-xs"
                    onClick={() => void handleSave(course)}
                    disabled={activeSlug === course.slug}
                  >
                    <Save className="h-4 w-4" />
                    {activeSlug === course.slug ? '保存中...' : '保存修改'}
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">课程标题</span>
                  <input
                    value={course.title}
                    onChange={(event) =>
                      updateField(course.slug, 'title', event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/80 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">卡片标题</span>
                  <input
                    value={course.shortTitle}
                    onChange={(event) =>
                      updateField(course.slug, 'shortTitle', event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/80 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">课程分类</span>
                  <input
                    value={course.category}
                    onChange={(event) =>
                      updateField(course.slug, 'category', event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/80 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">课程等级</span>
                  <input
                    value={course.level}
                    onChange={(event) =>
                      updateField(course.slug, 'level', event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/80 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <label className="space-y-2 text-sm md:col-span-2">
                  <span className="text-muted-foreground">副标题</span>
                  <input
                    value={course.subtitle}
                    onChange={(event) =>
                      updateField(course.slug, 'subtitle', event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/80 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">徽章文案</span>
                  <input
                    value={course.badge}
                    onChange={(event) =>
                      updateField(course.slug, 'badge', event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/80 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">价格文案</span>
                  <input
                    value={course.price}
                    onChange={(event) =>
                      updateField(course.slug, 'price', event.target.value)
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/80 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="text-muted-foreground">排序</span>
                  <input
                    type="number"
                    value={course.sortOrder}
                    onChange={(event) =>
                      updateField(
                        course.slug,
                        'sortOrder',
                        Number(event.target.value) || 0,
                      )
                    }
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/80 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
                  />
                </label>
              </div>

              <label className="mt-4 block space-y-2 text-sm">
                <span className="text-muted-foreground">课程摘要</span>
                <textarea
                  value={course.summary}
                  onChange={(event) =>
                    updateField(course.slug, 'summary', event.target.value)
                  }
                  rows={4}
                  className="w-full rounded-2xl border border-white/[0.08] bg-background/80 px-4 py-3 text-sm leading-7 text-foreground outline-none transition focus:border-primary/40"
                />
              </label>

              <div className="mt-5 flex flex-wrap gap-6">
                <label className="inline-flex items-center gap-3 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={course.published}
                    onChange={(event) =>
                      updateField(course.slug, 'published', event.target.checked)
                    }
                    className="h-4 w-4 rounded border-white/[0.12] bg-background"
                  />
                  上架课程
                </label>

                <label className="inline-flex items-center gap-3 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={course.featured}
                    onChange={(event) =>
                      updateField(course.slug, 'featured', event.target.checked)
                    }
                    className="h-4 w-4 rounded border-white/[0.12] bg-background"
                  />
                  设为精选
                </label>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>

        {!loading && courses.length === 0 ? (
          <div className="rounded-3xl border border-white/[0.08] bg-card/45 p-10 text-center text-muted-foreground">
            <Sparkles className="mx-auto mb-3 h-5 w-5 text-primary" />
            当前没有读取到课程数据。
          </div>
        ) : null}
      </div>
    </main>
  )
}
