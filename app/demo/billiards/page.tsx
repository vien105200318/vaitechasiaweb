'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const tables = [
  { id:1, name:'Bàn 01 — Diamond Pro', type:'Pool 9 Ball', price:35000, status:'available', size:'9ft', cloth:'Simonis 860' },
  { id:2, name:'Bàn 02 — Diamond Pro', type:'Pool 9 Ball', price:35000, status:'occupied', occupiedSince:'18:30', size:'9ft', cloth:'Simonis 860' },
  { id:3, name:'Bàn 03 — Brunswick', type:'Snooker', price:45000, status:'available', size:'12ft', cloth:'Strachan 6811' },
  { id:4, name:'Bàn 04 — Brunswick', type:'Snooker', price:45000, status:'booked', bookedAt:'20:00', size:'12ft', cloth:'Strachan 6811' },
  { id:5, name:'Bàn 05 — VIP Carom', type:'Carom 3 Cushion', price:60000, status:'available', size:'10ft', cloth:'Iwan Simonis 300' },
  { id:6, name:'Bàn 06 — VIP Carom', type:'Carom 3 Cushion', price:60000, status:'occupied', occupiedSince:'19:00', size:'10ft', cloth:'Iwan Simonis 300' },
  { id:7, name:'Bàn 07 — American', type:'Billiards Mỹ', price:30000, status:'available', size:'8ft', cloth:'Hainsworth Elite' },
  { id:8, name:'Bàn 08 — American', type:'Billiards Mỹ', price:30000, status:'available', size:'8ft', cloth:'Hainsworth Elite' },
]

const drinks = [
  { name:'Nước suối Lavie', price:10000 },
  { name:'Pepsi / 7Up lon', price:15000 },
  { name:'Trà đào / Trà vải', price:25000 },
  { name:'Cà phê đen / sữa', price:20000 },
  { name:'Mì tôm trứng', price:25000 },
  { name:'Bánh mì thịt', price:25000 },
]

const coaches = [
  { name:'Thầy Hùng', level:'Cơ thủ chuyên nghiệp', exp:'15 năm', cert:'VBA Pro', fee:'200.000đ/h', spec:'9-Ball · Carom' },
  { name:'Thầy Minh', level:'Cơ thủ hạng A', exp:'10 năm', cert:'VBA A-Class', fee:'150.000đ/h', spec:'Snooker · 9-Ball' },
  { name:'Thầy Lan', level:'HLV nữ chuyên nghiệp', exp:'8 năm', cert:'VBA Pro', fee:'180.000đ/h', spec:'Billiards Mỹ · 9-Ball' },
]

const tournaments = [
  { name:'Giải Tháng 7 — 9 Ball Open', date:'20/07/2025', prize:'5.000.000đ', slots:32, registered:28, type:'9 Ball' },
  { name:'Snooker Amateur Series', date:'05/08/2025', prize:'8.000.000đ', slots:16, registered:9, type:'Snooker' },
  { name:'Carom Masters Cup', date:'15/08/2025', prize:'12.000.000đ', slots:24, registered:12, type:'Carom' },
]

const IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe'

export default function BilliardsDemo() {
  const [selectedTable, setSelectedTable] = useState<typeof tables[0] | null>(null)
  const [bookingForm, setBookingForm] = useState({ name:'', phone:'', date:'', time:'', duration:'2', note:'' })
  const [booked, setBooked] = useState(false)
  const [cart, setCart] = useState<{name:string,price:number}[]>([])
  const [activeTab, setActiveTab] = useState<'tables'|'drinks'|'coach'|'tournament'>('tables')

  const totalDrinks = cart.reduce((s,i)=>s+i.price,0)

  const statusColor = (s:string) => s==='available'?'bg-green-500':s==='occupied'?'bg-red-500':'bg-yellow-500'
  const statusLabel = (s:string) => s==='available'?'Trống':s==='occupied'?'Đang chơi':'Đã đặt'

  return (
    <div className="min-h-screen bg-[#080b10] text-white overflow-x-hidden font-sans">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-green-900/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="fixed top-4 right-4 z-50">
        <Link href="/templates" className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Templates
        </Link>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 bg-[#080b10]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
              <span className="text-[#080b10] text-lg">🎱</span>
            </div>
            <div>
              <p className="font-black text-lg tracking-tight leading-none">PRESTIGE<span className="text-green-400"> BILLIARDS</span></p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Club · Academy · Tournament</p>
            </div>
          </div>
          <div className="hidden md:flex gap-7 text-sm text-white/50">
            {['Bàn Chơi','Đặt Bàn','HLV','Giải Đấu','Thực Đơn'].map(n => (
              <a key={n} href="#" onClick={()=>{}} className="hover:text-green-400 transition-colors">{n}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-semibold">{tables.filter(t=>t.status==='available').length}</span>
              <span className="text-white/40">bàn trống</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMG} alt="Billiards" fill className="object-cover brightness-20" unoptimized priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-[#080b10]/60 to-transparent" />
          {/* Green felt texture overlay */}
          <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle, #22c55e 1px, transparent 1px)',backgroundSize:'30px 30px'}} />
        </div>
        <div className="relative z-10 px-8 md:px-16 max-w-[1280px] mx-auto w-full pb-16">
          <div className="flex flex-wrap gap-3 mb-5">
            {['🏆 Cơ sở được công nhận VBA','📍 23 Lê Văn Lương, Q. Cầu Giấy','🕐 10:00 – 02:00 hàng ngày'].map(b=>(
              <span key={b} className="font-sans bg-black/40 backdrop-blur border border-white/15 text-white/70 text-xs px-3 py-1.5 rounded-full">{b}</span>
            ))}
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.88] tracking-tight mb-6">
            BREAK<br/><span className="text-green-400">YOUR</span><br/>LIMITS
          </h1>
          <p className="text-white/60 text-lg max-w-md mb-8 leading-relaxed">8 bàn chuyên nghiệp Diamond & Brunswick · Snooker 12ft · Carom 3-Cushion · VBA Certified</p>
          <div className="flex gap-4">
            <button onClick={()=>setActiveTab('tables')} className="bg-green-500 hover:bg-green-400 text-[#080b10] font-black px-8 py-4 rounded-xl transition-all hover:scale-105">
              🎱 Đặt Bàn Ngay
            </button>
            <button onClick={()=>setActiveTab('tournament')} className="border border-white/20 hover:border-green-400 text-white font-bold px-8 py-4 rounded-xl transition-all">
              🏆 Xem Giải Đấu
            </button>
          </div>
        </div>
        {/* Live counter */}
        <div className="absolute bottom-16 right-8 hidden lg:block bg-black/50 backdrop-blur border border-green-500/30 rounded-2xl p-5">
          <div className="flex gap-6">
            {[{v:tables.filter(t=>t.status==='occupied').length,l:'Bàn đang chơi',c:'text-red-400'},{v:tables.filter(t=>t.status==='available').length,l:'Bàn trống',c:'text-green-400'},{v:tables.filter(t=>t.status==='booked').length,l:'Đã đặt trước',c:'text-yellow-400'}].map(s=>(
              <div key={s.l} className="text-center">
                <p className={`text-2xl font-black ${s.c}`}>{s.v}</p>
                <p className="text-white/40 text-xs mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 px-8 max-w-[1280px] mx-auto">
        {/* Tab nav */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/8 pb-4">
          {[{k:'tables',l:'🎱 Sơ Đồ Bàn'},{k:'coach',l:'👨‍🏫 HLV & Học Phí'},{k:'tournament',l:'🏆 Giải Đấu'},{k:'drinks',l:'🥤 Thực Đơn'}].map(tab=>(
            <button key={tab.k} onClick={()=>setActiveTab(tab.k as typeof activeTab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab===tab.k?'bg-green-500 text-[#080b10]':'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}>
              {tab.l}
            </button>
          ))}
        </div>

        {/* Tables tab */}
        {activeTab==='tables'&&(
          <div>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <h2 className="text-2xl font-black">Sơ Đồ Bàn — Hôm Nay</h2>
              <div className="flex gap-3 ml-auto">
                {[{c:'bg-green-500',l:'Trống'},{c:'bg-red-500',l:'Đang chơi'},{c:'bg-yellow-500',l:'Đã đặt'}].map(s=>(
                  <div key={s.l} className="flex items-center gap-1.5 text-xs text-white/60">
                    <div className={`w-2.5 h-2.5 rounded-full ${s.c}`}/>{s.l}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {tables.map(table=>(
                <div key={table.id}
                  onClick={()=>table.status==='available'&&setSelectedTable(table)}
                  className={`relative rounded-2xl border p-5 transition-all ${table.status==='available'?'border-green-500/40 hover:border-green-400 hover:bg-green-900/10 cursor-pointer':'border-white/8 opacity-70 cursor-not-allowed'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-black text-sm">{table.name.split('—')[0].trim()}</p>
                      <p className="text-xs text-white/40 mt-0.5">{table.type}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${statusColor(table.status)} ${table.status==='available'?'animate-pulse':''}`}/>
                      <span className={`text-xs font-bold ${table.status==='available'?'text-green-400':table.status==='occupied'?'text-red-400':'text-yellow-400'}`}>{statusLabel(table.status)}</span>
                    </div>
                  </div>

                  {/* Pool table visual */}
                  <div className="relative w-full h-20 rounded-lg mb-4 flex items-center justify-center" style={{background:'#1a4a2e',border:'3px solid #2d7a4a'}}>
                    <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white/30"/>
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white/30"/>
                    <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-white/30"/>
                    <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-white/30"/>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/30"/>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-white/30"/>
                    {table.status==='occupied'&&<div className="w-3 h-3 rounded-full bg-white opacity-60 absolute"/>}
                    {table.status==='available'&&<p className="text-green-300 text-[10px] font-bold uppercase tracking-widest">Trống</p>}
                    {table.status==='booked'&&<p className="text-yellow-300 text-[10px] font-bold">{table.bookedAt}</p>}
                  </div>

                  <div className="flex justify-between items-center text-xs text-white/50 mb-3">
                    <span>🏷 {table.size} · {table.cloth}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-black text-lg">{table.price.toLocaleString()}đ<span className="text-xs font-normal text-white/40">/h</span></span>
                    {table.status==='available'&&<button className="bg-green-500 hover:bg-green-400 text-[#080b10] text-xs font-black px-4 py-2 rounded-lg transition-colors">Đặt Ngay</button>}
                    {table.status==='occupied'&&<span className="text-xs text-red-400">Từ {table.occupiedSince}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Booking form */}
            {selectedTable&&(
              <div className="bg-white/4 border border-green-500/30 rounded-2xl p-8">
                <h3 className="font-black text-xl mb-1">Đặt bàn: <span className="text-green-400">{selectedTable.name}</span></h3>
                <p className="text-white/50 text-sm mb-6">{selectedTable.type} · {selectedTable.price.toLocaleString()}đ/giờ</p>
                {!booked?(
                  <form onSubmit={e=>{e.preventDefault();setBooked(true)}} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[{k:'name',l:'Họ tên',p:'Nguyễn Văn A',t:'text'},{k:'phone',l:'Số điện thoại',p:'0912 345 678',t:'tel'},{k:'date',l:'Ngày',p:'',t:'date'},{k:'time',l:'Giờ bắt đầu',p:'',t:'time'}].map(f=>(
                      <div key={f.k}>
                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-1.5">{f.l}</label>
                        <input type={f.t} placeholder={f.p} required value={bookingForm[f.k as keyof typeof bookingForm]} onChange={e=>setBookingForm({...bookingForm,[f.k]:e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-green-400 outline-none"/>
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/40 mb-1.5">Thời gian (giờ)</label>
                      <select value={bookingForm.duration} onChange={e=>setBookingForm({...bookingForm,duration:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-green-400 outline-none">
                        {['1','2','3','4','5'].map(h=><option key={h} value={h}>{h} giờ — {(parseInt(h)*selectedTable.price).toLocaleString()}đ</option>)}
                      </select>
                    </div>
                    <div className="md:col-span-3 flex gap-3">
                      <button type="submit" className="flex-1 bg-green-500 hover:bg-green-400 text-[#080b10] font-black py-4 rounded-xl transition-all hover:scale-[1.02]">
                        ✓ Xác Nhận Đặt Bàn
                      </button>
                      <button type="button" onClick={()=>setSelectedTable(null)} className="px-6 border border-white/20 hover:border-red-400 text-white/60 hover:text-red-400 rounded-xl transition-all">Huỷ</button>
                    </div>
                  </form>
                ):(
                  <div className="bg-green-900/30 border border-green-500/40 rounded-xl p-6 text-center">
                    <p className="text-3xl mb-2">🎱</p>
                    <h4 className="font-black text-xl text-green-400 mb-1">Đặt bàn thành công!</h4>
                    <p className="text-white/60 text-sm">Nhân viên sẽ gọi xác nhận trong 10 phút. Check-in tại quầy trước 5 phút.</p>
                    <button onClick={()=>{setBooked(false);setSelectedTable(null)}} className="mt-4 text-xs text-white/40 hover:text-white transition-colors">← Đặt bàn khác</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Coach tab */}
        {activeTab==='coach'&&(
          <div>
            <h2 className="text-2xl font-black mb-8">Huấn Luyện Viên Chuyên Nghiệp</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {coaches.map(c=>(
                <div key={c.name} className="bg-white/4 border border-white/8 rounded-2xl p-7 hover:border-green-500/40 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-2xl mb-5">🎱</div>
                  <p className="text-xs text-green-400 font-bold uppercase tracking-widest mb-1">{c.cert}</p>
                  <h3 className="font-black text-xl mb-1">{c.name}</h3>
                  <p className="text-white/50 text-sm mb-1">{c.level} · {c.exp}</p>
                  <p className="text-white/40 text-xs mb-5">{c.spec}</p>
                  <div className="flex justify-between items-center pt-5 border-t border-white/8">
                    <span className="text-green-400 font-black text-lg">{c.fee}</span>
                    <button className="bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-[#080b10] text-xs font-bold px-4 py-2 rounded-lg border border-green-500/40 transition-all">Đặt lịch học</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Chương Trình Học</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[{name:'Khoá Cơ Bản',sessions:'8 buổi',price:'800.000đ',for:'Người mới bắt đầu'},{name:'Khoá Nâng Cao',sessions:'12 buổi',price:'1.400.000đ',for:'Đã biết cơ bản'},{name:'Khoá Chuyên Sâu',sessions:'20 buổi',price:'2.500.000đ',for:'Muốn thi đấu'}].map(k=>(
                  <div key={k.name} className="bg-white/5 rounded-xl p-5">
                    <h4 className="font-bold mb-1">{k.name}</h4>
                    <p className="text-white/50 text-xs mb-3">{k.for} · {k.sessions}</p>
                    <p className="text-green-400 font-black text-xl">{k.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tournament tab */}
        {activeTab==='tournament'&&(
          <div>
            <h2 className="text-2xl font-black mb-8">🏆 Giải Đấu Sắp Diễn Ra</h2>
            <div className="space-y-4">
              {tournaments.map(t=>(
                <div key={t.name} className="bg-white/4 border border-white/8 rounded-2xl p-6 hover:border-green-500/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div>
                      <span className="text-xs bg-green-500/20 text-green-400 font-bold px-3 py-0.5 rounded-full mb-3 inline-block">{t.type}</span>
                      <h3 className="font-black text-xl mb-1">{t.name}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-white/50">
                        <span>📅 {t.date}</span>
                        <span>🏆 Tổng giải thưởng: <strong className="text-yellow-400">{t.prize}</strong></span>
                        <span>👥 {t.registered}/{t.slots} đã đăng ký</span>
                      </div>
                      <div className="mt-3 w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full transition-all" style={{width:`${(t.registered/t.slots)*100}%`}}/>
                      </div>
                      <p className="text-xs text-white/30 mt-1">{t.slots-t.registered} suất còn lại</p>
                    </div>
                    <div className="flex-shrink-0">
                      <button className="bg-green-500 hover:bg-green-400 text-[#080b10] font-black px-8 py-3.5 rounded-xl transition-all hover:scale-105">
                        Đăng Ký Thi Đấu
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-gradient-to-r from-yellow-900/30 to-green-900/20 border border-yellow-500/20 rounded-2xl p-6">
              <h3 className="font-black text-lg mb-2">💡 Luật thi đấu</h3>
              <p className="text-white/60 text-sm leading-relaxed">Áp dụng luật BCA/WPA chính thức. Phí đăng ký: 150.000đ–300.000đ tuỳ hạng mục. Mang theo CCCD khi check-in.</p>
            </div>
          </div>
        )}

        {/* Drinks tab */}
        {activeTab==='drinks'&&(
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-black mb-6">🥤 Thực Đơn Đồ Uống</h2>
              <div className="space-y-3">
                {drinks.map(d=>(
                  <div key={d.name} className="flex items-center justify-between p-4 bg-white/4 border border-white/8 rounded-xl hover:border-green-500/30 transition-all group">
                    <span className="font-semibold">{d.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-green-400 font-bold">{d.price.toLocaleString()}đ</span>
                      <button onClick={()=>setCart(c=>[...c,d])} className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 text-[#080b10] font-black">+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/4 border border-white/8 rounded-2xl p-6 h-fit">
              <h3 className="font-bold text-lg mb-4">Giỏ hàng ({cart.length} món)</h3>
              {cart.length===0?<p className="text-white/40 text-sm text-center py-6">Chưa chọn đồ uống</p>:(
                <>
                  <div className="space-y-2 mb-4">
                    {cart.map((item,i)=>(
                      <div key={i} className="flex justify-between text-sm py-2 border-b border-white/5">
                        <span className="text-white/70">{item.name}</span>
                        <span className="font-bold text-green-400">{item.price.toLocaleString()}đ</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-black text-lg mb-4">
                    <span>Tổng</span>
                    <span className="text-green-400">{totalDrinks.toLocaleString()}đ</span>
                  </div>
                  <button onClick={()=>setCart([])} className="w-full bg-green-500 hover:bg-green-400 text-[#080b10] font-black py-3.5 rounded-xl transition-all">
                    Gọi Đồ Uống
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </section>

      <footer className="border-t border-white/5 py-10 px-8 text-center text-white/30 text-sm mt-10">
        © 2025 Prestige Billiards Club · Mẫu giao diện bởi <span className="text-green-400">Vaitech</span>
      </footer>
    </div>
  )
}
