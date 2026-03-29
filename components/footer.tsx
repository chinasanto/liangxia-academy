"use client"

import Link from "next/link"
import { Github, Twitter, MessageCircle } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
        <div className="py-10 sm:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <SiteLogo className="h-9 w-9" />
                <span className="text-xl font-bold neon-text">QClaw</span>
              </div>
              <p className="mb-4 max-w-sm text-sm leading-7 text-muted-foreground">
                AI量化学院与量化技巧、课程体系和学习工具已经集中到同一套学习入口，方便按阶段持续深入。
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary transition-colors hover:bg-primary/20"
                  >
                    <social.icon className="h-5 w-5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <Accordion type="multiple" defaultValue={["服务", "资源", "公司"]} className="space-y-3">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <AccordionItem
                    key={category}
                    value={category}
                    className="overflow-hidden rounded-2xl border border-white/[0.08] bg-background/70 px-4"
                  >
                    <AccordionTrigger className="py-4 text-sm font-semibold text-foreground no-underline hover:no-underline">
                      {category}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <ul className="space-y-3">
                        {links.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              className="text-sm text-muted-foreground transition-colors hover:text-primary"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="hidden md:contents">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="mb-4 text-sm font-semibold text-foreground">{category}</h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-primary"
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
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-5 sm:flex-row sm:py-6">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            © 2026 AI Quant Academy. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  )
}
