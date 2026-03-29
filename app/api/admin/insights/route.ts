import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

import { hasAdminSession } from '@/lib/admin-auth'
import { adminInsightSchema } from '@/lib/admin-insight-schema'
import {
  createDatabaseInsight,
  getDatabaseInsightBySlug,
} from '@/lib/content-database'
import { getAllInsights } from '@/lib/insight-store'
import { isNeonConfigured } from '@/lib/neon'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  const insights = await getAllInsights()
  return NextResponse.json({ insights })
}

export async function POST(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  if (!isNeonConfigured()) {
    return NextResponse.json({ error: '请先配置 Neon 数据库' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const payload = adminInsightSchema.parse(body)
    const existing = await getDatabaseInsightBySlug(payload.slug)

    if (existing) {
      return NextResponse.json({ error: '该文章 slug 已存在' }, { status: 409 })
    }

    const insight = await createDatabaseInsight(payload)
    revalidateTag('academy-insights', 'max')
    revalidatePath('/academy')
    revalidatePath('/academy/insights')
    revalidatePath(`/academy/insights/${payload.slug}`)
    return NextResponse.json({ insight })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '文章数据格式不正确'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
