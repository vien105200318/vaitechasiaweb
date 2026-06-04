'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { DemoBackButton, Reveal, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast, useLocalCart } from '@/hooks/useDemo'

const IMG_CAFE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB5M_Hwf_PXfFjo6A83bSrDEzKWuyQXflUIvHCEHe_dvBTJwOI7njhgTwS8G9GIr6GcLL9ZDmDEAMbypvVWZJHnDhhI90pibKYtUH5uTRfC2JlWxuG2cip8d2ZY96B3FfGZR-dg1bobwuKvJhbetKGPF5_Vq5Tkn3nwudTHfpjrZINXsziAGDDLn30VVFH5EfNg4ryZNUQmCwtpSEtiC8OidjJ_j0l9_Ox__6NQbWhm4wIjss0bOnbc1gW5RTW38xnRA0i9GdH12In'
const IMG_ROAST = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5YWIa9b59e3idcYzsuThgbqBGU0mEPt81SSB6qL0mZPgVBECVCowWv7CgOwyo5AzSeWtClMGPvEvIeCsLSpb8Aq_PT-5fUypLe_77D5vCcxXc3ifO7MT0TZXzFrlV20k8Xxe9CbsBC8Pkp05YvIhZXmUfSmAkD0C0GaesUx7hVTtog4oBnk7q690mOsyfbsx5_9VLn2IAGbbZSEakFIKs37UU2BseufJK-RxVS9-D2acGbLcmGn2Rkh_ayzZ0HrvnRufVBrOxvBeA'

type MenuCat = 'Cà Phê Đặc Sản' | 'Matcha & Trà' | 'Bánh & Dessert'

const MENU: Record<MenuCat, {name:string;price:number;note:string;tag:string|null;cal:string;popular?:boolean}[]> = {
  'Cà Phê Đặc Sản': [
    { name: 'Signature Latte', price: 65000, note: 'Cà phê thủ công + sữa tươi Đà Lạt', tag: 'Bestseller', cal: '180 kcal', popular: true },
    { name: 'Brown Sugar Cold Brew', price: 75000, note: 'Ủ lạnh 18 giờ · đường mía thô', tag: 'Mới', cal: '140 kcal' },
    { name: 'Espresso Tonic', price: 70000, note: 'Espresso đôi + nước tonic chanh', tag: null, cal: '95 kcal' },
    { name: 'Vietnamese Filter', price: 55000, note: 'Cà phê phin truyền thống', tag: null, cal: '120 kcal' },
  ],
  'Matcha & Trà': [
    { name: 'Ceremonial Matcha Latte', price: 85000, note: 'Matcha nhập khẩu Nhật Bản', tag: 'Premium', cal: '210 kcal', popular: true },
    { name: 'Jasmine Cold Brew Tea', price: 65000, note: 'Trà nhài ủ lạnh 12 giờ', tag: null, cal: '20 kcal' },
    { name: 'Hojicha Latte', price: 80000, note: 'Trà rang nướng Kyoto', tag: null, cal: '190 kcal' },
  ],
  'Bánh & Dessert': [
    { name: 'Croissant Bơ Pháp', price: 45000, note: 'Nướng tươi mỗi sáng 7am', tag: null, cal: '320 kcal' },
    { name: 'Tiramisu Matcha', price: 75000, note: 'Mascarpone + Matcha layer', tag: 'Mới', cal: '380 kcal', popular: true },
    { name: 'Canelé Bordeaux', price: 35000, note: 'Nhập khuôn đồng từ Pháp', tag: 'Giới hạn', cal: '180 kcal' },
  ],
}

const REVIEWS = [
  { name: 'Minh Anh', avatar: 'M', stars: 5, text: 'Không gian cực kỳ ấm cúng, cà phê ngon và phục vụ chuyên nghiệp. Địa chỉ yêu thích mỗi sáng!', date: '28/05/2026' },
  { name: 'Thu Hà', avatar: 'T', stars: 5, text: 'Croissant ở đây là ngon nhất Đà Nẵng mình từng ăn. Matcha Latte cũng hoàn hảo, không ngọt gắt.', date: '20/05/2026' },
  { name: 'Hoàng Nam', avatar: 'H', stars: 4, text: 'Thiết kế quán rất nghệ, chụp ảnh đẹp. Cold brew ủ đủ giờ, vị đậm nhưng không đắng.', date: '12/05/2026' },
]

type CartItem = { name: string; price: number; qty: number }

export default function CafeDemo() {
  const { toasts, add } = useToast()
  const [cart, setCart] = useLocalCart<CartItem>('luna-cart')
  const [cartOpen, setCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<MenuCat>('Cà Phê Đặc Sản')
  const [booking, setBooking] = useState({ name: '', phone: '', date: '', time: '', guests: '2', occasion: '' })
  const [bookingDone, setBookingDone] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const addToCart = (item: { name: string; price: number }) => {
    const ex = cart.find(c => c.name === item.name)
    if (ex) setCart(cart.map(c => c.name === item.name ? { ...c, qty: c.qty + 1 } : c))
    else setCart([...cart, { ...item, qty: 1 }])
    add(`Đã thêm ${item.name}`, 'success')
  }

  const updateQty = (name: string, delta: number) => {
    setCart(cart.map(c => c.name === name ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0))
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setBookingLoading(true)
    await new Promise(r => setTimeout(r, 1100))
    setBookingLoading(false)
    setBookingDone(true)
    add('Đặt bàn thành công! Xác nhận qua SMS.', 'success')
  }

  return (
    <div className="min-h-screen bg-[#1a1008] text-[#f5e6d0] overflow-x-hidden" style={{ fontFamily: "'Georgia', serif" }}>
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-80 bg-[#2a1f14] h-full flex flex-col shadow-2xl animate-slide-in-right">
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#f5e6d0]/10">
              <h3 className="text-lg font-bold">Giỏ hàng ({totalItems})</h3>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-4xl block mb-3">🛒</span>
                  <p className="text-[#f5e6d0]/40 font-sans text-sm">Giỏ hàng trống</p>
                </div>
              ) : cart.map(item => (
                <div key={item.name} className="flex items-center justify-between gap-3 py-3 border-b border-[#f5e6d0]/8">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{item.name}</p>
                    <p className="text-[#d4a855] font-sans font-bold text-sm">{(item.price * item.qty).toLocaleString()}đ</p>
                  </div>
                  <div className="flex items-center gap-2 font-sans">
                    <button onClick={() => updateQty(item.name, -1)} className="w-6 h-6 rounded-full bg-[#f5e6d0]/10 hover:bg-[#f5e6d0]/20 flex items-center justify-center text-sm font-bold transition-colors">−</button>
                    <span className="w-5 text-center text-sm font-bold">{item.qty}</span>
                    <button onClick={() => updateQty(item.name, 1)} className="w-6 h-6 rounded-full bg-[#f5e6d0]/10 hover:bg-[#f5e6d0]/20 flex items-center justify-center text-sm font-bold transition-colors">+</button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-[#f5e6d0]/10 space-y-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng</span>
                  <span className="text-[#d4a855]">{totalPrice.toLocaleString()}đ</span>
                </div>
                <button className="w-full bg-[#d4a855] hover:bg-[#c49840] text-[#1a1008] font-bold py-3.5 rounded-lg font-sans uppercase tracking-widest text-sm transition-colors active:scale-95">
                  Xác Nhận Đặt Món
                </button>
                <button onClick={() => setCart([])} className="w-full text-center text-xs text-[#f5e6d0]/35 hover:text-[#f5e6d0]/60 font-sans transition-colors">Xóa tất cả</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating cart button */}
      <button onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#d4a855] hover:bg-[#c49840] text-[#1a1008] rounded-full w-14 h-14 flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 font-sans">
        <span className="material-symbols-outlined">shopping_bag</span>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-black flex items-center justify-center animate-scale-in">
            {totalItems}
          </span>
        )}
      </button>

      {/* ── Nav ── */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? 'bg-[#1a1008]/95 backdrop-blur-xl border-b border-[#f5e6d0]/8' : 'bg-transparent'}`}>
        <div className="max-w-[1200px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-[0.1em] text-[#d4a855]">LUNA CAFÉ</div>
          <div className="hidden md:flex gap-8 text-sm text-[#f5e6d0]/55 font-sans tracking-widest uppercase">
            {['Thực Đơn', 'Không Gian', 'Đặt Bàn', 'Đánh Giá'].map(n => (
              <a key={n} href={`#${n}`} className="hover:text-[#d4a855] transition-colors relative group">
                {n}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#d4a855] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          <a href="#Đặt Bàn" className="font-sans bg-[#d4a855] hover:bg-[#c49840] text-[#1a1008] text-xs font-bold px-5 py-2.5 rounded uppercase tracking-widest transition-colors active:scale-95">
            Đặt Bàn
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-end pb-20">
        <div className="absolute inset-0">
          <Image src={IMG_CAFE} alt="Luna Café" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008] via-[#1a1008]/50 to-[#1a1008]/10" />
        </div>
        <div className="relative z-10 px-8 md:px-16 max-w-[1200px] mx-auto w-full">
          <div className="flex flex-wrap gap-2.5 mb-5">
            {['⭐ 4.9 · 2,847 đánh giá', '📍 47 Phố Cổ, Hoàn Kiếm', '🕐 07:00–22:00'].map(b => (
              <span key={b} className="font-sans bg-[#1a1008]/60 backdrop-blur border border-[#f5e6d0]/15 text-[#f5e6d0]/75 text-xs px-3 py-1.5 rounded-full">{b}</span>
            ))}
          </div>
          <p className="text-[#d4a855] text-sm tracking-[0.3em] uppercase mb-3 font-sans">Specialty Coffee · Kể Từ 2018</p>
          <h1 className="text-6xl md:text-8xl font-bold leading-none mb-6">
            Nơi Mỗi<br />
            <span className="italic text-[#d4a855]">Ngụm Cà Phê</span><br />
            Là Một Ký Ức
          </h1>
          <div className="flex flex-wrap gap-4">
            <a href="#Thực Đơn" className="bg-[#d4a855] hover:bg-[#c49840] text-[#1a1008] font-sans font-bold px-8 py-4 rounded text-sm uppercase tracking-widest transition-all active:scale-95">
              Xem Thực Đơn
            </a>
            <a href="#Đặt Bàn" className="border border-[#f5e6d0]/30 hover:border-[#d4a855] text-[#f5e6d0] hover:text-[#d4a855] font-sans text-sm px-8 py-4 rounded uppercase tracking-widest transition-all">
              Đặt Bàn
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="bg-[#d4a855]/8 border-y border-[#d4a855]/20 py-6">
        <div className="max-w-[1200px] mx-auto px-8 flex flex-wrap justify-center gap-10">
          {[{target:2847,suffix:'',label:'Lượt đánh giá'},{target:5,suffix:'⭐',label:'Rating trung bình'},{target:2018,suffix:'',label:'Năm thành lập'}].map(s => (
            <div key={s.label} className="text-center font-sans">
              <p className="text-2xl font-bold text-[#d4a855]"><CountUp target={s.target} suffix={s.suffix} /></p>
              <p className="text-[#f5e6d0]/45 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Menu ── */}
      <section id="Thực Đơn" className="py-24 px-8 md:px-16 max-w-[1200px] mx-auto">
        <Reveal className="text-center mb-12">
          <span className="text-[#d4a855] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-3">Thực Đơn</span>
          <h2 className="text-5xl font-bold">Tinh Tuyển Từng Nguyên Liệu</h2>
        </Reveal>
        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {(Object.keys(MENU) as MenuCat[]).map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`font-sans px-7 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-[#d4a855] text-[#1a1008]' : 'border border-[#f5e6d0]/20 text-[#f5e6d0]/55 hover:border-[#d4a855] hover:text-[#d4a855]'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MENU[activeCategory].map((item, i) => (
            <Reveal key={item.name} delay={i * 60}
              className="group flex items-center justify-between p-5 rounded-2xl border border-[#f5e6d0]/8 bg-[#f5e6d0]/3 hover:border-[#d4a855]/40 hover:bg-[#f5e6d0]/5 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#d4a855]/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">☕</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-sm">{item.name}</span>
                    {item.popular && <span className="text-[10px] bg-[#d4a855]/20 text-[#d4a855] px-2 py-0.5 rounded-full font-sans font-bold">{item.tag}</span>}
                    {item.tag && !item.popular && <span className="text-[10px] bg-white/8 text-[#f5e6d0]/55 px-2 py-0.5 rounded-full font-sans">{item.tag}</span>}
                  </div>
                  <p className="font-sans text-xs text-[#f5e6d0]/45">{item.note}</p>
                  <p className="font-sans text-[10px] text-[#f5e6d0]/30 mt-0.5">{item.cal}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#d4a855] font-bold font-sans text-base">{item.price.toLocaleString()}đ</span>
                <button onClick={() => addToCart({ name: item.name, price: item.price })}
                  className="w-8 h-8 rounded-full bg-[#d4a855] hover:bg-[#c49840] text-[#1a1008] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-90 font-sans font-black text-lg leading-none">
                  +
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Space ── */}
      <section id="Không Gian" className="py-16 bg-[#0f0a05]">
        <div className="px-8 md:px-16 max-w-[1200px] mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-[#d4a855] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-3">Không Gian</span>
            <h2 className="text-4xl font-bold">Góc Bình Yên Giữa Phố Thị</h2>
          </Reveal>
          <div className="grid grid-cols-3 gap-3 h-[450px]">
            <div className="col-span-2 relative rounded-2xl overflow-hidden">
              <Image src={IMG_CAFE} alt="Interior" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="66vw" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <Image src={IMG_ROAST} alt="Detail 1" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="33vw" />
              </div>
              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <Image src={IMG_CAFE} alt="Detail 2" fill className="object-cover hover:scale-105 transition-transform duration-700 brightness-75" sizes="33vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="Đánh Giá" className="py-24 px-8 md:px-16 max-w-[1200px] mx-auto">
        <Reveal className="text-center mb-12">
          <span className="text-[#d4a855] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-3">Đánh Giá</span>
          <h2 className="text-4xl font-bold mb-3">Khách Hàng Nói Gì</h2>
          <div className="flex items-center justify-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-[#d4a855] text-xl">★</span>)}
            <span className="font-sans font-bold text-[#d4a855] text-xl ml-1">4.9</span>
            <span className="font-sans text-[#f5e6d0]/40 text-sm">/ 2,847 đánh giá</span>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}
              className="bg-[#f5e6d0]/4 border border-[#f5e6d0]/10 rounded-2xl p-6 hover:border-[#d4a855]/30 transition-all">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.stars }).map((_, j) => <span key={j} className="text-[#d4a855] text-sm">★</span>)}
              </div>
              <p className="text-sm leading-relaxed mb-4 text-[#f5e6d0]/75 italic">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#d4a855]/25 flex items-center justify-center text-xs font-bold text-[#d4a855]">{r.avatar}</div>
                  <span className="font-sans font-semibold text-sm">{r.name}</span>
                </div>
                <span className="font-sans text-xs text-[#f5e6d0]/30">{r.date}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Booking ── */}
      <section id="Đặt Bàn" className="py-24 bg-[#0f0a05]">
        <div className="px-8 md:px-16 max-w-[860px] mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-[#d4a855] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-3">Đặt Bàn</span>
            <h2 className="text-4xl font-bold">Giữ Chỗ Ngay Hôm Nay</h2>
            <p className="font-sans text-[#f5e6d0]/45 mt-2 text-sm">Thứ 2–CN · 07:00–22:00 · Tối thiểu 1 người</p>
          </Reveal>
          {bookingDone ? (
            <Reveal>
              <div className="bg-[#d4a855]/8 border border-[#d4a855]/30 rounded-2xl p-10 text-center animate-scale-in">
                <p className="text-5xl mb-4">☕</p>
                <h3 className="text-2xl font-bold mb-2">Đặt bàn thành công!</h3>
                <p className="font-sans text-[#f5e6d0]/55 text-sm">SMS xác nhận sẽ được gửi trong vài phút.</p>
                <button onClick={() => setBookingDone(false)} className="mt-5 font-sans text-xs text-[#d4a855] hover:underline">Đặt thêm bàn</button>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <form onSubmit={handleBooking} className="bg-[#f5e6d0]/3 border border-[#f5e6d0]/8 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { k: 'name', l: 'Họ tên', p: 'Nguyễn Văn A', t: 'text' },
                  { k: 'phone', l: 'Điện thoại', p: '0912 345 678', t: 'tel' },
                  { k: 'date', l: 'Ngày', p: '', t: 'date' },
                  { k: 'time', l: 'Giờ', p: '', t: 'time' },
                ].map(f => (
                  <div key={f.k}>
                    <label className="block text-xs text-[#f5e6d0]/40 font-sans uppercase tracking-wider mb-1.5">{f.l}</label>
                    <input type={f.t} placeholder={f.p} required value={booking[f.k as keyof typeof booking]}
                      onChange={e => setBooking({ ...booking, [f.k]: e.target.value })}
                      className="w-full bg-[#f5e6d0]/6 border border-[#f5e6d0]/12 rounded-xl px-4 py-3 font-sans text-sm text-[#f5e6d0] placeholder:text-[#f5e6d0]/25 focus:border-[#d4a855] outline-none transition-all" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-[#f5e6d0]/40 font-sans uppercase tracking-wider mb-1.5">Số khách</label>
                  <select value={booking.guests} onChange={e => setBooking({ ...booking, guests: e.target.value })}
                    className="w-full bg-[#f5e6d0]/6 border border-[#f5e6d0]/12 rounded-xl px-4 py-3 font-sans text-sm text-[#f5e6d0] focus:border-[#d4a855] outline-none">
                    {['1', '2', '3', '4', '5', '6+'].map(n => <option key={n}>{n} khách</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#f5e6d0]/40 font-sans uppercase tracking-wider mb-1.5">Dịp đặc biệt</label>
                  <select value={booking.occasion} onChange={e => setBooking({ ...booking, occasion: e.target.value })}
                    className="w-full bg-[#f5e6d0]/6 border border-[#f5e6d0]/12 rounded-xl px-4 py-3 font-sans text-sm text-[#f5e6d0] focus:border-[#d4a855] outline-none">
                    <option value="">Không có</option>
                    {['Sinh nhật', 'Kỷ niệm', 'Hẹn hò', 'Họp nhóm', 'Khác'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" disabled={bookingLoading}
                    className="w-full bg-[#d4a855] hover:bg-[#c49840] disabled:opacity-60 text-[#1a1008] font-sans font-bold py-4 rounded-xl uppercase tracking-widest text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    {bookingLoading ? (<><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Đang xử lý...</>) : 'Xác Nhận Đặt Bàn'}
                  </button>
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </section>

      <footer className="border-t border-[#f5e6d0]/8 py-10 px-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold tracking-[0.1em] text-[#d4a855]">LUNA CAFÉ</div>
          <p className="font-sans text-[#f5e6d0]/30 text-sm">© 2026 · Mẫu giao diện bởi <span className="text-[#d4a855]">Vaitech</span></p>
          <div className="font-sans flex gap-5 text-[#f5e6d0]/35 text-sm">
            <span>📍 47 Phố Cổ, Hoàn Kiếm</span>
            <span>📞 024 3938 5678</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
