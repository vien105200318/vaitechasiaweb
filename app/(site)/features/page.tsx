import { PageHeader, Section, GlassCard, CtaBanner } from '@/components/ui/PageComponents'

const features = [
  { icon: 'psychology', title: 'Xây Dựng Bằng AI', desc: 'Tự động sinh code, layout và nội dung từ mô tả ngắn. Tiết kiệm 80% thời gian phát triển.' },
  { icon: 'auto_awesome', title: 'Hiệu Ứng Thị Giác 3D', desc: 'Thư viện animation và hiệu ứng glassmorphism cao cấp, sẵn sàng dùng ngay.' },
  { icon: 'speed', title: 'Tốc Độ Tải Dưới 1 Giây', desc: 'Tối ưu hóa Core Web Vitals tự động — đảm bảo trải nghiệm người dùng hoàn hảo.' },
  { icon: 'shield', title: 'Bảo Mật Đa Lớp', desc: 'Mã hóa end-to-end, xác thực 2 yếu tố và giám sát bảo mật 24/7.' },
  { icon: 'devices', title: 'Responsive Hoàn Toàn', desc: 'Tự động thích nghi với mọi kích thước màn hình từ mobile đến 4K.' },
  { icon: 'analytics', title: 'Phân Tích Chuyên Sâu', desc: 'Dashboard thống kê thời gian thực — lượt xem, chuyển đổi và hành vi người dùng.' },
  { icon: 'language', title: 'Đa Ngôn Ngữ', desc: 'Hỗ trợ tự động dịch sang 30+ ngôn ngữ với bản địa hóa nội dung thông minh.' },
  { icon: 'integration_instructions', title: 'Tích Hợp Dễ Dàng', desc: 'Kết nối với 100+ công cụ phổ biến: CRM, thanh toán, email marketing và hơn thế nữa.' },
  { icon: 'support_agent', title: 'Hỗ Trợ 24/7', desc: 'Đội ngũ kỹ thuật chuyên nghiệp sẵn sàng hỗ trợ bất cứ lúc nào bạn cần.' },
]

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        badge="TÍNH NĂNG NỔI BẬT"
        title="Mọi thứ bạn cần để"
        accent="thống lĩnh kỹ thuật số"
        desc="Bộ công cụ toàn diện giúp bạn xây dựng, triển khai và tăng trưởng thương hiệu số nhanh hơn bao giờ hết."
      />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <GlassCard key={f.title}>
              <div className="w-12 h-12 rounded-lg bg-[#0a0f1e] flex items-center justify-center text-[#c2c6db] mb-6">
                <span className="material-symbols-outlined text-2xl">{f.icon}</span>
              </div>
              <h3 className="text-lg font-semibold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-3">{f.title}</h3>
              <p className="text-sm text-[#c7c6cd] leading-relaxed">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Sẵn sàng trải nghiệm?"
        desc="Bắt đầu miễn phí ngay hôm nay — không cần thẻ tín dụng."
        btnLabel="Dùng thử miễn phí"
        btnHref="/register"
      />
    </>
  )
}
