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
    <div className={cn('flex justify-end', className)}>
      <div className="inline-flex h-auto w-full max-w-fit items-center rounded-full border border-white/[0.08] bg-card/60 p-1">
        {items.map((item) => {
          const isActive = item.key === active

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
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
