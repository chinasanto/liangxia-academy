import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Clock3, Star, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { CourseCatalogEntry } from '@/lib/course-types'

type CourseCardProps = {
  course: CourseCatalogEntry
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="group overflow-hidden rounded-[26px] border border-white/[0.08] bg-card/65 shadow-[0_18px_50px_rgba(3,10,18,0.28)] transition duration-300 hover:-translate-y-1 hover:border-primary/30">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/[0.08]">
        <Image
          src={course.coverImage ?? '/placeholder.jpg'}
          alt={course.coverAlt ?? course.shortTitle}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold text-primary-foreground">
            {course.level}
          </span>
          <span className="rounded-full bg-background/80 px-3 py-1 text-[11px] font-medium text-foreground">
            {course.badge}
          </span>
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
            {course.rating}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            {course.studentCount}人
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
            <div className="font-mono text-2xl font-bold text-[#3da9ff]">
              {course.price}
            </div>
            {course.originalPrice ? (
              <div className="text-sm text-muted-foreground line-through">
                {course.originalPrice}
              </div>
            ) : null}
          </div>

          <Button asChild size="sm" className="rounded-full px-4 font-mono text-xs">
            <Link href={`/academy/${course.slug}`}>查看详情</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
