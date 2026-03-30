import { ImageResponse } from 'next/og'

import { ogImageContentType, ogImageSize, renderOgCard } from '@/lib/og-card'

export const alt = 'AI量化学院分享预览图'
export const size = ogImageSize
export const contentType = ogImageContentType

export default function OpenGraphImage() {
  return new ImageResponse(
    renderOgCard({
      eyebrow: 'AI量化学院',
      title: 'AI量化课程平台',
      description:
        '覆盖 AI量化基础课、因子工程、WorldQuant Brain、量化全流程与量化技巧文章。',
      imageUrl: 'https://www.aiquantclaw.com/brand/aiquant-logo.jpg',
      badge: 'AI量化学院',
    }),
    size,
  )
}
