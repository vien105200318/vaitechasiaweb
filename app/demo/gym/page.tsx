'use client'
import { useState } from 'react'
import Link from 'next/link'

const plans = [
  { name:'Basic', price:299000, features:['Tập gym không giới hạn','Lớp nhóm 5 buổi/tháng','1 buổi PT tư vấn','Tủ đồ cá nhân'], color:'from-gray-700 to-gray-900' },
  { name:'Pro', price:599000, features:['Tất cả Basic','Lớp nhóm không giới hạn','4 buổi PT/tháng','Sauna & hồ bơi','Dinh dưỡng cơ bản'], color:'from-orange-500 to-red-600', hot:true },
  { name:'Elite', price:999000, features:['Tất cả Pro','PT 1-1 8 buổi/tháng','Chương trình custom','Theo dõi InBody','Ưu đãi chuỗi toàn quốc'], color:'from-yellow-500 to-orange-500' },
]

const classes = [
  { name:'HIIT Blast', trainer:'Coach Minh', time:'06:00', duration:'45 min', level:'Advanced', slots:8, total:20, day:'Thứ 2,4,6' },
  { name:'Yoga Flow', trainer:'Coach Lan', time:'07:30', duration:'60 min', level:'All levels', slots:15, total:20, day:'Thứ 3,5,7' },
  { name:'Spin Cycle', trainer:'Coach Nam', time:'18:00', duration:'45 min', level:'Intermediate', slots:5, total:15, day:'Thứ 2,4,6' },
  { name:'Muay Thai', trainer:'Coach Bảo', time:'19:00', duration:'60 min', level:'Beginner', slots:10, total:16, day:'Thứ 3,5' },
  { name:'Pilates Core', trainer:'Coach Hà', time:'08:00', duration:'50 min', level:'All levels', slots:12, total:15, day:'Thứ 7,CN' },
  { name:'Strength & Power', trainer:'Coach Hùng', time:'17:00', duration:'60 min', level:'Advanced', slots:3, total:12, day:'Hàng ngày' },
]

const trainers = [
  { name:'Coach Minh', spec:'HIIT · Cardio', cert:'ACE CPT', exp:'8 năm', avatar:'M' },
  { name:'Coach Lan', spec:'Yoga · Pilates', cert:'RYT 500', exp:'10 năm', avatar:'L' },
  { name:'Coach Bảo', spec:'Muay Thai · Boxing', cert:'ISKA', exp:'12 năm', avatar:'B' },
  { name:'Coach Hùng', spec:'Strength · Powerlifting', cert:'NSCA CSCS', exp:'7 năm', avatar:'H' },
]

export default function GymDemo() {
  const [registered, setRegistered] = useState<string[]>([])
  const [trialForm, setTrialForm] = useState({ name:'', phone:'', goal:'' })
  const [trialDone, setTrialDone] = useState(false)

  const register = (name:string) => {
    setRegistered(r=>r.includes(name)?r.filter(n=>n!==name):[...r,name])
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white overflow-x-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-orange-600/8 blur-[150px]"/>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <Link href="/templates" className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Templates
        </Link>
      </div>

      <nav className="fixed top-0 w-full z-40 bg-[#0c0c0c]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-tight">IRON<span className="text-orange-500">PEAK</span></div>
          <div className="hidden md:flex gap-7 text-sm text-white/50">{['Lịch Tập','PT','Gói Tập','Nutrition','About'].map(n=><a key={n} href="#" className="hover:text-orange-400 transition-colors">{n}</a>)}</div>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">Tập Thử Miễn Phí</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] via-[#1a0a00] to-[#0c0c0c]"/>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10"/>
          <div className="grid grid-cols-2 gap-2 p-4 opacity-40">
            {Array.from({length:8}).map((_,i)=>(
              <div key={i} className="h-40 bg-orange-900/30 rounded-xl border border-orange-500/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-orange-500/40">fitness_center</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 px-8 md:px-16 max-w-[1280px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"/>50+ lớp học mỗi tuần · Khai trương Chi Nhánh 3 tháng 7
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight mb-6">
            FORGE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">YOUR</span><br/>LIMITS
          </h1>
          <p className="text-white/60 text-xl max-w-md mb-10 leading-relaxed">Hơn 2,000 hội viên đã thay đổi cuộc sống tại IRONPEAK. Đến lượt bạn.</p>
          <div className="flex gap-4 mb-14">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-black px-10 py-4 rounded-xl hover:opacity-90 transition-opacity text-lg">TẬP THỬ MIỄN PHÍ</button>
            <button className="border border-white/20 hover:border-orange-400 text-white font-bold px-10 py-4 rounded-xl transition-colors">Xem Lịch Tập</button>
          </div>
          <div className="flex gap-10">
            {[{v:'2,000+',l:'Hội viên'},{v:'50+',l:'Lớp/tuần'},{v:'12',l:'Huấn luyện viên'},{v:'3',l:'Chi nhánh'}].map(s=>(
              <div key={s.l}><p className="text-3xl font-black text-orange-400">{s.v}</p><p className="text-white/50 text-sm">{s.l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes */}
      <section className="py-20 px-8 max-w-[1280px] mx-auto">
        <div className="flex justify-between items-end mb-12 gap-6">
          <div><span className="text-orange-400 text-xs font-semibold uppercase tracking-widest block mb-2">Lịch Tập</span><h2 className="text-4xl font-black">Classes Tuần Này</h2></div>
          <p className="text-white/50 text-sm">Click để đăng ký · Huỷ bất kỳ lúc nào</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map(cls=>(
            <div key={cls.name} className={`rounded-2xl p-6 border transition-all ${registered.includes(cls.name)?'border-orange-500/60 bg-orange-950/30':'border-white/8 bg-white/3 hover:border-orange-500/30'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-2 inline-block ${cls.level==='Advanced'?'bg-red-900/50 text-red-400':cls.level==='Intermediate'?'bg-yellow-900/50 text-yellow-400':'bg-green-900/50 text-green-400'}`}>{cls.level}</span>
                  <h3 className="font-black text-xl">{cls.name}</h3>
                </div>
                <div className="text-right text-sm text-white/50"><p>{cls.time}</p><p>{cls.duration}</p></div>
              </div>
              <p className="text-white/60 text-sm mb-2">👤 {cls.trainer} · {cls.day}</p>
              <div className="flex justify-between items-center mb-4">
                <div className="flex-1 mr-3">
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full transition-all" style={{width:`${((cls.total-cls.slots)/cls.total*100)}%`}}/>
                  </div>
                </div>
                <span className={`text-xs font-bold ${cls.slots<=3?'text-red-400':cls.slots<=8?'text-yellow-400':'text-green-400'}`}>{cls.slots} chỗ trống</span>
              </div>
              <button onClick={()=>register(cls.name)} disabled={cls.slots===0} className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${registered.includes(cls.name)?'bg-orange-500 text-white':'bg-white/5 hover:bg-orange-500 text-white/70 hover:text-white border border-white/10 hover:border-orange-500'} disabled:opacity-40`}>
                {registered.includes(cls.name)?'✓ Đã Đăng Ký':'Đăng Ký Ngay'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trainers */}
      <section className="py-16 bg-[#121212]">
        <div className="px-8 max-w-[1280px] mx-auto">
          <div className="mb-12"><span className="text-orange-400 text-xs font-semibold uppercase tracking-widest block mb-2">Huấn Luyện Viên</span><h2 className="text-4xl font-black">Đội Ngũ Elite</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {trainers.map(t=>(
              <div key={t.name} className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6 hover:border-orange-500/40 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-xl font-black mb-4">{t.avatar}</div>
                <p className="font-black text-base mb-0.5">{t.name}</p>
                <p className="text-orange-400 text-xs font-semibold mb-1">{t.spec}</p>
                <p className="text-white/40 text-xs">{t.cert} · {t.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-8 max-w-[1280px] mx-auto">
        <div className="text-center mb-12"><span className="text-orange-400 text-xs font-semibold uppercase tracking-widest block mb-2">Gói Tập</span><h2 className="text-4xl font-black">Chọn Mức Độ Của Bạn</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {plans.map(p=>(
            <div key={p.name} className={`rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 ${p.hot?'border-orange-500/50':'border-white/10'}`}>
              <div className={`bg-gradient-to-br ${p.color} p-6`}>
                {p.hot&&<span className="text-[10px] bg-white/20 text-white font-bold px-3 py-0.5 rounded-full uppercase tracking-wider block w-fit mb-3">Phổ biến</span>}
                <h3 className="font-black text-2xl mb-1">{p.name}</h3>
                <p className="text-3xl font-black">{p.price.toLocaleString()}đ<span className="text-base font-normal opacity-70">/tháng</span></p>
              </div>
              <div className="bg-[#1a1a1a] p-6">
                <ul className="space-y-2.5 mb-6">
                  {p.features.map(f=>(
                    <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="material-symbols-outlined text-orange-400 text-base" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>{f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${p.hot?'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90':'border border-white/20 hover:border-orange-400 text-white'}`}>
                  Đăng Ký Ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trial CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-900/30 to-red-900/20 border-y border-orange-500/20">
        <div className="px-8 max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-4">Tập Thử <span className="text-orange-400">7 Ngày</span> Miễn Phí</h2>
              <p className="text-white/60 mb-0">Không cần thẻ tín dụng. Trải nghiệm đầy đủ tất cả lớp và thiết bị.</p>
            </div>
            {!trialDone?(
              <form onSubmit={e=>{e.preventDefault();setTrialDone(true)}} className="space-y-3">
                {[{k:'name',p:'Họ tên'},{k:'phone',p:'Số điện thoại'}].map(f=>(
                  <input key={f.k} placeholder={f.p} required value={trialForm[f.k as keyof typeof trialForm]} onChange={e=>setTrialForm({...trialForm,[f.k]:e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-400 outline-none"/>
                ))}
                <select value={trialForm.goal} onChange={e=>setTrialForm({...trialForm,goal:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-orange-400 outline-none">
                  <option value="">Mục tiêu của bạn...</option>
                  {['Giảm cân','Tăng cơ','Cải thiện sức khoẻ','Giảm stress','Thi đấu thể thao'].map(g=><option key={g}>{g}</option>)}
                </select>
                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-black py-4 rounded-xl hover:opacity-90 transition-opacity uppercase tracking-widest">Đăng Ký Ngay</button>
              </form>
            ):(
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 text-center">
                <p className="text-4xl mb-3">💪</p><h3 className="text-xl font-black mb-2">Đã nhận yêu cầu!</h3>
                <p className="text-white/60 text-sm">Trainer sẽ liên hệ trong 2 giờ để sắp xếp buổi tập đầu tiên.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#0c0c0c] border-t border-white/5 py-10 px-8 text-center text-white/30 text-sm">
        © 2025 IRONPEAK Fitness · Mẫu bởi <span className="text-orange-400">Vaitech</span>
      </footer>
    </div>
  )
}
