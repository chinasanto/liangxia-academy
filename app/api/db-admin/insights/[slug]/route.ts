import { NextResponse } from 'next/server'

import { hasAdminSession } from '@/lib/admin-auth'
import { dbAdminInsightSchema } from '@/lib/db-admin-insight-schema'
import { deleteDbInsight, getDbInsightBySlug, updateDbInsight } from '@/lib/db-admin-insights'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  const { slug } = await context.params
  const existing = await getDbInsightBySlug(slug)

  if (!existing) {
    return NextResponse.json({ error: '文章不存在' }, { status: 404 })
  }

  try {
    const body = await request.json()
    const payload = dbAdminInsightSchema.parse({ ...body, slug })
    const insight = await updateDbInsight(slug, payload)
    return NextResponse.json({ insight })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '更新失败' },
      { status: 400 },
    )
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  const { slug } = await context.params
  const ok = await deleteDbInsight(slug)

  if (!ok) {
    return NextResponse.json({ error: '文章不存在' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
