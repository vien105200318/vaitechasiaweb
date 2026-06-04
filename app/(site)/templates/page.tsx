'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  X, ExternalLink, Rocket, Eye, Paintbrush,
  Monitor, Tablet, Smartphone,
  ChevronLeft, ChevronRight,
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

// Mini preview dùng cho card thumbnail — phiên bản thu nhỏ của TemplatePreview
function CardPreview({ t }: { t: Template }) {
  const previews: Record<number, React.ReactNode> = {
    1: ( // Corporate
      <div className="w-full h-full bg-[#050a14] text-white" style={{fontFamily:'sans-serif'}}>
        <div className="h-5 flex items-center px-2 gap-1.5 border-b border-white/5">
          <div className="w-3 h-3 bg-blue-600 rounded text-[6px] font-black flex items-center justify-center text-white">NX</div>
          <span className="text-[7px] font-black text-white">NEXTECH<span className="text-blue-400">.</span></span>
          <div className="ml-auto flex gap-2 text-[6px] text-white/40">{['Dịch Vụ','Case Study','Liên Hệ'].map(n=><span key={n}>{n}</span>)}</div>
        </div>
        <div className="px-3 pt-3">
          <div className="text-[6px] text-blue-300 mb-1 font-semibold">#1 Chuyển Đổi Số VN</div>
          <div className="text-[11px] font-black leading-tight mb-1.5">Kiến Tạo<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Tương Lai</span></div>
          <div className="text-[6px] text-white/40 mb-2">18 năm · 400+ doanh nghiệp</div>
          <div className="flex gap-1"><div className="bg-blue-600 text-white text-[6px] font-bold px-2 py-0.5 rounded">Bắt Đầu</div><div className="border border-white/20 text-white text-[6px] px-2 py-0.5 rounded">▶ Case Study</div></div>
        </div>
        <div className="mx-3 mt-2 grid grid-cols-4 gap-1">
          {[['18+','Năm'],['400+','Dự án'],['98%','Hài lòng'],['12','VP']].map(([v,l])=>(
            <div key={l} className="bg-blue-600/10 rounded p-1 text-center"><div className="text-[8px] font-black text-blue-400">{v}</div><div className="text-[5px] text-white/30">{l}</div></div>
          ))}
        </div>
      </div>
    ),
    2: ( // Café
      <div className="w-full h-full bg-[#1a1008] text-[#f5e6d0]" style={{fontFamily:'Georgia,serif'}}>
        <div className="h-5 flex items-center px-2 border-b border-[#f5e6d0]/8">
          <span className="text-[9px] font-bold tracking-widest text-[#d4a855]">LUNA CAFÉ</span>
          <div className="ml-auto flex gap-2 text-[5px] text-[#f5e6d0]/40 uppercase tracking-widest">{['Menu','Đặt Bàn'].map(n=><span key={n}>{n}</span>)}</div>
          <div className="ml-2 bg-[#d4a855] text-[#1a1008] text-[5px] font-bold px-1.5 py-0.5 rounded">Đặt Bàn</div>
        </div>
        <div className="relative h-16 bg-[#2a1a08] flex items-end p-2">
          <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-15">☕</div>
          <div className="relative z-10">
            <div className="text-[5px] text-[#d4a855] uppercase tracking-widest mb-0.5">Specialty · 2018</div>
            <div className="text-[10px] font-bold leading-tight">Nơi Mỗi <span className="italic text-[#d4a855]">Ngụm Cà Phê</span></div>
          </div>
        </div>
        <div className="px-2 pt-1.5 flex gap-1">
          <div className="bg-[#d4a855] text-[#1a1008] text-[6px] font-bold px-2 py-0.5 rounded">Thực Đơn</div>
          <div className="border border-[#f5e6d0]/20 text-[#f5e6d0] text-[6px] px-2 py-0.5 rounded">Đặt Bàn</div>
        </div>
        <div className="px-2 pt-1 text-[5px] text-[#f5e6d0]/40">⭐ 4.9 · 2,847 reviews · 07:00–22:00</div>
      </div>
    ),
    3: ( // SaaS
      <div className="w-full h-full bg-[#06040f] text-white" style={{fontFamily:'sans-serif'}}>
        <div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 left-1/3 w-24 h-24 bg-purple-600/20 rounded-full blur-[30px]"/></div>
        <div className="h-5 flex items-center px-2 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-1 mr-auto"><div className="w-3 h-3 rounded bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-[5px]">⚡</div><span className="text-[8px] font-black">flow<span className="text-purple-400">AI</span></span></div>
          <div className="flex gap-2 text-[5px] text-white/40 mr-2">{['Features','Pricing'].map(n=><span key={n}>{n}</span>)}</div>
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[5px] font-bold px-1.5 py-0.5 rounded">Free</div>
        </div>
        <div className="px-3 pt-2 text-center relative z-10">
          <div className="text-[5px] text-purple-300 mb-1">v3.0 — AI Agent nhanh hơn 5x</div>
          <div className="text-[10px] font-black leading-tight mb-1">Tự Động Hóa<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Kinh Doanh</span></div>
          <div className="text-[5px] text-white/40 mb-1.5">AI · Automation · 200+ integrations</div>
          <div className="flex gap-1 justify-center"><div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[6px] font-bold px-2 py-0.5 rounded">Miễn phí</div><div className="border border-white/15 text-white text-[6px] px-2 py-0.5 rounded">Demo</div></div>
        </div>
        <div className="mx-2 mt-2 bg-white/3 border border-white/5 rounded-lg p-1.5">
          <div className="grid grid-cols-4 gap-1">
            {[['2.4M','Users'],['847K','API/m'],['43ms','Delay'],['99.99%','Up']].map(([v,l])=>(
              <div key={l} className="text-center"><div className="text-[7px] font-black text-purple-400">{v}</div><div className="text-[5px] text-white/30">{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    ),
    4: ( // Roastery
      <div className="w-full h-full bg-[#f8f4ef] text-[#1a1008]" style={{fontFamily:'Georgia,serif'}}>
        <div className="h-5 flex items-center px-2 border-b border-[#1a1008]/8">
          <span className="text-[5px] font-sans font-bold uppercase tracking-widest text-[#1a1008]/30 mr-auto">Rang Thủ Công · Hà Nội</span>
          <span className="text-[9px] font-bold tracking-wider">TERRA ROAST</span>
        </div>
        <div className="grid grid-cols-2 h-[calc(100%-20px)]">
          <div className="flex flex-col justify-center px-2 py-1.5">
            <div className="text-[5px] font-sans uppercase tracking-widest text-[#8b7355] mb-1">Kể Từ 2019</div>
            <div className="text-[12px] font-bold leading-none mb-1">FROM<br/>BEAN<br/><span className="italic text-[#8b7355]">to Cup.</span></div>
            <div className="text-[5px] font-sans text-[#1a1008]/50 mb-1.5">Specialty Coffee · SCA 89+</div>
            <div className="flex gap-1"><div className="bg-[#1a1008] text-[#f8f4ef] text-[5px] font-sans font-bold px-2 py-0.5">Khám Phá</div></div>
          </div>
          <div className="bg-[#1a1008] flex items-center justify-center text-3xl opacity-60">☕</div>
        </div>
      </div>
    ),
    5: ( // Hotel
      <div className="w-full h-full bg-[#0a0a0f] text-white" style={{fontFamily:'Georgia,serif'}}>
        <div className="h-5 flex items-center px-2 border-b border-white/5 justify-between">
          <span className="text-[5px] font-sans uppercase tracking-widest text-white/30">Đà Nẵng</span>
          <span className="text-[9px] font-bold tracking-wider text-[#d4af6a]">AZURE</span>
          <div className="bg-[#d4af6a] text-[#0a0a0f] text-[5px] font-sans font-bold px-1.5 py-0.5">Đặt Phòng</div>
        </div>
        <div className="relative h-20 bg-[#0a1628] flex items-end p-2">
          <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-20">🏖️</div>
          <div className="relative z-10">
            <div className="text-[5px] text-[#d4af6a] uppercase tracking-widest mb-0.5">Luxury Resort & Spa</div>
            <div className="text-[10px] font-bold leading-tight">Escape<br/><span className="italic text-[#d4af6a]">the Ordinary</span></div>
          </div>
          <div className="ml-auto bg-black/50 backdrop-blur border border-[#d4af6a]/30 rounded-lg p-1.5 text-center">
            <div className="text-[8px] font-black text-[#d4af6a]">9.8</div>
            <div className="text-[4px] text-white/40">★★★★★</div>
          </div>
        </div>
        <div className="px-2 pt-1 flex gap-1 flex-wrap text-[5px] text-white/40">
          <span>🏊 Pool</span><span>🧖 Spa</span><span>🍽️ 5 Nhà hàng</span><span>🏖️ Bãi biển riêng</span>
        </div>
      </div>
    ),
    6: ( // Restaurant
      <div className="w-full h-full bg-[#1c1208] text-[#f0e6d3]" style={{fontFamily:'Georgia,serif'}}>
        <div className="h-5 flex items-center px-2 border-b border-[#f0e6d3]/8">
          <span className="text-[10px] font-bold tracking-tight text-[#c8963c]">Maison<span className="italic"> Saigon</span></span>
          <div className="ml-auto flex gap-2 text-[5px] text-[#f0e6d3]/40">{['Thực Đơn','Đặt Bàn'].map(n=><span key={n}>{n}</span>)}</div>
        </div>
        <div className="relative h-16 bg-[#2a1a08] flex items-end p-2">
          <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-20">🍽️</div>
          <div className="relative z-10">
            <div className="text-[5px] text-[#c8963c] uppercase tracking-widest mb-0.5">Fine Dining · Sài Gòn</div>
            <div className="text-[9px] font-bold leading-tight">Hương Vị <span className="italic text-[#c8963c]">Tinh Tế</span></div>
          </div>
        </div>
        <div className="px-2 pt-1.5">
          <div className="text-[5px] text-[#f0e6d3]/40 mb-1">Chef 20 năm · Bếp Pháp–Việt</div>
          <div className="flex gap-1"><div className="bg-[#c8963c] text-[#1c1208] text-[6px] font-bold px-2 py-0.5 rounded">Đặt Bàn</div><div className="border border-[#f0e6d3]/20 text-[6px] px-2 py-0.5 rounded">Menu</div></div>
        </div>
      </div>
    ),
    7: ( // Clinic
      <div className="w-full h-full bg-[#f0f7ff] text-[#0d1b2e]" style={{fontFamily:'sans-serif'}}>
        <div className="h-5 flex items-center px-2 border-b border-[#0d1b2e]/8 bg-white/80">
          <div className="w-3 h-3 bg-blue-600 rounded flex items-center justify-center mr-1"><span className="text-[5px] text-white font-black">+</span></div>
          <span className="text-[7px] font-bold text-blue-700 mr-auto">MedCare</span>
          <div className="bg-blue-600 text-white text-[5px] font-bold px-1.5 py-0.5 rounded">Đặt Lịch</div>
        </div>
        <div className="px-2 pt-2">
          <div className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-600 text-[5px] font-semibold px-1.5 py-0.5 rounded-full mb-1"><div className="w-1 h-1 bg-green-500 rounded-full"/>Tiếp nhận hôm nay</div>
          <div className="text-[9px] font-bold text-[#0d1b2e] leading-tight mb-1">Sức Khoẻ Là<br/><span className="text-blue-600">Ưu Tiên #1</span></div>
          <div className="flex gap-1 mb-1.5"><div className="bg-blue-600 text-white text-[5px] font-bold px-2 py-0.5 rounded">Đặt Lịch</div><div className="border border-[#0d1b2e]/15 text-[5px] px-2 py-0.5 rounded">📞 Hotline</div></div>
        </div>
        <div className="mx-2 grid grid-cols-3 gap-1">
          {[['50+','Bác sĩ'],['98%','Hài lòng'],['15+','Năm KN']].map(([v,l])=>(
            <div key={l} className="bg-white rounded-lg p-1 text-center shadow-sm"><div className="text-[8px] font-bold text-blue-600">{v}</div><div className="text-[5px] text-[#0d1b2e]/40">{l}</div></div>
          ))}
        </div>
      </div>
    ),
    8: ( // Real Estate
      <div className="w-full h-full bg-[#f5f3ef] text-[#1a1714]" style={{fontFamily:'sans-serif'}}>
        <div className="h-5 flex items-center px-2 border-b border-[#1a1714]/8 bg-white/90">
          <div className="w-3 h-3 bg-amber-700 rounded mr-1 flex items-center justify-center"><span className="text-[5px] text-white font-black">🏠</span></div>
          <span className="text-[7px] font-black mr-auto">Premier<span className="text-amber-700">Homes</span></span>
          <div className="bg-amber-700 text-white text-[5px] font-bold px-1.5 py-0.5 rounded">Tư Vấn</div>
        </div>
        <div className="relative h-16 bg-gradient-to-r from-[#1a1714]/80 to-[#1a1714]/50 flex items-end p-2">
          <div className="absolute inset-0 bg-[#2a1f14]"/>
          <div className="relative z-10">
            <div className="text-[5px] text-amber-400 uppercase tracking-widest mb-0.5">Bất Động Sản Cao Cấp</div>
            <div className="text-[10px] font-bold text-white leading-tight">Tìm Ngôi Nhà<br/>Mơ Ước</div>
          </div>
        </div>
        <div className="px-2 pt-1.5">
          <div className="flex gap-1 mb-1"><div className="border border-gray-200 rounded text-[5px] px-1.5 py-0.5 bg-white text-[#1a1714]/60">Loại BDS</div><div className="border border-gray-200 rounded text-[5px] px-1.5 py-0.5 bg-white text-[#1a1714]/60">Tỉnh thành</div><div className="bg-amber-700 text-white text-[5px] px-1.5 py-0.5 rounded font-bold">Tìm</div></div>
          <div className="text-[5px] text-[#1a1714]/40">200+ bất động sản nổi bật</div>
        </div>
      </div>
    ),
    9: ( // Fashion
      <div className="w-full h-full bg-[#faf9f7] text-[#1a1714]" style={{fontFamily:'sans-serif'}}>
        <div className="h-5 flex items-center px-2 border-b border-[#1a1714]/8">
          <span className="text-[8px] font-black tracking-wider mr-auto">AUREL<span className="text-rose-400">.</span></span>
          <div className="flex gap-2 text-[5px] text-[#1a1714]/40">{['New In','Sale'].map(n=><span key={n}>{n}</span>)}</div>
        </div>
        <div className="grid grid-cols-2 h-[calc(100%-20px)]">
          <div className="bg-[#f5ede6] flex flex-col justify-center px-2 py-2">
            <div className="text-[5px] uppercase tracking-widest text-rose-400 mb-1">2026 Collection</div>
            <div className="text-[11px] font-bold leading-tight mb-1">Effortless<br/><span className="italic font-light">Elegance</span></div>
            <div className="text-[5px] text-[#1a1714]/50 mb-1.5">Minimal · Natural · Timeless</div>
            <div className="bg-[#1a1714] text-[#faf9f7] text-[6px] font-bold px-2 py-0.5 inline-block">Shop Now</div>
          </div>
          <div className="bg-gray-100 flex items-center justify-center text-3xl">👗</div>
        </div>
      </div>
    ),
    10: ( // Gym
      <div className="w-full h-full bg-[#0c0c0c] text-white" style={{fontFamily:'sans-serif'}}>
        <div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 right-0 w-24 h-12 bg-orange-600/12 blur-[30px]"/></div>
        <div className="h-5 flex items-center px-2 border-b border-white/5 relative z-10">
          <span className="text-[8px] font-black mr-auto">IRON<span className="text-orange-500">PEAK</span></span>
          <div className="flex gap-1.5 text-[5px] text-white/40 mr-2">{['Lịch','HLV','Gói'].map(n=><span key={n}>{n}</span>)}</div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[5px] font-bold px-1.5 py-0.5 rounded">Tập Thử</div>
        </div>
        <div className="px-2 pt-2 relative z-10">
          <div className="text-[5px] text-orange-300 mb-1">Chi Nhánh 3 khai trương T7/2026</div>
          <div className="text-[11px] font-black leading-tight mb-1">FORGE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">YOUR LIMITS</span></div>
          <div className="flex gap-1 mb-1.5"><div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[6px] font-black px-2 py-0.5 rounded">TẬP THỬ MIỄN PHÍ</div></div>
          <div className="flex gap-3 text-[5px]">{[['2K+','Members'],['50+','Classes'],['12','Trainers']].map(([v,l])=><div key={l}><span className="font-black text-orange-400">{v}</span><span className="text-white/30"> {l}</span></div>)}</div>
        </div>
      </div>
    ),
    11: ( // Portfolio
      <div className="w-full h-full bg-[#0d0d0d] text-white" style={{fontFamily:'sans-serif'}}>
        <div className="h-5 flex items-center px-2 border-b border-white/5">
          <span className="text-[7px] font-bold tracking-tight mr-auto">Nguyễn Hoàng Minh</span>
          <div className="flex gap-1.5 text-[5px] text-white/40">{['Work','About'].map(n=><span key={n}>{n}</span>)}</div>
        </div>
        <div className="px-2 pt-2">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-[5px] font-black flex items-center justify-center">M</div>
            <div className="flex items-center gap-1 text-[5px] text-white/40"><div className="w-1 h-1 bg-green-400 rounded-full"/>Available for work</div>
          </div>
          <div className="text-[11px] font-black leading-tight mb-1">Creative<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">Designer</span></div>
          <div className="text-[5px] text-white/40 mb-1.5">UI/UX · Brand · 6 năm kinh nghiệm</div>
          <div className="flex gap-1"><div className="bg-white text-[#0d0d0d] text-[6px] font-bold px-2 py-0.5 rounded">Xem Portfolio</div></div>
        </div>
      </div>
    ),
    12: ( // Ecommerce
      <div className="w-full h-full bg-[#f8f9fb] text-[#111]" style={{fontFamily:'sans-serif'}}>
        <div className="h-5 flex items-center px-2 border-b border-gray-200 bg-white/95">
          <div className="w-3 h-3 bg-blue-600 rounded mr-1 text-[5px] font-black text-white flex items-center justify-center">VT</div>
          <span className="text-[7px] font-black mr-auto">TechShop<span className="text-blue-600">.</span></span>
          <div className="bg-blue-600 text-white text-[5px] font-semibold px-1.5 py-0.5 rounded">Giỏ hàng</div>
        </div>
        <div className="mx-2 mt-1 bg-gradient-to-r from-blue-900 to-indigo-900 rounded p-2 flex items-center">
          <div><div className="text-[5px] text-blue-300 mb-0.5">⚡ Flash Sale</div><div className="text-[9px] font-black text-white">Giảm <span className="text-yellow-400">50%</span></div></div>
          <div className="ml-auto bg-yellow-400 text-[#111] text-[5px] font-black px-1.5 py-0.5 rounded">Mua →</div>
        </div>
        <div className="mx-2 mt-1.5 grid grid-cols-4 gap-1">
          {['📦','⌨️','🖥️','🖱️'].map((e,i)=>(
            <div key={i} className="bg-white rounded-lg p-1 border border-gray-100 shadow-sm text-center">
              <div className="text-sm">{e}</div>
              <div className="text-[5px] text-blue-600 font-black mt-0.5">Từ 690K</div>
            </div>
          ))}
        </div>
      </div>
    ),
    13: ( // Billiards
      <div className="w-full h-full bg-[#080b10] text-white" style={{fontFamily:'sans-serif'}}>
        <div className="absolute inset-0 pointer-events-none"><div className="absolute top-1/4 left-0 w-20 h-20 bg-green-900/20 blur-[30px]"/></div>
        <div className="h-5 flex items-center px-2 border-b border-white/5 relative z-10">
          <span className="text-[6px] mr-1">🎱</span>
          <span className="text-[7px] font-black mr-auto">PRESTIGE<span className="text-green-400"> BILLIARDS</span></span>
          <div className="flex items-center gap-1 text-[5px]"><div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"/><span className="text-green-400 font-bold">5 bàn trống</span></div>
        </div>
        <div className="px-2 pt-2 relative z-10">
          <div className="text-[5px] text-green-300 mb-1">VBA Certified · Diamond & Brunswick</div>
          <div className="text-[11px] font-black leading-tight mb-1">BREAK<br/><span className="text-green-400">YOUR</span><br/>LIMITS</div>
          <div className="flex gap-1 mb-1.5"><div className="bg-green-500 text-[#080b10] text-[6px] font-black px-2 py-0.5 rounded">🎱 Đặt Bàn</div><div className="border border-white/20 text-[6px] px-2 py-0.5 rounded">🏆 Giải Đấu</div></div>
        </div>
        <div className="mx-2 grid grid-cols-4 gap-0.5">
          {[{s:'available'},{s:'occupied'},{s:'available'},{s:'booked'}].map((t,i)=>(
            <div key={i} className="rounded p-1 border" style={{background:'#1a4a2e',borderColor:'#2d7a4a'}}>
              <div className={`w-1.5 h-1.5 rounded-full mx-auto ${t.s==='available'?'bg-green-400':t.s==='occupied'?'bg-red-400':'bg-yellow-400'}`}/>
            </div>
          ))}
        </div>
      </div>
    ),
    14: ( // NetCafe
      <div className="w-full h-full bg-[#05080f] text-white" style={{fontFamily:'sans-serif'}}>
        <div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 left-1/3 w-20 h-16 bg-cyan-900/20 blur-[30px]"/></div>
        <div className="h-5 flex items-center px-2 border-b border-cyan-500/10 relative z-10">
          <div className="w-3 h-3 rounded bg-gradient-to-br from-cyan-400 to-blue-600 mr-1 text-[5px] font-black text-[#05080f] flex items-center justify-center">NX</div>
          <span className="text-[7px] font-black mr-auto">NEXUS<span className="text-cyan-400"> GAMING</span></span>
          <div className="flex items-center gap-1 text-[5px]"><div className="w-1 h-1 bg-green-400 rounded-full"/><span className="text-green-400 font-bold">8 máy trống</span></div>
        </div>
        <div className="px-2 pt-2 relative z-10">
          <div className="text-[5px] text-cyan-300 mb-1">Esports chuẩn QT · 24/7 · 10Gbps</div>
          <div className="text-[11px] font-black leading-tight mb-1">GG OR<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">GO HOME</span></div>
          <div className="flex gap-1 mb-1.5"><div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[6px] font-black px-2 py-0.5 rounded">🎮 Đặt Máy</div></div>
        </div>
        <div className="mx-2 grid grid-cols-3 gap-1">
          {[['360Hz','Màn hình'],['RTX 4090','GPU Zone A'],['10Gbps','Internet']].map(([v,l])=>(
            <div key={l} className="bg-white/4 border border-cyan-500/12 rounded p-1 text-center"><div className="text-[6px] font-black text-cyan-400">{v}</div><div className="text-[4px] text-white/30">{l}</div></div>
          ))}
        </div>
      </div>
    ),
  }

  const fallback = (
    <div className="w-full h-full overflow-hidden font-sans relative" style={{background:`linear-gradient(135deg,${t.accentColor}20,#0d1117 55%)`}}>
      <div className="h-5 flex items-center px-2 bg-black/30 border-b border-white/5">
        <div className="w-3 h-3 rounded flex items-center justify-center mr-1.5 flex-shrink-0" style={{background:t.accentColor}}><t.Icon size={7} color="#fff"/></div>
        <span className="text-[7px] font-bold text-white truncate">{t.title}</span>
      </div>
      <div className="px-2 pt-2">
        <div className="text-[6px] font-bold uppercase tracking-widest mb-1" style={{color:t.accentColor}}>{t.subtitle}</div>
        <div className="text-[11px] font-black text-white leading-tight mb-1.5">{t.title.split(' ').slice(0,2).join('<br/>')}</div>
        <div className="text-[5px] text-white/40 mb-2">{t.desc.substring(0,50)}...</div>
        <div className="flex gap-1 flex-wrap">
          {t.tags.slice(0,2).map(tag=><span key={tag} className="text-[5px] px-1.5 py-0.5 rounded-full border font-semibold" style={{borderColor:`${t.accentColor}40`,color:t.accentColor,background:`${t.accentColor}15`}}>{tag}</span>)}
        </div>
      </div>
    </div>
  )

  return <div className="w-full h-full relative overflow-hidden">{previews[t.id] ?? fallback}</div>
}

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
  const [loaded, setLoaded] = useState(false)
  const current = DEVICES.find(d => d.key === device)!

  // Khi đổi template reset loaded
  const iframeKey = `${t.id}-${device}`

  const deviceWidth: Record<DeviceType, string> = {
    desktop: '100%',
    tablet: '768px',
    mobile: '390px',
  }

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
          {/* Device switcher */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-lg p-1">
            {DEVICES.map(({ key, label, Icon }) => (
              <button key={key} onClick={() => { setDevice(key); setLoaded(false) }} title={label}
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

        {/* ── iframe Preview ── */}
        <div className="flex-1 min-h-0 bg-[#161b22] flex items-start justify-center overflow-auto p-3" style={{ height: '560px' }}>
          <div
            className="relative transition-all duration-400 ease-out rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white flex-shrink-0"
            style={{ width: deviceWidth[device], maxWidth: '100%', height: '100%', minHeight: '500px' }}
          >
            {/* Loading skeleton */}
            {!loaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0d1117]">
                <div className="w-8 h-8 border-2 border-white/15 border-t-white/60 rounded-full animate-spin" />
                <p className="text-white/35 text-xs">Đang tải {current.label} preview...</p>
              </div>
            )}
            <iframe
              key={iframeKey}
              src={t.demoHref}
              className="w-full h-full border-0"
              style={{ minHeight: '500px' }}
              onLoad={() => setLoaded(true)}
              title={`${t.title} preview`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
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
  const filterRef = useRef<HTMLDivElement>(null)

  const filtered = active === 'all' ? templates : templates.filter(t => t.category === active)

  const scroll = (dir: 'left' | 'right') => {
    filterRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' })
  }

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

        {/* Filter — scrollable với arrows */}
        <div className="relative flex items-center gap-2 mb-12">
          {/* Arrow trái */}
          <button onClick={() => scroll('left')}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1d2022] border border-white/10 hover:border-[#c2c6db]/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95">
            <ChevronLeft size={14} className="text-[#c7c6cd]" />
          </button>

          {/* Filter row */}
          <div ref={filterRef} className="flex gap-2 overflow-x-auto pb-0 scrollbar-hide flex-1">
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

          {/* Arrow phải */}
          <button onClick={() => scroll('right')}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1d2022] border border-white/10 hover:border-[#c2c6db]/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95">
            <ChevronRight size={14} className="text-[#c7c6cd]" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(t => (
            <div key={t.id}
              className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[#0d1117] cursor-pointer transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              onMouseEnter={() => setHovered(t.id)} onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(t)}>

              {/* Thumbnail — mini preview render trực tiếp */}
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* Browser chrome */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-[#0a0d12]/95 flex items-center gap-1.5 px-2.5 z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                  <div className="flex-1 mx-2 h-2.5 bg-white/8 rounded-sm text-[8px] text-white/25 flex items-center px-1.5 font-mono overflow-hidden">
                    vai-tech.asia{t.demoHref}
                  </div>
                </div>

                {/* Mini preview content */}
                <div className="absolute inset-0 pt-6 overflow-hidden">
                  <CardPreview t={t} />
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-20 ${hovered === t.id ? 'opacity-100 bg-black/50' : 'opacity-0'}`}>
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm backdrop-blur-sm shadow-xl" style={{ background: t.accentColor, color: '#fff' }}>
                    <Eye size={14} />Xem chi tiết
                  </div>
                </div>

                {/* Accent line */}
                <div className="absolute top-6 left-0 right-0 h-px z-10" style={{ background: `linear-gradient(90deg, transparent, ${t.accentColor}50, transparent)` }} />
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
