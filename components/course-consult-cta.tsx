'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Copy, MessageCircleMore } from 'lucide-react'

import { Button } from '@/components/ui/button'

type CourseConsultCtaProps = {
  courseTitle: string
}

export function CourseConsultCta({ courseTitle }: CourseConsultCtaProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText('446860105')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="mb-8 rounded-[28px] border border-primary/20 bg-[linear-gradient(135deg,rgba(0,229,176,0.12),rgba(6,18,17,0.92))] p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            <MessageCircleMore className="h-3.5 w-3.5" />
            课程咨询
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            想进一步了解《{courseTitle}》的学习安排？
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            可以直接添加微信 `446860105` 咨询课程目录、试听安排、学习路径和报名节奏。
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={handleCopy}
            className="rounded-full px-5 font-mono text-xs"
          >
            <Copy className="h-4 w-4" />
            {copied ? '已复制 446860105' : '复制微信号'}
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full px-5 font-mono text-xs border-primary/30 text-primary hover:bg-primary/10"
          >
            <Link href="/academy">查看课程总览</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
