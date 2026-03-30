import { insightArticles } from '@/data/insights'
import { getDbInsightBySlug, listDbInsights } from '@/lib/db-admin-insights'
import type { CourseCatalogEntry } from '@/lib/course-types'
import type { InsightArticle } from '@/lib/insight-types'

function compareArticles(a: InsightArticle, b: InsightArticle) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
}

function mergeInsights(staticInsights: InsightArticle[], dbInsights: InsightArticle[]) {
  const merged = new Map<string, InsightArticle>()

  for (const article of staticInsights) {
    merged.set(article.slug, article)
  }

  for (const article of dbInsights) {
    merged.set(article.slug, article)
  }

  return Array.from(merged.values()).sort(compareArticles)
}

async function getMergedInsights() {
  try {
    const dbInsights = await listDbInsights({ publishedOnly: true })
    return mergeInsights(insightArticles, dbInsights)
  } catch {
    return [...insightArticles].sort(compareArticles)
  }
}

export async function getAllInsights() {
  return getMergedInsights()
}

export async function getFeaturedInsights(limit = 3) {
  const articles = await getMergedInsights()

  return articles
    .filter((article) => article.featured)
    .slice(0, limit)
}

export async function getInsightBySlug(slug: string) {
  try {
    const dbArticle = await getDbInsightBySlug(slug, { publishedOnly: true })
    if (dbArticle) {
      return dbArticle
    }
  } catch {
    // Fall through to the static article copy when database access is unavailable.
  }

  return insightArticles.find((article) => article.slug === slug) ?? null
}

export async function getInsightsForCourse(
  course: CourseCatalogEntry,
  limit = 2,
) {
  const articles = await getMergedInsights()

  return articles
    .filter((article) => article.relatedCourseSlugs.includes(course.slug))
    .slice(0, limit)
}
