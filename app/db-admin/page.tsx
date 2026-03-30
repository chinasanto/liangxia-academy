import { redirect } from 'next/navigation'

import { hasAdminSession } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export default async function DbAdminPage() {
  if (!(await hasAdminSession())) {
    redirect('/admin/login?next=/db-admin')
  }

  redirect('/admin')
}
