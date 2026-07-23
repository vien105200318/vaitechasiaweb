'use client'
import { BarChart2, Briefcase, CreditCard, Mail, MessageSquare, MousePointerClick, ShoppingCart, Store, Wallet, Zap, type LucideIcon } from 'lucide-react'
import { PageHeader, Section, CtaBanner } from '@/components/ui/PageComponents'
import { Card } from '@/components/ui'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useI18n } from '@/context/I18nContext'

export default function IntegrationsPage() {
  const { t } = useI18n()

  const integrations = [
    { category: t('integrations.catPayment'), items: [
      { name: 'VNPay', Icon: CreditCard, desc: 'Cổng thanh toán nội địa phổ biến nhất Việt Nam.' },
      { name: 'MoMo', Icon: Wallet, desc: 'Ví điện tử với 30 triệu người dùng.' },
      { name: 'Stripe', Icon: CreditCard, desc: 'Thanh toán quốc tế đa tiền tệ.' },
    ]},
    { category: t('integrations.catMarketing'), items: [
      { name: 'Google Analytics', Icon: BarChart2, desc: 'Theo dõi hành vi người dùng chi tiết.' },
      { name: 'Meta Pixel', Icon: MousePointerClick, desc: 'Tối ưu quảng cáo Facebook & Instagram.' },
      { name: 'Mailchimp', Icon: Mail, desc: 'Gửi email marketing tự động.' },
    ]},
    { category: t('integrations.catOps'), items: [
      { name: 'Google Workspace', Icon: Briefcase, desc: 'Đồng bộ lịch, Drive và email doanh nghiệp.' },
      { name: 'Slack', Icon: MessageSquare, desc: 'Thông báo thời gian thực về dự án.' },
      { name: 'Zapier', Icon: Zap, desc: 'Tự động hóa quy trình với 5000+ ứng dụng.' },
    ]},
    { category: t('integrations.catEcom'), items: [
      { name: 'WooCommerce', Icon: ShoppingCart, desc: 'Tích hợp cửa hàng WordPress.' },
      { name: 'Shopify', Icon: Store, desc: 'Đồng bộ sản phẩm và đơn hàng.' },
      { name: 'Haravan', Icon: Store, desc: 'Nền tảng TMĐT hàng đầu Việt Nam.' },
    ]},
  ]

  return (
    <>
      <PageHeader
        badge={t('integrations.badge')}
        title={t('integrations.title1')}
        accent={t('integrations.title2')}
        desc={t('integrations.desc')}
      />

      <Section>
        <div className="space-y-16">
          {integrations.map((group, gi) => (
            <div key={group.category}>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                <span className="w-1 h-6 rounded-full inline-block" style={{ background: 'var(--accent)' }} />
                {group.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {group.items.map((item, ii) => (
                  <ScrollReveal key={item.name} delay={(gi * 3 + ii) * 60}>
                    <Card className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--accent)' + '1a' }}>
                        <item.Icon size={16} style={{ color: 'var(--accent)' }} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                      </div>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner
        title={t('integrations.missing')}
        desc={t('integrations.missingDesc')}
        btnLabel={t('integrations.missingCta')}
        btnHref="/contact"
      />
    </>
  )
}
