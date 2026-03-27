import Link from 'next/link'
import { ArrowRight, BookOpen, Layers3, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getPublishedCourses } from '@/lib/course-store'

export const dynamic = 'force-dynamic'

export default async function AcademyPage() {
  const courses = await getPublishedCourses()
  const featuredCount = courses.filter((course) => course.featured).length

  return (
    <main className="min-h-screen bg-background px-6 pb-20 pt-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 rounded-3xl border border-white/[0.08] bg-card/60 p-8 lg:p-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 font-mono text-[11px] tracking-[0.18em] text-primary">
                // 量虾学院 · QCLAW ACADEMY
              </p>
              <h1 className="mb-4 font-serif text-4xl font-black text-foreground sm:text-5xl">
                把现有课程体系，正式做成可以上架和管理的学院站点。
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                这里汇总了当前已上架的量化课程。课程详情来自你提供的原始 HTML
                内容，现在已经被接入到量虾学院项目里，并且可以通过后台页面继续管理。
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { label: '上架课程', value: `${courses.length}`, icon: BookOpen },
                { label: '精选课程', value: `${featuredCount}`, icon: Sparkles },
                { label: '课程方向', value: '5+', icon: Layers3 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/[0.08] bg-background/70 p-4"
                >
                  <item.icon className="mb-3 h-5 w-5 text-primary" />
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

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.slug}
              className="rounded-3xl border border-white/[0.08] bg-card/50 p-6 transition-colors hover:border-primary/35"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
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
              </div>

              <h2 className="mb-3 font-serif text-2xl font-bold text-foreground">
                {course.shortTitle}
              </h2>
              <p className="mb-4 text-sm leading-7 text-muted-foreground">
                {course.subtitle}
              </p>
              <p className="mb-6 text-sm leading-7 text-foreground/85">
                {course.summary}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-muted-foreground">课程价格</div>
                  <div className="font-mono text-lg font-bold text-primary">
                    {course.price}
                  </div>
                </div>

                <Button asChild className="font-mono text-xs">
                  <Link href={`/academy/${course.slug}`}>
                    查看详情
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}

