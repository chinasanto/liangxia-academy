import Link from 'next/link'
import type { Metadata } from 'next'
import { Layers3 } from 'lucide-react'

import { AcademyContentTabs } from '@/components/academy-content-tabs'
import { AcademyShellHeader } from '@/components/academy-shell-header'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { getPublishedCourses } from '@/lib/course-store'
import { getAllInsights } from '@/lib/insight-store'
import { buildAcademyMetadata } from '@/lib/seo'
import { buildAcademyJsonLd } from '@/lib/structured-data'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = buildAcademyMetadata()

export default async function AcademyPage({
  searchParams,
}: {
  searchParams: Promise<{
    level?: string
    category?: string
    search?: string
    tab?: string
  }>
}) {
  const query = await searchParams
  const [courses, allInsights] = await Promise.all([
    getPublishedCourses(),
    getAllInsights(),
  ])
  const featuredCount = courses.filter((course) => course.featured).length

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={buildAcademyJsonLd(courses)} />
      <AcademyShellHeader />

      <div className="px-6 pb-20 pt-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <AcademyContentTabs
            courses={courses}
            featuredCount={featuredCount}
            allInsights={allInsights}
            initialFilters={query}
            initialTab={query.tab}
          />

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
