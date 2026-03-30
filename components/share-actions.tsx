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
  description?: string
  label?: string
}

export function ShareActions({
  title,
  url,
  description,
  label = '分享内容',
}: ShareActionsProps) {
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [shareAvailable, setShareAvailable] = useState(false)

  useEffect(() => {
    setShareAvailable(typeof navigator !== 'undefined' && typeof navigator.share === 'function')

    let active = true
    void QRCode.toDataURL(url, {
      width: 240,
      margin: 1,
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
  }, [url])

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
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            <div className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-white p-3">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt={`${title} 分享二维码`}
                  className="h-40 w-40"
                />
              ) : (
                <div className="flex h-40 w-40 items-center justify-center text-xs text-slate-500">
                  生成二维码中...
                </div>
              )}
            </div>
            <div className="space-y-2 text-sm leading-6 text-muted-foreground">
              <p>微信聊天分享：用微信扫一扫二维码后转发。</p>
              <p>朋友圈分享：手机端可先点“系统分享”，若微信可用可直接转发；也可扫码后在微信内转到朋友圈。</p>
              <p>桌面端：直接让对方扫码即可打开当前页面。</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
