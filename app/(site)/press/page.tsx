import Link from 'next/link'
import { ArrowRight, Download, FileText, ImageIcon, Images, User, type LucideIcon } from 'lucide-react'
import { PageHeader, Section, CtaBanner } from '@/components/ui/PageComponents'

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
  return (
    <>
      <PageHeader
        badge="BÁO CHÍ & TRUYỀN THÔNG"
        title="Tin tức mới nhất"
        accent="từ Vaitech"
        desc="Cập nhật những thông tin mới nhất về Vaitech — từ ra mắt sản phẩm, giải thưởng đến các cột mốc quan trọng."
      />

      {/* News */}
      <Section>
        <div className="space-y-6">
          {news.map((item) => (
            <div key={item.title} className="glass-card rounded-xl p-8 hover:border-[#c2c6db]/30 transition-all duration-300">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs bg-[#c2c6db]/10 text-[#c2c6db] px-3 py-1 rounded-full font-semibold">{item.tag}</span>
                <span className="text-xs text-[#909097]">{item.date}</span>
                <span className="text-xs text-[#909097]">·</span>
                <span className="text-xs text-[#909097]">{item.category}</span>
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-3">{item.title}</h3>
              <p className="text-sm text-[#c7c6cd] leading-relaxed mb-4">{item.desc}</p>
              <Link href="#" className="text-sm text-[#c2c6db] font-semibold hover:underline flex items-center gap-1">
                Đọc thêm <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Media Kit */}
      <Section>
        <div className="glass-card rounded-2xl p-10">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-3">Media Kit</h2>
          <p className="text-[#c7c6cd] mb-8">Tải xuống bộ tài nguyên truyền thông chính thức của Vaitech.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {mediaKitItems.map((item) => (
              <div key={item.title} className="bg-[#1d2022] rounded-xl p-5 border border-white/5">
                <item.Icon size={16} />
                <h3 className="font-semibold text-[#e0e3e5] text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-[#c7c6cd]">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link href="#" className="inline-flex items-center gap-2 bg-[#c2c6db] text-[#2b3040] px-8 py-3 rounded-lg font-bold text-sm hover:bg-transparent hover:text-[#c2c6db] border border-[#c2c6db] transition-all duration-300">
            <Download size={16} />
            Tải Media Kit (.zip)
          </Link>
        </div>
      </Section>

      <CtaBanner
        title="Liên hệ phòng truyền thông"
        desc="Dành cho nhà báo và đối tác truyền thông muốn phỏng vấn hoặc hợp tác."
        btnLabel="Liên hệ ngay"
        btnHref="/contact"
      />
    </>
  )
}
