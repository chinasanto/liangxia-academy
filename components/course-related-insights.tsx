import { InsightsSection } from '@/components/insights-section'
import type { InsightArticle } from '@/lib/insight-types'

type CourseRelatedInsightsProps = {
  articles: InsightArticle[]
}

export function CourseRelatedInsights({
  articles,
}: CourseRelatedInsightsProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <InsightsSection
      title="相关技巧文章"
      description="如果你想把这门课里的某个思路继续往工程细节或方法层面深入，这几篇文章会是很自然的延伸阅读。"
      articles={articles}
      className="mt-8 p-0 sm:rounded-[28px] sm:border sm:border-white/[0.08] sm:bg-card/45 sm:p-8"
    />
  )
}
