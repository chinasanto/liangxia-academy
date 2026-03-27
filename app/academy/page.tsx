import Link from 'next/link'
import { ChevronRight, Home, Layers3 } from 'lucide-react'

import { AcademyContentTabs } from '@/components/academy-content-tabs'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { getPublishedCourses } from '@/lib/course-store'

export const dynamic = 'force-dynamic'

export default async function AcademyPage() {
  const courses = await getPublishedCourses()
  const featuredCount = courses.filter((course) => course.featured).length

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="px-6 pb-20 pt-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="inline-flex items-center gap-2 hover:text-primary">
              <Home className="h-4 w-4" />
              主页
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">量虾学院</span>
          </nav>

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
                    现在量虾学院和主页已经打通，可以随时往返。
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
