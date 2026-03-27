"use client"

import { useState } from "react"
import { Sprout, Database, ArrowLeftRight, BarChart3, Settings, Check, Cloud, Shield, Zap, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Database,
    title: "数据接入",
    desc: "一键接入主流行情数据源，支持股票、期货、加密货币等多市场实时数据。",
    details: ["实时行情数据", "历史K线数据", "财务数据接口", "自定义数据源"],
  },
  {
    icon: ArrowLeftRight,
    title: "交易执行",
    desc: "对接主流券商和交易所 API，支持自动化交易执行。",
    details: ["多券商对接", "自动下单", "风险控制", "交易记录"],
  },
  {
    icon: BarChart3,
    title: "基础分析",
    desc: "内置常用技术指标和因子，支持基础策略回测。",
    details: ["技术指标库", "因子模板", "回测引擎", "收益分析"],
  },
  {
    icon: Settings,
    title: "策略配置",
    desc: "可视化策略配置界面，无需编程即可搭建简单策略。",
    details: ["拖拽式配置", "参数调优", "定时任务", "告警通知"],
  },
]

const steps = [
  { num: "1", title: "注册账号", desc: "完成身份验证" },
  { num: "2", title: "选择套餐", desc: "体验版 ¥999/年" },
  { num: "3", title: "一键部署", desc: "30秒完成安装" },
  { num: "4", title: "开始运行", desc: "云端自动托管" },
]

export function AdoptionSection() {
  const [isInstalling, setIsInstalling] = useState(false)
  const [installStep, setInstallStep] = useState(0)

  const handleInstall = () => {
    setIsInstalling(true)
    setInstallStep(0)
    const installSteps = ["正在初始化环境...", "配置数据接入...", "部署交易模块...", "启动龙虾系统..."]

    installSteps.forEach((_, i) => {
      setTimeout(() => {
        setInstallStep(i + 1)
        if (i === installSteps.length - 1) {
          setTimeout(() => {
            setIsInstalling(false)
            setInstallStep(0)
          }, 1500)
        }
      }, (i + 1) * 1000)
    })
  }

  return (
    <section id="adopt" className="py-24 lg:py-32 bg-card relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-[10px] tracking-[0.18em] text-[#4D9EFF] block mb-3.5">
            {"// 05 · 领虾营 · SHRIMPSEED"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-foreground mb-4">
            领养第一只<span className="text-[#4D9EFF]">量化龙虾</span>
          </h2>
          <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-2xl">
            领虾营是量虾星球的入门服务，也是生态漏斗的顶层入口。零门槛领养你的第一只量化龙虾，
            基础因子模板开箱即用，QClaw 云服务托管，无需自建服务器。¥999/年起，
            学会养虾再升级，是最佳的量化交易入门方式。
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-background border border-white/[0.06] rounded-lg p-6 hover:border-[#4D9EFF]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[#4D9EFF]/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-[#4D9EFF]" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{feature.desc}</p>
              <ul className="space-y-1.5">
                {feature.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 text-[#4D9EFF] shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* One-Click Install */}
        <div className="bg-gradient-to-br from-[#4D9EFF]/10 to-transparent border border-[#4D9EFF]/30 rounded-xl p-6 sm:p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">一键安装，30秒上线</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                QClaw 云服务让你无需关心服务器配置、环境搭建等技术细节。
                只需点击按钮，系统会自动完成所有部署工作，30秒内你的龙虾就能开始运行。
                7×24小时云端托管，随时随地查看运行状态。
              </p>

              <div className="flex flex-wrap gap-4 text-sm mb-6">
                {[
                  { icon: Cloud, text: "云端托管" },
                  { icon: Shield, text: "安全可靠" },
                  { icon: Zap, text: "即时生效" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-[#4D9EFF]" />
                    <span className="text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>

              <Button
                className="bg-[#4D9EFF] text-white hover:bg-[#4D9EFF]/90 font-mono text-sm"
                onClick={handleInstall}
                disabled={isInstalling}
              >
                {isInstalling ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    安装中...
                  </>
                ) : (
                  <>
                    <Sprout className="w-4 h-4 mr-2" />
                    一键领养 · ¥999/年
                  </>
                )}
              </Button>
            </div>

            {/* Install Progress */}
            <div className="bg-background rounded-lg p-6 border border-white/[0.06]">
              <div className="font-mono text-xs text-muted-foreground mb-4">{"// 安装进度"}</div>
              <div className="space-y-4">
                {["初始化环境", "配置数据接入", "部署交易模块", "启动龙虾系统"].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono ${installStep > i
                        ? 'bg-[#4D9EFF] text-white'
                        : installStep === i && isInstalling
                          ? 'bg-[#4D9EFF]/20 text-[#4D9EFF] animate-pulse'
                          : 'bg-card text-muted-foreground'
                      }`}>
                      {installStep > i ? <Check className="w-3 h-3" /> : i + 1}
                    </div>
                    <span className={`text-sm ${installStep > i ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step}
                    </span>
                    {installStep === i + 1 && isInstalling && i < 3 && (
                      <Loader2 className="w-4 h-4 text-[#4D9EFF] animate-spin ml-auto" />
                    )}
                    {installStep > i && (
                      <Check className="w-4 h-4 text-[#4D9EFF] ml-auto" />
                    )}
                  </div>
                ))}
              </div>
              {installStep === 4 && !isInstalling && (
                <div className="mt-4 p-3 rounded bg-[#4D9EFF]/10 border border-[#4D9EFF]/30">
                  <p className="text-sm text-[#4D9EFF] font-mono">安装完成！你的龙虾已上线运行。</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Start Steps */}
        <div className="bg-background border border-white/[0.06] rounded-xl p-6 sm:p-8 mb-12">
          <h3 className="font-serif text-xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Sprout className="w-5 h-5 text-[#4D9EFF]" />
            快速上手
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#4D9EFF]/10 border border-[#4D9EFF]/30 flex items-center justify-center font-mono text-lg font-bold text-[#4D9EFF]">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden md:block w-4 h-4 text-muted-foreground absolute right-0 top-3" />
                  )}
                </div>
                <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Business Logic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Sprout, title: "为什么叫「领养」？", desc: "我们希望用户与龙虾建立情感连接。龙虾不是冷冰冰的工具，而是你的量化伙伴。通过「领养」这个动作，你开始了一段养成之旅，龙虾会随着你的技能提升而成长。" },
            { icon: Cloud, title: "QClaw 云服务", desc: "QClaw 是量虾星球的底层技术基础设施，提供智能体托管服务。你无需购买服务器，无需配置环境，只需要专注于策略本身。所有套餐的 tokens 费用根据使用的大模型另计。" },
            { icon: ArrowRight, title: "升级路径", desc: "领虾营是入门的第一步。当你掌握了基础技能，可以进入AI量化学院深造；想要更强大的龙虾，可以去虾货铺购买成品或造虾局定制；龙虾增值后，还能去虾链场交易获利。" },
          ].map((item) => (
            <div key={item.title} className="bg-background/50 border border-white/[0.06] rounded-lg p-6">
              <item.icon className="w-6 h-6 text-[#4D9EFF] mb-4" />
              <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
