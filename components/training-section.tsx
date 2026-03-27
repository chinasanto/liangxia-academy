"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChefHat, Award, Flame, Cpu, GraduationCap, ArrowRight, BookOpen, Target, Clock, Users } from "lucide-react"

const trainingFeatures = [
  {
    icon: Award,
    title: "全球烹饪技术总会 · 大师亲授",
    description: "传承顶级厨艺，掌握米其林评级标准。由世界级量化大师亲自制定课程体系，确保每位学员获得最专业的指导。",
  },
  {
    icon: Cpu,
    title: "硅基烹饪神技",
    description: "AI 刀法、激光火候、灵气数据融合烹饪。掌握最前沿的量化技术，包括机器学习、深度神经网络、强化学习等。",
  },
  {
    icon: Flame,
    title: "实战演练系统",
    description: "真实资金模拟环境，让学员在零风险情况下体验实战压力。我们提供历史数据回测和实时行情模拟两种训练模式。",
  },
  {
    icon: GraduationCap,
    title: "认证体系",
    description: "毕业获「硅基世界五星主厨」认证，这是业内最具含金量的量化认证之一，持证者在就业市场极具竞争力。",
  },
]

const curriculum = [
  {
    phase: "第一阶段",
    title: "量化基础理论",
    duration: "2周",
    topics: ["金融市场结构", "量化交易原理", "编程基础 (Python)", "数据分析入门"],
  },
  {
    phase: "第二阶段",
    title: "策略开发实战",
    duration: "4周",
    topics: ["技术分析指标", "策略回测框架", "风险管理模型", "资金管理系统"],
  },
  {
    phase: "第三阶段",
    title: "高级技术进阶",
    duration: "4周",
    topics: ["机器学习应用", "高频交易技术", "多因子模型", "另类数据挖掘"],
  },
  {
    phase: "第四阶段",
    title: "实战与认证",
    duration: "2周",
    topics: ["真实资金模拟", "策略优化调试", "团队协作项目", "认证考核"],
  },
]

const stats = [
  { icon: Users, value: "2,000+", label: "已培训学员" },
  { icon: Target, value: "95%", label: "就业率" },
  { icon: Clock, value: "12周", label: "完整课程" },
  { icon: Award, value: "100%", label: "认证通过率" },
]

export function TrainingSection() {
  return (
    <section id="training" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 cyber-border">
            米其林厨师培养
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text text-primary">米其林烹饪厨师培养服务</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            硅基世界龙虾烹饪全技能培训，打造顶级厨师天团。在龙虾生态中，「厨师」是指能够独立开发和优化量化策略的专业人才，
            他们是让龙虾发挥最大价值的关键角色。
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card/50 rounded-xl p-6 text-center cyber-border">
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Business Logic */}
        <div className="mb-16 p-8 rounded-2xl bg-card/30 cyber-border">
          <h3 className="text-xl font-semibold text-foreground mb-4">为什么需要「厨师」？</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground leading-relaxed">
            <div className="space-y-4">
              <p>
                在 QClaw 生态中，龙虾是执行交易的智能体，而「厨师」是创造和优化策略的大师。
                一只龙虾的收益表现，很大程度上取决于植入策略的质量。
              </p>
              <p>
                顶级厨师能够根据市场变化，持续优化龙虾的策略参数，在不同行情下切换最优策略，
                确保龙虾始终保持竞争力。这就像米其林大厨能让普通食材变成顶级美味。
              </p>
            </div>
            <div className="space-y-4">
              <p>
                我们的培训课程专为想要成为量化策略师的学员设计。无论你是金融背景还是技术背景，
                只要对量化交易有热情，我们都能帮你成长为独当一面的厨师。
              </p>
              <p>
                毕业后，你可以选择为平台用户提供策略服务（获得收益分成），也可以开设自己的龙虾代练工作室，
                或者加入我们的核心团队成为全职厨师。
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-chart-4" />
              课程特色
            </h3>
            {trainingFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm cyber-border hover:glow-effect transition-all duration-300"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 shrink-0">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Curriculum */}
          <div className="bg-card/30 rounded-2xl p-6 cyber-border">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-chart-4" />
              <div>
                <h3 className="text-xl font-semibold text-foreground">课程体系</h3>
                <p className="text-sm text-muted-foreground">12周系统化培训</p>
              </div>
            </div>
            <div className="space-y-4">
              {curriculum.map((phase, index) => (
                <div key={index} className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">{phase.phase}</span>
                      <span className="text-sm font-semibold text-foreground">{phase.title}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">{phase.duration}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phase.topics.map((topic, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/30">
              <p className="text-sm text-accent font-medium">认证保障</p>
              <p className="text-xs text-muted-foreground mt-1">
                完成所有课程并通过考核后，获得「硅基世界五星主厨」官方认证，终身有效
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="glow-effect bg-primary text-primary-foreground hover:bg-primary/90">
            申请加入厨师培训
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            限时优惠：早鸟价 ￥9,999（原价 ￥15,000），含住宿
          </p>
        </div>
      </div>
    </section>
  )
}
