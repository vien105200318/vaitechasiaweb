'use client'
import Link from 'next/link'
import { BarChart2, Brain, ChevronRight, Search, Palette, Puzzle, Rocket, Shield, type LucideIcon } from 'lucide-react'
import { PageHeader, Section } from '@/components/ui/PageComponents'
import { Card } from '@/components/ui'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useI18n } from '@/context/I18nContext'

export default function DocsPage() {
  const { t } = useI18n()

  const docSections: { Icon: LucideIcon; title: string; desc: string; links: string[] }[] = [
    { Icon: Rocket, title: t('docs.getStarted'), desc: t('docs.getStartedDesc'), links: JSON.parse(t('docs.getStartedLinks')) },
    { Icon: Palette, title: t('docs.design'), desc: t('docs.designDesc'), links: JSON.parse(t('docs.designLinks')) },
    { Icon: Brain, title: t('docs.ai'), desc: t('docs.aiDesc'), links: JSON.parse(t('docs.aiLinks')) },
    { Icon: Puzzle, title: t('docs.integrations'), desc: t('docs.integrationsDesc'), links: JSON.parse(t('docs.integrationsLinks')) },
    { Icon: BarChart2, title: t('docs.analytics'), desc: t('docs.analyticsDesc'), links: JSON.parse(t('docs.analyticsLinks')) },
    { Icon: Shield, title: t('docs.security'), desc: t('docs.securityDesc'), links: JSON.parse(t('docs.securityLinks')) },
  ]

  return (
    <>
      <PageHeader
        badge={t('docs.badge')}
        title={t('docs.title1')}
        accent={t('docs.title2')}
        desc={t('docs.desc')}
      />

      {/* Search */}
      <section className="px-6 md:px-16 max-w-[1280px] mx-auto mb-12">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--muted)' }} />
            <input
              type="text"
              placeholder={t('docs.searchPlaceholder')}
              className="w-full rounded-xl pl-12 pr-4 py-4 text-sm outline-none transition-all"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
              aria-label={t('docs.searchLabel')}
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docSections.map((sec, i) => (
            <ScrollReveal key={sec.title} delay={i * 60}>
              <Card className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--accent)' + '1a' }}>
                    <sec.Icon size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <h3 className="font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{sec.title}</h3>
                </div>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{sec.desc}</p>
                <ul className="space-y-2">
                  {sec.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm flex items-center gap-2 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                        <ChevronRight size={14} className="shrink-0" style={{ color: 'var(--accent)' }} />
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  )
}
