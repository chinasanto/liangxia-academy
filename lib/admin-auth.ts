import { cookies } from 'next/headers'

export const ADMIN_SESSION_COOKIE = 'academy_admin_session'

function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() ?? ''
}

export function isAdminSessionValue(value?: string | null) {
  const secret = getAdminSessionSecret()

  if (!secret || !value) {
    return false
  }

  return value === secret
}

export async function hasAdminSession() {
  const cookieStore = await cookies()
  return isAdminSessionValue(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() ?? ''
}
