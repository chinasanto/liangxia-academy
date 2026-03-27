"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    tier: "STARTER",
    name: "体验版",
    price: "¥999",
    period: "/ 年 · 适合领虾营新用户",
    features: [
      "1 个智能体",
      "单一大模型",
      "QClaw 云服务",
      "基础文档",
    ],
    featured: false
  },
  {
    tier: "STANDARD",
    name: "标准版",
    price: "¥2999",
    period: "/ 年 · 适合小团队日常",
    features: [
      "3 个智能体",
      "多模型切换",
      "专属服务器 7×24h",
      "培训教程",
      "7 天技术支持",
    ],
    featured: true
  },
  {
    tier: "ENTERPRISE",
    name: "企业版",
    price: "定 制",
    period: "/ 企业深度定制",
    features: [
      "无限量智能体",
      "私有化部署",
      "专属云资源",
      "多智能体协同",
      "上门培训 + 专属支持群",
    ],
    featured: false
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 lg:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-[10px] tracking-[0.18em] text-primary block mb-3.5">
            {"// QClaw 云服务套餐"}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-black leading-tight text-foreground">
            选择你的<span className="text-primary">起点</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground font-light leading-relaxed max-w-lg">
            配合量虾星球五大服务使用，tokens 费用根据大模型另计。
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl">
          {plans.map((plan) => (
            <div
              key={plan.tier}
              className={`relative bg-card border rounded-lg p-8 transition-all hover:-translate-y-0.5 ${plan.featured
                  ? 'border-primary bg-gradient-to-br from-primary/[0.06] to-transparent'
                  : 'border-white/[0.06] hover:border-primary/30'
                }`}
            >
              {plan.featured && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-mono text-[10px] font-bold px-3.5 py-1 rounded-b-md tracking-wider">
                  最受欢迎
                </div>
              )}

              <div className="font-mono text-[11px] text-muted-foreground tracking-[0.14em] mb-1.5">
                {plan.tier}
              </div>

              <div className="font-serif text-xl font-black text-foreground mb-5">
                {plan.name}
              </div>

              <div className="font-mono text-4xl font-bold text-primary mb-1 leading-none">
                {plan.price}
              </div>

              <div className="text-xs text-muted-foreground mb-6">
                {plan.period}
              </div>

              <ul className="flex flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[13px] text-muted-foreground font-light leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" className="font-mono text-[13px] font-bold px-8 py-6 bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,229,176,0.3)] transition-all tracking-wider">
            立即领养第一只量化龙虾 →
          </Button>
          <p className="mt-4 text-xs text-muted-foreground font-mono">
            {"// 领虾营 · ShrimpSeed · 零门槛起步"}
          </p>
        </div>
      </div>
    </section>
  )
}
