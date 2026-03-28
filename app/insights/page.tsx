import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { InsightsSection } from '@/components/insights-section'
import { JsonLd } from '@/components/json-ld'
import { getAllInsights } from '@/lib/insight-store'
import { buildInsightsMetadata } from '@/lib/seo'
import { buildInsightsJsonLd } from '@/lib/structured-data'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = buildInsightsMetadata()

export default async function InsightsPage() {
  const articles = await getAllInsights()

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <JsonLd data={buildInsightsJsonLd(articles)} />

      <div className="px-6 pb-20 pt-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <section className="mb-10 rounded-[30px] border border-white/[0.08] bg-card/45 p-8 sm:p-10">
            <div className="max-w-4xl">
              <div className="mb-4 inline-flex rounded-full bg-primary/12 px-4 py-1.5 text-xs font-semibold text-primary">
                量化技巧独立模块
              </div>
              <h1 className="font-serif text-4xl font-black leading-tight text-foreground sm:text-5xl">
                把课程之外的量化工程技巧
                <br />
                沉淀成可持续复用的文章体系
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-muted-foreground sm:text-base">
                这里会持续发布因子工程、AI量化开发、策略部署、WorldQuant Brain 和量化研究方法相关的技巧文章。
                它不是课程目录的附属页，而是一个独立的知识模块，适合做长期学习与搜索流量承接。
              </p>
            </div>
          </section>

          <InsightsSection
            articles={articles}
            title="全部技巧文章"
            description="每篇文章都围绕一个高频量化问题展开，既能做搜索入口，也能作为课程内容的延伸阅读。"
          />
        </div>
      </div>

      <Footer />
    </main>
  )
}
