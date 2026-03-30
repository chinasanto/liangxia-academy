import { ImageResponse } from 'next/og'

import { ogImageContentType, ogImageSize, renderOgCard } from '@/lib/og-card'

export const alt = 'AI量化学院课程目录分享预览图'
export const size = ogImageSize
export const contentType = ogImageContentType

export default function OpenGraphImage() {
  return new ImageResponse(
    renderOgCard({
      eyebrow: 'AI量化学院',
      title: '课程目录与学习路径',
      description:
        '正式课程、免费公开课、量化技巧文章与学习路径都集中在这里，分享出去会直接看到课程型卡片。',
      imageUrl: 'https://www.aiquantclaw.com/course-covers/ai-quant-basic.jpg',
      badge: '课程列表',
    }),
    size,
  )
}
