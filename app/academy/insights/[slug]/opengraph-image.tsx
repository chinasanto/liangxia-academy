import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'

import { getCourseBySlug } from '@/lib/course-store'
import { getInsightBySlug } from '@/lib/insight-store'
import { ogImageContentType, ogImageSize, renderOgCard } from '@/lib/og-card'
import { absoluteUrl } from '@/lib/seo'

export const alt = '文章分享预览图'
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getInsightBySlug(slug)

  if (!article) {
    notFound()
  }

  const firstRelatedCourseSlug = article.relatedCourseSlugs[0]
  const relatedCourse = firstRelatedCourseSlug
    ? await getCourseBySlug(firstRelatedCourseSlug, { includeDrafts: false })
    : null

  const previewImage = relatedCourse?.coverImage
    ? relatedCourse.coverImage.startsWith('http')
      ? relatedCourse.coverImage
      : absoluteUrl(relatedCourse.coverImage)
    : absoluteUrl('/brand/aiquant-logo.jpg')

  return new ImageResponse(
    renderOgCard({
      eyebrow: article.category,
      title: article.title,
      description: article.description,
      imageUrl: previewImage,
      badge: '量化技巧',
    }),
    size,
  )
}
