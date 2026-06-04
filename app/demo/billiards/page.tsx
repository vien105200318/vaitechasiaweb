'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { DemoBackButton, Reveal, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe'

type TableStatus = 'available' | 'occupied' | 'booked'
interface BilliardsTable { id:number; name:string; type:string; price:number; status:TableStatus; size:string; cloth:string; since?:string; bookedAt?:string }

const TABLES: BilliardsTable[] = [
  { id:1, name:'Bàn 01', type:'Pool 9 Ball', price:35000, status:'available', size:'9ft', cloth:'Simonis 860' },
  { id:2, name:'Bàn 02', type:'Pool 9 Ball', price:35000, status:'occupied', size:'9ft', cloth:'Simonis 860', since:'18:30' },
  { id:3, name:'Bàn 03', type:'Snooker', price:45000, status:'available', size:'12ft', cloth:'Strachan 6811' },
  { id:4, name:'Bàn 04', type:'Snooker', price:45000, status:'booked', size:'12ft', cloth:'Strachan 6811', bookedAt:'20:00' },
  { id:5, name:'Bàn 05', type:'Carom 3C', price:60000, status:'available', size:'10ft', cloth:'Simonis 300' },
  { id:6, name:'Bàn 06', type:'Carom 3C', price:60000, status:'occupied', size:'10ft', cloth:'Simonis 300', since:'19:00' },
  { id:7, name:'Bàn 07', type:'Pool Mỹ', price:30000, status:'available', size:'8ft', cloth:'Hainsworth' },
  { id:8, name:'Bàn 08', type:'Pool Mỹ', price:30000, status:'available', size:'8ft', cloth:'Hainsworth' },
]

const COACHES = [
  { name:'Thầy Hùng', level:'Cơ thủ chuyên nghiệp', cert:'VBA Pro', exp:'15 năm', fee:'200.000đ/h', spec:'9-Ball · Carom', avatar:'H', color:'from-green-600 to-emerald-700' },
  { name:'Thầy Minh', level:'Cơ thủ hạng A', cert:'VBA A-Class', exp:'10 năm', fee:'150.000đ/h', spec:'Snooker · 9-Ball', avatar:'M', color:'from-teal-600 to-green-600' },
  { name:'Thầy Lan', level:'HLV nữ chuyên nghiệp', cert:'VBA Pro', exp:'8 năm', fee:'180.000đ/h', spec:'Pool Mỹ · 9-Ball', avatar:'L', color:'from-emerald-600 to-teal-600' },
]

const TOURNAMENTS = [
  { name:'Giải Tháng 7 — 9 Ball Open', date:'20/07/2026', prize:'5.000.000đ', slots:32, reg:28, type:'9 Ball' },
  { name:'Snooker Amateur Series', date:'05/08/2026', prize:'8.000.000đ', slots:16, reg:9, type:'Snooker' },
  { name:'Carom Masters Cup', date:'15/08/2026', prize:'12.000.000đ', slots:24, reg:12, type:'Carom' },
]

const DRINKS = [
  {name:'Nước suối Lavie',price:10000},{name:'Pepsi / 7Up lon',price:15000},
  {name:'Trà đào / Trà vải',price:25000},{name:'Cà phê đen / sữa',price:20000},
  {name:'Mì tôm trứng',price:25000},{name:'Bánh mì thịt',price:25000},
]

const statusStyle = (s:TableStatus) => ({
  available: { dot:'bg-green-400 animate-pulse', text:'text-green-400', label:'Trống', border:'border-green-500/40 hover:border-green-400' },
  occupied: { dot:'bg-red-400', text:'text-red-400', label:'Đang chơi', border:'border-red-500/25 opacity-75' },
  booked: { dot:'bg-yellow-400', text:'text-yellow-400', label:'Đã đặt', border:'border-yellow-500/30 opacity-80' },
}[s])

type DrinkItem = {name:string;price:number}

export default function BilliardsDemo() {
  const { toasts, add } = useToast()
  const [tab, setTab] = useState<'tables'|'coach'|'tournament'|'drinks'>('tables')
  const [selectedTable, setSelectedTable] = useState<BilliardsTable|null>(null)
  const [booked, setBooked] = useState<number|null>(null)
  const [bookForm, setBookForm] = useState({name:'',phone:'',date:'',time:'',duration:'2'})
  const [bookLoading, setBookLoading] = useState(false)
  const [drinks, setDrinks] = useState<DrinkItem[]>([])
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, {passive:true})
    return () => window.removeEventListener('scroll', h)
  }, [])

  const available = TABLES.filter(t=>t.status==='available').length
  const drinkTotal = drinks.reduce((s,i)=>s+i.price,0)

  const handleBook = async (e:React.FormEvent) => {
    e.preventDefault()
    setBookLoading(true)
    await new Promise(r=>setTimeout(r,1000))
    setBookLoading(false)
    setBooked(selectedTable!.id)
    add('Đặt bàn thành công! Nhân viên xác nhận trong 10 phút.','success')
  }

  return (
    <div className="min-h-screen bg-[#080b10] text-white overflow-x-hidden font-sans">
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-green-900/12 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-emerald-900/8 rounded-full blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-400 ${scrolled ? 'bg-[#080b10]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-[#080b10] text-lg">🎱</div>
            <div>
              <p className="font-black text-lg tracking-tight leading-none">PRESTIGE<span className="text-green-400"> BILLIARDS</span></p>
              <p className="text-[10px] text-white/35 uppercase tracking-widest">Club · Academy · Tournament</p>
            </div>
          </div>
          <div className="hidden md:flex gap-7 text-sm text-white/50">
            {['Bàn Chơi','HLV','Giải Đấu','Thực Đơn'].map(n=>(
              <a key={n} href="#" className="hover:text-green-400 transition-colors relative group">
                {n}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-300"/>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-black/30 border border-white/8 rounded-full px-4 py-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/>
            <span className="text-xs text-green-400 font-bold">{available} bàn trống</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMG} alt="Billiards" fill className="object-cover brightness-20" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-[#080b10]/60 to-transparent"/>
          <div className="absolute inset-0 opacity-8" style={{backgroundImage:'radial-gradient(circle,#22c55e 1px,transparent 1px)',backgroundSize:'32px 32px'}}/>
        </div>
        <div className="relative z-10 px-8 md:px-16 max-w-[1280px] mx-auto w-full pb-14">
          <div className="flex flex-wrap gap-2.5 mb-5">
            {['🏆 Cơ sở được công nhận VBA','📍 23 Lê Văn Lương, Cầu Giấy','🕐 10:00–02:00 hàng ngày'].map(b=>(
              <span key={b} className="font-sans text-xs bg-black/40 backdrop-blur border border-white/12 text-white/65 px-3 py-1.5 rounded-full">{b}</span>
            ))}
          </div>
          <Reveal>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.88] tracking-tight mb-6">
              BREAK<br/><span className="text-green-400">YOUR</span><br/>LIMITS
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-white/50 text-xl max-w-lg mb-8">8 bàn chuyên nghiệp Diamond & Brunswick · VBA Certified · Snooker 12ft</p>
          </Reveal>
          <Reveal delay={200} className="flex flex-wrap gap-4">
            <button onClick={()=>setTab('tables')} className="bg-green-500 hover:bg-green-400 text-[#080b10] font-black px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95">
              🎱 Đặt Bàn Ngay
            </button>
            <button onClick={()=>setTab('tournament')} className="border border-white/20 hover:border-green-400 text-white font-bold px-8 py-4 rounded-xl transition-all">
              🏆 Xem Giải Đấu
            </button>
          </Reveal>

          {/* Live counters */}
          <div className="absolute bottom-14 right-8 hidden xl:block bg-black/50 backdrop-blur border border-green-500/20 rounded-2xl p-5">
            <div className="flex gap-6">
              {[{v:TABLES.filter(t=>t.status==='occupied').length,l:'Đang chơi',c:'text-red-400'},{v:available,l:'Bàn trống',c:'text-green-400'},{v:TABLES.filter(t=>t.status==='booked').length,l:'Đã đặt',c:'text-yellow-400'}].map(s=>(
                <div key={s.l} className="text-center">
                  <p className={`text-2xl font-black ${s.c}`}>{s.v}</p>
                  <p className="text-white/35 text-xs mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-green-600/8 border-y border-green-500/12 py-6">
        <div className="max-w-[1280px] mx-auto px-8 flex flex-wrap justify-center gap-12">
          {[{t:8,s:'',l:'Bàn chuyên nghiệp'},{t:15,s:'+',l:'Năm hoạt động'},{t:2000,s:'+',l:'Hội viên'},{t:50,s:'+',l:'Giải đấu/năm'}].map(s=>(
            <div key={s.l} className="text-center">
              <p className="text-2xl font-black text-green-400"><CountUp target={s.t} suffix={s.s}/></p>
              <p className="text-white/35 text-xs mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <section className="py-12 px-8 max-w-[1280px] mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/6 pb-4">
          {[{k:'tables',l:'🎱 Sơ Đồ Bàn'},{k:'coach',l:'👨‍🏫 Huấn Luyện Viên'},{k:'tournament',l:'🏆 Giải Đấu'},{k:'drinks',l:'🥤 Thực Đơn'}].map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k as typeof tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab===t.k?'bg-green-500 text-[#080b10]':'bg-white/4 text-white/55 hover:bg-white/8 hover:text-white'}`}>
              {t.l}
            </button>
          ))}
        </div>

        {/* Tables */}
        {tab==='tables'&&(
          <div>
            <div className="flex flex-wrap gap-4 items-center mb-8">
              <h2 className="text-2xl font-black">Sơ Đồ Bàn — Hôm Nay</h2>
              <div className="ml-auto flex gap-4">
                {[{c:'bg-green-400',l:'Trống'},{c:'bg-red-400',l:'Đang chơi'},{c:'bg-yellow-400',l:'Đã đặt'}].map(s=>(
                  <div key={s.l} className="flex items-center gap-1.5 text-xs text-white/50">
                    <div className={`w-2 h-2 rounded-full ${s.c}`}/>{s.l}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {TABLES.map(table=>{
                const st = statusStyle(table.status)
                return (
                  <Reveal key={table.id}>
                    <div onClick={()=>table.status==='available'&&setSelectedTable(selectedTable?.id===table.id?null:table)}
                      className={`rounded-2xl border p-5 transition-all cursor-pointer ${table.status==='available'?st.border:'border-white/8 cursor-not-allowed'} ${selectedTable?.id===table.id?'ring-2 ring-green-400':''}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-black text-base">{table.name}</p>
                          <p className="text-xs text-white/35 mt-0.5">{table.type}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${st.dot}`}/>
                          <span className={`text-xs font-bold ${st.text}`}>{st.label}</span>
                        </div>
                      </div>
                      {/* Pool table visual */}
                      <div className="relative w-full h-16 rounded-lg mb-4 flex items-center justify-center border-4 border-[#2d7a4a]" style={{background:'#1a4a2e'}}>
                        {[{top:3,left:3},{top:3,right:3},{bottom:3,left:3},{bottom:3,right:3},{top:'50%',left:0,transform:'translateY(-50%) translateX(-50%)'},{top:'50%',right:0,transform:'translateY(-50%) translateX(50%)'}].map((pos,i)=>(
                          <div key={i} className="absolute w-2.5 h-2.5 rounded-full bg-[#1a4a2e] border-2 border-white/25" style={pos as React.CSSProperties}/>
                        ))}
                        {table.status==='available'&&<p className="text-green-300 text-[10px] font-bold uppercase tracking-widest">Trống</p>}
                        {table.status==='occupied'&&<div className="w-3 h-3 rounded-full bg-white opacity-60"/>}
                        {table.status==='booked'&&<p className="text-yellow-300 text-[10px] font-bold">{table.bookedAt}</p>}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-400 font-black text-lg">{table.price.toLocaleString()}đ<span className="text-xs font-normal text-white/35">/h</span></span>
                        {table.status==='available'&&<span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full">{table.size}</span>}
                        {table.status==='occupied'&&<span className="text-xs text-red-400">Từ {table.since}</span>}
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
            {/* Booking form */}
            {selectedTable&&(
              <Reveal className="bg-white/3 border border-green-500/25 rounded-2xl p-8 animate-slide-in-up">
                <h3 className="font-black text-xl mb-1">Đặt bàn: <span className="text-green-400">{selectedTable.name} — {selectedTable.type}</span></h3>
                <p className="text-white/40 text-sm mb-6">{selectedTable.size} · {selectedTable.cloth} · {selectedTable.price.toLocaleString()}đ/h</p>
                {booked===selectedTable.id?(
                  <div className="bg-green-900/25 border border-green-500/30 rounded-xl p-6 text-center animate-scale-in">
                    <p className="text-3xl mb-2">🎱</p>
                    <h4 className="font-black text-xl text-green-400 mb-1">Đặt bàn thành công!</h4>
                    <p className="text-white/50 text-sm">Nhân viên gọi xác nhận trong 10 phút. Check-in tại quầy trước 5 phút.</p>
                    <button onClick={()=>{setBooked(null);setSelectedTable(null)}} className="mt-4 text-xs text-white/30 hover:text-white transition-colors">← Đặt bàn khác</button>
                  </div>
                ):(
                  <form onSubmit={handleBook} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[{k:'name',l:'Họ tên',p:'Nguyễn Văn A',t:'text'},{k:'phone',l:'Số điện thoại',p:'0912...',t:'tel'},{k:'date',l:'Ngày',p:'',t:'date'},{k:'time',l:'Giờ bắt đầu',p:'',t:'time'}].map(f=>(
                      <div key={f.k}>
                        <label className="block text-xs uppercase tracking-wider text-white/30 mb-1.5">{f.l}</label>
                        <input type={f.t} placeholder={f.p} required value={bookForm[f.k as keyof typeof bookForm]}
                          onChange={e=>setBookForm({...bookForm,[f.k]:e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-green-400 outline-none transition-all"/>
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/30 mb-1.5">Thời gian</label>
                      <select value={bookForm.duration} onChange={e=>setBookForm({...bookForm,duration:e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-green-400 outline-none">
                        {['1','2','3','4','5'].map(h=><option key={h} value={h}>{h}h — {(parseInt(h)*selectedTable.price).toLocaleString()}đ</option>)}
                      </select>
                    </div>
                    <div className="md:col-span-3 flex gap-3">
                      <button type="submit" disabled={bookLoading}
                        className="flex-1 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-[#080b10] font-black py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                        {bookLoading?<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>:null}
                        ✓ Xác Nhận Đặt Bàn
                      </button>
                      <button type="button" onClick={()=>setSelectedTable(null)} className="px-6 border border-white/15 hover:border-red-400 text-white/50 hover:text-red-400 rounded-xl transition-all text-sm">Huỷ</button>
                    </div>
                  </form>
                )}
              </Reveal>
            )}
          </div>
        )}

        {/* Coach */}
        {tab==='coach'&&(
          <div>
            <Reveal className="mb-10">
              <h2 className="text-2xl font-black">Huấn Luyện Viên Chuyên Nghiệp</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {COACHES.map((c,i)=>(
                <Reveal key={c.name} delay={i*80}
                  className="bg-white/3 border border-white/8 hover:border-green-500/35 rounded-2xl p-7 transition-all hover:-translate-y-1 group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl mb-5`}>🎱</div>
                  <p className="text-xs text-green-400 font-bold uppercase tracking-widest mb-1">{c.cert}</p>
                  <h3 className="font-black text-xl mb-1">{c.name}</h3>
                  <p className="text-white/45 text-sm mb-1">{c.level} · {c.exp}</p>
                  <p className="text-white/30 text-xs mb-5">{c.spec}</p>
                  <div className="flex justify-between items-center pt-5 border-t border-white/8">
                    <span className="text-green-400 font-black text-lg">{c.fee}</span>
                    <button className="bg-green-500/15 hover:bg-green-500 text-green-400 hover:text-[#080b10] text-xs font-bold px-4 py-2 rounded-lg border border-green-500/35 transition-all active:scale-95">
                      Đặt Lịch
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="bg-white/3 border border-white/8 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Chương Trình Học</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[{name:'Khoá Cơ Bản',sessions:'8 buổi',price:'800.000đ',for:'Người mới'},{name:'Khoá Nâng Cao',sessions:'12 buổi',price:'1.400.000đ',for:'Đã biết cơ bản'},{name:'Khoá Chuyên Sâu',sessions:'20 buổi',price:'2.500.000đ',for:'Muốn thi đấu'}].map(k=>(
                  <div key={k.name} className="bg-white/5 rounded-xl p-5 hover:bg-green-900/20 transition-colors cursor-pointer">
                    <h4 className="font-bold mb-1">{k.name}</h4>
                    <p className="text-white/40 text-xs mb-3">{k.for} · {k.sessions}</p>
                    <p className="text-green-400 font-black text-xl">{k.price}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        )}

        {/* Tournament */}
        {tab==='tournament'&&(
          <div>
            <Reveal className="mb-10">
              <h2 className="text-2xl font-black">🏆 Giải Đấu Sắp Diễn Ra</h2>
            </Reveal>
            <div className="space-y-4 mb-8">
              {TOURNAMENTS.map((t,i)=>(
                <Reveal key={t.name} delay={i*80}
                  className="bg-white/3 border border-white/8 hover:border-green-500/25 rounded-2xl p-6 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div>
                      <span className="text-xs bg-green-500/18 text-green-400 font-bold px-3 py-0.5 rounded-full mb-3 inline-block">{t.type}</span>
                      <h3 className="font-black text-xl mb-2">{t.name}</h3>
                      <div className="flex flex-wrap gap-5 text-sm text-white/45">
                        <span>📅 {t.date}</span>
                        <span>🏆 <span className="text-yellow-400 font-bold">{t.prize}</span></span>
                        <span>👥 {t.reg}/{t.slots} đội</span>
                      </div>
                      <div className="mt-3 w-52 h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{width:`${(t.reg/t.slots)*100}%`}}/>
                      </div>
                      <p className="text-xs text-white/25 mt-1">{t.slots-t.reg} suất trống</p>
                    </div>
                    <button className="flex-shrink-0 bg-green-500 hover:bg-green-400 text-[#080b10] font-black px-8 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95">
                      Đăng Ký Thi Đấu
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="bg-gradient-to-r from-yellow-900/25 to-green-900/15 border border-yellow-500/18 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">💡 Thể Lệ Thi Đấu</h3>
              <p className="text-white/50 text-sm leading-relaxed">Áp dụng luật BCA/WPA chính thức. Phí đăng ký: 150.000–300.000đ. Mang CCCD khi check-in.</p>
            </Reveal>
          </div>
        )}

        {/* Drinks */}
        {tab==='drinks'&&(
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Reveal className="mb-6">
                <h2 className="text-2xl font-black">🥤 Thực Đơn Đồ Uống</h2>
              </Reveal>
              <div className="space-y-2.5">
                {DRINKS.map(d=>(
                  <Reveal key={d.name}>
                    <div className="flex items-center justify-between p-4 bg-white/3 border border-white/8 rounded-xl hover:border-green-500/25 transition-all group">
                      <span className="font-semibold text-sm">{d.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-green-400 font-bold">{d.price.toLocaleString()}đ</span>
                        <button onClick={()=>{setDrinks(c=>[...c,d]);add(`Đã gọi ${d.name}`,'success')}}
                          className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-90 text-[#080b10] font-black text-lg leading-none">
                          +
                        </button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal className="bg-white/3 border border-white/8 rounded-2xl p-6 h-fit">
              <h3 className="font-bold text-lg mb-4">Đơn hàng ({drinks.length})</h3>
              {drinks.length===0?(
                <p className="text-white/30 text-sm text-center py-8">Chưa có đồ uống</p>
              ):(
                <>
                  <div className="space-y-2 mb-5">
                    {drinks.map((item,i)=>(
                      <div key={i} className="flex justify-between py-2 border-b border-white/5 text-sm">
                        <span className="text-white/65">{item.name}</span>
                        <span className="text-green-400 font-bold">{item.price.toLocaleString()}đ</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-black text-lg mb-4 pt-2 border-t border-white/8">
                    <span>Tổng</span><span className="text-green-400">{drinkTotal.toLocaleString()}đ</span>
                  </div>
                  <button onClick={()=>setDrinks([])} className="w-full bg-green-500 hover:bg-green-400 text-[#080b10] font-black py-3.5 rounded-xl transition-all active:scale-95">
                    Gọi Đồ Uống
                  </button>
                </>
              )}
            </Reveal>
          </div>
        )}
      </section>

      <footer className="border-t border-white/5 py-10 px-8 text-center text-white/25 text-sm mt-10">
        © 2026 Prestige Billiards · Mẫu bởi <span className="text-green-400">Vaitech</span>
      </footer>
    </div>
  )
}
