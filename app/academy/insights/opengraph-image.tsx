import { ImageResponse } from 'next/og'

import { ogImageContentType, ogImageSize, renderOgCard } from '@/lib/og-card'

export const alt = 'AI量化学院量化技巧分享预览图'
export const size = ogImageSize
export const contentType = ogImageContentType

export default function OpenGraphImage() {
  return new ImageResponse(
    renderOgCard({
      eyebrow: '量化技巧',
      title: 'AI量化学院文章与方法库',
      description:
        '覆盖因子工程、回测评估、AI 编程提效、学习路径与公开课精华，分享时不再只显示一条网址。',
      imageUrl: 'https://www.aiquantclaw.com/course-covers/ai-quant-basic.jpg',
      badge: '文章技巧',
    }),
    size,
  )
}
