import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CalendarDays, Clock3 } from 'lucide-react'

import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { getDbInsightBySlug } from '@/lib/db-admin-insights'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const dynamic = 'force-dynamic'

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getDbInsightBySlug(slug)

  if (!article) {
    return {
      title: '预览文章不存在 | 后台',
    }
  }

  return {
    title: `${article.title} | 后台预览`,
    description: article.description,
    alternates: {
      canonical: `/admin/preview/${article.slug}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function AdminPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getDbInsightBySlug(slug)

  if (!article) {
    notFound()
  }

  const previewJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    url: absoluteUrl(`/admin/preview/${article.slug}`),
  }

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={previewJsonLd} />

      <div className="border-b border-white/[0.06] bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/admin"
            className="text-sm text-muted-foreground transition hover:text-foreground"
          >
            返回后台
          </Link>
          <div className="text-xs text-muted-foreground">文章预览</div>
        </div>
      </div>

      <div className="px-6 pb-20 pt-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <section className="p-0 sm:rounded-[30px] sm:border sm:border-white/[0.08] sm:bg-card/50 sm:p-8 lg:p-12">
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

            <h1 className="font-serif text-3xl font-black leading-tight text-foreground sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
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
                className="border-b border-white/[0.08] bg-transparent px-0 pb-8 last:border-b-0 sm:rounded-[28px] sm:border sm:bg-card/45 sm:p-8 lg:p-10"
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

            <section className="border-b border-primary/15 bg-transparent px-0 pb-8 sm:rounded-[28px] sm:border sm:bg-primary/8 sm:p-8 lg:p-10">
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
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
