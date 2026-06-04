'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const rooms = [
  { id:1, name:'Deluxe Ocean View', size:'45m²', guests:2, price:2800000, features:['King Bed','Ocean View','Bathtub','Free Minibar'], tag:'Bestseller' },
  { id:2, name:'Premier Suite', size:'75m²', guests:3, price:5500000, features:['King Bed','Private Terrace','Living Room','Butler Service'], tag:'Popular' },
  { id:3, name:'Presidential Villa', size:'180m²', guests:6, price:15000000, features:['3 Bedrooms','Private Pool','Kitchen','Concierge 24/7'], tag:'Luxury' },
]

const amenities = [
  { icon:'pool', label:'Hồ bơi vô cực' },
  { icon:'spa', label:'Spa & Wellness' },
  { icon:'restaurant', label:'5 Nhà hàng' },
  { icon:'fitness_center', label:'Gym hiện đại' },
  { icon:'beach_access', label:'Bãi biển riêng' },
  { icon:'local_bar', label:'Rooftop Bar' },
]

const HERO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl'

export default function HotelDemo() {
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guests, setGuests] = useState('2')
  const [booked, setBooked] = useState<number|null>(null)
  const [activeRoom, setActiveRoom] = useState(rooms[0])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden" style={{fontFamily:"'Cormorant Garamond', 'Georgia', serif"}}>
      <div className="fixed top-4 right-4 z-50">
        <Link href="/templates" className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-sans font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Templates
        </Link>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 bg-transparent">
        <div className="max-w-[1400px] mx-auto px-10 h-20 flex items-center justify-between">
          <div className="text-xs font-sans uppercase tracking-[0.4em] text-white/40">Đà Nẵng · Việt Nam</div>
          <div className="text-center">
            <p className="text-2xl font-bold tracking-[0.15em] text-[#d4af6a]">AZURE</p>
            <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-white/40">Luxury Resort & Spa</p>
          </div>
          <button className="font-sans bg-[#d4af6a] text-[#0a0a0f] text-xs font-bold px-5 py-2.5 uppercase tracking-widest hover:bg-[#c09d55] transition-colors">
            Đặt Phòng
          </button>
        </div>
      </nav>

      {/* Hero full-bleed */}
      <section className="relative h-screen flex items-end">
        <div className="absolute inset-0">
          <Image src={HERO} alt="Azure Resort" fill className="object-cover" unoptimized priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/30 to-transparent" />
        </div>
        <div className="relative z-10 w-full px-10 max-w-[1400px] mx-auto pb-20">
          <p className="text-[#d4af6a] text-xs font-sans uppercase tracking-[0.5em] mb-4">Nơi Thiên Nhiên Gặp Gỡ Xa Hoa</p>
          <h1 className="text-7xl md:text-[110px] font-bold leading-[0.85] mb-8">
            Escape<br/><span className="italic text-[#d4af6a]">the Ordinary</span>
          </h1>
          {/* Quick booking bar */}
          <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5 inline-flex flex-wrap gap-4 items-end">
            {[{label:'Nhận phòng',type:'date',val:checkin,set:setCheckin},{label:'Trả phòng',type:'date',val:checkout,set:setCheckout}].map(f=>(
              <div key={f.label}>
                <p className="text-[10px] font-sans uppercase tracking-widest text-white/40 mb-1.5">{f.label}</p>
                <input type="date" value={f.val} onChange={e=>f.set(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 font-sans text-sm text-white focus:border-[#d4af6a] outline-none" />
              </div>
            ))}
            <div>
              <p className="text-[10px] font-sans uppercase tracking-widest text-white/40 mb-1.5">Khách</p>
              <select value={guests} onChange={e=>setGuests(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 font-sans text-sm text-white focus:border-[#d4af6a] outline-none">
                {['1','2','3','4','5+'].map(g=><option key={g} value={g}>{g} khách</option>)}
              </select>
            </div>
            <button className="bg-[#d4af6a] text-[#0a0a0f] font-sans font-bold px-8 py-2.5 rounded-lg uppercase tracking-widest text-sm hover:bg-[#c09d55] transition-colors">
              Kiểm Tra Phòng
            </button>
          </div>
        </div>
      </section>

      {/* Awards bar */}
      <section className="bg-[#d4af6a]/10 border-y border-[#d4af6a]/20 py-5">
        <div className="max-w-[1400px] mx-auto px-10 flex flex-wrap justify-center gap-10">
          {["Forbes 5 Stars 2024","Condé Nast Traveler Top 50","TripAdvisor Travelers' Choice"].map(a=>(
            <div key={a} className="flex items-center gap-2 text-sm font-sans text-white/60">
              <span className="material-symbols-outlined text-[#d4af6a] text-base" style={{fontVariationSettings:"'FILL' 1"}}>star</span>{a}
            </div>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 px-10 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div>
            <span className="text-[#d4af6a] text-xs font-sans uppercase tracking-[0.4em] block mb-3">Tiện Nghi Đẳng Cấp</span>
            <h2 className="text-5xl font-bold">Trải Nghiệm Vượt<br/>Mong Đợi</h2>
          </div>
          <p className="text-white/50 font-sans max-w-sm text-sm leading-relaxed">Mỗi góc nhỏ của Azure đều được thiết kế để mang lại trải nghiệm sang trọng và thư giãn hoàn toàn.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {amenities.map(a=>(
            <div key={a.label} className="bg-white/3 border border-white/8 rounded-2xl p-6 text-center hover:border-[#d4af6a]/40 transition-all group">
              <span className="material-symbols-outlined text-[#d4af6a] text-3xl mb-3 block group-hover:scale-110 transition-transform">{a.icon}</span>
              <p className="font-sans text-sm text-white/70">{a.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rooms */}
      <section className="py-16 bg-[#0f0f1a]">
        <div className="px-10 max-w-[1400px] mx-auto">
          <div className="mb-12">
            <span className="text-[#d4af6a] text-xs font-sans uppercase tracking-[0.4em] block mb-3">Phòng & Suite</span>
            <h2 className="text-4xl font-bold">Chọn Không Gian Của Bạn</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {rooms.map(room=>(
              <div key={room.id} onClick={()=>setActiveRoom(room)} className={`rounded-2xl border overflow-hidden cursor-pointer transition-all hover:-translate-y-1 duration-300 ${activeRoom.id===room.id?'border-[#d4af6a]/60':'border-white/8 hover:border-[#d4af6a]/30'}`}>
                <div className="relative h-52 bg-white/5">
                  <Image src={HERO} alt={room.name} fill className="object-cover brightness-75" unoptimized />
                  <span className="absolute top-4 left-4 text-[10px] bg-[#d4af6a] text-[#0a0a0f] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider">{room.tag}</span>
                </div>
                <div className="p-6 bg-[#12121f]">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold">{room.name}</h3>
                    <p className="text-[#d4af6a] font-sans font-bold text-right">
                      <span className="text-xl">{room.price.toLocaleString()}đ</span>
                      <span className="text-xs text-white/40 block">/đêm</span>
                    </p>
                  </div>
                  <div className="flex gap-3 mb-4 font-sans text-xs text-white/50">
                    <span>📐 {room.size}</span><span>👤 {room.guests} khách tối đa</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {room.features.map(f=><span key={f} className="text-[10px] bg-white/5 border border-white/8 text-white/60 px-2 py-1 rounded font-sans">{f}</span>)}
                  </div>
                  <button onClick={()=>setBooked(room.id)} className={`w-full py-3 rounded-xl font-sans font-bold text-xs uppercase tracking-widest transition-all ${booked===room.id?'bg-green-600 text-white':'bg-[#d4af6a] text-[#0a0a0f] hover:bg-[#c09d55]'}`}>
                    {booked===room.id?'✓ Đã Đặt — Kiểm Tra Email':'Đặt Phòng Này'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-10 text-center relative overflow-hidden">
        <div className="absolute inset-0"><Image src={HERO} alt="" fill className="object-cover opacity-20" unoptimized /></div>
        <div className="absolute inset-0 bg-[#0a0a0f]/80" />
        <div className="relative z-10">
          <p className="text-[#d4af6a] text-xs font-sans uppercase tracking-[0.5em] mb-4">Ưu Đãi Đặc Biệt</p>
          <h2 className="text-5xl md:text-6xl font-bold mb-5">Đặt Sớm Tiết Kiệm<br/><span className="text-[#d4af6a]">Đến 30%</span></h2>
          <p className="font-sans text-white/60 mb-8 max-w-md mx-auto">Áp dụng cho đặt phòng trước 30 ngày. Bao gồm bữa sáng và vé spa.</p>
          <button className="bg-[#d4af6a] text-[#0a0a0f] font-sans font-bold px-12 py-4 uppercase tracking-widest hover:bg-[#c09d55] transition-colors">
            Đặt Ngay Hôm Nay
          </button>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-[#05050a] py-10 px-10 text-center font-sans text-white/30 text-sm">
        © 2025 Azure Luxury Resort & Spa · Mẫu bởi <span className="text-[#d4af6a]">Vaitech</span>
      </footer>
    </div>
  )
}
