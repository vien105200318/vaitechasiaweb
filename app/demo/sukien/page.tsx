'use client'
import { useState, useEffect } from 'react'
import { CalendarDays, MapPin, Clock, Users, Star, Ticket, ArrowRight, ChevronRight, Heart, Share2, MessageCircle } from 'lucide-react'
import { DemoBackButton, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const EVENTS = [
  { id: 1, title: 'Festival Âm Nhạc Đường Phố', date: '2026-08-15', time: '18:00', location: 'Hồ Gươm, Hà Nội', cat: 'Văn hóa', attendees: 2500, maxAttendees: 5000, desc: 'Đêm nhạc đường phố với hơn 20 nghệ sĩ indie, food truck, và workshop sáng tạo.', color: 'from-orange-500 to-red-500', tag: '🔥 Hot' },
  { id: 2, title: 'Triển Lãm Nghệ Thuật Số', date: '2026-08-22', time: '09:00', location: 'Bảo Tàng Mỹ Thuật, HCM', cat: 'Nghệ thuật', attendees: 800, maxAttendees: 1500, desc: 'Trưng bày 150+ tác phẩm NFT từ 50 nghệ sĩ trẻ Việt Nam.', color: 'from-violet-500 to-purple-600', tag: '✨ Mới' },
  { id: 3, title: 'Hội Thảo Công Nghệ Giáo Dục', date: '2026-09-05', time: '08:30', location: 'ĐHQG Hà Nội', cat: 'Giáo dục', attendees: 350, maxAttendees: 800, desc: 'AI trong giáo dục, gamification, và xu hướng EdTech 2027.', color: 'from-sky-500 to-blue-600', tag: '📚 Học thuật' },
  { id: 4, title: 'Ngày Hội Sách & Văn Đọc', date: '2026-09-12', time: '08:00', location: 'Công viên Thống Nhất, HN', cat: 'Văn hóa', attendees: 4200, maxAttendees: 8000, desc: 'Giao lưu tác giả, đọc sách miễn phí, workshops viết sáng tạo.', color: 'from-emerald-500 to-teal-500', tag: '📖 Sách' },
  { id: 5, title: 'Cuộc Thi StartUp Camp', date: '2026-09-20', time: '14:00', location: 'Innovation Hub, Đà Nẵng', cat: 'Kinh doanh', attendees: 120, maxAttendees: 200, desc: '48h startup marathon, mentorship từ 20+ CEO, giải thưởng 500 triệu.', color: 'from-amber-500 to-orange-500', tag: '🚀 Startup' },
  { id: 6, title: 'Lễ Hội Ẩm Thực Đường Phố', date: '2026-10-01', time: '16:00', location: 'Phố Đi Bộ, HCM', cat: 'Ẩm thực', attendees: 6000, maxAttendees: 10000, desc: '50+ gian hàng ẩm thực 3 miền, cooking show, competition ẩm thực.', color: 'from-rose-500 to-pink-500', tag: '🍜 Ẩm thực' },
]

const CATEGORIES = ['Tất cả', 'Văn hóa', 'Nghệ thuật', 'Giáo dục', 'Kinh doanh', 'Ẩm thực']

function Countdown({ date }: { date: string }) {
  const [diff, setDiff] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const calc = () => {
      const t = new Date(date).getTime() - Date.now()
      if (t <= 0) return { d: 0, h: 0, m: 0, s: 0 }
      return { d: Math.floor(t / 86400000), h: Math.floor((t % 86400000) / 3600000), m: Math.floor((t % 3600000) / 60000), s: Math.floor((t % 60000) / 1000) }
    }
    setDiff(calc())
    const t = setInterval(() => setDiff(calc()), 1000)
    return () => clearInterval(t)
  }, [date])
  return (
    <div className="flex gap-1.5">
      {[
        { v: diff.d, l: 'NGÀY' },
        { v: diff.h, l: 'GIỜ' },
        { v: diff.m, l: 'PHÚT' },
        { v: diff.s, l: 'GIÂY' },
      ].map(x => (
        <div key={x.l} className="text-center">
          <div className="bg-orange-500 text-white text-xs font-black font-mono w-10 h-10 flex items-center justify-center rounded-lg shadow-md shadow-orange-500/20">
            {String(x.v).padStart(2, '0')}
          </div>
          <div className="text-[7px] text-orange-300/50 mt-0.5 tracking-widest">{x.l}</div>
        </div>
      ))}
    </div>
  )
}

export default function SuKienDemo() {
  const { toasts, add } = useToast()
  const [cat, setCat] = useState('Tất cả')
  const [reg, setReg] = useState<Set<number>>(new Set())
  const [modal, setModal] = useState<number|null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const filtered = EVENTS.filter(e => cat === 'Tất cả' || e.cat === cat)
  const ev = modal !== null ? EVENTS.find(e => e.id === modal)! : null

  const handleReg = async () => {
    if (!ev || !name || !email) { add('Vui lòng điền đầy đủ', 'error'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setReg(prev => new Set(prev).add(ev.id))
    setModal(null); setName(''); setEmail('')
    add(`Đăng ký thành công: ${ev.title}`, 'success')
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* ── Header — festival energy ── */}
      <div className="bg-[#1a1a1a] border-b border-orange-500/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30"><CalendarDays size={18} className="text-white" /></div>
            <div>
              <span className="text-sm font-bold tracking-tight text-orange-200">Sự Kiện Cộng Đồng</span>
              <span className="text-[9px] text-orange-400/40 ml-2 font-semibold tracking-wider">EVENT HUB</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-orange-400/30 font-mono">{EVENTS.length} sự kiện sắp tới</span>
          </div>
        </div>
      </div>

      {/* ── Hero — dramatic dark with countdown ── */}
      <section className="relative px-4 pt-12 pb-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-red-600/5 rounded-full blur-[100px]" />
          {/* Confetti dots */}
          <div className="absolute top-10 left-[20%] w-1.5 h-1.5 bg-orange-400/30 rounded-full" />
          <div className="absolute top-20 left-[60%] w-2 h-2 bg-amber-400/20 rounded-full" />
          <div className="absolute top-14 right-[25%] w-1 h-1 bg-red-400/30 rounded-full" />
          <div className="absolute bottom-16 left-[40%] w-1.5 h-1.5 bg-orange-400/20 rounded-full" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-300 text-[10px] font-bold px-3 py-1 rounded-full mb-5 tracking-wider">
            <span className="animate-pulse">🎉</span> MIỄN PHÍ CHO CÁN BỘ NHÀ NƯỚC
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3 tracking-tight">
            KHÁM PHÁ<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">SỰ KIỆN</span><br/>
            CỘNG ĐỒNG
          </h1>
          <p className="text-orange-300/30 text-sm max-w-md leading-relaxed mb-6">
            Đăng ký · Countdown · QR check-in · Quản lý sự kiện.<br/>
            Serverless · Miễn phí · Tích hợp lịch cá nhân.
          </p>

          <div className="grid grid-cols-4 gap-3 max-w-lg">
            {[
              { v: EVENTS.length, l: 'SỰ KIỆN', c: 'text-orange-400' },
              { v: 13970, l: 'ĐÃ ĐĂNG KÝ', c: 'text-amber-400' },
              { v: 6, l: 'DANH MỤC', c: 'text-red-400' },
              { v: 99, s: '%', l: 'UPTIME', c: 'text-green-400' },
            ].map(s => (
              <div key={s.l} className="bg-[#1a1a1a] border border-orange-500/10 rounded-xl p-3 text-center">
                <div className={`text-lg font-black font-mono ${s.c}`}><CountUp target={s.v} />{s.s || ''}</div>
                <div className="text-[8px] text-orange-400/30 tracking-widest mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category pills ── */}
      <section className="px-4 pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  cat === c ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-[#1a1a1a] text-orange-300/50 border border-orange-500/10 hover:border-orange-500/25'
                }`}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events — vertical timeline ── */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-orange-500/10" />

            <div className="space-y-6">
              {filtered.map((ev, i) => (
                <div key={ev.id} className="relative pl-16 md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-6 w-5 h-5 rounded-full bg-[#0f0f0f] border-2 border-orange-500/40 flex items-center justify-center z-10">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  </div>

                  {/* Event card */}
                  <div className="bg-[#1a1a1a] border border-orange-500/10 rounded-2xl overflow-hidden hover:border-orange-500/25 transition-all group"
                    onClick={() => setModal(ev.id)}>
                    <div className={`h-1.5 bg-gradient-to-r ${ev.color}`} />
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-bold">{ev.tag}</span>
                            <span className="text-[10px] text-orange-400/30">{ev.cat}</span>
                          </div>
                          <div className="text-base font-bold text-white mb-1">{ev.title}</div>
                          <p className="text-xs text-orange-300/30 leading-relaxed">{ev.desc}</p>
                        </div>
                        {reg.has(ev.id) && (
                          <span className="text-[10px] px-2 py-1 rounded-lg bg-green-500/10 text-green-400 font-bold whitespace-nowrap">✓ Đã đăng ký</span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-[10px] text-orange-400/40 mb-3">
                        <span className="flex items-center gap-1"><CalendarDays size={10} />{new Date(ev.date).toLocaleDateString('vi', { day: '2-digit', month: '2-digit' })}</span>
                        <span className="flex items-center gap-1"><Clock size={10} />{ev.time}</span>
                        <span className="flex items-center gap-1"><MapPin size={10} />{ev.location}</span>
                        <span className="flex items-center gap-1"><Users size={10} />{ev.attendees}/{ev.maxAttendees}</span>
                      </div>

                      {/* Capacity bar */}
                      <div className="h-1.5 bg-orange-500/10 rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all" style={{ width: `${(ev.attendees / ev.maxAttendees) * 100}%` }} />
                      </div>

                      {/* Countdown + actions */}
                      <div className="flex items-center justify-between">
                        <Countdown date={ev.date} />
                        <div className="flex items-center gap-2">
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-colors"><Heart size={12} /></button>
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-colors"><Share2 size={12} /></button>
                          <ChevronRight size={14} className="text-orange-400/30 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Community wall ── */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-[10px] text-orange-400/30 tracking-widest font-bold mb-4">ĐÁNH TỪ CỘNG ĐỒNG</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: 'Minh Anh', msg: 'Festival âm nhạc thật sự tuyệt vời! Year next definitely coming back.', stars: 5 },
              { name: 'Hoàng Long', msg: 'Triển lãm nghệ thuật số rất ấn tượng. Đã học được rất nhiều.', stars: 5 },
              { name: 'Thu Hà', msg: 'Hội thảo công nghệ giáo dục rất bổ ích, speaker rất có chuyên môn.', stars: 4 },
            ].map((r, i) => (
              <div key={i} className="bg-[#1a1a1a] border border-orange-500/10 rounded-xl p-4">
                <div className="flex items-center gap-0.5 text-orange-400 text-[10px] mb-2">
                  {Array.from({ length: r.stars }, (_, j) => <Star key={j} size={10} className="fill-orange-400" />)}
                </div>
                <p className="text-xs text-orange-300/40 leading-relaxed mb-2">&ldquo;{r.msg}&rdquo;</p>
                <div className="text-[10px] text-orange-400/60 font-bold">— {r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gov CTA ── */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto bg-[#1a1a1a] border border-orange-500/15 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="text-[10px] text-orange-400/40 tracking-widest font-bold mb-2">ĐƠN VỊ NHÀ NƯỚC</div>
            <div className="text-lg font-bold text-white mb-2">Tổ chức sự kiện cộng đồng</div>
            <p className="text-xs text-orange-300/30 leading-relaxed">Quản lý sự kiện, check-in QR, khảo sát hài lòng, báo cáo tự động — serverless, miễn phí.</p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-400 text-[#0f0f0f] font-bold px-6 py-3 rounded-xl text-sm transition-all active:scale-95 whitespace-nowrap">Liên hệ hợp tác →</button>
        </div>
      </section>

      {/* Registration modal */}
      {ev && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md" onClick={() => setModal(null)}>
          <div className="bg-[#1a1a1a] border border-orange-500/15 rounded-2xl max-w-md mx-4 w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className={`h-2 bg-gradient-to-r ${ev.color} rounded-t-2xl`} />
            <div className="p-6">
              <div className="text-[10px] text-orange-400/30 tracking-widest font-bold mb-1">ĐĂNG KÝ SỰ KIỆN</div>
              <div className="text-base font-bold text-white mb-4">{ev.title}</div>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-[10px] text-orange-400/40 tracking-widest font-bold mb-1 block">HỌ VÀ TÊN</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Nguyễn Văn A"
                    className="w-full bg-[#0f0f0f] border border-orange-500/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-orange-500/20 outline-none focus:border-orange-500/40 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] text-orange-400/40 tracking-widest font-bold mb-1 block">EMAIL</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email@example.com"
                    className="w-full bg-[#0f0f0f] border border-orange-500/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-orange-500/20 outline-none focus:border-orange-500/40 transition-colors" />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-1 text-[10px] text-orange-400/30"><CalendarDays size={10} />{new Date(ev.date).toLocaleDateString('vi')}</div>
                <div className="flex items-center gap-1 text-[10px] text-orange-400/30"><Clock size={10} />{ev.time}</div>
                <div className="flex items-center gap-1 text-[10px] text-orange-400/30"><MapPin size={10} />{ev.location}</div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setModal(null)} className="flex-1 bg-[#0f0f0f] border border-orange-500/15 text-orange-300/50 font-bold py-3 rounded-xl text-sm transition-all hover:bg-orange-500/5">Hủy</button>
                <button onClick={handleReg} disabled={loading || reg.has(ev.id)}
                  className="flex-1 bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/30 text-[#0f0f0f] font-bold py-3 rounded-xl text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:cursor-not-allowed">
                  {loading ? <div className="w-4 h-4 border-2 border-[#0f0f0f]/30 border-t-[#0f0f0f] rounded-full animate-spin" /> : reg.has(ev.id) ? '✓ Đã đăng ký' : 'Đăng ký ngay'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-orange-500/10 px-4 py-6">
        <div className="max-w-6xl mx-auto text-center text-[10px] text-orange-400/20">© 2026 EventHub · Powered by Vaitech</div>
      </div>
    </div>
  )
}
