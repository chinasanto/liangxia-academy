import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params

  return NextResponse.redirect(new URL(`/academy/${slug}`, request.url), 307)
}
