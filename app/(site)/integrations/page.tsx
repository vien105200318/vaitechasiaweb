import { BarChart2, Briefcase, type LucideIcon, CreditCard, Mail, MessageSquare, MousePointerClick, ShoppingCart, Store, Wallet, Zap } from 'lucide-react'
import { PageHeader, Section, GlassCard, CtaBanner } from '@/components/ui/PageComponents'

const integrations = [
  { category: 'Thanh toán', items: [
    { name: 'VNPay', Icon: CreditCard, desc: 'Cổng thanh toán nội địa phổ biến nhất Việt Nam.' },
    { name: 'MoMo', Icon: Wallet, desc: 'Ví điện tử với 30 triệu người dùng.' },
    { name: 'Stripe', Icon: CreditCard, desc: 'Thanh toán quốc tế đa tiền tệ.' },
  ]},
  { category: 'Marketing', items: [
    { name: 'Google Analytics', Icon: BarChart2, desc: 'Theo dõi hành vi người dùng chi tiết.' },
    { name: 'Meta Pixel', Icon: MousePointerClick, desc: 'Tối ưu quảng cáo Facebook & Instagram.' },
    { name: 'Mailchimp', Icon: Mail, desc: 'Gửi email marketing tự động.' },
  ]},
  { category: 'Vận hành', items: [
    { name: 'Google Workspace', Icon: Briefcase, desc: 'Đồng bộ lịch, Drive và email doanh nghiệp.' },
    { name: 'Slack', Icon: MessageSquare, desc: 'Thông báo thời gian thực về dự án.' },
    { name: 'Zapier', Icon: Zap, desc: 'Tự động hóa quy trình với 5000+ ứng dụng.' },
  ]},
  { category: 'Thương mại điện tử', items: [
    { name: 'WooCommerce', Icon: ShoppingCart, desc: 'Tích hợp cửa hàng WordPress.' },
    { name: 'Shopify', Icon: Store, desc: 'Đồng bộ sản phẩm và đơn hàng.' },
    { name: 'Haravan', Icon: Store, desc: 'Nền tảng TMĐT hàng đầu Việt Nam.' },
  ]},
]

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader
        badge="TÍCH HỢP"
        title="Kết nối với"
        accent="mọi công cụ"
        desc="Hơn 100 tích hợp sẵn có giúp bạn kết nối hệ sinh thái công cụ hiện tại mà không cần viết một dòng code."
      />

      <Section>
        <div className="space-y-16">
          {integrations.map((group) => (
            <div key={group.category}>
              <h2 className="text-xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#c2c6db] rounded-full inline-block" />
                {group.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {group.items.map((item) => (
                  <GlassCard key={item.name} className="flex items-start gap-4 !p-6">
                    <div className="w-10 h-10 rounded-lg bg-[#0a0f1e] flex items-center justify-center flex-shrink-0">
                      <item.Icon size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#e0e3e5] mb-1">{item.name}</h3>
                      <p className="text-xs text-[#c7c6cd] leading-relaxed">{item.desc}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Thiếu tích hợp bạn cần?"
        desc="Liên hệ để chúng tôi phát triển tích hợp theo yêu cầu riêng của bạn."
        btnLabel="Yêu cầu tích hợp mới"
        btnHref="/contact"
      />
    </>
  )
}
