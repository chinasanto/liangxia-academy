import Link from 'next/link'
import { ArrowRight, BookOpen, GraduationCap, LayoutDashboard, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getPublishedCourses } from '@/lib/course-store'

export async function AcademySection() {
  const courses = await getPublishedCourses()
  const featuredCourses = courses.filter((course) => course.featured)

  return (
    <section id="academy" className="relative z-10 bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="mb-3.5 block font-mono text-[10px] tracking-[0.18em] text-primary">
              {'// 03 · 量虾学院 · QCLAW ACADEMY'}
            </span>
            <h2 className="mb-4 font-serif text-3xl font-black leading-tight text-foreground sm:text-4xl md:text-5xl">
              课程已经接入量虾学院，前台展示和后台上架现在是一体的。
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              你提供的课程 HTML 已经被纳入项目中。现在学院首页展示的是已上架课程，
              每门课都有自己的详情页，同时可以在后台统一管理标题、摘要、排序和上架状态。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: '已接入课程', value: `${courses.length}`, icon: BookOpen },
              { label: '精选课程', value: `${featuredCourses.length}`, icon: Sparkles },
              { label: '后台状态', value: '已启用', icon: LayoutDashboard },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.06] bg-background p-4"
              >
                <item.icon className="mb-3 h-5 w-5 text-primary" />
                <div className="font-mono text-2xl font-bold text-foreground">
                  {item.value}
                </div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.slug}
              className="flex h-full flex-col rounded-3xl border border-white/[0.06] bg-background p-6 transition-colors hover:border-primary/35"
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

              <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">
                {course.shortTitle}
              </h3>
              <p className="mb-4 text-sm leading-7 text-muted-foreground">
                {course.subtitle}
              </p>
              <p className="mb-6 flex-1 text-sm leading-7 text-foreground/85">
                {course.summary}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {course.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">课程价格</div>
                  <div className="font-mono text-lg font-bold text-primary">
                    {course.price}
                  </div>
                </div>

                <Button asChild variant="outline" className="font-mono text-xs">
                  <Link href={`/academy/${course.slug}`}>
                    查看详情
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="font-mono text-xs">
            <Link href="/academy">
              浏览全部课程
              <GraduationCap className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="font-mono text-xs">
            <Link href="/admin">
              进入课程后台
              <LayoutDashboard className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
