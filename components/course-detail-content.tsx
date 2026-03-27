'use client'

import { CheckCircle2, MessageSquareText, PlayCircle } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type {
  CourseCatalogSection,
  CourseReview,
} from '@/lib/course-types'

type CourseDetailContentProps = {
  highlights: string[]
  requirements: string[]
  audience: string[]
  catalogSections: CourseCatalogSection[]
  reviews: CourseReview[]
}

export function CourseDetailContent({
  highlights,
  requirements,
  audience,
  catalogSections,
  reviews,
}: CourseDetailContentProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-[28px] border border-white/[0.08] bg-card/55 p-4">
        <div className="flex flex-wrap gap-2">
          {[
            { href: '#course-overview', label: '课程介绍' },
            { href: '#course-catalog', label: '课程目录' },
            { href: '#course-reviews', label: '学员评价' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full bg-background/80 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-primary hover:text-primary-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>

      <section
        id="course-overview"
        className="scroll-mt-24 rounded-[28px] border border-white/[0.08] bg-card/55 p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-foreground">课程亮点</h2>
            <ul className="space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">学习要求</h3>
              <ol className="space-y-3">
                {requirements.map((item, index) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">适合人群</h3>
              <div className="flex flex-wrap gap-2">
                {audience.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-background/85 px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="course-catalog"
        className="scroll-mt-24 rounded-[28px] border border-white/[0.08] bg-card/55 p-8"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">课程目录</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            课程目录采用模块化结构展示，参考你提供的目录页样式做了站内原生化重构。
          </p>
        </div>

        <Accordion type="multiple" defaultValue={catalogSections.slice(0, 2).map((section) => section.id)}>
          {catalogSections.map((section, index) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="mb-4 overflow-hidden rounded-[24px] border border-white/[0.08] bg-background/70 px-5 last:mb-0"
            >
              <AccordionTrigger className="py-5 no-underline hover:no-underline">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#dbe9ff] text-sm font-semibold text-[#3d7aff]">
                    {index + 1}
                  </span>
                  <div className="text-left">
                    <div className="text-base font-semibold text-foreground">{section.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {section.lessonCount} · {section.totalHours}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-2">
                  {section.lessons.map((lesson) => (
                    <div
                      key={`${section.id}-${lesson.title}`}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-card/45 px-4 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <PlayCircle className="h-4 w-4 shrink-0 text-[#c7d7ec]" />
                        <span className="truncate text-sm text-foreground/90">
                          {lesson.title}
                        </span>
                        {lesson.preview ? (
                          <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-xs text-green-300">
                            试听
                          </span>
                        ) : null}
                      </div>
                      <span className="shrink-0 text-sm text-[#a8bdd8]">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section
        id="course-reviews"
        className="scroll-mt-24 rounded-[28px] border border-white/[0.08] bg-card/55 p-8"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">学员评价</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            这里展示的是课程交付后的典型学习反馈。
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {reviews.map((review) => (
            <article
              key={`${review.name}-${review.role}`}
              className="rounded-[24px] border border-white/[0.08] bg-background/75 p-5"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">
                  {review.name.slice(0, 1)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.role}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm leading-7 text-foreground/85">
                <MessageSquareText className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <p>{review.comment}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
