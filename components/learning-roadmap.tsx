import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  GraduationCap,
  Target,
} from 'lucide-react'
import { getMainRoadmapSlugs } from '@/lib/academy-roadmap'

type RoadmapStep = {
  order: string
  title: string
  subtitle: string
  bridge: string
  unlock: string
  slug: string
  accent: string
  accentSoft: string
  ring: string
  bg: string
  text: string
  chip: string
  button: string
  tags: string[]
}

const mainRoadmapOrder = getMainRoadmapSlugs()

const roadmapSteps: RoadmapStep[] = [
  {
    order: '1',
    title: 'AI量化基础课程班',
    subtitle: '建立直觉，跑通从数据到实盘的完整工程流程',
    bridge: '掌握基础范式后，先把 AI 大模型工具链接进研发流程，后面所有写码、研报转策略和系统开发都会更高效。',
    unlock: '解锁：完整 AI 量化工程范式，从数据到实盘执行的底层闭环。',
    slug: 'ai-quant-basic',
    accent: 'text-[#147A5C] dark:text-[#8ff0c6]',
    accentSoft: 'text-[#2C8E72] dark:text-[#8ff0c6]',
    ring: 'border-[#7FD3B9] dark:border-[#1f7a5b]',
    bg: 'bg-[linear-gradient(135deg,rgba(233,250,244,0.96),rgba(243,252,248,0.92))] dark:bg-[linear-gradient(135deg,rgba(15,110,86,0.22),rgba(6,18,17,0.9))]',
    text: 'text-[#24463B] dark:text-[#dff7ef]',
    chip: 'border-[#BCE9DA] bg-white/85 text-[#226B54] dark:border-[#1f7a5b] dark:bg-black/10 dark:text-[#8ff0c6]',
    button: 'border-[#7FD3B9] bg-white/88 text-[#147A5C] hover:bg-[#ECFAF4] dark:border-[#1f7a5b] dark:bg-transparent dark:text-[#8ff0c6] dark:hover:bg-white/8',
    tags: ['数据清洗 / EDA', '量化 ML 基础', '24 因子体系', 'Alpha 四级范式', 'XGBoost 建模', 'CTA 实盘执行'],
  },
  {
    order: '2',
    title: 'AI大模型辅助量化编程',
    subtitle: '工具提效，把 Codex 与 ChatGPT 5.4 变成量化研发搭档',
    bridge: '掌握 AI 协作编程之后，再去做全流程策略开发，会明显提高原型孵化、研报转策略和系统落地效率。',
    unlock: '解锁：因子代码孵化、PDF 研报转逻辑、向量化改写与量化系统模块化开发能力。',
    slug: 'ai-llm-quant-coding',
    accent: 'text-[#9650BF] dark:text-[#ffd5ff]',
    accentSoft: 'text-[#A25ACB] dark:text-[#ffd5ff]',
    ring: 'border-[#D7B6ED] dark:border-[#b35cd9]',
    bg: 'bg-[linear-gradient(135deg,rgba(252,242,255,0.98),rgba(248,238,255,0.92))] dark:bg-[linear-gradient(135deg,rgba(155,76,196,0.23),rgba(18,10,30,0.92))]',
    text: 'text-[#533A63] dark:text-[#f8eaff]',
    chip: 'border-[#E4CFF3] bg-white/88 text-[#8F49B5] dark:border-[#b35cd9] dark:bg-black/10 dark:text-[#ffd5ff]',
    button: 'border-[#D7B6ED] bg-white/88 text-[#9650BF] hover:bg-[#FBF4FF] dark:border-[#b35cd9] dark:bg-transparent dark:text-[#ffd5ff] dark:hover:bg-white/8',
    tags: ['Codex 协作编程', 'ChatGPT 5.4 工作流', 'PDF 研报转策略', '向量化改写', '量化系统搭建', 'AI 代码治理'],
  },
  {
    order: '3',
    title: 'AI量化全流程高级班',
    subtitle: '深化认知，建立更完整的量化世界观与实战闭环',
    bridge: '世界观建立后，专项突破因子生产核心，开始规模化构建高质量因子池。',
    unlock: '解锁：多算法全链路工程能力，以及自动化策略落地方法。',
    slug: 'ai-quant-fullprocess',
    accent: 'text-[#2F73C0] dark:text-[#9cc8ff]',
    accentSoft: 'text-[#4385CF] dark:text-[#9cc8ff]',
    ring: 'border-[#A8CFF7] dark:border-[#2869af]',
    bg: 'bg-[linear-gradient(135deg,rgba(239,247,255,0.98),rgba(233,243,255,0.92))] dark:bg-[linear-gradient(135deg,rgba(24,95,165,0.22),rgba(7,18,32,0.9))]',
    text: 'text-[#244766] dark:text-[#e5f1ff]',
    chip: 'border-[#CFE2FA] bg-white/88 text-[#2F73C0] dark:border-[#2869af] dark:bg-black/10 dark:text-[#9cc8ff]',
    button: 'border-[#A8CFF7] bg-white/88 text-[#2F73C0] hover:bg-[#F2F8FF] dark:border-[#2869af] dark:bg-transparent dark:text-[#9cc8ff] dark:hover:bg-white/8',
    tags: ['多算法深度比较', '策略目标设计', '大规模因子筛选', '过拟合防控调优', '增量学习迭代', '自动化实盘闭环'],
  },
  {
    order: '4',
    title: '因子工程设计卓越班',
    subtitle: '规模化生产，构建高质量、可治理的因子池',
    bridge: '有了海量因子后，开始科学区分信号与噪声，并进一步评估未来赚钱能力。',
    unlock: '解锁：可审计、可治理、可进化的大规模因子系统。',
    slug: 'factor-engineering',
    accent: 'text-[#6659C7] dark:text-[#cac4ff]',
    accentSoft: 'text-[#776DD0] dark:text-[#cac4ff]',
    ring: 'border-[#C8C1F4] dark:border-[#5f57c5]',
    bg: 'bg-[linear-gradient(135deg,rgba(245,243,255,0.98),rgba(238,236,255,0.92))] dark:bg-[linear-gradient(135deg,rgba(83,74,183,0.22),rgba(14,14,32,0.9))]',
    text: 'text-[#3E3871] dark:text-[#f0eeff]',
    chip: 'border-[#DBD6F8] bg-white/88 text-[#6659C7] dark:border-[#5f57c5] dark:bg-black/10 dark:text-[#cac4ff]',
    button: 'border-[#C8C1F4] bg-white/88 text-[#6659C7] hover:bg-[#F6F4FF] dark:border-[#5f57c5] dark:bg-transparent dark:text-[#cac4ff] dark:hover:bg-white/8',
    tags: ['白箱算子空间', '模板引擎批量生产', '五层生产架构', '准入 Gate 筛选', '入库版本管理', '生命周期治理'],
  },
  {
    order: '5',
    title: '因子工程科学评估大乘班',
    subtitle: '科学评估、动态组合，走向生产级策略运营',
    bridge: '最终目标是把因子研究升级为可长期运营、可持续迭代的生产级策略体系。',
    unlock: '解锁：信号可量化、过拟合可控、策略可长期运营。',
    slug: 'advanced-factor-engineering',
    accent: 'text-[#A96A16] dark:text-[#ffd28b]',
    accentSoft: 'text-[#B87823] dark:text-[#ffd28b]',
    ring: 'border-[#E7C894] dark:border-[#a86a15]',
    bg: 'bg-[linear-gradient(135deg,rgba(255,249,239,0.98),rgba(255,244,227,0.92))] dark:bg-[linear-gradient(135deg,rgba(133,79,11,0.24),rgba(28,18,4,0.92))]',
    text: 'text-[#69461B] dark:text-[#fff3de]',
    chip: 'border-[#F1DDB8] bg-white/88 text-[#A96A16] dark:border-[#a86a15] dark:bg-black/10 dark:text-[#ffd28b]',
    button: 'border-[#E7C894] bg-white/88 text-[#A96A16] hover:bg-[#FFF8EF] dark:border-[#a86a15] dark:bg-transparent dark:text-[#ffd28b] dark:hover:bg-white/8',
    tags: ['Bootstrap 稳定性', 'CSCV / PBO', '元因子预测体系', 'POWR 状态机', '科学因子组合', '生产级监控'],
  },
]

export function LearningRoadmap() {
  return (
    <section className="rounded-[30px] border border-white/[0.08] bg-card/75 p-6 shadow-[0_18px_46px_rgba(16,32,46,0.08)] sm:p-8 lg:p-10 dark:bg-card/45 dark:shadow-none">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
            学习路径
          </h3>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/88 px-4 py-3 text-sm text-muted-foreground shadow-sm dark:bg-background/65 dark:shadow-none">
          {mainRoadmapOrder.length > 0
            ? '基础课 → AI大模型辅助编程 → 全流程高级班 → 因子工程 → 科学评估大乘班'
            : ''}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4 rounded-2xl border border-dashed border-slate-200 bg-white/88 px-4 py-4 shadow-sm dark:border-white/[0.1] dark:bg-background/50 dark:shadow-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-foreground dark:border-white/[0.12] dark:bg-background">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">入门起点</div>
            <div className="mt-1 text-sm text-muted-foreground">
              有 Python 基础，对 AI 量化和策略开发感兴趣。
            </div>
          </div>
        </div>

        {roadmapSteps.map((step, index) => (
          <div key={step.slug}>
            <div className="flex gap-4">
              <div className="hidden w-12 justify-center sm:flex">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${step.ring} ${step.accent} bg-white/90 shadow-sm dark:bg-background/80 dark:shadow-none`}
                >
                  {step.order}
                </div>
              </div>

              <div
                className={`flex-1 rounded-[24px] border p-5 shadow-[0_12px_32px_rgba(16,32,46,0.06)] sm:p-6 dark:shadow-none ${step.ring} ${step.bg}`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="mb-2 flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold sm:hidden ${step.ring} ${step.accent} bg-white/90 shadow-sm dark:bg-transparent dark:shadow-none`}
                        >
                          {step.order}
                        </div>
                      <Link
                        href={`/academy/${step.slug}`}
                        className={`text-xl font-bold transition hover:opacity-85 ${step.text}`}
                      >
                        {step.title}
                      </Link>
                    </div>
                    <div className={`text-sm font-medium ${step.accentSoft}`}>{step.subtitle}</div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium ${step.chip}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={`mt-4 text-sm leading-6 ${step.text} opacity-85`}>
                      {step.unlock}
                    </div>
                  </div>

                  <Link
                    href={`/academy/${step.slug}`}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${step.button}`}
                  >
                    查看这门课
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {index < roadmapSteps.length - 1 ? (
              <div className="flex gap-4 py-3">
                <div className="hidden w-12 items-center justify-center sm:flex">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-muted-foreground shadow-sm dark:border-white/[0.08] dark:bg-background/70 dark:shadow-none">
                    <ArrowDown className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex-1 pl-0 sm:pl-0">
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white/82 px-4 py-3 text-sm text-muted-foreground shadow-sm dark:border-white/[0.08] dark:bg-background/35 dark:shadow-none">
                    {step.bridge}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}

        <div className="rounded-2xl border border-primary/15 bg-[linear-gradient(135deg,rgba(0,229,176,0.08),rgba(255,255,255,0.96))] px-4 py-4 dark:bg-primary/8">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">终点目标</div>
              <div className="mt-1 text-sm leading-6 text-muted-foreground">
                形成完整 AI 量化工程师能力，能够独立运营可持续盈利的生产级策略体系。
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/85 px-4 py-4 shadow-sm dark:bg-background/45 dark:shadow-none">
          <div className="text-sm font-semibold text-foreground">可并行专项</div>
          <div className="mt-1 text-sm leading-6 text-muted-foreground">
            WorldQuant Brain 实战与求职课更适合作为并行补充模块，
            在基础课之后穿插学习，会更容易形成平台专项能力。
          </div>
          <div className="mt-3">
            <Link
              href="/academy/brain-quant"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:bg-slate-50 dark:border-white/[0.1] dark:bg-transparent dark:shadow-none dark:hover:bg-white/[0.04]"
            >
              查看 WorldQuant Brain 专项课
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
