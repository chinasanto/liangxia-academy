"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, Heart, Shield, Zap, ArrowRight, Users, CheckCircle, Star } from "lucide-react"

const personalities = [
  {
    name: "悟空型",
    title: "战力巅峰",
    icon: Zap,
    description: "攻击力拉满，单挑无敌，适合高风险高收益策略。这类龙虾擅长捕捉短线机会，在高波动市场中展现惊人的盈利能力。",
    features: [
      "高频交易专精",
      "波动率套利",
      "杠杆策略执行",
    ],
    suitable: "适合风险偏好高、追求超额收益的投资者",
    color: "text-chart-5",
    bgColor: "bg-chart-5/20",
    stats: { risk: 90, reward: 95, stability: 40 },
  },
  {
    name: "唐僧型",
    title: "领导型龙虾",
    icon: Crown,
    description: "战略引领，掌控全盘。适合作为龙虾团队的核心决策者，协调多只龙虾协同作战，实现资产配置最优化。",
    features: [
      "多策略协调",
      "资产配置优化",
      "团队效能提升",
    ],
    suitable: "适合持有多只龙虾、需要统一管理的投资者",
    color: "text-chart-4",
    bgColor: "bg-chart-4/20",
    stats: { risk: 50, reward: 70, stability: 85 },
  },
  {
    name: "猪八戒型",
    title: "团队黏合型",
    icon: Heart,
    description: "情商爆表，构建和谐团队。这类龙虾擅长在不同策略之间建立连接，提升整体投资组合的协同效应。",
    features: [
      "跨策略对冲",
      "风险缓冲",
      "收益平滑",
    ],
    suitable: "适合追求稳健收益、需要风险对冲的投资者",
    color: "text-primary",
    bgColor: "bg-primary/20",
    stats: { risk: 60, reward: 65, stability: 75 },
  },
  {
    name: "沙僧型",
    title: "卷王续航",
    icon: Shield,
    description: "稳定输出，持久续航。适合长期稳健运营策略，在震荡市场中保持稳定收益，是投资组合的压舱石。",
    features: [
      "网格交易",
      "定投策略",
      "复利增长",
    ],
    suitable: "适合追求长期稳定收益的保守型投资者",
    color: "text-accent",
    bgColor: "bg-accent/20",
    stats: { risk: 30, reward: 55, stability: 95 },
  },
]

const advantages = [
  {
    icon: Star,
    title: "WCA 顶级厨师团队",
    description: "每只成品龙虾都经过 WCA（World Crayfish Association）认证团队的专业训练，确保策略执行精准无误。我们的代练师均有5年以上量化交易经验。",
  },
  {
    icon: Users,
    title: "大厂专家联合赋能",
    description: "阿里、腾讯、字节跳动等大厂量化专家组成战略顾问团，持续优化龙虾的算法逻辑，确保策略与时俱进，不被市场淘汰。",
  },
  {
    icon: CheckCircle,
    title: "即插即用，开箱即战",
    description: "成品龙虾已完成全部调教和测试，购买后只需连接你的交易所API，即可立即投入实战。无需任何技术背景，小白也能轻松驾驭。",
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 cyber-border">
            成品龙虾服务
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text text-primary">成品龙虾服务</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            四大职场人格适配，天生圣体即插即用。我们的成品龙虾已经过专业团队的深度调教，
            每一只都有明确的性格定位和策略特长，让你快速组建高效的量化交易团队。
          </p>
        </div>

        {/* Business Logic */}
        <div className="mb-16 p-8 rounded-2xl bg-card/30 cyber-border">
          <h3 className="text-xl font-semibold text-foreground mb-4">成品龙虾 vs 定制龙虾</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground leading-relaxed">
            <div className="space-y-4">
              <p>
                <span className="font-medium text-foreground">成品龙虾</span>是我们根据市场需求预先培育和训练好的龙虾，
                每只都有标准化的能力模型和策略配置。购买即可使用，无需等待培育周期。
              </p>
              <p>
                我们将成品龙虾分为四大职场人格：悟空型（进攻）、唐僧型（统筹）、猪八戒型（协调）、沙僧型（稳健），
                你可以根据自己的投资风格和团队配置需求进行选择。
              </p>
            </div>
            <div className="space-y-4">
              <p>
                相比定制龙虾，成品龙虾的价格更加亲民，交付周期更短（最快当日可用），
                适合想要快速入场或初次体验量化交易的用户。
              </p>
              <p>
                我们建议新手从成品龙虾开始，熟悉龙虾的运作模式后，再根据实际需求考虑定制升级。
                平台支持成品龙虾的二次调教和能力升级服务。
              </p>
            </div>
          </div>
        </div>

        {/* Personality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {personalities.map((personality, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm cyber-border hover:glow-effect transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${personality.bgColor} shrink-0`}>
                    <personality.icon className={`h-7 w-7 ${personality.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-foreground">{personality.name}</h3>
                      <Badge variant="secondary" className="text-xs">{personality.title}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{personality.description}</p>
                    
                    {/* Features */}
                    <div className="space-y-1 mb-4">
                      {personality.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className={`h-3.5 w-3.5 ${personality.color}`} />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(personality.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-1">
                            <div 
                              className={`h-full rounded-full ${personality.bgColor.replace('/20', '/60')}`}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {key === 'risk' ? '风险' : key === 'reward' ? '收益' : '稳定'}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-muted-foreground italic">{personality.suitable}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advantages */}
        <h3 className="text-xl font-semibold text-foreground text-center mb-8">核心赋能优势</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {advantages.map((advantage, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm cyber-border">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                  <advantage.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-base font-semibold text-foreground mb-2">{advantage.title}</h4>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="glow-effect bg-primary text-primary-foreground hover:bg-primary/90">
            浏览成品龙虾商城
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            新用户首单享 8 折优惠
          </p>
        </div>
      </div>
    </section>
  )
}
