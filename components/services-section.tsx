"use client"

import { Link2, Dna, GraduationCap, Store, Sprout, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    num: "01",
    icon: Link2,
    cn: "虾 链 场",
    en: "CRAYFISHEX",
    type: "量化龙虾交易所",
    desc: "赛博龙虾纳斯达克。Asset ID 链上挂牌，C2C 自由流通，买入·卖出·升级套利一站完成。安全透明，保障每一笔交易。",
    color: "teal",
    size: "large",
    href: "#exchange"
  },
  {
    num: "02",
    icon: Dna,
    cn: "造 虾 局",
    en: "ALPHAFORGE",
    type: "高端基因定制",
    desc: "一对一 DNA 培育舱。乔布斯·马斯克·西门吹雪，顶级代练打造专属 Alpha 天团。",
    color: "purple",
    size: "medium",
    href: "#forge"
  },
  {
    num: "03",
    icon: GraduationCap,
    cn: "AI量化学院",
    en: "AI QUANT ACADEMY",
    type: "厨师培养",
    desc: "AI 刀法·激光火候·VR 全沉浸教学，毕业获硅基五星主厨认证。",
    color: "amber",
    size: "small",
    href: "#academy"
  },
  {
    num: "04",
    icon: Store,
    cn: "虾 货 铺",
    en: "LOBSTEROS · READY-TO-DEPLOY",
    type: "成品龙虾",
    desc: "四大职场人格即插即用：悟空型战力之王 / 唐僧型战略引领 / 猪八戒型团队黏合 / 沙僧型稳定续航。天生圣体，扫码即战。",
    color: "red",
    size: "wide",
    href: "#shop"
  },
  {
    num: "05",
    icon: Sprout,
    cn: "领 虾 营",
    en: "SHRIMPSEED · ADOPT A LOBSTER",
    type: "免费领养 · 零门槛",
    desc: "领养第一只量化龙虾，基础因子模板开箱即用，QClaw 云服务托管，¥999/年起。生态漏斗顶层，学会养虾再升级。",
    color: "blue",
    size: "medium",
    href: "#adopt"
  },
]

const colorStyles = {
  teal: {
    border: "hover:border-[#00E5B0]",
    chip: "bg-[rgba(0,229,176,0.1)] text-[#00E5B0]",
    topLine: "bg-[#00E5B0]",
    arrow: "group-hover:text-[#00E5B0]"
  },
  purple: {
    border: "hover:border-[#9B7EFF]",
    chip: "bg-[rgba(155,126,255,0.1)] text-[#9B7EFF]",
    topLine: "bg-[#9B7EFF]",
    arrow: "group-hover:text-[#9B7EFF]"
  },
  amber: {
    border: "hover:border-[#F5A623]",
    chip: "bg-[rgba(245,166,35,0.1)] text-[#F5A623]",
    topLine: "bg-[#F5A623]",
    arrow: "group-hover:text-[#F5A623]"
  },
  red: {
    border: "hover:border-[#FF4D6A]",
    chip: "bg-[rgba(255,77,106,0.1)] text-[#FF4D6A]",
    topLine: "bg-[#FF4D6A]",
    arrow: "group-hover:text-[#FF4D6A]"
  },
  blue: {
    border: "hover:border-[#4D9EFF]",
    chip: "bg-[rgba(77,158,255,0.1)] text-[#4D9EFF]",
    topLine: "bg-[#4D9EFF]",
    arrow: "group-hover:text-[#4D9EFF]"
  },
}

const sizeStyles = {
  large: "col-span-12 md:col-span-5",
  medium: "col-span-12 md:col-span-4",
  small: "col-span-12 md:col-span-3",
  wide: "col-span-12 md:col-span-7",
}

export function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-[10px] tracking-[0.18em] text-primary block mb-3.5">
            {"// 五大生态服务"}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-black leading-tight text-foreground">
            量虾星球的<span className="text-primary">完整版图</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-lg">
            从零基础入门到专业级Alpha工厂，五个服务覆盖量化交易全生命周期。
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-12 gap-3">
          {services.map((service) => {
            const styles = colorStyles[service.color as keyof typeof colorStyles]
            const Icon = service.icon

            return (
              <Link
                key={service.num}
                href={service.href}
                className={`group relative bg-card border border-white/[0.06] rounded-lg p-8 cursor-pointer transition-all duration-300 hover:bg-popover hover:-translate-y-1 overflow-hidden ${sizeStyles[service.size as keyof typeof sizeStyles]} ${styles.border}`}
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${styles.topLine} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground block mb-5">
                  {service.num} · SERVICE
                </span>

                <Icon className="w-8 h-8 text-foreground mb-4" />

                <div className="font-serif text-2xl font-black text-foreground tracking-wider mb-1 leading-none">
                  {service.cn}
                </div>

                <span className="font-mono text-[11px] text-muted-foreground tracking-[0.1em] block mb-4">
                  {service.en}
                </span>

                <span className={`inline-block text-[10px] px-2.5 py-1 rounded font-mono tracking-wider mb-4 ${styles.chip}`}>
                  {service.type}
                </span>

                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>

                <ArrowUpRight className={`absolute bottom-6 right-6 w-5 h-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${styles.arrow}`} />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
