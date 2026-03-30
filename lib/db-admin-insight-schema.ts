import { z } from 'zod'

export const dbAdminInsightSectionSchema = z
  .object({
    title: z.string().min(1).max(200),
    paragraphs: z.array(z.string().min(1)).min(1),
    bullets: z.array(z.string().min(1)).optional(),
  })
  .strict()

export const dbAdminInsightSchema = z
  .object({
    slug: z
      .string()
      .min(3)
      .max(120)
      .regex(/^[a-z0-9-]+$/, 'slug 只能使用小写字母、数字和短横线'),
    title: z.string().min(1).max(220),
    excerpt: z.string().min(1).max(400),
    description: z.string().min(1).max(600),
    category: z.string().min(1).max(80),
    tags: z.array(z.string().min(1).max(40)).min(1),
    publishedAt: z.string().min(1).max(40),
    readTime: z.string().min(1).max(20),
    featured: z.boolean().optional(),
    published: z.boolean().optional(),
    relatedCourseSlugs: z.array(z.string().min(1)).default([]),
    sections: z.array(dbAdminInsightSectionSchema).min(1),
    keyTakeaways: z.array(z.string().min(1)).min(1),
  })
  .strict()

export type DbAdminInsightPayload = z.infer<typeof dbAdminInsightSchema>
