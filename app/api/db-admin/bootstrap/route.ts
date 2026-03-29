import { NextResponse } from 'next/server'

import { hasAdminSession } from '@/lib/admin-auth'
import { bootstrapDbInsights, getDbAdminInsightStatus } from '@/lib/db-admin-insights'

export const dynamic = 'force-dynamic'

export async function POST() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const count = await bootstrapDbInsights()
    const status = await getDbAdminInsightStatus()
    return NextResponse.json({ ok: true, count, status })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '初始化失败' },
      { status: 500 },
    )
  }
}
