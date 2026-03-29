import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Star,
  Users,
} from 'lucide-react'

import { AcademyShellHeader } from '@/components/academy-shell-header'
import { CourseCaseStudies } from '@/components/course-case-studies'
import { CourseConsultCta } from '@/components/course-consult-cta'
import { CourseDetailContent } from '@/components/course-detail-content'
import { CoursePathNav } from '@/components/course-path-nav'
import { CourseRelatedInsights } from '@/components/course-related-insights'
import { CourseRelatedLinks } from '@/components/course-related-links'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { Button } from '@/components/ui/button'
import { buildCoursePathNavigation } from '@/lib/academy-roadmap'
import { hasAdminSession } from '@/lib/admin-auth'
import { buildCourseFaqs } from '@/lib/course-faq'
import { buildCoursePositioning } from '@/lib/course-positioning'
import { buildCourseRecommendations } from '@/lib/course-recommendations'
import { getAllCourses, getCourseBySlug } from '@/lib/course-store'
import { getInsightsForCourse } from '@/lib/insight-store'
import { buildCourseMetadata } from '@/lib/seo'
import { buildCourseDetailJsonLd } from '@/lib/structured-data'

type CourseDetailPageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourseBySlug(slug, {
    includeDrafts: await hasAdminSession(),
  })

  if (!course) {
    return {
      title: '课程不存在 | AI量化学院',
    }
  }

  return buildCourseMetadata(course)
}

export default async function CourseDetailPage({
  params,
  searchParams,
}: CourseDetailPageProps) {
  const { slug } = await params
  const query = await searchParams
  const isAdmin = await hasAdminSession()
  const preview = query.preview === '1' && isAdmin
  const [course, allCourses] = await Promise.all([
    getCourseBySlug(slug, { includeDrafts: preview }),
    getAllCourses({ includeDrafts: preview }),
  ])

  if (!course) {
    notFound()
  }

  const faqs = buildCourseFaqs(course)
  const positioning = buildCoursePositioning(course)
  const relatedCourses = buildCourseRecommendations(course, allCourses)
  const pathNavigation = buildCoursePathNavigation(course, allCourses)
  const relatedInsights = await getInsightsForCourse(course, 2)

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={buildCourseDetailJsonLd(course)} />
      <AcademyShellHeader backHref="/academy" backLabel="返回课程列表" />

      <div className="px-6 pb-20 pt-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <section className="mb-8 overflow-hidden rounded-[32px] border border-white/[0.08] bg-card/60">
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-[520px]">
                <Image
                  src={course.coverImage ?? '/placeholder.jpg'}
                  alt={course.coverAlt ?? course.shortTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="flex flex-col justify-between p-5 sm:p-8 lg:p-10">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-mono text-primary">
                      {course.level}
                    </span>
                    <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-mono text-muted-foreground">
                      {course.category}
                    </span>
                    <span className="rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-mono text-amber-300">
                      {course.badge}
                    </span>
                    {preview && !course.published ? (
                      <span className="rounded-full bg-red-500/15 px-3 py-1 text-[11px] font-mono text-red-300">
                        草稿预览
                      </span>
                    ) : null}
                  </div>

                  <h1 className="mb-4 font-serif text-3xl font-black leading-tight text-foreground sm:text-4xl">
                    {course.title}
                  </h1>
                  <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {course.subtitle}
                  </p>

                  <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                      {course.rating} ({course.reviewCount}评价)
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-primary" />
                      {course.studentCount}人学习
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

                  <p className="text-sm leading-7 text-foreground/85">
                    {course.summary}
                  </p>
                </div>

                <div className="mt-8 hidden flex-col items-start gap-4 rounded-[28px] border border-white/[0.08] bg-background/75 p-5 sm:flex sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">课程价格</div>
                    <div className="font-mono text-3xl font-bold text-[#3da9ff]">
                      {course.price}
                    </div>
                    {course.originalPrice ? (
                      <div className="mt-1 text-sm text-muted-foreground line-through">
                        {course.originalPrice}
                      </div>
                    ) : null}
                  </div>

                  <Button asChild className="w-full rounded-full px-5 font-mono text-xs sm:w-auto">
                    <Link href="/academy">返回课程总览</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section
            id="course-overview"
            className="mb-8 scroll-mt-24 p-0 sm:rounded-[28px] sm:border sm:border-white/[0.08] sm:bg-card/55 sm:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-5">
                  <div className="text-xs font-semibold tracking-[0.14em] text-primary">
                    课程介绍
                  </div>
                </div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2c6bff] text-2xl font-semibold text-white">
                    {course.instructor?.name.slice(0, 1)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xl font-semibold text-foreground">
                        {course.instructor?.name}
                      </span>
                      <span className="rounded-full border border-white/[0.08] bg-background/80 px-2.5 py-1 text-xs text-muted-foreground">
                        认证讲师
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {course.instructor?.title}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {course.instructor?.students}学员 · {course.instructor?.courseCount}课程 · {course.instructor?.rating}分
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-7 text-foreground/85">
                  {course.instructor?.description}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      label: '教学侧重',
                      value: '实战闭环',
                      description: '强调从研究、回测到部署的完整链路，而不是只停留在理论讲解。',
                    },
                    {
                      label: '课程风格',
                      value: '可落地',
                      description: '重点讲清怎么做、为什么这样做，以及如何迁移到自己的系统里。',
                    },
                    {
                      label: '交付结果',
                      value: '可复用',
                      description: '帮助学员沉淀可复盘、可扩展、可持续升级的量化研发框架。',
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="border-b border-white/[0.08] bg-transparent px-0 pb-4 last:border-b-0 sm:rounded-[20px] sm:border sm:bg-background/70 sm:p-4"
                    >
                      <div className="text-xs font-semibold tracking-[0.12em] text-primary">
                        {item.label}
                      </div>
                      <div className="mt-2 text-lg font-semibold text-foreground">
                        {item.value}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <div className="mb-4 text-lg font-semibold text-foreground">本课重点</div>
                  <ul className="space-y-3">
                    {(course.highlights ?? []).map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-7 text-foreground/90">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/[0.08] pt-6 sm:rounded-[24px] sm:border sm:bg-background/75 sm:p-5">
                <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  学习收获
                </div>
                <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                  {(course.tags ?? []).map((tag) => (
                    <li key={tag} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-white/[0.08] pt-6">
                  <div className="mb-3 text-base font-semibold text-foreground">学习要求</div>
                  <ol className="space-y-3">
                    {(course.requirements ?? []).map((item, index) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-6">
                  <div className="mb-3 text-base font-semibold text-foreground">适合人群</div>
                  <div className="flex flex-wrap gap-2">
                    {(course.audience ?? []).map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-card/60 px-3 py-1.5 text-sm text-muted-foreground sm:bg-card"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <CourseDetailContent
            catalogSections={course.catalogSections ?? []}
            reviews={course.reviews ?? []}
            faqs={faqs}
            seoSections={course.seoSections ?? []}
            positioning={positioning}
            hasCaseStudies={(course.caseStudies ?? []).length > 0}
          />

          <CourseCaseStudies items={course.caseStudies ?? []} />

          <CourseConsultCta courseTitle={course.shortTitle} />

          <CoursePathNav
            previous={pathNavigation.previous}
            next={pathNavigation.next}
            parallel={pathNavigation.parallel}
          />

          <CourseRelatedLinks items={relatedCourses} />

          <CourseRelatedInsights articles={relatedInsights} />
        </div>
      </div>

      <Footer />
    </main>
  )
}
