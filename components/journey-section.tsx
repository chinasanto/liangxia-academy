"use client"

const steps = [
  {
    num: "01",
    title: "领虾营 · 领养入门",
    desc: "零基础用户，¥999/年领养基础量化龙虾，QClaw 云托管，无需服务器。"
  },
  {
    num: "02",
    title: "AI量化学院 · 技能升级",
    desc: "系统学习 AI 刀法、量化因子工程，硅基五星主厨认证，让你的虾更值钱。"
  },
  {
    num: "03",
    title: "虾货铺 · 即插即用",
    desc: "购入成品高阶龙虾，四大人格直接部署，跳过培养周期，即战。"
  },
  {
    num: "04",
    title: "造虾局 + 虾链场 · 生态闭环",
    desc: "定制专属 Alpha 因子，升级完成后挂牌虾链场套利，资产持续增值。"
  },
]

const funnel = [
  { cn: "领虾营", en: "ShrimpSeed · ¥999/yr", color: "#4D9EFF" },
  { cn: "AI量化学院", en: "AI Quant Academy", color: "#F5A623" },
  { cn: "虾货铺", en: "LobsterOS · Ready", color: "#FF4D6A" },
  { cn: "造虾局", en: "AlphaForge · VIP", color: "#9B7EFF" },
  { cn: "虾链场", en: "CrayfishEx · Profit", color: "#00E5B0" },
]

export function JourneySection() {
  return (
    <section id="journey" className="py-24 lg:py-32 bg-card relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Steps */}
          <div>
            <div className="mb-14">
              <span className="font-mono text-[10px] tracking-[0.18em] text-primary block mb-3.5">
                {"// 用户进化路径"}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-black leading-tight text-foreground">
                每只虾都有<span className="text-primary">成长轨迹</span>
              </h2>
              <p className="mt-3 text-sm text-muted-foreground font-light leading-relaxed max-w-lg">
                从零门槛领养到专业级定制，量虾星球为每个阶段设计了最优路径。
              </p>
            </div>

            <div className="flex flex-col">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className={`flex gap-5 py-6 cursor-pointer hover:pl-2 transition-all border-white/[0.06] ${i === 0 ? 'border-t' : ''} border-b`}
                >
                  <span className="font-mono text-[11px] text-primary min-w-7 pt-1">
                    {step.num}
                  </span>
                  <div>
                    <div className="font-serif text-lg font-bold text-foreground mb-1.5">
                      {step.title}
                    </div>
                    <div className="text-[13px] text-muted-foreground leading-relaxed font-light">
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Funnel Visual */}
          <div className="bg-popover border border-primary/30 rounded-xl p-10 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-16 -right-16 w-72 h-72 bg-[radial-gradient(circle,rgba(0,229,176,0.1)_0%,transparent_70%)]" />

            <div className="relative z-10">
              <div className="font-mono text-[10px] text-muted-foreground tracking-[0.12em] mb-5">
                {"// 量虾星球生态漏斗"}
              </div>

              {funnel.map((item, i) => (
                <div key={item.cn}>
                  <div
                    className="flex items-center gap-3.5 px-4 py-3.5 rounded-md bg-card border border-white/[0.06] mb-2 hover:border-[var(--item-color)] transition-colors"
                    style={{ "--item-color": item.color } as React.CSSProperties}
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-serif text-[15px] font-bold text-foreground">{item.cn}</span>
                    <span className="font-mono text-[10px] text-muted-foreground ml-auto">{item.en}</span>
                  </div>
                  {i < funnel.length - 1 && (
                    <div className="text-center text-muted-foreground text-sm font-mono my-1.5">↓</div>
                  )}
                </div>
              ))}

              <div className="mt-5 p-3.5 bg-primary/[0.06] rounded-md border border-primary/30">
                <div className="font-mono text-[10px] text-primary mb-1.5">{"// 生态保障"}</div>
                <div className="text-xs text-muted-foreground leading-relaxed font-light">
                  QClaw 云服务托管 · 7×24h 在线<br />
                  所有套餐 tokens 费用另计<br />
                  企业版支持私有化部署
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
