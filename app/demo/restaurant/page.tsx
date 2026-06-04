'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { DemoBackButton, Reveal, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const IMG_HERO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl'

type MenuCat = 'Khai Vị' | 'Món Chính' | 'Tráng Miệng'
const MENU: Record<MenuCat, {name:string;price:number;desc:string;spicy:boolean;new?:boolean}[]> = {
  'Khai Vị': [
    { name: 'Gỏi Tôm Càng Sông', price: 185000, desc: 'Tôm sú, xoài xanh, rau thơm, nước mắm gừng', spicy: true },
    { name: 'Súp Bí Đỏ Truffle', price: 145000, desc: 'Bí đỏ hữu cơ, kem tươi, dầu truffle trắng', spicy: false },
    { name: 'Charcuterie Board', price: 320000, desc: 'Thịt nguội nhập khẩu, phô mai, mứt quả', spicy: false },
  ],
  'Món Chính': [
    { name: 'Bò Wagyu A5 Nướng', price: 890000, desc: 'Wagyu Nhật Bản, khoai tây nghiền, sốt nấm truffle', spicy: false, new: true },
    { name: 'Cá Hồi Na Uy Áp Chảo', price: 485000, desc: 'Cá hồi, rau củ nướng, sốt chanh bơ', spicy: false },
    { name: 'Pasta Cua Biển', price: 365000, desc: 'Cua biển tươi, pasta tươi, cà chua cherry, basil', spicy: true },
  ],
  'Tráng Miệng': [
    { name: 'Soufflé Chocolate', price: 185000, desc: 'Chocolate 70%, vanilla gelato — chờ 15 phút', spicy: false },
    { name: 'Crème Brûlée', price: 145000, desc: 'Vanilla Madagascar, đường cháy tươi mỗi phần', spicy: false },
  ],
}

const REVIEWS = [
  { stars: 5, text: '"Bữa tối đáng nhớ nhất trong cuộc đời tôi."', src: 'Michelin Guide Vietnam 2024' },
  { stars: 5, text: '"Chef Long là thiên tài — mỗi món như một câu chuyện."', src: 'Forbes Vietnam' },
  { stars: 5, text: '"Fine dining đỉnh cao, không gian tuyệt hảo."', src: 'Condé Nast Vietnam' },
]

type CartItem = {name:string;price:number}

export default function RestaurantDemo() {
  const { toasts, add } = useToast()
  const [cart, setCart] = useState<CartItem[]>([])
  const [cat, setCat] = useState<MenuCat>('Khai Vị')
  const [scrolled, setScrolled] = useState(false)
  const [resv, setResv] = useState({ name: '', phone: '', date: '', time: '', guests: '2', occasion: '' })
  const [resvDone, setResvDone] = useState(false)
  const [resvLoading, setResvLoading] = useState(false)
  const [activeReview, setActiveReview] = useState(0)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => setActiveReview(r => (r + 1) % REVIEWS.length), 4000)
    return () => clearInterval(iv)
  }, [])

  const total = cart.reduce((s, i) => s + i.price, 0)

  const addItem = (item: CartItem) => {
    setCart(c => [...c, item])
    add(`Đã gọi ${item.name}`, 'success')
  }

  const handleResv = async (e: React.FormEvent) => {
    e.preventDefault()
    setResvLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setResvLoading(false)
    setResvDone(true)
    add('Đặt bàn thành công!', 'success')
  }

  return (
    <div className="min-h-screen bg-[#1c1208] text-[#f0e6d3] overflow-x-hidden" style={{ fontFamily: "'Playfair Display','Georgia',serif" }}>
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* Cart bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1c1208]/95 backdrop-blur-xl border-t border-[#c8963c]/30 px-6 py-4 flex items-center justify-between font-sans animate-slide-in-up">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-[#c8963c] text-[#1c1208] rounded-full text-xs font-black flex items-center justify-center">{cart.length}</span>
            <span className="text-sm text-[#f0e6d3]/70">{cart.length} món đã chọn</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-[#c8963c]">{total.toLocaleString()}đ</span>
            <button className="bg-[#c8963c] hover:bg-[#b8852c] text-[#1c1208] text-xs font-bold px-5 py-2.5 rounded-lg uppercase tracking-wider transition-colors active:scale-95">
              Xác Nhận Gọi Món
            </button>
            <button onClick={() => setCart([])} className="text-[#f0e6d3]/30 hover:text-[#f0e6d3]/60 text-xs transition-colors">Xóa</button>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? 'bg-[#1c1208]/95 backdrop-blur-xl border-b border-[#f0e6d3]/8' : 'bg-transparent'}`}>
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-[#c8963c]">Maison<span className="italic"> Saigon</span></div>
          <div className="hidden md:flex gap-8 text-sm font-sans text-[#f0e6d3]/50 uppercase tracking-widest">
            {['Thực Đơn', 'Chef', 'Không Gian', 'Đặt Bàn'].map(n => (
              <a key={n} href={`#${n}`} className="hover:text-[#c8963c] transition-colors relative group">
                {n}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c8963c] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          <a href="#Đặt Bàn" className="font-sans bg-[#c8963c] hover:bg-[#b8852c] text-[#1c1208] text-xs font-bold px-5 py-2.5 rounded uppercase tracking-widest transition-colors active:scale-95">
            Đặt Bàn
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <Image src={IMG_HERO} alt="Restaurant" fill className="object-cover brightness-35" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1208]/90 via-[#1c1208]/50 to-transparent" />
        </div>
        <div className="relative z-10 px-8 md:px-16 max-w-[1280px] mx-auto">
          <p className="text-[#c8963c] text-xs font-sans uppercase tracking-[0.5em] mb-5">Fine Dining · Sài Gòn · Kể Từ 2004</p>
          <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-6">
            Hương Vị<br /><span className="italic text-[#c8963c]">Tinh Tế</span><br />Từ Tâm Hồn
          </h1>
          <p className="font-sans text-[#f0e6d3]/60 max-w-md mb-8 leading-relaxed text-lg">
            Sự hòa quyện của ẩm thực Việt Nam truyền thống và kỹ thuật Pháp tinh tế.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#Thực Đơn" className="bg-[#c8963c] hover:bg-[#b8852c] text-[#1c1208] font-sans font-bold px-8 py-4 rounded uppercase tracking-widest text-sm transition-all active:scale-95">
              Xem Thực Đơn
            </a>
            <a href="#Đặt Bàn" className="border border-[#f0e6d3]/25 hover:border-[#c8963c] text-[#f0e6d3] hover:text-[#c8963c] font-sans text-sm px-8 py-4 rounded uppercase tracking-widest transition-all">
              Đặt Bàn
            </a>
          </div>
        </div>

        {/* Rotating quote */}
        <div className="absolute bottom-10 right-10 hidden xl:block bg-[#1c1208]/80 backdrop-blur border border-[#f0e6d3]/12 rounded-2xl p-5 max-w-xs">
          <div key={activeReview} className="animate-fade-in">
            <div className="flex gap-0.5 mb-2">{Array.from({length:REVIEWS[activeReview].stars}).map((_,i)=><span key={i} className="text-[#c8963c] text-sm">★</span>)}</div>
            <p className="italic text-sm leading-relaxed mb-2 text-[#f0e6d3]/75">{REVIEWS[activeReview].text}</p>
            <p className="font-sans text-xs text-[#f0e6d3]/40">— {REVIEWS[activeReview].src}</p>
          </div>
          <div className="flex gap-1.5 mt-3">
            {REVIEWS.map((_,i) => (
              <button key={i} onClick={() => setActiveReview(i)}
                className={`h-1 rounded-full transition-all ${i === activeReview ? 'w-6 bg-[#c8963c]' : 'w-1.5 bg-white/20'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Chef */}
      <section id="Chef" className="py-24 px-8 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="text-[#c8963c] text-xs font-sans uppercase tracking-[0.4em] block mb-5">Câu Chuyện</span>
            <h2 className="text-4xl font-bold mb-6">Chef Nguyễn Hoàng Long — 20 Năm Đam Mê</h2>
            <p className="font-sans text-[#f0e6d3]/60 leading-relaxed mb-4">
              Học việc tại Paris, thực tập tại Bocuse — Chef Long trở về Việt Nam với sứ mệnh tôn vinh nguyên liệu bản địa bằng kỹ thuật quốc tế.
            </p>
            <p className="font-sans text-[#f0e6d3]/60 leading-relaxed mb-8">
              Mỗi món ăn là một câu chuyện — về nguồn gốc, mùa vụ và tình yêu với ẩm thực Việt.
            </p>
            <div className="flex flex-wrap gap-6">
              {[{v:'20+',l:'Năm kinh nghiệm'},{v:'3',l:'Sao Michelin'},{v:'15',l:'Giải thưởng'}].map(s=>(
                <div key={s.l} className="text-center">
                  <p className="text-2xl font-black text-[#c8963c]">{s.v}</p>
                  <p className="font-sans text-xs text-[#f0e6d3]/40 mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100} className="relative h-[500px] rounded-3xl overflow-hidden">
            <Image src={IMG_HERO} alt="Chef" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1208]/60 to-transparent" />
          </Reveal>
        </div>
      </section>

      {/* Menu */}
      <section id="Thực Đơn" className="py-24 bg-[#120d05]">
        <div className="px-8 md:px-16 max-w-[1280px] mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-[#c8963c] text-xs font-sans uppercase tracking-[0.4em] block mb-3">Thực Đơn</span>
            <h2 className="text-4xl font-bold">Tuyển Chọn Của Bếp Trưởng</h2>
          </Reveal>
          {/* Category tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {(Object.keys(MENU) as MenuCat[]).map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`font-sans px-8 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${cat === c ? 'bg-[#c8963c] text-[#1c1208]' : 'border border-[#f0e6d3]/18 text-[#f0e6d3]/50 hover:border-[#c8963c] hover:text-[#c8963c]'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MENU[cat].map((item, i) => (
              <Reveal key={item.name} delay={i * 70}
                className="bg-[#1c1208] border border-[#f0e6d3]/8 rounded-2xl overflow-hidden hover:border-[#c8963c]/30 transition-all group cursor-pointer">
                <div className="relative h-40 overflow-hidden bg-[#2a1f0d]">
                  <Image src={IMG_HERO} alt={item.name} fill className="object-cover brightness-60 group-hover:brightness-75 group-hover:scale-105 transition-all duration-500" sizes="(max-width:768px) 100vw, 33vw" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {item.spicy && <span className="text-[10px] bg-red-600/80 text-white font-sans px-2 py-0.5 rounded-full">🌶 Cay</span>}
                    {item.new && <span className="text-[10px] bg-[#c8963c]/80 text-[#1c1208] font-sans font-bold px-2 py-0.5 rounded-full">Mới</span>}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="font-sans text-[#f0e6d3]/45 text-xs mb-4 leading-relaxed">{item.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#c8963c] font-sans font-black text-lg">{item.price.toLocaleString()}đ</span>
                    <button onClick={() => addItem({ name: item.name, price: item.price })}
                      className="font-sans bg-[#c8963c]/15 hover:bg-[#c8963c] text-[#c8963c] hover:text-[#1c1208] text-xs font-bold px-4 py-2 rounded-lg border border-[#c8963c]/30 transition-all active:scale-95">
                      Gọi Món
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation */}
      <section id="Đặt Bàn" className="py-24 px-8 md:px-16 max-w-[860px] mx-auto">
        <Reveal className="text-center mb-12">
          <span className="text-[#c8963c] text-xs font-sans uppercase tracking-[0.4em] block mb-3">Đặt Bàn</span>
          <h2 className="text-4xl font-bold">Giữ Chỗ Bàn Của Bạn</h2>
          <p className="font-sans text-[#f0e6d3]/45 mt-2 text-sm">Thứ 3–CN · 11:30–14:30 & 18:00–22:30</p>
        </Reveal>
        {resvDone ? (
          <Reveal>
            <div className="bg-[#c8963c]/8 border border-[#c8963c]/25 rounded-2xl p-10 text-center animate-scale-in">
              <p className="text-4xl mb-4">🍽️</p>
              <h3 className="text-2xl font-bold mb-2">Đặt bàn thành công!</h3>
              <p className="font-sans text-[#f0e6d3]/50 text-sm">Xác nhận qua SMS trong vài phút.</p>
              <button onClick={() => setResvDone(false)} className="mt-4 font-sans text-xs text-[#c8963c] hover:underline">Đặt thêm bàn</button>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={handleResv} className="bg-[#120d05] border border-[#f0e6d3]/8 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { k: 'name', l: 'Họ tên', p: 'Nguyễn Văn A', t: 'text' },
                { k: 'phone', l: 'Điện thoại', p: '0912 345 678', t: 'tel' },
                { k: 'date', l: 'Ngày', p: '', t: 'date' },
                { k: 'time', l: 'Giờ', p: '', t: 'time' },
              ].map(f => (
                <div key={f.k}>
                  <label className="block text-xs font-sans uppercase tracking-wider text-[#f0e6d3]/35 mb-1.5">{f.l}</label>
                  <input type={f.t} placeholder={f.p} required value={resv[f.k as keyof typeof resv]}
                    onChange={e => setResv({ ...resv, [f.k]: e.target.value })}
                    className="w-full bg-[#f0e6d3]/5 border border-[#f0e6d3]/10 rounded-xl px-4 py-3 font-sans text-sm text-[#f0e6d3] placeholder:text-[#f0e6d3]/20 focus:border-[#c8963c] outline-none transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-[#f0e6d3]/35 mb-1.5">Số khách</label>
                <select value={resv.guests} onChange={e => setResv({ ...resv, guests: e.target.value })}
                  className="w-full bg-[#f0e6d3]/5 border border-[#f0e6d3]/10 rounded-xl px-4 py-3 font-sans text-sm text-[#f0e6d3] focus:border-[#c8963c] outline-none">
                  {['1','2','3','4','5','6','7–10','10+'].map(g=><option key={g}>{g} khách</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-[#f0e6d3]/35 mb-1.5">Dịp đặc biệt</label>
                <select value={resv.occasion} onChange={e => setResv({ ...resv, occasion: e.target.value })}
                  className="w-full bg-[#f0e6d3]/5 border border-[#f0e6d3]/10 rounded-xl px-4 py-3 font-sans text-sm text-[#f0e6d3] focus:border-[#c8963c] outline-none">
                  <option value="">Không có</option>
                  {['Sinh nhật','Kỷ niệm','Cầu hôn','Business dinner','Khác'].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <button type="submit" disabled={resvLoading}
                  className="w-full bg-[#c8963c] hover:bg-[#b8852c] disabled:opacity-60 text-[#1c1208] font-sans font-bold py-4 rounded-xl uppercase tracking-widest text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                  {resvLoading ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> : null}
                  Xác Nhận Đặt Bàn
                </button>
              </div>
            </form>
          </Reveal>
        )}
      </section>

      <footer className="border-t border-[#f0e6d3]/8 py-10 px-8 text-center font-sans text-[#f0e6d3]/25 text-sm" style={{paddingBottom: cart.length > 0 ? '80px' : undefined}}>
        © 2026 Maison Saigon · Mẫu bởi <span className="text-[#c8963c]">Vaitech</span>
      </footer>
    </div>
  )
}
