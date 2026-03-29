import Link from 'next/link'
import { BookText, House, Map } from 'lucide-react'

import { cn } from '@/lib/utils'

type AcademySubnavProps = {
  active: 'home' | 'roadmap' | 'insights'
  className?: string
}

const items = [
  { key: 'home', label: '主页', href: '/academy', icon: House },
  { key: 'roadmap', label: '学习路径', href: '/academy?tab=roadmap', icon: Map },
  { key: 'insights', label: '文章技巧', href: '/academy?tab=insights', icon: BookText },
] as const

export function AcademySubnav({
  active,
  className,
}: AcademySubnavProps) {
  return (
    <div className={cn('flex justify-start', className)}>
      <div className="grid w-full grid-cols-3 gap-0.5 overflow-hidden rounded-[22px] border border-white/[0.08] bg-card/60 p-1 sm:inline-flex sm:w-auto sm:max-w-fit sm:gap-1 sm:rounded-full">
        {items.map((item) => {
          const isActive = item.key === active

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'inline-flex min-w-0 items-center justify-center gap-1 overflow-hidden rounded-[18px] px-1.5 py-2 text-[10px] font-semibold leading-tight transition sm:gap-1.5 sm:rounded-full sm:px-4 sm:text-sm',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/85 hover:bg-white/[0.04] hover:text-foreground',
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
