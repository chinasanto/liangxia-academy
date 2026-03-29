import { NextResponse } from 'next/server'

import { getAllInsightSummaries } from '@/lib/insight-store'

export async function GET() {
  const insights = await getAllInsightSummaries()
  return NextResponse.json({ insights })
}
