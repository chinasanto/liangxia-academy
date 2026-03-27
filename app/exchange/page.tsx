"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Tag,
  ArrowUpRight,
  Shield,
  Zap,
  BarChart3,
  ArrowLeftRight,
  Filter,
  ChevronLeft,
  Star,
  Clock,
  Users,
  Activity,
  Wallet,
  Bell,
  Settings,
  History,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  Gavel,
} from "lucide-react"

// Expanded lobster data for the exchange
const allLobsters = [
  { id: "QC-0001", name: "乔布斯龙虾", type: "金融科技系", level: "S+", price: 28888, change: 12.5, attack: 95, defense: 78, speed: 88, intellect: 99, seller: "AlphaForge", listed: "2小时前", views: 1245, favorites: 89, rarity: "传说" },
  { id: "QC-0002", name: "马斯克龙虾", type: "金融科技系", level: "S", price: 18888, change: 8.3, attack: 92, defense: 65, speed: 95, intellect: 98, seller: "造虾局VIP", listed: "5小时前", views: 892, favorites: 67, rarity: "史诗" },
  { id: "QC-0003", name: "西门吹雪龙虾", type: "武侠宗师系", level: "S+", price: 32888, change: -2.1, attack: 99, defense: 45, speed: 98, intellect: 85, seller: "剑客工坊", listed: "1天前", views: 2156, favorites: 156, rarity: "传说" },
  { id: "QC-0004", name: "悟空型龙虾", type: "成品系", level: "A+", price: 8888, change: 5.6, attack: 90, defense: 70, speed: 92, intellect: 75, seller: "虾货铺官方", listed: "3小时前", views: 567, favorites: 34, rarity: "稀有" },
  { id: "QC-0005", name: "唐僧型龙虾", type: "成品系", level: "A", price: 6888, change: 3.2, attack: 60, defense: 85, speed: 65, intellect: 95, seller: "虾货铺官方", listed: "6小时前", views: 423, favorites: 28, rarity: "稀有" },
  { id: "QC-0006", name: "巴菲特龙虾", type: "金融科技系", level: "SS", price: 88888, change: 25.8, attack: 75, defense: 90, speed: 70, intellect: 100, seller: "传奇工坊", listed: "12小时前", views: 3890, favorites: 312, rarity: "传说" },
  { id: "QC-0007", name: "李白型龙虾", type: "武侠宗师系", level: "S", price: 22888, change: 6.7, attack: 88, defense: 55, speed: 94, intellect: 92, seller: "诗仙工坊", listed: "8小时前", views: 1023, favorites: 78, rarity: "史诗" },
  { id: "QC-0008", name: "诸葛亮龙虾", type: "策略大师系", level: "SS", price: 68888, change: 15.3, attack: 70, defense: 88, speed: 75, intellect: 100, seller: "卧龙阁", listed: "4小时前", views: 2567, favorites: 198, rarity: "传说" },
  { id: "QC-0009", name: "沙僧型龙虾", type: "成品系", level: "B+", price: 3888, change: 1.2, attack: 55, defense: 90, speed: 50, intellect: 70, seller: "虾货铺官方", listed: "2天前", views: 234, favorites: 15, rarity: "普通" },
  { id: "QC-0010", name: "八戒型龙虾", type: "成品系", level: "A", price: 5888, change: -1.5, attack: 75, defense: 80, speed: 60, intellect: 65, seller: "虾货铺官方", listed: "1天前", views: 345, favorites: 22, rarity: "稀有" },
  { id: "QC-0011", name: "索罗斯龙虾", type: "金融科技系", level: "S+", price: 45888, change: 18.9, attack: 85, defense: 70, speed: 88, intellect: 98, seller: "对冲基金会", listed: "10小时前", views: 1876, favorites: 134, rarity: "史诗" },
  { id: "QC-0012", name: "风清扬龙虾", type: "武侠宗师系", level: "SS", price: 78888, change: 8.5, attack: 98, defense: 60, speed: 100, intellect: 95, seller: "华山派", listed: "6小时前", views: 2890, favorites: 267, rarity: "传说" },
]

const recentTrades = [
  { time: "14:32:05", name: "马斯克龙虾", price: 18500, type: "buy", buyer: "用户***88" },
  { time: "14:31:22", name: "悟空型龙虾", price: 8888, type: "sell", buyer: "用户***56" },
  { time: "14:30:18", name: "西门吹雪龙虾", price: 33000, type: "buy", buyer: "用户***23" },
  { time: "14:28:45", name: "乔布斯龙虾", price: 28000, type: "buy", buyer: "用户***91" },
  { time: "14:25:33", name: "唐僧型龙虾", price: 6500, type: "sell", buyer: "用户***77" },
  { time: "14:22:10", name: "巴菲特龙虾", price: 85000, type: "buy", buyer: "用户***45" },
  { time: "14:18:55", name: "李白型龙虾", price: 22000, type: "sell", buyer: "用户***12" },
  { time: "14:15:30", name: "诸葛亮龙虾", price: 68000, type: "buy", buyer: "用户***34" },
]

const categories = ["全部", "金融科技系", "武侠宗师系", "策略大师系", "成品系", "限量版"]
const sortOptions = ["最新上架", "价格从低到高", "价格从高到低", "热度最高", "涨幅最大"]

export default function ExchangePage() {
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [selectedLobster, setSelectedLobster] = useState(allLobsters[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("最新上架")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [showFilters, setShowFilters] = useState(false)

  const filteredLobsters = allLobsters.filter((l) => {
    const matchesCategory = selectedCategory === "全部" || l.type === selectedCategory
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMinPrice = !priceRange.min || l.price >= Number(priceRange.min)
    const matchesMaxPrice = !priceRange.max || l.price <= Number(priceRange.max)
    return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice
  })

  const sortedLobsters = [...filteredLobsters].sort((a, b) => {
    switch (sortBy) {
      case "价格从低到高":
        return a.price - b.price
      case "价格从高到低":
        return b.price - a.price
      case "热度最高":
        return b.views - a.views
      case "涨幅最大":
        return b.change - a.change
      default:
        return 0
    }
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "传说":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "史诗":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "稀有":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">返回首页</span>
              </Link>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xl">🦞</span>
                <span className="font-mono text-sm font-bold text-primary tracking-wider">虾交所</span>
                <span className="text-muted-foreground text-xs">/</span>
                <span className="text-muted-foreground text-xs">CrayfishEx</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <History className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:flex gap-2 border-primary/30 text-primary">
                <Wallet className="w-4 h-4" />
                连接钱包
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Settings className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">设置</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Banner */}
      <div className="border-b border-white/[0.06] bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: "24h 成交额", value: "¥1,280,000", icon: BarChart3, change: "+12.5%" },
              { label: "在售龙虾", value: "3,256", icon: Tag, change: "+156" },
              { label: "活跃用户", value: "12,580", icon: Users, change: "+2.3%" },
              { label: "安全交易", value: "99.9%", icon: Shield, change: null },
              { label: "24h 成交量", value: "458", icon: Activity, change: "+8.7%" },
              { label: "平均成交价", value: "¥15,680", icon: TrendingUp, change: "+5.2%" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <stat.icon className="w-5 h-5 text-primary shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-foreground">{stat.value}</span>
                    {stat.change && (
                      <span className={`text-xs ${stat.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-white/[0.06] sticky top-24">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    筛选条件
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground"
                    onClick={() => {
                      setSelectedCategory("全部")
                      setPriceRange({ min: "", max: "" })
                      setSearchQuery("")
                    }}
                  >
                    重置
                  </Button>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索龙虾名称或 ID..."
                    className="pl-9 bg-background border-white/[0.06] text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Categories */}
                <div className="mb-4">
                  <label className="text-xs text-muted-foreground mb-2 block">分类</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition-colors ${selectedCategory === cat
                            ? "bg-primary text-primary-foreground"
                            : "bg-background text-muted-foreground hover:text-foreground border border-white/[0.06]"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <label className="text-xs text-muted-foreground mb-2 block">价格区间</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="最低"
                      className="bg-background border-white/[0.06] text-sm"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="number"
                      placeholder="最高"
                      className="bg-background border-white/[0.06] text-sm"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    />
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">排序方式</label>
                  <div className="space-y-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSortBy(option)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${sortBy === option
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-background"
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="market" className="w-full">
              <TabsList className="w-full bg-card border border-white/[0.06] mb-4">
                <TabsTrigger value="market" className="flex-1">市场列表</TabsTrigger>
                <TabsTrigger value="auction" className="flex-1">竞拍专区</TabsTrigger>
                <TabsTrigger value="trending" className="flex-1">热门趋势</TabsTrigger>
              </TabsList>

              <TabsContent value="market" className="mt-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    共 <span className="text-foreground font-medium">{sortedLobsters.length}</span> 只龙虾在售
                  </span>
                </div>

                {/* Lobster Grid */}
                <div className="space-y-3">
                  {sortedLobsters.map((lobster) => (
                    <Card
                      key={lobster.id}
                      onClick={() => setSelectedLobster(lobster)}
                      className={`bg-card border-white/[0.06] cursor-pointer transition-all hover:border-primary/30 ${selectedLobster.id === lobster.id ? "border-primary/50 bg-primary/5" : ""
                        }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {/* Lobster Avatar */}
                          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                            <span className="text-3xl">🦞</span>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div>
                                <h4 className="font-medium text-foreground">{lobster.name}</h4>
                                <p className="text-xs text-muted-foreground font-mono">{lobster.id}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getRarityColor(lobster.rarity)}>{lobster.rarity}</Badge>
                                <span
                                  className={`px-2 py-0.5 rounded text-xs font-mono ${lobster.level.includes("S")
                                      ? "bg-primary/20 text-primary"
                                      : "bg-amber-500/20 text-amber-400"
                                    }`}
                                >
                                  {lobster.level}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                              <span>{lobster.type}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {lobster.listed}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {lobster.views}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <span className="font-mono text-lg font-bold text-primary">
                                  ¥{lobster.price.toLocaleString()}
                                </span>
                                <span
                                  className={`flex items-center gap-1 font-mono text-sm ${lobster.change >= 0 ? "text-green-400" : "text-red-400"
                                    }`}
                                >
                                  {lobster.change >= 0 ? (
                                    <TrendingUp className="w-3 h-3" />
                                  ) : (
                                    <TrendingDown className="w-3 h-3" />
                                  )}
                                  {lobster.change >= 0 ? "+" : ""}
                                  {lobster.change}%
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                  <Heart className="w-4 h-4" />
                                </Button>
                                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                  购买
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="auction" className="mt-0">
                <div className="text-center py-12">
                  <Gavel className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">竞拍专区即将上线</h3>
                  <p className="text-sm text-muted-foreground">稀有龙虾竞拍功能正在开发中，敬请期待</p>
                </div>
              </TabsContent>

              <TabsContent value="trending" className="mt-0">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">今日热门龙虾</h4>
                  {allLobsters
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((lobster, index) => (
                      <div
                        key={lobster.id}
                        className="flex items-center gap-4 p-3 rounded-lg bg-card border border-white/[0.06]"
                      >
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{lobster.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {lobster.views} 次浏览 · {lobster.favorites} 收藏
                          </p>
                        </div>
                        <span className="font-mono text-sm text-primary">¥{lobster.price.toLocaleString()}</span>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Detail & Trades */}
          <div className="lg:col-span-1 space-y-4">
            {/* Selected Lobster Detail */}
            <Card className="bg-card border-white/[0.06]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-muted-foreground">{selectedLobster.id}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <span className="text-6xl">🦞</span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-xl font-bold text-foreground">{selectedLobster.name}</h3>
                    <Badge className={getRarityColor(selectedLobster.rarity)}>{selectedLobster.rarity}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selectedLobster.type} · 卖家: {selectedLobster.seller}
                  </p>
                </div>

                {/* Attributes */}
                <div className="space-y-2 mb-4">
                  {[
                    { label: "攻击", value: selectedLobster.attack, color: "bg-red-400" },
                    { label: "防御", value: selectedLobster.defense, color: "bg-blue-400" },
                    { label: "速度", value: selectedLobster.speed, color: "bg-green-400" },
                    { label: "智力", value: selectedLobster.intellect, color: "bg-purple-400" },
                  ].map((attr) => (
                    <div key={attr.label} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-8">{attr.label}</span>
                      <div className="flex-1 h-1.5 bg-card rounded-full overflow-hidden">
                        <div
                          className={`h-full ${attr.color} rounded-full transition-all duration-500`}
                          style={{ width: `${attr.value}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-foreground w-6 text-right">{attr.value}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-mono text-2xl font-bold text-primary">
                    ¥{selectedLobster.price.toLocaleString()}
                  </span>
                  <span
                    className={`font-mono text-sm ${selectedLobster.change >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                  >
                    {selectedLobster.change >= 0 ? "+" : ""}
                    {selectedLobster.change}%
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    立即购买
                  </Button>
                  <Button variant="outline" className="w-full border-white/[0.06] font-mono text-sm">
                    <Tag className="w-4 h-4 mr-2" />
                    出价竞拍
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>平台安全托管</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>链上资产确权</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Trades */}
            <Card className="bg-card border-white/[0.06]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-muted-foreground">{"// 实时成交"}</span>
                  <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {recentTrades.map((trade, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.06] last:border-0">
                      <div>
                        <p className="text-sm text-foreground">{trade.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {trade.time} · {trade.buyer}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm text-foreground">¥{trade.price.toLocaleString()}</p>
                        <p className={`text-xs ${trade.type === "buy" ? "text-green-400" : "text-red-400"}`}>
                          {trade.type === "buy" ? "买入" : "卖出"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trading Info Section */}
        <div className="mt-12 bg-card/50 rounded-xl p-6 sm:p-8 border border-white/[0.06]">
          <h3 className="font-serif text-xl font-bold text-foreground mb-6">交易所运营机制</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ArrowLeftRight,
                title: "C2C 安全撮合",
                desc: "平台采用智能撮合引擎，买卖双方直接交易。所有龙虾资产由平台托管，确保交易完成后才释放资产和资金，杜绝诈骗风险。",
              },
              {
                icon: TrendingUp,
                title: "动态定价系统",
                desc: "龙虾价格由市场供需决定，同时参考龙虾等级、技能稀有度、历史收益等因素。系统提供实时价格指导，帮助你做出明智决策。",
              },
              {
                icon: Shield,
                title: "资产确权保障",
                desc: "每只龙虾都有唯一的链上身份标识，所有交易记录永久保存。你可以追溯龙虾的完整历史，包括训练记录、收益表现等。",
              },
              {
                icon: BarChart3,
                title: "增值套利空间",
                desc: "购入低级龙虾后可通过培训提升等级和技能，再以更高价格出售。平台提供培训服务对接，让你的龙虾不断增值。",
              },
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

        {/* Help & Support */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
          <Link href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <AlertCircle className="w-4 h-4" />
            交易指南
          </Link>
          <span className="hidden sm:block">·</span>
          <Link href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Shield className="w-4 h-4" />
            安全保障
          </Link>
          <span className="hidden sm:block">·</span>
          <Link href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <Zap className="w-4 h-4" />
            费率说明
          </Link>
        </div>
      </div>
    </div>
  )
}
