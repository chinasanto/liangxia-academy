import { insightArticles } from '@/data/insights'
import { unstable_cache } from 'next/cache'
import {
  getDatabaseInsightBySlug,
  listDatabaseInsights,
} from '@/lib/content-database'
import type { CourseCatalogEntry } from '@/lib/course-types'
import type { InsightArticle } from '@/lib/insight-types'

function compareArticles(a: InsightArticle, b: InsightArticle) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
}

const getCachedInsights = unstable_cache(
  async () => listDatabaseInsights(),
  ['academy-insights-all'],
  {
    tags: ['academy-insights'],
    revalidate: false,
  },
)

function toInsightSummary(article: InsightArticle): InsightArticle {
  return {
    ...article,
    sections: article.sections.map((section) => ({
      title: section.title,
      paragraphs: [],
      bullets: section.bullets ?? [],
    })),
  }
}

export async function getAllInsights(): Promise<InsightArticle[]> {
  try {
    const articles = await getCachedInsights()
    if (articles.length > 0) {
      return [...articles].sort(compareArticles)
    }
  } catch {
    // Fall back to local insight data when Neon is unavailable or not initialized.
  }

  return [...insightArticles].sort(compareArticles)
}

export async function getAllInsightSummaries(): Promise<InsightArticle[]> {
  const articles = await getAllInsights()
  return articles.map(toInsightSummary)
}

export async function getFeaturedInsights(limit = 3): Promise<InsightArticle[]> {
  return insightArticles
    .filter((article) => article.featured)
    .sort(compareArticles)
    .slice(0, limit)
}

export async function getInsightBySlug(slug: string): Promise<InsightArticle | null> {
  try {
    const article = await getDatabaseInsightBySlug(slug)
    if (article) {
      return article
    }
  } catch {
    // Fall back to local insight data when Neon is unavailable or not initialized.
  }

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
