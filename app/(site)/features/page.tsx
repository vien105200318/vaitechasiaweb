'use client'

import { BarChart2, Brain, Globe, Headphones, Monitor, Puzzle, Shield, Sparkles, Zap } from 'lucide-react'
import { useI18n } from '@/context/I18nContext'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function FeaturesPage() {
  const { t } = useI18n()

  const features = [
    { Icon: Brain, title: t('feat.f1t'), desc: t('feat.f1d') },
    { Icon: Sparkles, title: t('feat.f2t'), desc: t('feat.f2d') },
    { Icon: Zap, title: t('feat.f3t'), desc: t('feat.f3d') },
    { Icon: Shield, title: t('feat.f4t'), desc: t('feat.f4d') },
    { Icon: Monitor, title: t('feat.f5t'), desc: t('feat.f5d') },
    { Icon: BarChart2, title: t('feat.f6t'), desc: t('feat.f6d') },
    { Icon: Globe, title: t('feat.f7t'), desc: t('feat.f7d') },
    { Icon: Puzzle, title: t('feat.f8t'), desc: t('feat.f8d') },
    { Icon: Headphones, title: t('feat.f9t'), desc: t('feat.f9d') },
  ]

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-5 md:px-16 max-w-[1280px] mx-auto text-center">
        <span className="text-xs font-semibold mb-4 block tracking-widest uppercase" style={{ color: 'var(--accent)' }}>{t('feat.badge')}</span>
        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          {t('feat.title1')}{' '}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, var(--accent), #7c3aed)' }}>{t('feat.title2')}</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>{t('feat.desc')}</p>
      </section>

      {/* Features grid */}
      <section className="pb-20 px-5 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="glass-card p-8 rounded-2xl h-full">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'var(--surface-1)', color: 'var(--accent)' }}>
                  <f.Icon size={16} />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-5 md:px-16 max-w-[1280px] mx-auto text-center">
        <div className="glass-card py-16 px-8 rounded-3xl">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('feat.ctaTitle')}</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>{t('feat.ctaDesc')}</p>
          <a href="/register" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
            style={{ background: 'var(--accent)', color: 'var(--accent-dim)' }}>
            {t('feat.ctaBtn')}
          </a>
        </div>
      </section>
    </>
  )
}
