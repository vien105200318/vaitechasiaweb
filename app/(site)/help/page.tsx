import Link from 'next/link'
import { ArrowRight, Brain, CreditCard, Search, type LucideIcon, Users, Globe, HelpCircle, Mail, MessageSquare, Palette, Rocket, Shield } from 'lucide-react'
import { PageHeader, Section, GlassCard } from '@/components/ui/PageComponents'

const categories = [
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

export default function HelpPage() {
  return (
    <>
      <PageHeader
        badge="TRUNG TÂM HỖ TRỢ"
        title="Chúng tôi luôn"
        accent="ở đây giúp bạn"
        desc="Tìm câu trả lời nhanh chóng hoặc liên hệ trực tiếp với đội ngũ hỗ trợ kỹ thuật của chúng tôi."
      />

      {/* Search */}
      <section className="px-6 md:px-16 max-w-[1280px] mx-auto mb-12">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#909097]" />
            <input
              type="text"
              placeholder="Bạn cần giúp đỡ về vấn đề gì?"
              className="w-full bg-[#1d2022] border border-[#46464c] rounded-xl pl-12 pr-4 py-4 text-[#e0e3e5] placeholder:text-[#909097] focus:border-[#c2c6db] focus:ring-1 focus:ring-[#c2c6db] outline-none transition-all text-sm"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <Section>
        <h2 className="text-xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-6">Duyệt theo chủ đề</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {categories.map((cat) => (
            <Link key={cat.title} href="#" className="glass-card rounded-xl p-5 text-center hover:border-[#c2c6db]/30 transition-all duration-300 group">
              <cat.Icon size={16} />
              <p className="text-sm font-semibold text-[#e0e3e5]">{cat.title}</p>
              <p className="text-xs text-[#909097] mt-1">{cat.count} bài</p>
            </Link>
          ))}
        </div>

        {/* Popular */}
        <h2 className="text-xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-6">Câu hỏi phổ biến</h2>
        <div className="space-y-3 mb-16">
          {popular.map((item) => (
            <Link key={item.q} href="#" className="flex items-center justify-between glass-card rounded-xl px-6 py-4 hover:border-[#c2c6db]/30 transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <HelpCircle size={16} />
                <span className="text-sm text-[#e0e3e5]">{item.q}</span>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                <span className="text-xs text-[#909097] hidden md:block">{item.views} lượt xem</span>
                <span className="text-xs bg-[#1d2022] border border-white/5 text-[#c7c6cd] px-2 py-1 rounded-full hidden md:block">{item.category}</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>

        {/* Contact support */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { Icon: MessageSquare, title: 'Live Chat', desc: 'Trò chuyện trực tiếp với đội hỗ trợ', cta: 'Mở chat', href: '#' },
            { Icon: Mail, title: 'Gửi Email', desc: 'Phản hồi trong vòng 24 giờ', cta: 'Gửi ticket', href: '/contact' },
            { Icon: Users, title: 'Cộng Đồng', desc: 'Hỏi đáp với cộng đồng người dùng', cta: 'Tham gia', href: '/community' },
          ].map((c) => (
            <GlassCard key={c.title} className="text-center">
              <c.Icon size={16} />
              <h3 className="font-bold text-[#e0e3e5] mb-2">{c.title}</h3>
              <p className="text-sm text-[#c7c6cd] mb-4">{c.desc}</p>
              <Link href={c.href} className="text-sm text-[#c2c6db] font-semibold hover:underline">{c.cta}</Link>
            </GlassCard>
          ))}
        </div>
      </Section>
    </>
  )
}
