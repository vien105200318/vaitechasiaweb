'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Globe, Zap, Shield, Layers, ArrowUpRight, Star, Quote, Play } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useI18n } from '@/context/I18nContext'
import { useTheme } from '@/context/ThemeContext'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const dur = 2000
        const start = performance.now()
        const step = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(ease * target))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <div ref={ref} className="tabular-nums">{count.toLocaleString()}{suffix}</div>
}

const testimonials = [
  { name: 'Nguyễn Văn Hùng', role: 'CEO, Sunrise Coffee', quote: 'Doanh thu tăng 40% sau 3 tháng. Không chỉ đẹp — cực kỳ nhanh và khách hàng dễ đặt hàng hơn.', rating: 5 },
  { name: 'Trần Thị Mai', role: 'Marketing Director, Hotel Lotus', quote: 'Tốc độ tải từ 4s xuống dưới 1s. Tỷ lệ đặt phòng tăng gấp đôi. Support thực sự hiểu ngành hospitality.', rating: 5 },
  { name: 'Lê Hoàng Dũng', role: 'Founder, FreshMart', quote: 'AI Builder giúp tạo landing page cho chiến dịch mới trong 10 phút. Trước đây mất cả ngày.', rating: 5 },
]

export default function HomePage() {
  const { t, lang } = useI18n()
  const { theme } = useTheme()
  const [activeTest, setActiveTest] = useState(0)

  const nextTest = () => setActiveTest(p => (p + 1) % testimonials.length)
  const prevTest = () => setActiveTest(p => (p - 1 + testimonials.length) % testimonials.length)

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="hero-gradient absolute inset-0" />
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] animate-float"
            style={{ background: theme === 'dark' ? 'radial-gradient(circle, rgba(194,198,219,0.3), transparent)' : 'radial-gradient(circle, rgba(79,70,229,0.15), transparent)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
            style={{ background: theme === 'dark' ? 'radial-gradient(circle, rgba(194,198,219,0.2), transparent)' : 'radial-gradient(circle, rgba(79,70,229,0.1), transparent)', animation: 'float 6s ease-in-out infinite reverse' }} />
        </div>

        <div className="relative z-10 px-5 md:px-16 max-w-[1280px] mx-auto w-full">
          <div className="max-w-4xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider mb-8 border"
                style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--accent)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
                {t('hero.badge')}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-[44px] md:text-[80px] font-bold leading-[1.05] tracking-tight mb-8"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                {t('hero.title1')}{' '}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: theme === 'dark' ? 'linear-gradient(135deg, #c2c6db 0%, #8b8fa3 100%)' : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}>
                  {t('hero.title2')}
                </span>
                <br />
                {t('hero.title3')}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-lg md:text-xl max-w-2xl leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
                {t('hero.desc')}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold transition-all duration-300 active:scale-[0.97] hover:shadow-lg hover:shadow-[var(--accent)]/20"
                  style={{ background: 'var(--accent)', color: 'var(--accent-dim)' }}>
                  {t('hero.cta1')} <ArrowRight size={16} />
                </Link>
                <Link href="/templates"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold transition-all duration-300 active:scale-[0.97] border"
                  style={{ color: 'var(--text-secondary)', borderColor: 'var(--card-border)', background: 'var(--card-bg)' }}>
                  {t('hero.cta2')}
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs" style={{ color: 'var(--muted)' }}>
                {[t('hero.trust1'), t('hero.trust2'), t('hero.trust3')].map(item => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} style={{ color: 'var(--accent)' }} />{item}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Floating code card — desktop only */}
        <div className="hidden lg:block absolute right-[8%] top-[30%] w-72 rounded-2xl p-6 rotate-3 electric-glow"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(20px)' }}>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--accent)' }}>
              <Zap size={12} />VAITECH ENGINE
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded-full" style={{ background: 'var(--border-subtle)' }} />
              <div className="h-1.5 w-4/5 rounded-full" style={{ background: 'var(--border-subtle)' }} />
              <div className="h-1.5 w-3/5 rounded-full" style={{ background: 'var(--border-subtle)' }} />
            </div>
            <div className="text-[10px] font-bold tracking-widest mt-1" style={{ color: 'var(--muted)' }}>PERFORMANCE SCORE</div>
            <div className="text-3xl font-black" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>99.9<span className="text-sm font-normal" style={{ color: 'var(--muted)' }}>%</span></div>
          </div>
        </div>
      </section>

      {/* ═══════════ LOGOS BAR ═══════════ */}
      <section className="py-16 px-5 md:px-16 max-w-[1280px] mx-auto" aria-label="Partners">
        <ScrollReveal>
          <p className="text-xs font-semibold text-center mb-8 tracking-widest uppercase" style={{ color: 'var(--muted)' }}>{t('clients.title')}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-30">
            {['Sunrise Coffee', 'Hotel Lotus', 'FreshMart', 'TechViet', 'GreenLife', 'StyleHub'].map(name => (
              <div key={name} className="text-lg font-bold whitespace-nowrap transition-all duration-300 hover:opacity-100"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-secondary)' }}>
                {name}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="py-20 px-5 md:px-16 max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-[40px] font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('stats.title')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: 200, s: '+', l: t('stats.projects') },
              { v: 99, s: '.9%', l: t('stats.uptime') },
              { v: 50, s: '+', l: t('stats.partners') },
              { v: 1, s: 's', l: t('stats.speed'), prefix: '<' },
            ].map(stat => (
              <div key={stat.l} className="glass-card p-8 rounded-2xl text-center">
                <div className="text-4xl md:text-5xl font-black mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                  {stat.prefix || ''}<AnimatedCounter target={stat.v} />{stat.s}
                </div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>{stat.l}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="py-[120px] px-5 md:px-16 max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-semibold mb-4 block tracking-widest uppercase" style={{ color: 'var(--accent)' }}>{t('features.badge')}</span>
              <h2 className="text-3xl md:text-[40px] font-bold leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                {t('features.title')}
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{t('features.desc')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { Icon: Layers, title: t('f1.title'), desc: t('f1.desc'), cta: t('f1.cta') },
            { Icon: Play, title: t('f2.title'), desc: t('f2.desc'), cta: t('f2.cta') },
            { Icon: Zap, title: t('f3.title'), desc: t('f3.desc'), cta: t('f3.cta') },
          ].map((f, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="glass-card p-10 rounded-2xl group h-full cursor-pointer">
                <div className="mb-8 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  style={{ background: 'var(--surface-1)', color: 'var(--accent)' }}>
                  <f.Icon size={20} />
                </div>
                <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>{f.desc}</p>
                <div className="flex items-center gap-2 font-bold cursor-pointer transition-all text-sm group-hover:gap-4" style={{ color: 'var(--accent)' }}>
                  {f.cta} <ArrowRight size={16} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════ SHOWCASE ═══════════ */}
      <section className="py-[120px]" style={{ background: 'var(--surface-1)' }}>
        <div className="px-5 md:px-16 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal className="lg:col-span-5 order-2 lg:order-1">
              <div className="glass-card p-12 rounded-2xl">
                <h2 className="text-[36px] md:text-[40px] font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {t('showcase.title')}
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>{t('showcase.desc')}</p>
                <ul className="space-y-4 mb-10">
                  {[t('showcase.point1'), t('showcase.point2'), t('showcase.point3')].map(item => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={20} style={{ color: 'var(--accent)' }} className="shrink-0" />
                      <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/templates"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
                  style={{ background: 'var(--accent)', color: 'var(--accent-dim)' }}>
                  {t('showcase.cta')} <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden group"
                style={{ border: '1px solid var(--card-border)' }}>
                {/* Animated grid pattern as placeholder */}
                <div className="absolute inset-0" style={{ background: 'var(--surface-2)' }}>
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `linear-gradient(${theme === 'dark' ? 'rgba(194,198,219,0.3)' : 'rgba(79,70,229,0.2)'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? 'rgba(194,198,219,0.3)' : 'rgba(79,70,229,0.2)'} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                      <Play size={24} style={{ color: 'var(--accent)' }} />
                    </div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>{lang === 'vi' ? 'Xem demo tương tác' : 'Watch interactive demo'}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section className="py-[120px] px-5 md:px-16 max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold mb-4 block tracking-widest uppercase" style={{ color: 'var(--accent)' }}>{t('process.badge')}</span>
            <h2 className="text-3xl md:text-[40px] font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('process.title')}</h2>
            <p className="max-w-lg mx-auto text-sm" style={{ color: 'var(--muted)' }}>{t('process.desc')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px" style={{ background: 'var(--border-subtle)' }} />

          {[
            { num: '01', title: t('p1.title'), desc: t('p1.desc') },
            { num: '02', title: t('p2.title'), desc: t('p2.desc') },
            { num: '03', title: t('p3.title'), desc: t('p3.desc') },
            { num: '04', title: t('p4.title'), desc: t('p4.desc') },
          ].map((step, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className="text-center relative">
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-black relative z-10 transition-all duration-500 hover:scale-110"
                  style={{ fontFamily: 'var(--font-display)', background: 'var(--card-bg)', border: '2px solid var(--card-border)', color: 'var(--accent)' }}>
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-20 px-5 md:px-16 max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold mb-4 block tracking-widest uppercase" style={{ color: 'var(--accent)' }}>{t('testimonials.badge')}</span>
            <h2 className="text-3xl md:text-[40px] font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('testimonials.title')}</h2>
          </div>

          <div className="glass-card rounded-2xl p-8 md:p-12 relative max-w-3xl mx-auto">
            <Quote size={32} className="absolute top-6 left-6 opacity-10" style={{ color: 'var(--accent)' }} />
            <div className="text-center mb-8">
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[activeTest].rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-current" style={{ color: 'var(--accent)' }} />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl leading-relaxed mb-6 italic" style={{ color: 'var(--text-primary)' }}>
                &ldquo;{testimonials[activeTest].quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'var(--surface-1)', color: 'var(--accent)' }}>
                  {testimonials[activeTest].name[0]}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{testimonials[activeTest].name}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{testimonials[activeTest].role}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4">
              <button onClick={prevTest} className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{ border: '1px solid var(--card-border)', color: 'var(--text-secondary)' }}>
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTest(i)}
                    className="h-2 rounded-full transition-all"
                    style={{ width: i === activeTest ? 24 : 8, background: i === activeTest ? 'var(--accent)' : 'var(--border-subtle)' }} />
                ))}
              </div>
              <button onClick={nextTest} className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{ border: '1px solid var(--card-border)', color: 'var(--text-secondary)' }}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-[120px] px-5 md:px-16 max-w-[1280px] mx-auto text-center">
        <ScrollReveal>
          <div className="glass-card py-20 px-8 rounded-3xl relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full blur-[100px] opacity-30" style={{ background: 'var(--accent)' }} />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-30" style={{ background: 'var(--accent)' }} />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider mb-6 border"
                style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--accent)' }}>
                {t('cta.badge')}
              </span>
              <h2 className="text-[36px] md:text-[64px] font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                {t('cta.title')}
              </h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted)' }}>{t('cta.desc')}</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-10" style={{ color: 'var(--muted)' }}>
                {[t('cta.trust1'), t('cta.trust2'), t('cta.trust3')].map(item => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} style={{ color: 'var(--accent)' }} />{item}
                  </span>
                ))}
              </div>
              <Link href="/register"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-sm font-bold transition-all duration-300 active:scale-[0.97] hover:shadow-lg hover:shadow-[var(--accent)]/20"
                style={{ background: 'var(--accent)', color: 'var(--accent-dim)' }}>
                {t('cta.button')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
