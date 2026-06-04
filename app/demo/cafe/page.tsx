'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const menuData = {
  'Cà Phê Đặc Sản': [
    { name: 'Signature Latte', price: 65000, note: 'Cà phê thủ công + sữa tươi Đà Lạt', tag: 'Bestseller', cal: '180 kcal' },
    { name: 'Brown Sugar Cold Brew', price: 75000, note: 'Ủ lạnh 18 giờ · đường mía thô', tag: 'Mới', cal: '140 kcal' },
    { name: 'Espresso Tonic', price: 70000, note: 'Espresso đôi + nước tonic chanh', tag: null, cal: '95 kcal' },
    { name: 'Vietnamese Filter', price: 55000, note: 'Cà phê phin truyền thống', tag: null, cal: '120 kcal' },
  ],
  'Matcha & Trà': [
    { name: 'Ceremonial Matcha Latte', price: 85000, note: 'Matcha nhập khẩu Nhật Bản', tag: 'Premium', cal: '210 kcal' },
    { name: 'Jasmine Cold Brew Tea', price: 65000, note: 'Trà nhài ủ lạnh 12 giờ', tag: null, cal: '20 kcal' },
    { name: 'Hojicha Latte', price: 80000, note: 'Trà rang nướng Kyoto', tag: null, cal: '190 kcal' },
  ],
  'Bánh & Dessert': [
    { name: 'Croissant Bơ Pháp', price: 45000, note: 'Nướng tươi mỗi buổi sáng 7am', tag: null, cal: '320 kcal' },
    { name: 'Tiramisu Matcha', price: 75000, note: 'Mascarpone + Matcha layer', tag: 'Mới', cal: '380 kcal' },
    { name: 'Canelé Bordeaux', price: 35000, note: 'Nhập khuôn đồng từ Pháp', tag: 'Giới hạn', cal: '180 kcal' },
  ],
}

const gallery = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCB5M_Hwf_PXfFjo6A83bSrDEzKWuyQXflUIvHCEHe_dvBTJwOI7njhgTwS8G9GIr6GcLL9ZDmDEAMbypvVWZJHnDhhI90pibKYtUH5uTRfC2JlWxuG2cip8d2ZY96B3FfGZR-dg1bobwuKvJhbetKGPF5_Vq5Tkn3nwudTHfpjrZINXsziAGDDLn30VVFH5EfNg4ryZNUQmCwtpSEtiC8OidjJ_j0l9_Ox__6NQbWhm4wIjss0bOnbc1gW5RTW38xnRA0i9GdH12In',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC5YWIa9b59e3idcYzsuThgbqBGU0mEPt81SSB6qL0mZPgVBECVCowWv7CgOwyo5AzSeWtClMGPvEvIeCsLSpb8Aq_PT-5fUypLe_77D5vCcxXc3ifO7MT0TZXzFrlV20k8Xxe9CbsBC8Pkp05YvIhZXmUfSmAkD0C0GaesUx7hVTtog4oBnk7q690mOsyfbsx5_9VLn2IAGbbZSEakFIKs37UU2BseufJK-RxVS9-D2acGbLcmGn2Rkh_ayzZ0HrvnRufVBrOxvBeA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDO04BddMbSNQ6NeNP_QB43WinFa9-X2-jIGHegvTybTvFK5PIFe9SG43Vr_oas5GO4SeWyzKSC3G3gAQ2FhTXWCnmwDhBVYMgiPPZXTueFkeE-DBICLX3c7DY-gRLYzuDc_yjhY1uIevWCOLLtQXVMlro_Xm5uxrCfDmFxm4ZDh-DY2-bVVxhCEae82O3o5W2u-YFElzBsVEBgSrfVMJlfkximi6ApsbkHGg3vwDr_CyCFJOaUcTbfPUSTw9EsixJitb0QxhMaayVg',
]

const reviews = [
  { name: 'Minh Anh', stars: 5, text: 'Không gian cực kỳ ấm cúng, cà phê ngon và phục vụ chuyên nghiệp. Địa chỉ yêu thích mỗi sáng của mình!' },
  { name: 'Thu Hà', stars: 5, text: 'Croissant ở đây là ngon nhất Hà Nội mình từng ăn. Matcha Latte cũng hoàn hảo, không ngọt gắt.' },
  { name: 'Hoàng Nam', stars: 4, text: 'Thiết kế quán rất nghệ, chụp ảnh đẹp. Cold brew ủ đủ giờ, vị đậm nhưng không đắng.' },
]

export default function CafeDemo() {
  const [activeCategory, setActiveCategory] = useState('Cà Phê Đặc Sản')
  const [booking, setBooking] = useState({ name: '', phone: '', date: '', time: '', guests: '2', note: '' })
  const [bookingDone, setBookingDone] = useState(false)
  const [cart, setCart] = useState<{name:string,price:number}[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (item: {name:string,price:number}) => {
    setCart(c => [...c, item])
  }

  const total = cart.reduce((s,i)=>s+i.price, 0)

  return (
    <div className="min-h-screen bg-[#1a1008] text-[#f5e6d0] overflow-x-hidden" style={{fontFamily:"'Georgia', serif"}}>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button onClick={()=>setCartOpen(true)} className="relative flex items-center gap-1.5 bg-[#d4a855]/90 text-[#1a1008] text-xs font-sans font-bold px-3 py-2 rounded-full">
          <span className="material-symbols-outlined text-sm">shopping_bag</span>
          {cart.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-sans">{cart.length}</span>}
        </button>
        <Link href="/templates" className="flex items-center gap-1.5 bg-[#f5e6d0]/10 backdrop-blur border border-[#f5e6d0]/20 text-[#f5e6d0] text-xs font-sans font-semibold px-3 py-2 rounded-full hover:bg-[#f5e6d0]/20 transition-all">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
        </Link>
      </div>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setCartOpen(false)} />
          <div className="relative w-80 bg-[#2a1f14] h-full overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Giỏ hàng</h3>
              <button onClick={()=>setCartOpen(false)} className="text-[#f5e6d0]/50 hover:text-[#f5e6d0]"><span className="material-symbols-outlined">close</span></button>
            </div>
            {cart.length === 0 ? (
              <p className="text-[#f5e6d0]/50 font-sans text-sm text-center py-8">Chưa có món nào</p>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cart.map((item,i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-[#f5e6d0]/10">
                      <span className="text-sm">{item.name}</span>
                      <span className="font-sans font-bold text-[#d4a855]">{item.price.toLocaleString()}đ</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#f5e6d0]/20 pt-4 mb-6">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Tổng</span>
                    <span className="text-[#d4a855]">{total.toLocaleString()}đ</span>
                  </div>
                </div>
                <button className="w-full bg-[#d4a855] text-[#1a1008] font-sans font-bold py-3 rounded uppercase tracking-widest text-sm hover:bg-[#c49840] transition-colors">
                  Đặt Hàng
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#1a1008]/85 backdrop-blur-xl border-b border-[#f5e6d0]/8">
        <div className="max-w-[1200px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-[0.1em] text-[#d4a855]">LUNA CAFÉ</div>
          <div className="hidden md:flex gap-8 text-sm text-[#f5e6d0]/60 font-sans tracking-widest uppercase">
            {['Thực Đơn','Không Gian','Đặt Bàn','Đánh Giá'].map(n=>(
              <a key={n} href={`#${n.replace(' ','-').toLowerCase()}`} className="hover:text-[#d4a855] transition-colors">{n}</a>
            ))}
          </div>
          <button className="font-sans bg-[#d4a855] text-[#1a1008] text-xs font-bold px-5 py-2.5 rounded uppercase tracking-widest hover:bg-[#c49840] transition-colors">
            Đặt Bàn
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-20">
        <div className="absolute inset-0">
          <Image src={gallery[0]} alt="Luna Café" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008] via-[#1a1008]/50 to-transparent" />
        </div>
        <div className="relative z-10 px-8 md:px-16 max-w-[1200px] mx-auto w-full">
          <div className="flex flex-wrap gap-3 mb-5">
            {['⭐ 4.9/5 · 2,847 đánh giá','📍 47 Phố Cổ, Hoàn Kiếm','🕐 07:00–22:00 hàng ngày'].map(b=>(
              <span key={b} className="font-sans bg-[#1a1008]/60 backdrop-blur border border-[#f5e6d0]/20 text-[#f5e6d0]/80 text-xs px-3 py-1.5 rounded-full">{b}</span>
            ))}
          </div>
          <p className="text-[#d4a855] text-sm tracking-[0.3em] uppercase mb-3 font-sans">Kể từ năm 2018 · Specialty Coffee</p>
          <h1 className="text-6xl md:text-8xl font-bold leading-none mb-6">
            Nơi Mỗi<br />
            <span className="italic text-[#d4a855]">Ngụm Cà Phê</span><br />
            Là Một Ký Ức
          </h1>
          <div className="flex gap-4">
            <a href="#thực-đơn" className="bg-[#d4a855] text-[#1a1008] font-sans font-bold px-8 py-4 rounded text-sm uppercase tracking-widest hover:bg-[#c49840] transition-colors">
              Xem Thực Đơn
            </a>
            <a href="#đặt-bàn" className="border border-[#f5e6d0]/30 text-[#f5e6d0] font-sans text-sm px-8 py-4 rounded uppercase tracking-widest hover:border-[#d4a855] hover:text-[#d4a855] transition-colors">
              Đặt Bàn Ngay
            </a>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="thực-đơn" className="py-24 px-8 md:px-16 max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#d4a855] text-xs font-sans font-semibold uppercase tracking-[0.3em] block mb-3">Thực Đơn</span>
          <h2 className="text-5xl font-bold">Tinh Tuyển Từng Nguyên Liệu</h2>
        </div>
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {Object.keys(menuData).map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`font-sans px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-[#d4a855] text-[#1a1008]' : 'border border-[#f5e6d0]/20 text-[#f5e6d0]/60 hover:border-[#d4a855] hover:text-[#d4a855]'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuData[activeCategory as keyof typeof menuData].map(item => (
            <div key={item.name} className="flex items-center justify-between p-5 rounded-2xl border border-[#f5e6d0]/10 bg-[#f5e6d0]/3 hover:border-[#d4a855]/40 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#d4a855]/15 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[#d4a855] text-xl">local_cafe</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold">{item.name}</span>
                    {item.tag && <span className="text-[10px] bg-[#d4a855]/20 text-[#d4a855] px-2 py-0.5 rounded-full font-sans font-bold">{item.tag}</span>}
                  </div>
                  <p className="text-sm text-[#f5e6d0]/50 font-sans">{item.note}</p>
                  <p className="text-xs text-[#f5e6d0]/30 font-sans mt-0.5">{item.cal}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#d4a855] font-bold font-sans">{item.price.toLocaleString()}đ</span>
                <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-full bg-[#d4a855] text-[#1a1008] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="không-gian" className="py-16 bg-[#0f0a05]">
        <div className="px-8 md:px-16 max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#d4a855] text-xs font-sans font-semibold uppercase tracking-[0.3em] block mb-3">Không Gian</span>
            <h2 className="text-4xl font-bold">Góc Bình Yên Giữa Phố Thị</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {gallery.map((src,i) => (
              <div key={i} className={`relative overflow-hidden rounded-xl ${i===0?'col-span-2 row-span-2':''}`} style={{height: i===0?'480px':'230px'}}>
                <Image src={src} alt={`Gallery ${i}`} fill className="object-cover hover:scale-105 transition-transform duration-500" unoptimized />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="đánh-giá" className="py-24 px-8 md:px-16 max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#d4a855] text-xs font-sans font-semibold uppercase tracking-[0.3em] block mb-3">Đánh Giá</span>
          <h2 className="text-4xl font-bold">Khách Hàng Nói Gì</h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-1">{Array.from({length:5}).map((_,i)=><span key={i} className="text-[#d4a855] text-xl">★</span>)}</div>
            <span className="font-sans font-bold text-[#d4a855] text-xl">4.9</span>
            <span className="font-sans text-[#f5e6d0]/50 text-sm">/ 2,847 đánh giá</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map(r => (
            <div key={r.name} className="bg-[#f5e6d0]/4 border border-[#f5e6d0]/10 rounded-2xl p-6">
              <div className="flex gap-0.5 mb-3">{Array.from({length:r.stars}).map((_,i)=><span key={i} className="text-[#d4a855]">★</span>)}</div>
              <p className="text-sm leading-relaxed mb-4 text-[#f5e6d0]/80 font-sans italic">"{r.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#d4a855]/30 flex items-center justify-center text-xs font-bold text-[#d4a855]">{r.name[0]}</div>
                <span className="font-sans font-semibold text-sm">{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section id="đặt-bàn" className="py-24 bg-[#0f0a05]">
        <div className="px-8 md:px-16 max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#d4a855] text-xs font-sans font-semibold uppercase tracking-[0.3em] block mb-3">Đặt Bàn</span>
            <h2 className="text-4xl font-bold">Giữ Chỗ Ngay Hôm Nay</h2>
          </div>
          {bookingDone ? (
            <div className="bg-[#f5e6d0]/5 border border-[#d4a855]/30 rounded-2xl p-10 text-center">
              <p className="text-5xl mb-4">☕</p>
              <h3 className="text-2xl font-bold mb-2">Đặt bàn thành công!</h3>
              <p className="font-sans text-[#f5e6d0]/60">Chúng tôi sẽ xác nhận qua số điện thoại của bạn.</p>
            </div>
          ) : (
            <form onSubmit={e=>{e.preventDefault();setBookingDone(true)}} className="bg-[#f5e6d0]/4 border border-[#f5e6d0]/10 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {[{k:'name',label:'Họ tên',ph:'Nguyễn Văn A',t:'text'},{k:'phone',label:'Điện thoại',ph:'0912 345 678',t:'tel'},{k:'date',label:'Ngày',ph:'',t:'date'},{k:'time',label:'Giờ',ph:'',t:'time'}].map(f=>(
                <div key={f.k}>
                  <label className="text-xs text-[#f5e6d0]/50 font-sans font-semibold uppercase tracking-wider block mb-1.5">{f.label}</label>
                  <input type={f.t} placeholder={f.ph} required value={booking[f.k as keyof typeof booking]} onChange={e=>setBooking({...booking,[f.k]:e.target.value})}
                    className="w-full bg-[#f5e6d0]/8 border border-[#f5e6d0]/15 rounded-lg px-4 py-3 font-sans text-sm text-[#f5e6d0] placeholder:text-[#f5e6d0]/30 focus:border-[#d4a855] outline-none transition-all" />
                </div>
              ))}
              <div>
                <label className="text-xs text-[#f5e6d0]/50 font-sans font-semibold uppercase tracking-wider block mb-1.5">Số khách</label>
                <select value={booking.guests} onChange={e=>setBooking({...booking,guests:e.target.value})} className="w-full bg-[#f5e6d0]/8 border border-[#f5e6d0]/15 rounded-lg px-4 py-3 font-sans text-sm text-[#f5e6d0] focus:border-[#d4a855] outline-none">
                  {['1','2','3','4','5','6+'].map(n=><option key={n} value={n}>{n} khách</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-[#f5e6d0]/50 font-sans font-semibold uppercase tracking-wider block mb-1.5">Ghi chú</label>
                <input type="text" placeholder="Dị ứng thực phẩm, yêu cầu đặc biệt..." value={booking.note} onChange={e=>setBooking({...booking,note:e.target.value})}
                  className="w-full bg-[#f5e6d0]/8 border border-[#f5e6d0]/15 rounded-lg px-4 py-3 font-sans text-sm text-[#f5e6d0] placeholder:text-[#f5e6d0]/30 focus:border-[#d4a855] outline-none transition-all" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full bg-[#d4a855] text-[#1a1008] font-sans font-bold py-4 rounded uppercase tracking-widest hover:bg-[#c49840] transition-colors">
                  Xác Nhận Đặt Bàn
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t border-[#f5e6d0]/10 py-10 px-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold tracking-[0.1em] text-[#d4a855]">LUNA CAFÉ</div>
          <p className="font-sans text-[#f5e6d0]/30 text-sm">© 2025 · Mẫu giao diện bởi <span className="text-[#d4a855]">Vaitech</span></p>
          <div className="font-sans flex gap-4 text-[#f5e6d0]/40 text-sm">
            <span>📍 47 Phố Cổ, HK</span>
            <span>📞 024 3938 5678</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
