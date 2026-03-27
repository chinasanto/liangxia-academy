"use client"

import { Dna, Sparkles, Settings, Rocket, Brain, Zap, Target, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"

const lobsterTypes = [
  { 
    name: "乔布斯龙虾", 
    en: "Jobs Lobster",
    icon: Sparkles,
    traits: ["产品思维", "极致审美", "用户洞察"],
    desc: "拥有颠覆性产品思维，能够洞察用户未被满足的需求，创造划时代的交易策略。适合追求极致用户体验的量化产品打造。",
    color: "#4D9EFF"
  },
  { 
    name: "马斯克龙虾", 
    en: "Musk Lobster",
    icon: Rocket,
    traits: ["第一性原理", "跨界融合", "激进增长"],
    desc: "从底层物理定律出发重构交易逻辑，善于跨市场套利，追求指数级增长。适合需要打破常规、实现爆发式收益的场景。",
    color: "#FF4D6A"
  },
  { 
    name: "西门吹雪龙虾", 
    en: "Ximen Lobster",
    icon: Target,
    traits: ["一击必杀", "精准狙击", "冷静"],
    desc: "剑法通神，出手必中。在关键时刻能够精准捕捉最佳入场点，一击制胜。适合波动大、机会稀缺的高风险市场。",
    color: "#00E5B0"
  },
  { 
    name: "巴菲特龙虾", 
    en: "Buffett Lobster",
    icon: Crown,
    traits: ["价值投资", "长期主义", "复利思维"],
    desc: "深谙价值投资之道，能够穿越牛熊周期。专注发现被低估的资产，通过长期持有实现财富复利增长。适合稳健型投资者。",
    color: "#F5A623"
  },
]

const process = [
  { step: "01", title: "需求诊断", desc: "深度访谈了解你的投资理念、风险偏好、收益目标，制定专属培育方案。" },
  { step: "02", title: "基因培育", desc: "在 DNA 培育舱中注入定制基因序列，包括策略模型、风控参数、市场适应性等核心基因。" },
  { step: "03", title: "策略调教", desc: "顶级量化工程师一对一调教，通过历史回测和模拟盘验证策略有效性，反复迭代优化。" },
  { step: "04", title: "交付运营", desc: "完成内部审核后正式交付，提供 90 天跟踪优化服务，确保龙虾在实盘中稳定运行。" },
]

export function ForgeSection() {
  return (
    <section id="forge" className="py-24 lg:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-[10px] tracking-[0.18em] text-[#9B7EFF] block mb-3.5">
            {"// 02 · 造虾局 · ALPHAFORGE"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-foreground mb-4">
            一对一<span className="text-[#9B7EFF]">DNA 定制</span>
          </h2>
          <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-2xl">
            造虾局是量虾星球的高端定制服务，为 VIP 用户打造独一无二的专属龙虾。我们从基因层面出发，
            结合你的投资理念和风格，培育出真正属于你的 Alpha 因子。每只定制龙虾都是艺术品级别的量化资产，
            独特性、稀缺性、收益性三位一体。
          </p>
        </div>

        {/* Lobster Types */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {lobsterTypes.map((lobster) => (
            <div 
              key={lobster.name}
              className="bg-card border border-white/[0.06] rounded-lg p-6 hover:border-[var(--lobster-color)] transition-colors group"
              style={{ "--lobster-color": lobster.color } as React.CSSProperties}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${lobster.color}20` }}
              >
                <lobster.icon className="w-6 h-6" style={{ color: lobster.color }} />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-1">{lobster.name}</h3>
              <p className="font-mono text-[10px] text-muted-foreground tracking-wider mb-3">{lobster.en}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {lobster.traits.map((trait) => (
                  <span 
                    key={trait}
                    className="text-[10px] px-2 py-0.5 rounded font-mono"
                    style={{ backgroundColor: `${lobster.color}15`, color: lobster.color }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{lobster.desc}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="bg-card border border-white/[0.06] rounded-xl p-6 sm:p-8 mb-12">
          <h3 className="font-serif text-xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Dna className="w-5 h-5 text-[#9B7EFF]" />
            定制流程
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <div key={item.step} className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-2xl font-bold text-[#9B7EFF]">{item.step}</span>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block flex-1 h-px bg-gradient-to-r from-[#9B7EFF]/50 to-transparent" />
                  )}
                </div>
                <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#9B7EFF]/10 to-transparent border border-[#9B7EFF]/30 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">准备打造你的专属龙虾？</h3>
            <p className="text-sm text-muted-foreground">预约 VIP 专属顾问，开启一对一定制之旅</p>
          </div>
          <Button className="bg-[#9B7EFF] text-white hover:bg-[#9B7EFF]/90 font-mono text-sm shrink-0">
            预约咨询 →
          </Button>
        </div>

        {/* Business Logic */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "为什么选择定制？", desc: "市面上的标准化策略往往同质化严重，当策略被广泛复制后，Alpha 会迅速衰减。定制龙虾从基因层面独特，确保你的策略在市场中保持竞争优势。" },
            { icon: Settings, title: "定制 vs 成品", desc: "成品龙虾（虾货铺）适合快速上手，定制龙虾适合追求极致的专业玩家。定制服务提供全程一对一服务，策略与你的投资哲学深度融合，是真正的 VIP 体验。" },
            { icon: Zap, title: "投资回报", desc: "定制龙虾的初期投入较高，但长期来看，独特性带来的超额收益远超成本。顶级龙虾在虾链场的交易溢价通常达到 3-10 倍，具有极高的资产增值空间。" },
          ].map((item) => (
            <div key={item.title} className="bg-card/50 border border-white/[0.06] rounded-lg p-6">
              <item.icon className="w-6 h-6 text-[#9B7EFF] mb-4" />
              <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
