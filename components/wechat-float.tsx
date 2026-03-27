'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MessageCircle, X } from 'lucide-react'

export function WechatFloat() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[70] hidden w-[280px] overflow-hidden rounded-[24px] border border-white/[0.12] bg-background/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:block">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
          <div>
            <div className="text-sm font-semibold text-foreground">微信咨询</div>
            <div className="text-xs text-muted-foreground">添加微信：446860105</div>
          </div>
          <div className="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-primary">
            微信扫码
          </div>
        </div>

        <div className="space-y-3 p-4">
          <div className="overflow-hidden rounded-2xl bg-white p-2">
            <Image
              src="/contact/wechat.jpg"
              alt="微信二维码"
              width={240}
              height={240}
              className="h-auto w-full rounded-xl"
            />
          </div>
          <p className="text-center text-xs leading-5 text-muted-foreground">
            扫码添加微信，咨询课程与报名安排。
          </p>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-[70] md:hidden">
        {open ? (
          <div className="w-[220px] overflow-hidden rounded-[22px] border border-white/[0.12] bg-background/95 shadow-[0_22px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
              <div>
                <div className="text-sm font-semibold text-foreground">微信咨询</div>
                <div className="text-xs text-muted-foreground">446860105</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/[0.08] p-2 text-muted-foreground"
                aria-label="关闭微信二维码"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 p-4">
              <div className="overflow-hidden rounded-2xl bg-white p-2">
                <Image
                  src="/contact/wechat.jpg"
                  alt="微信二维码"
                  width={200}
                  height={200}
                  className="h-auto w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-background/95 px-4 py-3 text-sm shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">446860105</span>
          </button>
        )}
      </div>
    </>
  )
}
