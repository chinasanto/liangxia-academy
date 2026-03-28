import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { getMainRoadmapSlugs } from '@/lib/academy-roadmap'
import type { CourseCatalogEntry } from '@/lib/course-types'

type AcademyComparisonTableProps = {
  courses: CourseCatalogEntry[]
}

function getRoadmapLabel(slug: string) {
  const roadmap = getMainRoadmapSlugs()
  const index = roadmap.indexOf(slug)

  if (slug === 'brain-quant') {
    return '并行专项'
  }

  return index >= 0 ? `主线第 ${index + 1} 步` : '补充模块'
}

export function AcademyComparisonTable({
  courses,
}: AcademyComparisonTableProps) {
  return (
    <section className="mt-10 rounded-[28px] border border-white/[0.08] bg-background/72 p-6 sm:p-7">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground">选课速览</h3>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          如果你还在犹豫先学哪门课，这里用更直观的方式把课程定位、适合阶段和推荐顺序放在一起看。
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <article
            key={course.slug}
            className="rounded-[24px] border border-white/[0.08] bg-card/55 p-5"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                {getRoadmapLabel(course.slug)}
              </span>
              <span className="rounded-full bg-background/75 px-3 py-1 text-xs text-muted-foreground">
                {course.level}
              </span>
              <span className="rounded-full bg-background/75 px-3 py-1 text-xs text-muted-foreground">
                {course.category}
              </span>
            </div>

            <h4 className="text-xl font-semibold text-foreground">
              {course.shortTitle}
            </h4>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {course.subtitle}
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-1 text-xs font-semibold tracking-[0.12em] text-primary">
                  前置建议
                </div>
                <p className="text-sm leading-6 text-foreground/85">
                  {course.requirements?.[0] ?? '建议先看课程详情页了解学习门槛。'}
                </p>
              </div>

              <div>
                <div className="mb-1 text-xs font-semibold tracking-[0.12em] text-primary">
                  适合人群
                </div>
                <p className="text-sm leading-6 text-foreground/85">
                  {(course.audience ?? []).slice(0, 2).join('、')}
                </p>
              </div>

              <div className="flex items-center justify-between rounded-[18px] border border-white/[0.08] bg-background/70 px-4 py-3">
                <div className="text-sm text-muted-foreground">课程时长</div>
                <div className="text-sm font-semibold text-foreground">
                  {course.duration} / {course.lessonCount}
                </div>
              </div>
            </div>

            <Link
              href={`/academy/${course.slug}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-85"
            >
              查看课程详情
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
