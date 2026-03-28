import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const ADMIN_SESSION_COOKIE = 'academy_admin_session'

function hasAdminSession(request: NextRequest) {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim()
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value

  if (!secret || !session) {
    return false
  }

  return session === secret
}

export function proxy(request: NextRequest) {
  const { nextUrl } = request
  const { pathname, searchParams } = nextUrl
  const isAdminLogin = pathname === '/admin/login'
  const isAdminPage = pathname.startsWith('/admin')
  const isAdminApi = pathname.startsWith('/api/admin')
  const isAdminSessionApi = pathname === '/api/admin/session'
  const wantsDraftPreview =
    pathname.startsWith('/academy/') && searchParams.get('preview') === '1'
  const authorized = hasAdminSession(request)

  if (isAdminLogin && authorized) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if ((isAdminPage && !isAdminLogin) || (isAdminApi && !isAdminSessionApi)) {
    if (!authorized) {
      if (isAdminApi) {
        return NextResponse.json({ error: '未授权' }, { status: 401 })
      }

      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('next', `${pathname}${nextUrl.search}`)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (wantsDraftPreview && !authorized) {
    const safeUrl = nextUrl.clone()
    safeUrl.searchParams.delete('preview')
    return NextResponse.redirect(safeUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/academy/:path*'],
}
