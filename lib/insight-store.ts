import { insightArticles } from '@/data/insights'
import type { CourseCatalogEntry } from '@/lib/course-types'
import type { InsightArticle } from '@/lib/insight-types'

function compareArticles(a: InsightArticle, b: InsightArticle) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
}

export async function getAllInsights() {
  return [...insightArticles].sort(compareArticles)
}

export async function getFeaturedInsights(limit = 3) {
  return insightArticles
    .filter((article) => article.featured)
    .sort(compareArticles)
    .slice(0, limit)
}

export async function getInsightBySlug(slug: string) {
  return insightArticles.find((article) => article.slug === slug) ?? null
}

export async function getInsightsForCourse(
  course: CourseCatalogEntry,
  limit = 2,
) {
  return insightArticles
    .filter((article) => article.relatedCourseSlugs.includes(course.slug))
    .sort(compareArticles)
    .slice(0, limit)
}
