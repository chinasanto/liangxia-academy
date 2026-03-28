import type { Metadata } from 'next'
import { Noto_Sans_SC, Noto_Serif_SC, Space_Mono } from 'next/font/google'
import { WechatFloat } from '@/components/wechat-float'
import { HOME_KEYWORDS, SITE_NAME, SITE_URL } from '@/lib/seo'
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | AI量化课程平台`,
    template: `%s`,
  },
  description: 'AI量化学院课程平台，支持 AI量化课程展示、课程详情、因子工程学习与量化研发进阶。',
  keywords: HOME_KEYWORDS,
  applicationName: SITE_NAME,
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '5AiCyt-eFKTKB00GrxqopJ1vym2fo_dSA0bosQ5QxZI',
  },
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
