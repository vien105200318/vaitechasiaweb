'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const products = [
  { id:1, name:'Wireless Noise-Cancelling Headphones', brand:'SoundPro X1', price:2490000, original:3200000, rating:4.8, reviews:2847, tag:'Best Seller', cat:'Âm Thanh', colors:['#1a1a1a','#f5f5f5','#1e40af'] },
  { id:2, name:'Smart Watch Ultra Series 5', brand:'TechTime', price:5990000, original:7500000, rating:4.9, reviews:1204, tag:'New', cat:'Đồng Hồ', colors:['#1a1a1a','#7f1d1d','#166534'] },
  { id:3, name:'Mechanical Keyboard TKL RGB', brand:'KeyMaster', price:1890000, original:2200000, rating:4.7, reviews:892, tag:'Sale', cat:'Phụ Kiện', colors:['#1a1a1a','#ffffff'] },
  { id:4, name:'4K Webcam Pro 60fps', brand:'VisionCam', price:1290000, original:1590000, rating:4.6, reviews:543, tag:null, cat:'Phụ Kiện', colors:['#1a1a1a'] },
  { id:5, name:'Portable SSD 2TB NVMe', brand:'SpeedDisk', price:1750000, original:2100000, rating:4.8, reviews:1876, tag:'Best Seller', cat:'Lưu Trữ', colors:['#1a1a1a','#374151'] },
  { id:6, name:'USB-C Hub 12-in-1', brand:'ConnectHub', price:890000, original:1200000, rating:4.5, reviews:3241, tag:null, cat:'Phụ Kiện', colors:['#6b7280','#1a1a1a'] },
  { id:7, name:'Gaming Mouse 16000 DPI', brand:'ProGamer', price:1190000, original:1490000, rating:4.7, reviews:2103, tag:'Sale', cat:'Gaming', colors:['#1a1a1a','#dc2626'] },
  { id:8, name:'Smart LED Desk Lamp', brand:'LuxLight', price:690000, original:890000, rating:4.4, reviews:687, tag:null, cat:'Phòng Làm Việc', colors:['#f5f5f5','#1a1a1a','#fbbf24'] },
]

const IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe'

export default function EcommerceDemo() {
  const [cart, setCart] = useState<{id:number,name:string,price:number,qty:number}[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [filter, setFilter] = useState('Tất Cả')
  const [search, setSearch] = useState('')
  const [checkoutStep, setCheckoutStep] = useState(0)

  const cats = ['Tất Cả',...Array.from(new Set(products.map(p=>p.cat)))]
  const filtered = products.filter(p=>(filter==='Tất Cả'||p.cat===filter)&&(!search||p.name.toLowerCase().includes(search.toLowerCase())))
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0)
  const cartCount = cart.reduce((s,i)=>s+i.qty,0)

  const addToCart = (p:typeof products[0]) => {
    setCart(c=>{const ex=c.find(i=>i.id===p.id);return ex?c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...c,{id:p.id,name:p.name,price:p.price,qty:1}]})
  }
  const removeFromCart = (id:number) => setCart(c=>c.filter(i=>i.id!==id))
  const toggleWishlist = (id:number) => setWishlist(w=>w.includes(id)?w.filter(i=>i!==id):[...w,id])
  const discount = (p:number,o:number) => Math.round((1-p/o)*100)

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#111] overflow-x-hidden font-sans">
      {/* Cart Sidebar */}
      {cartOpen&&(
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={()=>setCartOpen(false)}/>
          <div className="relative w-96 bg-white h-full flex flex-col shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b bg-gray-50">
              <div><h3 className="font-bold text-lg">Giỏ hàng</h3><p className="text-xs text-gray-500">{cartCount} sản phẩm</p></div>
              <button onClick={()=>setCartOpen(false)} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"><span className="material-symbols-outlined text-lg">close</span></button>
            </div>

            {checkoutStep===0?(
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {cart.length===0?<div className="text-center py-12"><span className="material-symbols-outlined text-4xl text-gray-300 block mb-3">shopping_cart</span><p className="text-gray-400">Giỏ hàng trống</p></div>:
                  cart.map(item=>(
                    <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-white border flex-shrink-0 relative"><Image src={IMG} alt={item.name} fill className="object-cover" unoptimized/></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs leading-tight truncate mb-1">{item.name}</p>
                        <p className="text-blue-600 font-bold text-sm">{item.price.toLocaleString()}đ</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button onClick={()=>setCart(c=>c.map(i=>i.id===item.id&&i.qty>1?{...i,qty:i.qty-1}:i))} className="w-5 h-5 rounded bg-gray-200 flex items-center justify-center text-xs font-bold hover:bg-gray-300">−</button>
                          <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                          <button onClick={()=>setCart(c=>c.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i))} className="w-5 h-5 rounded bg-gray-200 flex items-center justify-center text-xs font-bold hover:bg-gray-300">+</button>
                        </div>
                      </div>
                      <button onClick={()=>removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors self-start"><span className="material-symbols-outlined text-base">delete_outline</span></button>
                    </div>
                  ))}
                </div>
                {cart.length>0&&(
                  <div className="p-5 border-t bg-gray-50">
                    <div className="flex justify-between mb-2 text-sm"><span className="text-gray-500">Tạm tính</span><span className="font-semibold">{total.toLocaleString()}đ</span></div>
                    <div className="flex justify-between mb-4 text-sm"><span className="text-gray-500">Phí vận chuyển</span><span className="text-green-600 font-semibold">Miễn phí</span></div>
                    <div className="flex justify-between mb-5 font-bold text-lg border-t pt-4"><span>Tổng cộng</span><span className="text-blue-600">{total.toLocaleString()}đ</span></div>
                    <button onClick={()=>setCheckoutStep(1)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors">Tiến Hành Thanh Toán →</button>
                  </div>
                )}
              </>
            ):(
              <div className="flex-1 overflow-y-auto p-6">
                {checkoutStep<3?(
                  <>
                    <div className="flex gap-2 mb-6">
                      {['Địa chỉ','Thanh toán','Xác nhận'].map((s,i)=>(
                        <div key={s} className={`flex-1 text-center text-xs py-1.5 rounded-full font-semibold transition-all ${checkoutStep-1>=i?'bg-blue-600 text-white':'bg-gray-100 text-gray-400'}`}>{s}</div>
                      ))}
                    </div>
                    {checkoutStep===1&&(
                      <div className="space-y-4">
                        <h4 className="font-bold text-lg">Địa chỉ giao hàng</h4>
                        {[{l:'Họ tên',p:'Nguyễn Văn A'},{l:'Số điện thoại',p:'0912 345 678'},{l:'Địa chỉ',p:'123 Đường ABC'},{l:'Thành phố',p:'Đà Nẵng'}].map(f=>(
                          <input key={f.l} placeholder={f.p} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"/>
                        ))}
                        <button onClick={()=>setCheckoutStep(2)} className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors">Tiếp Theo →</button>
                      </div>
                    )}
                    {checkoutStep===2&&(
                      <div className="space-y-4">
                        <h4 className="font-bold text-lg">Phương thức thanh toán</h4>
                        {['💳 Thẻ tín dụng/ghi nợ','🏦 Chuyển khoản ngân hàng','📱 MoMo / ZaloPay','💵 Thanh toán khi nhận hàng'].map(m=>(
                          <label key={m} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 transition-colors">
                            <input type="radio" name="payment" className="text-blue-600"/><span className="text-sm font-medium">{m}</span>
                          </label>
                        ))}
                        <button onClick={()=>setCheckoutStep(3)} className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors">Đặt Hàng</button>
                      </div>
                    )}
                  </>
                ):(
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-green-500 text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h3>
                    <p className="text-gray-500 text-sm mb-2">Mã đơn: <strong>#VT{Math.floor(Math.random()*90000+10000)}</strong></p>
                    <p className="text-gray-500 text-sm">Dự kiến giao: <strong>2–3 ngày</strong></p>
                    <button onClick={()=>{setCheckoutStep(0);setCart([]);setCartOpen(false)}} className="mt-6 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm">Tiếp tục mua sắm</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="fixed top-4 right-4 z-40">
        <Link href="/templates" className="flex items-center gap-2 bg-[#111]/80 backdrop-blur border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#111] transition-all">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Templates
        </Link>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-30 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white font-black text-sm">VT</span></div>
              <span className="font-black text-lg tracking-tight">TechShop<span className="text-blue-600">.</span></span>
            </div>
            <div className="flex-1 max-w-md mx-8 hidden md:block relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Tìm kiếm sản phẩm..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-blue-500 outline-none bg-gray-50"/>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-gray-600"><span className="material-symbols-outlined">person_outline</span></button>
              <button className="text-gray-400 hover:text-gray-600 relative"><span className="material-symbols-outlined">favorite_border</span>{wishlist.length>0&&<span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center">{wishlist.length}</span>}</button>
              <button onClick={()=>setCartOpen(true)} className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-base">shopping_cart</span>
                Giỏ hàng
                {cartCount>0&&<span className="bg-white text-blue-600 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>}
              </button>
            </div>
          </div>
          <div className="hidden md:flex gap-6 pb-2 text-sm text-gray-500">
            {cats.map(c=>(
              <button key={c} onClick={()=>setFilter(c)} className={`py-1.5 transition-all ${filter===c?'text-blue-600 font-semibold border-b-2 border-blue-600':'hover:text-gray-800'}`}>{c}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="pt-24 px-6 max-w-[1280px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-900 h-72 flex items-center">
          <div className="absolute inset-0 opacity-20"><Image src={IMG} alt="Banner" fill className="object-cover" unoptimized/></div>
          <div className="relative z-10 px-10">
            <p className="text-blue-300 text-sm font-semibold mb-2">⚡ Flash Sale hôm nay</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Giảm Đến <span className="text-yellow-400">50%</span><br/>Phụ Kiện Tech</h1>
            <p className="text-white/70 mb-6 text-sm">Còn <strong className="text-white">02:47:23</strong> nữa kết thúc</p>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-[#111] font-black px-8 py-3 rounded-xl text-sm transition-colors">Mua Ngay →</button>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="w-52 h-52 bg-white/10 backdrop-blur rounded-3xl border border-white/20 overflow-hidden relative">
              <Image src={IMG} alt="Featured Product" fill className="object-cover" unoptimized/>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-10 px-6 max-w-[1280px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div><h2 className="text-2xl font-black">Sản Phẩm Nổi Bật</h2><p className="text-gray-400 text-sm mt-0.5">{filtered.length} sản phẩm</p></div>
          <select className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:border-blue-500 outline-none bg-white">
            {['Phổ biến nhất','Giá thấp nhất','Giá cao nhất','Mới nhất','Đánh giá cao'].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p=>(
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
              <div className="relative h-44 bg-gray-50 overflow-hidden">
                <Image src={IMG} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500 p-4" unoptimized/>
                {p.tag&&<span className={`absolute top-2 left-2 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${p.tag==='Sale'?'bg-red-500 text-white':p.tag==='New'?'bg-green-500 text-white':'bg-blue-500 text-white'}`}>{p.tag}</span>}
                <button onClick={()=>toggleWishlist(p.id)} className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-base" style={{fontVariationSettings:wishlist.includes(p.id)?"'FILL' 1":"'FILL' 0",color:wishlist.includes(p.id)?'#ef4444':'#9ca3af'}}>{wishlist.includes(p.id)?'favorite':'favorite'}</span>
                </button>
                <div className="flex gap-1 absolute bottom-2 left-2">
                  {p.colors.map((c,i)=><div key={i} className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm" style={{background:c}}/>)}
                </div>
              </div>
              <div className="p-4">
                <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider mb-1">{p.brand}</p>
                <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2">{p.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-yellow-400 text-xs">{'★'.repeat(Math.floor(p.rating))}</span>
                  <span className="text-xs text-gray-400">({p.reviews.toLocaleString()})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-black text-base text-blue-600">{p.price.toLocaleString()}đ</p>
                    <p className="text-xs text-gray-400 line-through">{p.original.toLocaleString()}đ <span className="text-red-500 no-underline">−{discount(p.price,p.original)}%</span></p>
                  </div>
                  <button onClick={()=>addToCart(p)} className="w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors hover:scale-110 active:scale-95">
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {[{icon:'local_shipping',t:'Miễn phí vận chuyển',d:'Đơn từ 500.000đ'},{icon:'replay',t:'Đổi trả 30 ngày',d:'Không cần lý do'},{icon:'security',t:'Bảo hành chính hãng',d:'1–2 năm'},{icon:'support_agent',t:'Hỗ trợ 24/7',d:'Chat & hotline'}].map(f=>(
            <div key={f.t} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-blue-600 text-xl">{f.icon}</span>
              </div>
              <div><p className="font-semibold text-sm">{f.t}</p><p className="text-xs text-gray-400">{f.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#111] text-white/40 py-10 px-6 text-center text-sm">
        © 2025 TechShop · Mẫu giao diện bởi <span className="text-blue-400">Vaitech</span>
      </footer>
    </div>
  )
}
