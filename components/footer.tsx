"use client"

import Link from "next/link"
import { Shell, Github, Twitter, MessageCircle } from "lucide-react"

const footerLinks = {
  服务: [
    { name: "高端定制养虾", href: "/#custom" },
    { name: "成品龙虾服务", href: "/#products" },
    { name: "龙虾流通交易", href: "/exchange" },
    { name: "AI量化学院课程", href: "/academy" },
  ],
  资源: [
    { name: "课程中心", href: "/academy" },
    { name: "学院量化技巧", href: "/academy/insights" },
    { name: "返回首页", href: "/" },
    { name: "帮助中心", href: "#" },
    { name: "路线图", href: "#" },
  ],
  公司: [
    { name: "关于我们", href: "#about" },
    { name: "联系方式", href: "#" },
    { name: "隐私政策", href: "#" },
    { name: "服务条款", href: "#" },
  ],
}

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Github", icon: Github, href: "#" },
  { name: "Discord", icon: MessageCircle, href: "#" },
]

export function Footer() {
  return (
    <footer id="about" className="relative border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <Shell className="h-8 w-8 text-primary" />
                  <div className="absolute inset-0 blur-md bg-primary/30 rounded-full" />
                </div>
                <span className="text-xl font-bold neon-text">QClaw</span>
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary hover:bg-primary/20 transition-colors"
                  >
                    <social.icon className="h-5 w-5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-foreground mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 AI Quant Academy. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  )
}
