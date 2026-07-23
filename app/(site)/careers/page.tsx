'use client'

import Link from 'next/link'
import { Award, BookOpen, Clock, Laptop, MapPin, Plane, ShieldPlus } from 'lucide-react'
import { PageHeader, Section, CtaBanner } from '@/components/ui/PageComponents'
import { Card, Badge, Button } from '@/components/ui'
import ScrollReveal from '@/components/ui/ScrollReveal'
import type { LucideIcon } from 'lucide-react'
import { useI18n } from '@/context/I18nContext'

export default function CareersPage() {
  const { t } = useI18n()

  const openings = [
    { dept: t('careers.dept.tech'), title: 'Senior Frontend Engineer', type: t('careers.type.full'), location: t('careers.location.hanoi'), tags: ['React', 'Next.js', 'TypeScript'] },
    { dept: t('careers.dept.tech'), title: 'Backend Engineer (Node.js)', type: t('careers.type.full'), location: t('careers.location.remote'), tags: ['Node.js', 'PostgreSQL', 'AWS'] },
    { dept: t('careers.dept.design'), title: 'UI/UX Designer', type: t('careers.type.full'), location: t('careers.location.hanoi'), tags: ['Figma', 'Motion Design', 'Design System'] },
    { dept: t('careers.dept.design'), title: 'Brand Designer', type: t('careers.type.part'), location: t('careers.location.remote'), tags: ['Branding', 'Illustration', 'Adobe CC'] },
    { dept: t('careers.dept.sales'), title: 'Business Development Manager', type: t('careers.type.full'), location: t('careers.location.hcm'), tags: ['B2B Sales', 'CRM', 'Tiếng Anh'] },
    { dept: t('careers.dept.marketing'), title: 'Content & SEO Specialist', type: t('careers.type.full'), location: t('careers.location.remote'), tags: ['SEO', 'Copywriting', 'Analytics'] },
  ]

  const perks: { Icon: LucideIcon; title: string; desc: string }[] = [
    { Icon: Award, title: t('careers.perk1t'), desc: t('careers.perk1d') },
    { Icon: Plane, title: t('careers.perk2t'), desc: t('careers.perk2d') },
    { Icon: BookOpen, title: t('careers.perk3t'), desc: t('careers.perk3d') },
    { Icon: ShieldPlus, title: t('careers.perk4t'), desc: t('careers.perk4d') },
    { Icon: Clock, title: t('careers.perk5t'), desc: t('careers.perk5d') },
    { Icon: Laptop, title: t('careers.perk6t'), desc: t('careers.perk6d') },
  ]

  return (
    <>
      <PageHeader
        badge={t('careers.badge')}
        title={t('careers.title1')}
        accent={t('careers.title2')}
        desc={t('careers.desc')}
      />

      {/* Perks */}
      <Section>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)]" style={{ color: 'var(--text-primary)' }}>{t('careers.whyTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {perks.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 80}>
              <Card className="flex gap-4">
                <p.Icon size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                <div>
                  <h3 className="font-semibold mb-1 text-sm" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Job listings */}
      <Section>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)]" style={{ color: 'var(--text-primary)' }}>{t('careers.openingsTitle')}</h2>
        <div className="space-y-4 mt-8">
          {openings.map((job, i) => (
            <ScrollReveal key={job.title} delay={i * 60}>
              <div
                className="glass-card rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300"
                style={{ '--tw-border-opacity': '1', borderColor: 'transparent' } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)4d')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--accent)' }}>{job.dept}</span>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-4 text-xs" style={{ color: 'var(--muted)' }}>
                    <span className="flex items-center gap-1"><Clock size={14} />{job.type}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
                  </div>
                </div>
                <Link href="/contact" className="flex-shrink-0">
                  <Button variant="outline" size="sm">{t('careers.apply')}</Button>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <CtaBanner
        title={t('careers.noMatch')}
        desc={t('careers.noMatchDesc')}
        btnLabel={t('careers.sendCv')}
        btnHref="/contact"
      />
    </>
  )
}
