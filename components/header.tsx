"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { name: "领虾营", href: "/#adoption", sub: "ShrimpSeed" },
  { name: "造虾局", href: "/#custom", sub: "AlphaForge" },
  { name: "量虾铺", href: "/#products", sub: "LobsterOS" },
  { name: "AI量化学院", href: "/academy", sub: "AI Quant Academy" },
  { name: "虾交所", href: "/exchange", sub: "CrayfishEx" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 h-16 bg-background/85 backdrop-blur-xl border-b border-white/[0.06]">
      <Link href="/" className="flex items-center gap-2.5 font-mono text-sm font-bold text-primary tracking-wider">
        <span className="text-xl">🦞</span>
        <span>量虾星球</span>
        <span className="text-muted-foreground mx-0.5">/</span>
        <span>QClaw</span>
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="rounded-full px-3 py-2 text-[15px] font-medium text-foreground/80 transition-all duration-200 tracking-[0.08em] hover:bg-white/[0.05] hover:text-primary"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center gap-2.5">
        <ThemeToggle compact />
        <Button asChild variant="outline" size="sm" className="font-mono text-xs border-primary/30 text-primary hover:bg-primary/10 tracking-wider">
          <Link href="/academy">查看课程</Link>
        </Button>
        <Button asChild size="sm" className="font-mono text-xs bg-primary text-primary-foreground hover:opacity-90 hover:-translate-y-0.5 transition-all tracking-wider">
          <Link href="/#academy">返回学院板块 →</Link>
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-foreground p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/[0.06] md:hidden">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-base font-medium text-foreground/85 transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-white/[0.06]">
              <ThemeToggle />
              <Button asChild variant="outline" size="sm" className="font-mono text-xs border-primary/30 text-primary">
                <Link href="/academy">查看课程</Link>
              </Button>
              <Button asChild size="sm" className="font-mono text-xs bg-primary text-primary-foreground">
                <Link href="/#academy">返回学院板块 →</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
