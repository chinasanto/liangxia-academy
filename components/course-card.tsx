import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Clock3, ExternalLink, Star, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { CourseCatalogEntry } from '@/lib/course-types'

type CourseCardProps = {
  course: CourseCatalogEntry
}

export function CourseCard({ course }: CourseCardProps) {
  const isFreeCourse = course.isFreeCourse

  return (
    <article className="group overflow-hidden rounded-[26px] border border-white/[0.08] bg-card/85 shadow-[0_18px_50px_rgba(3,10,18,0.12)] transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_22px_60px_rgba(3,10,18,0.16)] dark:bg-card/65 dark:shadow-[0_18px_50px_rgba(3,10,18,0.28)]">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/[0.08] bg-muted/40">
        <Image
          src={course.coverImage ?? '/placeholder.jpg'}
          alt={course.coverAlt ?? course.shortTitle}
          fill
          className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold text-primary-foreground">
            {course.level}
          </span>
          <span className="rounded-full border border-white/50 bg-background/92 px-3 py-1 text-[11px] font-medium text-foreground shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-background/80">
            {course.badge}
          </span>
          {isFreeCourse ? (
            <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-[11px] font-semibold text-white">
              免费公开课
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="line-clamp-2 min-h-[3.5rem] text-xl font-bold text-foreground">
            {course.shortTitle}
          </h3>
          <p className="text-sm leading-6 text-muted-foreground">
            {course.instructor?.name}
            <span className="mx-2 text-muted-foreground/50">·</span>
            {course.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
            {isFreeCourse ? '免费回放' : course.rating}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            {isFreeCourse ? (course.accessMode ?? '腾讯会议录播') : `${course.studentCount}人`}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-4 w-4 text-primary" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-primary" />
            {course.lessonCount}
          </span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <div className={`font-mono text-2xl font-bold ${isFreeCourse ? 'text-emerald-500' : 'text-[#3da9ff]'}`}>
              {course.price}
            </div>
            {isFreeCourse && course.accessMode ? (
              <div className="text-sm text-muted-foreground">
                {course.accessMode}
              </div>
            ) : null}
            {course.originalPrice ? (
              <div className="text-sm text-muted-foreground line-through">
                {course.originalPrice}
              </div>
            ) : null}
          </div>

          <Button asChild size="sm" className="rounded-full px-4 font-mono text-xs">
            <Link href={`/academy/${course.slug}`}>
              {isFreeCourse ? '查看回放' : '查看详情'}
              {isFreeCourse ? <ExternalLink className="h-3.5 w-3.5" /> : null}
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
