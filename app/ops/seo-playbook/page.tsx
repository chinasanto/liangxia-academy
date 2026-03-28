import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Playbook',
  robots: {
    index: false,
    follow: false,
  },
}

const checklist = [
  '检查 Google Search Console 的覆盖情况、发现页数和索引状态。',
  '检查百度搜索资源平台的普通收录、抓取频次和 sitemap 提交状态。',
  '观察课程页标题与描述是否持续带来曝光，必要时继续微调。',
  '优先提升曝光高但点击率低的页面标题与摘要文案。',
  '每新增课程或技巧文章后，确认 sitemap 已更新且页面可访问。',
  '持续维护课程页 FAQ、案例和相关推荐，增强停留时长与站内互链。',
]

export default function SeoPlaybookPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-white/[0.08] bg-card/50 p-8">
        <h1 className="text-3xl font-bold text-foreground">Search Console / 百度 持续优化页</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          这是内部使用的 SEO 持续优化清单页面，不会被搜索引擎收录。
        </p>

        <ul className="mt-6 space-y-4 text-sm leading-7 text-foreground/85">
          {checklist.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
