import { NextResponse } from 'next/server'

import { hasAdminSession } from '@/lib/admin-auth'
import { adminInsightSchema } from '@/lib/admin-insight-schema'
import {
  deleteDatabaseInsight,
  getDatabaseInsightBySlug,
  updateDatabaseInsight,
} from '@/lib/content-database'
import { isNeonConfigured } from '@/lib/neon'

export const dynamic = 'force-dynamic'

export async function PATCH(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  if (!isNeonConfigured()) {
    return NextResponse.json({ error: '请先配置 Neon 数据库' }, { status: 503 })
  }

  const { slug } = await context.params
  const existing = await getDatabaseInsightBySlug(slug)

  if (!existing) {
    return NextResponse.json({ error: '文章不存在' }, { status: 404 })
  }

  try {
    const body = await request.json()
    const payload = adminInsightSchema.parse({
      ...body,
      slug,
    })
    const insight = await updateDatabaseInsight(slug, payload)
    return NextResponse.json({ insight })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '文章数据格式不正确'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  if (!isNeonConfigured()) {
    return NextResponse.json({ error: '请先配置 Neon 数据库' }, { status: 503 })
  }

  const { slug } = await context.params
  const ok = await deleteDatabaseInsight(slug)

  if (!ok) {
    return NextResponse.json({ error: '文章不存在' }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
