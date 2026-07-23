'use client'

import Link from 'next/link'
import { ArrowRight, Download, FileText, ImageIcon, Images, User } from 'lucide-react'
import { PageHeader, Section, CtaBanner } from '@/components/ui/PageComponents'
import { Badge, Button, Card } from '@/components/ui'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useI18n } from '@/context/I18nContext'

const news = [
  {
    date: 'Tháng 5, 2025',
    category: 'Thông cáo báo chí',
    title: 'Vaitech hoàn tất vòng gọi vốn Series A trị giá 2 triệu USD',
    desc: 'Vaitech công bố thành công huy động 2 triệu USD từ các quỹ đầu tư hàng đầu Đông Nam Á để mở rộng nền tảng và thâm nhập thị trường quốc tế.',
    tag: 'Đầu tư',
  },
  {
    date: 'Tháng 3, 2025',
    category: 'Giải thưởng',
    title: 'Vaitech đạt giải "Startup Công Nghệ Xuất Sắc" tại Vietnam Tech Awards 2025',
    desc: 'Được vinh danh trong hạng mục Startup Công Nghệ Xuất Sắc nhờ những đóng góp nổi bật cho hệ sinh thái chuyển đổi số Việt Nam.',
    tag: 'Giải thưởng',
  },
  {
    date: 'Tháng 1, 2025',
    category: 'Sản phẩm',
    title: 'Ra mắt Vaitech AI Builder — Xây dựng website trong 60 giây',
    desc: 'Tính năng đột phá mới cho phép người dùng tạo ra website hoàn chỉnh chỉ từ một mô tả ngắn bằng tiếng Việt, sử dụng công nghệ AI thế hệ mới.',
    tag: 'Sản phẩm',
  },
]

const mediaKitItems = [
  { Icon: ImageIcon, title: 'Logo & Brand Assets', desc: 'Bộ nhận diện thương hiệu đầy đủ (.SVG, .PNG)' },
  { Icon: FileText, title: 'Thông cáo báo chí', desc: 'Tất cả thông cáo báo chí từ trước đến nay' },
  { Icon: Images, title: 'Thư viện ảnh', desc: 'Ảnh sản phẩm và đội ngũ chất lượng cao' },
  { Icon: User, title: 'Hồ sơ lãnh đạo', desc: 'Tiểu sử và ảnh đại diện chính thức' },
]

export default function PressPage() {
  const { t } = useI18n()

  return (
    <>
      <PageHeader
        badge={t('press.badge')}
        title={t('press.title1')}
        accent={t('press.title2')}
        desc={t('press.desc')}
      />

      {/* News */}
      <Section>
        <div className="space-y-6">
          {news.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <div className="glass-card rounded-xl p-8 transition-all duration-300" style={{ '--hover-border': 'var(--accent)' } as React.CSSProperties} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(194, 198, 219, 0.3)' }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '' }}>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="accent">{item.tag}</Badge>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>{item.date}</span>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>·</span>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>{item.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                <Link href="#" className="text-sm font-semibold hover:underline flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                  {t('press.readMore')} <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Media Kit */}
      <Section>
        <div className="glass-card rounded-2xl p-10">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('press.mediaKitTitle')}</h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{t('press.mediaKitDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {mediaKitItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 60}>
                <Card>
                  <item.Icon size={16} className="mb-3" style={{ color: 'var(--accent)' }} />
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
          <Link href="#" className="inline-flex">
            <Button icon={<Download size={16} />}>
              {t('press.downloadKit')}
            </Button>
          </Link>
        </div>
      </Section>

      <CtaBanner
        title={t('press.contactTitle')}
        desc={t('press.contactDesc')}
        btnLabel={t('press.contactBtn')}
        btnHref="/contact"
      />
    </>
  )
}
