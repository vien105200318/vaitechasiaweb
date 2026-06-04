'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { DemoBackButton, Reveal, ToastContainer } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl'

const PRODUCTS = [
  { id:1, name:'Oversized Linen Set', price:1290000, tag:'New In', color:'Trắng kem', sizes:['XS','S','M','L','XL'], cat:'Áo', badge:'bg-white text-black' },
  { id:2, name:'Wide-Leg Palazzo', price:890000, tag:'Bestseller', color:'Đen', sizes:['S','M','L'], cat:'Quần', badge:'bg-rose-500 text-white' },
  { id:3, name:'Silk Wrap Dress', price:2100000, tag:'Limited', color:'Nude', sizes:['XS','S','M'], cat:'Đầm', badge:'bg-amber-500 text-white' },
  { id:4, name:'Structured Blazer', price:1750000, tag:null, color:'Xám bụi', sizes:['S','M','L','XL'], cat:'Áo khoác', badge:'' },
  { id:5, name:'Crop Camisole', price:650000, tag:'Sale −30%', color:'Trắng', sizes:['XS','S','M','L'], cat:'Áo', badge:'bg-red-500 text-white' },
  { id:6, name:'Pleated Midi Skirt', price:980000, tag:'New In', color:'Camel', sizes:['S','M','L'], cat:'Chân váy', badge:'bg-white text-black' },
]

const CATS = ['Tất Cả', ...Array.from(new Set(PRODUCTS.map(p => p.cat)))]

type CartItem = { id: number; name: string; price: number; size: string }

export default function FashionDemo() {
  const { toasts, add } = useToast()
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [sizes, setSizes] = useState<Record<number, string>>({})
  const [wishlist, setWishlist] = useState<number[]>([])
  const [filter, setFilter] = useState('Tất Cả')
  const [hovered, setHovered] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(0)
  const [orderDone, setOrderDone] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const filtered = filter === 'Tất Cả' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter)
  const totalItems = cart.reduce((s, i) => s, 0) + cart.length
  const total = cart.reduce((s, i) => s + i.price, 0)

  const addToCart = (p: typeof PRODUCTS[0]) => {
    const size = sizes[p.id]
    if (!size) { add('Vui lòng chọn size trước', 'error'); return }
    setCart(c => [...c, { id: p.id, name: p.name, price: p.price, size }])
    add(`Đã thêm ${p.name} (${size})`, 'success')
  }

  const toggleWish = (id: number) => setWishlist(w => w.includes(id) ? w.filter(i => i !== id) : [...w, id])

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1714] overflow-x-hidden font-sans">
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* Cart sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="relative w-88 md:w-96 bg-white h-full flex flex-col shadow-2xl animate-slide-in-right">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <div><h3 className="font-bold text-lg">Giỏ hàng</h3><p className="text-xs text-[#1a1714]/40">{cart.length} sản phẩm</p></div>
              <button onClick={() => setCartOpen(false)} className="text-[#1a1714]/40 hover:text-[#1a1714]"><span className="material-symbols-outlined">close</span></button>
            </div>

            {checkoutStep === 0 ? (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <span className="material-symbols-outlined text-4xl text-gray-200 block mb-3">shopping_bag</span>
                      <p className="text-[#1a1714]/35 text-sm">Chưa có sản phẩm</p>
                    </div>
                  ) : cart.map((item, i) => (
                    <div key={i} className="flex gap-3 items-start bg-gray-50 rounded-xl p-3">
                      <div className="w-14 h-16 rounded-lg bg-gray-100 overflow-hidden relative flex-shrink-0">
                        <Image src={IMG} alt={item.name} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs truncate mb-0.5">{item.name}</p>
                        <p className="text-[10px] text-[#1a1714]/40">Size: {item.size}</p>
                        <p className="font-bold text-sm mt-1">{item.price.toLocaleString()}đ</p>
                      </div>
                      <button onClick={() => setCart(c => c.filter((_, j) => j !== i))} className="text-gray-300 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-base">delete_outline</span>
                      </button>
                    </div>
                  ))}
                </div>
                {cart.length > 0 && (
                  <div className="px-5 py-5 border-t">
                    <div className="flex justify-between mb-2 text-sm"><span className="text-gray-500">Tạm tính</span><span className="font-semibold">{total.toLocaleString()}đ</span></div>
                    <div className="flex justify-between mb-4 text-sm"><span className="text-gray-500">Phí ship</span><span className="text-green-600 font-semibold">Miễn phí</span></div>
                    <div className="flex justify-between mb-5 font-bold text-lg border-t pt-4"><span>Tổng</span><span>{total.toLocaleString()}đ</span></div>
                    <button onClick={() => setCheckoutStep(1)} className="w-full bg-[#1a1714] hover:bg-black text-white font-bold py-4 rounded-xl transition-colors active:scale-[0.98]">
                      Thanh Toán →
                    </button>
                  </div>
                )}
              </>
            ) : checkoutStep < 3 ? (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex gap-2 mb-6">
                  {['Địa chỉ', 'Thanh toán', 'Xác nhận'].map((s, i) => (
                    <div key={s} className={`flex-1 text-center text-xs py-1.5 rounded-full font-semibold ${checkoutStep - 1 >= i ? 'bg-[#1a1714] text-white' : 'bg-gray-100 text-gray-400'}`}>{s}</div>
                  ))}
                </div>
                {checkoutStep === 1 && (
                  <div className="space-y-4">
                    <h4 className="font-bold">Địa chỉ giao hàng</h4>
                    {[{l:'Họ tên',p:'Nguyễn Văn A'},{l:'Điện thoại',p:'0912 345 678'},{l:'Địa chỉ',p:'123 Đường ABC'},{l:'Thành phố',p:'Đà Nẵng'}].map(f=>(
                      <input key={f.l} placeholder={f.p} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#1a1714] outline-none" />
                    ))}
                    <button onClick={() => setCheckoutStep(2)} className="w-full bg-[#1a1714] text-white font-bold py-3.5 rounded-xl hover:bg-black transition-colors active:scale-[0.98]">Tiếp Theo →</button>
                  </div>
                )}
                {checkoutStep === 2 && (
                  <div className="space-y-3">
                    <h4 className="font-bold mb-3">Phương thức thanh toán</h4>
                    {['💳 Thẻ tín dụng/ghi nợ','🏦 Chuyển khoản','📱 MoMo / ZaloPay','💵 COD'].map(m=>(
                      <label key={m} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-[#1a1714] transition-colors text-sm">
                        <input type="radio" name="pay" className="accent-[#1a1714]"/>{m}
                      </label>
                    ))}
                    <button onClick={() => { setCheckoutStep(3); setOrderDone(true) }} className="w-full bg-[#1a1714] text-white font-bold py-3.5 rounded-xl hover:bg-black transition-colors active:scale-[0.98]">Đặt Hàng</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-green-600 text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h3>
                <p className="text-gray-500 text-sm mb-4">Mã đơn: <strong>#AU{Math.floor(Math.random()*90000+10000)}</strong></p>
                <p className="text-gray-500 text-sm mb-6">Giao trong 2–3 ngày</p>
                <button onClick={() => { setCheckoutStep(0); setCart([]); setCartOpen(false) }} className="bg-[#1a1714] text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-black transition-colors">
                  Tiếp tục mua sắm
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-400 ${scrolled ? 'bg-[#faf9f7]/95 backdrop-blur-xl border-b border-[#1a1714]/8' : 'bg-[#faf9f7]/90'}`}>
        <div className="max-w-[1280px] mx-auto px-8 h-14 flex items-center justify-between">
          <div className="text-xl font-black tracking-[0.15em] uppercase">AUREL<span className="text-rose-400">.</span></div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] text-[#1a1714]/50">
            {['New In', 'Collections', 'Sale', 'About'].map(n => (
              <a key={n} href="#" className="hover:text-[#1a1714] transition-colors">{n}</a>
            ))}
          </div>
          <div className="flex items-center gap-4 text-[#1a1714]/55">
            <button className="hover:text-[#1a1714] transition-colors"><span className="material-symbols-outlined text-xl">search</span></button>
            <button className="hover:text-[#1a1714] transition-colors relative" onClick={() => setWishlist(w => w)}>
              <span className="material-symbols-outlined text-xl">favorite_border</span>
              {wishlist.length > 0 && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full text-white text-[9px] flex items-center justify-center">{wishlist.length}</span>}
            </button>
            <button className="hover:text-[#1a1714] transition-colors relative" onClick={() => setCartOpen(true)}>
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              {cart.length > 0 && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#1a1714] rounded-full text-white text-[9px] flex items-center justify-center">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-14 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative overflow-hidden min-h-[55vh] lg:min-h-screen">
          <Image src={IMG} alt="Fashion Hero" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#faf9f7]/15" />
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur rounded-2xl p-5 max-w-xs animate-float">
            <p className="text-xs uppercase tracking-widest text-rose-500 font-semibold mb-0.5">New Arrival</p>
            <p className="font-bold">Summer Linen Collection</p>
            <p className="text-sm text-[#1a1714]/55 mt-0.5">Từ 650.000đ</p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-10 md:px-16 py-20 bg-[#f5ede6]">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-400 mb-5 font-semibold">Bộ Sưu Tập 2026</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] mb-8 tracking-tight">
            Effortless<br /><span className="italic font-light">Elegance</span>
          </h1>
          <p className="text-[#1a1714]/55 leading-relaxed mb-8 max-w-xs">
            Trang phục nữ cao cấp — thiết kế tối giản, chất liệu tự nhiên, vẻ đẹp bền vững theo thời gian.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#1a1714] hover:bg-black text-white font-bold px-8 py-4 text-sm uppercase tracking-widest transition-colors active:scale-95">
              Shop Now
            </button>
            <button className="border-b-2 border-[#1a1714] text-[#1a1714] font-bold text-sm uppercase tracking-widest pb-1 hover:text-rose-500 hover:border-rose-500 transition-colors">
              Lookbook →
            </button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-8 max-w-[1280px] mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-bold">Sản Phẩm</h2>
          <div className="flex flex-wrap gap-2">
            {CATS.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-5 py-2 text-xs uppercase tracking-widest transition-all font-semibold ${filter === c ? 'bg-[#1a1714] text-white' : 'border border-[#1a1714]/15 text-[#1a1714]/50 hover:border-[#1a1714] hover:text-[#1a1714]'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {filtered.map(item => (
            <Reveal key={item.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4"
                onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)}>
                <Image src={IMG} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 50vw, 33vw" />
                {item.tag && (
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-3 py-1 uppercase tracking-wider ${item.badge}`}>{item.tag}</span>
                )}
                {/* Wishlist */}
                <button onClick={() => toggleWish(item.id)} className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                  <span className="material-symbols-outlined text-base transition-all"
                    style={{fontVariationSettings: wishlist.includes(item.id) ? "'FILL' 1" : "'FILL' 0", color: wishlist.includes(item.id) ? '#ef4444' : '#9ca3af'}}>
                    favorite
                  </span>
                </button>
                {/* Hover overlay — size picker */}
                <div className={`absolute inset-x-0 bottom-0 bg-[#1a1714] p-4 transition-transform duration-300 ${hovered === item.id ? 'translate-y-0' : 'translate-y-full'}`}>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.sizes.map(s => (
                      <button key={s} onClick={() => setSizes(prev => ({ ...prev, [item.id]: s }))}
                        className={`w-8 h-8 text-xs font-bold border-2 transition-all ${sizes[item.id] === s ? 'bg-white text-[#1a1714] border-white' : 'border-white/40 text-white hover:border-white'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => addToCart(item)}
                    className={`w-full text-xs font-bold uppercase tracking-widest py-2.5 transition-colors ${sizes[item.id] ? 'bg-white text-[#1a1714] hover:bg-gray-100' : 'bg-white/20 text-white/50 cursor-default'}`}>
                    {sizes[item.id] ? 'Thêm Vào Giỏ' : 'Chọn Size Trước'}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-sm mb-0.5">{item.name}</h3>
                  <p className="text-xs text-[#1a1714]/45">{item.color}</p>
                </div>
                <p className="font-bold text-sm">{item.price.toLocaleString()}đ</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="bg-[#1a1714] text-white/30 py-10 px-8 text-center text-sm font-sans">
        © 2026 AUREL Fashion · Mẫu bởi <span className="text-rose-400">Vaitech</span>
      </footer>
    </div>
  )
}
