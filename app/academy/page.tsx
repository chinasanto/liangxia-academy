import Link from 'next/link'
import {
  ChevronRight,
  GraduationCap,
  Home,
  Layers3,
  Target,
} from 'lucide-react'

import { CourseCard } from '@/components/course-card'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { getPublishedCourses } from '@/lib/course-store'

export const dynamic = 'force-dynamic'

export default async function AcademyPage() {
  const courses = await getPublishedCourses()
  const featuredCount = courses.filter((course) => course.featured).length

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="px-6 pb-20 pt-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="inline-flex items-center gap-2 hover:text-primary">
              <Home className="h-4 w-4" />
              主页
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">量虾学院</span>
          </nav>

          <section className="mb-10 rounded-[28px] border border-primary/15 bg-[radial-gradient(circle_at_top,rgba(0,229,176,0.14),transparent_45%),linear-gradient(180deg,rgba(7,12,18,0.96),rgba(7,12,18,0.7))] p-7 sm:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <h1 className="mb-4 font-serif text-4xl font-black leading-[0.95] text-foreground sm:text-5xl lg:text-6xl">
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
                        参考原始课程总览资料，老师长期深耕大数据算法、量化投资与 AI 量化研究，
                        兼具平台级算法决策、因子工程搭建和实盘交易系统经验，强调课程内容必须可执行、可复盘、可迁移。
                      </p>
                    </div>

                    <div>
                      <div className="mb-2 text-sm font-semibold text-primary">专业专长</div>
                      <p className="text-sm leading-7 text-foreground/76">
                        擅长因子工程架构设计、系统化策略开发、多因子生命周期管理、WorldQuant Brain 专项训练、
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
                    <span className="text-sm font-semibold">课程体系概览</span>
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

          <section className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">课程目录</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                封面图、价格展示和课程详情都已统一整理。
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </section>

          <section className="mt-12 rounded-[28px] border border-white/[0.08] bg-card/50 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/15 p-3 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">
                    想继续回到主站看其他版块？
                  </div>
                  <div className="text-sm text-muted-foreground">
                    现在量虾学院和主页已经打通，可以随时往返。
                  </div>
                </div>
              </div>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                返回主页
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
