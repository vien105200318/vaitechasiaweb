'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ExternalLink, Rocket, Eye, Zap, Smartphone, Brain, Paintbrush } from 'lucide-react'

// Map icon name → emoji (không phụ thuộc font CDN)
const ICON_EMOJI: Record<string, string> = {
  corporate_fare: '🏢',
  local_cafe: '☕',
  layers: '🗂️',
  temp_preferences_custom: '🫘',
  hotel: '🏨',
  restaurant: '🍽️',
  local_hospital: '🏥',
  home_work: '🏠',
  checkroom: '👗',
  fitness_center: '💪',
  palette: '🎨',
  storefront: '🛒',
  sports_billiards: '🎱',
  videogame_asset: '🎮',
}

const templates = [
  { id:1, category:'doanh-nghiep', title:'Doanh Nghiệp Chuyên Nghiệp', subtitle:'CORPORATE', desc:'Dark navy, split-screen, data-driven cho doanh nghiệp B2B.', longDesc:'Bố cục hướng dữ liệu với case studies, team grid, form liên hệ đầy đủ và metrics live. Thiết kế dark navy hiện đại.', tags:['Tối ưu SEO','Đa ngôn ngữ','Dark mode'], icon:'corporate_fare', demoHref:'/demo/corporate', accentColor:'#3b82f6', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDO04BddMbSNQ6NeNP_QB43WinFa9-X2-jIGHegvTybTvFK5PIFe9SG43Vr_oas5GO4SeWyzKSC3G3gAQ2FhTXWCnmwDhBVYMgiPPZXTueFkeE-DBICLX3c7DY-gRLYzuDc_yjhY1uIevWCOLLtQXVMlro_Xm5uxrCfDmFxm4ZDh-DY2-bVVxhCEae82O3o5W2u-YFElzBsVEBgSrfVMJlfkximi6ApsbkHGg3vwDr_CyCFJOaUcTbfPUSTw9EsixJitb0QxhMaayVg' },
  { id:2, category:'quan-ca-phe', title:'Quán Cà Phê Ấm Cúng', subtitle:'CAFÉ', desc:'Warm amber, full-bleed ảnh, giỏ hàng online + đặt bàn.', longDesc:'Thực đơn phân category, giỏ hàng kéo ra, form đặt bàn, gallery, đánh giá khách hàng. Palette màu warm amber.', tags:['Đặt bàn online','Giỏ hàng','Order online'], icon:'local_cafe', demoHref:'/demo/cafe', accentColor:'#d4a855', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuCB5M_Hwf_PXfFjo6A83bSrDEzKWuyQXflUIvHCEHe_dvBTJwOI7njhgTwS8G9GIr6GcLL9ZDmDEAMbypvVWZJHnDhhI90pibKYtUH5uTRfC2JlWxuG2cip8d2ZY96B3FfGZR-dg1bobwuKvJhbetKGPF5_Vq5Tkn3nwudTHfpjrZINXsziAGDDLn30VVFH5EfNg4ryZNUQmCwtpSEtiC8OidjJ_j0l9_Ox__6NQbWhm4wIjss0bOnbc1gW5RTW38xnRA0i9GdH12In' },
  { id:3, category:'doanh-nghiep', title:'Nền Tảng SaaS', subtitle:'SAAS / TECH', desc:'Purple gradient, live AI demo, pricing toggle, dashboard preview.', longDesc:'Input demo AI thực tế, toggle monthly/yearly pricing, FAQ accordion, form email signup. Dashboard widget fake.', tags:['Dashboard','Pricing table','AI demo'], icon:'layers', demoHref:'/demo/saas', accentColor:'#a855f7', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe' },
  { id:4, category:'quan-ca-phe', title:'Xưởng Rang Specialty', subtitle:'COFFEE ROASTERY', desc:'Editorial luxury, shop chọn cà phê, gói đăng ký định kỳ.', longDesc:'Shop chọn nguồn gốc cà phê, chọn kiểu xay, thêm giỏ hàng, gói subscription, quy trình 6 bước. Minimal cream/black.', tags:['E-commerce','Subscription','Editorial'], icon:'temp_preferences_custom', demoHref:'/demo/roastery', accentColor:'#8b7355', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuC5YWIa9b59e3idcYzsuThgbqBGU0mEPt81SSB6qL0mZPgVBECVCowWv7CgOwyo5AzSeWtClMGPvEvIeCsLSpb8Aq_PT-5fUypLe_77D5vCcxXc3ifO7MT0TZXzFrlV20k8Xxe9CbsBC8Pkp05YvIhZXmUfSmAkD0C0GaesUx7hVTtog4oBnk7q690mOsyfbsx5_9VLn2IAGbbZSEakFIKs37UU2BseufJK-RxVS9-D2acGbLcmGn2Rkh_ayzZ0HrvnRufVBrOxvBeA' },
  { id:5, category:'khach-san', title:'Luxury Resort & Spa', subtitle:'HOTEL / RESORT', desc:'Full-bleed hero, đặt phòng trực tiếp, quick booking bar.', longDesc:'Quick booking bar trên hero, danh sách phòng với đặt ngay, awards bar, amenities grid. Dark gold luxury.', tags:['Booking system','Room listing','Gold luxury'], icon:'hotel', demoHref:'/demo/hotel', accentColor:'#d4af6a', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl' },
  { id:6, category:'nha-hang', title:'Fine Dining Restaurant', subtitle:'RESTAURANT', desc:'Chef story, menu gọi món, đặt bàn theo dịp đặc biệt.', longDesc:'Menu phân loại có nút gọi món, form đặt bàn với dịp đặc biệt, story bếp trưởng, review. Dark warm brown.', tags:['Menu online','Đặt bàn','Gọi món'], icon:'restaurant', demoHref:'/demo/restaurant', accentColor:'#c8963c', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDO04BddMbSNQ6NeNP_QB43WinFa9-X2-jIGHegvTybTvFK5PIFe9SG43Vr_oas5GO4SeWyzKSC3G3gAQ2FhTXWCnmwDhBVYMgiPPZXTueFkeE-DBICLX3c7DY-gRLYzuDc_yjhY1uIevWCOLLtQXVMlro_Xm5uxrCfDmFxm4ZDh-DY2-bVVxhCEae82O3o5W2u-YFElzBsVEBgSrfVMJlfkximi6ApsbkHGg3vwDr_CyCFJOaUcTbfPUSTw9EsixJitb0QxhMaayVg' },
  { id:7, category:'y-te', title:'Phòng Khám Đa Khoa', subtitle:'CLINIC / MEDICAL', desc:'Light blue, đặt lịch 6 bước, chọn bác sĩ, BHYT.', longDesc:'Form đặt lịch đầy đủ (chuyên khoa, bác sĩ, bảo hiểm), service grid, doctor cards. Light professional.', tags:['Đặt lịch khám','Chọn bác sĩ','BHYT'], icon:'local_hospital', demoHref:'/demo/clinic', accentColor:'#2563eb', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl' },
  { id:8, category:'bat-dong-san', title:'Bất Động Sản Cao Cấp', subtitle:'REAL ESTATE', desc:'Listing grid, modal chi tiết, form yêu cầu xem nhà.', longDesc:'Filter Bán/Thuê, listing card đầy đủ thông số, modal popup chi tiết, form liên hệ môi giới. Amber luxury.', tags:['Property listing','Tìm kiếm','Yêu cầu xem'], icon:'home_work', demoHref:'/demo/realestate', accentColor:'#b45309', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDO04BddMbSNQ6NeNP_QB43WinFa9-X2-jIGHegvTybTvFK5PIFe9SG43Vr_oas5GO4SeWyzKSC3G3gAQ2FhTXWCnmwDhBVYMgiPPZXTueFkeE-DBICLX3c7DY-gRLYzuDc_yjhY1uIevWCOLLtQXVMlro_Xm5uxrCfDmFxm4ZDh-DY2-bVVxhCEae82O3o5W2u-YFElzBsVEBgSrfVMJlfkximi6ApsbkHGg3vwDr_CyCFJOaUcTbfPUSTw9EsixJitb0QxhMaayVg' },
  { id:9, category:'thoi-trang', title:'Fashion E-Commerce', subtitle:'FASHION / APPAREL', desc:'Lookbook hero, giỏ hàng sidebar, chọn size hover, wishlist.', longDesc:'Cart drawer với qty controls, hover chọn size, wishlist, filter theo category. Minimalist black/white.', tags:['Giỏ hàng','Wishlist','Size chart'], icon:'checkroom', demoHref:'/demo/fashion', accentColor:'#be185d', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl' },
  { id:10, category:'the-thao', title:'Fitness & Gym', subtitle:'FITNESS / GYM', desc:'Class booking, trainer profiles, membership plans, trial CTA.', longDesc:'Đăng ký lớp học trực tiếp, progress bar chỗ trống, trainer grid, 3 gói tập, form đăng ký tập thử. Dark orange.', tags:['Class booking','Trainer','Membership'], icon:'fitness_center', demoHref:'/demo/gym', accentColor:'#f97316', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe' },
  { id:11, category:'ca-nhan', title:'Creative Portfolio', subtitle:'PORTFOLIO / FREELANCE', desc:'Editorial layout, project grid, về tôi, form liên hệ.', longDesc:'Hover animation trên project cards, filter theo category, about section, form hợp tác với budget. Dark violet.', tags:['Project showcase','About','Contact'], icon:'palette', demoHref:'/demo/portfolio', accentColor:'#7c3aed', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl' },
  { id:12, category:'thuong-mai', title:'Tech E-Commerce', subtitle:'E-COMMERCE / SHOP', desc:'Giỏ hàng đầy đủ luồng thanh toán 3 bước, filter, wishlist.', longDesc:'Flash sale banner, product grid 4 cột, cart sidebar với checkout 3 bước (địa chỉ → thanh toán → xác nhận), filter + sort.', tags:['Full checkout','Cart sidebar','Flash sale'], icon:'storefront', demoHref:'/demo/ecommerce', accentColor:'#2563eb', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe' },
  { id:13, category:'giai-tri', title:'Billiards Club & Academy', subtitle:'BILLIARDS / SNOOKER', desc:'Sơ đồ bàn real-time, đặt bàn, đăng ký giải đấu, HLV.', longDesc:'8 bàn với trạng thái live (trống/đang chơi/đã đặt), form đặt bàn theo giờ, tab HLV + khoá học, giải đấu với đăng ký, thực đơn gọi đồ. Dark green ambient.', tags:['Đặt bàn real-time','Giải đấu','HLV & Khoá học'], icon:'sports_billiards', demoHref:'/demo/billiards', accentColor:'#22c55e', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe' },
  { id:14, category:'giai-tri', title:'Esports / Gaming Center', subtitle:'NET CAFE / ESPORTS', desc:'Sơ đồ máy live, đặt máy theo giờ, combo, giải đấu, gọi đồ.', longDesc:'12 PC RTX 4090 + 8 RTX 4080, booking máy với countdown, tab combo tiết kiệm, đăng ký giải game, gọi đồ ăn tận máy. Cyberpunk cyan.', tags:['PC booking','Esports','Gọi đồ tận nơi'], icon:'videogame_asset', demoHref:'/demo/netcafe', accentColor:'#06b6d4', image:'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe' },
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

function TemplateModal({ t, onClose }: { t: Template; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <X size={18} />
        </button>

        {/* Preview */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
          <Image src={t.image} alt={t.title} fill className="object-cover" />
          <div className="absolute top-0 left-0 right-0 h-8 bg-[#1a1a2e]/90 flex items-center gap-2 px-4">
            <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/70" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/70" /></div>
            <div className="flex-1 mx-4 h-4 bg-white/10 rounded text-[10px] text-white/30 flex items-center px-2">demo.vaitech.vn{t.demoHref}</div>
          </div>
          <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 80% 20%, ${t.accentColor}50, transparent 60%)` }} />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: t.accentColor }}>{t.subtitle}</span>
              <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-3">{t.title}</h2>
              <p className="text-[#c7c6cd] text-sm leading-relaxed mb-5 max-w-xl">{t.longDesc}</p>
              <div className="flex flex-wrap gap-2">
                {t.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full border font-semibold"
                    style={{ borderColor: `${t.accentColor}40`, color: t.accentColor, background: `${t.accentColor}12` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-row md:flex-col gap-3 flex-shrink-0">
              <Link href={t.demoHref} target="_blank"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#2b3040] transition-all hover:scale-105 whitespace-nowrap"
                style={{ background: t.accentColor }}>
                <ExternalLink size={16} />Xem Demo
              </Link>
              <Link href="/register"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border border-[#46464c] text-[#c7c6cd] hover:border-[#c2c6db] hover:text-[#c2c6db] transition-all whitespace-nowrap">
                <Rocket size={16} />Dùng mẫu này
              </Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
            {[
              { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, label:'Tải dưới 1s' },
              { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>, label:'Responsive 100%' },
              { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>, label:'AI tích hợp' },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-2 text-xs text-[#c7c6cd]">
                <span style={{ color: t.accentColor }}>{f.icon}</span>{f.label}
              </div>
            ))}
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
                  <span className="text-lg leading-none">{ICON_EMOJI[t.icon] ?? '📄'}</span>
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
