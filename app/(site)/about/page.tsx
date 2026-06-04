import Image from 'next/image'
import { PageHeader, Section, GlassCard, CtaBanner } from '@/components/ui/PageComponents'

const values = [
  { icon: 'lightbulb', title: 'Đổi Mới Liên Tục', desc: 'Chúng tôi không ngừng nghiên cứu và ứng dụng công nghệ mới nhất để mang lại giải pháp tiên phong.' },
  { icon: 'handshake', title: 'Đối Tác Đồng Hành', desc: 'Không chỉ là nhà cung cấp dịch vụ — chúng tôi là đối tác chiến lược trong hành trình phát triển của bạn.' },
  { icon: 'verified', title: 'Chất Lượng Không Thỏa Hiệp', desc: 'Mỗi dự án đều được kiểm duyệt kỹ lưỡng theo tiêu chuẩn quốc tế trước khi bàn giao.' },
  { icon: 'people', title: 'Con Người Là Trung Tâm', desc: 'Mọi quyết định thiết kế đều xuất phát từ nhu cầu thực tế của người dùng cuối.' },
]

const stats = [
  { value: '2020', label: 'Năm thành lập' },
  { value: '200+', label: 'Dự án hoàn thành' },
  { value: '50+', label: 'Đối tác toàn cầu' },
  { value: '15+', label: 'Thành viên đội ngũ' },
]

const team = [
  { name: 'Nguyễn Minh Tuấn', role: 'CEO & Co-founder', avatar: 'person' },
  { name: 'Trần Thị Lan Anh', role: 'CTO & Co-founder', avatar: 'person' },
  { name: 'Lê Hoàng Nam', role: 'Head of Design', avatar: 'person' },
  { name: 'Phạm Thị Thu', role: 'Head of Engineering', avatar: 'person' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="VỀ CHÚNG TÔI"
        title="Kiến trúc sư của"
        accent="tương lai số"
        desc="Vaitech được thành lập với sứ mệnh đơn giản: giúp mọi doanh nghiệp Việt Nam có thể cạnh tranh trên sân chơi kỹ thuật số toàn cầu."
      />

      {/* Mission */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs tracking-widest uppercase text-[#c2c6db] font-semibold mb-4 block">SỨ MỆNH</span>
            <h2 className="text-3xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-6 leading-tight">
              Chúng tôi tin rằng thiết kế đẹp và công nghệ mạnh mẽ không phải đặc quyền của tập đoàn lớn
            </h2>
            <p className="text-[#c7c6cd] leading-relaxed mb-6">
              Từ năm 2020, chúng tôi đã xây dựng hơn 200 sản phẩm kỹ thuật số cho các doanh nghiệp thuộc đủ mọi lĩnh vực — từ startup công nghệ đến chuỗi nhà hàng, từ bệnh viện tư đến công ty logistics.
            </p>
            <p className="text-[#c7c6cd] leading-relaxed">
              Mỗi dự án là một cơ hội để chúng tôi kết hợp tư duy chiến lược, thiết kế thẩm mỹ cao cấp và công nghệ tiên tiến nhất thành một sản phẩm hoàn chỉnh.
            </p>
          </div>
          <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl"
              alt="Vaitech Team"
              fill
              className="object-cover"
             
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101415]/60 to-transparent" />
          </div>
        </div>
      </Section>

      {/* Stats */}
      <section className="py-16 bg-[#191c1e]">
        <div className="px-6 md:px-16 max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold font-[family-name:var(--font-montserrat)] text-[#c2c6db] mb-2">{s.value}</div>
              <div className="text-sm text-[#c7c6cd]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <Section>
        <h2 className="text-3xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-12 text-center">Giá trị cốt lõi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v) => (
            <GlassCard key={v.title} className="flex gap-5 !p-8">
              <div className="w-12 h-12 rounded-lg bg-[#0a0f1e] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#c2c6db] text-2xl">{v.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-[#e0e3e5] mb-2">{v.title}</h3>
                <p className="text-sm text-[#c7c6cd] leading-relaxed">{v.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section>
        <h2 className="text-3xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-12 text-center">Đội ngũ lãnh đạo</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="glass-card rounded-xl p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#c2c6db]/10 border border-[#c2c6db]/20 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[#c2c6db] text-3xl">{member.avatar}</span>
              </div>
              <h3 className="font-semibold text-[#e0e3e5] text-sm mb-1">{member.name}</h3>
              <p className="text-xs text-[#c7c6cd]">{member.role}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Cùng nhau tạo nên điều phi thường"
        desc="Hãy cho chúng tôi biết về dự án của bạn."
        btnLabel="Bắt đầu dự án"
        btnHref="/contact"
      />
    </>
  )
}
