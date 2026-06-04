'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const collections = [
  { id:1, name:'Oversized Linen Set', price:1290000, tag:'New In', color:'Trắng kem', sizes:['XS','S','M','L','XL'], cat:'Áo' },
  { id:2, name:'Wide-Leg Palazzo', price:890000, tag:'Bestseller', color:'Đen', sizes:['S','M','L'], cat:'Quần' },
  { id:3, name:'Silk Wrap Dress', price:2100000, tag:'Limited', color:'Nude', sizes:['XS','S','M'], cat:'Đầm' },
  { id:4, name:'Structured Blazer', price:1750000, tag:null, color:'Xám bụi', sizes:['S','M','L','XL'], cat:'Áo khoác' },
  { id:5, name:'Crop Camisole', price:650000, tag:'Sale -30%', color:'Trắng', sizes:['XS','S','M','L'], cat:'Áo' },
  { id:6, name:'Pleated Midi Skirt', price:980000, tag:'New In', color:'Camel', sizes:['S','M','L'], cat:'Chân váy' },
]

const IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl'

export default function FashionDemo() {
  const [cart, setCart] = useState<{name:string,price:number,size:string}[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [sizes, setSizes] = useState<Record<number,string>>({})
  const [filter, setFilter] = useState('Tất Cả')
  const [wishlist, setWishlist] = useState<number[]>([])

  const cats = ['Tất Cả',...Array.from(new Set(collections.map(c=>c.cat)))]
  const filtered = filter==='Tất Cả'?collections:collections.filter(c=>c.cat===filter)
  const total = cart.reduce((s,i)=>s+i.price,0)

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1714] overflow-x-hidden font-sans">
      {cartOpen&&(
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={()=>setCartOpen(false)}/>
          <div className="relative w-80 bg-white h-full overflow-y-auto flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b"><h3 className="font-bold text-lg">Giỏ hàng ({cart.length})</h3><button onClick={()=>setCartOpen(false)}><span className="material-symbols-outlined">close</span></button></div>
            <div className="flex-1 p-6 space-y-4">
              {cart.length===0?<p className="text-[#1a1714]/40 text-sm text-center py-8">Chưa có sản phẩm</p>:cart.map((i,idx)=>(
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-14 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative"><Image src={IMG} alt={i.name} fill className="object-cover" unoptimized/></div>
                  <div className="flex-1 min-w-0"><p className="font-semibold text-sm leading-tight truncate">{i.name}</p><p className="text-xs text-[#1a1714]/50 mt-0.5">Size: {i.size}</p><p className="font-bold text-sm mt-1">{i.price.toLocaleString()}đ</p></div>
                  <button onClick={()=>setCart(c=>c.filter((_,j)=>j!==idx))} className="text-[#1a1714]/30 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-base">delete</span></button>
                </div>
              ))}
            </div>
            {cart.length>0&&<div className="p-6 border-t"><div className="flex justify-between mb-4"><span className="font-semibold">Tổng cộng</span><span className="font-bold text-lg">{total.toLocaleString()}đ</span></div><button className="w-full bg-[#1a1714] text-white font-bold py-3.5 rounded-xl hover:bg-black transition-colors">Thanh Toán</button></div>}
          </div>
        </div>
      )}

      <div className="fixed top-4 right-4 z-40 flex gap-2">
        <button onClick={()=>setCartOpen(true)} className="relative bg-[#1a1714] text-white text-xs font-bold px-3 py-2 rounded-full flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">shopping_bag</span>
          {cart.length>0&&<><span>{cart.length}</span><span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">{cart.length}</span></>}
        </button>
        <Link href="/templates" className="flex items-center gap-1.5 bg-[#1a1714]/80 backdrop-blur border border-white/20 text-white text-xs font-semibold px-3 py-2 rounded-full">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
        </Link>
      </div>

      <nav className="fixed top-0 w-full z-30 bg-[#faf9f7]/95 backdrop-blur border-b border-[#1a1714]/8">
        <div className="max-w-[1280px] mx-auto px-8 h-14 flex items-center justify-between">
          <div className="text-xl font-bold tracking-[0.15em] uppercase">AUREL<span className="text-rose-400">.</span></div>
          <div className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] text-[#1a1714]/60">{['New In','Collections','Sale','About'].map(n=><a key={n} href="#" className="hover:text-[#1a1714] transition-colors">{n}</a>)}</div>
          <div className="flex gap-3 text-[#1a1714]/60">
            <button className="hover:text-[#1a1714] transition-colors"><span className="material-symbols-outlined text-xl">search</span></button>
            <button className="hover:text-[#1a1714] transition-colors"><span className="material-symbols-outlined text-xl">person</span></button>
            <button onClick={()=>setCartOpen(true)} className="hover:text-[#1a1714] transition-colors relative">
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              {cart.length>0&&<span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#1a1714] rounded-full text-white text-[9px] flex items-center justify-center">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-14 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative overflow-hidden min-h-[60vh] lg:min-h-screen">
          <Image src={IMG} alt="Fashion Hero" fill className="object-cover" unoptimized priority/>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#faf9f7]/20"/>
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur rounded-2xl p-4">
            <p className="text-xs uppercase tracking-widest text-rose-500 font-semibold mb-0.5">New Arrival</p>
            <p className="font-bold">Summer Linen Collection</p>
            <p className="text-sm text-[#1a1714]/60">Từ 650.000đ</p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-10 md:px-16 py-20 bg-[#f5ede6]">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-400 mb-5">Bộ Sưu Tập 2025</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] mb-8 tracking-tight">
            Effortless<br/><span className="italic font-light">Elegance</span>
          </h1>
          <p className="text-[#1a1714]/60 leading-relaxed mb-8 max-w-xs">Trang phục nữ cao cấp — thiết kế tối giản, chất liệu tự nhiên, vẻ đẹp bền vững theo thời gian.</p>
          <div className="flex gap-4">
            <button className="bg-[#1a1714] text-white font-bold px-8 py-4 hover:bg-black transition-colors text-sm uppercase tracking-widest">
              Shop Now
            </button>
            <button className="border-b-2 border-[#1a1714] text-[#1a1714] font-bold px-2 py-4 text-sm uppercase tracking-widest">
              Lookbook →
            </button>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section className="py-20 px-8 max-w-[1280px] mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-bold">Sản Phẩm</h2>
          <div className="flex flex-wrap gap-2">
            {cats.map(c=>(
              <button key={c} onClick={()=>setFilter(c)} className={`px-5 py-2 text-xs uppercase tracking-widest transition-all ${filter===c?'bg-[#1a1714] text-white':'border border-[#1a1714]/20 text-[#1a1714]/60 hover:border-[#1a1714]'}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map(item=>(
            <div key={item.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                <Image src={IMG} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized/>
                {item.tag&&<span className={`absolute top-3 left-3 text-[10px] font-bold px-3 py-1 uppercase tracking-wider ${item.tag.includes('Sale')?'bg-red-500 text-white':'bg-white text-[#1a1714]'}`}>{item.tag}</span>}
                <button onClick={()=>setWishlist(w=>w.includes(item.id)?w.filter(i=>i!==item.id):[...w,item.id])} className="absolute top-3 right-3">
                  <span className="material-symbols-outlined text-xl" style={{fontVariationSettings:wishlist.includes(item.id)?"'FILL' 1":"'FILL' 0",color:wishlist.includes(item.id)?'#ef4444':'#1a1714'}}>{wishlist.includes(item.id)?'favorite':'favorite'}</span>
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-[#1a1714] text-white p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {item.sizes.map(s=>(
                      <button key={s} onClick={e=>{e.stopPropagation();setSizes({...sizes,[item.id]:s})}} className={`w-8 h-8 text-xs font-bold border transition-all ${sizes[item.id]===s?'bg-white text-[#1a1714] border-white':'border-white/40 hover:border-white'}`}>{s}</button>
                    ))}
                  </div>
                  <button onClick={()=>{if(sizes[item.id])setCart(c=>[...c,{name:item.name,price:item.price,size:sizes[item.id]}])}} disabled={!sizes[item.id]}
                    className="w-full text-xs font-bold uppercase tracking-widest py-2 bg-white text-[#1a1714] hover:bg-gray-100 transition-colors disabled:opacity-40">
                    {sizes[item.id]?'Thêm Vào Giỏ':'Chọn Size Trước'}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div><h3 className="font-semibold text-sm mb-0.5">{item.name}</h3><p className="text-xs text-[#1a1714]/50">{item.color}</p></div>
                <p className="font-bold text-sm">{item.price.toLocaleString()}đ</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#1a1714] text-white/40 py-10 px-8 text-center text-sm">
        © 2025 AUREL Fashion · Mẫu bởi <span className="text-rose-400">Vaitech</span>
      </footer>
    </div>
  )
}
