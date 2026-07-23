'use client'
import Link from 'next/link'
import { ArrowRight, Brain, CreditCard, Search, Users, Globe, HelpCircle, Mail, MessageSquare, Palette, Rocket, Shield, type LucideIcon } from 'lucide-react'
import { PageHeader, Section } from '@/components/ui/PageComponents'
import { Badge, Card } from '@/components/ui'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useI18n } from '@/context/I18nContext'

export default function HelpPage() {
  const { t } = useI18n()

  const categories: { Icon: LucideIcon; title: string; count: number }[] = [
    { Icon: Rocket, title: 'Bắt đầu', count: 12 },
    { Icon: Palette, title: 'Thiết kế', count: 8 },
    { Icon: Brain, title: 'AI Builder', count: 15 },
    { Icon: CreditCard, title: 'Thanh toán', count: 6 },
    { Icon: Globe, title: 'Tên miền', count: 9 },
    { Icon: Shield, title: 'Bảo mật', count: 7 },
  ]

  const popular = [
    { q: 'Làm thế nào để kết nối tên miền tùy chỉnh?', views: '2.4k', category: 'Tên miền' },
    { q: 'Tại sao website của tôi bị chậm?', views: '1.8k', category: 'Hiệu suất' },
    { q: 'Cách xuất dữ liệu khách hàng?', views: '1.2k', category: 'Dữ liệu' },
    { q: 'Tôi có thể dùng font chữ tùy chỉnh không?', views: '980', category: 'Thiết kế' },
    { q: 'Cách tích hợp Google Analytics?', views: '876', category: 'Analytics' },
    { q: 'Thanh toán qua VNPay hoạt động như thế nào?', views: '754', category: 'Thanh toán' },
  ]

  const supportChannels: { Icon: LucideIcon; title: string; desc: string; cta: string; href: string }[] = [
    { Icon: MessageSquare, title: t('help.liveChat'), desc: t('help.liveChatDesc'), cta: t('help.openChat'), href: '#' },
    { Icon: Mail, title: t('help.email'), desc: t('help.emailDesc'), cta: t('help.sendTicket'), href: '/contact' },
    { Icon: Users, title: t('help.community'), desc: t('help.communityDesc'), cta: t('help.joinCommunity'), href: '/community' },
  ]

  return (
    <>
      <PageHeader
        badge={t('help.badge')}
        title={t('help.title1')}
        accent={t('help.title2')}
        desc={t('help.desc')}
      />

      {/* Search */}
      <section className="px-6 md:px-16 max-w-[1280px] mx-auto mb-12">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--muted)' }} />
            <input
              type="text"
              placeholder={t('help.searchPlaceholder')}
              className="w-full rounded-xl pl-12 pr-4 py-4 text-sm outline-none transition-all"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
              aria-label={t('help.searchLabel')}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <Section>
        <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('help.browseTopics')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.title} delay={i * 50}>
              <Link href="#" className="glass-card rounded-xl p-5 text-center transition-all duration-300 group block">
                <cat.Icon size={16} className="mx-auto mb-2 group-hover:scale-110 transition-transform" style={{ color: 'var(--accent)' }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{cat.title}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{cat.count} bài</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Popular */}
        <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('help.popularQuestions')}</h2>
        <div className="space-y-3 mb-16">
          {popular.map((item, i) => (
            <ScrollReveal key={item.q} delay={i * 50}>
              <Link href="#" className="flex items-center justify-between glass-card rounded-xl px-6 py-4 transition-all duration-300 group block">
                <div className="flex items-center gap-3">
                  <HelpCircle size={16} className="shrink-0" style={{ color: 'var(--accent)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{item.q}</span>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span className="text-xs hidden md:block" style={{ color: 'var(--muted)' }}>{item.views} {t('help.views')}</span>
                  <Badge className="hidden md:block">{item.category}</Badge>
                  <ArrowRight size={16} style={{ color: 'var(--accent)' }} />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Contact support */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supportChannels.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 100}>
              <Card className="text-center h-full">
                <c.Icon size={16} className="mx-auto mb-3" style={{ color: 'var(--accent)' }} />
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{c.title}</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{c.desc}</p>
                <Link href={c.href} className="text-sm font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
                  {c.cta}
                </Link>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  )
}
