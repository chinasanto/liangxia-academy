"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, Shell, Zap } from "lucide-react"

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [target, duration])

  return <span>{count}{suffix}</span>
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 pt-32 pb-20 text-center overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(0,229,176,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Eyebrow */}
      <div className="animate-fadeUp inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-primary border border-primary/30 px-3.5 py-1.5 rounded-full bg-primary/10 mb-10 relative z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
        WEB 4.0 · 量化智能生态平台
      </div>

      {/* Title */}
      <h1 className="animate-fadeUp delay-100 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-2 relative z-10">
        <span className="block text-foreground">构建你的</span>
        <span className="block text-primary neon-text">量虾星球</span>
      </h1>

      {/* English subtitle */}
      <p className="animate-fadeUp delay-200 font-mono text-[13px] text-muted-foreground tracking-[0.2em] mb-7 relative z-10">
        QCLAW · QUANT LOBSTER VERSE 4.0
      </p>

      {/* Description */}
      <p className="animate-fadeUp delay-300 max-w-lg text-[15px] font-light text-muted-foreground leading-relaxed mb-11 relative z-10">
        每只龙虾都是一笔 Alpha。<br />
        现在课程体系也已经接入 AI量化学院，<br />
        从课程上架到课程详情展示都能在同一个项目里完成。
      </p>

      {/* CTA Buttons */}
      <div className="animate-fadeUp delay-400 flex flex-col sm:flex-row gap-3 justify-center mb-20 relative z-10">
        <Button asChild size="lg" className="font-mono text-[13px] font-bold px-8 py-6 bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,229,176,0.3)] transition-all tracking-wider">
          <Link href="#academy">进入AI量化学院 →</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="font-mono text-[13px] px-8 py-6 border-white/15 bg-white/[0.04] text-foreground hover:bg-white/[0.08] hover:border-white/30 tracking-wider">
          <Link href="/exchange">进入虾交所</Link>
        </Button>
      </div>

      {/* Stats Row */}
      <div className="animate-fadeUp delay-500 grid grid-cols-1 sm:grid-cols-3 w-full max-w-2xl border border-white/[0.06] rounded-lg overflow-hidden relative z-10">
        <div className="bg-card p-7 text-center hover:bg-popover transition-colors border-b sm:border-b-0 sm:border-r border-white/[0.06]">
          <div className="text-lg mb-2.5"><TrendingUp className="w-5 h-5 mx-auto text-primary" /></div>
          <span className="font-mono text-3xl font-bold text-primary block mb-1">
            <AnimatedCounter target={500} suffix="%" />
          </span>
          <span className="text-xs text-muted-foreground">平均收益增长</span>
        </div>
        <div className="bg-card p-7 text-center hover:bg-popover transition-colors border-b sm:border-b-0 sm:border-r border-white/[0.06]">
          <div className="text-lg mb-2.5"><Shell className="w-5 h-5 mx-auto text-primary" /></div>
          <span className="font-mono text-3xl font-bold text-primary block mb-1">
            <AnimatedCounter target={10000} suffix="K+" />
          </span>
          <span className="text-xs text-muted-foreground">活跃龙虾资产</span>
        </div>
        <div className="bg-card p-7 text-center hover:bg-popover transition-colors">
          <div className="text-lg mb-2.5"><Zap className="w-5 h-5 mx-auto text-primary" /></div>
          <span className="font-mono text-3xl font-bold text-primary block mb-1">
            <AnimatedCounter target={99} suffix=".9%" />
          </span>
          <span className="text-xs text-muted-foreground">交易安全率</span>
        </div>
      </div>
    </section>
  )
}
