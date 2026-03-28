import type { MetadataRoute } from 'next'

import { getAllCourses } from '@/lib/course-store'
import { absoluteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await getAllCourses()
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
  ]

  const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
    url: absoluteUrl(`/academy/${course.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...coursePages]
}
