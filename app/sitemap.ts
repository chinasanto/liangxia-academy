import type { MetadataRoute } from 'next'

import { getAllCourses } from '@/lib/course-store'
import { getAllInsights } from '@/lib/insight-store'
import { absoluteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, insights] = await Promise.all([getAllCourses(), getAllInsights()])
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/academy'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/exchange'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/insights'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: absoluteUrl(`/academy/${course.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const insightPages: MetadataRoute.Sitemap = insights.map((article) => ({
    url: absoluteUrl(`/insights/${article.slug}`),
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...coursePages, ...insightPages]
}
