import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react'

import { AcademySubnav } from '@/components/academy-subnav'
import { AcademyShellHeader } from '@/components/academy-shell-header'
import { CourseCard } from '@/components/course-card'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { getAllCourses } from '@/lib/course-store'
import { getAllInsights, getInsightBySlug } from '@/lib/insight-store'
import { buildInsightMetadata } from '@/lib/seo'
import { buildInsightArticleJsonLd } from '@/lib/structured-data'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getInsightBySlug(slug)

  if (!article) {
    return {
      title: '文章不存在 | 量化技巧',
    }
  }

  return buildInsightMetadata(article)
}

export default async function AcademyInsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [article, courses, articles] = await Promise.all([
    getInsightBySlug(slug),
    getAllCourses(),
    getAllInsights(),
  ])

  if (!article) {
    notFound()
  }

  const relatedCourses = courses.filter((course) =>
    article.relatedCourseSlugs.includes(course.slug),
  )
  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug && item.category === article.category)
    .slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={buildInsightArticleJsonLd(article)} />
      <AcademyShellHeader backHref="/academy/insights" backLabel="返回量化技巧" />

      <div className="px-6 pb-20 pt-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <AcademySubnav active="insights" className="mb-8" />

          <Link
            href="/academy/insights"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-85"
          >
            返回量化技巧
            <ArrowRight className="h-4 w-4" />
          </Link>

          <section className="rounded-[30px] border border-white/[0.08] bg-card/50 p-8 sm:p-10 lg:p-12">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
                {article.category}
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-background/75 px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-serif text-4xl font-black leading-tight text-foreground sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              {article.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {article.publishedAt}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>
          </section>

          <div className="mt-8 space-y-8">
            {article.sections.map((section) => (
              <section
                key={section.title}
                className="rounded-[28px] border border-white/[0.08] bg-card/45 p-8 lg:p-10"
              >
                <h2 className="text-2xl font-bold text-foreground">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-8 text-foreground/85">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section className="rounded-[28px] border border-primary/15 bg-primary/8 p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-foreground">关键结论</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground/85">
                {article.keyTakeaways.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[28px] border border-white/[0.08] bg-card/45 p-8 lg:p-10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">关联课程</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  如果你想把这篇文章里的方法系统化学习，可以从这些课程继续深入。
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {relatedCourses.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            </section>

            {relatedArticles.length > 0 ? (
              <section className="rounded-[28px] border border-white/[0.08] bg-card/45 p-8 lg:p-10">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground">继续阅读</h2>
                </div>
                <div className="grid gap-5 lg:grid-cols-3">
                  {relatedArticles.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/academy/insights/${item.slug}`}
                      className="rounded-[24px] border border-white/[0.08] bg-background/75 p-5 transition hover:border-primary/30"
                    >
                      <div className="text-sm font-semibold text-primary">
                        {item.category}
                      </div>
                      <div className="mt-2 text-lg font-semibold text-foreground">
                        {item.title}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {item.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
