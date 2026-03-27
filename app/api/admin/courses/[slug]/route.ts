import { NextResponse } from 'next/server'
import { z } from 'zod'

import { getCourseBySlug, updateCourse } from '@/lib/course-store'

export const dynamic = 'force-dynamic'

const updateSchema = z
  .object({
    title: z.string().min(1).max(200).optional(),
    shortTitle: z.string().min(1).max(120).optional(),
    subtitle: z.string().min(1).max(240).optional(),
    summary: z.string().min(1).max(600).optional(),
    category: z.string().min(1).max(80).optional(),
    level: z.string().min(1).max(40).optional(),
    badge: z.string().min(1).max(80).optional(),
    price: z.string().min(1).max(80).optional(),
    published: z.boolean().optional(),
    featured: z.boolean().optional(),
    sortOrder: z.number().int().min(0).max(999).optional(),
  })
  .strict()

export async function PATCH(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params
  const existingCourse = await getCourseBySlug(slug, { includeDrafts: true })

  if (!existingCourse) {
    return NextResponse.json({ error: '课程不存在' }, { status: 404 })
  }

  try {
    const body = await request.json()
    const payload = updateSchema.parse(body)
    const updatedCourse = await updateCourse(slug, payload)

    return NextResponse.json({ course: updatedCourse })
  } catch {
    return NextResponse.json({ error: '请求数据格式不正确' }, { status: 400 })
  }
}
