import type { Metadata } from 'next'

import { AcademyShellHeader } from '@/components/academy-shell-header'
import { Footer } from '@/components/footer'
import { InsightsExplorer } from '@/components/insights-explorer'
import { JsonLd } from '@/components/json-ld'
import { getAllInsights } from '@/lib/insight-store'
import { buildInsightsMetadata } from '@/lib/seo'
import { buildInsightsJsonLd } from '@/lib/structured-data'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = buildInsightsMetadata()

export default async function AcademyInsightsPage() {
  const articles = await getAllInsights()

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={buildInsightsJsonLd(articles)} />
      <AcademyShellHeader backHref="/academy" backLabel="返回学院首页" />

      <div className="px-6 pb-20 pt-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <section className="mb-10 rounded-[30px] border border-white/[0.08] bg-card/45 p-8 sm:p-10">
            <div className="max-w-4xl">
              <div className="mb-4 inline-flex rounded-full bg-primary/12 px-4 py-1.5 text-xs font-semibold text-primary">
                AI量化学院 · 量化技巧
              </div>
              <h1 className="font-serif text-4xl font-black leading-tight text-foreground sm:text-5xl">
                把课程之外的量化工程经验
                <br />
                沉淀成持续可复用的技巧文章
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-muted-foreground sm:text-base">
                这里是 AI量化学院的内容延伸区，持续沉淀因子工程、AI量化开发、策略部署、
                WorldQuant Brain 和量化研究方法相关的实战技巧，和课程一起组成完整学习体系。
              </p>
            </div>
          </section>

          <InsightsExplorer
            articles={articles}
            title="全部技巧文章"
            description="可以按关键词、分类和标签快速筛选文章，更方便找到当前最想看的量化问题和方法内容。"
          />
        </div>
      </div>

      <Footer />
    </main>
  )
}
