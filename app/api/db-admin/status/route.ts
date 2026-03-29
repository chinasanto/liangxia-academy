import { NextResponse } from 'next/server'

import { hasAdminSession } from '@/lib/admin-auth'
import { getDbAdminInsightStatus } from '@/lib/db-admin-insights'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  const status = await getDbAdminInsightStatus()
  return NextResponse.json({ status })
}
