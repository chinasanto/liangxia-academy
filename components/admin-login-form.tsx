'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

type AdminLoginFormProps = {
  nextPath: string
}

export function AdminLoginForm({
  nextPath,
}: AdminLoginFormProps) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(data.error ?? '登录失败')
      }

      startTransition(() => {
        router.replace(nextPath)
        router.refresh()
      })
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : '登录失败，请稍后再试',
      )
    }
  }

  return (
    <form className="space-y-5" onSubmit={(event) => void handleSubmit(event)}>
      <label className="block space-y-2 text-sm">
        <span className="text-muted-foreground">后台密码</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-12 w-full rounded-2xl border border-white/[0.08] bg-background/80 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
          placeholder="请输入后台密码"
          autoComplete="current-password"
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <Button type="submit" className="w-full rounded-full" disabled={isPending}>
        {isPending ? '登录中...' : '进入后台'}
      </Button>
    </form>
  )
}
