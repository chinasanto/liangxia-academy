import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

import { insightArticles } from '@/data/insights'
import {
  getDatabaseStatus,
  upsertDatabaseCourses,
  upsertDatabaseInsights,
} from '@/lib/content-database'
import { hasAdminSession } from '@/lib/admin-auth'
import { getLocalCourses } from '@/lib/local-course-source'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  const status = await getDatabaseStatus()
  return NextResponse.json({ status })
}

export async function POST() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const courses = await getLocalCourses({ includeDrafts: true })

    const [courseCount, insightCount] = await Promise.all([
      upsertDatabaseCourses(courses),
      upsertDatabaseInsights(insightArticles),
    ])

    revalidateTag('academy-courses', 'max')
    revalidateTag('academy-insights', 'max')
    revalidatePath('/academy')
    revalidatePath('/academy/insights')
    revalidatePath('/api/academy/insights')

    const status = await getDatabaseStatus()

    return NextResponse.json({
      ok: true,
      status,
      synced: {
        courses: courseCount,
        insights: insightCount,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '同步到 Neon 失败',
      },
      { status: 500 },
    )
  }
}
