import React from 'react'

import { absoluteUrl, SITE_NAME } from '@/lib/seo'

type OgCardProps = {
  eyebrow?: string
  title: string
  description: string
  imageUrl?: string
  badge?: string
  footer?: string
}

export const ogImageSize = {
  width: 1200,
  height: 630,
}

export const ogImageContentType = 'image/png'

export function renderOgCard({
  eyebrow = SITE_NAME,
  title,
  description,
  imageUrl,
  badge = 'AI量化课程平台',
  footer = 'www.aiquantclaw.com',
}: OgCardProps) {
  const previewImage =
    imageUrl && !imageUrl.toLowerCase().endsWith('.svg')
      ? imageUrl
      : absoluteUrl('/brand/aiquant-logo.jpg')

  return (
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        background:
          'linear-gradient(135deg, #eef6ff 0%, #f7fbff 40%, #ffffff 100%)',
        color: '#102a43',
        fontFamily:
          '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
        padding: '42px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          borderRadius: '36px',
          background: '#ffffff',
          border: '1px solid #dbe8f4',
          boxShadow: '0 18px 48px rgba(15, 23, 42, 0.08)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '770px',
            padding: '48px 48px 40px',
            background:
              'linear-gradient(180deg, rgba(240,247,255,0.92), rgba(255,255,255,1))',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                padding: '10px 18px',
                borderRadius: '999px',
                background: '#dcecff',
                color: '#1450c8',
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '24px',
              }}
            >
              {eyebrow}
            </div>

            <div
              style={{
                fontSize: '56px',
                lineHeight: 1.18,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: '20px',
                display: 'flex',
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: '28px',
                lineHeight: 1.6,
                color: '#58708a',
                display: 'flex',
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '28px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 18px',
                borderRadius: '999px',
                background: '#0f6fff',
                color: '#ffffff',
                fontSize: '20px',
                fontWeight: 700,
              }}
            >
              {badge}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#7b8ea3',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {footer}
            </div>
          </div>
        </div>

        <div
          style={{
            width: '430px',
            position: 'relative',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            background:
              'linear-gradient(180deg, rgba(15,111,255,0.08), rgba(24,176,168,0.05))',
            padding: '38px',
          }}
        >
          <img
            src={previewImage}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '28px',
              objectFit: 'cover',
              border: '1px solid rgba(15,111,255,0.08)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
