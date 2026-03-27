'use client'

import { GraduationCap, House, Map, PanelsTopLeft, Target } from 'lucide-react'

import { CourseCard } from '@/components/course-card'
import { LearningRoadmap } from '@/components/learning-roadmap'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { CourseCatalogEntry } from '@/lib/course-types'

type AcademyContentTabsProps = {
  courses: CourseCatalogEntry[]
  featuredCount: number
}

export function AcademyContentTabs({
  courses,
  featuredCount,
}: AcademyContentTabsProps) {
  return (
    <Tabs defaultValue="home" className="mb-12">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">量虾学院</h2>
        </div>

        <TabsList className="h-auto rounded-full border border-white/[0.08] bg-card/60 p-1">
          <TabsTrigger
            value="home"
            className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <House className="h-4 w-4" />
            主页
          </TabsTrigger>
          <TabsTrigger
            value="catalog"
            className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <PanelsTopLeft className="h-4 w-4" />
            课程目录
          </TabsTrigger>
          <TabsTrigger
            value="roadmap"
            className="rounded-full px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Map className="h-4 w-4" />
            学习路径
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="home" className="mt-0">
        <section className="bg-[radial-gradient(circle_at_top,rgba(0,229,176,0.14),transparent_45%)] py-3">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="mb-4 font-serif text-3xl font-black leading-[1.02] text-foreground sm:text-4xl lg:text-5xl">
                从因子工程到实盘交易
                <br />
                打造完整量化交易知识图谱
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-foreground/78 sm:text-base">
                量虾学院集中承载 AI 量化课程体系，覆盖基础入门、因子工程、全流程实战与高级评估架构。
                课程内容围绕机器学习、深度学习、因子生命周期管理和交易系统落地展开，
                帮助学习者把知识、策略和实盘执行真正串起来。
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { label: '已上架课程', value: `${courses.length}` },
                { label: '精选课程', value: `${featuredCount}` },
                { label: '课程方向', value: '5+' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/[0.08] bg-background/75 p-4"
                >
                  <div className="font-mono text-2xl font-bold text-foreground">
                    {item.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
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
                  <div className="text-sm text-muted-foreground">
                    15年大厂经验倾囊相授
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="mb-2 text-sm font-semibold text-primary">核心背景</div>
                  <p className="text-sm leading-7 text-foreground/76">
                    长期深耕大数据算法、量化投资与 AI 量化研究，
                    兼具平台级算法决策、因子工程搭建和实盘交易系统经验，
                    强调课程内容必须可执行、可复盘、可迁移。
                  </p>
                </div>

                <div>
                  <div className="mb-2 text-sm font-semibold text-primary">专业专长</div>
                  <p className="text-sm leading-7 text-foreground/76">
                    擅长因子工程架构设计、系统化策略开发、多因子生命周期管理、WorldQuant Brain 专项训练，
                    以及从研究到自动化交易部署的完整闭环。
                  </p>
                </div>

                <div>
                  <div className="mb-2 text-sm font-semibold text-primary">教学理念</div>
                  <p className="text-sm leading-7 text-foreground/76">
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
              <ul className="mb-5 space-y-3 text-sm leading-6 text-foreground/76">
                <li>基础课到高级班按能力阶梯衔接，适合系统学习。</li>
                <li>每门课已统一重构为 6 节 × 2 小时，结构更清晰。</li>
                <li>课程主页、详情页、主站导航都已打通。</li>
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
        </section>
      </TabsContent>

      <TabsContent value="catalog" className="mt-0">
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </section>
      </TabsContent>

      <TabsContent value="roadmap" className="mt-0">
        <LearningRoadmap />
      </TabsContent>
    </Tabs>
  )
}
