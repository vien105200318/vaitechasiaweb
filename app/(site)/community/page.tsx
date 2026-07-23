'use client'
import Link from 'next/link'
import { Heart, MessageCircle } from 'lucide-react'
import { PageHeader, Section, CtaBanner } from '@/components/ui/PageComponents'
import { Avatar, Badge, Card } from '@/components/ui'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useI18n } from '@/context/I18nContext'

export default function CommunityPage() {
  const { t } = useI18n()

  const discussions = [
    { author: 'Minh Tuấn', avatar: 'T', time: '2 giờ trước', title: 'Chia sẻ: Cách tối ưu tốc độ tải trang từ 3s xuống 0.8s', replies: 24, likes: 87, tag: 'Hiệu suất' },
    { author: 'Lan Phương', avatar: 'L', time: '5 giờ trước', title: 'Hỏi: Tích hợp Zalo OA vào website có khó không?', replies: 12, likes: 34, tag: 'Tích hợp' },
    { author: 'Hoàng Nam', avatar: 'H', time: '1 ngày trước', title: 'Showcase: Website khách sạn mới build bằng Vaitech', replies: 31, likes: 156, tag: 'Showcase' },
    { author: 'Thu Hà', avatar: 'T', time: '1 ngày trước', title: 'Chia sẻ kinh nghiệm SEO với mẫu doanh nghiệp Vaitech', replies: 18, likes: 72, tag: 'SEO' },
    { author: 'Quốc Bảo', avatar: 'Q', time: '2 ngày trước', title: 'Hỏi: Cách thêm custom font tiếng Việt có dấu đúng cách?', replies: 9, likes: 28, tag: 'Thiết kế' },
  ]

  const events = [
    { date: '15 Jun', title: 'Webinar: Xây dựng website bán hàng hiệu quả với AI', type: 'Online', spots: '48 chỗ còn' },
    { date: '22 Jun', title: 'Workshop: UI/UX Design System thực chiến', type: 'Hà Nội', spots: '12 chỗ còn' },
    { date: '5 Jul', title: 'Meetup cộng đồng Vaitech tháng 7', type: 'TP.HCM', spots: 'Miễn phí' },
  ]

  const stats = [
    { value: '8,400+', label: t('community.members') },
    { value: '1,200+', label: t('community.discussions') },
    { value: '350+', label: t('community.showcase') },
    { value: '24', label: t('community.eventsPerYear') },
  ]

  return (
    <>
      <PageHeader
        badge={t('community.badge')}
        title={t('community.title1')}
        accent={t('community.title2')}
        desc={t('community.desc')}
      />

      {/* Stats */}
      <section className="px-6 md:px-16 max-w-[1280px] mx-auto mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 60}>
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>{s.value}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Discussions */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('community.latestDiscussions')}</h2>
              <Link href="#" className="text-xs font-semibold hover:underline" style={{ color: 'var(--accent)' }}>{t('community.viewAll')}</Link>
            </div>
            <div className="space-y-3">
              {discussions.map((d, i) => (
                <ScrollReveal key={d.title} delay={i * 60}>
                  <Link href="#" className="glass-card rounded-xl p-5 flex gap-4 hover:opacity-90 transition-all duration-300 block">
                    <Avatar name={d.author} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge>{d.tag}</Badge>
                        <span className="text-xs" style={{ color: 'var(--muted)' }}>{d.author} · {d.time}</span>
                      </div>
                      <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{d.title}</p>
                      <div className="flex gap-4 mt-2 text-xs" style={{ color: 'var(--muted)' }}>
                        <span className="flex items-center gap-1"><MessageCircle size={14} />{d.replies}</span>
                        <span className="flex items-center gap-1"><Heart size={14} />{d.likes}</span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('community.upcomingEvents')}</h2>
            </div>
            <div className="space-y-4">
              {events.map((ev, i) => (
                <ScrollReveal key={ev.title} delay={i * 100}>
                  <Card>
                    <div className="flex gap-4">
                      <div className="text-center shrink-0">
                        <div className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}>{ev.date.split(' ')[0]}</div>
                        <div className="text-xs" style={{ color: 'var(--muted)' }}>{ev.date.split(' ')[1]}</div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{ev.title}</p>
                        <div className="flex gap-2 text-xs" style={{ color: 'var(--muted)' }}>
                          <span>{ev.type}</span>
                          <span>·</span>
                          <span style={{ color: 'var(--accent)' }}>{ev.spots}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CtaBanner
        title={t('community.ctaTitle')}
        desc={t('community.ctaDesc')}
        btnLabel={t('community.ctaBtn')}
        btnHref="/register"
      />
    </>
  )
}
