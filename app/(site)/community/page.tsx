import Link from 'next/link'
import { Heart, MessageCircle } from 'lucide-react'
import { PageHeader, Section, GlassCard, CtaBanner } from '@/components/ui/PageComponents'

const discussions = [
  { author: 'Minh Tuấn', avatar: 'T', time: '2 giờ trước', title: 'Chia sẻ: Cách tối ưu tốc độ tải trang từ 3s xuống 0.8s', replies: 24, likes: 87, tag: 'Hiệu suất' },
  { author: 'Lan Phương', avatar: 'L', time: '5 giờ trước', title: 'Hỏi: Tích hợp Zalo OA vào website có khó không?', replies: 12, likes: 34, tag: 'Tích hợp' },
  { author: 'Hoàng Nam', avatar: 'H', time: '1 ngày trước', title: 'Showcase: Website khách sạn mới build bằng Vaitech', replies: 31, likes: 156, tag: 'Showcase' },
  { author: 'Thu Hà', avatar: 'T', time: '1 ngày trước', title: 'Chia sẻ kinh nghiệm SEO với mẫu doanh nghiệp Vaitech', replies: 18, likes: 72, tag: 'SEO' },
  { author: 'Quốc Bảo', avatar: 'Q', time: '2 ngày trước', title: 'Hỏi: Cách thêm custom font tiếng Việt có dấu đúng cách?', replies: 9, likes: 28, tag: 'Thiết kế' },
]

const events = [
  { date: '15 Jun', title: 'Webinar: Xây dựng website bán hàng hiệu quả với AI', type: 'Online', spots: '48 chỗ còn' },
  { date: '22 Jun', title: 'Workshop: UI/UX Design System thực chiến', type: 'Hà Nội', spots: '12 chỗ còn' },
  { date: '5 Jul', title: 'Meetup cộng đồng Vaitech tháng 7', type: 'TP.HCM', spots: 'Miễn phí' },
]

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        badge="CỘNG ĐỒNG"
        title="Kết nối cùng"
        accent="hàng nghìn người"
        desc="Chia sẻ, học hỏi và cùng nhau phát triển với cộng đồng những người xây dựng sản phẩm số Việt Nam."
      />

      {/* Stats */}
      <section className="px-6 md:px-16 max-w-[1280px] mx-auto mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '8,400+', label: 'Thành viên' },
            { value: '1,200+', label: 'Thảo luận' },
            { value: '350+', label: 'Showcase' },
            { value: '24', label: 'Sự kiện/năm' },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-6 text-center">
              <div className="text-3xl font-bold font-[family-name:var(--font-montserrat)] text-[#c2c6db] mb-1">{s.value}</div>
              <div className="text-sm text-[#c7c6cd]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Discussions */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5]">Thảo luận mới nhất</h2>
              <Link href="#" className="text-xs text-[#c2c6db] font-semibold hover:underline">Xem tất cả</Link>
            </div>
            <div className="space-y-3">
              {discussions.map((d) => (
                <Link key={d.title} href="#" className="glass-card rounded-xl p-5 flex gap-4 hover:border-[#c2c6db]/30 transition-all duration-300 block">
                  <div className="w-9 h-9 rounded-full bg-[#c2c6db]/20 flex items-center justify-center text-sm font-bold text-[#c2c6db] flex-shrink-0">
                    {d.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs bg-[#1d2022] border border-white/5 text-[#c7c6cd] px-2 py-0.5 rounded-full">{d.tag}</span>
                      <span className="text-xs text-[#909097]">{d.author} · {d.time}</span>
                    </div>
                    <p className="text-sm font-semibold text-[#e0e3e5] truncate">{d.title}</p>
                    <div className="flex gap-4 mt-2 text-xs text-[#909097]">
                      <span className="flex items-center gap-1"><MessageCircle size={16} />{d.replies}</span>
                      <span className="flex items-center gap-1"><Heart size={16} />{d.likes}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5]">Sự kiện sắp tới</h2>
            </div>
            <div className="space-y-4">
              {events.map((ev) => (
                <GlassCard key={ev.title} className="!p-5">
                  <div className="flex gap-4">
                    <div className="text-center flex-shrink-0">
                      <div className="text-lg font-bold text-[#c2c6db] font-[family-name:var(--font-montserrat)]">{ev.date.split(' ')[0]}</div>
                      <div className="text-xs text-[#909097]">{ev.date.split(' ')[1]}</div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#e0e3e5] mb-1">{ev.title}</p>
                      <div className="flex gap-2 text-xs text-[#909097]">
                        <span>{ev.type}</span>
                        <span>·</span>
                        <span className="text-[#c2c6db]">{ev.spots}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CtaBanner
        title="Tham gia cộng đồng ngay"
        desc="Đăng ký miễn phí để chia sẻ, hỏi đáp và kết nối với hàng nghìn nhà phát triển."
        btnLabel="Tham gia miễn phí"
        btnHref="/register"
      />
    </>
  )
}
