import Link from 'next/link'
import { Award, BookOpen, Clock, Laptop, MapPin, Plane, ShieldPlus } from 'lucide-react'
import { PageHeader, Section, GlassCard, CtaBanner } from '@/components/ui/PageComponents'
import type { LucideIcon } from 'lucide-react'

const openings = [
  { dept: 'Kỹ thuật', title: 'Senior Frontend Engineer', type: 'Toàn thời gian', location: 'Hà Nội / Remote', tags: ['React', 'Next.js', 'TypeScript'] },
  { dept: 'Kỹ thuật', title: 'Backend Engineer (Node.js)', type: 'Toàn thời gian', location: 'Hà Nội / Remote', tags: ['Node.js', 'PostgreSQL', 'AWS'] },
  { dept: 'Thiết kế', title: 'UI/UX Designer', type: 'Toàn thời gian', location: 'Hà Nội', tags: ['Figma', 'Motion Design', 'Design System'] },
  { dept: 'Thiết kế', title: 'Brand Designer', type: 'Bán thời gian', location: 'Remote', tags: ['Branding', 'Illustration', 'Adobe CC'] },
  { dept: 'Kinh doanh', title: 'Business Development Manager', type: 'Toàn thời gian', location: 'TP. HCM', tags: ['B2B Sales', 'CRM', 'Tiếng Anh'] },
  { dept: 'Marketing', title: 'Content & SEO Specialist', type: 'Toàn thời gian', location: 'Remote', tags: ['SEO', 'Copywriting', 'Analytics'] },
]

const perks: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: Award, title: 'Lương cạnh tranh', desc: 'Mức lương top 20% thị trường, review 2 lần/năm' },
  { Icon: Plane, title: 'Team building quốc tế', desc: 'Chuyến đi team building trong và ngoài nước hàng năm' },
  { Icon: BookOpen, title: 'Đào tạo & phát triển', desc: 'Ngân sách học tập 5 triệu/năm và mentor 1-1 hàng tuần' },
  { Icon: ShieldPlus, title: 'Bảo hiểm sức khỏe', desc: 'Bảo hiểm sức khỏe cao cấp cho cả gia đình' },
  { Icon: Clock, title: 'Giờ làm linh hoạt', desc: 'Tự chọn giờ làm, remote 3 ngày/tuần' },
  { Icon: Laptop, title: 'Thiết bị cao cấp', desc: 'MacBook Pro và màn hình 4K cho tất cả nhân viên' },
]

export default function CareersPage() {
  return (
    <>
      <PageHeader
        badge="TUYỂN DỤNG"
        title="Xây dựng tương lai"
        accent="cùng Vaitech"
        desc="Chúng tôi đang tìm kiếm những người tài năng, đam mê và muốn tạo ra sản phẩm kỹ thuật số tốt nhất Việt Nam."
      />

      {/* Perks */}
      <Section>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-8">Tại sao chọn Vaitech?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {perks.map((p) => (
            <GlassCard key={p.title} className="flex gap-4 !p-6">
              <p.Icon size={16} />
              <div>
                <h3 className="font-semibold text-[#e0e3e5] mb-1 text-sm">{p.title}</h3>
                <p className="text-xs text-[#c7c6cd] leading-relaxed">{p.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Job listings */}
      <Section>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-8">Vị trí đang tuyển</h2>
        <div className="space-y-4">
          {openings.map((job) => (
            <div key={job.title} className="glass-card rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#c2c6db]/30 transition-all duration-300">
              <div>
                <span className="text-xs text-[#c2c6db] font-semibold uppercase tracking-wider mb-2 block">{job.dept}</span>
                <h3 className="text-lg font-semibold text-[#e0e3e5] mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-[#1d2022] border border-white/5 text-[#c7c6cd] px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4 text-xs text-[#909097]">
                  <span className="flex items-center gap-1"><Clock size={16} />{job.type}</span>
                  <span className="flex items-center gap-1"><MapPin size={16} />{job.location}</span>
                </div>
              </div>
              <Link href="/contact" className="flex-shrink-0 px-6 py-2.5 border border-[#c2c6db]/40 text-[#c2c6db] rounded-lg text-sm font-semibold hover:bg-[#c2c6db] hover:text-[#2b3040] transition-all duration-300">
                Ứng tuyển
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Không thấy vị trí phù hợp?"
        desc="Gửi CV của bạn — chúng tôi luôn chào đón nhân tài xuất sắc."
        btnLabel="Gửi CV ngay"
        btnHref="/contact"
      />
    </>
  )
}
