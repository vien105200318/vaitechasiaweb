'use client'
import { useState, useEffect } from 'react'
import { DemoBackButton, Reveal, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

type PCStatus = 'available' | 'occupied' | 'booked'

interface PC { pc:number; zone:string; status:PCStatus; specs:string; price:number; timeLeft?:number; bookedName?:string }

const ALL_PCS: PC[] = [
  ...Array.from({length:4},(_,i)=>({ pc:i+1, zone:'A', status:(i===1||i===2?'occupied':'available') as PCStatus, specs:'i9-14900K · RTX 4090 · 32GB · 360Hz', price:35000, timeLeft:i===1?72:i===2?34:undefined })),
  ...Array.from({length:4},(_,i)=>({ pc:i+5, zone:'B', status:(i===1?'occupied':i===3?'booked':'available') as PCStatus, specs:'i7-14700K · RTX 4080 · 32GB · 240Hz', price:28000, timeLeft:i===1?120:undefined, bookedName:i===3?'Minh Tuấn':undefined })),
  ...Array.from({length:4},(_,i)=>({ pc:i+9, zone:'C', status:(i===0||i===3?'occupied':'available') as PCStatus, specs:'i5-13600K · RTX 4070 · 16GB · 165Hz', price:20000, timeLeft:i===0?15:i===3?88:undefined })),
]

const ZONES = [
  { key:'A', name:'Zone A — Tournament', price:35000, color:'from-cyan-600 to-blue-700' },
  { key:'B', name:'Zone B — VIP', price:28000, color:'from-purple-600 to-indigo-700' },
  { key:'C', name:'Zone C — Standard', price:20000, color:'from-gray-600 to-gray-800' },
]

const PACKAGES = [
  { name:'Combo 5 Giờ', price:90000, orig:100000, bonus:'1 lon nước', zone:'Tiêu chuẩn', hot:false },
  { name:'Combo 10 Giờ', price:170000, orig:200000, bonus:'Snack + nước tự chọn', zone:'VIP', hot:true },
  { name:'Đêm (22h–6h)', price:80000, orig:120000, bonus:'8h + ăn sáng', zone:'Bất kỳ', hot:false },
]

const GAMES = [
  {name:'Valorant',icon:'🎯',genre:'FPS'},{name:'League of Legends',icon:'⚔️',genre:'MOBA'},
  {name:'CS2',icon:'💣',genre:'FPS'},{name:'Dota 2',icon:'🐉',genre:'MOBA'},
  {name:'Apex Legends',icon:'🏆',genre:'Battle Royale'},{name:'FC Online',icon:'⚽',genre:'Sports'},
]

const FOODS = [
  {name:'Mì tôm bơ + trứng',price:25000},{name:'Bánh mì kẹp thịt',price:25000},
  {name:'Snack Oishi/Piattos',price:15000},{name:'Pepsi / Sting lon',price:15000},
  {name:'Trà đào cam sả',price:25000},{name:'Bò húc / Monster',price:25000},
]

const statusStyle = (s:PCStatus) => ({
  available:{dot:'bg-green-400 animate-pulse',text:'text-green-400',label:'TRỐNG',border:'border-green-500/50 hover:bg-green-900/10 cursor-pointer'},
  occupied:{dot:'bg-red-400',text:'text-red-400',label:'IN USE',border:'border-red-500/30 opacity-75 cursor-not-allowed'},
  booked:{dot:'bg-yellow-400',text:'text-yellow-400',label:'RESERVED',border:'border-yellow-500/30 opacity-75 cursor-not-allowed'},
}[s])

type FoodItem = {name:string;price:number}

export default function NetCafeDemo() {
  const {toasts,add} = useToast()
  const [tab, setTab] = useState<'map'|'packages'|'tournament'|'food'>('map')
  const [selectedPc, setSelectedPc] = useState<PC|null>(null)
  const [bookForm, setBookForm] = useState({name:'',phone:'',hours:'2'})
  const [booked, setBooked] = useState<number|null>(null)
  const [bookLoading, setBookLoading] = useState(false)
  const [foods, setFoods] = useState<FoodItem[]>([])
  const [scrolled, setScrolled] = useState(false)
  const [clock, setClock] = useState(new Date())

  useEffect(()=>{
    const h = ()=>setScrolled(window.scrollY>40)
    window.addEventListener('scroll',h,{passive:true})
    return ()=>window.removeEventListener('scroll',h)
  },[])

  useEffect(()=>{
    const t = setInterval(()=>setClock(new Date()),1000)
    return ()=>clearInterval(t)
  },[])

  const available = ALL_PCS.filter(p=>p.status==='available').length
  const occupied = ALL_PCS.filter(p=>p.status==='occupied').length
  const foodTotal = foods.reduce((s,i)=>s+i.price,0)

  const handleBook = async (e:React.FormEvent) => {
    e.preventDefault()
    setBookLoading(true)
    await new Promise(r=>setTimeout(r,900))
    setBookLoading(false)
    setBooked(selectedPc!.pc)
    add(`Đã đặt PC ${String(selectedPc!.pc).padStart(2,'0')} thành công!`,'success')
  }

  return (
    <div className="min-h-screen bg-[#05080f] text-white overflow-x-hidden font-sans">
      <ToastContainer toasts={toasts}/>
      <DemoBackButton/>

      {/* Cyberpunk grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[400px] h-[300px] bg-cyan-900/10 blur-[120px]"/>
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[300px] bg-purple-900/8 blur-[100px]"/>
        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage:'linear-gradient(rgba(0,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,0.5) 1px,transparent 1px)',backgroundSize:'50px 50px'}}/>
      </div>

      {/* Nav */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-400 ${scrolled?'bg-[#05080f]/95 backdrop-blur-xl border-b border-cyan-500/8':'bg-transparent'}`}>
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-sm text-[#05080f]">NX</div>
            <div>
              <p className="font-black text-lg tracking-tight leading-none">NEXUS<span className="text-cyan-400"> GAMING</span></p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Esports Center · Level 99</p>
            </div>
          </div>
          {/* Live status */}
          <div className="hidden md:flex items-center gap-5 bg-black/25 border border-white/6 rounded-full px-5 py-2">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/>
              <span className="text-xs text-green-400 font-bold">{available} trống</span>
            </div>
            <div className="w-px h-4 bg-white/8"/>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full"/>
              <span className="text-xs text-red-400 font-bold">{occupied} đang dùng</span>
            </div>
            <div className="w-px h-4 bg-white/8"/>
            <span className="text-xs text-white/35 font-mono">{clock.toLocaleTimeString('vi-VN')}</span>
          </div>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white text-sm font-black px-5 py-2.5 rounded-xl transition-opacity active:scale-95">
            🎮 Đặt Máy
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 min-h-[55vh] flex items-center px-8 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05080f] via-[#0a0f1e] to-[#05080f]"/>
        {/* Neon horizontal lines */}
        <div className="absolute inset-0 overflow-hidden opacity-12">
          {[15,35,55,75,90].map(p=><div key={p} className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-full" style={{top:`${p}%`}}/>)}
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto w-full">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-cyan-500/8 border border-cyan-500/20 text-cyan-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"/>
              Esports chuẩn quốc tế · 24/7 · Tournament Host
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.88] tracking-tighter mb-6">
              GG OR<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">GO HOME</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-white/40 text-xl max-w-lg mb-10 leading-relaxed">12 máy RTX 4090 · 8 máy RTX 4080 · Internet 10Gbps · Ghế DXRacer · 24/7</p>
          </Reveal>
          <Reveal delay={240} className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mb-12">
            {[{v:'24/7',l:'Mở cửa'},{v:'10Gbps',l:'Internet'},{v:'360Hz',l:'Màn hình'},{v:'DXRacer',l:'Ghế ngồi'}].map(s=>(
              <div key={s.l} className="bg-white/4 border border-cyan-500/12 rounded-xl p-3 text-center">
                <p className="font-black text-cyan-400 text-lg">{s.v}</p>
                <p className="text-white/30 text-xs mt-0.5">{s.l}</p>
              </div>
            ))}
          </Reveal>
          {/* Games ticker */}
          <div className="flex flex-wrap gap-3">
            {GAMES.map(g=>(
              <span key={g.name} className="flex items-center gap-1.5 text-xs text-white/30 bg-white/4 border border-white/6 px-3 py-1.5 rounded-full">
                <span>{g.icon}</span>{g.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-cyan-500/5 border-y border-cyan-500/10 py-6">
        <div className="max-w-[1280px] mx-auto px-8 flex flex-wrap justify-center gap-12">
          {[{t:12,s:'',l:'PC RTX 4090'},{t:2000,s:'+',l:'Hội viên'},{t:50,s:'+',l:'Giải đấu/năm'},{t:24,s:'/7',l:'Mở cửa'}].map(s=>(
            <div key={s.l} className="text-center">
              <p className="text-2xl font-black text-cyan-400"><CountUp target={s.t} suffix={s.s}/></p>
              <p className="text-white/30 text-xs mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <section className="py-12 px-8 max-w-[1280px] mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/5 pb-4">
          {[{k:'map',l:'🖥️ Sơ Đồ Máy'},{k:'packages',l:'📦 Combo & Gói'},{k:'tournament',l:'🏆 Giải Đấu'},{k:'food',l:'🍜 Đồ Ăn'}].map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k as typeof tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab===t.k?'bg-gradient-to-r from-cyan-500 to-blue-600 text-white':'bg-white/4 text-white/45 hover:bg-white/8 hover:text-white'}`}>
              {t.l}
            </button>
          ))}
        </div>

        {/* PC Map */}
        {tab==='map'&&(
          <div className="space-y-10">
            {ZONES.map(zone=>{
              const zonePCs = ALL_PCS.filter(p=>p.zone===zone.key)
              return (
                <div key={zone.key}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-1.5 h-6 rounded-full bg-gradient-to-b ${zone.color}`}/>
                    <h3 className="font-black text-lg">{zone.name}</h3>
                    <span className="text-xs text-white/25 bg-white/4 px-3 py-1 rounded-full">{zone.price.toLocaleString()}đ/h</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {zonePCs.map(pc=>{
                      const st = statusStyle(pc.status)
                      return (
                        <Reveal key={pc.pc}>
                          <div onClick={()=>pc.status==='available'&&setSelectedPc(selectedPc?.pc===pc.pc?null:pc)}
                            className={`rounded-2xl border p-5 transition-all ${st.border} ${selectedPc?.pc===pc.pc?'ring-2 ring-cyan-400':''}`}>
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-8 h-6 rounded border-2 flex items-center justify-center text-[9px] font-black ${pc.status==='available'?'border-green-400 bg-green-900/20 text-green-400':pc.status==='occupied'?'border-red-400 bg-red-900/20 text-red-400':'border-yellow-400 bg-yellow-900/20 text-yellow-400'}`}>
                                {pc.status==='available'?'ON':pc.status==='occupied'?'USE':'RES'}
                              </div>
                              <span className="font-black text-sm">PC {String(pc.pc).padStart(2,'0')}</span>
                            </div>
                            <p className="text-[10px] text-white/25 leading-relaxed mb-3">{pc.specs}</p>
                            {pc.status==='occupied'&&pc.timeLeft&&(
                              <div className="flex items-center gap-1.5 bg-red-900/20 border border-red-500/15 rounded-lg px-3 py-1.5 mb-2">
                                <span className="text-red-400 text-xs">⏱</span>
                                <span className="text-xs text-red-300 font-mono">{Math.floor(pc.timeLeft/60)}h{pc.timeLeft%60}m còn lại</span>
                              </div>
                            )}
                            {pc.status==='booked'&&pc.bookedName&&(
                              <p className="text-[10px] text-yellow-300/60 mb-2 font-sans">Đặt: {pc.bookedName}</p>
                            )}
                            <div className="flex justify-between items-center">
                              <span className="text-cyan-400 font-black text-sm">{pc.price.toLocaleString()}đ/h</span>
                              {pc.status==='available'&&<span className="text-[10px] bg-green-500 text-[#05080f] font-black px-2 py-0.5 rounded">TRỐNG</span>}
                            </div>
                          </div>
                        </Reveal>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Booking */}
            {selectedPc&&(
              <Reveal className="bg-white/3 border border-cyan-500/25 rounded-2xl p-7 animate-slide-in-up">
                <h3 className="font-black text-xl mb-1">Đặt máy PC {String(selectedPc.pc).padStart(2,'0')}</h3>
                <p className="text-white/35 text-sm mb-6">{selectedPc.specs} · Zone {selectedPc.zone}</p>
                {booked===selectedPc.pc?(
                  <div className="bg-cyan-900/20 border border-cyan-500/25 rounded-xl p-6 text-center animate-scale-in">
                    <p className="text-3xl mb-2">🎮</p>
                    <h4 className="font-black text-xl text-cyan-400 mb-1">Đặt máy thành công!</h4>
                    <p className="text-white/40 text-sm">Đến quầy check-in trong 15 phút. Mang SĐT đã đăng ký.</p>
                    <button onClick={()=>{setBooked(null);setSelectedPc(null)}} className="mt-4 text-xs text-white/25 hover:text-white transition-colors">← Chọn máy khác</button>
                  </div>
                ):(
                  <form onSubmit={handleBook} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[{k:'name',l:'Họ tên / Nick',p:'Nguyễn Văn A',t:'text'},{k:'phone',l:'Số điện thoại',p:'0912...',t:'tel'}].map(f=>(
                      <div key={f.k}>
                        <label className="block text-xs uppercase tracking-wider text-white/25 mb-1.5">{f.l}</label>
                        <input type={f.t} placeholder={f.p} required value={bookForm[f.k as keyof typeof bookForm]}
                          onChange={e=>setBookForm({...bookForm,[f.k]:e.target.value})}
                          className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/18 focus:border-cyan-400 outline-none transition-all"/>
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/25 mb-1.5">Số giờ</label>
                      <select value={bookForm.hours} onChange={e=>setBookForm({...bookForm,hours:e.target.value})}
                        className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-400 outline-none">
                        {['1','2','3','4','5','6','8'].map(h=>{
                          const price = parseInt(h)*selectedPc.price
                          return <option key={h} value={h}>{h}h — {price.toLocaleString()}đ</option>
                        })}
                      </select>
                    </div>
                    <div className="flex gap-3 items-end">
                      <button type="submit" disabled={bookLoading}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 disabled:opacity-50 text-white font-black py-3.5 rounded-xl transition-opacity active:scale-[0.98] flex items-center justify-center gap-2">
                        {bookLoading?<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>:null}
                        ✓ Xác Nhận
                      </button>
                      <button type="button" onClick={()=>setSelectedPc(null)} className="px-4 py-3.5 border border-white/8 hover:border-red-400 text-white/35 hover:text-red-400 rounded-xl transition-all text-sm">Huỷ</button>
                    </div>
                  </form>
                )}
              </Reveal>
            )}
          </div>
        )}

        {/* Packages */}
        {tab==='packages'&&(
          <div>
            <Reveal className="mb-10">
              <h2 className="text-2xl font-black">📦 Combo Tiết Kiệm</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {PACKAGES.map((p,i)=>(
                <Reveal key={p.name} delay={i*80}
                  className={`rounded-2xl border overflow-hidden transition-all hover:-translate-y-1 ${p.hot?'border-cyan-500/45':'border-white/8'}`}>
                  <div className={`p-6 ${p.hot?'bg-gradient-to-br from-cyan-900/40 to-blue-900/30':'bg-white/4'}`}>
                    {p.hot&&<span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-3 py-0.5 rounded-full uppercase tracking-wider block w-fit mb-3">🔥 HOT DEAL</span>}
                    <h3 className="font-black text-lg mb-2">{p.name}</h3>
                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-2xl font-black text-cyan-400">{p.price.toLocaleString()}đ</span>
                      <span className="text-white/25 text-sm line-through mb-0.5">{p.orig.toLocaleString()}đ</span>
                    </div>
                    <p className="text-xs text-white/40">🎁 {p.bonus} · Zone: {p.zone}</p>
                  </div>
                  <div className="px-6 pb-6 pt-4">
                    <button className={`w-full py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all active:scale-95 ${p.hot?'bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white':'border border-white/12 hover:border-cyan-400 text-white/50 hover:text-cyan-400'}`}>
                      Mua Combo
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="bg-white/3 border border-white/8 rounded-2xl p-6">
              <h3 className="font-bold mb-4">💡 Giá Theo Giờ</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ZONES.map(z=>(
                  <div key={z.key} className="bg-white/4 rounded-xl p-4">
                    <p className="font-bold text-sm mb-0.5">{z.name}</p>
                    <p className="text-2xl font-black text-cyan-400">{z.price.toLocaleString()}đ<span className="text-sm font-normal text-white/25">/h</span></p>
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
              <h2 className="text-2xl font-black">🏆 Giải Đấu Sắp Tới</h2>
            </Reveal>
            <div className="space-y-4 mb-8">
              {[
                {game:'Valorant',name:'Summer Cup 2026',prize:'10.000.000đ',date:'28/07',teams:16,reg:11},
                {game:'LOL',name:'Nexus Battle #12',prize:'8.000.000đ',date:'10/08',teams:8,reg:5},
              ].map((t,i)=>(
                <Reveal key={t.name} delay={i*80}
                  className="bg-white/3 border border-white/8 hover:border-cyan-500/25 rounded-2xl p-6 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-cyan-500/18 text-cyan-400 font-bold px-3 py-0.5 rounded-full">{t.game}</span>
                        <span className="text-xs text-white/30">📅 {t.date}</span>
                      </div>
                      <h3 className="font-black text-xl mb-2">{t.name}</h3>
                      <div className="flex flex-wrap gap-5 text-sm text-white/40">
                        <span>🏆 <span className="text-yellow-400 font-bold">{t.prize}</span></span>
                        <span>👥 {t.reg}/{t.teams} đội</span>
                      </div>
                      <div className="mt-3 w-52 h-2 bg-white/8 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" style={{width:`${(t.reg/t.teams)*100}%`}}/>
                      </div>
                      <p className="text-xs text-white/25 mt-1">{t.teams-t.reg} suất trống</p>
                    </div>
                    <button className="flex-shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white font-black px-8 py-3.5 rounded-xl transition-opacity active:scale-95">
                      Đăng Ký Team
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {GAMES.map(g=>(
                <Reveal key={g.name} className="bg-white/3 border border-white/8 hover:border-cyan-500/20 rounded-xl p-4 flex items-center gap-3 transition-all cursor-pointer group">
                  <span className="text-3xl group-hover:scale-110 transition-transform">{g.icon}</span>
                  <div><p className="font-bold text-sm">{g.name}</p><p className="text-xs text-white/30">{g.genre}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Food */}
        {tab==='food'&&(
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Reveal className="mb-6">
                <h2 className="text-2xl font-black">🍜 Đồ Ăn & Thức Uống</h2>
                <p className="text-white/35 text-sm mt-1">Giao tận máy · Trong 10 phút</p>
              </Reveal>
              <div className="space-y-2.5">
                {FOODS.map(f=>(
                  <Reveal key={f.name}>
                    <div className="flex items-center justify-between p-4 bg-white/3 border border-white/6 rounded-xl hover:border-cyan-500/20 transition-all group">
                      <span className="font-medium text-sm">{f.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400 font-bold text-sm">{f.price.toLocaleString()}đ</span>
                        <button onClick={()=>{setFoods(c=>[...c,f]);add(`Đã gọi ${f.name}`,'success')}}
                          className="w-7 h-7 bg-cyan-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-90 text-[#05080f] font-black text-lg leading-none">
                          +
                        </button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal className="bg-white/3 border border-white/8 rounded-2xl p-6 h-fit">
              <h3 className="font-bold text-lg mb-4">Đơn hàng ({foods.length})</h3>
              {foods.length===0?(
                <div className="text-center py-8"><p className="text-3xl mb-2">🛵</p><p className="text-white/25 text-sm">Chưa có món</p></div>
              ):(
                <>
                  <div className="space-y-2 mb-5">
                    {foods.map((item,i)=>(
                      <div key={i} className="flex justify-between py-2 border-b border-white/5 text-sm">
                        <span className="text-white/60">{item.name}</span>
                        <span className="text-cyan-400 font-bold">{item.price.toLocaleString()}đ</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-black text-lg mb-4 pt-2 border-t border-white/8">
                    <span>Tổng</span><span className="text-cyan-400">{foodTotal.toLocaleString()}đ</span>
                  </div>
                  <button onClick={()=>setFoods([])} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white font-black py-3.5 rounded-xl transition-opacity active:scale-95">
                    Gọi Đồ — Giao Tận Máy 🛵
                  </button>
                </>
              )}
            </Reveal>
          </div>
        )}
      </section>

      <footer className="border-t border-white/5 py-10 px-8 text-center text-white/20 text-sm mt-10">
        © 2026 NEXUS Gaming Center · Mẫu bởi <span className="text-cyan-400">Vaitech</span>
      </footer>
    </div>
  )
}
