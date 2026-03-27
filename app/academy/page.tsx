import Link from 'next/link'
import { ChevronRight, Home, Layers3, Sparkles } from 'lucide-react'

import { CourseCard } from '@/components/course-card'
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

          <section className="mb-10 rounded-[32px] border border-white/[0.08] bg-card/60 p-8 lg:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-4 font-mono text-[11px] tracking-[0.18em] text-primary">
                  // 量虾学院 · COURSE HOME
                </p>
                <h1 className="mb-4 font-serif text-4xl font-black text-foreground sm:text-5xl">
                  量化课程首页升级为图文卡片布局，课程详情也能原生浏览。
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  这里集中展示已上架课程。课程卡片参考你给的课程主页排布，支持封面图、
                  评分、人数、课时和价格展示，点击就能进入课程详情页查看模块目录与课程介绍。
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { label: '已上架课程', value: `${courses.length}` },
                  { label: '精选课程', value: `${featuredCount}` },
                  { label: '课程方向', value: '5+' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/[0.08] bg-background/75 p-4"
                  >
                    <div className="font-mono text-2xl font-bold text-foreground">
                      {item.value}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">课程目录</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                封面图、价格展示和课程信息都已与详情页数据打通。
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-card/50 px-4 py-2 text-sm text-muted-foreground md:flex">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>推荐先从基础课或因子工程开始</span>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </section>

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
