'use client'
import { useState } from 'react'
import { MessageCircleWarning, ThumbsUp, ThumbsDown, Clock, CheckCircle2, AlertTriangle, Building2, Shield, Send, Filter, ArrowUpRight, BarChart3, PieChart, TrendingUp, ChevronRight } from 'lucide-react'
import { DemoBackButton, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const FEEDBACKS = [
  { id: 1, title: 'Đường Nguyễn Trãi bị ổ gà lớn', area: 'Giao thông', status: 'processing', votes: 234, date: '2h trước', priority: 'high' },
  { id: 2, title: 'Yêu cầu lắp đèn đường phố 45', area: 'Đô thị', status: 'resolved', votes: 89, date: '1 ngày', priority: 'medium' },
  { id: 3, title: 'Nước sạch khu 3 bị ô nhiễm', area: 'Môi trường', status: 'urgent', votes: 567, date: '30 phút', priority: 'critical' },
  { id: 4, title: 'Cần thêm thùng rác công cộng', area: 'Môi trường', status: 'new', votes: 45, date: '3 giờ', priority: 'low' },
  { id: 5, title: 'Phố đi bộ cần mở rộng thời gian', area: 'Văn hóa', status: 'processing', votes: 312, date: '5 giờ', priority: 'medium' },
  { id: 6, title: 'Trường THPT A cần sửa chữa mái', area: 'Giáo dục', status: 'new', votes: 178, date: '1 giờ', priority: 'high' },
]

const AREAS = [
  { name: 'Giao thông', count: 1234, trend: +12, color: '#3b82f6' },
  { name: 'Môi trường', count: 987, trend: +8, color: '#22c55e' },
  { name: 'Đô thị', count: 756, trend: -3, color: '#f59e0b' },
  { name: 'Giáo dục', count: 543, trend: +15, color: '#8b5cf6' },
  { name: 'Y tế', count: 432, trend: +5, color: '#ef4444' },
]

const STATUS_MAP = {
  new: { label: 'Mới', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  processing: { label: 'Đang xử lý', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  urgent: { label: 'Khẩn cấp', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  resolved: { label: 'Đã giải quyết', bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
}

export default function PhanHoiDemo() {
  const { toasts, add } = useToast()
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [area, setArea] = useState('')
  const [filter, setFilter] = useState('all')
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [votes, setVotes] = useState<Set<number>>(new Set())

  const filtered = FEEDBACKS.filter(f => filter === 'all' || f.status === filter)
  const totalNew = FEEDBACKS.filter(f => f.status === 'new').length
  const totalProcessing = FEEDBACKS.filter(f => f.status === 'processing').length
  const totalUrgent = FEEDBACKS.filter(f => f.status === 'urgent').length
  const totalResolved = FEEDBACKS.filter(f => f.status === 'resolved').length

  const handleSubmit = async () => {
    if (!title || !area) { add('Vui lòng điền đầy đủ', 'error'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false); setModal(false); setDone(true)
    setTitle(''); setDetail(''); setArea('')
    add('Phản hồi đã gửi thành công! Mã: PH-' + Math.floor(Math.random() * 9000 + 1000), 'success')
  }

  const toggleVote = (id: number) => {
    const next = new Set(votes)
    if (next.has(id)) next.delete(id); else next.add(id)
    setVotes(next)
  }

  return (
    <div className="min-h-screen bg-[#0c1117] text-white overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* ── Header — institutional government ── */}
      <div className="bg-[#111820] border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center border border-slate-500/20 shadow-lg"><Building2 size={18} className="text-white" /></div>
            <div>
              <span className="text-sm font-bold tracking-tight text-slate-200">Cổng Phản Hồi</span>
              <span className="text-[9px] text-slate-500 ml-2 font-semibold tracking-wider">CITIZEN DASHBOARD</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><Shield size={10} className="text-green-500" />Bảo mật quốc gia</span>
            <span className="font-mono">v3.1.0</span>
          </div>
        </div>
      </div>

      {/* ── Hero — minimal institutional ── */}
      <section className="px-4 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-slate-800/50 border border-slate-700/30 text-slate-400 text-[10px] font-bold px-3 py-1 rounded mb-4 tracking-wider">
            <Shield size={10} className="text-green-500" />MIỄN PHÍ CHO CÁN BỘ NHÀ NƯỚC
          </div>
          <h1 className="text-2xl md:text-4xl font-black leading-tight mb-2 tracking-tight text-slate-100">
            HỆ THỐNG<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">PHẢN HỒI DÂN SỰ</span>
          </h1>
          <p className="text-sm text-slate-500 max-w-md leading-relaxed">
            Dashboard real-time · Pipeline xử lý · Thống kê KPI.<br/>
            Serverless · Minh bạch · Phản hồi trong 24h.
          </p>
        </div>
      </section>

      {/* ── KPI Pipeline bar ── */}
      <section className="px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: MessageCircleWarning, count: totalNew, label: 'MỚI', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/15' },
              { icon: Clock, count: totalProcessing, label: 'ĐANG XỬ LÝ', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/15' },
              { icon: AlertTriangle, count: totalUrgent, label: 'KHẨN CẤP', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/15' },
              { icon: CheckCircle2, count: totalResolved, label: 'ĐÃ GIẢI QUYẾT', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/15' },
            ].map(s => (
              <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-3 text-center`}>
                <s.icon size={14} className={`${s.color} mx-auto mb-1.5`} />
                <div className={`text-xl font-black font-mono ${s.color}`}><CountUp target={s.count} /></div>
                <div className="text-[8px] text-slate-500 tracking-widest mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main: Split layout ── */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Feedback list + filter */}
          <div className="lg:col-span-7">
            {/* Filter */}
            <div className="flex items-center gap-2 mb-4">
              <Filter size={12} className="text-slate-500" />
              {['all', 'new', 'processing', 'urgent', 'resolved'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    filter === f ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' : 'bg-slate-800/50 text-slate-500 border border-slate-700/20 hover:border-slate-600/30'
                  }`}>{f === 'all' ? 'Tất cả' : STATUS_MAP[f as keyof typeof STATUS_MAP].label}</button>
              ))}
            </div>

            {/* Feedback list */}
            <div className="space-y-2">
              {filtered.map(fb => {
                const st = STATUS_MAP[fb.status as keyof typeof STATUS_MAP]
                return (
                  <div key={fb.id} className="bg-[#111820] border border-slate-700/20 rounded-xl p-4 hover:border-slate-600/30 transition-all">
                    <div className="flex items-start gap-3">
                      {/* Vote button */}
                      <button onClick={() => toggleVote(fb.id)}
                        className={`flex flex-col items-center gap-0.5 min-w-[40px] pt-1 transition-all ${
                          votes.has(fb.id) ? 'text-blue-400' : 'text-slate-600 hover:text-slate-400'
                        }`}>
                        <ThumbsUp size={14} className={votes.has(fb.id) ? 'fill-blue-400' : ''} />
                        <span className="text-[10px] font-bold font-mono">{fb.votes + (votes.has(fb.id) ? 1 : 0)}</span>
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${st.bg} ${st.text} ${st.border}`}>{st.label}</span>
                          <span className="text-[9px] text-slate-600">{fb.area}</span>
                          <span className="text-[9px] text-slate-600 ml-auto">{fb.date}</span>
                        </div>
                        <div className="text-sm text-slate-200 font-medium">{fb.title}</div>
                      </div>

                      <ChevronRight size={14} className="text-slate-700 mt-2" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Stats dashboard */}
          <div className="lg:col-span-5 space-y-4">
            {/* Area breakdown */}
            <div className="bg-[#111820] border border-slate-700/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] text-slate-500 tracking-widest font-bold">PHÂN BỔ THEO LĨNH VỰC</div>
                <BarChart3 size={12} className="text-slate-600" />
              </div>
              <div className="space-y-3">
                {AREAS.map(a => (
                  <div key={a.name}>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400">{a.name}</span>
                      <span className="text-slate-500 font-mono">{a.count.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(a.count / 1234) * 100}%`, background: a.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolution rate */}
            <div className="bg-[#111820] border border-slate-700/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] text-slate-500 tracking-widest font-bold">TỶ LỆ GIẢI QUYẾT</div>
                <TrendingUp size={12} className="text-green-500" />
              </div>
              <div className="flex items-end gap-4">
                <div>
                  <div className="text-3xl font-black text-green-400 font-mono">87%</div>
                  <div className="text-[10px] text-slate-500">trong 24h</div>
                </div>
                <div className="flex-1 h-16 flex items-end gap-1">
                  {[65, 72, 78, 80, 83, 85, 87].map((v, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-green-500/40 to-green-500/10 rounded-t" style={{ height: `${v}%` }} />
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-[8px] text-slate-600 mt-1">
                <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span>
              </div>
            </div>

            {/* Quick submit button */}
            <button onClick={() => setModal(true)}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3.5 rounded-xl text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
              <Send size={14} />Gửi Phản Hồi Mới
            </button>
          </div>
        </div>
      </section>

      {/* ── Gov CTA ── */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto bg-[#111820] border border-slate-700/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="text-[10px] text-slate-500 tracking-widest font-bold mb-2">ĐƠN VỊ NHÀ NƯỚC</div>
            <div className="text-lg font-bold text-slate-200 mb-2">Triển khai hệ thống phản hồi</div>
            <p className="text-xs text-slate-500 leading-relaxed">Dashboard real-time, pipeline xử lý, báo cáo KPI tự động — serverless, miễn phí, bảo mật quốc gia.</p>
          </div>
          <button className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all active:scale-95 whitespace-nowrap border border-slate-600/50">Liên hệ hợp tác →</button>
        </div>
      </section>

      {/* Submit modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md" onClick={() => setModal(false)}>
          <div className="bg-[#111820] border border-slate-700/20 rounded-2xl max-w-md mx-4 w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="text-[10px] text-slate-500 tracking-widest font-bold mb-1">PHẢN HỒI DÂN SỰ</div>
              <div className="text-base font-bold text-slate-200 mb-4">Gửi phản hồi mới</div>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-[10px] text-slate-500 tracking-widest font-bold mb-1 block">TIÊU ĐỀ</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Mô tả vấn đề..."
                    className="w-full bg-[#0c1117] border border-slate-700/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/40 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 tracking-widest font-bold mb-1 block">LĨNH VỰC</label>
                  <select value={area} onChange={e => setArea(e.target.value)}
                    className="w-full bg-[#0c1117] border border-slate-700/30 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500/40 transition-colors appearance-none">
                    <option value="">Chọn lĩnh vực...</option>
                    {AREAS.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 tracking-widest font-bold mb-1 block">CHI TIẾT</label>
                  <textarea value={detail} onChange={e => setDetail(e.target.value)} rows={3} placeholder="Mô tả chi tiết..."
                    className="w-full bg-[#0c1117] border border-slate-700/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/40 transition-colors resize-none" />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setModal(false)} className="flex-1 bg-slate-800 border border-slate-700/30 text-slate-400 font-bold py-3 rounded-xl text-sm transition-all hover:bg-slate-800/80">Hủy</button>
                <button onClick={handleSubmit} disabled={loading}
                  className="flex-1 bg-blue-500 hover:bg-blue-400 disabled:bg-blue-500/30 text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:cursor-not-allowed">
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={12} />Gửi phản hồi</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success overlay */}
      {done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#111820] border border-slate-700/20 rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={28} className="text-green-400" /></div>
            <div className="text-lg font-bold text-slate-200 mb-1">Gửi Thành Công!</div>
            <div className="text-xs text-slate-500 mb-4">Phản hồi sẽ được xử lý trong 24h. Theo dõi trên dashboard.</div>
            <button onClick={() => setDone(false)} className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-95">Đóng</button>
          </div>
        </div>
      )}

      <div className="border-t border-slate-700/20 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] text-slate-600">
          <span>© 2026 Cổng Phản Hồi Dân Sự · Powered by Vaitech</span>
          <span className="font-mono">SYSTEM v3.1.0</span>
        </div>
      </div>
    </div>
  )
}
