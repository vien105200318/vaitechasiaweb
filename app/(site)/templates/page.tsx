'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  X, ExternalLink, Rocket, Eye, Paintbrush,
  Monitor, Tablet, Smartphone,
  Building2, Coffee, Layers, Bean, Hotel, UtensilsCrossed,
  Stethoscope, Home, Shirt, Dumbbell, Palette, ShoppingCart,
  Dices, Gamepad2,
  type LucideIcon,
} from 'lucide-react'

type DeviceType = 'desktop' | 'tablet' | 'mobile'
const DEVICES: { key: DeviceType; label: string; Icon: typeof Monitor; maxW: string }[] = [
  { key: 'desktop', label: 'Desktop', Icon: Monitor,   maxW: '100%'  },
  { key: 'tablet',  label: 'Tablet',  Icon: Tablet,    maxW: '768px' },
  { key: 'mobile',  label: 'Mobile',  Icon: Smartphone, maxW: '390px' },
]

const templates: {
  id: number; category: string; title: string; subtitle: string
  desc: string; longDesc: string; tags: string[]
  Icon: LucideIcon; demoHref: string; accentColor: string; image: string
}[] = [
  { id:1, category:'doanh-nghiep', title:'Doanh Nghiệp Chuyên Nghiệp', subtitle:'CORPORATE', desc:'Dark navy, split-screen, data-driven cho doanh nghiệp B2B.', longDesc:'Bố cục hướng dữ liệu với case studies, team grid, form liên hệ đầy đủ và metrics live. Thiết kế dark navy hiện đại.', tags:['Tối ưu SEO','Đa ngôn ngữ','Dark mode'], Icon:Building2, demoHref:'/demo/corporate', accentColor:'#3b82f6', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDO04BddMbSNQ6NeNP_QB43WinFa9-X2-jIGHegvTybTvFK5PIFe9SG43Vr_oas5GO4SeWyzKSC3G3gAQ2FhTXWCnmwDhBVYMgiPPZXTueFkeE-DBICLX3c7DY-gRLYzuDc_yjhY1uIevWCOLLtQXVMlro_Xm5uxrCfDmFxm4ZDh-DY2-bVVxhCEae82O3o5W2u-YFElzBsVEBgSrfVMJlfkximi6ApsbkHGg3vwDr_CyCFJOaUcTbfPUSTw9EsixJitb0QxhMaayVg' },
  { id:2, category:'quan-ca-phe', title:'Quán Cà Phê Ấm Cúng', subtitle:'CAFÉ', desc:'Warm amber, full-bleed ảnh, giỏ hàng online + đặt bàn.', longDesc:'Thực đơn phân category, giỏ hàng kéo ra, form đặt bàn, gallery, đánh giá khách hàng. Palette màu warm amber.', tags:['Đặt bàn online','Giỏ hàng','Order online'], Icon:Coffee, demoHref:'/demo/cafe', accentColor:'#d4a855', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuCB5M_Hwf_PXfFjo6A83bSrDEzKWuyQXflUIvHCEHe_dvBTJwOI7njhgTwS8G9GIr6GcLL9ZDmDEAMbypvVWZJHnDhhI90pibKYtUH5uTRfC2JlWxuG2cip8d2ZY96B3FfGZR-dg1bobwuKvJhbetKGPF5_Vq5Tkn3nwudTHfpjrZINXsziAGDDLn30VVFH5EfNg4ryZNUQmCwtpSEtiC8OidjJ_j0l9_Ox__6NQbWhm4wIjss0bOnbc1gW5RTW38xnRA0i9GdH12In' },
  { id:3, category:'doanh-nghiep', title:'Nền Tảng SaaS', subtitle:'SAAS / TECH', desc:'Purple gradient, live AI demo, pricing toggle, dashboard preview.', longDesc:'Input demo AI thực tế, toggle monthly/yearly pricing, FAQ accordion, form email signup. Dashboard widget fake.', tags:['Dashboard','Pricing table','AI demo'], Icon:Layers, demoHref:'/demo/saas', accentColor:'#a855f7', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe' },
  { id:4, category:'quan-ca-phe', title:'Xưởng Rang Specialty', subtitle:'COFFEE ROASTERY', desc:'Editorial luxury, shop chọn cà phê, gói đăng ký định kỳ.', longDesc:'Shop chọn nguồn gốc cà phê, chọn kiểu xay, thêm giỏ hàng, gói subscription, quy trình 6 bước. Minimal cream/black.', tags:['E-commerce','Subscription','Editorial'], Icon:Bean, demoHref:'/demo/roastery', accentColor:'#8b7355', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuC5YWIa9b59e3idcYzsuThgbqBGU0mEPt81SSB6qL0mZPgVBECVCowWv7CgOwyo5AzSeWtClMGPvEvIeCsLSpb8Aq_PT-5fUypLe_77D5vCcxXc3ifO7MT0TZXzFrlV20k8Xxe9CbsBC8Pkp05YvIhZXmUfSmAkD0C0GaesUx7hVTtog4oBnk7q690mOsyfbsx5_9VLn2IAGbbZSEakFIKs37UU2BseufJK-RxVS9-D2acGbLcmGn2Rkh_ayzZ0HrvnRufVBrOxvBeA' },
  { id:5, category:'khach-san', title:'Luxury Resort & Spa', subtitle:'HOTEL / RESORT', desc:'Full-bleed hero, đặt phòng trực tiếp, quick booking bar.', longDesc:'Quick booking bar trên hero, danh sách phòng với đặt ngay, awards bar, amenities grid. Dark gold luxury.', tags:['Booking system','Room listing','Gold luxury'], Icon:Hotel, demoHref:'/demo/hotel', accentColor:'#d4af6a', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl' },
  { id:6, category:'nha-hang', title:'Fine Dining Restaurant', subtitle:'RESTAURANT', desc:'Chef story, menu gọi món, đặt bàn theo dịp đặc biệt.', longDesc:'Menu phân loại có nút gọi món, form đặt bàn với dịp đặc biệt, story bếp trưởng, review. Dark warm brown.', tags:['Menu online','Đặt bàn','Gọi món'], Icon:UtensilsCrossed, demoHref:'/demo/restaurant', accentColor:'#c8963c', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDO04BddMbSNQ6NeNP_QB43WinFa9-X2-jIGHegvTybTvFK5PIFe9SG43Vr_oas5GO4SeWyzKSC3G3gAQ2FhTXWCnmwDhBVYMgiPPZXTueFkeE-DBICLX3c7DY-gRLYzuDc_yjhY1uIevWCOLLtQXVMlro_Xm5uxrCfDmFxm4ZDh-DY2-bVVxhCEae82O3o5W2u-YFElzBsVEBgSrfVMJlfkximi6ApsbkHGg3vwDr_CyCFJOaUcTbfPUSTw9EsixJitb0QxhMaayVg' },
  { id:7, category:'y-te', title:'Phòng Khám Đa Khoa', subtitle:'CLINIC / MEDICAL', desc:'Light blue, đặt lịch 6 bước, chọn bác sĩ, BHYT.', longDesc:'Form đặt lịch đầy đủ (chuyên khoa, bác sĩ, bảo hiểm), service grid, doctor cards. Light professional.', tags:['Đặt lịch khám','Chọn bác sĩ','BHYT'], Icon:Stethoscope, demoHref:'/demo/clinic', accentColor:'#2563eb', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl' },
  { id:8, category:'bat-dong-san', title:'Bất Động Sản Cao Cấp', subtitle:'REAL ESTATE', desc:'Listing grid, modal chi tiết, form yêu cầu xem nhà.', longDesc:'Filter Bán/Thuê, listing card đầy đủ thông số, modal popup chi tiết, form liên hệ môi giới. Amber luxury.', tags:['Property listing','Tìm kiếm','Yêu cầu xem'], Icon:Home, demoHref:'/demo/realestate', accentColor:'#b45309', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDO04BddMbSNQ6NeNP_QB43WinFa9-X2-jIGHegvTybTvFK5PIFe9SG43Vr_oas5GO4SeWyzKSC3G3gAQ2FhTXWCnmwDhBVYMgiPPZXTueFkeE-DBICLX3c7DY-gRLYzuDc_yjhY1uIevWCOLLtQXVMlro_Xm5uxrCfDmFxm4ZDh-DY2-bVVxhCEae82O3o5W2u-YFElzBsVEBgSrfVMJlfkximi6ApsbkHGg3vwDr_CyCFJOaUcTbfPUSTw9EsixJitb0QxhMaayVg' },
  { id:9, category:'thoi-trang', title:'Fashion E-Commerce', subtitle:'FASHION / APPAREL', desc:'Lookbook hero, giỏ hàng sidebar, chọn size hover, wishlist.', longDesc:'Cart drawer với qty controls, hover chọn size, wishlist, filter theo category. Minimalist black/white.', tags:['Giỏ hàng','Wishlist','Size chart'], Icon:Shirt, demoHref:'/demo/fashion', accentColor:'#be185d', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl' },
  { id:10, category:'the-thao', title:'Fitness & Gym', subtitle:'FITNESS / GYM', desc:'Class booking, trainer profiles, membership plans, trial CTA.', longDesc:'Đăng ký lớp học trực tiếp, progress bar chỗ trống, trainer grid, 3 gói tập, form đăng ký tập thử. Dark orange.', tags:['Class booking','Trainer','Membership'], Icon:Dumbbell, demoHref:'/demo/gym', accentColor:'#f97316', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe' },
  { id:11, category:'ca-nhan', title:'Creative Portfolio', subtitle:'PORTFOLIO / FREELANCE', desc:'Editorial layout, project grid, về tôi, form liên hệ.', longDesc:'Hover animation trên project cards, filter theo category, about section, form hợp tác với budget. Dark violet.', tags:['Project showcase','About','Contact'], Icon:Palette, demoHref:'/demo/portfolio', accentColor:'#7c3aed', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl' },
  { id:12, category:'thuong-mai', title:'Tech E-Commerce', subtitle:'E-COMMERCE / SHOP', desc:'Giỏ hàng đầy đủ luồng thanh toán 3 bước, filter, wishlist.', longDesc:'Flash sale banner, product grid 4 cột, cart sidebar với checkout 3 bước (địa chỉ → thanh toán → xác nhận), filter + sort.', tags:['Full checkout','Cart sidebar','Flash sale'], Icon:ShoppingCart, demoHref:'/demo/ecommerce', accentColor:'#2563eb', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe' },
  { id:13, category:'giai-tri', title:'Billiards Club & Academy', subtitle:'BILLIARDS / SNOOKER', desc:'Sơ đồ bàn real-time, đặt bàn, đăng ký giải đấu, HLV.', longDesc:'8 bàn với trạng thái live (trống/đang chơi/đã đặt), form đặt bàn theo giờ, tab HLV + khoá học, giải đấu với đăng ký, thực đơn gọi đồ. Dark green ambient.', tags:['Đặt bàn real-time','Giải đấu','HLV & Khoá học'], Icon:Dices, demoHref:'/demo/billiards', accentColor:'#22c55e', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe' },
  { id:14, category:'giai-tri', title:'Esports / Gaming Center', subtitle:'NET CAFE / ESPORTS', desc:'Sơ đồ máy live, đặt máy theo giờ, combo, giải đấu, gọi đồ.', longDesc:'12 PC RTX 4090 + 8 RTX 4080, booking máy với countdown, tab combo tiết kiệm, đăng ký giải game, gọi đồ ăn tận máy. Cyberpunk cyan.', tags:['PC booking','Esports','Gọi đồ tận nơi'], Icon:Gamepad2, demoHref:'/demo/netcafe', accentColor:'#06b6d4', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe' },
]

const categories = [
  { key:'all', label:'Tất Cả', count: templates.length },
  { key:'doanh-nghiep', label:'Doanh Nghiệp' },
  { key:'quan-ca-phe', label:'Cà Phê' },
  { key:'khach-san', label:'Khách Sạn' },
  { key:'nha-hang', label:'Nhà Hàng' },
  { key:'y-te', label:'Y Tế' },
  { key:'bat-dong-san', label:'Bất Động Sản' },
  { key:'thoi-trang', label:'Thời Trang' },
  { key:'the-thao', label:'Thể Thao' },
  { key:'thuong-mai', label:'Thương Mại' },
  { key:'giai-tri', label:'Giải Trí' },
  { key:'ca-nhan', label:'Cá Nhân' },
]

type Template = typeof templates[number]

// Mini hero preview cho từng template — render trực tiếp không cần iframe
function TemplatePreview({ t, device }: { t: Template; device: DeviceType }) {
  const containerCls = device === 'mobile'
    ? 'w-[390px] max-w-full'
    : device === 'tablet'
    ? 'w-[768px] max-w-full'
    : 'w-full'

  // Mỗi template có preview hero riêng theo style của nó
  const previews: Record<number, React.ReactNode> = {
    // Corporate — dark navy
    1: (
      <div className="w-full h-full bg-[#050a14] text-white overflow-hidden" style={{fontFamily:'sans-serif'}}>
        <div className="h-10 flex items-center px-6 border-b border-white/8 bg-[#050a14]/90">
          <div className="flex items-center gap-2 mr-auto"><div className="w-6 h-6 bg-blue-600 rounded text-[10px] font-black flex items-center justify-center">NX</div><span className="text-sm font-black">NEXTECH<span className="text-blue-400">.</span></span></div>
          <div className="hidden md:flex gap-5 text-[11px] text-white/50 mr-6">{['Dịch Vụ','Case Study','Đội Ngũ','Liên Hệ'].map(n=><span key={n}>{n}</span>)}</div>
          <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded">Tư Vấn</div>
        </div>
        <div className="px-8 pt-10 pb-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/25 text-blue-300 text-[10px] font-semibold px-3 py-1 rounded-full mb-4"><div className="w-1 h-1 bg-blue-400 rounded-full"/>#1 Chuyển Đổi Số Việt Nam</div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3">Kiến Tạo<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Tương Lai</span><br/>Doanh Nghiệp</h1>
          <p className="text-white/50 text-sm mb-5 max-w-xs">18 năm đồng hành cùng 400+ doanh nghiệp hàng đầu Việt Nam.</p>
          <div className="flex gap-3"><div className="bg-blue-600 text-white text-xs font-bold px-5 py-2 rounded-lg">Bắt Đầu Ngay</div><div className="border border-white/20 text-white text-xs px-5 py-2 rounded-lg">▶ Xem Case Study</div></div>
        </div>
        <div className="mx-8 grid grid-cols-4 gap-3 mt-2">
          {[['18+','Năm KN'],['400+','Dự án'],['98%','Hài lòng'],['12','VP']].map(([v,l])=>(
            <div key={l} className="bg-blue-600/8 border border-blue-500/15 rounded-xl p-3 text-center"><div className="text-xl font-black text-blue-400">{v}</div><div className="text-[9px] text-white/40">{l}</div></div>
          ))}
        </div>
      </div>
    ),
    // Café — warm amber
    2: (
      <div className="w-full h-full bg-[#1a1008] text-[#f5e6d0] overflow-hidden" style={{fontFamily:"Georgia,serif"}}>
        <div className="h-10 flex items-center px-6 border-b border-[#f5e6d0]/8 bg-[#1a1008]/85">
          <span className="text-lg font-bold tracking-widest text-[#d4a855] mr-auto">LUNA CAFÉ</span>
          <div className="hidden md:flex gap-5 text-[10px] text-[#f5e6d0]/50 uppercase tracking-widest mr-5">{['Thực Đơn','Đặt Bàn','Gallery'].map(n=><span key={n}>{n}</span>)}</div>
          <div className="bg-[#d4a855] text-[#1a1008] text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest">Đặt Bàn</div>
        </div>
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008] via-[#1a1008]/40 to-transparent z-10"/>
          <div className="absolute inset-0 bg-[#2a1a08]"/>
          <div className="absolute inset-0 flex items-center justify-center opacity-20"><span style={{fontSize:'120px'}}>☕</span></div>
          <div className="absolute bottom-4 left-6 z-20">
            <p className="text-[#d4a855] text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Specialty Coffee · 2018</p>
            <h1 className="text-4xl font-bold leading-none">Nơi Mỗi<br/><span className="italic text-[#d4a855]">Ngụm Cà Phê</span><br/>Là Ký Ức</h1>
          </div>
        </div>
        <div className="px-6 py-3 flex gap-2">
          <div className="bg-[#d4a855] text-[#1a1008] text-[10px] font-bold px-4 py-2 rounded uppercase tracking-widest">Xem Thực Đơn</div>
          <div className="border border-[#f5e6d0]/25 text-[#f5e6d0] text-[10px] px-4 py-2 rounded uppercase tracking-widest">Đặt Bàn</div>
        </div>
        <div className="px-6 flex gap-3 text-[10px] text-[#f5e6d0]/50 font-sans">
          <span>⭐ 4.9 · 2,847 đánh giá</span><span>📍 47 Phố Cổ</span><span>🕐 07:00–22:00</span>
        </div>
      </div>
    ),
    // SaaS — purple
    3: (
      <div className="w-full h-full bg-[#06040f] text-white overflow-hidden font-sans">
        <div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 left-1/3 w-64 h-64 bg-purple-600/15 rounded-full blur-[80px]"/></div>
        <div className="h-10 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-1.5 mr-auto"><div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center"><span className="text-[8px] font-black">⚡</span></div><span className="text-sm font-black">flow<span className="text-purple-400">AI</span></span></div>
          <div className="hidden md:flex gap-4 text-[10px] text-white/45 mr-5">{['Tính năng','Demo','Pricing'].map(n=><span key={n}>{n}</span>)}</div>
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg">Miễn phí</div>
        </div>
        <div className="px-6 pt-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/25 text-purple-300 text-[10px] font-semibold px-3 py-1 rounded-full mb-4"><div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"/>v3.0 — AI Agent nhanh hơn 5x</div>
          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-3">Tự Động Hóa Toàn Bộ<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Quy Trình Kinh Doanh</span></h1>
          <p className="text-white/45 text-xs mb-5 max-w-xs mx-auto">Kết nối mọi công cụ, tự động hóa, ra quyết định bằng AI.</p>
          <div className="flex gap-2 justify-center">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-bold px-5 py-2 rounded-xl">Dùng thử miễn phí</div>
            <div className="border border-white/15 text-white text-[10px] px-5 py-2 rounded-xl">Xem demo</div>
          </div>
        </div>
        <div className="mx-6 mt-4 bg-white/3 border border-white/8 rounded-xl p-3">
          <div className="grid grid-cols-4 gap-2">
            {[['2.4M','Users'],['847K','API/min'],['43ms','Latency'],['99.99%','Uptime']].map(([v,l])=>(
              <div key={l} className="bg-white/4 rounded-lg p-2 text-center"><div className="text-sm font-black text-purple-400">{v}</div><div className="text-[8px] text-white/35">{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    ),
    // Gym — dark orange
    10: (
      <div className="w-full h-full bg-[#0c0c0c] text-white overflow-hidden font-sans">
        <div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 right-0 w-64 h-32 bg-orange-600/8 blur-[80px]"/></div>
        <div className="h-10 flex items-center px-5 border-b border-white/5">
          <span className="font-black text-sm mr-auto">IRON<span className="text-orange-500">PEAK</span></span>
          <div className="hidden md:flex gap-4 text-[10px] text-white/45 mr-4">{['Lịch Tập','HLV','Gói Tập'].map(n=><span key={n}>{n}</span>)}</div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-xl">Tập Thử</div>
        </div>
        <div className="px-6 pt-7 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/25 text-orange-300 text-[10px] font-semibold px-3 py-1 rounded-full mb-4"><div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"/>Chi Nhánh 3 khai trương T7/2026</div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3">FORGE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">YOUR</span><br/>LIMITS</h1>
          <p className="text-white/50 text-sm mb-5 max-w-xs">Hơn 2,000 hội viên đã thay đổi cuộc sống.</p>
          <div className="flex gap-3"><div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-black px-5 py-2 rounded-xl">TẬP THỬ MIỄN PHÍ</div><div className="border border-white/20 text-white text-xs px-5 py-2 rounded-xl">Xem Lịch Tập</div></div>
        </div>
        <div className="px-6 mt-4 flex gap-6">
          {[['2000+','Hội viên'],['50+','Lớp/tuần'],['12','HLV'],['3','Chi nhánh']].map(([v,l])=>(
            <div key={l}><div className="text-lg font-black text-orange-400">{v}</div><div className="text-[9px] text-white/35">{l}</div></div>
          ))}
        </div>
      </div>
    ),
    // E-commerce — clean white
    12: (
      <div className="w-full h-full bg-[#f8f9fb] text-[#111] overflow-hidden font-sans">
        <div className="h-10 flex items-center px-4 border-b border-gray-200 bg-white/95">
          <div className="flex items-center gap-1.5 mr-auto"><div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center"><span className="text-white text-[9px] font-black">VT</span></div><span className="text-sm font-black">TechShop<span className="text-blue-600">.</span></span></div>
          <div className="flex-1 max-w-48 mx-4 border border-gray-200 rounded-lg px-3 py-1 text-[10px] text-gray-400 bg-gray-50">🔍 Tìm sản phẩm...</div>
          <div className="bg-blue-600 text-white text-[10px] font-semibold px-3 py-1 rounded-xl">Giỏ hàng</div>
        </div>
        <div className="mx-4 mt-3 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-4 flex items-center">
          <div>
            <p className="text-blue-300 text-[10px] font-semibold mb-1">⚡ Flash Sale hôm nay</p>
            <h2 className="text-xl font-black text-white mb-1">Giảm Đến <span className="text-yellow-400">50%</span></h2>
            <p className="text-white/60 text-[9px]">Phụ kiện Tech · Số lượng có hạn</p>
            <div className="bg-yellow-400 text-[#111] text-[10px] font-black px-3 py-1 rounded-lg inline-block mt-2">Mua Ngay →</div>
          </div>
        </div>
        <div className="px-4 mt-3 grid grid-cols-4 gap-2">
          {[{n:'Headphones',p:'2.490K',d:'-22%'},{n:'Smart Watch',p:'5.990K',d:'-20%'},{n:'Keyboard',p:'1.890K',d:'-14%'},{n:'Webcam 4K',p:'1.290K',d:'-19%'}].map(item=>(
            <div key={item.n} className="bg-white rounded-xl p-2 border border-gray-100 shadow-sm">
              <div className="h-12 bg-gray-50 rounded-lg mb-2 flex items-center justify-center text-lg">📦</div>
              <p className="text-[9px] font-semibold truncate">{item.n}</p>
              <p className="text-blue-600 font-black text-[10px]">{item.p}đ</p>
              <span className="text-[8px] bg-red-500 text-white px-1 rounded">{item.d}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  }

  const defaultPreview = (
    <div className="w-full h-full overflow-hidden font-sans" style={{background: `linear-gradient(135deg, ${t.accentColor}15, #0d1117 60%)`}}>
      <div className="h-10 flex items-center px-5 bg-black/30 border-b border-white/8">
        <div className="flex items-center gap-2 mr-auto">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{background:t.accentColor}}>
            <t.Icon size={12} color="#fff" />
          </div>
          <span className="text-sm font-bold text-white">{t.title}</span>
        </div>
        <div className="flex gap-2">{['Nav','Features','Contact'].map(n=><span key={n} className="text-[10px] text-white/40">{n}</span>)}</div>
      </div>
      <div className="px-8 pt-10">
        <span className="text-[10px] font-bold uppercase tracking-widest block mb-3" style={{color:t.accentColor}}>{t.subtitle}</span>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{t.title}</h1>
        <p className="text-white/50 text-sm max-w-sm mb-6">{t.longDesc.split('·')[0]}</p>
        <div className="flex gap-3">
          <div className="text-xs font-bold px-5 py-2 rounded-xl" style={{background:t.accentColor, color:'#fff'}}>Khám Phá</div>
          <div className="text-xs font-bold px-5 py-2 rounded-xl border border-white/20 text-white">Tìm hiểu thêm</div>
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {t.tags.map(tag=><span key={tag} className="text-[10px] px-2 py-1 rounded-full border font-semibold" style={{borderColor:`${t.accentColor}40`,color:t.accentColor,background:`${t.accentColor}15`}}>{tag}</span>)}
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full h-full flex items-start justify-center overflow-auto bg-[#161b22] p-3">
      <div
        className="transition-all duration-400 ease-out rounded-xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#0d1117] flex-shrink-0"
        style={{
          width: containerCls === 'w-full' ? '100%' : containerCls === 'w-[768px] max-w-full' ? '768px' : '390px',
          maxWidth: '100%',
          minHeight: '480px',
        }}
      >
        {previews[t.id] ?? defaultPreview}
      </div>
    </div>
  )
}

function TemplateModal({ t, onClose }: { t: Template; onClose: () => void }) {
  const [device, setDevice] = useState<DeviceType>('desktop')
  const current = DEVICES.find(d => d.key === device)!

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      <div
        className="relative z-10 w-full max-w-6xl max-h-[95vh] flex flex-col rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Top bar ── */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-[#0a0d12] flex-shrink-0">
          <div className="flex gap-1.5">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="flex-1 flex items-center gap-2 bg-white/6 border border-white/8 rounded-lg px-3 h-7 min-w-0">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: t.accentColor }} />
            <span className="text-[11px] text-white/40 truncate font-mono">vai-tech.asia{t.demoHref}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-lg p-1">
            {DEVICES.map(({ key, label, Icon }) => (
              <button key={key} onClick={() => setDevice(key)} title={label}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${device === key ? 'bg-white/15 text-white' : 'text-white/35 hover:text-white/70'}`}>
                <Icon size={13} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
          <Link href={t.demoHref} target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#2b3040] transition-all hover:scale-105 flex-shrink-0"
            style={{ background: t.accentColor }}>
            <ExternalLink size={12} />
            <span className="hidden sm:inline">Mở tab mới</span>
          </Link>
        </div>

        {/* ── Preview ── */}
        <div className="flex-1 min-h-0 overflow-hidden" style={{ height: '520px' }}>
          <TemplatePreview t={t} device={device} />
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex items-center justify-between gap-4 px-5 py-3 border-t border-white/8 bg-[#0a0d12] flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${t.accentColor}20` }}>
              <t.Icon size={14} style={{ color: t.accentColor }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#e0e3e5] truncate">{t.title}</p>
              <p className="text-[10px] text-[#909097]">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden md:flex gap-1.5">
              {t.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border font-semibold"
                  style={{ borderColor: `${t.accentColor}35`, color: t.accentColor, background: `${t.accentColor}10` }}>
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/register"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs border border-[#46464c] text-[#c7c6cd] hover:border-[#c2c6db] hover:text-[#c2c6db] transition-all whitespace-nowrap">
              <Rocket size={12} />Dùng mẫu này
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default function TemplatesPage() {
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState<Template | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  const filtered = active === 'all' ? templates : templates.filter(t => t.category === active)

  return (
    <>
      <div className="pt-32 pb-[120px] px-6 md:px-16 max-w-[1280px] mx-auto">
        {/* Header */}
        <header className="mb-16 max-w-3xl">
          <div className="inline-block px-3 py-1 mb-6 border border-[#c2c6db]/20 bg-[#c2c6db]/5 rounded-full">
            <span className="text-xs tracking-widest uppercase text-[#c2c6db] font-semibold">HỆ SINH THÁI THIẾT KẾ CAO CẤP</span>
          </div>
          <h1 className="text-[clamp(36px,5vw,64px)] font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-5 leading-tight tracking-[-0.02em]">
            Hàng Loạt Mẫu Thiết Kế{' '}
            <span className="text-[#c2c6db]/60">Đỉnh Cao</span>.
          </h1>
          <p className="text-lg text-[#c7c6cd] leading-relaxed">
            Mỗi mẫu là một sản phẩm hoàn chỉnh — đầy đủ chức năng, sẵn sàng ra mắt. Nhấn để xem demo thực tế.
          </p>
        </header>

        {/* Filter — scrollable */}
        <div className="flex gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button key={cat.key} onClick={() => setActive(cat.key)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest border transition-all duration-200 ${
                active === cat.key
                  ? 'bg-[#1d2022] text-[#c2c6db] border-[#c2c6db]/40 shadow-[0_0_20px_0_rgba(194,198,219,0.1)]'
                  : 'bg-transparent text-[#c7c6cd] border-white/10 hover:border-[#c2c6db]/20 hover:text-[#e0e3e5] whitespace-nowrap'
              }`}>
              {cat.label}
              {cat.key === 'all' && <span className="ml-1.5 text-[#909097]">{templates.length}</span>}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(t => (
            <div key={t.id}
              className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d1117] cursor-pointer transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              onMouseEnter={() => setHovered(t.id)} onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(t)}>

              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={t.image} alt={t.title} fill
                  className={`object-cover transition-all duration-700 ${hovered === t.id ? 'scale-105 brightness-50' : 'scale-100 brightness-90'}`} />

                {/* Browser chrome */}
                <div className="absolute top-0 left-0 right-0 h-7 bg-[#1a1a2e]/80 flex items-center gap-1.5 px-3">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" /><div className="w-2 h-2 rounded-full bg-yellow-500/60" /><div className="w-2 h-2 rounded-full bg-green-500/60" />
                  <div className="flex-1 mx-2 h-3.5 bg-white/10 rounded-sm" />
                </div>

                {/* Hover CTA */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered === t.id ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm backdrop-blur-sm" style={{ background: t.accentColor, color: '#fff' }}>
                    <Eye size={16} />Xem chi tiết
                  </div>
                </div>

                {/* Accent line */}
                <div className="absolute top-7 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.accentColor}60, transparent)` }} />
              </div>

              {/* Card info */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest block mb-1" style={{ color: t.accentColor }}>{t.subtitle}</span>
                  <h3 className="font-bold text-[#e0e3e5] font-[family-name:var(--font-montserrat)] text-base leading-tight">{t.title}</h3>
                  <p className="text-xs text-[#909097] mt-1 line-clamp-1">{t.desc}</p>
                </div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ml-3 transition-transform group-hover:scale-110 duration-300" style={{ background: `${t.accentColor}20` }}>
                  <t.Icon size={18} style={{ color: t.accentColor }} />
                </div>
              </div>

              {/* Tags */}
              <div className="px-5 pb-5 flex flex-wrap gap-1.5">
                {t.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 rounded bg-white/5 text-[#909097] border border-white/5">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 glass-card rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#c2c6db]/8 blur-[80px] rounded-full" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#c2c6db]/8 blur-[80px] rounded-full" />
          <h2 className="text-3xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-3">Không tìm thấy mẫu phù hợp?</h2>
          <p className="text-[#c7c6cd] mb-6">Vaitech nhận thiết kế custom theo yêu cầu — từ landing page đến hệ thống web phức tạp.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#c2c6db] text-[#2b3040] px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-transparent hover:text-[#c2c6db] border border-[#c2c6db] transition-all duration-300">
            <Paintbrush size={16} />Yêu cầu thiết kế custom
          </Link>
        </div>
      </div>

      {selected && <TemplateModal t={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
