"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, TrendingDown, ShoppingCart, Tag, ArrowUpRight, Shield, Zap, BarChart3, ArrowLeftRight } from "lucide-react"

const lobsters = [
  { id: "QC-0001", name: "乔布斯龙虾", type: "金融科技系", level: "S+", price: 28888, change: 12.5, attack: 95, defense: 78, speed: 88, intellect: 99, seller: "AlphaForge" },
  { id: "QC-0002", name: "马斯克龙虾", type: "金融科技系", level: "S", price: 18888, change: 8.3, attack: 92, defense: 65, speed: 95, intellect: 98, seller: "造虾局VIP" },
  { id: "QC-0003", name: "西门吹雪龙虾", type: "武侠宗师系", level: "S+", price: 32888, change: -2.1, attack: 99, defense: 45, speed: 98, intellect: 85, seller: "剑客工坊" },
  { id: "QC-0004", name: "悟空型龙虾", type: "成品系", level: "A+", price: 8888, change: 5.6, attack: 90, defense: 70, speed: 92, intellect: 75, seller: "虾货铺官方" },
  { id: "QC-0005", name: "唐僧型龙虾", type: "成品系", level: "A", price: 6888, change: 3.2, attack: 60, defense: 85, speed: 65, intellect: 95, seller: "虾货铺官方" },
  { id: "QC-0006", name: "巴菲特龙虾", type: "金融科技系", level: "SS", price: 88888, change: 25.8, attack: 75, defense: 90, speed: 70, intellect: 100, seller: "传奇工坊" },
]

const recentTrades = [
  { time: "14:32:05", name: "马斯克龙虾", price: 18500, type: "buy" },
  { time: "14:31:22", name: "悟空型龙虾", price: 8888, type: "sell" },
  { time: "14:30:18", name: "西门吹雪龙虾", price: 33000, type: "buy" },
  { time: "14:28:45", name: "乔布斯龙虾", price: 28000, type: "buy" },
  { time: "14:25:33", name: "唐僧型龙虾", price: 6500, type: "sell" },
]

const categories = ["全部", "金融科技系", "武侠宗师系", "成品系", "限量版"]

export function ExchangeSection() {
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [selectedLobster, setSelectedLobster] = useState(lobsters[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLobsters = lobsters.filter(l => {
    const matchesCategory = selectedCategory === "全部" || l.type === selectedCategory
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="exchange" className="py-24 lg:py-32 bg-card relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-10">
          <span className="font-mono text-[10px] tracking-[0.18em] text-primary block mb-3.5">
            {"// 01 · 虾链场 · CRAYFISHEX"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-foreground mb-4">
            赛博龙虾<span className="text-primary">纳斯达克</span>
          </h2>
          <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-2xl">
            Asset ID 链上挂牌，C2C 自由流通，买入·卖出·升级套利一站完成。每只龙虾都有独立 ID，链上登记确保资产安全透明。
            平台安全撮合，保障交易。模式跑通，降低投资风险。成本控制，利润空间最大化。
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "24h 成交额", value: "¥1,280,000", icon: BarChart3 },
            { label: "在售龙虾", value: "3,256", icon: Tag },
            { label: "活跃用户", value: "12,580", icon: Zap },
            { label: "安全交易", value: "99.9%", icon: Shield },
          ].map((stat) => (
            <div key={stat.label} className="bg-background border border-white/[0.06] rounded-lg p-4 flex items-center gap-3">
              <stat.icon className="w-5 h-5 text-primary shrink-0" />
              <div className="min-w-0">
                <div className="font-mono text-base sm:text-lg font-bold text-foreground truncate">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Market List */}
          <div className="lg:col-span-2 bg-background border border-white/[0.06] rounded-lg overflow-hidden">
            {/* Search & Filter */}
            <div className="p-4 border-b border-white/[0.06]">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="搜索龙虾名称或 ID..." 
                    className="pl-9 bg-card border-white/[0.06] text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors ${
                        selectedCategory === cat 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-card text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Header - Hidden on mobile */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 bg-card/50 text-xs font-mono text-muted-foreground border-b border-white/[0.06]">
              <div className="col-span-5">龙虾</div>
              <div className="col-span-2 text-right">等级</div>
              <div className="col-span-3 text-right">价格</div>
              <div className="col-span-2 text-right">涨跌</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/[0.06] max-h-[400px] overflow-y-auto">
              {filteredLobsters.map((lobster) => (
                <div 
                  key={lobster.id}
                  onClick={() => setSelectedLobster(lobster)}
                  className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-4 py-4 cursor-pointer transition-colors hover:bg-card ${
                    selectedLobster.id === lobster.id ? 'bg-primary/5 border-l-2 border-primary' : ''
                  }`}
                >
                  <div className="sm:col-span-5 flex items-center justify-between sm:block">
                    <div>
                      <div className="font-medium text-foreground text-sm">{lobster.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{lobster.id}</div>
                    </div>
                    <span className={`sm:hidden inline-block px-2 py-0.5 rounded text-xs font-mono ${
                      lobster.level.includes('S') ? 'bg-primary/20 text-primary' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {lobster.level}
                    </span>
                  </div>
                  <div className="hidden sm:block sm:col-span-2 text-right">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-mono ${
                      lobster.level.includes('S') ? 'bg-primary/20 text-primary' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {lobster.level}
                    </span>
                  </div>
                  <div className="sm:col-span-3 flex items-center justify-between sm:block sm:text-right">
                    <span className="sm:hidden text-xs text-muted-foreground">价格</span>
                    <span className="font-mono text-sm text-foreground">¥{lobster.price.toLocaleString()}</span>
                  </div>
                  <div className={`sm:col-span-2 flex items-center justify-between sm:justify-end gap-1 font-mono text-sm ${
                    lobster.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <span className="sm:hidden text-xs text-muted-foreground">涨跌</span>
                    <span className="flex items-center gap-1">
                      {lobster.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {lobster.change >= 0 ? '+' : ''}{lobster.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Detail Panel */}
          <div className="bg-background border border-white/[0.06] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-white/[0.06]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-muted-foreground">{selectedLobster.id}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                  selectedLobster.level.includes('S') ? 'bg-primary/20 text-primary' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {selectedLobster.level}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">{selectedLobster.name}</h3>
              <p className="text-xs text-muted-foreground">{selectedLobster.type} · 卖家: {selectedLobster.seller}</p>
            </div>

            {/* Attributes */}
            <div className="p-4 border-b border-white/[0.06]">
              <div className="text-xs font-mono text-muted-foreground mb-3">属性面板</div>
              <div className="space-y-3">
                {[
                  { label: "攻击", value: selectedLobster.attack, color: "bg-red-400" },
                  { label: "防御", value: selectedLobster.defense, color: "bg-blue-400" },
                  { label: "速度", value: selectedLobster.speed, color: "bg-green-400" },
                  { label: "智力", value: selectedLobster.intellect, color: "bg-purple-400" },
                ].map((attr) => (
                  <div key={attr.label} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-8">{attr.label}</span>
                    <div className="flex-1 h-2 bg-card rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${attr.color} rounded-full transition-all duration-500`}
                        style={{ width: `${attr.value}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-foreground w-8 text-right">{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Actions */}
            <div className="p-4">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-primary">¥{selectedLobster.price.toLocaleString()}</span>
                <span className={`font-mono text-sm ${selectedLobster.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedLobster.change >= 0 ? '+' : ''}{selectedLobster.change}%
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  立即购买
                </Button>
                <Button variant="outline" className="flex-1 border-white/[0.06] font-mono text-sm">
                  <Tag className="w-4 h-4 mr-2" />
                  出价竞拍
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trades */}
        <div className="mt-6 bg-background border border-white/[0.06] rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-muted-foreground">{"// 实时成交"}</span>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentTrades.map((trade, i) => (
              <div key={i} className="flex-shrink-0 bg-card rounded-lg px-4 py-2 border border-white/[0.06] min-w-[160px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground font-mono">{trade.time}</span>
                  <span className={`text-xs font-mono ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.type === 'buy' ? '买入' : '卖出'}
                  </span>
                </div>
                <div className="text-sm text-foreground font-medium">{trade.name}</div>
                <div className="font-mono text-xs text-primary">¥{trade.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Logic */}
        <div className="mt-12 bg-background/50 rounded-xl p-6 sm:p-8 border border-white/[0.06]">
          <h3 className="font-serif text-xl font-bold text-foreground mb-6">交易所运营机制</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ArrowLeftRight, title: "C2C 安全撮合", desc: "平台采用智能撮合引擎，买卖双方直接交易。所有龙虾资产由平台托管，确保交易完成后才释放资产和资金，杜绝诈骗风险。" },
              { icon: TrendingUp, title: "动态定价系统", desc: "龙虾价格由市场供需决定，同时参考龙虾等级、技能稀有度、历史收益等因素。系统提供实时价格指导，帮助你做出明智决策。" },
              { icon: Shield, title: "资产确权保障", desc: "每只龙虾都有唯一的链上身份标识，所有交易记录永久保存。你可以追溯龙虾的完整历史，包括训练记录、收益表现等。" },
              { icon: BarChart3, title: "增值套利空间", desc: "购入低级龙虾后可通过培训提升等级和技能，再以更高价格出售。平台提供培训服务对接，让你的龙虾不断增值。" },
            ].map((item) => (
              <div key={item.title} className="space-y-3">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-primary shrink-0" />
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
