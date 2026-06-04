import Link from 'next/link'
import { BarChart2, Brain, ChevronRight, Search, Palette, Puzzle, Rocket, Shield } from 'lucide-react'
import { PageHeader, Section } from '@/components/ui/PageComponents'

const docSections = [
  {
    Icon: Rocket, title: 'Bắt Đầu Nhanh', desc: 'Từ đăng ký đến website hoàn chỉnh trong 10 phút.',
    links: ['Tạo tài khoản', 'Chọn mẫu thiết kế', 'Tùy chỉnh nội dung', 'Kết nối tên miền', 'Xuất bản website'],
  },
  {
    Icon: Palette, title: 'Thiết Kế & Giao Diện', desc: 'Hướng dẫn tùy chỉnh giao diện và design system.',
    links: ['Hệ thống màu sắc', 'Typography', 'Components', 'Dark/Light mode', 'Responsive layout'],
  },
  {
    Icon: Brain, title: 'AI Builder', desc: 'Khai thác sức mạnh của AI để xây dựng nhanh hơn.',
    links: ['Tổng quan AI Builder', 'Prompt hiệu quả', 'Chỉnh sửa kết quả AI', 'Giới hạn sử dụng', 'FAQ'],
  },
  {
    Icon: Puzzle, title: 'Tích Hợp', desc: 'Kết nối với các công cụ và dịch vụ bên ngoài.',
    links: ['Tổng quan API', 'Webhook', 'OAuth 2.0', 'SDK JavaScript', 'Postman Collection'],
  },
  {
    Icon: BarChart2, title: 'Phân Tích & Báo Cáo', desc: 'Hiểu rõ hiệu suất website của bạn.',
    links: ['Dashboard Analytics', 'Custom Events', 'Funnel Analysis', 'Export dữ liệu', 'Tích hợp GA4'],
  },
  {
    Icon: Shield, title: 'Bảo Mật', desc: 'Bảo vệ website và dữ liệu người dùng.',
    links: ['SSL & HTTPS', 'Xác thực 2 yếu tố', 'Phân quyền nhóm', 'Audit logs', 'GDPR & PDPA'],
  },
]

export default function DocsPage() {
  return (
    <>
      <PageHeader
        badge="TÀI LIỆU KỸ THUẬT"
        title="Hướng dẫn"
        accent="toàn diện"
        desc="Mọi thứ bạn cần để xây dựng, tùy chỉnh và triển khai sản phẩm với Vaitech."
      />

      {/* Search */}
      <section className="px-6 md:px-16 max-w-[1280px] mx-auto mb-12">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#909097]" />
            <input
              type="text"
              placeholder="Tìm kiếm trong tài liệu..."
              className="w-full bg-[#1d2022] border border-[#46464c] rounded-xl pl-12 pr-4 py-4 text-[#e0e3e5] placeholder:text-[#909097] focus:border-[#c2c6db] focus:ring-1 focus:ring-[#c2c6db] outline-none transition-all text-sm"
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docSections.map((sec) => (
            <div key={sec.title} className="glass-card rounded-xl p-6 hover:border-[#c2c6db]/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#0a0f1e] flex items-center justify-center">
                  <sec.Icon size={16} />
                </div>
                <h3 className="font-bold text-[#e0e3e5] font-[family-name:var(--font-montserrat)]">{sec.title}</h3>
              </div>
              <p className="text-sm text-[#c7c6cd] mb-4 leading-relaxed">{sec.desc}</p>
              <ul className="space-y-2">
                {sec.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-[#c7c6cd] hover:text-[#c2c6db] flex items-center gap-2 transition-colors">
                      <ChevronRight size={16} />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
