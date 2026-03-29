import { NextResponse } from 'next/server'

import { hasAdminSession } from '@/lib/admin-auth'
import { dbAdminInsightSchema } from '@/lib/db-admin-insight-schema'
import { createDbInsight, getDbInsightBySlug, listDbInsights } from '@/lib/db-admin-insights'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  const insights = await listDbInsights()
  return NextResponse.json({ insights })
}

export async function POST(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const payload = dbAdminInsightSchema.parse(body)
    const existing = await getDbInsightBySlug(payload.slug)

    if (existing) {
      return NextResponse.json({ error: '该文章 slug 已存在' }, { status: 409 })
    }

    const insight = await createDbInsight(payload)
    return NextResponse.json({ insight })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '保存失败' },
      { status: 400 },
    )
  }
}
