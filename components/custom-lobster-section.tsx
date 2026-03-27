"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sword, TrendingUp, Dna, ArrowRight, Sparkles, Beaker, Settings2, Target } from "lucide-react"

const lobsterSeries = [
  {
    name: "乔布斯龙虾",
    series: "金融科技系",
    icon: TrendingUp,
    description: "降维打击的硅基大脑，商业嗅觉拉满，自带财富增值光环。擅长捕捉市场趋势，在复杂金融环境中做出精准决策。",
    traits: ["巴菲特", "西蒙斯", "乔布斯", "马斯克", "特斯拉"],
    attributes: [
      "价值投资基因：长期持有，稳健增值",
      "量化分析模块：数据驱动的投资决策",
      "市场预判系统：提前布局优质标的",
    ],
    color: "text-chart-4",
    bgColor: "bg-chart-4/20",
    borderColor: "border-chart-4/30",
    price: "￥15,000起",
  },
  {
    name: "西门吹雪龙虾",
    series: "武侠宗师系",
    icon: Sword,
    description: "极致物理面板，出神入化的武学刀工，战斗与口感双绝。在高频交易中展现惊人的执行力和精准度。",
    traits: ["大刀王五", "小李飞刀", "西门吹雪", "中原一点红"],
    attributes: [
      "闪电出击：毫秒级交易响应",
      "精准刀法：高胜率套利策略",
      "心如止水：情绪隔离，纯理性执行",
    ],
    color: "text-primary",
    bgColor: "bg-primary/20",
    borderColor: "border-primary/30",
    price: "￥18,000起",
  },
  {
    name: "马斯克龙虾",
    series: "创新先锋系",
    icon: Dna,
    description: "硅基世界的钢铁战士，融合最前沿科技，引领 Web 4.0 浪潮。擅长发现颠覆性投资机会，高风险高收益。",
    traits: ["特斯拉大脑", "SpaceX引擎", "Neuralink芯片"],
    attributes: [
      "颠覆性思维：发现下一个百倍标的",
      "风险偏好：高波动高收益策略",
      "技术前瞻：提前布局前沿赛道",
    ],
    color: "text-accent",
    bgColor: "bg-accent/20",
    borderColor: "border-accent/30",
    price: "￥25,000起",
  },
]

const processSteps = [
  {
    icon: Target,
    title: "需求诊断",
    description: "深度沟通了解你的投资风格、风险偏好、资金规模，为你推荐最适合的龙虾基因组合。",
  },
  {
    icon: Beaker,
    title: "基因培育",
    description: "根据定制方案，在基因培育舱中进行 DNA 定制。融合多种优秀基因，打造独一无二的龙虾。",
  },
  {
    icon: Settings2,
    title: "策略调教",
    description: "专业代练团队进行 30 天集中训练，植入你指定的交易策略，确保龙虾完全符合你的交易风格。",
  },
  {
    icon: Sparkles,
    title: "交付运营",
    description: "完成所有测试后交付使用。我们提供 90 天跟踪服务，持续优化龙虾表现，确保稳定收益。",
  },
]

export function CustomLobsterSection() {
  return (
    <section id="custom" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 cyber-border">
            高端定制服务
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text text-primary">高端定制养虾服务</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            顶级代练团队，构建你的 Web 4.0 专属龙虾天团。我们提供一对一 DNA 定制服务，
            根据你的投资风格、风险偏好和收益目标，打造完全属于你的量化交易龙虾。
          </p>
        </div>

        {/* Business Logic Intro */}
        <div className="mb-16 p-8 rounded-2xl bg-card/30 cyber-border">
          <h3 className="text-xl font-semibold text-foreground mb-4">什么是高端定制龙虾？</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                与基础量化龙虾不同，高端定制龙虾是完全根据你的需求从零打造的专属资产。
                我们的基因工程师会分析你的投资偏好，为你选择最合适的基因组合——
                无论是巴菲特的价值投资理念，还是西蒙斯的量化交易智慧。
              </p>
              <p>
                每只定制龙虾都经过严格的「30天集训期」，由 WCA 认证的顶级代练团队进行策略植入和优化调教。
                我们确保龙虾在交付时已经完全适应你的交易环境，能够立即投入实战。
              </p>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                核心保障：只有你想不到，没有我们代练不到。无论是高频套利、趋势跟踪、网格交易还是跨市场对冲，
                我们都能为你的龙虾植入相应的策略基因。
              </p>
              <p>
                深度赋能：每只定制龙虾都配备专属的「龙虾管家」，提供 7x24 小时监控服务、
                定期策略优化报告、以及紧急风控介入机制，让你的投资高枕无忧。
              </p>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">定制流程</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-card/50 backdrop-blur-sm cyber-border h-full">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-4">
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <h4 className="text-base font-semibold text-foreground mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lobster Series Cards */}
        <h3 className="text-xl font-semibold text-foreground text-center mb-8">热门基因系列</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lobsterSeries.map((lobster, index) => (
            <Card 
              key={index} 
              className={`bg-card/50 backdrop-blur-sm cyber-border hover:glow-effect transition-all duration-300 ${lobster.borderColor}`}
            >
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${lobster.bgColor} mb-4`}>
                  <lobster.icon className={`h-7 w-7 ${lobster.color}`} />
                </div>
                <Badge variant="secondary" className="mb-3">
                  {lobster.series}
                </Badge>
                <h3 className="text-xl font-semibold text-foreground mb-2">{lobster.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{lobster.description}</p>
                
                {/* Attributes */}
                <div className="space-y-2 mb-4">
                  {lobster.attributes.map((attr, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className={`mt-1.5 h-1.5 w-1.5 rounded-full ${lobster.bgColor}`} />
                      <span className="text-xs text-muted-foreground">{attr}</span>
                    </div>
                  ))}
                </div>

                {/* Traits */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {lobster.traits.map((trait, i) => (
                    <span 
                      key={i} 
                      className={`text-xs px-2 py-1 rounded-full ${lobster.bgColor} ${lobster.color}`}
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <span className="text-sm text-muted-foreground">起步价</span>
                  <span className={`text-lg font-bold ${lobster.color}`}>{lobster.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="glow-effect bg-primary text-primary-foreground hover:bg-primary/90">
            预约定制咨询
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            专属顾问将在 24 小时内与你联系
          </p>
        </div>
      </div>
    </section>
  )
}
