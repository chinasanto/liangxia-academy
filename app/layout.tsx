import type { Metadata } from 'next'
import { Noto_Sans_SC, Noto_Serif_SC, Space_Mono } from 'next/font/google'
import { WechatFloat } from '@/components/wechat-float'
import './globals.css'

const notoSans = Noto_Sans_SC({ 
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans"
})

const notoSerif = Noto_Serif_SC({ 
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-serif"
})

const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: 'AI量化学院 | AI量化课程平台',
  description: 'AI量化学院课程平台，支持课程展示、课程详情和本地文件型后台上架管理。',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSans.variable} ${notoSerif.variable} ${spaceMono.variable} font-sans antialiased grid-overlay`}>
        {children}
        <WechatFloat />
      </body>
    </html>
  )
}
