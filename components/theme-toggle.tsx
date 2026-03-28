'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'

type ThemeToggleProps = {
  className?: string
  compact?: boolean
}

export function ThemeToggle({
  className,
  compact = false,
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isLight = mounted && resolvedTheme === 'light'

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-card/80 px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary',
        compact ? 'px-2.5 py-2 text-xs' : '',
        className,
      )}
      aria-label={isLight ? '切换到深色模式' : '切换到浅色模式'}
    >
      {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className={compact ? 'hidden sm:inline' : ''}>
        {mounted ? (isLight ? '深色' : '浅色') : '主题'}
      </span>
    </button>
  )
}
