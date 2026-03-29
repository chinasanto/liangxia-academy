'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Activity, ArrowRight, ClipboardList, Sparkles } from 'lucide-react'

import type { CourseCatalogEntry } from '@/lib/course-types'
import type { InsightArticle } from '@/lib/insight-types'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

type AcademyDiagnosticProps = {
  courses: CourseCatalogEntry[]
  articles: InsightArticle[]
}

type DiagnosticRule = {
  id: string
  title: string
  keywords: string[]
  suitableStages: string[]
  diagnosis: string
  recommendation: string
  courseSlugs: string[]
  articleSlugs: string[]
  tasks: string[]
}

const stages = ['全部阶段', '零基础入门', '研究进阶', '实盘部署', '工具提效']

const diagnosticRules: DiagnosticRule[] = [
  {
    id: 'no-path',
    title: '学习路径混乱',
    keywords: ['不知道学什么', '先学什么', '学习路径', '路线', '入门', '零基础'],
    suitableStages: ['全部阶段', '零基础入门'],
    diagnosis: '你现在最缺的不是更多零散技巧，而是一条从基础到进阶的清晰学习顺序。',
    recommendation: '先建立统一研究框架，再进入因子工程或 AI 提效模块，效率会明显更高。',
    courseSlugs: ['ai-quant-basic', 'ai-llm-quant-coding', 'factor-engineering'],
    articleSlugs: ['quant-trading-main-approaches', 'factor-cta-ai-which-path-fits-you', 'seven-beginner-quant-pitfalls'],
    tasks: [
      '先完成 AI量化基础课，补齐数据、回测、因子和策略闭环共识。',
      '明确你更偏因子、CTA 还是 AI 提效，再决定下一门主修课。',
      '用 1 周时间完成一套小型研究闭环，而不是只看概念。 ',
    ],
  },
  {
    id: 'factor-issue',
    title: '因子研究不稳定',
    keywords: ['因子', '失效', '相关性', '去重', 'alpha', '因子工程'],
    suitableStages: ['全部阶段', '研究进阶'],
    diagnosis: '你遇到的更像是因子治理问题，而不只是单个因子公式好不好用。',
    recommendation: '先做因子去重、监控和版本管理，再谈继续扩充因子数量。',
    courseSlugs: ['factor-engineering', 'advanced-factor-engineering'],
    articleSlugs: ['factor-correlation-control', 'how-to-detect-factor-decay', 'factor-library-versioning-rules'],
    tasks: [
      '先检查因子之间是否在重复表达同一类风险。',
      '给现有因子做一份失效排查清单和监控指标。',
      '建立版本记录，区分继续保留、降权和淘汰的信号。',
    ],
  },
  {
    id: 'backtest-live-gap',
    title: '回测和实盘差距大',
    keywords: ['回测', '实盘', '滑点', '成本', '部署', '上线', '执行'],
    suitableStages: ['全部阶段', '实盘部署'],
    diagnosis: '你的核心问题更像是执行摩擦和部署一致性，而不是研究完全失效。',
    recommendation: '把成本、滑点、调度、监控和券商 API 风险前置到研究流程里。',
    courseSlugs: ['ai-quant-fullprocess', 'advanced-factor-engineering'],
    articleSlugs: ['why-cta-backtests-fail-in-live-trading', 'transaction-cost-models-that-matter', 'monitoring-alerts-for-live-strategies'],
    tasks: [
      '先补一版真实的成本和滑点模型。',
      '用模拟盘验证信号、下单、持仓同步和告警链路。',
      '把部署问题分成数据、计算、风控、执行四层逐一排查。',
    ],
  },
  {
    id: 'ml-issue',
    title: '机器学习策略不稳',
    keywords: ['机器学习', '模型', '特征', '过拟合', '标签', '深度学习', '泄漏'],
    suitableStages: ['全部阶段', '研究进阶'],
    diagnosis: '你遇到的多半不是模型不够高级，而是标签、特征边界和验证流程还不稳。',
    recommendation: '先处理特征泄漏、标签设计和嵌套验证，再考虑更复杂模型。',
    courseSlugs: ['ai-quant-basic', 'ai-quant-fullprocess'],
    articleSlugs: ['feature-leakage-in-quant-models', 'nested-validation-for-quant-models', 'how-to-choose-label-horizon'],
    tasks: [
      '重新检查特征时间对齐和可得性边界。',
      '确认标签周期是否真的匹配你的持有和调仓节奏。',
      '把模型选择和最终评估彻底分开，避免测试集污染。',
    ],
  },
  {
    id: 'efficiency',
    title: '研发效率低、想法落地慢',
    keywords: ['效率', '代码', '大模型', 'chatgpt', 'codex', '研报', 'prompt', '自动化'],
    suitableStages: ['全部阶段', '工具提效'],
    diagnosis: '你现在最需要的不是继续堆工具，而是建立一条 AI 协作研发工作流。',
    recommendation: '把研报拆解、代码孵化、版本记录和任务自动化连成一条线，效率会比单点提效更明显。',
    courseSlugs: ['ai-llm-quant-coding', 'ai-quant-fullprocess'],
    articleSlugs: ['how-llms-change-quant-research', 'llm-prompting-for-factor-ideas', 'what-to-automate-first-in-quant'],
    tasks: [
      '先把常见研究任务写成固定 Prompt 模板。',
      '把研报转策略、因子代码生成和结果复盘串成统一流程。',
      '优先自动化高频重复动作，而不是一开始就做全链路替换。',
    ],
  },
]

export function AcademyDiagnostic({
  courses,
  articles,
}: AcademyDiagnosticProps) {
  const [query, setQuery] = useState('')
  const [stage, setStage] = useState('全部阶段')

  const matchedRule = useMemo(() => {
    const text = query.trim().toLowerCase()

    if (!text) {
      return diagnosticRules[0]
    }

    const candidates = diagnosticRules
      .filter((rule) => stage === '全部阶段' || rule.suitableStages.includes(stage))
      .map((rule) => ({
        rule,
        score: rule.keywords.reduce((total, keyword) => {
          return total + (text.includes(keyword.toLowerCase()) ? 1 : 0)
        }, 0),
      }))
      .sort((a, b) => b.score - a.score)

    return candidates[0]?.score ? candidates[0].rule : diagnosticRules[0]
  }, [query, stage])

  const recommendedCourses = useMemo(
    () =>
      matchedRule.courseSlugs
        .map((slug) => courses.find((course) => course.slug === slug))
        .filter((course): course is CourseCatalogEntry => Boolean(course)),
    [courses, matchedRule],
  )

  const recommendedArticles = useMemo(
    () =>
      matchedRule.articleSlugs
        .map((slug) => articles.find((article) => article.slug === slug))
        .filter((article): article is InsightArticle => Boolean(article)),
    [articles, matchedRule],
  )

  return (
    <section className="space-y-8">
      <section className="rounded-[28px] border border-white/[0.08] bg-card/55 p-6 sm:p-8">
        <div className="mb-6 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Activity className="h-3.5 w-3.5" />
            问题诊断
          </div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            量化问题诊断与学习规划
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            把你现在遇到的量化问题描述出来，我会基于常见学习与研发场景，给出更贴近当前阶段的诊断方向、推荐课程与学习任务计划。
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <Textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例如：我会写 Python，但回测和实盘差距很大；或者：我不知道应该先学因子工程还是 AI 编程提效。"
              className="min-h-[150px] border-white/[0.08] bg-background/80 text-sm leading-7"
            />
            <div className="flex flex-wrap gap-2">
              {[
                '不知道先学哪门课',
                '因子很多但效果不稳',
                '回测很好实盘失真',
                '想用大模型提升研发效率',
              ].map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setQuery(example)}
                  className="rounded-full border border-white/[0.08] bg-background/75 px-3 py-2 text-xs text-muted-foreground transition hover:text-foreground"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-background/72 p-5">
            <div className="mb-3 text-sm font-semibold text-foreground">当前阶段</div>
            <select
              value={stage}
              onChange={(event) => setStage(event.target.value)}
              className="h-11 w-full rounded-xl border border-white/[0.08] bg-background/80 px-4 text-sm text-foreground outline-none transition focus:border-primary/40"
            >
              {stages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <div className="mt-5 rounded-[20px] bg-primary/8 p-4">
              <div className="text-xs font-semibold tracking-[0.12em] text-primary">
                诊断结果
              </div>
              <div className="mt-2 text-lg font-semibold text-foreground">
                {matchedRule.title}
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {matchedRule.diagnosis}
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/85">
                {matchedRule.recommendation}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/[0.08] bg-card/55 p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-2xl bg-primary/15 p-3 text-primary">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">建议学习任务计划</h3>
            <p className="text-sm text-muted-foreground">
              按照“先补底层问题，再做针对训练”的思路推进，会更容易形成闭环。
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[24px] border border-white/[0.08] bg-background/72 p-5">
            <div className="mb-4 text-base font-semibold text-foreground">推荐课程</div>
            <div className="space-y-3">
              {recommendedCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/academy/${course.slug}`}
                  className="flex items-center justify-between gap-3 rounded-[18px] border border-white/[0.08] bg-card/60 px-4 py-3 transition hover:border-primary/30"
                >
                  <div>
                    <div className="text-sm font-semibold text-foreground">{course.shortTitle}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {course.level} · {course.category}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[24px] border border-white/[0.08] bg-background/72 p-5">
              <div className="mb-4 text-base font-semibold text-foreground">优先任务</div>
              <ul className="space-y-3">
                {matchedRule.tasks.map((task, index) => (
                  <li key={task} className="flex items-start gap-3 text-sm leading-7 text-foreground/88">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[24px] border border-white/[0.08] bg-background/72 p-5">
              <div className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                对应技巧文章
              </div>
              <div className="space-y-3">
                {recommendedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/academy/insights/${article.slug}`}
                    className="block rounded-[18px] border border-white/[0.08] bg-card/60 px-4 py-3 transition hover:border-primary/30"
                  >
                    <div className="text-sm font-semibold text-foreground">{article.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {article.category} · {article.readTime}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
