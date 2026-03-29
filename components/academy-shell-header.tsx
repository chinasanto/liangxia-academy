import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import { SiteLogo } from '@/components/site-logo'
import { ThemeToggle } from '@/components/theme-toggle'

type AcademyShellHeaderProps = {
  backHref?: string
  backLabel?: string
}

export function AcademyShellHeader({
  backHref = '/',
  backLabel = '返回首页',
}: AcademyShellHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link
            href={backHref}
            className="flex min-w-0 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-5 w-5 shrink-0" />
            <span className="truncate text-sm">{backLabel}</span>
          </Link>
          <div className="hidden h-6 w-px bg-border sm:block" />
          <div className="hidden items-center gap-2 sm:flex">
            <SiteLogo className="h-7 w-7 shrink-0" />
            <span className="font-mono text-sm font-bold tracking-wider text-primary">
              AI量化学院
            </span>
            <span className="text-xs text-muted-foreground">/</span>
            <span className="text-xs text-muted-foreground">AI Quant Academy</span>
          </div>
        </div>

        <ThemeToggle compact className="shrink-0" />
      </div>
    </header>
  )
}
