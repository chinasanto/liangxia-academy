import type {
  CourseCatalogEntry,
  CourseDetailConfig,
  CourseUpdatePayload,
} from '@/lib/course-types'
import type { InsightArticle, InsightSection } from '@/lib/insight-types'
import { executeNeonQuery, isNeonConfigured } from '@/lib/neon'

type DatabaseStatus = {
  mode: 'file' | 'neon'
  configured: boolean
  reachable: boolean
  bootstrapped: boolean
  courseCount: number
  insightCount: number
  error?: string
}

type CourseRow = {
  slug: string
  source_file: string
  title: string
  short_title: string
  subtitle: string
  summary: string
  seo_title: string | null
  seo_description: string | null
  category: string
  level: string
  badge: string
  price: string
  published: boolean
  featured: boolean
  sort_order: number
  stats: unknown
  tags: unknown
  cover_image: string | null
  cover_alt: string | null
  original_price: string | null
  rating: string | null
  review_count: string | null
  student_count: string | null
  duration: string | null
  lesson_count: string | null
  instructor: unknown
  highlights: unknown
  requirements: unknown
  audience: unknown
  catalog_sections: unknown
  reviews: unknown
  seo_sections: unknown
  case_studies: unknown
}

type InsightRow = {
  slug: string
  title: string
  excerpt: string
  description: string
  category: string
  tags: unknown
  published_at: string
  read_time: string
  featured: boolean
  related_course_slugs: unknown
  sections: unknown
  key_takeaways: unknown
}

let schemaReady = false

function parseJsonValue<T>(value: unknown, fallback: T): T {
  if (value == null) {
    return fallback
  }

  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T
    } catch {
      return fallback
    }
  }

  return value as T
}

function mapCourseRow(row: CourseRow): CourseCatalogEntry {
  return {
    slug: row.slug,
    sourceFile: row.source_file,
    title: row.title,
    shortTitle: row.short_title,
    subtitle: row.subtitle,
    summary: row.summary,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    category: row.category,
    level: row.level,
    badge: row.badge,
    price: row.price,
    published: row.published,
    featured: row.featured,
    sortOrder: row.sort_order,
    stats: parseJsonValue(row.stats, [] as string[]),
    tags: parseJsonValue(row.tags, [] as string[]),
    coverImage: row.cover_image ?? undefined,
    coverAlt: row.cover_alt ?? undefined,
    originalPrice: row.original_price ?? undefined,
    rating: row.rating ?? undefined,
    reviewCount: row.review_count ?? undefined,
    studentCount: row.student_count ?? undefined,
    duration: row.duration ?? undefined,
    lessonCount: row.lesson_count ?? undefined,
    instructor: parseJsonValue(row.instructor, undefined),
    highlights: parseJsonValue(row.highlights, [] as string[]),
    requirements: parseJsonValue(row.requirements, [] as string[]),
    audience: parseJsonValue(row.audience, [] as string[]),
    catalogSections: parseJsonValue(row.catalog_sections, []),
    reviews: parseJsonValue(row.reviews, []),
    seoSections: parseJsonValue(row.seo_sections, []),
    caseStudies: parseJsonValue(row.case_studies, []),
  }
}

function mapInsightRow(row: InsightRow): InsightArticle {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    description: row.description,
    category: row.category,
    tags: parseJsonValue(row.tags, [] as string[]),
    publishedAt: row.published_at,
    readTime: row.read_time,
    featured: row.featured,
    relatedCourseSlugs: parseJsonValue(row.related_course_slugs, [] as string[]),
    sections: parseJsonValue(row.sections, [] as InsightSection[]),
    keyTakeaways: parseJsonValue(row.key_takeaways, [] as string[]),
  }
}

function toCourseParams(course: CourseCatalogEntry) {
  const detail = course as CourseCatalogEntry & Partial<CourseDetailConfig>

  return [
    course.slug,
    course.sourceFile,
    course.title,
    course.shortTitle,
    course.subtitle,
    course.summary,
    course.seoTitle ?? null,
    course.seoDescription ?? null,
    course.category,
    course.level,
    course.badge,
    course.price,
    course.published,
    course.featured,
    course.sortOrder,
    JSON.stringify(course.stats ?? []),
    JSON.stringify(course.tags ?? []),
    detail.coverImage ?? null,
    detail.coverAlt ?? null,
    detail.originalPrice ?? null,
    detail.rating ?? null,
    detail.reviewCount ?? null,
    detail.studentCount ?? null,
    detail.duration ?? null,
    detail.lessonCount ?? null,
    JSON.stringify(detail.instructor ?? null),
    JSON.stringify(detail.highlights ?? []),
    JSON.stringify(detail.requirements ?? []),
    JSON.stringify(detail.audience ?? []),
    JSON.stringify(detail.catalogSections ?? []),
    JSON.stringify(detail.reviews ?? []),
    JSON.stringify(detail.seoSections ?? []),
    JSON.stringify(detail.caseStudies ?? []),
  ]
}

function toInsightParams(article: InsightArticle) {
  return [
    article.slug,
    article.title,
    article.excerpt,
    article.description,
    article.category,
    JSON.stringify(article.tags),
    article.publishedAt,
    article.readTime,
    article.featured ?? false,
    JSON.stringify(article.relatedCourseSlugs),
    JSON.stringify(article.sections),
    JSON.stringify(article.keyTakeaways),
  ]
}

export async function ensureContentTables() {
  if (!isNeonConfigured() || schemaReady) {
    return
  }

  await executeNeonQuery(`
    CREATE TABLE IF NOT EXISTS academy_courses (
      slug TEXT PRIMARY KEY,
      source_file TEXT NOT NULL,
      title TEXT NOT NULL,
      short_title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      summary TEXT NOT NULL,
      seo_title TEXT,
      seo_description TEXT,
      category TEXT NOT NULL,
      level TEXT NOT NULL,
      badge TEXT NOT NULL,
      price TEXT NOT NULL,
      published BOOLEAN NOT NULL DEFAULT FALSE,
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      stats JSONB NOT NULL DEFAULT '[]'::jsonb,
      tags JSONB NOT NULL DEFAULT '[]'::jsonb,
      cover_image TEXT,
      cover_alt TEXT,
      original_price TEXT,
      rating TEXT,
      review_count TEXT,
      student_count TEXT,
      duration TEXT,
      lesson_count TEXT,
      instructor JSONB,
      highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
      requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
      audience JSONB NOT NULL DEFAULT '[]'::jsonb,
      catalog_sections JSONB NOT NULL DEFAULT '[]'::jsonb,
      reviews JSONB NOT NULL DEFAULT '[]'::jsonb,
      seo_sections JSONB NOT NULL DEFAULT '[]'::jsonb,
      case_studies JSONB NOT NULL DEFAULT '[]'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await executeNeonQuery(`
    CREATE TABLE IF NOT EXISTS academy_insights (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      tags JSONB NOT NULL DEFAULT '[]'::jsonb,
      published_at DATE NOT NULL,
      read_time TEXT NOT NULL,
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      related_course_slugs JSONB NOT NULL DEFAULT '[]'::jsonb,
      sections JSONB NOT NULL DEFAULT '[]'::jsonb,
      key_takeaways JSONB NOT NULL DEFAULT '[]'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await executeNeonQuery(`
    CREATE INDEX IF NOT EXISTS academy_courses_sort_idx
    ON academy_courses (published DESC, sort_order ASC)
  `)

  await executeNeonQuery(`
    CREATE INDEX IF NOT EXISTS academy_insights_publish_idx
    ON academy_insights (published_at DESC)
  `)

  schemaReady = true
}

export async function getDatabaseStatus(): Promise<DatabaseStatus> {
  if (!isNeonConfigured()) {
    return {
      mode: 'file',
      configured: false,
      reachable: false,
      bootstrapped: false,
      courseCount: 0,
      insightCount: 0,
    }
  }

  try {
    await ensureContentTables()
    const [courseCountRow] = await executeNeonQuery<{ count: string }>(
      'SELECT COUNT(*)::text AS count FROM academy_courses',
    )
    const [insightCountRow] = await executeNeonQuery<{ count: string }>(
      'SELECT COUNT(*)::text AS count FROM academy_insights',
    )

    const courseCount = Number(courseCountRow?.count ?? 0)
    const insightCount = Number(insightCountRow?.count ?? 0)

    return {
      mode: courseCount > 0 || insightCount > 0 ? 'neon' : 'file',
      configured: true,
      reachable: true,
      bootstrapped: courseCount > 0 || insightCount > 0,
      courseCount,
      insightCount,
    }
  } catch (error) {
    return {
      mode: 'file',
      configured: true,
      reachable: false,
      bootstrapped: false,
      courseCount: 0,
      insightCount: 0,
      error: error instanceof Error ? error.message : '连接 Neon 失败',
    }
  }
}

export async function listDatabaseCourses(options?: { includeDrafts?: boolean }) {
  if (!isNeonConfigured()) {
    return []
  }

  await ensureContentTables()

  const includeDrafts = options?.includeDrafts ?? false
  const rows = await executeNeonQuery<CourseRow>(
    `
      SELECT *
      FROM academy_courses
      WHERE ($1::boolean = TRUE OR published = TRUE)
      ORDER BY sort_order ASC, title ASC
    `,
    [includeDrafts],
  )

  return rows.map(mapCourseRow)
}

export async function getDatabaseCourseBySlug(
  slug: string,
  options?: { includeDrafts?: boolean },
) {
  if (!isNeonConfigured()) {
    return null
  }

  await ensureContentTables()

  const includeDrafts = options?.includeDrafts ?? false
  const [row] = await executeNeonQuery<CourseRow>(
    `
      SELECT *
      FROM academy_courses
      WHERE slug = $1
        AND ($2::boolean = TRUE OR published = TRUE)
      LIMIT 1
    `,
    [slug, includeDrafts],
  )

  return row ? mapCourseRow(row) : null
}

export async function updateDatabaseCourse(
  slug: string,
  patch: CourseUpdatePayload,
) {
  if (!isNeonConfigured()) {
    return null
  }

  await ensureContentTables()

  const [row] = await executeNeonQuery<CourseRow>(
    `
      UPDATE academy_courses
      SET
        title = COALESCE($2, title),
        short_title = COALESCE($3, short_title),
        subtitle = COALESCE($4, subtitle),
        summary = COALESCE($5, summary),
        category = COALESCE($6, category),
        level = COALESCE($7, level),
        badge = COALESCE($8, badge),
        price = COALESCE($9, price),
        published = COALESCE($10, published),
        featured = COALESCE($11, featured),
        sort_order = COALESCE($12, sort_order),
        updated_at = NOW()
      WHERE slug = $1
      RETURNING *
    `,
    [
      slug,
      patch.title ?? null,
      patch.shortTitle ?? null,
      patch.subtitle ?? null,
      patch.summary ?? null,
      patch.category ?? null,
      patch.level ?? null,
      patch.badge ?? null,
      patch.price ?? null,
      patch.published ?? null,
      patch.featured ?? null,
      patch.sortOrder ?? null,
    ],
  )

  return row ? mapCourseRow(row) : null
}

export async function upsertDatabaseCourses(courses: CourseCatalogEntry[]) {
  if (!isNeonConfigured()) {
    return 0
  }

  await ensureContentTables()

  for (const course of courses) {
    await executeNeonQuery(
      `
        INSERT INTO academy_courses (
          slug,
          source_file,
          title,
          short_title,
          subtitle,
          summary,
          seo_title,
          seo_description,
          category,
          level,
          badge,
          price,
          published,
          featured,
          sort_order,
          stats,
          tags,
          cover_image,
          cover_alt,
          original_price,
          rating,
          review_count,
          student_count,
          duration,
          lesson_count,
          instructor,
          highlights,
          requirements,
          audience,
          catalog_sections,
          reviews,
          seo_sections,
          case_studies,
          updated_at
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16::jsonb, $17::jsonb, $18, $19, $20,
          $21, $22, $23, $24, $25, $26::jsonb, $27::jsonb, $28::jsonb,
          $29::jsonb, $30::jsonb, $31::jsonb, $32::jsonb, $33::jsonb, NOW()
        )
        ON CONFLICT (slug) DO UPDATE SET
          source_file = EXCLUDED.source_file,
          title = EXCLUDED.title,
          short_title = EXCLUDED.short_title,
          subtitle = EXCLUDED.subtitle,
          summary = EXCLUDED.summary,
          seo_title = EXCLUDED.seo_title,
          seo_description = EXCLUDED.seo_description,
          category = EXCLUDED.category,
          level = EXCLUDED.level,
          badge = EXCLUDED.badge,
          price = EXCLUDED.price,
          published = EXCLUDED.published,
          featured = EXCLUDED.featured,
          sort_order = EXCLUDED.sort_order,
          stats = EXCLUDED.stats,
          tags = EXCLUDED.tags,
          cover_image = EXCLUDED.cover_image,
          cover_alt = EXCLUDED.cover_alt,
          original_price = EXCLUDED.original_price,
          rating = EXCLUDED.rating,
          review_count = EXCLUDED.review_count,
          student_count = EXCLUDED.student_count,
          duration = EXCLUDED.duration,
          lesson_count = EXCLUDED.lesson_count,
          instructor = EXCLUDED.instructor,
          highlights = EXCLUDED.highlights,
          requirements = EXCLUDED.requirements,
          audience = EXCLUDED.audience,
          catalog_sections = EXCLUDED.catalog_sections,
          reviews = EXCLUDED.reviews,
          seo_sections = EXCLUDED.seo_sections,
          case_studies = EXCLUDED.case_studies,
          updated_at = NOW()
      `,
      toCourseParams(course),
    )
  }

  return courses.length
}

export async function listDatabaseInsights() {
  if (!isNeonConfigured()) {
    return []
  }

  await ensureContentTables()
  const rows = await executeNeonQuery<InsightRow>(
    `
      SELECT *
      FROM academy_insights
      ORDER BY published_at DESC, title ASC
    `,
  )

  return rows.map(mapInsightRow)
}

export async function getDatabaseInsightBySlug(slug: string) {
  if (!isNeonConfigured()) {
    return null
  }

  await ensureContentTables()
  const [row] = await executeNeonQuery<InsightRow>(
    `
      SELECT *
      FROM academy_insights
      WHERE slug = $1
      LIMIT 1
    `,
    [slug],
  )

  return row ? mapInsightRow(row) : null
}

export async function createDatabaseInsight(article: InsightArticle) {
  if (!isNeonConfigured()) {
    return null
  }

  await ensureContentTables()
  const [row] = await executeNeonQuery<InsightRow>(
    `
      INSERT INTO academy_insights (
        slug,
        title,
        excerpt,
        description,
        category,
        tags,
        published_at,
        read_time,
        featured,
        related_course_slugs,
        sections,
        key_takeaways,
        updated_at
      )
      VALUES (
        $1, $2, $3, $4, $5, $6::jsonb, $7::date, $8, $9,
        $10::jsonb, $11::jsonb, $12::jsonb, NOW()
      )
      RETURNING *
    `,
    toInsightParams(article),
  )

  return row ? mapInsightRow(row) : null
}

export async function updateDatabaseInsight(
  slug: string,
  article: InsightArticle,
) {
  if (!isNeonConfigured()) {
    return null
  }

  await ensureContentTables()
  const [row] = await executeNeonQuery<InsightRow>(
    `
      UPDATE academy_insights
      SET
        title = $2,
        excerpt = $3,
        description = $4,
        category = $5,
        tags = $6::jsonb,
        published_at = $7::date,
        read_time = $8,
        featured = $9,
        related_course_slugs = $10::jsonb,
        sections = $11::jsonb,
        key_takeaways = $12::jsonb,
        updated_at = NOW()
      WHERE slug = $1
      RETURNING *
    `,
    [slug, ...toInsightParams(article).slice(1)],
  )

  return row ? mapInsightRow(row) : null
}

export async function deleteDatabaseInsight(slug: string) {
  if (!isNeonConfigured()) {
    return false
  }

  await ensureContentTables()
  const rows = await executeNeonQuery<{ slug: string }>(
    `
      DELETE FROM academy_insights
      WHERE slug = $1
      RETURNING slug
    `,
    [slug],
  )

  return rows.length > 0
}

export async function upsertDatabaseInsights(articles: InsightArticle[]) {
  if (!isNeonConfigured()) {
    return 0
  }

  await ensureContentTables()

  for (const article of articles) {
    await executeNeonQuery(
      `
        INSERT INTO academy_insights (
          slug,
          title,
          excerpt,
          description,
          category,
          tags,
          published_at,
          read_time,
          featured,
          related_course_slugs,
          sections,
          key_takeaways,
          updated_at
        )
        VALUES (
          $1, $2, $3, $4, $5, $6::jsonb, $7::date, $8, $9,
          $10::jsonb, $11::jsonb, $12::jsonb, NOW()
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          excerpt = EXCLUDED.excerpt,
          description = EXCLUDED.description,
          category = EXCLUDED.category,
          tags = EXCLUDED.tags,
          published_at = EXCLUDED.published_at,
          read_time = EXCLUDED.read_time,
          featured = EXCLUDED.featured,
          related_course_slugs = EXCLUDED.related_course_slugs,
          sections = EXCLUDED.sections,
          key_takeaways = EXCLUDED.key_takeaways,
          updated_at = NOW()
      `,
      toInsightParams(article),
    )
  }

  return articles.length
}
