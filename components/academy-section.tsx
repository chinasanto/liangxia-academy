import Link from 'next/link'
import { BookOpen, BookText, GraduationCap, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CourseCard } from '@/components/course-card'
import type { CourseCatalogEntry } from '@/lib/course-types'
import { getPublishedCourses } from '@/lib/course-store'

type AcademySectionProps = {
  courses?: CourseCatalogEntry[]
}

export async function AcademySection({ courses: initialCourses }: AcademySectionProps) {
  const courses = initialCourses ?? (await getPublishedCourses())
  const featuredCourses = courses.filter((course) => course.featured)

  return (
    <section id="academy" className="relative z-10 bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="mb-3.5 block font-mono text-[10px] tracking-[0.18em] text-primary">
              {'// 03 · AI量化学院 · AI QUANT ACADEMY'}
            </span>
            <h2 className="mb-4 font-serif text-3xl font-black leading-tight text-foreground sm:text-4xl md:text-5xl">
              课程已经接入 AI量化学院，首页、学院页和详情页现在可以顺畅连通。
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              你提供的课程 HTML 与新课程封面已经整合进项目。现在学院首页展示的是带图课程卡片，
              每门课都有自己的详情页，也可以从学院页随时返回主站其他版块。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { label: '已接入课程', value: `${courses.length}`, icon: BookOpen },
                { label: '精选课程', value: `${featuredCourses.length}`, icon: Sparkles },
                { label: '课程方向', value: '5+', icon: GraduationCap },
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
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { label: '零基础入门', href: '/academy?level=入门' },
            { label: '因子工程方向', href: '/academy?category=因子工程' },
            { label: '工具提效方向', href: '/academy?category=工具提效' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full border border-white/[0.08] bg-background/70 px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="font-mono text-xs">
            <Link href="/academy">
              浏览全部课程
              <GraduationCap className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="font-mono text-xs border-primary/30 text-primary hover:bg-primary/10"
          >
            <Link href="/academy/insights">
              查看量化技巧
              <BookText className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
