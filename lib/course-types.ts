export type CourseCatalogEntry = {
  slug: string
  sourceFile: string
  title: string
  shortTitle: string
  subtitle: string
  summary: string
  seoTitle?: string
  seoDescription?: string
  category: string
  level: string
  badge: string
  price: string
  published: boolean
  featured: boolean
  sortOrder: number
  stats: string[]
  tags: string[]
  coverImage?: string
  coverAlt?: string
  originalPrice?: string
  rating?: string
  reviewCount?: string
  studentCount?: string
  duration?: string
  lessonCount?: string
  instructor?: CourseInstructor
  highlights?: string[]
  requirements?: string[]
  audience?: string[]
  catalogSections?: CourseCatalogSection[]
  reviews?: CourseReview[]
  seoSections?: CourseSeoSection[]
  caseStudies?: CourseCaseStudy[]
  isFreeCourse?: boolean
  accessMode?: string
  accessUrl?: string
  accessLabel?: string
  accessNote?: string
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

export type CourseLesson = {
  title: string
  duration: string
  preview?: boolean
}

export type CourseCatalogSection = {
  id: string
  title: string
  lessonCount: string
  totalHours: string
  lessons: CourseLesson[]
}

export type CourseInstructor = {
  name: string
  title: string
  description: string
  students: string
  courseCount: string
  rating: string
}

export type CourseReview = {
  name: string
  role: string
  comment: string
}

export type CourseFaq = {
  question: string
  answer: string
}

export type CourseSeoSection = {
  title: string
  paragraphs: string[]
}

export type CoursePositioning = {
  suitableFor: string[]
  notSuitableFor: string[]
  outcomes: string[]
}

export type CourseRecommendation = {
  label: string
  reason: string
  course: CourseCatalogEntry
}

export type CourseCaseStudy = {
  title: string
  scenario: string
  approach: string
  outcome: string
}

export type CourseDetailConfig = {
  coverImage: string
  coverAlt: string
  originalPrice: string
  rating: string
  reviewCount: string
  studentCount: string
  duration: string
  lessonCount: string
  instructor: CourseInstructor
  highlights: string[]
  requirements: string[]
  audience: string[]
  catalogSections: CourseCatalogSection[]
  reviews: CourseReview[]
  seoTitle?: string
  seoDescription?: string
  seoSections?: CourseSeoSection[]
  caseStudies?: CourseCaseStudy[]
  isFreeCourse?: boolean
  accessMode?: string
  accessUrl?: string
  accessLabel?: string
  accessNote?: string
}
