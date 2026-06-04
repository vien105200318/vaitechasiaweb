'use client'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const projects = [
  { id:1, title:'Brand Identity — LUNA Café', cat:'Branding', year:'2025', desc:'Hệ thống nhận diện thương hiệu đầy đủ cho chuỗi cà phê cao cấp.', tags:['Logo','Typography','Color System'] },
  { id:2, title:'UI/UX — flowAI Dashboard', cat:'UI/UX Design', year:'2025', desc:'Thiết kế dashboard SaaS tối ưu trải nghiệm người dùng và data visualization.', tags:['Figma','Design System','Prototype'] },
  { id:3, title:'Web Design — Azure Resort', cat:'Web Design', year:'2024', desc:'Website luxury resort với hiệu ứng motion và booking system.', tags:['Next.js','Animation','CMS'] },
  { id:4, title:'Packaging — Terra Roast', cat:'Packaging', year:'2024', desc:'Thiết kế bao bì túi cà phê specialty với hệ thống nhận diện nguồn gốc.', tags:['Print','Illustration','Typography'] },
  { id:5, title:'Mobile App — MedCare', cat:'App Design', year:'2024', desc:'Ứng dụng đặt lịch khám bệnh với UX tối giản và accessibility-first.', tags:['iOS','Android','Figma'] },
  { id:6, title:'Motion Design — IRONPEAK', cat:'Motion', year:'2023', desc:'Bộ video intro và social media animation cho chuỗi gym cao cấp.', tags:['After Effects','Lottie','Brand Motion'] },
]

const skills = ['Brand Identity','UI/UX Design','Web Design','Motion Design','Packaging','Typography','Figma','Next.js','After Effects']

const IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl'

export default function PortfolioDemo() {
  const [filter, setFilter] = useState('Tất Cả')
  const [hovered, setHovered] = useState<number|null>(null)
  const [msgSent, setMsgSent] = useState(false)
  const [msg, setMsg] = useState({ name:'', email:'', budget:'', project:'' })

  const cats = ['Tất Cả',...Array.from(new Set(projects.map(p=>p.cat)))]
  const filtered = filter==='Tất Cả'?projects:projects.filter(p=>p.cat===filter)

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden font-sans">
      <div className="fixed top-4 right-4 z-50">
        <Link href="/templates" className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all">
          <ArrowLeft size={16} /> Templates
        </Link>
      </div>

      <nav className="fixed top-0 w-full z-40 bg-[#0d0d0d]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-8 h-14 flex items-center justify-between">
          <span className="font-bold tracking-[0.1em] text-sm uppercase">Nguyễn Hoàng Minh</span>
          <div className="flex gap-7 text-xs uppercase tracking-widest text-white/50">{['Work','About','Process','Contact'].map(n=><a key={n} href="#" className="hover:text-white transition-colors">{n}</a>)}</div>
          <button className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">CV →</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center px-8 max-w-[1200px] mx-auto pt-14">
        <div className="w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-lg font-black">M</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
              <span className="text-xs text-white/50 uppercase tracking-widest">Available for work</span>
            </div>
          </div>
          <h1 className="text-6xl md:text-[100px] font-black leading-[0.88] tracking-tight mb-8">
            Creative<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-orange-300">Designer</span><br/>
            & Developer
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm mb-12">
            <span>Đà Nẵng, Việt Nam</span>
            <span>·</span>
            <span>6 năm kinh nghiệm</span>
            <span>·</span>
            <span>80+ dự án hoàn thành</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-12">
            {skills.map(s=>(
              <span key={s} className="text-xs border border-white/15 text-white/60 px-3 py-1.5 rounded-full hover:border-violet-400 hover:text-violet-300 transition-all cursor-default">{s}</span>
            ))}
          </div>
          <div className="flex gap-4">
            <button className="bg-white text-[#0d0d0d] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors">Xem Portfolio</button>
            <button className="border border-white/20 hover:border-violet-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors">Liên Hệ Hợp Tác</button>
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="py-20 px-8 max-w-[1200px] mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-12">
          <h2 className="text-3xl font-black">Selected Work</h2>
          <div className="flex flex-wrap gap-2">
            {cats.map(c=>(
              <button key={c} onClick={()=>setFilter(c)} className={`px-4 py-2 text-xs uppercase tracking-widest rounded-full transition-all ${filter===c?'bg-white text-[#0d0d0d] font-bold':'border border-white/15 text-white/50 hover:border-white/40'}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p=>(
            <div key={p.id} className="group relative rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 cursor-pointer"
              onMouseEnter={()=>setHovered(p.id)} onMouseLeave={()=>setHovered(null)}>
              <div className="relative h-52 overflow-hidden">
                <Image src={IMG} alt={p.title} fill className={`object-cover transition-all duration-700 ${hovered===p.id?'scale-110 brightness-40':'scale-100 brightness-70'}`} unoptimized/>
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered===p.id?'opacity-100':'opacity-0'}`}>
                  <span className="border-2 border-white text-white text-xs font-bold px-5 py-2.5 uppercase tracking-widest hover:bg-white hover:text-[#0d0d0d] transition-colors">View Project →</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">{p.cat}</span>
                  <span className="text-[10px] text-white/30">{p.year}</span>
                </div>
                <h3 className="font-bold text-base mb-2 leading-tight">{p.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(t=><span key={t} className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-[#111]">
        <div className="px-8 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-80 rounded-3xl overflow-hidden">
            <Image src={IMG} alt="Designer" fill className="object-cover grayscale" unoptimized/>
            <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-5 py-3">
              <p className="font-bold">Minh Designer</p>
              <p className="text-white/50 text-xs">UI/UX · Brand · Dev</p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-black mb-6">Về Tôi</h2>
            <p className="text-white/60 leading-relaxed mb-5">Tôi là designer và developer với 6 năm kinh nghiệm trong lĩnh vực brand identity, UI/UX và web development. Đam mê tạo ra những sản phẩm kỹ thuật số đẹp và có tính năng sử dụng cao.</p>
            <p className="text-white/60 leading-relaxed mb-8">Từng hợp tác với 40+ thương hiệu từ startup đến doanh nghiệp lớn trên toàn quốc.</p>
            <div className="flex gap-6">
              {[{v:'80+',l:'Dự án'},{v:'40+',l:'Khách hàng'},{v:'6',l:'Năm KN'}].map(s=>(
                <div key={s.l}><p className="text-2xl font-black text-violet-400">{s.v}</p><p className="text-white/40 text-xs">{s.l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-8 max-w-[900px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-3">Hãy Tạo Ra Điều Gì Đó</h2>
          <p className="text-white/50">Tôi luôn mở cửa cho những dự án thú vị và cộng tác sáng tạo.</p>
        </div>
        {msgSent?(
          <div className="bg-violet-500/10 border border-violet-500/30 rounded-2xl p-10 text-center">
            <p className="text-4xl mb-4">✨</p><h3 className="text-2xl font-black mb-2">Tin nhắn đã gửi!</h3><p className="text-white/50">Tôi sẽ phản hồi trong vòng 24 giờ.</p>
          </div>
        ):(
          <form onSubmit={e=>{e.preventDefault();setMsgSent(true)}} className="bg-[#1a1a1a] border border-white/8 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {[{k:'name',l:'Họ tên',p:'Nguyễn Văn A'},{k:'email',l:'Email',p:'ban@cty.com'}].map(f=>(
              <div key={f.k}>
                <label className="text-xs uppercase tracking-widest text-white/30 block mb-1.5">{f.l}</label>
                <input required placeholder={f.p} value={msg[f.k as keyof typeof msg]} onChange={e=>setMsg({...msg,[f.k]:e.target.value})}
                  className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-violet-400 outline-none"/>
              </div>
            ))}
            <div>
              <label className="text-xs uppercase tracking-widest text-white/30 block mb-1.5">Budget</label>
              <select value={msg.budget} onChange={e=>setMsg({...msg,budget:e.target.value})} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:border-violet-400 outline-none">
                <option value="">Chọn ngân sách...</option>
                {['Dưới 10 triệu','10–30 triệu','30–100 triệu','Trên 100 triệu'].map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/30 block mb-1.5">Loại dự án</label>
              <select value={msg.project} onChange={e=>setMsg({...msg,project:e.target.value})} className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-white focus:border-violet-400 outline-none">
                <option value="">Chọn loại...</option>
                {['Brand Identity','UI/UX Design','Web Design','Motion Design','Full Package'].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-90 text-white font-black py-4 rounded-2xl transition-opacity uppercase tracking-widest">Gửi Tin Nhắn</button>
            </div>
          </form>
        )}
      </section>

      <footer className="border-t border-white/5 py-10 px-8 text-center text-white/30 text-sm">
        © 2025 Nguyễn Hoàng Minh · Mẫu bởi <span className="text-violet-400">Vaitech</span>
      </footer>
    </div>
  )
}
