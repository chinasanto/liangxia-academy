import Image from 'next/image'

import { cn } from '@/lib/utils'

type SiteLogoProps = {
  className?: string
  imageClassName?: string
}

export function SiteLogo({ className, imageClassName }: SiteLogoProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-full', className)}>
      <Image
        src="/brand/aiquant-logo.jpg"
        alt="AI量化学院 Logo"
        fill
        sizes="40px"
        className={cn('object-cover', imageClassName)}
      />
    </div>
  )
}
