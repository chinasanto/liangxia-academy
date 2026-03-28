import Link from 'next/link'
import { ArrowLeft, LockKeyhole } from 'lucide-react'

import { AdminLoginForm } from '@/components/admin-login-form'
import { Button } from '@/components/ui/button'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const query = await searchParams
  const nextPath = query.next || '/admin'

  return (
    <main className="min-h-screen bg-background px-6 pb-20 pt-24 lg:px-12">
      <div className="mx-auto max-w-xl">
        <div className="mb-6">
          <Button asChild variant="ghost" className="pl-0 text-muted-foreground">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              返回首页
            </Link>
          </Button>
        </div>

        <section className="rounded-[32px] border border-white/[0.08] bg-card/55 p-8 sm:p-10">
          <div className="mb-6 flex items-center gap-3 text-primary">
            <div className="rounded-2xl bg-primary/15 p-3">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xl font-semibold text-foreground">后台登录</div>
              <div className="text-sm text-muted-foreground">
                后台与草稿预览现已受保护，需要登录后访问。
              </div>
            </div>
          </div>

          <AdminLoginForm nextPath={nextPath} />
        </section>
      </div>
    </main>
  )
}
