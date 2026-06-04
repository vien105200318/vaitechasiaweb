'use client'
import { useState, useEffect } from 'react'
import { BadgeCheck, Droplets, Flame, Leaf, Package, ShoppingBag, Truck, X, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { DemoBackButton, Reveal, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const IMG_COFFEE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5YWIa9b59e3idcYzsuThgbqBGU0mEPt81SSB6qL0mZPgVBECVCowWv7CgOwyo5AzSeWtClMGPvEvIeCsLSpb8Aq_PT-5fUypLe_77D5vCcxXc3ifO7MT0TZXzFrlV20k8Xxe9CbsBC8Pkp05YvIhZXmUfSmAkD0C0GaesUx7hVTtog4oBnk7q690mOsyfbsx5_9VLn2IAGbbZSEakFIKs37UU2BseufJK-RxVS9-D2acGbLcmGn2Rkh_ayzZ0HrvnRufVBrOxvBeA'
const IMG_CAFE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB5M_Hwf_PXfFjo6A83bSrDEzKWuyQXflUIvHCEHe_dvBTJwOI7njhgTwS8G9GIr6GcLL9ZDmDEAMbypvVWZJHnDhhI90pibKYtUH5uTRfC2JlWxuG2cip8d2ZY96B3FfGZR-dg1bobwuKvJhbetKGPF5_Vq5Tkn3nwudTHfpjrZINXsziAGDDLn30VVFH5EfNg4ryZNUQmCwtpSEtiC8OidjJ_j0l9_Ox__6NQbWhm4wIjss0bOnbc1gW5RTW38xnRA0i9GdH12In'

const COFFEES = [
  { id:1, name:'Ethiopia Yirgacheffe', region:'Yirgacheffe, Ethiopia', process:'Washed', altitude:'1800m', flavor:['Hoa nhài','Quả lý','Chanh dây'], score:92, price:320000, weight:'200g', roast:'Light', img:IMG_COFFEE },
  { id:2, name:'Colombia Huila', region:'Huila, Colombia', process:'Natural', altitude:'1650m', flavor:['Caramel','Đào','Chocolate đen'], score:90, price:290000, weight:'200g', roast:'Medium', img:IMG_CAFE },
  { id:3, name:'Guatemala Antigua', region:'Antigua, Guatemala', process:'Honey', altitude:'1500m', flavor:['Mía','Táo đỏ','Hạnh nhân'], score:89, price:270000, weight:'200g', roast:'Medium-Light', img:IMG_COFFEE },
]

const GRIND_OPTIONS = ['Nguyên hạt', 'Xay Moka', 'Xay Pour Over', 'Xay French Press', 'Xay Espresso']

const PROCESS_STEPS: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: Leaf, title:'Thu Hoạch', desc:'Hái tay, chỉ quả chín đỏ.' },
  { Icon: Droplets, title:'Sơ Chế', desc:'Washed / Natural / Honey.' },
  { Icon: Flame, title:'Rang Nhỏ Lẻ', desc:'Profile riêng, batch ≤5kg.' },
  { Icon: BadgeCheck, title:'Q-Grade', desc:'Cupping bởi Q-Grader SCA.' },
  { Icon: Package, title:'Đóng Gói', desc:'Valve 1 chiều, 48h sau rang.' },
  { Icon: Truck, title:'Giao Hàng', desc:'Miễn phí, 24h nội địa.' },
]

const SUBS = [
  { name:'Khám Phá', price:380000, detail:'200g · 1 túi/tháng', hot:false },
  { name:'Tuyển Chọn', price:680000, detail:'200g × 2 · 2 nguồn gốc', hot:true },
  { name:'Connoisseur', price:1200000, detail:'200g × 4 · Notes cupping', hot:false },
]

type CartItem = { name: string; price: number; grind: string }

export default function RoasteryDemo() {
  const { toasts, add } = useToast()
  const [selected, setSelected] = useState(COFFEES[0])
  const [grind, setGrind] = useState('Nguyên hạt')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [subPlan, setSubPlan] = useState<string | null>(null)
  const [subEmail, setSubEmail] = useState('')
  const [subDone, setSubDone] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const totalItems = cart.length
  const totalPrice = cart.reduce((s, i) => s + i.price, 0)

  const addToCart = () => {
    setCart(c => [...c, { name: selected.name, price: selected.price, grind }])
    add(`Đã thêm ${selected.name} (${grind})`, 'success')
  }

  return (
    <div className="min-h-screen bg-[#f8f4ef] text-[#1a1008] overflow-x-hidden" style={{ fontFamily: "'Georgia',serif" }}>
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="relative w-80 bg-white h-full flex flex-col shadow-2xl animate-slide-in-right">
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#1a1008]/8">
              <h3 className="font-bold text-lg">Giỏ hàng ({totalItems})</h3>
              <button onClick={() => setCartOpen(false)} className="text-[#1a1008]/40 hover:text-[#1a1008]"><X size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {cart.length === 0 ? <p className="text-center text-[#1a1008]/35 font-sans text-sm py-8">☕ Chưa có sản phẩm</p> :
                cart.map((item, i) => (
                  <div key={i} className="flex justify-between items-start py-3 border-b border-[#1a1008]/6">
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-[#1a1008]/40 font-sans text-xs">{item.grind}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-sans font-bold text-[#8b7355] text-sm">{item.price.toLocaleString()}đ</p>
                      <button onClick={() => setCart(c => c.filter((_, j) => j !== i))} className="text-[#1a1008]/25 hover:text-red-500 transition-colors text-xs">×</button>
                    </div>
                  </div>
                ))}
            </div>
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Tổng</span><span className="text-[#8b7355]">{totalPrice.toLocaleString()}đ</span>
                </div>
                <button className="w-full bg-[#1a1008] hover:bg-[#3d2c1a] text-[#f8f4ef] font-sans font-bold py-3.5 rounded-xl uppercase tracking-widest text-sm transition-colors active:scale-95">
                  Thanh Toán
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart fab */}
      {totalItems > 0 && (
        <button onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#1a1008] hover:bg-[#3d2c1a] text-[#f8f4ef] rounded-full w-14 h-14 flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 font-sans">
          <ShoppingBag size={16} />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8b7355] rounded-full text-white text-[10px] font-black flex items-center justify-center">{totalItems}</span>
        </button>
      )}

      {/* Nav */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? 'bg-[#f8f4ef]/95 backdrop-blur-xl border-b border-[#1a1008]/8 shadow-sm' : 'bg-[#f8f4ef]/90'}`}>
        <div className="max-w-[1400px] mx-auto px-10 h-16 flex items-center justify-between">
          <div className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-[#1a1008]/35">Specialty · Hà Nội</div>
          <div className="text-2xl font-bold tracking-[0.05em]">TERRA ROAST</div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-7 text-xs font-sans font-bold uppercase tracking-[0.15em] text-[#1a1008]/45">
              {['Cà Phê','Đăng Ký','Quy Trình'].map(n => (
                <a key={n} href={`#${n}`} className="hover:text-[#1a1008] transition-colors">{n}</a>
              ))}
            </div>
            <button className="font-sans bg-[#1a1008] hover:bg-[#3d2c1a] text-[#f8f4ef] text-xs font-bold px-5 py-2.5 uppercase tracking-widest transition-colors active:scale-95">
              Mua Ngay
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-16">
        <div className="flex flex-col justify-center px-10 md:px-20 py-20">
          <div className="text-xs font-sans uppercase tracking-[0.4em] text-[#8b7355] mb-8">Rang Thủ Công · Hà Nội · Kể Từ 2019</div>
          <h1 className="text-[80px] md:text-[110px] font-bold leading-[0.85] tracking-tight mb-10">
            FROM<br />BEAN<br /><span className="italic text-[#8b7355]">to Cup.</span>
          </h1>
          <p className="text-[#1a1008]/55 font-sans text-base leading-relaxed max-w-sm mb-10">
            Chúng tôi đến tận nông trại để mang về những hạt cà phê đặc sản tốt nhất. Rang từng mẻ nhỏ, kiểm định bởi Q-Grader được chứng nhận SCA.
          </p>
          <div className="flex gap-4">
            <a href="#Cà Phê" className="bg-[#1a1008] hover:bg-[#3d2c1a] text-[#f8f4ef] font-sans font-bold px-8 py-4 text-sm uppercase tracking-widest transition-colors active:scale-95">
              Khám Phá Cà Phê
            </a>
            <a href="#Đăng Ký" className="border-b-2 border-[#1a1008] text-[#1a1008] font-sans font-bold px-2 py-4 text-sm uppercase tracking-widest">
              Gói Đăng Ký →
            </a>
          </div>
        </div>
        <div className="relative hidden lg:block bg-[#1a1008] overflow-hidden min-h-[600px]">
          <Image src={IMG_COFFEE} alt="Coffee" fill className="object-cover opacity-75 mix-blend-luminosity" sizes="50vw" priority />
          <div className="absolute bottom-10 left-10 bg-[#f8f4ef]/90 backdrop-blur rounded-2xl p-5 max-w-[200px]">
            <p className="text-xs font-sans font-semibold uppercase tracking-wider text-[#8b7355] mb-1">SCA Score</p>
            <p className="text-4xl font-black text-[#1a1008]"><CountUp target={92} suffix="+" /></p>
            <p className="text-xs text-[#1a1008]/40 font-sans">Specialty Grade</p>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="Cà Phê" className="py-24 bg-[#1a1008] text-[#f8f4ef]">
        <div className="px-10 md:px-20 max-w-[1400px] mx-auto">
          <Reveal className="mb-14">
            <span className="text-[#8b7355] text-xs font-sans uppercase tracking-[0.3em] block mb-3">Cửa Hàng</span>
            <h2 className="text-5xl font-bold">Chọn Cà Phê</h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coffee list */}
            <div className="space-y-3">
              {COFFEES.map(c => (
                <Reveal key={c.id}>
                  <button onClick={() => setSelected(c)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all ${selected.id === c.id ? 'border-[#8b7355] bg-[#2a1f14]' : 'border-[#f8f4ef]/8 hover:border-[#8b7355]/40 bg-[#f8f4ef]/3'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-[#8b7355] font-sans uppercase tracking-widest mb-1">{c.region}</p>
                        <p className="font-bold">{c.name}</p>
                      </div>
                      <span className="text-[#8b7355] font-sans font-bold text-sm">{c.score} pts</span>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-2">
                      {c.flavor.map(f => <span key={f} className="text-[10px] border border-[#f8f4ef]/12 text-[#f8f4ef]/45 px-2 py-0.5 rounded font-sans">{f}</span>)}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>

            {/* Product detail */}
            <div className="lg:col-span-2 bg-[#2a1f14] rounded-3xl p-8 key={selected.id}">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-56 rounded-2xl overflow-hidden">
                  <Image src={selected.img} alt={selected.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 25vw" />
                </div>
                <div>
                  <p className="text-[#8b7355] text-xs font-sans uppercase tracking-[0.3em] mb-2">{selected.region}</p>
                  <h3 className="text-2xl font-bold mb-4">{selected.name}</h3>
                  <div className="grid grid-cols-2 gap-2.5 mb-5 text-sm font-sans">
                    {[
                      ['Rang', '⚙ ' + selected.roast],
                      ['Process', '◈ ' + selected.process],
                      ['Altitude', '↑ ' + selected.altitude],
                      ['Score', '★ ' + selected.score + '/100'],
                    ].map(([k,v]) => (
                      <div key={k} className="bg-[#1a1008]/40 rounded-xl p-3">
                        <p className="text-[#f8f4ef]/30 text-xs mb-0.5">{k}</p>
                        <p className="font-semibold text-[#f8f4ef] text-sm">{v}</p>
                      </div>
                    ))}
                  </div>
                  {/* Grind selector */}
                  <p className="text-xs font-sans uppercase tracking-wider text-[#f8f4ef]/35 mb-2">Kiểu xay</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {GRIND_OPTIONS.map(g => (
                      <button key={g} onClick={() => setGrind(g)}
                        className={`text-xs font-sans px-3 py-1.5 rounded-full border transition-all ${grind === g ? 'border-[#8b7355] bg-[#8b7355]/20 text-[#8b7355]' : 'border-[#f8f4ef]/12 text-[#f8f4ef]/40 hover:border-[#8b7355]/40'}`}>
                        {g}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">{selected.price.toLocaleString()}đ</p>
                      <p className="text-[#f8f4ef]/30 font-sans text-xs">{selected.weight} · Rang mới</p>
                    </div>
                    <button onClick={addToCart}
                      className="bg-[#f8f4ef] hover:bg-[#d4a855] text-[#1a1008] font-sans font-bold px-6 py-3 rounded-xl uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95">
                      Thêm Giỏ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="Quy Trình" className="py-24 px-10 md:px-20 max-w-[1400px] mx-auto">
        <Reveal className="mb-14">
          <span className="text-[#8b7355] text-xs font-sans uppercase tracking-[0.3em] block mb-3">Quy Trình</span>
          <h2 className="text-5xl font-bold">Từ Nông Trại Đến Tay Bạn</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 80} className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-[#1a1008] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8b7355] transition-colors duration-300">
                <step.Icon size={16} />
              </div>
              <p className="text-[#8b7355]/40 font-sans text-xs mb-1">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-bold text-sm mb-1">{step.title}</h3>
              <p className="text-[#1a1008]/50 font-sans text-xs leading-relaxed">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <section id="Đăng Ký" className="py-24 bg-[#1a1008] text-[#f8f4ef]">
        <div className="px-10 md:px-20 max-w-[1400px] mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-[#8b7355] text-xs font-sans uppercase tracking-[0.3em] block mb-3">Đăng Ký Định Kỳ</span>
            <h2 className="text-5xl font-bold mb-3">Cà Phê Tươi Mỗi Tháng</h2>
            <p className="font-sans text-[#f8f4ef]/40">Rang tươi · Giao nhanh · Ưu đãi thành viên −10%</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12">
            {SUBS.map(sub => (
              <Reveal key={sub.name}>
                <div onClick={() => setSubPlan(sub.name)}
                  className={`rounded-2xl p-7 border cursor-pointer transition-all hover:-translate-y-1 ${subPlan === sub.name ? 'border-[#8b7355] bg-[#2a1f14]' : sub.hot ? 'border-[#8b7355]/40 bg-[#2a1f14]/50' : 'border-[#f8f4ef]/8 hover:border-[#8b7355]/30'}`}>
                  {sub.hot && <span className="text-[10px] bg-[#8b7355]/25 text-[#8b7355] font-sans font-bold px-3 py-0.5 rounded-full uppercase tracking-widest block w-fit mb-3">Phổ biến</span>}
                  <h3 className="font-bold text-xl mb-2">{sub.name}</h3>
                  <p className="text-3xl font-black mb-1">{sub.price.toLocaleString()}đ</p>
                  <p className="font-sans text-[#f8f4ef]/40 text-xs mb-1">Hàng tháng</p>
                  <p className="font-sans text-[#f8f4ef]/60 text-sm">{sub.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {!subDone ? (
            <Reveal className="max-w-sm mx-auto flex gap-3">
              <input type="email" placeholder="Email của bạn" value={subEmail} onChange={e => setSubEmail(e.target.value)}
                className="flex-1 bg-[#f8f4ef]/6 border border-[#f8f4ef]/12 rounded-lg px-4 py-3 font-sans text-sm text-[#f8f4ef] placeholder:text-[#f8f4ef]/25 focus:border-[#8b7355] outline-none transition-all" />
              <button onClick={() => { if (subEmail) { setSubDone(true); add('Đã đăng ký!', 'success') } else add('Nhập email trước', 'error') }}
                className="bg-[#f8f4ef] hover:bg-[#d4a855] text-[#1a1008] font-sans font-bold px-6 py-3 rounded-lg uppercase tracking-widest text-xs transition-all active:scale-95 whitespace-nowrap">
                Đăng Ký
              </button>
            </Reveal>
          ) : (
            <Reveal className="text-center">
              <p className="text-2xl mb-2">☕</p>
              <p className="font-sans text-[#f8f4ef]/55">Đã đăng ký! Kiểm tra email để xác nhận.</p>
            </Reveal>
          )}
        </div>
      </section>

      <footer className="bg-[#1a1008] border-t border-[#f8f4ef]/8 py-10 px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold tracking-[0.05em] text-[#f8f4ef]">TERRA ROAST</div>
          <p className="font-sans text-[#f8f4ef]/25 text-sm">© 2026 · Mẫu bởi <span className="text-[#8b7355]">Vaitech</span></p>
          <div className="font-sans flex gap-5 text-[#f8f4ef]/35 text-sm"><span>📍 12 Ngõ Huyện, Hoàn Kiếm</span></div>
        </div>
      </footer>
    </div>
  )
}
