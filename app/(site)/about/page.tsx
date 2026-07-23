'use client'

import { BadgeCheck, Handshake, Lightbulb, Users } from 'lucide-react'
import Image from 'next/image'
import { PageHeader, Section, CtaBanner } from '@/components/ui/PageComponents'
import { Card } from '@/components/ui'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useI18n } from '@/context/I18nContext'

export default function AboutPage() {
  const { t } = useI18n()

  const values = [
    { Icon: Lightbulb, title: t('about.v1t'), desc: t('about.v1d') },
    { Icon: Handshake, title: t('about.v2t'), desc: t('about.v2d') },
    { Icon: BadgeCheck, title: t('about.v3t'), desc: t('about.v3d') },
    { Icon: Users, title: t('about.v4t'), desc: t('about.v4d') },
  ]

  const stats = [
    { value: '2020', label: t('about.yearFounded') },
    { value: '200+', label: t('about.projectsDone') },
    { value: '50+', label: t('about.partners') },
    { value: '15+', label: t('about.teamMembers') },
  ]

  const team = [
    { name: 'Nguyễn Minh Tuấn', role: 'CEO & Co-founder' },
    { name: 'Trần Thị Lan Anh', role: 'CTO & Co-founder' },
    { name: 'Lê Hoàng Nam', role: 'Head of Design' },
    { name: 'Phạm Thị Thu', role: 'Head of Engineering' },
  ]

  return (
    <>
      <PageHeader
        badge={t('about.badge')}
        title={t('about.title1')}
        accent={t('about.title2')}
        desc={t('about.desc')}
      />

      {/* Mission */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <span className="text-xs tracking-widest uppercase font-semibold mb-4 block" style={{ color: 'var(--accent)' }}>{t('about.missionBadge')}</span>
              <h2 className="text-3xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                {t('about.missionTitle')}
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                {t('about.missionP1')}
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t('about.missionP2')}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl"
                alt="Vaitech Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--background) 60%, transparent)' }} />
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Stats */}
      <section className="py-16" style={{ background: 'var(--surface-1)' }}>
        <div className="px-6 md:px-16 max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>{s.value}</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <Section>
        <h2 className="text-3xl font-bold mb-12 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('about.valuesTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 100}>
              <Card className="flex gap-5">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--accent)1a' }}>
                  <v.Icon size={16} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{v.desc}</p>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section>
        <h2 className="text-3xl font-bold mb-12 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('about.teamTitle')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 100}>
              <Card className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--accent)1a', borderColor: 'var(--accent)33', border: '1px solid' }}>
                  <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{member.name}</h3>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{member.role}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <CtaBanner
        title={t('about.ctaTitle')}
        desc={t('about.ctaDesc')}
        btnLabel={t('about.ctaBtn')}
        btnHref="/contact"
      />
    </>
  )
}
