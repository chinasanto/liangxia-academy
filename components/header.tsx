"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "领虾营", href: "#adoption", sub: "ShrimpSeed" },
  { name: "造虾局", href: "#custom", sub: "AlphaForge" },
  { name: "量虾铺", href: "#products", sub: "LobsterOS" },
  { name: "量虾学院", href: "#academy", sub: "QClaw Academy" },
  { name: "虾交所", href: "/exchange", sub: "CrayfishEx" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 h-16 bg-background/85 backdrop-blur-xl border-b border-white/[0.06]">
      <Link href="#" className="flex items-center gap-2.5 font-mono text-sm font-bold text-primary tracking-wider">
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
              className="text-[13px] font-light text-muted-foreground hover:text-primary transition-colors tracking-wide"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center gap-2.5">
        <Button asChild variant="outline" size="sm" className="font-mono text-xs border-primary/30 text-primary hover:bg-primary/10 tracking-wider">
          <Link href="/academy">查看课程</Link>
        </Button>
        <Button asChild size="sm" className="font-mono text-xs bg-primary text-primary-foreground hover:opacity-90 hover:-translate-y-0.5 transition-all tracking-wider">
          <Link href="/admin">课程后台 →</Link>
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
                className="text-sm font-light text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-white/[0.06]">
              <Button asChild variant="outline" size="sm" className="font-mono text-xs border-primary/30 text-primary">
                <Link href="/academy">查看课程</Link>
              </Button>
              <Button asChild size="sm" className="font-mono text-xs bg-primary text-primary-foreground">
                <Link href="/admin">课程后台 →</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
