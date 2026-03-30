export type InsightSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export type InsightArticle = {
  slug: string
  title: string
  excerpt: string
  description: string
  category: string
  tags: string[]
  publishedAt: string
  readTime: string
  featured?: boolean
  published?: boolean
  relatedCourseSlugs: string[]
  sections: InsightSection[]
  keyTakeaways: string[]
}
