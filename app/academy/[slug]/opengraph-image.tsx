import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'

import { getCourseBySlug } from '@/lib/course-store'
import { ogImageContentType, ogImageSize, renderOgCard } from '@/lib/og-card'
import { absoluteUrl } from '@/lib/seo'

export const alt = '课程分享预览图'
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = await getCourseBySlug(slug, { includeDrafts: false })

  if (!course) {
    notFound()
  }

  const coverImage = course.coverImage
    ? course.coverImage.startsWith('http')
      ? course.coverImage
      : absoluteUrl(course.coverImage)
    : absoluteUrl('/brand/aiquant-logo.jpg')

  return new ImageResponse(
    renderOgCard({
      eyebrow: course.isFreeCourse ? '免费公开课' : course.category,
      title: course.shortTitle,
      description: course.subtitle,
      imageUrl: coverImage,
      badge: course.isFreeCourse ? '腾讯会议录播' : 'AI量化课程',
    }),
    size,
  )
}
