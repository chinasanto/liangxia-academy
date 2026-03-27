export type CourseCatalogEntry = {
  slug: string
  sourceFile: string
  title: string
  shortTitle: string
  subtitle: string
  summary: string
  category: string
  level: string
  badge: string
  price: string
  published: boolean
  featured: boolean
  sortOrder: number
  stats: string[]
  tags: string[]
}

export type CourseUpdatePayload = Partial<
  Pick<
    CourseCatalogEntry,
    | 'title'
    | 'shortTitle'
    | 'subtitle'
    | 'summary'
    | 'category'
    | 'level'
    | 'badge'
    | 'price'
    | 'published'
    | 'featured'
    | 'sortOrder'
  >
>

