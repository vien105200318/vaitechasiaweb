'use client'

import { useEffect, useState, type ReactNode } from 'react'
import type { ToastType } from '@/hooks/useDemo'

// ─── Toast container ──────────────────────────────────────────────────────────
interface ToastItem { id: number; message: string; type: ToastType }

export function ToastContainer({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold shadow-2xl pointer-events-auto
            animate-[slideInRight_0.3s_ease] backdrop-blur-sm border
            ${t.type === 'success' ? 'bg-green-900/90 border-green-500/40 text-green-200'
              : t.type === 'error' ? 'bg-red-900/90 border-red-500/40 text-red-200'
              : 'bg-slate-900/90 border-white/20 text-white'}`}>
          <span className="material-symbols-outlined text-base" style={{fontVariationSettings:"'FILL' 1"}}>
            {t.type === 'success' ? 'check_circle' : t.type === 'error' ? 'error' : 'info'}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  )
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  from?: 'bottom' | 'left' | 'right' | 'top'
  onClick?: () => void
}

export function Reveal({ children, className = '', delay = 0, from = 'bottom', onClick }: RevealProps) {
  const [visible, setVisible] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref) return
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); ob.disconnect() } }, { threshold: 0.1 })
    ob.observe(ref)
    return () => ob.disconnect()
  }, [ref])

  const transforms = { bottom: 'translateY(32px)', top: 'translateY(-32px)', left: 'translateX(-32px)', right: 'translateX(32px)' }

  return (
    <div ref={setRef} className={className} onClick={onClick}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transforms[from],
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}>
      {children}
    </div>
  )
}

// ─── Back button ─────────────────────────────────────────────────────────────
export function DemoBackButton() {
  return (
    <div className="fixed top-4 right-4 z-[100]">
      <a href="/templates"
        className="flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Templates
      </a>
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-white/8 rounded ${className}`} />
}

// ─── Number counter ───────────────────────────────────────────────────────────
export function CountUp({ target, suffix = '', duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const [ref, setRef] = useState<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (!ref) return
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); ob.disconnect() } }, { threshold: 0.5 })
    ob.observe(ref)
    return () => ob.disconnect()
  }, [ref])

  useEffect(() => {
    if (!started) return
    let startTime: number
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(step)
      else setValue(target)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return <span ref={setRef}>{value.toLocaleString()}{suffix}</span>
}
