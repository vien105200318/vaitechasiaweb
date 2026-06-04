'use client'
import { useState } from 'react'
import { ArrowLeft, Home, Search, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const properties = [
  { id:1, name:'Penthouse Sky Garden', area:'320m²', beds:4, baths:3, floor:'32F', price:18500000000, type:'Bán', tag:'HOT', city:'Hồ Chí Minh', district:'Quận 1' },
  { id:2, name:'Villa Biển Đà Nẵng', area:'450m²', beds:5, baths:4, floor:'Đất nền', price:12800000000, type:'Bán', tag:'Mới', city:'Đà Nẵng', district:'Ngũ Hành Sơn' },
  { id:3, name:'Căn Hộ 2PN Central Park', area:'78m²', beds:2, baths:2, floor:'18F', price:6200000, type:'Thuê', tag:null, city:'Hà Nội', district:'Tây Hồ' },
  { id:4, name:'Shophouse Thương Mại', area:'120m²', beds:0, baths:2, floor:'1F', price:9500000000, type:'Bán', tag:'Sắp mở', city:'Hồ Chí Minh', district:'Bình Thạnh' },
  { id:5, name:'Biệt Thự Compound An Phú', area:'280m²', beds:4, baths:3, floor:'Đất nền', price:35000000000, type:'Bán', tag:'Luxury', city:'Hồ Chí Minh', district:'Quận 2' },
  { id:6, name:'Studio Smart Home', area:'38m²', beds:1, baths:1, floor:'12F', price:3800000, type:'Thuê', tag:'Mới', city:'Đà Nẵng', district:'Sơn Trà' },
]

const IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO04BddMbSNQ6NeNP_QB43WinFa9-X2-jIGHegvTybTvFK5PIFe9SG43Vr_oas5GO4SeWyzKSC3G3gAQ2FhTXWCnmwDhBVYMgiPPZXTueFkeE-DBICLX3c7DY-gRLYzuDc_yjhY1uIevWCOLLtQXVMlro_Xm5uxrCfDmFxm4ZDh-DY2-bVVxhCEae82O3o5W2u-YFElzBsVEBgSrfVMJlfkximi6ApsbkHGg3vwDr_CyCFJOaUcTbfPUSTw9EsixJitb0QxhMaayVg'

const fmt = (n:number, type:string) => type==='Thuê'?`${n.toLocaleString()}đ/tháng`:`${(n/1000000000).toFixed(1)} tỷ`

export default function RealEstateDemo() {
  const [filter, setFilter] = useState('Tất Cả')
  const [selected, setSelected] = useState<typeof properties[0]|null>(null)
  const [contactForm, setContactForm] = useState({ name:'', phone:'', email:'', note:'' })
  const [contacted, setContacted] = useState(false)

  const filtered = filter==='Tất Cả'?properties:properties.filter(p=>p.type===filter)

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#1a1714] overflow-x-hidden font-sans">
      {selected&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={()=>setSelected(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"/>
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setSelected(null)} className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center"><X size={16} /></button>
            <div className="relative h-52 rounded-t-2xl overflow-hidden"><Image src={IMG} alt={selected.name} fill className="object-cover" unoptimized/></div>
            <div className="p-7">
              <div className="flex justify-between items-start mb-4">
                <div><h2 className="text-2xl font-bold mb-1">{selected.name}</h2><p className="text-[#1a1714]/50 text-sm">📍 {selected.district}, {selected.city}</p></div>
                <div className="text-right"><p className="text-2xl font-bold text-amber-700">{fmt(selected.price,selected.type)}</p><span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">{selected.type}</span></div>
              </div>
              <div className="grid grid-cols-4 gap-3 mb-6">
                {([['Diện tích',selected.area],['Phòng ngủ',selected.beds>0?`${selected.beds} PN`:'TM'],['Phòng tắm',`${selected.baths} WC`],['Tầng',selected.floor]] as [string,string][]).map(([label,val])=>(
                  <div key={label} className="bg-amber-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-amber-700 font-semibold mb-0.5">{label}</p>
                    <p className="text-xs font-semibold">{val}</p>
                  </div>
                ))}
              </div>
              {!contacted?(
                <form onSubmit={e=>{e.preventDefault();setContacted(true)}} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {[{k:'name',p:'Họ tên'},{k:'phone',p:'Số điện thoại'},{k:'email',p:'Email'}].map(f=>(
                      <div key={f.k} className={f.k==='email'?'col-span-2':''}>
                        <input placeholder={f.p} required value={contactForm[f.k as keyof typeof contactForm]} onChange={e=>setContactForm({...contactForm,[f.k]:e.target.value})}
                          className="w-full border border-[#1a1714]/12 rounded-xl px-4 py-2.5 text-sm focus:border-amber-500 outline-none"/>
                      </div>
                    ))}
                    <textarea placeholder="Thời gian xem nhà, yêu cầu..." rows={2} value={contactForm.note} onChange={e=>setContactForm({...contactForm,note:e.target.value})} className="col-span-2 border border-[#1a1714]/12 rounded-xl px-4 py-2.5 text-sm focus:border-amber-500 outline-none resize-none"/>
                  </div>
                  <button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3.5 rounded-xl transition-colors">Yêu Cầu Xem Nhà</button>
                </form>
              ):(
                <div className="bg-green-50 border border-green-300 rounded-xl p-5 text-center">
                  <p className="text-green-700 font-bold">Đã nhận yêu cầu! Môi giới liên hệ trong 30 phút.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-4 right-4 z-40">
        <Link href="/templates" className="flex items-center gap-2 bg-[#1a1714]/80 backdrop-blur border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#1a1714] transition-all">
          <ArrowLeft size={16} /> Templates
        </Link>
      </div>

      <nav className="fixed top-0 w-full z-30 bg-white/95 backdrop-blur border-b border-[#1a1714]/8 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-700 flex items-center justify-center"><Home size={16} /></div>
            <span className="font-bold text-lg tracking-tight">Premier<span className="text-amber-700">Homes</span></span>
          </div>
          <div className="hidden md:flex gap-7 text-sm text-[#1a1714]/60">{['Mua','Thuê','Dự Án','Định Giá','Tin Tức'].map(n=><a key={n} href="#" className="hover:text-amber-700 transition-colors">{n}</a>)}</div>
          <button className="bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">Tư Vấn Miễn Phí</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0"><Image src={IMG} alt="Real Estate" fill className="object-cover brightness-50" unoptimized priority/></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1714]/80 to-transparent"/>
        <div className="relative z-10 px-8 md:px-16 max-w-[1280px] mx-auto">
          <p className="text-amber-400 text-xs uppercase tracking-[0.4em] mb-4">Bất Động Sản Cao Cấp</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">Tìm Ngôi Nhà<br/>Mơ Ước Của Bạn</h1>
          <div className="bg-white rounded-2xl p-4 inline-flex flex-wrap gap-3 items-center shadow-2xl">
            <select className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-amber-500 outline-none bg-white">
              {['Tất cả loại','Căn hộ','Biệt thự','Shophouse','Đất nền'].map(o=><option key={o}>{o}</option>)}
            </select>
            <select className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-amber-500 outline-none bg-white">
              {['Tất cả tỉnh thành','Hồ Chí Minh','Hà Nội','Đà Nẵng','Bình Dương'].map(o=><option key={o}>{o}</option>)}
            </select>
            <input placeholder="Từ khoá: tên dự án, quận..." className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-amber-500 outline-none w-52 bg-white"/>
            <button className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2">
              <Search size={16} />Tìm Kiếm
            </button>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-16 px-8 max-w-[1280px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Bất Động Sản Nổi Bật</h2>
            <p className="text-[#1a1714]/50 mt-1">{filtered.length} bất động sản</p>
          </div>
          <div className="flex gap-2">
            {['Tất Cả','Bán','Thuê'].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${filter===f?'bg-amber-700 text-white':'bg-white border border-[#1a1714]/12 text-[#1a1714]/60 hover:border-amber-400'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p=>(
            <div key={p.id} onClick={()=>setSelected(p)} className="bg-white rounded-2xl overflow-hidden border border-[#1a1714]/8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <div className="relative h-52 overflow-hidden">
                <Image src={IMG} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized/>
                {p.tag&&<span className="absolute top-3 left-3 text-[10px] bg-amber-700 text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider">{p.tag}</span>}
                <span className="absolute top-3 right-3 text-[10px] bg-white/90 text-[#1a1714] font-bold px-3 py-1 rounded-full">{p.type}</span>
              </div>
              <div className="p-5">
                <p className="text-xs text-amber-700 font-semibold mb-1">{p.district}, {p.city}</p>
                <h3 className="font-bold text-lg mb-2 leading-tight">{p.name}</h3>
                <div className="flex gap-4 text-xs text-[#1a1714]/50 mb-4">
                  <span>📐 {p.area}</span>
                  {p.beds>0&&<span>🛏 {p.beds}PN</span>}
                  <span>🚿 {p.baths}WC</span>
                  <span>🏢 {p.floor}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-[#1a1714]/6">
                  <p className="font-bold text-xl text-amber-700">{fmt(p.price,p.type)}</p>
                  <button className="bg-amber-50 hover:bg-amber-700 text-amber-700 hover:text-white text-xs font-bold px-4 py-2 rounded-lg border border-amber-200 hover:border-amber-700 transition-all">
                    Xem Chi Tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#1a1714] text-white/40 py-10 px-8 text-center text-sm">
        © 2025 PremierHomes · Mẫu bởi <span className="text-amber-500">Vaitech</span>
      </footer>
    </div>
  )
}
