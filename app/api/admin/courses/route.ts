import { NextResponse } from 'next/server'

import { getAllCourses } from '@/lib/course-store'

export const dynamic = 'force-dynamic'

export async function GET() {
  const courses = await getAllCourses({ includeDrafts: true })

  return NextResponse.json({ courses })
}

