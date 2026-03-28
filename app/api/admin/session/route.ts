import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

import {
  ADMIN_SESSION_COOKIE,
  getAdminPassword,
  isAdminSessionValue,
} from '@/lib/admin-auth'

const loginSchema = z.object({
  password: z.string().min(1, '请输入后台密码'),
})

export async function POST(request: Request) {
  const adminPassword = getAdminPassword()
  const adminSecret = process.env.ADMIN_SESSION_SECRET?.trim() ?? ''

  if (!adminPassword || !adminSecret) {
    return NextResponse.json(
      { error: '后台鉴权尚未配置，请先设置环境变量。' },
      { status: 503 },
    )
  }

  try {
    const body = await request.json()
    const payload = loginSchema.parse(body)

    if (payload.password !== adminPassword) {
      return NextResponse.json({ error: '密码不正确' }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set(ADMIN_SESSION_COOKIE, adminSecret, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 12,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: '登录请求格式不正确' }, { status: 400 })
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  const existing = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

  if (isAdminSessionValue(existing)) {
    cookieStore.delete(ADMIN_SESSION_COOKIE)
  }

  return NextResponse.json({ ok: true })
}
