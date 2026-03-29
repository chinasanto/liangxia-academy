import type { Metadata } from 'next'

import { AcademyContentTabs } from '@/components/academy-content-tabs'
import { AcademyShellHeader } from '@/components/academy-shell-header'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { getPublishedCourses } from '@/lib/course-store'
import { buildAcademyMetadata } from '@/lib/seo'
import { buildAcademyJsonLd } from '@/lib/structured-data'

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
  const courses = await getPublishedCourses()
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
            initialFilters={query}
            initialTab={query.tab}
          />
        </div>
      </div>

      <Footer />
    </main>
  )
}
