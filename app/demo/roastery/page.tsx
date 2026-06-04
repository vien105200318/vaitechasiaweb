'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const coffees = [
  { id:1, name:'Ethiopia Yirgacheffe', region:'Yirgacheffe, Ethiopia', process:'Washed', altitude:'1800m', flavor:['Hoa nhài','Quả lý','Chanh dây'], score:92, price:320000, weight:'200g', roast:'Light', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuCB5M_Hwf_PXfFjo6A83bSrDEzKWuyQXflUIvHCEHe_dvBTJwOI7njhgTwS8G9GIr6GcLL9ZDmDEAMbypvVWZJHnDhhI90pibKYtUH5uTRfC2JlWxuG2cip8d2ZY96B3FfGZR-dg1bobwuKvJhbetKGPF5_Vq5Tkn3nwudTHfpjrZINXsziAGDDLn30VVFH5EfNg4ryZNUQmCwtpSEtiC8OidjJ_j0l9_Ox__6NQbWhm4wIjss0bOnbc1gW5RTW38xnRA0i9GdH12In'},
  { id:2, name:'Colombia Huila', region:'Huila, Colombia', process:'Natural', altitude:'1650m', flavor:['Caramel','Đào','Chocolate đen'], score:90, price:290000, weight:'200g', roast:'Medium', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuC5YWIa9b59e3idcYzsuThgbqBGU0mEPt81SSB6qL0mZPgVBECVCowWv7CgOwyo5AzSeWtClMGPvEvIeCsLSpb8Aq_PT-5fUypLe_77D5vCcxXc3ifO7MT0TZXzFrlV20k8Xxe9CbsBC8Pkp05YvIhZXmUfSmAkD0C0GaesUx7hVTtog4oBnk7q690mOsyfbsx5_9VLn2IAGbbZSEakFIKs37UU2BseufJK-RxVS9-D2acGbLcmGn2Rkh_ayzZ0HrvnRufVBrOxvBeA'},
  { id:3, name:'Guatemala Antigua', region:'Antigua, Guatemala', process:'Honey', altitude:'1500m', flavor:['Mía','Táo đỏ','Hạnh nhân'], score:89, price:270000, weight:'200g', roast:'Medium-Light', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDO04BddMbSNQ6NeNP_QB43WinFa9-X2-jIGHegvTybTvFK5PIFe9SG43Vr_oas5GO4SeWyzKSC3G3gAQ2FhTXWCnmwDhBVYMgiPPZXTueFkeE-DBICLX3c7DY-gRLYzuDc_yjhY1uIevWCOLLtQXVMlro_Xm5uxrCfDmFxm4ZDh-DY2-bVVxhCEae82O3o5W2u-YFElzBsVEBgSrfVMJlfkximi6ApsbkHGg3vwDr_CyCFJOaUcTbfPUSTw9EsixJitb0QxhMaayVg'},
]

const subscriptions = [
  { name: 'Khám Phá', price: 380000, detail: '200g · 1 túi/tháng · 1 nguồn gốc', freq: 'Hàng tháng' },
  { name: 'Tuyển Chọn', price: 680000, detail: '200g × 2 · 2 nguồn gốc khác nhau', freq: 'Hàng tháng', hot: true },
  { name: 'Connoisseur', price: 1200000, detail: '200g × 4 · 4 nguồn gốc · Notes cupping', freq: 'Hàng tháng' },
]

const process = [
  { step:'01', title:'Thu Hoạch', icon:'agriculture', desc:'Hái tay chọn lọc, chỉ thu quả chín đỏ.' },
  { step:'02', title:'Sơ Chế', icon:'water', desc:'Washed, Natural hoặc Honey tùy đặc tính lô hàng.' },
  { step:'03', title:'Rang Nhỏ Lẻ', icon:'local_fire_department', desc:'Profile rang riêng biệt, batch tối đa 5kg.' },
  { step:'04', title:'Kiểm Định Q-Grade', icon:'verified', desc:'Cupping bởi Q-Grader đạt chuẩn SCA.' },
  { step:'05', title:'Đóng Gói', icon:'inventory_2', desc:'Túi valve một chiều, đóng gói trong 48h sau rang.' },
  { step:'06', title:'Giao Tận Nhà', icon:'local_shipping', desc:'Miễn phí vận chuyển toàn quốc, đến trong 24h.' },
]

export default function RoasteryDemo() {
  const [selectedCoffee, setSelectedCoffee] = useState(coffees[0])
  const [cart, setCart] = useState<typeof coffees>([])
  const [grind, setGrind] = useState('Nguyên hạt')
  const [subPlan, setSubPlan] = useState<string|null>(null)
  const [checkoutDone, setCheckoutDone] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-[#f8f4ef] text-[#1a1008] overflow-x-hidden" style={{fontFamily:"'Georgia', serif"}}>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button className="relative bg-[#1a1008] text-[#f8f4ef] text-xs font-sans px-3 py-2 rounded-full flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">shopping_bag</span>
          {cart.length>0&&<span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">{cart.length}</span>}
        </button>
        <Link href="/templates" className="flex items-center gap-1.5 bg-[#1a1008]/80 backdrop-blur border border-white/20 text-white text-xs font-sans font-semibold px-3 py-2 rounded-full hover:bg-[#1a1008] transition-all">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#f8f4ef]/90 backdrop-blur-xl border-b border-[#1a1008]/8">
        <div className="max-w-[1400px] mx-auto px-10 h-16 flex items-center justify-between">
          <div className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-[#1a1008]/40">Specialty Coffee · Hà Nội</div>
          <div className="text-2xl font-bold tracking-[0.05em]">TERRA ROAST</div>
          <div className="hidden md:flex gap-8 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-[#1a1008]/50">
            {['Cà Phê','Đăng Ký','Quy Trình','Câu Chuyện'].map(n=>(
              <a key={n} href="#" className="hover:text-[#1a1008] transition-colors">{n}</a>
            ))}
          </div>
          <button className="font-sans bg-[#1a1008] text-[#f8f4ef] text-xs font-bold px-5 py-2.5 uppercase tracking-widest hover:bg-[#3d2c1a] transition-colors">
            Mua Ngay
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-16">
        <div className="flex flex-col justify-center px-10 md:px-20 py-20">
          <div className="text-xs font-sans uppercase tracking-[0.4em] text-[#8b7355] mb-8">Rang Thủ Công · Hà Nội · Kể Từ 2019</div>
          <h1 className="text-7xl md:text-[100px] font-bold leading-[0.88] tracking-tight mb-10">
            FROM<br />
            BEAN<br />
            <span className="italic text-[#8b7355]">to Cup.</span>
          </h1>
          <p className="text-[#1a1008]/60 font-sans text-base leading-relaxed max-w-sm mb-10">
            Chúng tôi đến tận nông trại Ethiopia, Colombia và Guatemala để mang về những hạt cà phê đặc sản tốt nhất. Rang từng mẻ nhỏ, kiểm định bởi Q-Grader.
          </p>
          <div className="flex gap-4">
            <button onClick={()=>document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})} className="bg-[#1a1008] text-[#f8f4ef] font-sans font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#3d2c1a] transition-colors">
              Khám Phá Cà Phê
            </button>
            <button onClick={()=>document.getElementById('subscribe')?.scrollIntoView({behavior:'smooth'})} className="border border-[#1a1008]/20 text-[#1a1008] font-sans text-sm px-8 py-4 uppercase tracking-widest hover:border-[#1a1008] transition-colors">
              Gói Đăng Ký
            </button>
          </div>
        </div>
        <div className="relative hidden lg:block bg-[#1a1008] overflow-hidden min-h-[600px]">
          <Image src={selectedCoffee.image} alt="Coffee" fill className="object-cover opacity-80 mix-blend-luminosity" unoptimized />
          <div className="absolute bottom-10 left-10 bg-[#f8f4ef]/90 backdrop-blur rounded-2xl p-5 max-w-[190px]">
            <p className="text-xs font-sans font-semibold uppercase tracking-wider text-[#8b7355] mb-1">SCA Score</p>
            <p className="text-4xl font-bold">{selectedCoffee.score}+</p>
            <p className="text-xs text-[#1a1008]/50 font-sans">Specialty Grade</p>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="py-24 bg-[#1a1008] text-[#f8f4ef]">
        <div className="px-10 md:px-20 max-w-[1400px] mx-auto">
          <div className="mb-14">
            <span className="text-[#8b7355] text-xs font-sans uppercase tracking-[0.3em] block mb-3">Cửa Hàng</span>
            <h2 className="text-5xl font-bold">Chọn Cà Phê</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product list */}
            <div className="space-y-3">
              {coffees.map(c=>(
                <button key={c.id} onClick={()=>setSelectedCoffee(c)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all ${selectedCoffee.id===c.id?'border-[#8b7355] bg-[#2a1f14]':'border-[#f8f4ef]/10 hover:border-[#8b7355]/40'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-[#8b7355] font-sans uppercase tracking-widest mb-1">{c.region}</p>
                      <p className="font-bold">{c.name}</p>
                    </div>
                    <span className="text-[#8b7355] font-sans font-bold text-sm">{c.score} pts</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {c.flavor.map(f=><span key={f} className="text-[10px] border border-[#f8f4ef]/15 text-[#f8f4ef]/50 px-2 py-0.5 rounded font-sans">{f}</span>)}
                  </div>
                </button>
              ))}
            </div>

            {/* Product detail */}
            <div className="lg:col-span-2 bg-[#2a1f14] rounded-3xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-56 rounded-2xl overflow-hidden">
                  <Image src={selectedCoffee.image} alt={selectedCoffee.name} fill className="object-cover" unoptimized />
                </div>
                <div>
                  <p className="text-[#8b7355] text-xs font-sans uppercase tracking-[0.3em] mb-2">{selectedCoffee.region}</p>
                  <h3 className="text-2xl font-bold mb-4">{selectedCoffee.name}</h3>
                  <div className="grid grid-cols-2 gap-3 mb-5 text-sm font-sans">
                    {[['Rang','⚙ '+selectedCoffee.roast],['Process','◈ '+selectedCoffee.process],['Altitude','↑ '+selectedCoffee.altitude],['Score','★ '+selectedCoffee.score+'/100']].map(([k,v])=>(
                      <div key={k} className="bg-[#1a1008]/40 rounded-xl p-3">
                        <p className="text-[#f8f4ef]/40 text-xs mb-0.5">{k}</p>
                        <p className="font-semibold text-[#f8f4ef]">{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {['Nguyên hạt','Xay Moka','Xay Pour Over','Xay French Press'].map(g=>(
                      <button key={g} onClick={()=>setGrind(g)} className={`text-xs font-sans px-3 py-1.5 rounded-full border transition-all ${grind===g?'border-[#8b7355] bg-[#8b7355]/20 text-[#8b7355]':'border-[#f8f4ef]/15 text-[#f8f4ef]/50 hover:border-[#8b7355]/40'}`}>
                        {g}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-[#f8f4ef]">{selectedCoffee.price.toLocaleString()}đ</p>
                      <p className="text-[#f8f4ef]/40 font-sans text-xs">{selectedCoffee.weight} · Rang mới nhất</p>
                    </div>
                    <button onClick={()=>setCart(c=>[...c,selectedCoffee])} className="bg-[#f8f4ef] text-[#1a1008] font-sans font-bold px-6 py-3 rounded-xl uppercase tracking-widest text-sm hover:bg-[#d4a855] transition-colors">
                      Thêm giỏ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-10 md:px-20 max-w-[1400px] mx-auto">
        <div className="mb-14">
          <span className="text-[#8b7355] text-xs font-sans uppercase tracking-[0.3em] block mb-3">Quy Trình</span>
          <h2 className="text-5xl font-bold">Từ Nông Trại Đến Tay Bạn</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {process.map((p,i)=>(
            <div key={p.step} className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-[#1a1008] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8b7355] transition-colors">
                <span className="material-symbols-outlined text-[#f8f4ef] text-2xl">{p.icon}</span>
              </div>
              <p className="text-[#8b7355]/40 font-sans text-xs mb-1">{p.step}</p>
              <h3 className="font-bold text-sm mb-2">{p.title}</h3>
              <p className="text-[#1a1008]/60 font-sans text-xs leading-relaxed">{p.desc}</p>
              {i<process.length-1 && <div className="hidden lg:block absolute right-0 top-7 text-[#1a1008]/20">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <section id="subscribe" className="py-24 bg-[#1a1008] text-[#f8f4ef]">
        <div className="px-10 md:px-20 max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#8b7355] text-xs font-sans uppercase tracking-[0.3em] block mb-3">Đăng Ký Định Kỳ</span>
            <h2 className="text-5xl font-bold mb-4">Cà Phê Tươi Mỗi Tháng</h2>
            <p className="font-sans text-[#f8f4ef]/50">Rang tươi, giao nhanh, ưu đãi thành viên −10%</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12">
            {subscriptions.map(sub=>(
              <div key={sub.name} onClick={()=>setSubPlan(sub.name)} className={`rounded-2xl p-7 border cursor-pointer transition-all ${subPlan===sub.name?'border-[#8b7355] bg-[#2a1f14]':sub.hot?'border-[#8b7355]/40 bg-[#2a1f14]/50':'border-[#f8f4ef]/10 hover:border-[#8b7355]/30'}`}>
                {sub.hot && <span className="text-[10px] bg-[#8b7355]/30 text-[#8b7355] font-sans font-bold px-3 py-0.5 rounded-full uppercase tracking-widest block mb-3 w-fit">Phổ biến</span>}
                <h3 className="font-bold text-xl mb-2">{sub.name}</h3>
                <p className="text-3xl font-bold text-[#f8f4ef] mb-2">{sub.price.toLocaleString()}đ</p>
                <p className="font-sans text-[#f8f4ef]/50 text-xs mb-1">{sub.freq}</p>
                <p className="font-sans text-sm text-[#f8f4ef]/70">{sub.detail}</p>
              </div>
            ))}
          </div>
          {!checkoutDone ? (
            <div className="max-w-sm mx-auto flex gap-3">
              <input type="email" placeholder="Email của bạn" value={email} onChange={e=>setEmail(e.target.value)}
                className="flex-1 bg-[#f8f4ef]/8 border border-[#f8f4ef]/15 rounded-lg px-4 py-3 font-sans text-sm text-[#f8f4ef] placeholder:text-[#f8f4ef]/30 focus:border-[#8b7355] outline-none" />
              <button onClick={()=>setCheckoutDone(true)} className="bg-[#f8f4ef] text-[#1a1008] font-sans font-bold px-6 py-3 rounded-lg uppercase tracking-widest text-xs hover:bg-[#d4a855] transition-colors whitespace-nowrap">
                Đăng Ký
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl mb-2">☕</p>
              <p className="font-sans text-[#f8f4ef]/70">Đã đăng ký! Kiểm tra email để xác nhận.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-[#1a1008] border-t border-[#f8f4ef]/10 py-10 px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold tracking-[0.05em] text-[#f8f4ef]">TERRA ROAST</div>
          <p className="font-sans text-[#f8f4ef]/30 text-sm">© 2025 · Mẫu giao diện bởi <span className="text-[#8b7355]">Vaitech</span></p>
          <div className="font-sans flex gap-5 text-[#f8f4ef]/40 text-sm">
            <span>📍 12 Ngõ Huyện, Hoàn Kiếm</span>
            <span>☕ Mon–Sun 8:00–20:00</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
