'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const menu = {
  'Khai Vị': [
    { name:'Gỏi Tôm Càng Sông', price:185000, desc:'Tôm sú, xoài xanh, rau thơm, nước mắm gừng', spicy:1 },
    { name:'Súp Bí Đỏ Truffle', price:145000, desc:'Bí đỏ hữu cơ, kem tươi, dầu truffle trắng', spicy:0 },
    { name:'Charcuterie Board', price:320000, desc:'Thịt nguội nhập khẩu, phô mai, mứt quả', spicy:0 },
  ],
  'Món Chính': [
    { name:'Bò Bít Tết Wagyu A5', price:890000, desc:'Wagyu Nhật Bản, khoai tây nghiền, sốt nấm truffle', spicy:0 },
    { name:'Cá Hồi Áp Chảo', price:485000, desc:'Cá hồi Na Uy, rau củ nướng, sốt chanh bơ', spicy:0 },
    { name:'Pasta Cua Biển', price:365000, desc:'Cua biển tươi, pasta tươi, cà chua cherry, basil', spicy:1 },
  ],
  'Tráng Miệng': [
    { name:'Soufflé Chocolate', price:185000, desc:'Chocolate 70%, vanilla gelato, thời gian chờ 15p', spicy:0 },
    { name:'Crème Brûlée', price:145000, desc:'Vanilla Madagascar, đường cháy tươi mỗi phần', spicy:0 },
  ],
}

const IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl'

export default function RestaurantDemo() {
  const [cat, setCat] = useState('Khai Vị')
  const [cart, setCart] = useState<{name:string,price:number}[]>([])
  const [resv, setResv] = useState({ name:'', phone:'', date:'', time:'', guests:'2', occasion:'' })
  const [resvDone, setResvDone] = useState(false)

  const total = cart.reduce((s,i)=>s+i.price,0)

  return (
    <div className="min-h-screen bg-[#1c1208] text-[#f0e6d3] overflow-x-hidden" style={{fontFamily:"'Playfair Display', 'Georgia', serif"}}>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button className="relative bg-[#c8963c] text-[#1c1208] text-xs font-sans font-bold px-3 py-2 rounded-full flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">receipt</span>
          {cart.length>0&&<><span className="font-bold">{total.toLocaleString()}đ</span><span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-white text-[10px] flex items-center justify-center">{cart.length}</span></>}
        </button>
        <Link href="/templates" className="flex items-center gap-1.5 bg-[#f0e6d3]/10 backdrop-blur border border-[#f0e6d3]/20 text-[#f0e6d3] text-xs font-sans font-semibold px-3 py-2 rounded-full">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
        </Link>
      </div>

      <nav className="fixed top-0 w-full z-40 bg-[#1c1208]/90 backdrop-blur-xl border-b border-[#f0e6d3]/8">
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-[#c8963c]">Maison<span className="italic"> Saigon</span></div>
          <div className="hidden md:flex gap-8 text-sm font-sans text-[#f0e6d3]/60 uppercase tracking-widest">
            {['Thực Đơn','Câu Chuyện','Gallery','Đặt Bàn'].map(n=><a key={n} href="#" className="hover:text-[#c8963c] transition-colors">{n}</a>)}
          </div>
          <a href="#reservation" className="font-sans bg-[#c8963c] text-[#1c1208] text-xs font-bold px-5 py-2.5 rounded uppercase tracking-widest hover:bg-[#b8852c] transition-colors">Đặt Bàn</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0"><Image src={IMG} alt="Restaurant" fill className="object-cover brightness-40" unoptimized priority /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1208]/90 via-[#1c1208]/50 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 max-w-[1280px] mx-auto">
          <p className="text-[#c8963c] text-xs font-sans uppercase tracking-[0.5em] mb-5">Fine Dining · Sài Gòn</p>
          <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-6">
            Hương Vị<br/><span className="italic text-[#c8963c]">Tinh Tế</span><br/>Từ Tâm Hồn
          </h1>
          <p className="font-sans text-[#f0e6d3]/70 max-w-md mb-8 leading-relaxed">Sự hòa quyện của ẩm thực Việt Nam truyền thống và kỹ thuật Pháp tinh tế, được chắt lọc qua 20 năm đam mê.</p>
          <div className="flex gap-4">
            <a href="#menu" className="bg-[#c8963c] text-[#1c1208] font-sans font-bold px-8 py-4 rounded uppercase tracking-widest text-sm hover:bg-[#b8852c] transition-colors">Xem Thực Đơn</a>
            <a href="#reservation" className="border border-[#f0e6d3]/30 text-[#f0e6d3] font-sans text-sm px-8 py-4 rounded uppercase tracking-widest hover:border-[#c8963c] hover:text-[#c8963c] transition-colors">Đặt Bàn</a>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 hidden lg:block bg-[#1c1208]/80 backdrop-blur border border-[#f0e6d3]/15 rounded-2xl p-5 max-w-xs">
          <div className="flex gap-0.5 mb-2">{Array.from({length:5}).map((_,i)=><span key={i} className="text-[#c8963c]">★</span>)}</div>
          <p className="italic text-sm mb-2">"Bữa tối đáng nhớ nhất trong cuộc đời tôi."</p>
          <p className="font-sans text-xs text-[#f0e6d3]/50">— Michelin Guide Vietnam 2024</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-8 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#c8963c] text-xs font-sans uppercase tracking-[0.4em] block mb-5">Câu Chuyện Của Chúng Tôi</span>
            <h2 className="text-4xl font-bold mb-6">Chef Nguyễn Hoàng Long — 20 Năm Đam Mê</h2>
            <p className="font-sans text-[#f0e6d3]/70 leading-relaxed mb-4">Học việc tại Paris, thực tập tại Bocuse — Chef Long trở về Việt Nam với một sứ mệnh: tôn vinh nguyên liệu bản địa bằng kỹ thuật quốc tế.</p>
            <p className="font-sans text-[#f0e6d3]/70 leading-relaxed">Mỗi món ăn là một câu chuyện — về nguồn gốc, về mùa vụ, về tình yêu với ẩm thực Việt Nam.</p>
          </div>
          <div className="relative h-[450px] rounded-3xl overflow-hidden">
            <Image src={IMG} alt="Chef" fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1208]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-24 bg-[#120d05]">
        <div className="px-8 md:px-16 max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#c8963c] text-xs font-sans uppercase tracking-[0.4em] block mb-3">Thực Đơn</span>
            <h2 className="text-4xl font-bold">Tuyển Chọn Của Bếp Trưởng</h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {Object.keys(menu).map(c=>(
              <button key={c} onClick={()=>setCat(c)} className={`font-sans px-7 py-2.5 rounded-full text-sm font-semibold uppercase tracking-widest transition-all ${cat===c?'bg-[#c8963c] text-[#1c1208]':'border border-[#f0e6d3]/20 text-[#f0e6d3]/60 hover:border-[#c8963c] hover:text-[#c8963c]'}`}>{c}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {menu[cat as keyof typeof menu].map(item=>(
              <div key={item.name} className="bg-[#1c1208] border border-[#f0e6d3]/8 rounded-2xl p-6 hover:border-[#c8963c]/30 transition-all group">
                <div className="relative h-36 rounded-xl overflow-hidden mb-4">
                  <Image src={IMG} alt={item.name} fill className="object-cover brightness-75 group-hover:brightness-90 transition-all" unoptimized />
                  {item.spicy>0&&<span className="absolute top-2 right-2 text-xs bg-red-600/80 text-white font-sans px-2 py-0.5 rounded-full">🌶 Cay</span>}
                </div>
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="font-sans text-[#f0e6d3]/50 text-xs mb-4 leading-relaxed">{item.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#c8963c] font-sans font-bold text-lg">{item.price.toLocaleString()}đ</span>
                  <button onClick={()=>setCart(c=>[...c,item])} className="font-sans bg-[#c8963c]/20 hover:bg-[#c8963c] text-[#c8963c] hover:text-[#1c1208] text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider transition-all">
                    Gọi Món
                  </button>
                </div>
              </div>
            ))}
          </div>
          {cart.length>0&&<div className="mt-8 bg-[#c8963c]/10 border border-[#c8963c]/30 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-sm">{cart.length} món đã chọn · Tổng: <strong className="text-[#c8963c]">{total.toLocaleString()}đ</strong></p>
            <button className="font-sans bg-[#c8963c] text-[#1c1208] font-bold px-8 py-3 rounded-lg uppercase tracking-widest text-sm hover:bg-[#b8852c] transition-colors">Xác Nhận Gọi Món</button>
          </div>}
        </div>
      </section>

      {/* Reservation */}
      <section id="reservation" className="py-24 px-8 md:px-16 max-w-[900px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#c8963c] text-xs font-sans uppercase tracking-[0.4em] block mb-3">Đặt Bàn</span>
          <h2 className="text-4xl font-bold">Giữ Chỗ Bàn Của Bạn</h2>
          <p className="font-sans text-[#f0e6d3]/60 mt-3 text-sm">Nhà hàng mở cửa Thứ 3 – Chủ Nhật · 11:30–14:30 & 18:00–22:30</p>
        </div>
        {resvDone?(
          <div className="bg-[#c8963c]/10 border border-[#c8963c]/30 rounded-2xl p-10 text-center">
            <p className="text-4xl mb-4">🍽️</p>
            <h3 className="text-2xl font-bold mb-2">Đặt bàn thành công!</h3>
            <p className="font-sans text-[#f0e6d3]/60 text-sm">Xác nhận sẽ gửi qua SMS trong vài phút.</p>
          </div>
        ):(
          <form onSubmit={e=>{e.preventDefault();setResvDone(true)}} className="bg-[#120d05] border border-[#f0e6d3]/8 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {[{k:'name',l:'Họ tên',p:'Nguyễn Văn A',t:'text'},{k:'phone',l:'Điện thoại',p:'0912 345 678',t:'tel'},{k:'date',l:'Ngày',p:'',t:'date'},{k:'time',l:'Giờ',p:'',t:'time'}].map(f=>(
              <div key={f.k}>
                <label className="block text-xs font-sans uppercase tracking-wider text-[#f0e6d3]/40 mb-1.5">{f.l}</label>
                <input type={f.t} placeholder={f.p} required value={resv[f.k as keyof typeof resv]} onChange={e=>setResv({...resv,[f.k]:e.target.value})}
                  className="w-full bg-[#f0e6d3]/5 border border-[#f0e6d3]/12 rounded-xl px-4 py-3 font-sans text-sm text-[#f0e6d3] placeholder:text-[#f0e6d3]/25 focus:border-[#c8963c] outline-none transition-all"/>
              </div>
            ))}
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-[#f0e6d3]/40 mb-1.5">Số khách</label>
              <select value={resv.guests} onChange={e=>setResv({...resv,guests:e.target.value})} className="w-full bg-[#f0e6d3]/5 border border-[#f0e6d3]/12 rounded-xl px-4 py-3 font-sans text-sm text-[#f0e6d3] focus:border-[#c8963c] outline-none">
                {['1','2','3','4','5','6','7-10','10+'].map(g=><option key={g}>{g} khách</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-[#f0e6d3]/40 mb-1.5">Dịp đặc biệt</label>
              <select value={resv.occasion} onChange={e=>setResv({...resv,occasion:e.target.value})} className="w-full bg-[#f0e6d3]/5 border border-[#f0e6d3]/12 rounded-xl px-4 py-3 font-sans text-sm text-[#f0e6d3] focus:border-[#c8963c] outline-none">
                <option value="">Không có</option>
                {['Sinh nhật','Kỷ niệm','Cầu hôn','Họp mặt kinh doanh','Khác'].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-[#c8963c] text-[#1c1208] font-sans font-bold py-4 rounded-xl uppercase tracking-widest text-sm hover:bg-[#b8852c] transition-colors">
                Xác Nhận Đặt Bàn
              </button>
            </div>
          </form>
        )}
      </section>

      <footer className="border-t border-[#f0e6d3]/8 py-10 px-8 text-center font-sans text-[#f0e6d3]/30 text-sm">
        © 2025 Maison Saigon · Mẫu bởi <span className="text-[#c8963c]">Vaitech</span>
      </footer>
    </div>
  )
}
