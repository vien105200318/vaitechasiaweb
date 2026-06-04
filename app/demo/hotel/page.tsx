'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { DemoBackButton, Reveal, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const HERO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl'

const ROOMS = [
  { id: 1, name: 'Deluxe Ocean View', size: '45m²', guests: 2, price: 2800000, tag: 'Bestseller', features: ['King Bed', 'Ocean View', 'Bathtub', 'Free Minibar'], available: true },
  { id: 2, name: 'Premier Suite', size: '75m²', guests: 3, price: 5500000, tag: 'Popular', features: ['King Bed', 'Private Terrace', 'Living Room', 'Butler'], available: true },
  { id: 3, name: 'Presidential Villa', size: '180m²', guests: 6, price: 15000000, tag: 'Luxury', features: ['3 Bedrooms', 'Private Pool', 'Full Kitchen', 'Concierge 24/7'], available: false },
]

const AMENITIES = [
  { icon: 'pool', label: 'Hồ bơi vô cực', desc: '50m · Tầng thượng' },
  { icon: 'spa', label: 'Spa & Wellness', desc: '2000m² · 12 phòng' },
  { icon: 'restaurant', label: '5 Nhà hàng', desc: 'Fine dining · Buffet' },
  { icon: 'fitness_center', label: 'Gym hiện đại', desc: 'Mở 24/7' },
  { icon: 'beach_access', label: 'Bãi biển riêng', desc: '200m chiều dài' },
  { icon: 'local_bar', label: 'Sky Bar', desc: 'Tầng 32 · View 360°' },
]

export default function HotelDemo() {
  const { toasts, add } = useToast()
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guests, setGuests] = useState('2')
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)
  const [booked, setBooked] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [activeAmenity, setActiveAmenity] = useState(0)
  const [bookingLoading, setBookingLoading] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const handleBook = async (roomId: number) => {
    setBookingLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setBookingLoading(false)
    setBooked(roomId)
    add('Đặt phòng thành công! Xác nhận qua email.', 'success')
  }

  const nights = checkin && checkout
    ? Math.max(0, Math.round((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000))
    : 1

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden" style={{ fontFamily: "'Cormorant Garamond','Georgia',serif" }}>
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* Nav */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/8' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="text-xs font-sans uppercase tracking-[0.4em] text-white/35">Đà Nẵng · Việt Nam</div>
          <div className="text-center">
            <p className="text-2xl font-bold tracking-[0.12em] text-[#d4af6a]">AZURE</p>
            <p className="text-[9px] font-sans uppercase tracking-[0.4em] text-white/35">Luxury Resort & Spa</p>
          </div>
          <button className="font-sans bg-[#d4af6a] hover:bg-[#c09d55] text-[#0a0a0f] text-xs font-bold px-5 py-2.5 uppercase tracking-widest transition-colors active:scale-95">
            Đặt Phòng
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-end">
        <div className="absolute inset-0">
          <Image src={HERO} alt="Azure Resort" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/25 to-transparent" />
        </div>

        {/* Booking bar */}
        <div className="relative z-10 w-full px-8 max-w-[1400px] mx-auto pb-14">
          <p className="text-[#d4af6a] text-xs font-sans uppercase tracking-[0.5em] mb-4">Nơi Thiên Nhiên Gặp Gỡ Xa Hoa</p>
          <h1 className="text-7xl md:text-[100px] font-bold leading-[0.88] mb-10">
            Escape<br /><span className="italic text-[#d4af6a]">the Ordinary</span>
          </h1>
          {/* Quick booking */}
          <div className="bg-black/55 backdrop-blur-xl border border-white/12 rounded-2xl p-5 inline-flex flex-wrap gap-4 items-end shadow-2xl">
            {[
              { label: 'Nhận phòng', type: 'date', val: checkin, set: setCheckin },
              { label: 'Trả phòng', type: 'date', val: checkout, set: setCheckout },
            ].map(f => (
              <div key={f.label}>
                <p className="text-[10px] font-sans uppercase tracking-widest text-white/35 mb-1.5">{f.label}</p>
                <input type="date" value={f.val} onChange={e => f.set(e.target.value)} min={new Date().toISOString().split('T')[0]}
                  className="bg-white/6 border border-white/12 rounded-lg px-4 py-2.5 font-sans text-sm text-white focus:border-[#d4af6a] outline-none transition-all" />
              </div>
            ))}
            <div>
              <p className="text-[10px] font-sans uppercase tracking-widest text-white/35 mb-1.5">Khách</p>
              <select value={guests} onChange={e => setGuests(e.target.value)}
                className="bg-white/6 border border-white/12 rounded-lg px-4 py-2.5 font-sans text-sm text-white focus:border-[#d4af6a] outline-none">
                {['1', '2', '3', '4', '5+'].map(g => <option key={g}>{g} khách</option>)}
              </select>
            </div>
            <button onClick={() => setSelectedRoom(0)}
              className="bg-[#d4af6a] hover:bg-[#c09d55] text-[#0a0a0f] font-sans font-bold px-8 py-2.5 rounded-lg uppercase tracking-widest text-sm transition-colors active:scale-95">
              Kiểm Tra Phòng
            </button>
          </div>
        </div>

        {/* Floating cards */}
        <div className="absolute top-1/4 right-12 hidden xl:block space-y-3">
          <div className="bg-white/8 backdrop-blur-xl border border-white/12 rounded-2xl p-4 w-52 animate-float shadow-2xl">
            <p className="text-white/40 text-xs font-sans mb-1">Đánh giá trung bình</p>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-[#d4af6a]">9.8</span>
              <div>
                <div className="flex gap-0.5">{Array.from({length:5}).map((_,i)=><span key={i} className="text-[#d4af6a] text-xs">★</span>)}</div>
                <p className="text-white/35 text-[10px] font-sans">2,847 reviews</p>
              </div>
            </div>
          </div>
          <div className="bg-white/8 backdrop-blur-xl border border-white/12 rounded-2xl p-4 w-52 animate-float shadow-2xl" style={{animationDelay:'2s'}}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-white/40 text-xs font-sans">Đặt sớm tiết kiệm</p>
            </div>
            <p className="text-[#d4af6a] font-black text-xl">30% OFF</p>
            <p className="text-white/30 text-[10px] font-sans mt-0.5">Đặt trước 30 ngày</p>
          </div>
        </div>
      </section>

      {/* Awards */}
      <div className="bg-[#d4af6a]/8 border-y border-[#d4af6a]/15 py-5">
        <div className="max-w-[1400px] mx-auto px-8 flex flex-wrap justify-center gap-10">
          {["Forbes 5 Stars 2026", "Condé Nast Top 50", "TripAdvisor Choice 2026"].map(a => (
            <div key={a} className="flex items-center gap-2 text-sm font-sans text-white/50">
              <span className="material-symbols-outlined text-[#d4af6a] text-base" style={{fontVariationSettings:"'FILL' 1"}}>star</span>
              {a}
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <section className="py-24 px-8 max-w-[1400px] mx-auto">
        <Reveal className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div>
            <span className="text-[#d4af6a] text-xs font-sans uppercase tracking-[0.4em] block mb-3">Tiện Nghi</span>
            <h2 className="text-5xl font-bold">Trải Nghiệm Vượt<br />Mong Đợi</h2>
          </div>
          <p className="text-white/40 font-sans max-w-xs text-sm leading-relaxed">Mỗi chi tiết tại Azure đều được thiết kế để mang lại trải nghiệm sang trọng và thư giãn hoàn toàn.</p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {AMENITIES.map((a, i) => (
            <Reveal key={a.label} delay={i * 60}
              className={`rounded-2xl p-6 text-center transition-all cursor-pointer group border ${activeAmenity === i ? 'border-[#d4af6a]/50 bg-[#d4af6a]/8' : 'border-white/8 bg-white/3 hover:border-[#d4af6a]/25'}`}
              onClick={() => setActiveAmenity(i)}>
              <span className="material-symbols-outlined text-[#d4af6a] text-3xl mb-3 block group-hover:scale-110 transition-transform">{a.icon}</span>
              <p className="font-sans text-sm font-semibold mb-0.5">{a.label}</p>
              <p className="font-sans text-xs text-white/35">{a.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Rooms */}
      <section className="py-16 bg-[#0f0f1a]">
        <div className="px-8 max-w-[1400px] mx-auto">
          <Reveal className="mb-12">
            <span className="text-[#d4af6a] text-xs font-sans uppercase tracking-[0.4em] block mb-3">Phòng & Suite</span>
            <h2 className="text-4xl font-bold">Chọn Không Gian Của Bạn</h2>
            {checkin && checkout && nights > 0 && (
              <p className="text-[#d4af6a]/70 font-sans text-sm mt-2">{nights} đêm · {new Date(checkin).toLocaleDateString('vi-VN')} — {new Date(checkout).toLocaleDateString('vi-VN')}</p>
            )}
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROOMS.map((room, i) => (
              <Reveal key={room.id} delay={i * 100}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${!room.available ? 'opacity-60' : 'hover:-translate-y-1 cursor-pointer'} ${selectedRoom === room.id ? 'border-[#d4af6a]/60 shadow-[0_0_30px_rgba(212,175,106,0.15)]' : 'border-white/8'}`}
                onClick={() => room.available && setSelectedRoom(room.id)}>
                <div className="relative h-52 overflow-hidden bg-white/5">
                  <Image src={HERO} alt={room.name} fill className="object-cover brightness-70 hover:brightness-80 transition-all duration-500" sizes="(max-width:768px) 100vw, 33vw" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-[10px] bg-[#d4af6a] text-[#0a0a0f] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider">{room.tag}</span>
                    {!room.available && <span className="text-[10px] bg-red-600/80 text-white font-sans font-bold px-3 py-1 rounded-full">Hết phòng</span>}
                  </div>
                  {selectedRoom === room.id && (
                    <div className="absolute inset-0 border-2 border-[#d4af6a]/60 rounded-none pointer-events-none" />
                  )}
                </div>
                <div className="p-6 bg-[#12121f]">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold">{room.name}</h3>
                    <div className="text-right">
                      <p className="text-[#d4af6a] font-sans font-black text-xl">{room.price.toLocaleString()}đ</p>
                      <p className="text-white/30 font-sans text-[10px]">/đêm</p>
                      {nights > 1 && <p className="text-[#d4af6a]/60 font-sans text-xs">{(room.price * nights).toLocaleString()}đ · {nights}đ</p>}
                    </div>
                  </div>
                  <div className="flex gap-4 font-sans text-xs text-white/40 mb-4">
                    <span>📐 {room.size}</span>
                    <span>👤 {room.guests} khách</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {room.features.map(f => <span key={f} className="text-[10px] bg-white/5 border border-white/8 text-white/50 px-2 py-1 rounded font-sans">{f}</span>)}
                  </div>
                  {room.available ? (
                    booked === room.id ? (
                      <div className="bg-green-900/30 border border-green-500/30 rounded-xl py-3 text-center animate-scale-in">
                        <p className="text-green-400 font-sans text-sm font-bold">✓ Đã đặt phòng thành công!</p>
                      </div>
                    ) : (
                      <button onClick={() => handleBook(room.id)} disabled={bookingLoading}
                        className="w-full bg-[#d4af6a] hover:bg-[#c09d55] disabled:opacity-60 text-[#0a0a0f] font-sans font-bold py-3 rounded-xl uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center gap-2">
                        {bookingLoading && selectedRoom === room.id ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> : null}
                        Đặt Phòng Này
                      </button>
                    )
                  ) : (
                    <div className="w-full border border-white/10 text-white/25 font-sans text-xs py-3 rounded-xl text-center uppercase tracking-widest">Hết Phòng</div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="py-16 px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{t:200,s:'',l:'Phòng & Villa'},{t:5,s:'⭐',l:'Sao quốc tế'},{t:15,s:'+',l:'Năm hoạt động'},{t:98,s:'%',l:'Hài lòng khách'}].map(s => (
            <Reveal key={s.l} className="text-center bg-white/3 border border-white/8 rounded-2xl py-8">
              <p className="text-4xl font-black text-[#d4af6a] mb-1"><CountUp target={s.t} suffix={s.s} /></p>
              <p className="text-white/40 font-sans text-sm">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="py-24 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0"><Image src={HERO} alt="" fill className="object-cover opacity-15" sizes="100vw" /></div>
        <div className="absolute inset-0 bg-[#0a0a0f]/85" />
        <div className="relative z-10">
          <Reveal>
            <p className="text-[#d4af6a] text-xs font-sans uppercase tracking-[0.5em] mb-4">Ưu Đãi Đặc Biệt</p>
            <h2 className="text-5xl md:text-6xl font-bold mb-5">Đặt Sớm Tiết Kiệm<br /><span className="text-[#d4af6a]">Đến 30%</span></h2>
            <p className="font-sans text-white/50 mb-8 max-w-md mx-auto">Áp dụng cho đặt phòng trước 30 ngày. Bao gồm bữa sáng và vé spa miễn phí.</p>
            <button className="bg-[#d4af6a] hover:bg-[#c09d55] text-[#0a0a0f] font-sans font-bold px-12 py-4 uppercase tracking-widest hover:scale-105 transition-all active:scale-95">
              Đặt Ngay Hôm Nay
            </button>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-[#05050a] py-10 px-8 text-center font-sans text-white/25 text-sm">
        © 2026 Azure Luxury Resort & Spa · Mẫu bởi <span className="text-[#d4af6a]">Vaitech</span>
      </footer>
    </div>
  )
}
