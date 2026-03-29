import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { CourseRecommendation } from '@/lib/course-types'

type CourseRelatedLinksProps = {
  items: CourseRecommendation[]
}

export function CourseRelatedLinks({ items }: CourseRelatedLinksProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="mt-8 p-0 sm:rounded-[28px] sm:border sm:border-white/[0.08] sm:bg-card/55 sm:p-8">
      <div className="mb-6 flex items-start gap-3">
        <div className="rounded-2xl bg-primary/15 p-3 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">相关课程推荐</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            从当前课程继续往前补基础、往后做进阶，或者横向扩展相关主题，会更容易形成完整学习路径。
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.course.slug}
            className="overflow-hidden border-b border-white/[0.08] bg-transparent last:border-b-0 sm:rounded-[24px] sm:border sm:bg-background/75"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.course.coverImage ?? '/placeholder.jpg'}
                alt={item.course.coverAlt ?? item.course.shortTitle}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                {item.label}
              </div>
            </div>

            <div className="space-y-4 px-0 py-5 sm:p-5">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.course.shortTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.reason}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-card px-3 py-1.5">
                  {item.course.level}
                </span>
                <span className="rounded-full bg-card px-3 py-1.5">
                  {item.course.category}
                </span>
              </div>

              <Button asChild className="w-full rounded-full font-mono text-xs">
                <Link href={`/academy/${item.course.slug}`}>
                  查看这门课
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
