import Link from 'next/link'
import { BookOpenText, ChevronLeft, Layers3 } from 'lucide-react'

import { AcademyContentTabs } from '@/components/academy-content-tabs'
import { Footer } from '@/components/footer'
import { getPublishedCourses } from '@/lib/course-store'

export const dynamic = 'force-dynamic'

export default async function AcademyPage() {
  const courses = await getPublishedCourses()
  const featuredCount = courses.filter((course) => course.featured).length

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm">返回首页</span>
            </Link>
            <div className="hidden h-6 w-px bg-border sm:block" />
            <div className="hidden items-center gap-2 sm:flex">
              <BookOpenText className="h-5 w-5 text-primary" />
              <span className="font-mono text-sm font-bold tracking-wider text-primary">
                AI量化学院
              </span>
              <span className="text-xs text-muted-foreground">/</span>
              <span className="text-xs text-muted-foreground">AI Quant Academy</span>
            </div>
          </div>

          <div />
        </div>
      </header>

      <div className="px-6 pb-20 pt-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <AcademyContentTabs courses={courses} featuredCount={featuredCount} />

          <section className="mt-12 rounded-[28px] border border-white/[0.08] bg-card/50 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/15 p-3 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">
                    想继续回到主站看其他版块？
                  </div>
                  <div className="text-sm text-muted-foreground">
                    现在 AI量化学院 和主页已经打通，可以随时往返。
                  </div>
                </div>
              </div>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                返回主页
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
