'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Scroll reveal ────────────────────────────────────────────────────────────
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); ob.disconnect() } },
      { threshold }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [threshold])

  return { ref, visible }
}

// ─── Counter animation ────────────────────────────────────────────────────────
export function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setValue(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return value
}

// ─── Toast ────────────────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'info'
interface Toast { id: number; message: string; type: ToastType }

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const add = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }, [])
  return { toasts, add }
}

// ─── LocalStorage cart ────────────────────────────────────────────────────────
export function useLocalCart<T>(key: string, initial: T[] = []) {
  const [items, setItems] = useState<T[]>(() => {
    if (typeof window === 'undefined') return initial
    try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? initial }
    catch { return initial }
  })

  const save = useCallback((next: T[]) => {
    setItems(next)
    localStorage.setItem(key, JSON.stringify(next))
  }, [key])

  return [items, save] as const
}

// ─── Typed text ───────────────────────────────────────────────────────────────
export function useTyped(phrases: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phase % phrases.length]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause)
        }
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length === 0) { setDeleting(false); setPhase(p => p + 1) }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [text, deleting, phase, phrases, speed, pause])

  return text
}
