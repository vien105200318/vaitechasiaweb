'use client'
import { useState, useEffect } from 'react'
import { DemoBackButton, Reveal, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const CLASSES = [
  { name:'HIIT Blast', trainer:'Coach Minh', time:'06:00', dur:'45 min', level:'Advanced', color:'from-orange-600 to-red-600', slots:8, total:20, days:'T2,T4,T6' },
  { name:'Yoga Flow', trainer:'Coach Lan', time:'07:30', dur:'60 min', level:'All levels', color:'from-teal-600 to-green-600', slots:14, total:20, days:'T3,T5,T7' },
  { name:'Spin Cycle', trainer:'Coach Nam', time:'18:00', dur:'45 min', level:'Intermediate', color:'from-blue-600 to-cyan-500', slots:3, total:15, days:'T2,T4,T6' },
  { name:'Muay Thai', trainer:'Coach Bảo', time:'19:00', dur:'60 min', level:'Beginner', color:'from-red-700 to-orange-600', slots:10, total:16, days:'T3,T5' },
  { name:'Pilates Core', trainer:'Coach Hà', time:'08:00', dur:'50 min', level:'All levels', color:'from-pink-600 to-rose-500', slots:11, total:15, days:'T7,CN' },
  { name:'Strength Power', trainer:'Coach Hùng', time:'17:00', dur:'60 min', level:'Advanced', color:'from-gray-700 to-gray-900', slots:2, total:12, days:'Hàng ngày' },
]

const PLANS = [
  { name:'Basic', price:299000, color:'from-gray-700 to-gray-900', features:['Tập gym tự do','Lớp nhóm 5/tháng','1 buổi tư vấn PT','Tủ đồ cá nhân'] },
  { name:'Pro', price:599000, color:'from-orange-500 to-red-600', features:['Tất cả Basic','Lớp nhóm ∞','4 buổi PT/tháng','Sauna & hồ bơi','Dinh dưỡng cơ bản'], hot:true },
  { name:'Elite', price:999000, color:'from-yellow-500 to-orange-500', features:['Tất cả Pro','PT 1-1 8/tháng','Chương trình custom','InBody hàng tháng','Ưu đãi toàn quốc'] },
]

const TRAINERS = [
  { name:'Coach Minh', spec:'HIIT · Cardio', cert:'ACE CPT', exp:'8 năm', avatar:'M', color:'from-orange-500 to-red-600' },
  { name:'Coach Lan', spec:'Yoga · Pilates', cert:'RYT 500', exp:'10 năm', avatar:'L', color:'from-teal-500 to-green-600' },
  { name:'Coach Bảo', spec:'Muay Thai', cert:'ISKA', exp:'12 năm', avatar:'B', color:'from-red-600 to-orange-500' },
  { name:'Coach Hùng', spec:'Strength Power', cert:'NSCA CSCS', exp:'7 năm', avatar:'H', color:'from-gray-600 to-gray-800' },
]

export default function GymDemo() {
  const { toasts, add } = useToast()
  const [registered, setRegistered] = useState<string[]>([])
  const [trialForm, setTrialForm] = useState({ name:'', phone:'', goal:'' })
  const [trialDone, setTrialDone] = useState(false)
  const [trialLoading, setTrialLoading] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const register = (name: string) => {
    if (registered.includes(name)) {
      setRegistered(r => r.filter(n => n !== name))
      add(`Đã huỷ đăng ký ${name}`, 'info')
    } else {
      setRegistered(r => [...r, name])
      add(`Đã đăng ký ${name}!`, 'success')
    }
  }

  const handleTrial = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trialForm.name || !trialForm.phone) { add('Điền đủ thông tin', 'error'); return }
    setTrialLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setTrialLoading(false)
    setTrialDone(true)
    add('Đăng ký tập thử thành công!', 'success')
  }

  const levelColor = (l: string) => l === 'Advanced' ? 'bg-red-900/50 text-red-400' : l === 'Intermediate' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-green-900/50 text-green-400'
  const slotColor = (s: number) => s <= 3 ? 'text-red-400' : s <= 8 ? 'text-yellow-400' : 'text-green-400'

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white overflow-x-hidden font-sans">
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-orange-600/6 rounded-full blur-[150px]" />
      </div>

      {/* Nav */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-400 ${scrolled ? 'bg-[#0c0c0c]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-tight">IRON<span className="text-orange-500">PEAK</span></div>
          <div className="hidden md:flex gap-7 text-sm text-white/50">
            {['Lịch Tập', 'Huấn Luyện Viên', 'Gói Tập', 'Tập Thử'].map(n => (
              <a key={n} href={`#${n}`} className="hover:text-orange-400 transition-colors relative group">
                {n}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-orange-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#Tập Thử" className="hidden md:block bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-opacity active:scale-95">
              Tập Thử Miễn Phí
            </a>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <div className="space-y-1.5">
                <span className={`block w-5 h-0.5 bg-white transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-white transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-[#0c0c0c]/98 border-t border-white/5 px-6 py-4 space-y-3">
            {['Lịch Tập','HLV','Gói Tập','Tập Thử'].map(n=><a key={n} href={`#${n}`} onClick={()=>setMobileOpen(false)} className="block text-sm text-white/60 hover:text-orange-400 py-1">{n}</a>)}
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-xl text-sm">Tập Thử Miễn Phí</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-16 px-8 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] via-[#1a0a00] to-[#0c0c0c]" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex flex-col gap-2 p-6 opacity-25">
          {Array.from({length:3}).map((_,row)=>(
            <div key={row} className="flex gap-2 flex-1">
              {Array.from({length:4}).map((_,col)=>(
                <div key={col} className="flex-1 bg-orange-900/20 rounded-xl border border-orange-500/8 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-orange-500/30">fitness_center</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto w-full">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-orange-300 text-xs font-semibold px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
              Khai trương Chi Nhánh 3 · Tháng 7/2026
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.88] tracking-tight mb-6">
              FORGE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">YOUR</span><br />
              LIMITS
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-white/50 text-xl max-w-md mb-10 leading-relaxed">Hơn 2,000 hội viên đã thay đổi cuộc sống tại IRONPEAK. Đến lượt bạn.</p>
          </Reveal>
          <Reveal delay={240} className="flex flex-wrap gap-4 mb-14">
            <a href="#Tập Thử" className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white font-black px-10 py-4 rounded-xl transition-opacity active:scale-95 text-lg">
              TẬP THỬ MIỄN PHÍ
            </a>
            <a href="#Lịch Tập" className="border border-white/20 hover:border-orange-400 text-white font-bold px-10 py-4 rounded-xl transition-colors">
              Xem Lịch Tập
            </a>
          </Reveal>
          <Reveal delay={300} className="flex flex-wrap gap-10">
            {[{t:2000,s:'+',l:'Hội viên'},{t:50,s:'+',l:'Lớp/tuần'},{t:12,s:'',l:'HLV'},{t:3,s:'',l:'Chi nhánh'}].map(s=>(
              <div key={s.l}>
                <p className="text-3xl font-black text-orange-400"><CountUp target={s.t} suffix={s.s} /></p>
                <p className="text-white/40 text-sm">{s.l}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Classes */}
      <section id="Lịch Tập" className="py-20 px-8 max-w-[1280px] mx-auto">
        <Reveal className="flex justify-between items-end mb-12 gap-6 flex-wrap">
          <div>
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest block mb-2">Lịch Tập</span>
            <h2 className="text-4xl font-black">Classes Tuần Này</h2>
          </div>
          <p className="text-white/40 text-sm">{registered.length > 0 ? `${registered.length} lớp đã đăng ký` : 'Click để đăng ký · Huỷ bất kỳ lúc nào'}</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLASSES.map((cls, i) => (
            <Reveal key={cls.name} delay={i * 60}
              className={`rounded-2xl border overflow-hidden transition-all ${registered.includes(cls.name) ? 'border-orange-500/50' : 'border-white/8 hover:border-orange-500/25'}`}>
              {/* Header gradient */}
              <div className={`bg-gradient-to-r ${cls.color} px-5 py-3 flex justify-between items-center`}>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${levelColor(cls.level)}`}>{cls.level}</span>
                <span className="text-white/80 font-mono text-sm font-bold">{cls.time}</span>
              </div>
              <div className="bg-[#1a1a1a] p-5">
                <h3 className="font-black text-xl mb-0.5">{cls.name}</h3>
                <p className="text-white/50 text-sm mb-3">👤 {cls.trainer} · {cls.dur} · {cls.days}</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${cls.color} transition-all`}
                      style={{ width: `${((cls.total - cls.slots) / cls.total) * 100}%` }} />
                  </div>
                  <span className={`text-xs font-bold whitespace-nowrap ${slotColor(cls.slots)}`}>{cls.slots} chỗ</span>
                </div>
                <button onClick={() => register(cls.name)} disabled={cls.slots === 0}
                  className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all active:scale-95 ${
                    registered.includes(cls.name) ? `bg-gradient-to-r ${cls.color} text-white` : cls.slots === 0 ? 'bg-white/5 text-white/25' : 'bg-white/6 hover:bg-orange-500 text-white/60 hover:text-white border border-white/10 hover:border-orange-500'
                  }`}>
                  {registered.includes(cls.name) ? '✓ Đã Đăng Ký' : cls.slots === 0 ? 'Hết Chỗ' : 'Đăng Ký Ngay'}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trainers */}
      <section id="Huấn Luyện Viên" className="py-16 bg-[#121212]">
        <div className="px-8 max-w-[1280px] mx-auto">
          <Reveal className="mb-12">
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest block mb-2">Huấn Luyện Viên</span>
            <h2 className="text-4xl font-black">Đội Ngũ Elite</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {TRAINERS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}
                className="bg-[#1a1a1a] border border-white/8 hover:border-orange-500/30 rounded-2xl p-6 transition-all group cursor-pointer hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-xl font-black mb-4`}>{t.avatar}</div>
                <p className="font-black text-base mb-0.5">{t.name}</p>
                <p className="text-orange-400 text-xs font-semibold mb-1">{t.spec}</p>
                <p className="text-white/35 text-xs">{t.cert} · {t.exp}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="Gói Tập" className="py-20 px-8 max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-12">
          <span className="text-orange-400 text-xs font-bold uppercase tracking-widest block mb-2">Gói Tập</span>
          <h2 className="text-4xl font-black">Chọn Mức Độ Của Bạn</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}
              className={`rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 ${(p as {hot?:boolean}).hot ? 'border-orange-500/50' : 'border-white/10'}`}>
              <div className={`bg-gradient-to-br ${p.color} p-6`}>
                {(p as {hot?:boolean}).hot && <span className="text-[10px] bg-white/20 text-white font-bold px-3 py-0.5 rounded-full uppercase tracking-wider block w-fit mb-3">🔥 Phổ biến</span>}
                <h3 className="font-black text-2xl mb-1">{p.name}</h3>
                <p className="text-3xl font-black">{p.price.toLocaleString()}đ<span className="text-base font-normal opacity-70">/tháng</span></p>
              </div>
              <div className="bg-[#1a1a1a] p-6">
                <ul className="space-y-2.5 mb-6">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/65">
                      <span className="material-symbols-outlined text-orange-400 text-base" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>{f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all active:scale-95 ${(p as {hot?:boolean}).hot ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white' : 'border border-white/20 hover:border-orange-400 hover:text-orange-400 text-white/55'}`}>
                  Đăng Ký Ngay
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trial CTA */}
      <section id="Tập Thử" className="py-20 bg-gradient-to-r from-orange-900/25 to-red-900/15 border-y border-orange-500/15">
        <div className="px-8 max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <h2 className="text-4xl font-black mb-4">Tập Thử <span className="text-orange-400">7 Ngày</span> Miễn Phí</h2>
              <p className="text-white/50 mb-0">Không cần thẻ tín dụng. Đầy đủ lớp học và thiết bị.</p>
            </Reveal>
            {!trialDone ? (
              <Reveal delay={100}>
                <form onSubmit={handleTrial} className="space-y-3">
                  {[{k:'name',p:'Họ tên'},{k:'phone',p:'Số điện thoại'}].map(f=>(
                    <input key={f.k} placeholder={f.p} value={trialForm[f.k as keyof typeof trialForm]}
                      onChange={e=>setTrialForm({...trialForm,[f.k]:e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-orange-400 outline-none transition-all" />
                  ))}
                  <select value={trialForm.goal} onChange={e=>setTrialForm({...trialForm,goal:e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-400 outline-none">
                    <option value="">Mục tiêu của bạn...</option>
                    {['Giảm cân','Tăng cơ','Cải thiện sức khoẻ','Thi đấu','Giảm stress'].map(g=><option key={g}>{g}</option>)}
                  </select>
                  <button type="submit" disabled={trialLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 disabled:opacity-50 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-opacity active:scale-[0.98] flex items-center justify-center gap-2">
                    {trialLoading ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> : null}
                    Đăng Ký Ngay
                  </button>
                </form>
              </Reveal>
            ) : (
              <Reveal>
                <div className="bg-orange-500/10 border border-orange-500/25 rounded-2xl p-6 text-center animate-scale-in">
                  <p className="text-4xl mb-3">💪</p>
                  <h3 className="text-xl font-black mb-2 text-orange-400">Đã nhận yêu cầu!</h3>
                  <p className="text-white/50 text-sm">Trainer liên hệ trong 2 giờ để sắp xếp buổi đầu tiên.</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#0c0c0c] border-t border-white/5 py-10 px-8 text-center text-white/25 text-sm font-sans">
        © 2026 IRONPEAK Fitness · Mẫu bởi <span className="text-orange-400">Vaitech</span>
      </footer>
    </div>
  )
}
