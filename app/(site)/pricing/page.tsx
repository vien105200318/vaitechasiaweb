import Link from 'next/link'
import { PageHeader } from '@/components/ui/PageComponents'

const plans = [
  {
    name: 'Dùng Thử',
    badge: null,
    price: 'Miễn phí',
    priceNote: '17 ngày',
    color: 'border-white/8',
    desc: 'Khám phá nền tảng với đầy đủ mẫu giao diện có sẵn.',
    aiNote: 'AI giới hạn 10 lần/ngày',
    domain: 'yourname.vaitech.vn',
    domainType: 'subdomain',
    domainLabel: 'Subdomain Vaitech',
    invoice: '1 hoá đơn/tháng',
    features: [
      { text: 'Tất cả mẫu giao diện', ok: true },
      { text: 'Subdomain Vaitech', ok: true },
      { text: 'SSL miễn phí', ok: true },
      { text: 'AI Builder 10 lần/ngày', ok: true },
      { text: 'Hoá đơn điện tử (1/tháng)', ok: true },
      { text: 'Cửa hàng online', ok: false },
      { text: 'Tên miền tuỳ chỉnh', ok: false },
      { text: 'Hỗ trợ ưu tiên', ok: false },
    ],
    cta: 'Bắt đầu miễn phí',
    href: '/register',
    hot: false,
  },
  {
    name: 'Standard',
    badge: null,
    price: '70.000đ',
    priceNote: '/tháng',
    color: 'border-white/8',
    desc: 'Phù hợp cho cá nhân và doanh nghiệp nhỏ.',
    aiNote: 'AI giới hạn 30 lần/ngày',
    domain: 'yourname.vaitech.vn',
    domainType: 'subdomain',
    domainLabel: 'Subdomain Vaitech',
    invoice: '3 hoá đơn/tháng',
    features: [
      { text: 'Tất cả mẫu giao diện', ok: true },
      { text: 'Subdomain Vaitech', ok: true },
      { text: '1 cửa hàng online', ok: true },
      { text: 'AI Builder 30 lần/ngày', ok: true },
      { text: 'Hoá đơn điện tử (3/tháng)', ok: true },
      { text: 'Phân tích cơ bản', ok: true },
      { text: 'Tên miền tuỳ chỉnh', ok: false },
      { text: 'Bảo trì 24/24', ok: false },
    ],
    cta: 'Chọn Standard',
    href: '/register',
    hot: false,
  },
  {
    name: 'Lite',
    badge: 'Phổ biến',
    price: '250.000đ',
    priceNote: '/tháng',
    color: 'border-[#c2c6db]/40 ring-1 ring-[#c2c6db]/20',
    desc: 'Dành cho doanh nghiệp đang mở rộng nhiều cửa hàng.',
    aiNote: 'AI giới hạn 100 lần/ngày',
    domain: 'yourname.vaitech.vn',
    domainType: 'subdomain',
    domainLabel: 'Subdomain Vaitech',
    invoice: '10 hoá đơn/tháng',
    features: [
      { text: 'Tất cả mẫu giao diện', ok: true },
      { text: 'Subdomain Vaitech', ok: true },
      { text: '5 cửa hàng online', ok: true },
      { text: 'AI Builder 100 lần/ngày', ok: true },
      { text: 'Hoá đơn điện tử (10/tháng)', ok: true },
      { text: 'Tích hợp VNPay, MoMo', ok: true },
      { text: 'Tên miền tuỳ chỉnh', ok: false },
      { text: 'Bảo trì 24/24', ok: false },
    ],
    cta: 'Chọn Lite',
    href: '/register',
    hot: true,
  },
  {
    name: 'Pro',
    badge: null,
    price: '590.000đ',
    priceNote: '/tháng',
    color: 'border-white/8',
    desc: 'Custom web, tên miền riêng, bảo trì xuyên suốt 24/24.',
    aiNote: 'AI không giới hạn',
    domain: 'yourbrand.com',
    domainType: 'custom',
    domainLabel: '✦ Tên miền tuỳ chỉnh',
    invoice: '50 hoá đơn/tháng',
    features: [
      { text: 'Custom web theo yêu cầu', ok: true },
      { text: '✦ Tên miền tuỳ chỉnh riêng', ok: true, highlight: true },
      { text: '5 cửa hàng online', ok: true },
      { text: 'Bảo trì & vận hành 24/24', ok: true },
      { text: 'AI Builder không giới hạn', ok: true },
      { text: 'Hoá đơn điện tử (50/tháng)', ok: true },
      { text: 'Live chat, livestream tích hợp', ok: true },
      { text: 'SLA uptime 99.9%', ok: true },
    ],
    cta: 'Chọn Pro',
    href: '/register',
    hot: false,
  },
  {
    name: 'Ultra',
    badge: 'Enterprise',
    price: 'Liên hệ',
    priceNote: '',
    color: 'border-[#c2c6db]/20',
    desc: 'Hệ sinh thái AI toàn diện — không giới hạn, mô hình AI riêng.',
    aiNote: 'AI đầy đủ + mô hình riêng',
    domain: 'yourbrand.com',
    domainType: 'custom',
    domainLabel: '✦ Tuỳ chỉnh + wildcard SSL',
    invoice: 'Không giới hạn',
    features: [
      { text: 'Tất cả tính năng Pro', ok: true },
      { text: '✦ Tên miền + wildcard SSL', ok: true, highlight: true },
      { text: 'Không giới hạn cửa hàng', ok: true },
      { text: 'AI Agent tuỳ chỉnh theo ngành', ok: true },
      { text: 'Hoá đơn điện tử không giới hạn', ok: true },
      { text: 'AI dự đoán doanh thu', ok: true },
      { text: 'Tích hợp CRM/ERP doanh nghiệp', ok: true },
      { text: 'Dedicated account manager', ok: true },
    ],
    cta: 'Liên hệ tư vấn',
    href: '/contact',
    hot: false,
  },
]

const faqs = [
  { q: 'Tên miền tuỳ chỉnh có từ gói nào?', a: 'Từ gói Pro trở lên bạn mới có thể dùng tên miền riêng (ví dụ yourbrand.com). Các gói thấp hơn (Thử, Standard, Lite) dùng subdomain dạng yourname.vaitech.vn.' },
  { q: 'Hoá đơn điện tử hoạt động thế nào?', a: 'Hệ thống tự động xuất hoá đơn điện tử chuẩn NĐ 123/2020/NĐ-CP. Số lượng hoá đơn mỗi tháng giới hạn theo gói, gói Ultra không giới hạn.' },
  { q: 'Tôi có thể huỷ bất cứ lúc nào không?', a: 'Có, huỷ bất kỳ lúc nào không tính phí thêm. Tài khoản vẫn hoạt động đến hết kỳ thanh toán.' },
  { q: 'Có hỗ trợ thanh toán nội địa không?', a: 'Chúng tôi chấp nhận VNPay, MoMo, ZaloPay, chuyển khoản ngân hàng và thẻ quốc tế.' },
  { q: '"Custom web" ở gói Pro nghĩa là gì?', a: 'Đội ngũ Vaitech thiết kế và phát triển website theo brief riêng của bạn, không dùng mẫu có sẵn.' },
  { q: 'AI trong các gói hoạt động thế nào?', a: 'AI Builder giúp tạo nội dung, tối ưu SEO và gợi ý thiết kế. Gói càng cao, AI càng mạnh và ít giới hạn hơn.' },
]

export default function PricingPage() {
  return (
    <>
      <PageHeader
        badge="BẢNG GIÁ"
        title="Minh bạch, không"
        accent="ẩn phí"
        desc="Chọn gói phù hợp. Tất cả gói đều có AI và hoá đơn điện tử — gói càng cao càng ít giới hạn. Tên miền tuỳ chỉnh từ gói Pro."
      />

      {/* Notice bar */}
      <section className="px-6 md:px-16 max-w-[1280px] mx-auto mb-10">
        <div className="flex flex-wrap items-center justify-center gap-6 bg-[#c2c6db]/5 border border-[#c2c6db]/15 rounded-2xl py-4 px-6">
          {[
            { icon: 'psychology', text: 'Mọi gói đều có AI tích hợp' },
            { icon: 'receipt_long', text: 'Hoá đơn điện tử chuẩn NĐ 123' },
            { icon: 'language', text: 'Tên miền tuỳ chỉnh từ gói Pro' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-[#c7c6cd]">
              <span className="material-symbols-outlined text-[#c2c6db] text-lg">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section className="pb-10 px-6 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
          {plans.map(plan => (
            <div key={plan.name} className={`glass-card rounded-2xl p-6 flex flex-col relative border ${plan.color}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    plan.badge === 'Enterprise'
                      ? 'bg-[#c2c6db]/20 text-[#c2c6db] border border-[#c2c6db]/30'
                      : 'bg-[#c2c6db] text-[#2b3040]'
                  }`}>{plan.badge}</span>
                </div>
              )}

              <div className="mb-4 pt-2">
                <h3 className="text-base font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-2xl font-bold text-[#c2c6db]">
                    {plan.price === 'Liên hệ' ? 'Liên hệ' : plan.price === 'Miễn phí' ? 'Miễn phí' : plan.price}
                  </span>
                  {plan.priceNote && <span className="text-[#909097] text-xs mb-0.5">{plan.priceNote}</span>}
                </div>
                <p className="text-xs text-[#c7c6cd] leading-relaxed">{plan.desc}</p>
              </div>

              {/* Domain */}
              <div className={`flex items-center gap-1.5 rounded-lg px-3 py-2 mb-2 border ${
                plan.domainType === 'custom'
                  ? 'bg-[#c2c6db]/8 border-[#c2c6db]/25'
                  : 'bg-white/3 border-white/8'
              }`}>
                <span className="material-symbols-outlined text-sm text-[#c7c6cd]">language</span>
                <div>
                  <p className={`text-xs font-semibold ${plan.domainType === 'custom' ? 'text-[#c2c6db]' : 'text-[#909097]'}`}>
                    {plan.domainLabel}
                  </p>
                  <p className="text-[10px] text-[#909097] font-mono">{plan.domain}</p>
                </div>
              </div>

              {/* Invoice */}
              <div className="flex items-center gap-1.5 bg-white/3 border border-white/8 rounded-lg px-3 py-2 mb-4">
                <span className="material-symbols-outlined text-sm text-[#c7c6cd]">receipt_long</span>
                <p className="text-xs text-[#c7c6cd] font-semibold">HĐ điện tử: {plan.invoice}</p>
              </div>

              {/* AI */}
              <div className="flex items-center gap-1.5 bg-[#c2c6db]/5 border border-[#c2c6db]/15 rounded-lg px-3 py-2 mb-5">
                <span className="material-symbols-outlined text-[#c2c6db] text-sm">psychology</span>
                <span className="text-xs text-[#c2c6db] font-semibold">{plan.aiNote}</span>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map(f => (
                  <li key={f.text} className={`flex items-start gap-2 text-xs leading-relaxed ${
                    !f.ok ? 'text-[#46464c]' :
                    (f as {highlight?: boolean}).highlight ? 'text-[#c2c6db] font-semibold' :
                    'text-[#e0e3e5]'
                  }`}>
                    <span
                      className={`material-symbols-outlined text-sm flex-shrink-0 mt-0.5 ${
                        !f.ok ? 'text-[#46464c]' : 'text-[#c2c6db]'
                      }`}
                      style={{ fontVariationSettings: f.ok ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {f.ok ? 'check_circle' : 'remove_circle'}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block text-center py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                  plan.hot
                    ? 'bg-[#c2c6db] text-[#2b3040] hover:bg-transparent hover:text-[#c2c6db] border border-[#c2c6db]'
                    : plan.price === 'Liên hệ'
                    ? 'border border-[#c2c6db]/40 text-[#c2c6db] hover:bg-[#c2c6db] hover:text-[#2b3040]'
                    : 'border border-[#46464c] text-[#c7c6cd] hover:border-[#c2c6db] hover:text-[#c2c6db]'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Compare table */}
      <section className="px-6 md:px-16 max-w-[1280px] mx-auto py-8">
        <div className="glass-card rounded-2xl p-6 md:p-8 overflow-x-auto">
          <h3 className="text-lg font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c2c6db]">compare</span>
            So Sánh Chi Tiết
          </h3>
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 pr-4 text-[#909097] font-semibold text-xs uppercase tracking-wider w-[200px]">Tính năng</th>
                {['Thử', 'Standard', 'Lite', 'Pro', 'Ultra'].map(n => (
                  <th key={n} className="text-center py-3 px-2 text-[#c7c6cd] font-semibold text-xs">{n}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[#c7c6cd]">
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
                <tr key={row[0]} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  <td className="py-3 pr-4 text-xs font-medium text-[#c7c6cd]">{row[0]}</td>
                  {row.slice(1).map((v, i) => (
                    <td key={i} className={`text-center py-3 px-2 text-xs ${
                      v === '✕' || v === '—' ? 'text-[#46464c]' :
                      v.includes('✦') ? 'text-[#c2c6db] font-bold' :
                      'text-[#e0e3e5] font-semibold'
                    }`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 md:px-16 max-w-[1280px] mx-auto">
        <h2 className="text-3xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-10 text-center">Câu hỏi thường gặp</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {faqs.map(faq => (
            <div key={faq.q} className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-[#e0e3e5] mb-3 flex items-start gap-2">
                <span className="material-symbols-outlined text-[#c2c6db] text-base flex-shrink-0 mt-0.5">help_outline</span>
                {faq.q}
              </h3>
              <p className="text-sm text-[#c7c6cd] leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 px-6 md:px-16 max-w-[1280px] mx-auto">
        <div className="glass-card rounded-3xl py-16 px-8 text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-56 h-56 bg-[#c2c6db]/10 blur-[80px] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-[#c2c6db]/10 blur-[80px] rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-4">Vẫn còn thắc mắc?</h2>
          <p className="text-[#c7c6cd] mb-8 max-w-xl mx-auto">Đội ngũ tư vấn sẵn sàng giúp bạn chọn gói phù hợp nhất.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#c2c6db] text-[#2b3040] px-10 py-4 rounded-lg font-bold hover:bg-transparent hover:text-[#c2c6db] border border-[#c2c6db] transition-all duration-300">
            Liên hệ ngay
          </Link>
        </div>
      </section>
    </>
  )
}
