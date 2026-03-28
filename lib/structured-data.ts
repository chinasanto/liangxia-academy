import { buildCourseFaqs } from '@/lib/course-faq'
import type { CourseCatalogEntry, CourseFaq, CourseReview } from '@/lib/course-types'
import type { InsightArticle } from '@/lib/insight-types'
import { SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/seo'

const ORGANIZATION_ID = absoluteUrl('/#organization')
const WEBSITE_ID = absoluteUrl('/#website')
const COURSE_LIST_ID = absoluteUrl('/academy#course-list')

function toImageUrl(path?: string) {
  if (!path) {
    return undefined
  }

  return path.startsWith('http') ? path : absoluteUrl(path)
}

function parseNumericValue(value?: string) {
  if (!value) {
    return undefined
  }

  const sanitized = value.replace(/[^0-9.]/g, '')
  if (!sanitized) {
    return undefined
  }

  const parsed = Number(sanitized)
  return Number.isFinite(parsed) ? parsed : undefined
}

function parseIntegerValue(value?: string) {
  const parsed = parseNumericValue(value)

  if (parsed === undefined) {
    return undefined
  }

  return Math.round(parsed)
}

function toDurationIso(value?: string) {
  const hours = parseNumericValue(value)

  if (hours === undefined) {
    return undefined
  }

  return `PT${hours}H`
}

function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: 'AI Quant Academy',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/apple-icon.png'),
    },
    description:
      'AI量化学院提供 AI量化基础课、因子工程、WorldQuant Brain、量化全流程与 AI 编程提效课程。',
  }
}

function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'zh-CN',
    publisher: {
      '@id': ORGANIZATION_ID,
    },
  }
}

function buildCourseListItem(course: CourseCatalogEntry, position: number) {
  const courseUrl = absoluteUrl(`/academy/${course.slug}`)

  return {
    '@type': 'ListItem',
    position,
    url: courseUrl,
    item: {
      '@type': 'Course',
      '@id': `${courseUrl}#course`,
      name: course.shortTitle,
      description: course.summary,
      provider: {
        '@id': ORGANIZATION_ID,
      },
      image: toImageUrl(course.coverImage),
    },
  }
}

function buildItemListJsonLd(
  id: string,
  name: string,
  courses: CourseCatalogEntry[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': id,
    name,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) =>
      buildCourseListItem(course, index + 1),
    ),
  }
}

function buildReviewJsonLd(review: CourseReview) {
  return {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.name,
    },
    reviewBody: review.comment,
    reviewAspect: review.role,
  }
}

function buildFaqPageJsonLd(courseUrl: string, faqs: CourseFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${courseUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildHomeJsonLd(courses: CourseCatalogEntry[]) {
  return [
    buildOrganizationJsonLd(),
    buildWebsiteJsonLd(),
    buildItemListJsonLd(absoluteUrl('/#academy-course-list'), 'AI量化学院课程列表', courses),
  ]
}

export function buildAcademyJsonLd(courses: CourseCatalogEntry[]) {
  return [
    buildOrganizationJsonLd(),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': absoluteUrl('/academy#collection-page'),
      url: absoluteUrl('/academy'),
      name: 'AI量化学院课程目录',
      description:
        'AI量化学院课程目录，涵盖基础体系、因子工程、策略闭环、WorldQuant Brain 与 AI 编程提效课程。',
      inLanguage: 'zh-CN',
      isPartOf: {
        '@id': WEBSITE_ID,
      },
      about: {
        '@id': ORGANIZATION_ID,
      },
      mainEntity: {
        '@id': COURSE_LIST_ID,
      },
    },
    buildItemListJsonLd(COURSE_LIST_ID, 'AI量化学院课程目录', courses),
  ]
}

export function buildInsightsJsonLd(articles: InsightArticle[]) {
  return [
    buildOrganizationJsonLd(),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': absoluteUrl('/insights#collection-page'),
      url: absoluteUrl('/insights'),
      name: '量化技巧文章',
      description:
        'AI量化学院量化技巧模块，覆盖因子工程、量化研究、AI 编程提效与策略部署等专题文章。',
      inLanguage: 'zh-CN',
      isPartOf: {
        '@id': WEBSITE_ID,
      },
      about: {
        '@id': ORGANIZATION_ID,
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: articles.map((article, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: absoluteUrl(`/insights/${article.slug}`),
          name: article.title,
        })),
      },
    },
  ]
}

export function buildCourseDetailJsonLd(course: CourseCatalogEntry) {
  const courseUrl = absoluteUrl(`/academy/${course.slug}`)
  const ratingValue = parseNumericValue(course.rating)
  const ratingCount = parseIntegerValue(course.reviewCount)
  const reviews = (course.reviews ?? []).slice(0, 2).map(buildReviewJsonLd)
  const faqs = buildCourseFaqs(course)

  return [
    buildOrganizationJsonLd(),
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${courseUrl}#instructor`,
      name: course.instructor?.name,
      jobTitle: course.instructor?.title,
      description: course.instructor?.description,
      worksFor: {
        '@id': ORGANIZATION_ID,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${courseUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'AI量化学院',
          item: absoluteUrl('/academy'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: course.shortTitle,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      '@id': `${courseUrl}#course`,
      url: courseUrl,
      name: course.shortTitle,
      description: course.summary,
      provider: {
        '@id': ORGANIZATION_ID,
      },
      image: toImageUrl(course.coverImage),
      inLanguage: 'zh-CN',
      educationalLevel: course.level,
      courseMode: 'online',
      timeRequired: toDurationIso(course.duration),
      keywords: [course.category, course.level, ...(course.tags ?? [])].join(', '),
      aggregateRating:
        ratingValue !== undefined && ratingCount !== undefined
          ? {
              '@type': 'AggregateRating',
              ratingValue,
              reviewCount: ratingCount,
            }
          : undefined,
      review: reviews.length > 0 ? reviews : undefined,
    },
    buildFaqPageJsonLd(courseUrl, faqs),
  ]
}

export function buildInsightArticleJsonLd(article: InsightArticle) {
  const articleUrl = absoluteUrl(`/insights/${article.slug}`)

  return [
    buildOrganizationJsonLd(),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${articleUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '量化技巧',
          item: absoluteUrl('/insights'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: article.title,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${articleUrl}#article`,
      headline: article.title,
      description: article.description,
      url: articleUrl,
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      articleSection: article.category,
      inLanguage: 'zh-CN',
      keywords: article.tags.join(', '),
      author: {
        '@type': 'Person',
        name: 'AI量化邹老师',
      },
      publisher: {
        '@id': ORGANIZATION_ID,
      },
      isPartOf: {
        '@id': WEBSITE_ID,
      },
    },
  ]
}
