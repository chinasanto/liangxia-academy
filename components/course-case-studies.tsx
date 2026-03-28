import { BriefcaseBusiness } from 'lucide-react'

import type { CourseCaseStudy } from '@/lib/course-types'

type CourseCaseStudiesProps = {
  items: CourseCaseStudy[]
}

export function CourseCaseStudies({ items }: CourseCaseStudiesProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section
      id="course-cases"
      className="scroll-mt-24 rounded-[28px] border border-white/[0.08] bg-card/55 p-8"
    >
      <div className="mb-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
          <BriefcaseBusiness className="h-3.5 w-3.5" />
          真实案例
        </div>
        <h2 className="text-2xl font-bold text-foreground">这门课怎样落到真实问题上</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          这里展示的不是抽象描述，而是课程更典型的落地问题、方法路径和学习结果。
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-[24px] border border-white/[0.08] bg-background/75 p-6"
          >
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/85">
              <p><span className="font-semibold text-foreground">场景：</span>{item.scenario}</p>
              <p><span className="font-semibold text-foreground">做法：</span>{item.approach}</p>
              <p><span className="font-semibold text-foreground">结果：</span>{item.outcome}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
