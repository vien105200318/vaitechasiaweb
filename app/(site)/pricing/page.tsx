'use client'

import Link from 'next/link'
import { Brain, CheckCircle2, Globe, LayoutDashboard, MinusCircle, Quote, Receipt, Star } from 'lucide-react'
import { useI18n } from '@/context/I18nContext'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function PricingPage() {
  const { t } = useI18n()

  const plans = [
    { name: 'Dùng Thử', badge: null, price: t('price.free'), priceNote: `17 ${t('price.day')}`, desc: 'Khám phá nền tảng với đầy đủ mẫu giao diện có sẵn.', aiNote: `${t('price.aiLimit')} 10 ${t('price.perDay')}`, domain: 'yourname.vaitech.vn', domainType: 'subdomain', domainLabel: 'Subdomain Vaitech', invoice: `1 ${t('price.invoice')}`, features: [{ text: 'Tất cả mẫu giao diện', ok: true }, { text: 'Subdomain Vaitech', ok: true }, { text: 'SSL miễn phí', ok: true }, { text: 'AI Builder 10 lần/ngày', ok: true }, { text: `Hoá đơn điện tử (1/${t('price.invoice')})`, ok: true }, { text: 'Cửa hàng online', ok: false }, { text: 'Tên miền tuỳ chỉnh', ok: false }, { text: 'Hỗ trợ ưu tiên', ok: false }], cta: t('price.startFree'), href: '/register', hot: false },
    { name: 'Standard', badge: null, price: '70.000đ', priceNote: t('price.month'), desc: 'Phù hợp cho cá nhân và doanh nghiệp nhỏ.', aiNote: `${t('price.aiLimit')} 30 ${t('price.perDay')}`, domain: 'yourname.vaitech.vn', domainType: 'subdomain', domainLabel: 'Subdomain Vaitech', invoice: `3 ${t('price.invoice')}`, features: [{ text: 'Tất cả mẫu giao diện', ok: true }, { text: 'Subdomain Vaitech', ok: true }, { text: '1 cửa hàng online', ok: true }, { text: 'AI Builder 30 lần/ngày', ok: true }, { text: `Hoá đơn điện tử (3/${t('price.invoice')})`, ok: true }, { text: 'Phân tích cơ bản', ok: true }, { text: 'Tên miền tuỳ chỉnh', ok: false }, { text: 'Bảo trì 24/24', ok: false }], cta: `${t('price.choose')} Standard`, href: '/register', hot: false },
    { name: 'Lite', badge: t('price.popular'), price: '250.000đ', priceNote: t('price.month'), desc: 'Dành cho doanh nghiệp đang mở rộng nhiều cửa hàng.', aiNote: `${t('price.aiLimit')} 100 ${t('price.perDay')}`, domain: 'yourname.vaitech.vn', domainType: 'subdomain', domainLabel: 'Subdomain Vaitech', invoice: `10 ${t('price.invoice')}`, features: [{ text: 'Tất cả mẫu giao diện', ok: true }, { text: 'Subdomain Vaitech', ok: true }, { text: '5 cửa hàng online', ok: true }, { text: 'AI Builder 100 lần/ngày', ok: true }, { text: `Hoá đơn điện tử (10/${t('price.invoice')})`, ok: true }, { text: 'Tích hợp VNPay, MoMo', ok: true }, { text: 'Tên miền tuỳ chỉnh', ok: false }, { text: 'Bảo trì 24/24', ok: false }], cta: `${t('price.choose')} Lite`, href: '/register', hot: true },
    { name: 'Pro', badge: null, price: '590.000đ', priceNote: t('price.month'), desc: 'Custom web, tên miền riêng, bảo trì xuyên suốt 24/24.', aiNote: t('price.unlimited'), domain: 'yourbrand.com', domainType: 'custom', domainLabel: t('price.domainCustom'), invoice: `50 ${t('price.invoice')}`, features: [{ text: t('price.webCustom'), ok: true }, { text: t('price.domainCustom'), ok: true, highlight: true }, { text: '5 cửa hàng online', ok: true }, { text: 'Bảo trì & vận hành 24/24', ok: true }, { text: 'AI Builder không giới hạn', ok: true }, { text: `Hoá đơn điện tử (50/${t('price.invoice')})`, ok: true }, { text: 'Live chat, livestream tích hợp', ok: true }, { text: 'SLA uptime 99.9%', ok: true }], cta: `${t('price.choose')} Pro`, href: '/register', hot: false },
    { name: 'Ultra', badge: t('price.enterprise'), price: t('price.contact'), priceNote: '', desc: 'Hệ sinh thái AI toàn diện — không giới hạn, mô hình AI riêng.', aiNote: t('price.aiFull'), domain: 'yourbrand.com', domainType: 'custom', domainLabel: t('price.domainWildcard'), invoice: t('price.noLimit'), features: [{ text: t('price.allFeatures'), ok: true }, { text: t('price.domainWildcard'), ok: true, highlight: true }, { text: 'Không giới hạn cửa hàng', ok: true }, { text: 'AI Agent tuỳ chỉnh theo ngành', ok: true }, { text: 'Hoá đơn điện tử không giới hạn', ok: true }, { text: 'AI dự đoán doanh thu', ok: true }, { text: 'Tích hợp CRM/ERP doanh nghiệp', ok: true }, { text: 'Dedicated account manager', ok: true }], cta: t('price.contactUs'), href: '/contact', hot: false },
  ]

  const faqs = [
    { q: 'Tên miền tuỳ chỉnh có từ gói nào?', a: 'Từ gói Pro trở lên bạn mới có thể dùng tên miền riêng. Các gói thấp hơn dùng subdomain.' },
    { q: 'Hoá đơn điện tử hoạt động thế nào?', a: 'Hệ thống tự động xuất hoá đơn chuẩn NĐ 123. Số lượng theo gói, Ultra không giới hạn.' },
    { q: 'Tôi có thể huỷ bất cứ lúc nào không?', a: 'Có, huỷ bất kỳ lúc nào không tính phí thêm.' },
    { q: 'Có hỗ trợ thanh toán nội địa không?', a: 'VNPay, MoMo, ZaloPay, chuyển khoản ngân hàng và thẻ quốc tế.' },
    { q: '"Custom web" ở gói Pro nghĩa là gì?', a: 'Đội ngũ thiết kế và phát triển website theo brief riêng, không dùng mẫu có sẵn.' },
    { q: 'AI trong các gói hoạt động thế nào?', a: 'AI Builder giúp tạo nội dung, tối ưu SEO và gợi ý thiết kế. Gói càng cao, AI càng mạnh.' },
  ]

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-5 md:px-16 max-w-[1280px] mx-auto text-center">
        <span className="text-xs font-semibold mb-4 block tracking-widest uppercase" style={{ color: 'var(--accent)' }}>{t('price.badge')}</span>
        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          {t('price.title1')}{' '}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, var(--accent), #7c3aed)' }}>{t('price.title2')}</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>{t('price.desc')}</p>
      </section>

      {/* Notice bar */}
      <section className="px-5 md:px-16 max-w-[1280px] mx-auto mb-10">
        <div className="flex flex-wrap items-center justify-center gap-6 rounded-2xl py-4 px-6 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          {[{ Icon: Brain, text: t('price.notice1') }, { Icon: Receipt, text: t('price.notice2') }, { Icon: Globe, text: t('price.notice3') }].map(item => (
            <div key={item.text} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <item.Icon size={16} />{item.text}
            </div>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section className="pb-10 px-5 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
          {plans.map(plan => (
            <div key={plan.name} className={`glass-card rounded-2xl p-6 flex flex-col relative border ${plan.hot ? 'ring-1' : ''}`}
              style={{ borderColor: plan.badge === t('price.enterprise') ? 'var(--accent)' : plan.hot ? 'var(--accent)' : 'var(--card-border)' }}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                    style={{ background: plan.badge === t('price.enterprise') ? 'var(--surface-1)' : 'var(--accent)', color: plan.badge === t('price.enterprise') ? 'var(--accent)' : 'var(--accent-dim)' }}>
                    {plan.badge}
                  </span>
                </div>
              )}
              {plan.hot && (
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#22c55e20', color: '#22c55e' }}>23 {t('price.hotBadge')}</span>
                </div>
              )}

              <div className="mb-4 pt-2">
                <h3 className="text-base font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{plan.name}</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{plan.price}</span>
                  {plan.priceNote && <span className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>{plan.priceNote}</span>}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{plan.desc}</p>
              </div>

              <div className="flex items-center gap-1.5 rounded-lg px-3 py-2 mb-2 border"
                style={{ background: plan.domainType === 'custom' ? 'var(--card-bg)' : 'var(--surface-1)', borderColor: plan.domainType === 'custom' ? 'var(--accent)' + '40' : 'var(--border-subtle)' }}>
                <Globe size={16} style={{ color: 'var(--muted)' }} />
                <div>
                  <p className="text-xs font-semibold" style={{ color: plan.domainType === 'custom' ? 'var(--accent)' : 'var(--muted)' }}>{plan.domainLabel}</p>
                  <p className="text-[10px] font-mono" style={{ color: 'var(--muted)' }}>{plan.domain}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 rounded-lg px-3 py-2 mb-4 border" style={{ background: 'var(--surface-1)', borderColor: 'var(--border-subtle)' }}>
                <Receipt size={16} style={{ color: 'var(--muted)' }} />
                <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>HĐ điện tử: {plan.invoice}</p>
              </div>

              <div className="flex items-center gap-1.5 rounded-lg px-3 py-2 mb-5 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--accent)' + '30' }}>
                <Brain size={16} style={{ color: 'var(--accent)' }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{plan.aiNote}</span>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map(f => (
                  <li key={f.text} className="flex items-start gap-2 text-xs leading-relaxed"
                    style={{ color: !f.ok ? 'var(--border-subtle)' : (f as any).highlight ? 'var(--accent)' : 'var(--text-primary)' }}>
                    {f.ok ? <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} /> : <MinusCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--border-subtle)' }} />}
                    {f.text}
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="block text-center py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 border"
                style={plan.hot ? { background: 'var(--accent)', color: 'var(--accent-dim)', borderColor: 'var(--accent)' } :
                  plan.price === t('price.contact') ? { borderColor: 'var(--accent)', color: 'var(--accent)' } :
                  { borderColor: 'var(--card-border)', color: 'var(--text-secondary)' }}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Compare table */}
      <section className="px-5 md:px-16 max-w-[1280px] mx-auto py-8">
        <div className="glass-card rounded-2xl p-6 md:p-8 overflow-x-auto">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            <LayoutDashboard size={16} />{t('price.feature')}
          </h3>
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <th className="text-left py-3 pr-4 font-semibold text-xs uppercase tracking-wider w-[200px]" style={{ color: 'var(--muted)' }}>{t('price.feature')}</th>
                {['Thử', 'Standard', 'Lite', 'Pro', 'Ultra'].map(n => (
                  <th key={n} className="text-center py-3 px-2 font-semibold text-xs" style={{ color: 'var(--text-secondary)' }}>{n}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Tên miền', 'Subdomain', 'Subdomain', 'Subdomain', '✦ Tuỳ chỉnh', '✦ Tuỳ chỉnh'],
                ['Cửa hàng', '—', '1', '5', '5', '∞'],
                ['Hoá đơn điện tử', '1/tháng', '3/tháng', '10/tháng', '50/tháng', '∞'],
                ['AI Builder', '10/ngày', '30/ngày', '100/ngày', '∞', '∞ + riêng'],
                ['AI tối ưu SEO', '✕', '✓', '✓', '✓', '✓'],
                ['AI chatbot', '✕', '✕', '✕', '✓', '✓'],
                ['AI dự đoán DT', '✕', '✕', '✕', '✕', '✓'],
                ['Bảo trì 24/24', '✕', '✕', '✕', '✓', '✓'],
                ['SLA uptime', '—', '—', '—', '99.9%', '99.99%'],
              ].map(row => (
                <tr key={row[0]} className="hover:opacity-80 transition-colors" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td className="py-3 pr-4 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{row[0]}</td>
                  {row.slice(1).map((v, i) => (
                    <td key={i} className="text-center py-3 px-2 text-xs font-semibold"
                      style={{ color: v === '✕' || v === '—' ? 'var(--border-subtle)' : v.includes('✦') ? 'var(--accent)' : 'var(--text-primary)' }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-5 md:px-16 max-w-[1280px] mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('price.faqTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {faqs.map(faq => (
            <div key={faq.q} className="glass-card rounded-xl p-5">
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{faq.q}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-10 px-5 md:px-16 max-w-[1280px] mx-auto">
        <div className="glass-card rounded-3xl py-16 px-8 text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-56 h-56 rounded-full blur-[80px] opacity-20" style={{ background: 'var(--accent)' }} />
          <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full blur-[80px] opacity-20" style={{ background: 'var(--accent)' }} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('price.stillQuestion')}</h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>{t('price.stillDesc')}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
            style={{ background: 'var(--accent)', color: 'var(--accent-dim)' }}>
            {t('price.stillCta')}
          </Link>
        </div>
      </section>
    </>
  )
}
