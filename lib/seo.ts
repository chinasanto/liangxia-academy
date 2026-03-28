import type { Metadata } from 'next'

import type { CourseCatalogEntry } from '@/lib/course-types'

export const SITE_NAME = 'AI量化学院'
export const SITE_URL = 'https://www.aiquantclaw.com'

export const HOME_KEYWORDS = [
  'AI量化学院',
  'AI量化课程',
  '量化交易课程',
  '因子工程课程',
  'WorldQuant Brain课程',
  'AI大模型辅助量化编程',
  '量化编程',
  '量化学习路径',
  'AI量化基础课',
  '量化全流程课程',
]

export const ACADEMY_KEYWORDS = [
  'AI量化学院课程目录',
  'AI量化基础课程班',
  '因子工程设计卓越班',
  '因子工程科学评估大乘班',
  'AI量化全流程高级班',
  'WorldQuant Brain实战课',
  'AI大模型辅助量化编程',
]

function dedupeKeywords(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)))
}

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString()
}

export function buildHomeMetadata(): Metadata {
  const title = 'AI量化学院 | AI量化课程、因子工程、WorldQuant Brain 与量化编程'
  const description =
    'AI量化学院提供 AI量化基础课、因子工程、全流程高级班、WorldQuant Brain 与 AI大模型辅助量化编程课程，适合从入门到系统进阶的量化学习者。'

  return {
    title,
    description,
    keywords: HOME_KEYWORDS,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl('/'),
      siteName: SITE_NAME,
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export function buildAcademyMetadata(): Metadata {
  const title = 'AI量化学院课程目录 | 因子工程、量化交易、WorldQuant Brain、AI量化编程'
  const description =
    '浏览 AI量化学院课程目录，涵盖 AI量化基础课程班、因子工程、全流程高级班、WorldQuant Brain 与 AI大模型辅助量化编程等核心课程。'

  return {
    title,
    description,
    keywords: ACADEMY_KEYWORDS,
    alternates: {
      canonical: '/academy',
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl('/academy'),
      siteName: SITE_NAME,
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export function buildCourseMetadata(course: CourseCatalogEntry): Metadata {
  const title = `${course.shortTitle} | ${course.category} | AI量化学院`
  const description = `${course.shortTitle}：${course.subtitle}。${course.summary} 课程时长${course.duration ?? ''}，共${course.lessonCount ?? ''}，由${course.instructor?.name ?? 'AI量化讲师'}授课。`
  const keywords = dedupeKeywords([
    course.shortTitle,
    course.title,
    course.category,
    course.level,
    course.badge,
    ...(course.tags ?? []),
    'AI量化学院',
    '量化交易课程',
    '量化编程课程',
  ])

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/academy/${course.slug}`,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/academy/${course.slug}`),
      siteName: SITE_NAME,
      locale: 'zh_CN',
      type: 'article',
      images: course.coverImage
        ? [
            {
              url: course.coverImage.startsWith('http')
                ? course.coverImage
                : absoluteUrl(course.coverImage),
              alt: course.coverAlt ?? course.shortTitle,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: course.coverImage
        ? [
            course.coverImage.startsWith('http')
              ? course.coverImage
              : absoluteUrl(course.coverImage),
          ]
        : undefined,
    },
  }
}
