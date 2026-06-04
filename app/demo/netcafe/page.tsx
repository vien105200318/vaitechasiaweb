'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const pcZones = [
  { id:1, zone:'Zone A — Giải Đấu', configs:[
    { pc:1, status:'available', specs:'i9-14900K · RTX 4090 · 32GB · 360Hz', price:35000 },
    { pc:2, status:'occupied', specs:'i9-14900K · RTX 4090 · 32GB · 360Hz', price:35000, timeLeft:72 },
    { pc:3, status:'occupied', specs:'i9-14900K · RTX 4090 · 32GB · 360Hz', price:35000, timeLeft:34 },
    { pc:4, status:'available', specs:'i9-14900K · RTX 4090 · 32GB · 360Hz', price:35000 },
  ]},
  { id:2, zone:'Zone B — VIP', configs:[
    { pc:5, status:'available', specs:'i7-14700K · RTX 4080 · 32GB · 240Hz', price:28000 },
    { pc:6, status:'occupied', specs:'i7-14700K · RTX 4080 · 32GB · 240Hz', price:28000, timeLeft:120 },
    { pc:7, status:'available', specs:'i7-14700K · RTX 4080 · 32GB · 240Hz', price:28000 },
    { pc:8, status:'booked', specs:'i7-14700K · RTX 4080 · 32GB · 240Hz', price:28000 },
  ]},
  { id:3, zone:'Zone C — Tiêu Chuẩn', configs:[
    { pc:9, status:'occupied', specs:'i5-13600K · RTX 4070 · 16GB · 165Hz', price:20000, timeLeft:15 },
    { pc:10, status:'available', specs:'i5-13600K · RTX 4070 · 16GB · 165Hz', price:20000 },
    { pc:11, status:'available', specs:'i5-13600K · RTX 4070 · 16GB · 165Hz', price:20000 },
    { pc:12, status:'occupied', specs:'i5-13600K · RTX 4070 · 16GB · 165Hz', price:20000, timeLeft:88 },
  ]},
]

const games = [
  { name:'Valorant', img:'🎯', players:'5v5 Tactical', genre:'FPS' },
  { name:'League of Legends', img:'⚔️', players:'5v5 MOBA', genre:'MOBA' },
  { name:'CS2', img:'💣', players:'5v5 FPS', genre:'FPS' },
  { name:'Dota 2', img:'🐉', players:'5v5 MOBA', genre:'MOBA' },
  { name:'Apex Legends', img:'🏆', players:'3v3 BR', genre:'Battle Royale' },
  { name:'FC Online', img:'⚽', players:'1v1', genre:'Sports' },
]

const packages = [
  { name:'Combo 5 Giờ', price:90000, original:100000, bonus:'1 lon nước miễn phí', zone:'Tiêu chuẩn' },
  { name:'Combo 10 Giờ', price:170000, original:200000, bonus:'Snack + nước tự chọn', zone:'VIP', hot:true },
  { name:'Combo Đêm (22h–6h)', price:80000, original:120000, bonus:'8 tiếng + ăn sáng', zone:'Bất kỳ' },
  { name:'Combo Tuần (20h)', price:280000, original:400000, bonus:'Tháng: 4 lượt × 20h', zone:'Bất kỳ' },
]

const tournaments = [
  { game:'Valorant', name:'Summer Cup 2025', prize:'10.000.000đ', date:'28/07', teams:16, registered:11 },
  { game:'LOL', name:'Nexus Battle #12', prize:'8.000.000đ', date:'10/08', teams:8, registered:5 },
]

const foods = [
  { name:'Mì tôm bơ + trứng', price:25000 },
  { name:'Bánh mì kẹp thịt nguội', price:25000 },
  { name:'Xôi mặn', price:20000 },
  { name:'Snack Oishi/Piattos', price:15000 },
  { name:'Pepsi / Sting lon', price:15000 },
  { name:'Trà đào cam sả', price:25000 },
  { name:'Bò húc / Monster', price:25000 },
  { name:'Nước suối lớn', price:10000 },
]

export default function NetCafeDemo() {
  const [activeTab, setActiveTab] = useState<'map'|'package'|'tournament'|'food'>('map')
  const [selectedPc, setSelectedPc] = useState<number|null>(null)
  const [bookForm, setBookForm] = useState({ name:'', phone:'', hours:'2' })
  const [booked, setBooked] = useState(false)
  const [cart, setCart] = useState<{name:string,price:number}[]>([])
  const [time, setTime] = useState(new Date())

  useEffect(()=>{
    const t = setInterval(()=>setTime(new Date()),1000)
    return ()=>clearInterval(t)
  },[])

  const allPcs = pcZones.flatMap(z=>z.configs)
  const available = allPcs.filter(p=>p.status==='available').length
  const occupied = allPcs.filter(p=>p.status==='occupied').length

  const pcColor = (s:string) => s==='available'?'border-green-500/60 bg-green-900/10 hover:bg-green-900/20 cursor-pointer':s==='occupied'?'border-red-500/40 bg-red-900/10 opacity-80':'border-yellow-500/40 bg-yellow-900/10'

  return (
    <div className="min-h-screen bg-[#05080f] text-white overflow-x-hidden font-sans">
      {/* Cyberpunk ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[400px] h-[300px] bg-cyan-900/12 blur-[120px]"/>
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[300px] bg-purple-900/10 blur-[120px]"/>
        <div className="absolute inset-0 opacity-3" style={{backgroundImage:'linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),linear-gradient(90deg,rgba(0,255,255,0.03) 1px, transparent 1px)',backgroundSize:'50px 50px'}}/>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <Link href="/templates" className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Templates
        </Link>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 bg-[#05080f]/95 backdrop-blur border-b border-cyan-500/10">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-sm text-[#05080f]">NX</div>
            <div>
              <p className="font-black text-lg tracking-tight leading-none">NEXUS<span className="text-cyan-400"> GAMING</span></p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Esports Center · Level 99</p>
            </div>
          </div>

          {/* Live status bar */}
          <div className="hidden md:flex items-center gap-6 bg-black/30 border border-white/8 rounded-full px-5 py-2">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/>
              <span className="text-xs text-green-400 font-bold">{available} máy trống</span>
            </div>
            <div className="w-px h-4 bg-white/10"/>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full"/>
              <span className="text-xs text-red-400 font-bold">{occupied} đang dùng</span>
            </div>
            <div className="w-px h-4 bg-white/10"/>
            <span className="text-xs text-white/40 font-mono">{time.toLocaleTimeString('vi-VN')}</span>
          </div>

          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white text-sm font-black px-5 py-2.5 rounded-xl transition-opacity">
            🎮 Đặt Máy
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 min-h-[55vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05080f] via-[#0a0f1e] to-[#05080f]"/>
        {/* Neon lines */}
        <div className="absolute inset-0 overflow-hidden opacity-15">
          {[10,30,50,70,90].map(p=><div key={p} className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-full" style={{top:`${p}%`}}/>)}
        </div>
        <div className="relative z-10 px-8 md:px-16 max-w-[1280px] mx-auto w-full">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"/>
            Cơ sở Esports chuẩn quốc tế · Tournament Host · 24/7
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.88] tracking-tighter mb-6">
            GG OR<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">GO HOME</span>
          </h1>
          <p className="text-white/50 text-xl max-w-md mb-8 leading-relaxed">12 máy RTX 4090 · 8 máy RTX 4080 · Internet quang 10Gbps · Ghế DXRacer · AC 24/7</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
            {[{v:'24/7',l:'Mở cửa'},{v:'10Gbps',l:'Internet'},{v:'360Hz',l:'Màn hình'},{v:'DXRacer',l:'Ghế ngồi'}].map(s=>(
              <div key={s.l} className="bg-white/4 border border-cyan-500/15 rounded-xl p-3 text-center">
                <p className="font-black text-cyan-400 text-lg">{s.v}</p>
                <p className="text-white/40 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling games marquee */}
        <div className="absolute bottom-0 left-0 right-0 bg-cyan-500/5 border-y border-cyan-500/10 py-2 overflow-hidden">
          <div className="flex gap-8 animate-pulse">
            {[...games,...games].map((g,i)=>(
              <span key={i} className="flex items-center gap-2 text-xs text-white/30 whitespace-nowrap px-4">
                <span>{g.img}</span>{g.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-12 px-8 max-w-[1280px] mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/5 pb-4">
          {[{k:'map',l:'🖥️ Sơ Đồ Máy'},{k:'package',l:'📦 Combo & Gói'},{k:'tournament',l:'🏆 Giải Đấu'},{k:'food',l:'🍜 Đồ Ăn & Nước'}].map(tab=>(
            <button key={tab.k} onClick={()=>setActiveTab(tab.k as typeof activeTab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab===tab.k?'bg-gradient-to-r from-cyan-500 to-blue-600 text-white':'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}>
              {tab.l}
            </button>
          ))}
        </div>

        {/* PC Map */}
        {activeTab==='map'&&(
          <div className="space-y-10">
            {pcZones.map(zone=>(
              <div key={zone.id}>
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="font-black text-lg">{zone.zone}</h3>
                  <span className="text-xs text-white/30 bg-white/5 px-3 py-1 rounded-full">{zone.configs[0].price.toLocaleString()}đ/h</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {zone.configs.map(pc=>(
                    <div key={pc.pc}
                      onClick={()=>pc.status==='available'&&setSelectedPc(pc.pc)}
                      className={`relative rounded-2xl border p-5 transition-all ${pcColor(pc.status)} ${selectedPc===pc.pc?'ring-2 ring-cyan-400':''}`}>

                      {/* Monitor icon */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-8 h-6 rounded border-2 flex items-center justify-center text-[10px] ${pc.status==='available'?'border-green-400 bg-green-900/20 text-green-400':pc.status==='occupied'?'border-red-400 bg-red-900/20 text-red-400':'border-yellow-400 bg-yellow-900/20 text-yellow-400'}`}>
                          {pc.status==='available'?'ON':pc.status==='occupied'?'IN USE':'RES'}
                        </div>
                        <span className="font-black text-sm">PC {pc.pc.toString().padStart(2,'0')}</span>
                      </div>

                      <p className="text-[10px] text-white/30 leading-relaxed mb-3">{pc.specs}</p>

                      {pc.status==='occupied'&&pc.timeLeft&&(
                        <div className="flex items-center gap-1.5 bg-red-900/20 border border-red-500/20 rounded-lg px-3 py-1.5 mb-2">
                          <span className="text-red-400 text-xs">⏱</span>
                          <span className="text-xs text-red-300 font-mono">{Math.floor(pc.timeLeft/60)}h{pc.timeLeft%60}m còn lại</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400 font-black">{pc.price.toLocaleString()}đ/h</span>
                        {pc.status==='available'&&(
                          <span className="text-[10px] bg-green-500 text-[#05080f] font-black px-2 py-1 rounded">TRỐNG</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Booking form */}
            {selectedPc&&(
              <div className="bg-white/3 border border-cyan-500/30 rounded-2xl p-7 mt-6">
                <h3 className="font-black text-xl mb-1">Đặt máy PC {String(selectedPc).padStart(2,'0')}</h3>
                <p className="text-white/40 text-sm mb-6">{allPcs.find(p=>p.pc===selectedPc)?.specs}</p>
                {!booked?(
                  <form onSubmit={e=>{e.preventDefault();setBooked(true)}} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[{k:'name',l:'Họ tên',p:'Nick/Tên thật',t:'text'},{k:'phone',l:'Số điện thoại',p:'0912...',t:'tel'}].map(f=>(
                      <div key={f.k}>
                        <label className="block text-xs uppercase tracking-wider text-white/30 mb-1.5">{f.l}</label>
                        <input type={f.t} placeholder={f.p} required value={bookForm[f.k as keyof typeof bookForm]} onChange={e=>setBookForm({...bookForm,[f.k]:e.target.value})}
                          className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-cyan-400 outline-none"/>
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/30 mb-1.5">Số giờ</label>
                      <select value={bookForm.hours} onChange={e=>setBookForm({...bookForm,hours:e.target.value})} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-400 outline-none">
                        {['1','2','3','4','5','6','8'].map(h=>{
                          const price = parseInt(h)*(allPcs.find(p=>p.pc===selectedPc)?.price||0)
                          return <option key={h} value={h}>{h}h — {price.toLocaleString()}đ</option>
                        })}
                      </select>
                    </div>
                    <div className="flex gap-3 items-end">
                      <button type="submit" className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white font-black py-3.5 rounded-xl transition-opacity">
                        ✓ Xác Nhận
                      </button>
                      <button type="button" onClick={()=>setSelectedPc(null)} className="px-4 py-3.5 border border-white/10 hover:border-red-400 text-white/40 hover:text-red-400 rounded-xl transition-all text-sm">Huỷ</button>
                    </div>
                  </form>
                ):(
                  <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-6 text-center">
                    <p className="text-3xl mb-2">🎮</p>
                    <h4 className="font-black text-xl text-cyan-400 mb-1">Đặt máy thành công!</h4>
                    <p className="text-white/50 text-sm">Đến quầy check-in trong vòng 15 phút. Mang theo SĐT đã đăng ký.</p>
                    <button onClick={()=>{setBooked(false);setSelectedPc(null)}} className="mt-4 text-xs text-white/30 hover:text-white transition-colors">← Chọn máy khác</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Packages */}
        {activeTab==='package'&&(
          <div>
            <h2 className="text-2xl font-black mb-8">📦 Combo Tiết Kiệm</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {packages.map(p=>(
                <div key={p.name} className={`rounded-2xl border p-6 relative hover:-translate-y-1 transition-all ${p.hot?'border-cyan-500/50 bg-gradient-to-b from-cyan-900/20 to-blue-900/10':'border-white/8 bg-white/3'}`}>
                  {p.hot&&<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap">🔥 HOT DEAL</div>}
                  <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-2">Zone: {p.zone}</p>
                  <h3 className="font-black text-lg mb-3">{p.name}</h3>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-2xl font-black text-cyan-400">{p.price.toLocaleString()}đ</span>
                    <span className="text-white/30 text-sm line-through mb-0.5">{p.original.toLocaleString()}đ</span>
                  </div>
                  <p className="text-xs text-white/50 mb-5">🎁 {p.bonus}</p>
                  <button className={`w-full py-3 rounded-xl font-black text-sm transition-all ${p.hot?'bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white':'border border-white/15 hover:border-cyan-400 hover:text-cyan-400 text-white/60'}`}>
                    Mua Combo
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white/3 border border-white/8 rounded-2xl p-6">
              <h3 className="font-bold mb-4">💡 Bảng Giá Theo Giờ</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pcZones.map(z=>(
                  <div key={z.id} className="bg-white/4 rounded-xl p-4">
                    <p className="font-bold text-sm mb-1">{z.zone}</p>
                    <p className="text-xs text-white/40 mb-3">{z.configs[0].specs.split('·')[1]?.trim()}</p>
                    <p className="text-2xl font-black text-cyan-400">{z.configs[0].price.toLocaleString()}đ<span className="text-sm font-normal text-white/30">/giờ</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tournament */}
        {activeTab==='tournament'&&(
          <div>
            <h2 className="text-2xl font-black mb-8">🏆 Giải Đấu Sắp Tới</h2>
            <div className="space-y-5">
              {tournaments.map(t=>(
                <div key={t.name} className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-cyan-500/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-cyan-500/20 text-cyan-400 font-bold px-3 py-0.5 rounded-full">{t.game}</span>
                        <span className="text-xs text-white/30">📅 {t.date}</span>
                      </div>
                      <h3 className="font-black text-xl mb-2">{t.name}</h3>
                      <div className="flex flex-wrap gap-5 text-sm text-white/50">
                        <span>🏆 Giải thưởng: <strong className="text-yellow-400">{t.prize}</strong></span>
                        <span>👥 {t.registered}/{t.teams} đội đăng ký</span>
                      </div>
                      <div className="mt-3 w-56 h-2 bg-white/8 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" style={{width:`${(t.registered/t.teams)*100}%`}}/>
                      </div>
                      <p className="text-xs text-white/30 mt-1">{t.teams-t.registered} suất còn lại</p>
                    </div>
                    <button className="flex-shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white font-black px-8 py-3.5 rounded-xl transition-opacity">
                      Đăng Ký Team
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {games.map(g=>(
                <div key={g.name} className="bg-white/3 border border-white/8 rounded-xl p-4 flex items-center gap-3 hover:border-cyan-500/20 transition-all">
                  <span className="text-3xl">{g.img}</span>
                  <div><p className="font-bold text-sm">{g.name}</p><p className="text-xs text-white/30">{g.players} · {g.genre}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Food */}
        {activeTab==='food'&&(
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-black mb-6">🍜 Đồ Ăn & Thức Uống</h2>
              <div className="space-y-2">
                {foods.map(f=>(
                  <div key={f.name} className="flex items-center justify-between p-4 bg-white/3 border border-white/6 rounded-xl hover:border-cyan-500/20 transition-all group">
                    <span className="font-medium text-sm">{f.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 font-bold text-sm">{f.price.toLocaleString()}đ</span>
                      <button onClick={()=>setCart(c=>[...c,f])} className="w-7 h-7 bg-cyan-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 text-[#05080f] font-black text-lg leading-none">+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/3 border border-white/8 rounded-2xl p-6 h-fit">
              <h3 className="font-bold text-lg mb-4">Đơn hàng ({cart.length})</h3>
              {cart.length===0?<p className="text-white/30 text-sm text-center py-8">Chưa chọn món</p>:(
                <>
                  <div className="space-y-2 mb-5">
                    {cart.map((item,i)=>(
                      <div key={i} className="flex justify-between text-sm py-2 border-b border-white/5">
                        <span className="text-white/70">{item.name}</span>
                        <span className="text-cyan-400 font-bold">{item.price.toLocaleString()}đ</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-black text-lg mb-4 pt-2 border-t border-white/10">
                    <span>Tổng</span>
                    <span className="text-cyan-400">{cart.reduce((s,i)=>s+i.price,0).toLocaleString()}đ</span>
                  </div>
                  <button onClick={()=>setCart([])} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white font-black py-3.5 rounded-xl transition-opacity">
                    Gọi Đồ — Giao Tận Máy 🛵
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </section>

      <footer className="border-t border-white/5 py-10 px-8 text-center text-white/20 text-sm mt-10">
        © 2025 NEXUS Gaming Center · Mẫu giao diện bởi <span className="text-cyan-400">Vaitech</span>
      </footer>
    </div>
  )
}
