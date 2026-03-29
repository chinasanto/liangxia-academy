'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Activity,
  BookText,
  GraduationCap,
  House,
  Map,
  Search,
  SlidersHorizontal,
  Target,
} from 'lucide-react'

import { AcademyComparisonTable } from '@/components/academy-comparison-table'
import { AcademyDiagnostic } from '@/components/academy-diagnostic'
import { CourseCard } from '@/components/course-card'
import { InsightsExplorer } from '@/components/insights-explorer'
import { LearningRoadmap } from '@/components/learning-roadmap'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { CourseCatalogEntry } from '@/lib/course-types'
import type { InsightArticle } from '@/lib/insight-types'

type AcademyContentTabsProps = {
  courses: CourseCatalogEntry[]
  featuredCount: number
  initialTab?: string
  initialFilters?: {
    level?: string
    category?: string
    search?: string
  }
}

export function AcademyContentTabs({
  courses,
  featuredCount,
  initialTab,
  initialFilters,
}: AcademyContentTabsProps) {
  const [search, setSearch] = useState(initialFilters?.search ?? '')
  const [selectedLevel, setSelectedLevel] = useState(
    initialFilters?.level ?? '全部',
  )
  const [selectedCategory, setSelectedCategory] = useState(
    initialFilters?.category ?? '全部',
  )

  const levels = ['全部', ...Array.from(new Set(courses.map((course) => course.level)))]
  const categories = [
    '全部',
    ...Array.from(new Set(courses.map((course) => course.category))),
  ]
  const normalizedSearch = search.trim().toLowerCase()

  const filteredCourses = courses.filter((course) => {
    const matchLevel = selectedLevel === '全部' || course.level === selectedLevel
    const matchCategory =
      selectedCategory === '全部' || course.category === selectedCategory
    const matchSearch =
      normalizedSearch.length === 0 ||
      [
        course.shortTitle,
        course.title,
        course.subtitle,
        course.summary,
        ...(course.tags ?? []),
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch)

    return matchLevel && matchCategory && matchSearch
  })

  const activeTab =
    initialTab === 'roadmap' || initialTab === 'insights' || initialTab === 'diagnosis'
      ? initialTab
      : 'home'
  const [currentTab, setCurrentTab] = useState(activeTab)
  const [allInsights, setAllInsights] = useState<InsightArticle[]>([])
  const [insightsLoading, setInsightsLoading] = useState(
    activeTab === 'insights' || activeTab === 'diagnosis',
  )
  const [insightsError, setInsightsError] = useState<string | null>(null)

  useEffect(() => {
    if (
      (currentTab !== 'insights' && currentTab !== 'diagnosis') ||
      allInsights.length > 0 ||
      insightsLoading
    ) {
      return
    }

    let cancelled = false

    async function loadInsights() {
      setInsightsLoading(true)
      setInsightsError(null)

      try {
        const response = await fetch('/api/academy/insights', {
          cache: 'force-cache',
        })

        if (!response.ok) {
          throw new Error('加载文章失败')
        }

        const data = (await response.json()) as { insights: InsightArticle[] }

        if (!cancelled) {
          setAllInsights(data.insights)
        }
      } catch (error) {
        if (!cancelled) {
          setInsightsError(
            error instanceof Error ? error.message : '加载文章失败',
          )
        }
      } finally {
        if (!cancelled) {
          setInsightsLoading(false)
        }
      }
    }

    void loadInsights()

    return () => {
      cancelled = true
    }
  }, [allInsights.length, currentTab, insightsLoading])

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-10 sm:mb-12">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI量化学院</h2>
        </div>

        <TabsList className="grid h-auto w-full grid-cols-4 gap-0.5 overflow-hidden rounded-[22px] border border-white/[0.08] bg-card/60 p-1 sm:inline-flex sm:w-auto sm:gap-1 sm:rounded-full">
          <TabsTrigger
            value="home"
            className="min-w-0 rounded-[18px] px-1.5 py-2 text-[10px] leading-tight whitespace-normal data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:rounded-full sm:px-4 sm:text-sm sm:whitespace-nowrap"
          >
            <House className="h-4 w-4" />
            主页
          </TabsTrigger>
          <TabsTrigger
            value="roadmap"
            className="min-w-0 rounded-[18px] px-1.5 py-2 text-[10px] leading-tight whitespace-normal data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:rounded-full sm:px-4 sm:text-sm sm:whitespace-nowrap"
          >
            <Map className="h-4 w-4" />
            学习路径
          </TabsTrigger>
          <TabsTrigger
            value="insights"
            className="min-w-0 rounded-[18px] px-1.5 py-2 text-[10px] leading-tight whitespace-normal data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:rounded-full sm:px-4 sm:text-sm sm:whitespace-nowrap"
          >
            <BookText className="h-4 w-4" />
            文章技巧
          </TabsTrigger>
          <TabsTrigger
            value="diagnosis"
            className="min-w-0 rounded-[18px] px-1.5 py-2 text-[10px] leading-tight whitespace-normal data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:rounded-full sm:px-4 sm:text-sm sm:whitespace-nowrap"
          >
            <Activity className="h-4 w-4" />
            问题诊断
          </TabsTrigger>
        </TabsList>
      </div>

      {currentTab === 'home' ? (
        <TabsContent value="home" forceMount className="mt-0">
          <section className="bg-[radial-gradient(circle_at_top,rgba(0,229,176,0.14),transparent_45%)] py-2 sm:py-3">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <h1 className="mb-4 font-serif text-[1.8rem] font-black leading-[1.06] text-foreground sm:text-4xl lg:text-5xl">
                  <span className="block">从因子工程到实盘交易</span>
                  <span className="hidden sm:block">打造完整量化交易知识图谱</span>
                  <span className="block sm:hidden">打造完整量化交易</span>
                  <span className="block sm:hidden">知识图谱</span>
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-foreground/78 sm:text-base">
                  AI量化学院集中承载 AI 量化课程体系，覆盖基础入门、因子工程、全流程实战与高级评估架构。
                  课程内容围绕机器学习、深度学习、因子生命周期管理和交易系统落地展开，
                  帮助学习者把知识、策略和实盘执行真正串起来。
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: '已上架课程', value: `${courses.length}` },
                  { label: '精选课程', value: `${featuredCount}` },
                  { label: '课程方向', value: '5+' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/[0.08] bg-background/75 p-4"
                  >
                    <div className="font-mono text-xl font-bold text-foreground sm:text-2xl">
                      {item.value}
                    </div>
                    <div className="mt-1 text-[11px] leading-5 text-foreground/72 sm:text-xs">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
              <div className="rounded-[26px] border border-white/[0.08] bg-background/72 p-6 sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/15 p-3 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-foreground">AI量化邹老师</div>
                    <div className="text-sm text-foreground/72">
                      15年大厂经验倾囊相授
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-primary">核心背景</div>
                    <p className="text-sm leading-7 text-foreground/78">
                      长期深耕大数据算法、量化投资与 AI 量化研究，
                      兼具平台级算法决策、因子工程搭建和实盘交易系统经验，
                      强调课程内容必须可执行、可复盘、可迁移。
                    </p>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-semibold text-primary">专业专长</div>
                    <p className="text-sm leading-7 text-foreground/78">
                      擅长因子工程架构设计、系统化策略开发、多因子生命周期管理、WorldQuant Brain 专项训练，
                      以及从研究到自动化交易部署的完整闭环。
                    </p>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-semibold text-primary">教学理念</div>
                    <p className="text-sm leading-7 text-foreground/78">
                      立足实战，注重思维构建，不只讲理论，更强调学员能把方法论转换成自己的研究框架和项目成果。
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/[0.08] bg-background/72 p-5">
                <div className="mb-5 flex items-center gap-3 text-primary">
                  <Target className="h-5 w-5" />
                  <span className="text-sm font-semibold">课程体系总览</span>
                </div>
                <ul className="mb-5 space-y-3 text-sm leading-6 text-foreground/78">
                  <li>基础课到高级班按能力阶梯衔接，适合系统学习。</li>
                  <li>每门课已统一重构为 6 节 × 2 小时，结构更清晰。</li>
                </ul>
                <div>
                  <div className="mb-3 flex items-center gap-3 text-primary">
                    <span className="text-sm font-semibold">课程覆盖方向</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'AI量化研究',
                      '因子工程',
                      'WorldQuant Brain',
                      'CTA / Crypto',
                      '机器学习建模',
                      '交易系统落地',
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <section className="mt-10">
              <div className="mb-6 flex flex-col gap-5 rounded-[24px] border border-white/[0.08] bg-background/72 p-5">
                <div className="flex items-center gap-3 text-primary">
                  <SlidersHorizontal className="h-5 w-5" />
                  <span className="text-sm font-semibold">课程筛选</span>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
                  <div>
                    <label className="mb-2 block text-xs font-semibold tracking-[0.12em] text-muted-foreground">
                      搜索关键词
                    </label>
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="搜索课程名、方向或关键词"
                        className="border-white/[0.08] bg-card pl-10 text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold tracking-[0.12em] text-muted-foreground">
                      学习阶段
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {levels.map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setSelectedLevel(level)}
                          className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                            selectedLevel === level
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-card text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold tracking-[0.12em] text-muted-foreground">
                      课程方向
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setSelectedCategory(category)}
                          className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                            selectedCategory === category
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-card text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <h3 className="text-2xl font-bold text-foreground">课程目录</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-primary/12 px-3 py-1.5 text-sm font-semibold text-primary">
                    当前展示 {filteredCourses.length} / {courses.length} 门
                  </span>
                  <Link
                    href="/academy?tab=insights"
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/30"
                  >
                    <BookText className="h-4 w-4" />
                    查看量化技巧
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>

              {filteredCourses.length === 0 ? (
                <div className="mt-5 rounded-[22px] border border-dashed border-white/[0.08] bg-background/60 p-6 text-sm text-muted-foreground">
                  当前筛选条件下没有匹配课程，可以切回“全部”或换一个关键词试试。
                </div>
              ) : null}
            </section>

            <AcademyComparisonTable courses={courses} />
          </section>
        </TabsContent>
      ) : null}

      {currentTab === 'roadmap' ? (
        <TabsContent value="roadmap" forceMount className="mt-0">
          <LearningRoadmap />
        </TabsContent>
      ) : null}

      {currentTab === 'insights' ? (
        <TabsContent value="insights" forceMount className="mt-0">
          <section className="bg-[radial-gradient(circle_at_top,rgba(0,229,176,0.12),transparent_42%)] py-3">
            <div className="mb-8 rounded-[28px] border border-white/[0.08] bg-background/72 p-6 sm:p-8">
              <div className="max-w-4xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/12 px-4 py-1.5 text-xs font-semibold text-primary">
                  <BookText className="h-4 w-4" />
                  AI量化学院 · 文章技巧
                </div>
                <h3 className="font-serif text-3xl font-black leading-tight text-foreground sm:text-4xl">
                  课程之外的量化工程经验
                  <br />
                  在这里沉淀成可持续复用的文章体系
                </h3>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-foreground/78 sm:text-base">
                  这里集中收纳因子工程、AI量化开发、策略部署、WorldQuant Brain 与研究方法相关文章，
                  和课程、学习路径一起组成完整的 AI量化学院学习闭环。
                </p>
              </div>
            </div>

            {insightsLoading ? (
              <div className="rounded-[28px] border border-white/[0.08] bg-background/72 p-8 text-sm text-muted-foreground">
                正在加载文章内容...
              </div>
            ) : insightsError ? (
              <div className="rounded-[28px] border border-red-500/20 bg-red-500/10 p-8 text-sm text-red-300">
                {insightsError}
              </div>
            ) : (
              <InsightsExplorer
                articles={allInsights}
                title="量化技巧"
                description="支持按关键词、分类和标签筛选文章，更方便快速找到适合自己当前阶段的量化内容。"
                showAllLink
              />
            )}
          </section>
        </TabsContent>
      ) : null}

      {currentTab === 'diagnosis' ? (
        <TabsContent value="diagnosis" forceMount className="mt-0">
          {insightsLoading ? (
            <div className="rounded-[28px] border border-white/[0.08] bg-background/72 p-8 text-sm text-muted-foreground">
              正在加载诊断相关文章...
            </div>
          ) : insightsError ? (
            <div className="rounded-[28px] border border-red-500/20 bg-red-500/10 p-8 text-sm text-red-300">
              {insightsError}
            </div>
          ) : (
            <AcademyDiagnostic courses={courses} articles={allInsights} />
          )}
        </TabsContent>
      ) : null}
    </Tabs>
  )
}
