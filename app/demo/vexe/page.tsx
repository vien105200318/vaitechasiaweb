'use client'
import { useState, useEffect, useMemo } from 'react'
import { Bus, MapPin, Clock, Ticket, Search, Navigation, Signal, Wifi, CreditCard, Shield, Users, ArrowRight } from 'lucide-react'
import { DemoBackButton, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const ROUTES = [
  { id: 1, from: 'Bến xe Miền Đông', to: 'Bến xe Hải Phòng', fromShort: 'HN', toShort: 'HP', price: 85000, duration: '2h 15', departures: ['06:00','08:30','11:00','14:00','17:00'], freq: '2h30/lượt', dist: 120 },
  { id: 2, from: 'Bến xe Giáp Bát', to: 'Bến xe Thanh Hóa', fromShort: 'HN', toShort: 'TH', price: 120000, duration: '3h 30', departures: ['05:30','09:00','13:00','16:30'], freq: '3h30/lượt', dist: 160 },
  { id: 3, from: 'Bến xe Miền Đông', to: 'Bến xe Đà Lạt', fromShort: 'HCM', toShort: 'DL', price: 165000, duration: '6h 00', departures: ['05:00','08:00','11:00','14:00'], freq: '3h/lượt', dist: 300 },
  { id: 4, from: 'Bến xe Đà Nẵng', to: 'Bến xe Huế', fromShort: 'DN', toShort: 'HU', price: 95000, duration: '2h 30', departures: ['06:00','09:00','12:00','15:00','18:00'], freq: '3h/lượt', dist: 105 },
  { id: 5, from: 'Bến xe Giáp Bát', to: 'Bến xe Ninh Bình', fromShort: 'HN', toShort: 'NB', price: 75000, duration: '2h 00', departures: ['06:30','09:30','13:30','17:00'], freq: '3h30/lượt', dist: 90 },
]

function RouteMap({ route }: { route: typeof ROUTES[0] }) {
  return (
    <div className="relative h-20 bg-[#0a1628] rounded-xl overflow-hidden mb-4">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(56,189,248,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.3) 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
      {/* Route line */}
      <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-sky-500/30 -translate-y-1/2" />
      <div className="absolute top-1/2 left-8 h-0.5 bg-sky-400 -translate-y-1/2" style={{ width: '60%' }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
      </div>
      {/* Points */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 -translate-x-1/2">
        <div className="w-4 h-4 bg-sky-500 rounded-full border-2 border-sky-300 shadow-lg shadow-sky-500/30" />
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-sky-300 font-bold whitespace-nowrap">{route.fromShort}</div>
      </div>
      <div className="absolute top-1/2 right-8 -translate-y-1/2 translate-x-1/2">
        <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-green-300 shadow-lg shadow-green-500/30" />
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-green-300 font-bold whitespace-nowrap">{route.toShort}</div>
      </div>
      {/* Bus icon */}
      <div className="absolute top-1/2 left-[55%] -translate-y-1/2 -translate-x-1/2">
        <div className="w-7 h-7 bg-sky-500 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/40 animate-bounce" style={{ animationDuration: '2s' }}>
          <Bus size={14} className="text-white" />
        </div>
      </div>
      {/* Distance */}
      <div className="absolute top-2 right-3 text-[8px] text-sky-400/60 font-mono">{route.dist}km</div>
    </div>
  )
}

export default function VeXeDemo() {
  const { toasts, add } = useToast()
  const [searchFrom, setSearchFrom] = useState('')
  const [searchTo, setSearchTo] = useState('')
  const [selected, setSelected] = useState<number | null>(null)
  const [time, setTime] = useState('')
  const [seats, setSeats] = useState(1)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [now, setNow] = useState(new Date())

  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])

  const seatWidths = useMemo(() => ROUTES.map(() => 30 + Math.floor(Math.random() * 50)), [])

  const filtered = ROUTES.filter(r =>
    (!searchFrom || r.fromShort.toLowerCase().includes(searchFrom.toLowerCase()) || r.from.toLowerCase().includes(searchFrom.toLowerCase())) &&
    (!searchTo || r.toShort.toLowerCase().includes(searchTo.toLowerCase()) || r.to.toLowerCase().includes(searchTo.toLowerCase()))
  )

  const r = selected !== null ? ROUTES.find(r => r.id === selected)! : null

  const handleBook = async () => {
    if (!r || !time) { add('Chọn tuyến và giờ đi trước', 'error'); return }
    setLoading(true)
    await new Promise(res => setTimeout(res, 1200))
    setLoading(false)
    setDone(true)
    add('Đặt vé thành công! Mã: VX-' + Math.floor(Math.random() * 9000 + 1000), 'success')
  }

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ fontFamily: "'JetBrains Mono', 'SF Mono', monospace", background: '#050a14' }}>
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* ── Top bar — transit system style ── */}
      <div className="bg-[#0a1628] border-b border-sky-500/10">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center"><Bus size={16} className="text-white" /></div>
            <span className="text-sm font-bold text-sky-300 tracking-wider">VÉ XE<span className="text-sky-500/50">.VN</span></span>
            <span className="text-[10px] text-sky-500/40 border border-sky-500/20 px-2 py-0.5 rounded">TRANSIT SYSTEM</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-sky-400/50 font-mono">
            <span className="flex items-center gap-1.5"><Signal size={10} className="text-green-400 animate-pulse" />LIVE</span>
            <span>{now.toLocaleTimeString('vi')}</span>
          </div>
        </div>
      </div>

      {/* ── Hero — dark transit dashboard ── */}
      <section className="relative px-4 pt-12 pb-10">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-sky-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-300 text-[10px] font-bold px-3 py-1 rounded-full mb-5 tracking-wider">
            <Shield size={10} />MIỄN PHÍ CHO ĐƠN VỊ NHÀ NƯỚC
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3 tracking-tight">
            HỆ THỐNG<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">ĐẶT VÉ XE</span><br/>
            CÔNG CỘNG
          </h1>
          <p className="text-sky-300/40 text-sm max-w-md mb-8 leading-relaxed">Serverless · GPS real-time · Thanh toán 0đ<br/>Theo dõi vị trí xe trên bản đồ thời gian thực.</p>

          {/* Live stats bar */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { v: 120, s: '+', l: 'TUYẾN', c: 'text-sky-400' },
              { v: 47, s: '', l: 'XE ĐANG CHẠY', c: 'text-green-400' },
              { v: 8500, s: '+', l: 'VÉ/ngày', c: 'text-cyan-400' },
              { v: 99, s: '%', l: 'UPTIME', c: 'text-emerald-400' },
            ].map(s => (
              <div key={s.l} className="bg-[#0a1628] border border-sky-500/10 rounded-xl p-3 text-center">
                <div className={`text-lg font-black font-mono ${s.c}`}><CountUp target={s.v} />{s.s}</div>
                <div className="text-[8px] text-sky-500/40 tracking-widest mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main: Route finder ── */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left: Search + Route list */}
            <div className="lg:col-span-5">
              {/* Search */}
              <div className="bg-[#0a1628] border border-sky-500/10 rounded-2xl p-4 mb-4">
                <div className="text-[10px] text-sky-500/50 tracking-widest mb-3 font-bold">TÌM TUYẾN</div>
                <div className="relative mb-3">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-sky-400 rounded-full" />
                  <input value={searchFrom} onChange={e => setSearchFrom(e.target.value)} placeholder="Điểm đi..."
                    className="w-full bg-[#0d1b2a] border border-sky-500/15 rounded-xl pl-7 pr-4 py-2.5 text-sm text-sky-200 placeholder-sky-600/40 outline-none focus:border-sky-500/40 transition-colors" />
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full" />
                  <input value={searchTo} onChange={e => setSearchTo(e.target.value)} placeholder="Điểm đến..."
                    className="w-full bg-[#0d1b2a] border border-sky-500/15 rounded-xl pl-7 pr-4 py-2.5 text-sm text-sky-200 placeholder-sky-600/40 outline-none focus:border-sky-500/40 transition-colors" />
                </div>
              </div>

              {/* Route list */}
              <div className="space-y-2">
                {filtered.map(route => (
                  <button key={route.id} onClick={() => { setSelected(route.id); setTime('') }}
                    className={`w-full text-left bg-[#0a1628] border rounded-xl p-4 transition-all ${
                      selected === route.id ? 'border-sky-500/50 shadow-lg shadow-sky-500/5' : 'border-sky-500/10 hover:border-sky-500/25'
                    }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-sky-300">{route.fromShort}</span>
                        <ArrowRight size={10} className="text-sky-600" />
                        <span className="text-xs font-bold text-green-300">{route.toShort}</span>
                      </div>
                      <span className="text-sm font-black text-sky-400 font-mono">{route.price.toLocaleString()}đ</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-sky-500/40">
                      <span>{route.duration} · {route.freq}</span>
                      <span>{route.departures.length} chuyến/ngày</span>
                    </div>
                    {/* Mini seat bar */}
                    <div className="mt-2 h-1 bg-sky-500/10 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500/40 rounded-full" style={{ width: `${seatWidths[route.id - 1]}%` }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Selected route detail */}
            <div className="lg:col-span-7">
              {r ? (
                <div className="bg-[#0a1628] border border-sky-500/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-[10px] text-sky-500/50 tracking-widest font-bold">CHI TIẾT TUYẾN</div>
                      <div className="text-lg font-bold text-sky-200 mt-1">{r.from} → {r.to}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-sky-400 font-mono">{r.price.toLocaleString()}đ</div>
                      <div className="text-[10px] text-sky-500/40">/vé · {r.dist}km</div>
                    </div>
                  </div>

                  <RouteMap route={r} />

                  {/* Time selection */}
                  <div className="text-[10px] text-sky-500/50 tracking-widest font-bold mb-3">CHỌN GIỜ ĐI</div>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {r.departures.map(t => (
                      <button key={t} onClick={() => setTime(t)}
                        className={`py-2.5 rounded-xl text-xs font-bold font-mono transition-all ${
                          time === t ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'bg-[#0d1b2a] text-sky-400 hover:bg-sky-500/10 border border-sky-500/10'
                        }`}>{t}</button>
                    ))}
                  </div>

                  {/* Seats */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] text-sky-500/50 tracking-widest font-bold">SỐ GHẾ</span>
                    <div className="flex items-center bg-[#0d1b2a] border border-sky-500/15 rounded-xl overflow-hidden">
                      <button onClick={() => setSeats(Math.max(1, seats - 1))} className="w-10 h-10 flex items-center justify-center text-sky-400 hover:bg-sky-500/10 transition-colors font-bold">−</button>
                      <span className="w-10 text-center font-bold font-mono text-sky-200">{seats}</span>
                      <button onClick={() => setSeats(Math.min(10, seats + 1))} className="w-10 h-10 flex items-center justify-center text-sky-400 hover:bg-sky-500/10 transition-colors font-bold">+</button>
                    </div>
                    <div className="text-xs text-sky-500/40 ml-auto">Tổng: <span className="text-sky-300 font-bold font-mono">{(r.price * seats).toLocaleString()}đ</span></div>
                  </div>

                  <button onClick={handleBook} disabled={loading || !time}
                    className="w-full bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/30 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm disabled:cursor-not-allowed">
                    {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Ticket size={16} />ĐẶT VÉ NGAY</>}
                  </button>
                </div>
              ) : (
                <div className="bg-[#0a1628] border border-sky-500/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center mb-4"><Navigation size={24} className="text-sky-500/40" /></div>
                  <div className="text-sm text-sky-500/40">Chọn tuyến đường để xem chi tiết</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features — horizontal scroll ── */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-[10px] text-sky-500/50 tracking-widest font-bold mb-4">TÍNH NĂNG</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { Icon: Signal, title: 'GPS Live', desc: 'Theo dõi xe real-time' },
              { Icon: CreditCard, title: 'Thanh toán 0đ', desc: 'Miễn phí nhà nước' },
              { Icon: Shield, title: 'Bảo mật', desc: 'Chuẩn quốc gia' },
              { Icon: Wifi, title: 'Đa ngôn ngữ', desc: '12 ngôn ngữ' },
            ].map((f, i) => (
              <div key={i} className="bg-[#0a1628] border border-sky-500/10 rounded-xl p-4 hover:border-sky-500/25 transition-colors group">
                <f.Icon size={18} className="text-sky-500/40 mb-3 group-hover:text-sky-400 transition-colors" />
                <div className="text-xs font-bold text-sky-300 mb-0.5">{f.title}</div>
                <div className="text-[10px] text-sky-500/40">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gov CTA ── */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto bg-[#0a1628] border border-green-500/15 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="text-[10px] text-green-400 tracking-widest font-bold mb-2">HỢP TÁC NHÀ NƯỚC</div>
            <div className="text-lg font-bold text-sky-200 mb-2">Đơn vị nhà nước muốn triển khai?</div>
            <p className="text-xs text-sky-500/40 leading-relaxed">Miễn phí serverless. App riêng — GPS, quản lý bến bãi, báo cáo hành trình, thanh toán không tiền mặt.</p>
          </div>
          <button className="bg-green-500 hover:bg-green-400 text-[#050a14] font-bold px-6 py-3 rounded-xl text-sm transition-all active:scale-95 whitespace-nowrap">Liên hệ hợp tác →</button>
        </div>
      </section>

      {/* ── Success overlay ── */}
      {done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="bg-[#0a1628] border border-sky-500/20 rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <div className="text-lg font-bold text-sky-200 mb-1">Đặt Vé Thành Công</div>
            <div className="text-xs text-sky-500/40 mb-4">Xác nhận qua SMS. Đến bến 15 phút trước giờ xe.</div>
            <button onClick={() => { setDone(false); setSelected(null); setTime(''); setSeats(1) }}
              className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-95">
              Đặt Vé Mới
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-sky-500/10 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] text-sky-500/30">
          <span>© 2026 VéXe.VN · Powered by Vaitech</span>
          <span className="font-mono">SYSTEM v2.4.1</span>
        </div>
      </div>
    </div>
  )
}
