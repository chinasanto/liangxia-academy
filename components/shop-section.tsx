"use client"

import { Store, Zap, Shield, Users, Crown, Swords, Heart, Anchor, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const personalities = [
  {
    type: "悟空型",
    en: "Wukong Type",
    subtitle: "战力巅峰",
    icon: Swords,
    color: "#FF4D6A",
    traits: ["高攻击力", "敏捷", "突破能力强"],
    desc: "如同齐天大圣般战斗力爆表，善于在市场中主动出击，捕捉稍纵即逝的机会。适合追求高收益、能承受高波动的激进型投资者。",
    stats: { attack: 95, defense: 60, speed: 90, intellect: 70 },
    price: "¥8,888",
    suitable: ["趋势突破策略", "日内交易", "高频套利"],
  },
  {
    type: "唐僧型",
    en: "TangSeng Type",
    subtitle: "战略引领",
    icon: Crown,
    color: "#9B7EFF",
    traits: ["领导力", "大局观", "风控优秀"],
    desc: "具备卓越的领导力和战略眼光，能够洞察市场大势，做出正确的方向性判断。适合作为策略组合的核心，统领全局。",
    stats: { attack: 55, defense: 85, speed: 60, intellect: 98 },
    price: "¥6,888",
    suitable: ["资产配置", "宏观策略", "组合管理"],
  },
  {
    type: "猪八戒型",
    en: "Bajie Type",
    subtitle: "团队黏合",
    icon: Heart,
    color: "#00E5B0",
    traits: ["情商高", "协作能力", "平衡稳健"],
    desc: "看似憨厚实则精明，善于在团队中起到润滑作用。在策略组合中提供平衡，降低整体波动，是最佳的风险分散助手。",
    stats: { attack: 70, defense: 80, speed: 65, intellect: 75 },
    price: "¥5,888",
    suitable: ["风险对冲", "市场中性", "稳健配置"],
  },
  {
    type: "沙僧型",
    en: "ShaWujing Type",
    subtitle: "稳定续航",
    icon: Anchor,
    color: "#4D9EFF",
    traits: ["可靠", "持久", "低回撤"],
    desc: "沉稳可靠，任劳任怨，默默创造稳定收益。虽然不会一鸣惊人，但胜在持久稳定，是长期投资的理想选择。",
    stats: { attack: 60, defense: 90, speed: 55, intellect: 80 },
    price: "¥4,888",
    suitable: ["长期持有", "定投策略", "稳健理财"],
  },
]

export function ShopSection() {
  return (
    <section id="shop" className="py-24 lg:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-[10px] tracking-[0.18em] text-[#FF4D6A] block mb-3.5">
            {"// 04 · 虾货铺 · LOBSTEROS"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-foreground mb-4">
            四大人格<span className="text-[#FF4D6A]">即插即用</span>
          </h2>
          <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-2xl">
            虾货铺提供经过专业培训的成品龙虾，四种人格类型覆盖不同投资风格。
            与定制龙虾不同，成品龙虾开箱即用，无需漫长的培育周期。
            每只龙虾都经过严格的实盘测试，天生圣体，扫码即战。适合想要快速上手的投资者。
          </p>
        </div>

        {/* Personality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {personalities.map((p) => (
            <div 
              key={p.type}
              className="bg-card border border-white/[0.06] rounded-xl overflow-hidden hover:border-[var(--p-color)]/50 transition-colors"
              style={{ "--p-color": p.color } as React.CSSProperties}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${p.color}20` }}
                    >
                      <p.icon className="w-7 h-7" style={{ color: p.color }} />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground">{p.type}</h3>
                      <p className="text-xs text-muted-foreground font-mono">{p.en} · {p.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xl font-bold" style={{ color: p.color }}>{p.price}</span>
                    <p className="text-xs text-muted-foreground">起</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.traits.map((trait) => (
                    <span 
                      key={trait}
                      className="text-[10px] px-2 py-0.5 rounded font-mono"
                      style={{ backgroundColor: `${p.color}15`, color: p.color }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[
                    { label: "攻击", value: p.stats.attack },
                    { label: "防御", value: p.stats.defense },
                    { label: "速度", value: p.stats.speed },
                    { label: "智力", value: p.stats.intellect },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                      <div className="h-1.5 bg-background rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ width: `${stat.value}%`, backgroundColor: p.color }}
                        />
                      </div>
                      <div className="font-mono text-xs mt-1" style={{ color: p.color }}>{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Suitable for */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="text-xs text-muted-foreground mb-2">适用场景</div>
                  <div className="flex flex-wrap gap-2">
                    {p.suitable.map((s) => (
                      <span key={s} className="text-xs px-2 py-1 bg-background rounded text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background/50 border-t border-white/[0.06] flex gap-2">
                <Button 
                  className="flex-1 font-mono text-sm"
                  style={{ backgroundColor: p.color, color: 'white' }}
                >
                  立即购买
                </Button>
                <Button variant="outline" className="flex-1 font-mono text-sm border-white/[0.06]">
                  了解详情
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="bg-card border border-white/[0.06] rounded-xl p-6 sm:p-8 mb-12">
          <h3 className="font-serif text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Store className="w-5 h-5 text-[#FF4D6A]" />
            成品龙虾 vs 定制龙虾
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background rounded-lg p-6 border border-white/[0.06]">
              <h4 className="font-semibold text-foreground mb-4">成品龙虾（虾货铺）</h4>
              <ul className="space-y-3">
                {[
                  "开箱即用，无培育周期",
                  "四种人格类型可选",
                  "经过实盘验证",
                  "价格透明，性价比高",
                  "适合新手快速上手",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-[#FF4D6A]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background rounded-lg p-6 border border-white/[0.06]">
              <h4 className="font-semibold text-foreground mb-4">定制龙虾（造虾局）</h4>
              <ul className="space-y-3">
                {[
                  "一对一基因培育",
                  "完全个性化策略",
                  "独特性带来溢价空间",
                  "VIP 专属服务",
                  "适合追求极致的专业玩家",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-[#9B7EFF]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Business Logic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "为什么叫 LobsterOS？", desc: "OS 代表 Operating System。每只成品龙虾都预装了完整的策略系统，像操作系统一样稳定可靠。你只需要「安装」它，它就能自动运行，为你创造收益。" },
            { icon: Shield, title: "质量保障", desc: "所有成品龙虾都经过至少 6 个月的实盘测试，回撤控制在预期范围内才能上架。我们提供 30 天无理由退换服务，确保你的购买零风险。" },
            { icon: Users, title: "组合搭配", desc: "四大人格各有所长，建议搭配使用以发挥最大效果。例如：唐僧型统领全局 + 悟空型主攻 + 沙僧型稳健打底，形成攻守兼备的策略矩阵。" },
          ].map((item) => (
            <div key={item.title} className="bg-card/50 border border-white/[0.06] rounded-lg p-6">
              <item.icon className="w-6 h-6 text-[#FF4D6A] mb-4" />
              <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
