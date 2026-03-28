import Link from 'next/link'
import { ArrowRight, Compass, MoveLeft, MoveRight } from 'lucide-react'

import type { RoadmapNavItem } from '@/lib/academy-roadmap'

type CoursePathNavProps = {
  previous: RoadmapNavItem | null
  next: RoadmapNavItem | null
  parallel: RoadmapNavItem | null
}

export function CoursePathNav({
  previous,
  next,
  parallel,
}: CoursePathNavProps) {
  const items = [previous, next, parallel].filter(
    (item): item is RoadmapNavItem => item !== null,
  )

  if (items.length === 0) {
    return null
  }

  return (
    <section className="mb-8 rounded-[28px] border border-white/[0.08] bg-card/55 p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-2xl bg-primary/15 p-3 text-primary">
          <Compass className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">学习路径导航</h2>
          <p className="text-sm text-muted-foreground">
            先补哪一门、下一步学什么、哪些课程适合并行穿插，这里会给你一个更轻量的导航入口。
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={`${item.label}-${item.course.slug}`}
            href={`/academy/${item.course.slug}`}
            className="group rounded-[22px] border border-white/[0.08] bg-background/75 p-5 transition hover:border-primary/30 hover:bg-background/90"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                {item.label}
              </span>
              {item.label === '上一门' || item.label === '建议前置' ? (
                <MoveLeft className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
              ) : item.label === '下一门' || item.label === '回到主线' ? (
                <MoveRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
              ) : (
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
              )}
            </div>

            <div className="text-base font-semibold text-foreground">
              {item.course.shortTitle}
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.course.subtitle}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-card px-3 py-1.5">
                {item.course.level}
              </span>
              <span className="rounded-full bg-card px-3 py-1.5">
                {item.course.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
