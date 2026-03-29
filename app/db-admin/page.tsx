import { redirect } from 'next/navigation'

import { DbAdminArticlesPage } from '@/components/db-admin-articles-page'
import { hasAdminSession } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export default async function DbAdminPage() {
  if (!(await hasAdminSession())) {
    redirect('/admin/login?next=/db-admin')
  }

  return <DbAdminArticlesPage />
}
