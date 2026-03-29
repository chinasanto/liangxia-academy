'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const SHOW_AFTER_SCROLL = 520

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const syncVisibility = () => {
      setVisible(window.scrollY > SHOW_AFTER_SCROLL)
    }

    syncVisibility()
    window.addEventListener('scroll', syncVisibility, { passive: true })

    return () => {
      window.removeEventListener('scroll', syncVisibility)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="返回页面顶部"
      className={[
        'fixed bottom-20 right-4 z-[69] flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-background/95 text-foreground shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 md:hidden',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      ].join(' ')}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  )
}
