import { NextResponse } from 'next/server'

import { getAllCourses } from '@/lib/course-store'
import { hasAdminSession } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  const courses = await getAllCourses({ includeDrafts: true })

  return NextResponse.json({ courses })
}
