import Link from 'next/link'

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
        <h3 className="text-2xl font-bold text-foreground">课程对比表</h3>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          如果你正在犹豫应该先学哪门课，这张对比表会更直接地回答课程差异、适合阶段和推荐顺序。
        </p>
      </div>

      <div className="overflow-x-auto rounded-[22px] border border-white/[0.08]">
        <table className="min-w-[980px] w-full text-sm">
          <thead className="bg-card/70">
            <tr className="border-b border-white/[0.08]">
              {[
                '课程',
                '阶段',
                '核心目标',
                '前置建议',
                '适合人群',
                '推荐顺序',
                '时长',
              ].map((label) => (
                <th
                  key={label}
                  className="px-4 py-4 text-left font-semibold text-foreground"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.slug}
                className="border-b border-white/[0.06] align-top last:border-b-0"
              >
                <td className="px-4 py-4">
                  <Link
                    href={`/academy/${course.slug}`}
                    className="font-semibold text-foreground transition hover:text-primary"
                  >
                    {course.shortTitle}
                  </Link>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {course.category}
                  </div>
                </td>
                <td className="px-4 py-4 text-muted-foreground">{course.level}</td>
                <td className="px-4 py-4 text-muted-foreground">
                  {course.subtitle}
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  {course.requirements?.[0] ?? '建议结合课程页详情查看'}
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  {(course.audience ?? []).slice(0, 2).join('、')}
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                    {getRoadmapLabel(course.slug)}
                  </span>
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  {course.duration} / {course.lessonCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
