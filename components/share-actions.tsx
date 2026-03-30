'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Check, Copy, QrCode, Share2, Smartphone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type ShareActionsProps = {
  title: string
  url: string
  qrUrl?: string
  description?: string
  label?: string
}

export function ShareActions({
  title,
  url,
  qrUrl,
  description,
  label = '分享内容',
}: ShareActionsProps) {
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [shareAvailable, setShareAvailable] = useState(false)

  useEffect(() => {
    setShareAvailable(typeof navigator !== 'undefined' && typeof navigator.share === 'function')

    let active = true
    void QRCode.toDataURL(qrUrl ?? url, {
      errorCorrectionLevel: 'L',
      width: 360,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    }).then((dataUrl) => {
      if (active) {
        setQrCodeUrl(dataUrl)
      }
    })

    return () => {
      active = false
    }
  }, [qrUrl, url])

  async function handleCopy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  async function handleNativeShare() {
    if (!shareAvailable) {
      return
    }

    await navigator.share({
      title,
      text: description,
      url,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full px-4 text-xs font-semibold sm:text-sm">
          <Share2 className="h-4 w-4" />
          分享
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-[28px] border-white/[0.08] bg-background/98 p-6 sm:p-7">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>
            可直接复制链接，也可以通过微信 / 朋友圈二维码分享。
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-[24px] border border-white/[0.08] bg-card/60 p-4">
          <div className="text-sm font-semibold text-foreground">{title}</div>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          ) : null}
          <div className="mt-3 break-all rounded-2xl bg-background/80 px-3 py-3 text-xs leading-6 text-muted-foreground">
            {url}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {shareAvailable ? (
            <Button onClick={() => void handleNativeShare()} className="rounded-full text-sm">
              <Smartphone className="h-4 w-4" />
              系统分享
            </Button>
          ) : (
            <div className="rounded-full border border-white/[0.08] bg-card/50 px-4 py-2 text-center text-xs text-muted-foreground sm:py-3">
              当前设备不支持系统分享
            </div>
          )}

          <Button variant="outline" onClick={() => void handleCopy()} className="rounded-full text-sm">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? '已复制链接' : '复制链接'}
          </Button>
        </div>

        <div className="rounded-[24px] border border-primary/15 bg-primary/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <QrCode className="h-4 w-4 text-primary" />
            微信 / 朋友圈分享
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt={`${title} 分享二维码`}
                  className="h-44 w-44 rounded-lg sm:h-48 sm:w-48"
                  style={{ imageRendering: 'pixelated' }}
                />
              ) : (
                <div className="flex h-44 w-44 items-center justify-center text-xs text-slate-500 sm:h-48 sm:w-48">
                  生成二维码中...
                </div>
              )}
            </div>
            <div className="space-y-3 text-sm leading-6 text-muted-foreground">
              <div className="rounded-2xl bg-white/65 px-3 py-2.5 text-xs text-slate-500">
                二维码已按扫码场景优化，识别会比长链接更稳定。
              </div>
              <p>微信聊天分享：用微信扫一扫后，可直接把当前页面转发给好友。</p>
              <p>朋友圈分享：手机端优先点“系统分享”；如果微信没有直接弹出，也可以先扫码再转到朋友圈。</p>
              <p>桌面端：对方直接扫码即可打开当前内容页。</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
