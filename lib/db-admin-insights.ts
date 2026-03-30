import { insightArticles } from '@/data/insights'
import type { InsightArticle, InsightSection } from '@/lib/insight-types'
import { dbAdminQuery, isDbAdminDatabaseConfigured } from '@/lib/db-admin-neon'

type InsightRow = {
  slug: unknown
  title: unknown
  excerpt: unknown
  description: unknown
  category: unknown
  tags: unknown
  published_at: unknown
  read_time: unknown
  featured: unknown
  published: unknown
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

function normalizeTextValue(value: unknown, fallback = '') {
  if (typeof value === 'string') {
    return value
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }

  if (value == null) {
    return fallback
  }

  return String(value)
}

function mapInsightRow(row: InsightRow): InsightArticle {
  return {
    slug: normalizeTextValue(row.slug),
    title: normalizeTextValue(row.title),
    excerpt: normalizeTextValue(row.excerpt),
    description: normalizeTextValue(row.description),
    category: normalizeTextValue(row.category),
    tags: parseJsonValue(row.tags, [] as string[]),
    publishedAt: normalizeTextValue(row.published_at),
    readTime: normalizeTextValue(row.read_time),
    featured: Boolean(row.featured),
    published: row.published == null ? true : Boolean(row.published),
    relatedCourseSlugs: parseJsonValue(row.related_course_slugs, [] as string[]),
    sections: parseJsonValue(row.sections, [] as InsightSection[]),
    keyTakeaways: parseJsonValue(row.key_takeaways, [] as string[]),
  }
}

function toParams(article: InsightArticle) {
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
    article.published ?? true,
    JSON.stringify(article.relatedCourseSlugs),
    JSON.stringify(article.sections),
    JSON.stringify(article.keyTakeaways),
  ]
}

export async function ensureDbAdminInsightTable() {
  if (!isDbAdminDatabaseConfigured() || schemaReady) {
    return
  }

  await dbAdminQuery(`
    CREATE TABLE IF NOT EXISTS academy_insights (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      tags JSONB NOT NULL DEFAULT '[]'::jsonb,
      published_at TEXT NOT NULL,
      read_time TEXT NOT NULL,
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      published BOOLEAN NOT NULL DEFAULT TRUE,
      related_course_slugs JSONB NOT NULL DEFAULT '[]'::jsonb,
      sections JSONB NOT NULL DEFAULT '[]'::jsonb,
      key_takeaways JSONB NOT NULL DEFAULT '[]'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await dbAdminQuery(`
    ALTER TABLE academy_insights
    ADD COLUMN IF NOT EXISTS published BOOLEAN NOT NULL DEFAULT TRUE
  `)

  schemaReady = true
}

export async function getDbAdminInsightStatus() {
  if (!isDbAdminDatabaseConfigured()) {
    return {
      configured: false,
      count: 0,
    }
  }

  await ensureDbAdminInsightTable()
  const [row] = await dbAdminQuery<{ count: string }>(
    'SELECT COUNT(*)::text AS count FROM academy_insights',
  )

  return {
    configured: true,
    count: Number(row?.count ?? 0),
  }
}

export async function listDbInsights(options?: { publishedOnly?: boolean }) {
  if (!isDbAdminDatabaseConfigured()) {
    return []
  }

  await ensureDbAdminInsightTable()
  const publishedOnly = options?.publishedOnly ?? false
  const rows = await dbAdminQuery<InsightRow>(
    `
      SELECT *
      FROM academy_insights
      ${publishedOnly ? 'WHERE published = TRUE' : ''}
      ORDER BY published_at DESC, title ASC
    `,
  )

  return rows.map(mapInsightRow)
}

export async function getDbInsightBySlug(
  slug: string,
  options?: { publishedOnly?: boolean },
) {
  if (!isDbAdminDatabaseConfigured()) {
    return null
  }

  await ensureDbAdminInsightTable()
  const publishedOnly = options?.publishedOnly ?? false
  const [row] = await dbAdminQuery<InsightRow>(
    `
      SELECT *
      FROM academy_insights
      WHERE slug = $1
      ${publishedOnly ? 'AND published = TRUE' : ''}
      LIMIT 1
    `,
    [slug],
  )

  return row ? mapInsightRow(row) : null
}

export async function createDbInsight(article: InsightArticle) {
  if (!isDbAdminDatabaseConfigured()) {
    return null
  }

  await ensureDbAdminInsightTable()
  const [row] = await dbAdminQuery<InsightRow>(
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
        published,
        related_course_slugs,
        sections,
        key_takeaways,
        updated_at
      )
      VALUES (
        $1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9,
        $10, $11::jsonb, $12::jsonb, $13::jsonb, NOW()
      )
      RETURNING *
    `,
    toParams(article),
  )

  return row ? mapInsightRow(row) : null
}

export async function updateDbInsight(slug: string, article: InsightArticle) {
  if (!isDbAdminDatabaseConfigured()) {
    return null
  }

  await ensureDbAdminInsightTable()
  const [row] = await dbAdminQuery<InsightRow>(
    `
      UPDATE academy_insights
      SET
        title = $2,
        excerpt = $3,
        description = $4,
        category = $5,
        tags = $6::jsonb,
        published_at = $7,
        read_time = $8,
        featured = $9,
        published = $10,
        related_course_slugs = $11::jsonb,
        sections = $12::jsonb,
        key_takeaways = $13::jsonb,
        updated_at = NOW()
      WHERE slug = $1
      RETURNING *
    `,
    [slug, ...toParams(article).slice(1)],
  )

  return row ? mapInsightRow(row) : null
}

export async function deleteDbInsight(slug: string) {
  if (!isDbAdminDatabaseConfigured()) {
    return false
  }

  await ensureDbAdminInsightTable()
  const rows = await dbAdminQuery<{ slug: string }>(
    `
      DELETE FROM academy_insights
      WHERE slug = $1
      RETURNING slug
    `,
    [slug],
  )

  return rows.length > 0
}

export async function bootstrapDbInsights() {
  if (!isDbAdminDatabaseConfigured()) {
    return 0
  }

  await ensureDbAdminInsightTable()

  for (const article of insightArticles) {
    await dbAdminQuery(
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
          published,
          related_course_slugs,
          sections,
          key_takeaways,
          updated_at
        )
        VALUES (
          $1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9,
          $10, $11::jsonb, $12::jsonb, $13::jsonb, NOW()
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
          published = EXCLUDED.published,
          related_course_slugs = EXCLUDED.related_course_slugs,
          sections = EXCLUDED.sections,
          key_takeaways = EXCLUDED.key_takeaways,
          updated_at = NOW()
      `,
      toParams(article),
    )
  }

  return insightArticles.length
}
