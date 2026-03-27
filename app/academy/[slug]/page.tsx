import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, FileText, LayoutPanelTop, ShieldCheck, Sparkles } from 'lucide-react'

import { CoursePreviewFrame } from '@/components/course-preview-frame'
import { Button } from '@/components/ui/button'
import { getCourseBySlug, getCoursePreviewHtml } from '@/lib/course-store'

type CourseDetailPageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourseBySlug(slug, { includeDrafts: true })

  if (!course) {
    return {
      title: '课程不存在 | 量虾学院',
    }
  }

  return {
    title: `${course.shortTitle} | 量虾学院`,
    description: course.summary,
  }
}

export default async function CourseDetailPage({
  params,
  searchParams,
}: CourseDetailPageProps) {
  const { slug } = await params
  const query = await searchParams
  const preview = query.preview === '1'
  const course = await getCourseBySlug(slug, { includeDrafts: preview })

  if (!course) {
    notFound()
  }

  const previewHtml = await getCoursePreviewHtml(course)

  return (
    <main className="min-h-screen bg-background px-6 pb-20 pt-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Button asChild variant="ghost" className="pl-0 text-muted-foreground">
            <Link href="/academy">
              <ArrowLeft className="h-4 w-4" />
              返回课程列表
            </Link>
          </Button>
        </div>

        <section className="mb-8 rounded-3xl border border-white/[0.08] bg-card/60 p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_0.9fr]">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-mono text-primary">
                  {course.level}
                </span>
                <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-mono text-muted-foreground">
                  {course.category}
                </span>
                <span className="rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-mono text-amber-300">
                  {course.badge}
                </span>
                {preview && !course.published ? (
                  <span className="rounded-full bg-red-500/15 px-3 py-1 text-[11px] font-mono text-red-300">
                    草稿预览
                  </span>
                ) : null}
              </div>

              <h1 className="mb-4 font-serif text-4xl font-black text-foreground sm:text-5xl">
                {course.title}
              </h1>
              <p className="mb-5 text-base leading-8 text-muted-foreground">
                {course.subtitle}
              </p>
              <p className="max-w-3xl text-sm leading-7 text-foreground/85 sm:text-base">
                {course.summary}
              </p>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-background/80 p-6">
              <div className="mb-5 text-xs text-muted-foreground">课程概览</div>
              <div className="mb-6 font-mono text-3xl font-bold text-primary">
                {course.price}
              </div>

              <div className="space-y-3">
                {[
                  { label: '可见状态', value: course.published ? '已上架' : '未上架', icon: LayoutPanelTop },
                  { label: '后台管理', value: '支持直接修改并保存', icon: ShieldCheck },
                  { label: '详情来源', value: '原始 HTML 已接入站内', icon: FileText },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-card/50 p-4"
                  >
                    <item.icon className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-sm text-foreground">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="font-mono text-xs">
                  <Link href="/admin">进入后台管理</Link>
                </Button>
                <Button asChild variant="outline" className="font-mono text-xs">
                  <Link href="/academy">继续浏览课程</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {course.stats.map((stat) => (
            <div
              key={stat}
              className="rounded-2xl border border-white/[0.08] bg-card/50 p-5"
            >
              <div className="mb-3 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="text-sm text-foreground">{stat}</div>
            </div>
          ))}
        </section>

        <section className="mb-8 rounded-3xl border border-white/[0.08] bg-card/50 p-6 lg:p-8">
          <div className="mb-5">
            <h2 className="mb-2 font-serif text-2xl font-bold text-foreground">
              课程亮点
            </h2>
            <p className="text-sm text-muted-foreground">
              当前课程卡片展示的是后台可管理信息，下方预览区保留了你原始课程 HTML
              的结构和内容。
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/[0.08] bg-card/40 p-4 lg:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                原始课程详情预览
              </h2>
              <p className="text-sm text-muted-foreground">
                已隐藏外部二维码悬浮窗，并将课程内部跳转接入站内路径。
              </p>
            </div>
          </div>

          <CoursePreviewFrame title={course.title} srcDoc={previewHtml} />
        </section>
      </div>
    </main>
  )
}
