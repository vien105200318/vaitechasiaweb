'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  X, ExternalLink, Rocket, Eye, Paintbrush,
  Monitor, Tablet, Smartphone,
  ChevronLeft, ChevronRight,
  Building2, Coffee, Layers, Bean, Hotel, UtensilsCrossed,
  Stethoscope, Home, Shirt, Dumbbell, Palette, ShoppingCart,
  Dices, Gamepad2, Bus, Landmark, HeartPulse, BookOpen, CalendarDays, MessageCircleWarning, ShieldAlert,
  type LucideIcon,
} from 'lucide-react'
import { useI18n } from '@/context/I18nContext'

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
  { id:15, category:'nha-nuoc', title:'Đặt Vé Xe Công Cộng', subtitle:'GOV / TRANSPORT', desc:'Nền tảng đặt vé xe buýt & xe điện — miễn phí đơn vị nhà nước, serverless.', longDesc:'Hệ thống đặt vé xe buýt và xe điện dành cho các tỉnh/thành phố. Miễn phí triển khai trên nền tảng serverless cho các đơn vị nhà nước. App riêng biệt nếu nhà nước muốn hợp tác triển khai toàn diện — tích hợp GPS real-time, thanh toán không tiền mặt, báo cáo hành trình, quản lý bến bãi.', tags:['Miễn phí nhà nước','Serverless','GPS real-time'], Icon:Bus, demoHref:'/demo/vexe', accentColor:'#0ea5e9', image:'' },
  { id:16, category:'nha-nuoc', title:'Đặt Lịch Khám Cộng Đồng', subtitle:'GOV / HEALTH', desc:'Đặt lịch khám miễn phí tại trạm y tế phường/xã — serverless, Zalo mini-app.', longDesc:'Hệ thống đặt lịch khám bệnh cho trạm y tế phường/xã và phòng khám công. Bệnh nhân đặt lịch qua QR code hoặc Zalo mini-app, chọn khung giờ, xem số thứ tự real-time. Quản lý hồ sơ khám bệnh, kê đơn thuốc điện tử, nhắc tái khám tự động. Miễn phí triển khai cho đơn vị nhà nước.', tags:['Miễn phí nhà nước','Serverless','BHYT'], Icon:HeartPulse, demoHref:'/demo/datlichkham', accentColor:'#16a34a', image:'' },
  { id:17, category:'nha-nuoc', title:'Thư Viện Công Cộng', subtitle:'GOV / LIBRARY', desc:'Tra cứu & đặt chỗ sách trực tuyến — miễn phí thư viện công, serverless.', longDesc:'Hệ thống quản lý thư viện công cộng với tra cứu catalogue online, đặt chỗ sách, gia hạn sách, theo dõi lượt mượn. Barcode/QR scan khi mượn trả. Thống kê lượt đọc theo thể loại, tác giả, khu vực. Miễn phí triển khai serverless cho thư viện tỉnh/huyện.', tags:['Miễn phí nhà nước','Serverless','QR scan'], Icon:BookOpen, demoHref:'/demo/thuvien', accentColor:'#7c3aed', image:'' },
  { id:18, category:'nha-nuoc', title:'Đăng Ký Sự Kiện Cộng Đồng', subtitle:'GOV / EVENTS', desc:'Đăng ký sự kiện phường/xã — miễn phí, serverless, xác nhận qua SMS/Zalo.', longDesc:'Nền tảng đăng ký và quản lý sự kiện cộng đồng: hội thảo, lớp học miễn phí, ngày hội sức khỏe, tọa đàm dân phố. Người dân đăng ký online, nhận xác nhận qua SMS/Zalo, xem danh sách tham gia. Ban tổ chức quản lý đăng ký, check-in QR, đánh giá sự kiện. Miễn phí serverless cho UBND phường/xã.', tags:['Miễn phí nhà nước','Serverless','SMS/Zalo'], Icon:CalendarDays, demoHref:'/demo/sukien', accentColor:'#ea580c', image:'' },
  { id:19, category:'nha-nuoc', title:'Phản Hồi Ý Kiến Người Dân', subtitle:'GOV / FEEDBACK', desc:'Cổng tiếp nhận phản hồi & khiếu nại — miễn phí, serverless, tracking real-time.', longDesc:'Hệ thống tiếp nhận và xử lý phản hồi, kiến nghị, khiếu nại của người dân. Người dân gửi phản hồi qua form/web, đính kèm ảnh/video, chọn lĩnh vực (giao thông, môi trường, y tế...). Ban quản lý phân công xử lý, cập nhật trạng thái real-time, báo cáo thống kê theo khu vực/lĩnh vực. Miễn phí serverless cho UBND các cấp.', tags:['Miễn phí nhà nước','Serverless','Tracking'], Icon:MessageCircleWarning, demoHref:'/demo/phanhoi', accentColor:'#dc2626', image:'' },
  { id:20, category:'xa-hoi', title:'Em An', subtitle:'ANTI-BULLYING & DOMESTIC VIOLENCE', desc:'Báo cáo ẩn danh bạo lực học đường & gia đình — hotline 111, blockchain, file đính kèm.', longDesc:'Nền tảng báo cáo và xử lý bạo lực học đường & bạo lực gia đình. Trẻ em có thể báo cáo ẩn danh qua form web, đính kèm ảnh/video bằng chứng, theo dõi trạng thái xử lý real-time. Hệ thống tích hợp hotline 111, tài liệu hỗ trợ tâm lý cho học sinh và phụ huynh, thống kê theo loại sự cố và khu vực. Blockchain bảo mật end-to-end, không lưu IP.', tags:['Ẩn danh','Hotline 111','Blockchain','File đính kèm'], Icon:ShieldAlert, demoHref:'/demo/baoluc-hocduong', accentColor:'#FF6B6B', image:'' },
]

function getCategories(t: (k: string) => string) {
  return [
    { key:'all', label: t('tpl.all'), count: templates.length },
    { key:'doanh-nghiep', label: t('tpl.cat.corp') },
    { key:'quan-ca-phe', label: t('tpl.cat.cafe') },
    { key:'khach-san', label: t('tpl.cat.hotel') },
    { key:'nha-hang', label: t('tpl.cat.restaurant') },
    { key:'y-te', label: t('tpl.cat.medical') },
    { key:'bat-dong-san', label: t('tpl.cat.realestate') },
    { key:'thoi-trang', label: t('tpl.cat.fashion') },
    { key:'the-thao', label: t('tpl.cat.fitness') },
    { key:'thuong-mai', label: t('tpl.cat.ecommerce') },
    { key:'giai-tri', label: t('tpl.cat.entertainment') },
    { key:'ca-nhan', label: t('tpl.cat.portfolio') },
    { key:'nha-nuoc', label: t('tpl.cat.gov') },
    { key:'xa-hoi', label: t('tpl.cat.social') },
  ]
}

type Template = typeof templates[number]


// Mini preview card — faithful to each demo's actual hero
function CardPreview({ t }: { t: Template }) {
  const NavDot = () => <><div className="w-1.5 h-1.5 rounded-full bg-red-500/70"/><div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60"/><div className="w-1.5 h-1.5 rounded-full bg-green-500/60"/></>

  const previews: Record<number, React.ReactNode> = {

    /* ── 1 CORPORATE ── bg #050a14, blue accent */
    1: <div className="w-full h-full bg-[#050a14] text-white" style={{fontFamily:'sans-serif'}}>
      <nav className="h-6 flex items-center gap-2 px-2.5 border-b border-white/8 bg-[#050a14]/90">
        <div className="flex gap-1"><NavDot/></div>
        <div className="flex items-center gap-1 mr-auto"><div className="w-3.5 h-3.5 bg-blue-600 rounded text-[6px] font-black flex items-center justify-center">NX</div><span className="text-[8px] font-black">NEXTECH<span className="text-blue-400">.</span></span></div>
        <div className="hidden sm:flex gap-2 text-[6px] text-white/40">{['Dịch Vụ','Case Study','Đội Ngũ'].map(n=><span key={n}>{n}</span>)}</div>
        <div className="bg-blue-600 text-white text-[6px] font-bold px-1.5 py-0.5 rounded ml-1">Tư Vấn</div>
      </nav>
      <div className="grid grid-cols-2 gap-0 h-[calc(100%-24px)]">
        <div className="px-3 pt-3">
          <div className="inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[6px] px-1.5 py-0.5 rounded-full mb-2"><span className="w-1 h-1 bg-blue-400 rounded-full"/>Đối tác #1 VN</div>
          <div className="text-[13px] font-black leading-tight mb-2">Kiến Tạo<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Tương Lai</span><br/>Doanh Nghiệp</div>
          <div className="text-[6px] text-white/45 mb-2">18 năm · 400+ doanh nghiệp hàng đầu VN</div>
          <div className="flex gap-1"><div className="bg-blue-600 text-white text-[6px] font-bold px-2 py-0.5 rounded-lg">Bắt Đầu</div><div className="border border-white/20 text-white text-[6px] px-2 py-0.5 rounded-lg">▶ Demo</div></div>
          <div className="flex gap-1 flex-wrap mt-2">{['ISO 27001','SOC 2','CMMI'].map(c=><span key={c} className="text-[5px] text-white/40 flex items-center gap-0.5"><span className="text-blue-400">✓</span>{c}</span>)}</div>
        </div>
        <div className="bg-[#0a1628] flex flex-col justify-center items-end pr-2 gap-1.5">
          <div className="bg-white/6 border border-white/10 rounded-lg p-2 w-24">
            <div className="text-[5px] text-white/40 mb-0.5">Tăng trưởng Q1</div>
            <div className="text-[12px] font-black text-blue-400">+247%</div>
            <div className="h-1 bg-white/8 rounded-full mt-1"><div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" style={{width:'72%'}}/></div>
          </div>
          <div className="bg-white/6 border border-white/10 rounded-lg p-2 w-24">
            <div className="flex items-center gap-1 mb-0.5"><div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/><span className="text-[5px] text-white/40">Hệ thống</span></div>
            <div className="text-[8px] font-bold">Uptime 99.99%</div>
          </div>
        </div>
      </div>
    </div>,

    /* ── 2 CAFÉ ── bg #1a1008, amber accent, Georgia */
    2: <div className="w-full h-full bg-[#1a1008] text-[#f5e6d0]" style={{fontFamily:"'Georgia',serif"}}>
      <nav className="h-6 flex items-center px-2.5 border-b border-[#f5e6d0]/8 bg-[#1a1008]/90">
        <div className="flex gap-1 mr-2"><NavDot/></div>
        <span className="text-[10px] font-bold tracking-widest text-[#d4a855] mr-auto">LUNA CAFÉ</span>
        <div className="hidden sm:flex gap-2 text-[5px] text-[#f5e6d0]/40 mr-2">{['Thực Đơn','Không Gian','Đặt Bàn'].map(n=><span key={n}>{n}</span>)}</div>
        <div className="bg-[#d4a855] text-[#1a1008] text-[5px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest">Đặt Bàn</div>
      </nav>
      <div className="relative h-[55%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008] via-[#1a1008]/40 to-transparent z-10"/>
        <div className="absolute inset-0 bg-[#2d1a0a]"/>
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-25">☕</div>
        <div className="absolute bottom-2 left-2.5 z-20">
          <div className="text-[5px] text-[#d4a855] uppercase tracking-widest mb-0.5">Specialty Coffee · 2018</div>
          <div className="text-[12px] font-bold leading-tight">Nơi Mỗi<br/><span className="italic text-[#d4a855]">Ngụm Cà Phê</span><br/>Là Một Ký Ức</div>
        </div>
      </div>
      <div className="px-2.5 pt-1.5 flex gap-1.5">
        <div className="bg-[#d4a855] text-[#1a1008] text-[6px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Xem Thực Đơn</div>
        <div className="border border-[#f5e6d0]/25 text-[#f5e6d0] text-[6px] px-2 py-0.5 rounded uppercase tracking-widest">Đặt Bàn</div>
      </div>
      <div className="px-2.5 pt-1 flex gap-2 text-[5px] text-[#f5e6d0]/45 font-sans">
        <span>⭐ 4.9 · 2,847 đánh giá</span><span>📍 47 Phố Cổ, HK</span>
      </div>
    </div>,

    /* ── 3 SAAS ── bg #06040f, purple accent */
    3: <div className="w-full h-full bg-[#06040f] text-white" style={{fontFamily:'sans-serif'}}>
      <div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 left-1/3 w-20 h-20 bg-purple-600/20 rounded-full blur-[30px]"/></div>
      <nav className="h-6 flex items-center gap-1.5 px-2.5 border-b border-white/5 relative z-10">
        <div className="flex gap-1"><NavDot/></div>
        <div className="flex items-center gap-1 mr-auto"><div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-[6px]">⚡</div><span className="text-[8px] font-black">flow<span className="text-purple-400">AI</span></span></div>
        <div className="hidden sm:flex gap-2 text-[5px] text-white/40 mr-1.5">{['Tính năng','Demo','Pricing'].map(n=><span key={n}>{n}</span>)}</div>
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[6px] font-bold px-1.5 py-0.5 rounded-md">Miễn phí</div>
      </nav>
      <div className="px-3 pt-3 text-center relative z-10">
        <div className="inline-flex items-center gap-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[5px] px-2 py-0.5 rounded-full mb-2"><div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"/>v3.0 — AI Agent nhanh hơn 5x</div>
        <div className="text-[13px] font-black leading-tight mb-1.5">Tự Động Hóa Toàn Bộ<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Quy Trình Kinh Doanh</span></div>
        <div className="text-[6px] text-white/45 mb-2 max-w-[140px] mx-auto">Kết nối mọi công cụ, tự động hóa, ra quyết định bằng AI</div>
        <div className="flex gap-1.5 justify-center mb-3">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[6px] font-bold px-2.5 py-1 rounded-lg">Dùng thử miễn phí</div>
          <div className="border border-white/15 text-white text-[6px] px-2.5 py-1 rounded-lg">Xem demo</div>
        </div>
        <div className="bg-white/4 border border-white/8 rounded-lg p-1.5">
          <div className="grid grid-cols-4 gap-1">
            {[['2.4M','Users'],['847K','API/m'],['43ms','Delay'],['99.99%','Up']].map(([v,l])=>(
              <div key={l} className="text-center"><div className="text-[8px] font-black text-purple-400">{v}</div><div className="text-[5px] text-white/30">{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>,

    /* ── 4 ROASTERY ── bg #f8f4ef, brown, Georgia */
    4: <div className="w-full h-full bg-[#f8f4ef] text-[#1a1008]" style={{fontFamily:"'Georgia',serif"}}>
      <nav className="h-6 flex items-center px-2.5 border-b border-[#1a1008]/8 bg-[#f8f4ef]/90">
        <div className="flex gap-1 mr-2"><NavDot/></div>
        <span className="text-[6px] font-sans font-bold uppercase tracking-widest text-[#1a1008]/35 mr-auto">Rang Thủ Công · HN</span>
        <span className="text-[9px] font-bold tracking-wider">TERRA ROAST</span>
        <div className="bg-[#1a1008] text-[#f8f4ef] text-[5px] font-sans font-bold px-1.5 py-0.5 ml-1.5 uppercase tracking-widest">Mua</div>
      </nav>
      <div className="grid grid-cols-2 h-[calc(100%-24px)]">
        <div className="flex flex-col justify-center px-3 py-2">
          <div className="text-[5px] font-sans uppercase tracking-widest text-[#8b7355] mb-1.5">Rang Thủ Công · Kể Từ 2019</div>
          <div className="text-[16px] font-bold leading-[0.88] tracking-tight mb-2">FROM<br/>BEAN<br/><span className="italic text-[#8b7355]">to Cup.</span></div>
          <div className="text-[6px] font-sans text-[#1a1008]/50 mb-2">Specialty Coffee · SCA 89+ điểm</div>
          <div className="flex gap-1.5">
            <div className="bg-[#1a1008] text-[#f8f4ef] text-[6px] font-sans font-bold px-2 py-0.5 uppercase tracking-widest">Khám Phá</div>
            <div className="border-b-2 border-[#1a1008] text-[#1a1008] text-[6px] font-sans pb-0.5">Gói đăng ký →</div>
          </div>
        </div>
        <div className="bg-[#1a1008] flex items-center justify-center">
          <div className="text-4xl opacity-70">☕</div>
          <div className="absolute bottom-3 left-[55%] bg-[#f8f4ef]/90 rounded-xl p-1.5">
            <div className="text-[5px] font-sans text-[#8b7355] uppercase tracking-wider">SCA Score</div>
            <div className="text-[12px] font-black text-[#1a1008]">92+</div>
          </div>
        </div>
      </div>
    </div>,

    /* ── 5 HOTEL ── bg #0a0a0f, gold accent, Georgia */
    5: <div className="w-full h-full bg-[#0a0a0f] text-white" style={{fontFamily:"'Georgia',serif"}}>
      <nav className="h-6 flex items-center px-2.5 bg-transparent">
        <div className="flex gap-1 mr-2"><NavDot/></div>
        <span className="text-[5px] font-sans uppercase tracking-widest text-white/35 mr-auto">Đà Nẵng · Việt Nam</span>
        <div className="text-center mx-auto absolute left-1/2 -translate-x-1/2">
          <div className="text-[10px] font-bold tracking-widest text-[#d4af6a]">AZURE</div>
          <div className="text-[4px] font-sans uppercase tracking-widest text-white/30">Luxury Resort & Spa</div>
        </div>
        <div className="bg-[#d4af6a] text-[#0a0a0f] text-[5px] font-sans font-bold px-1.5 py-0.5 uppercase tracking-widest">Đặt Phòng</div>
      </nav>
      <div className="relative h-[65%] bg-[#0a1628] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">🏖️</div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent"/>
        <div className="absolute bottom-2 left-2.5 z-10">
          <div className="text-[5px] text-[#d4af6a] uppercase tracking-widest mb-0.5">Nơi Thiên Nhiên Gặp Gỡ Xa Hoa</div>
          <div className="text-[13px] font-bold leading-tight">Escape<br/><span className="italic text-[#d4af6a]">the Ordinary</span></div>
        </div>
        <div className="absolute bottom-2 right-2 bg-white/8 backdrop-blur border border-white/12 rounded-lg p-1.5">
          <div className="text-[8px] font-black text-[#d4af6a]">9.8</div>
          <div className="flex gap-0.5">{Array.from({length:5}).map((_,i)=><span key={i} className="text-[#d4af6a] text-[6px]">★</span>)}</div>
          <div className="text-[4px] text-white/40 font-sans">Forbes 5★</div>
        </div>
      </div>
      <div className="px-2.5 pt-1.5 flex gap-2 text-[5px] text-white/40 font-sans">
        {['🏊 Pool','🧖 Spa','🍽️ Fine Dining','🏖️ Riêng'].map(a=><span key={a}>{a}</span>)}
      </div>
    </div>,

    /* ── 6 RESTAURANT ── bg #1c1208, gold #c8963c, Playfair */
    6: <div className="w-full h-full bg-[#1c1208] text-[#f0e6d3]" style={{fontFamily:"'Georgia',serif"}}>
      <nav className="h-6 flex items-center px-2.5 border-b border-[#f0e6d3]/8 bg-[#1c1208]/90">
        <div className="flex gap-1 mr-2"><NavDot/></div>
        <span className="text-[10px] font-bold tracking-tight text-[#c8963c] mr-auto">Maison<span className="italic"> Saigon</span></span>
        <div className="hidden sm:flex gap-2 text-[5px] text-[#f0e6d3]/40 mr-2">{['Thực Đơn','Chef','Đặt Bàn'].map(n=><span key={n}>{n}</span>)}</div>
        <div className="bg-[#c8963c] text-[#1c1208] text-[5px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest">Đặt Bàn</div>
      </nav>
      <div className="relative h-[55%] bg-[#2a1208] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1208]/90 via-[#1c1208]/50 to-transparent z-10"/>
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">🍽️</div>
        <div className="absolute bottom-2 left-2.5 z-20">
          <div className="text-[5px] text-[#c8963c] uppercase tracking-widest mb-0.5">Fine Dining · Sài Gòn</div>
          <div className="text-[12px] font-bold leading-tight">Hương Vị<br/><span className="italic text-[#c8963c]">Tinh Tế</span><br/>Từ Tâm Hồn</div>
        </div>
        <div className="absolute bottom-2 right-2 z-20 bg-[#1c1208]/80 border border-[#f0e6d3]/12 rounded-lg p-1.5">
          <div className="flex gap-0.5">{Array.from({length:5}).map((_,i)=><span key={i} className="text-[#c8963c] text-[7px]">★</span>)}</div>
          <div className="text-[5px] text-[#f0e6d3]/50 font-sans">Michelin 2024</div>
        </div>
      </div>
      <div className="px-2.5 pt-1.5 flex gap-1.5">
        <div className="bg-[#c8963c] text-[#1c1208] text-[6px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Xem Thực Đơn</div>
        <div className="border border-[#f0e6d3]/25 text-[6px] px-2 py-0.5 rounded uppercase tracking-widest">Đặt Bàn</div>
      </div>
    </div>,

    /* ── 7 CLINIC ── bg #f0f7ff, blue, sans */
    7: <div className="w-full h-full bg-[#f0f7ff] text-[#0d1b2e]" style={{fontFamily:'sans-serif'}}>
      <nav className="h-6 flex items-center px-2.5 border-b border-[#0d1b2e]/8 bg-white/90">
        <div className="flex gap-1 mr-2"><NavDot/></div>
        <div className="flex items-center gap-1 mr-auto">
          <div className="w-3.5 h-3.5 rounded-lg bg-blue-600 flex items-center justify-center"><span className="text-white text-[6px] font-black">+</span></div>
          <div><div className="text-[7px] font-bold text-blue-700 leading-none">MedCare</div><div className="text-[4px] text-[#0d1b2e]/35 uppercase tracking-widest">Phòng Khám</div></div>
        </div>
        <div className="hidden sm:flex gap-2 text-[5px] text-[#0d1b2e]/50 mr-1.5">{['Dịch Vụ','Bác Sĩ','Đặt Lịch'].map(n=><span key={n}>{n}</span>)}</div>
        <div className="bg-blue-600 text-white text-[5px] font-bold px-1.5 py-0.5 rounded-lg">Đặt Lịch</div>
      </nav>
      <div className="grid grid-cols-2 gap-2 px-2.5 pt-2 h-[calc(100%-24px)]">
        <div>
          <div className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-600 text-[5px] px-1.5 py-0.5 rounded-full mb-1.5"><div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"/>Tiếp nhận hôm nay</div>
          <div className="text-[11px] font-bold leading-tight mb-1.5">Sức Khoẻ Của Bạn<br/>Là <span className="text-blue-600">Ưu Tiên</span><br/>Số 1</div>
          <div className="text-[5px] text-[#0d1b2e]/55 mb-2">50+ bác sĩ · Hiện đại · Nhanh chóng</div>
          <div className="flex gap-1"><div className="bg-blue-600 text-white text-[6px] font-bold px-2 py-0.5 rounded-lg">Đặt Lịch Ngay</div></div>
          <div className="flex gap-2 mt-2">{[['50+','Bác sĩ'],['98%','Hài lòng'],['15+','Năm']].map(([v,l])=><div key={l} className="text-center"><div className="text-[8px] font-bold text-blue-600">{v}</div><div className="text-[4px] text-[#0d1b2e]/40">{l}</div></div>)}</div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-2 text-white">
            <div className="text-[5px] text-blue-200 mb-0.5">Gói Khám 2026</div>
            <div className="text-[9px] font-bold">1.200.000đ</div>
            <div className="text-[4px] text-blue-300">40+ chỉ số · Tiết kiệm 50%</div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {[{i:'🚨',l:'Cấp Cứu 24/7'},{i:'📹',l:'Khám Online'}].map(c=><div key={c.l} className="bg-white rounded-lg p-1.5 text-center shadow-sm"><div className="text-lg">{c.i}</div><div className="text-[5px] font-semibold text-[#0d1b2e]">{c.l}</div></div>)}
          </div>
        </div>
      </div>
    </div>,

    /* ── 8 REAL ESTATE ── bg #f5f3ef, amber-700 */
    8: <div className="w-full h-full bg-[#f5f3ef] text-[#1a1714]" style={{fontFamily:'sans-serif'}}>
      <nav className="h-6 flex items-center px-2.5 border-b border-[#1a1714]/8 bg-white/90">
        <div className="flex gap-1 mr-2"><NavDot/></div>
        <div className="flex items-center gap-1 mr-auto"><div className="w-3.5 h-3.5 bg-amber-700 rounded-lg flex items-center justify-center text-white text-[6px]">🏠</div><span className="text-[7px] font-black">Premier<span className="text-amber-700">Homes</span></span></div>
        <div className="hidden sm:flex gap-2 text-[5px] text-[#1a1714]/50 mr-1.5">{['Mua','Thuê','Dự Án'].map(n=><span key={n}>{n}</span>)}</div>
        <div className="bg-amber-700 text-white text-[5px] font-bold px-1.5 py-0.5 rounded-lg">Tư Vấn</div>
      </nav>
      <div className="relative h-[45%] bg-[#2a1f14] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1714]/85 to-transparent z-10"/>
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">🏙️</div>
        <div className="absolute bottom-2 left-2.5 z-20 text-white">
          <div className="text-[5px] text-amber-400 uppercase tracking-widest mb-0.5">Bất Động Sản Cao Cấp</div>
          <div className="text-[12px] font-bold leading-tight">Tìm Ngôi Nhà<br/><span className="text-amber-400">Mơ Ước</span></div>
        </div>
      </div>
      <div className="px-2.5 pt-2">
        <div className="flex gap-1 mb-1.5">
          <div className="border border-gray-200 rounded text-[5px] px-1.5 py-0.5 bg-white text-[#1a1714]/60 flex-1 text-center">Loại BDS ▾</div>
          <div className="border border-gray-200 rounded text-[5px] px-1.5 py-0.5 bg-white text-[#1a1714]/60 flex-1 text-center">Tỉnh thành ▾</div>
          <div className="bg-amber-700 text-white text-[5px] px-2 py-0.5 rounded font-bold">🔍</div>
        </div>
        <div className="grid grid-cols-2 gap-1">
          {[{n:'Penthouse Sky',p:'18.5 tỷ',t:'Bán'},{n:'Villa Biển ĐN',p:'12.8 tỷ',t:'Bán'}].map(p=>(
            <div key={p.n} className="bg-white rounded-lg p-1.5 border border-gray-100">
              <div className="h-5 bg-amber-100 rounded mb-1 flex items-center justify-center text-sm">🏠</div>
              <div className="text-[5px] font-semibold truncate">{p.n}</div>
              <div className="text-amber-700 font-black text-[6px]">{p.p}</div>
              <span className="text-[4px] bg-amber-700 text-white px-1 rounded">{p.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>,

    /* ── 9 FASHION ── bg #faf9f7, minimal black/rose */
    9: <div className="w-full h-full bg-[#faf9f7] text-[#1a1714]" style={{fontFamily:'sans-serif'}}>
      <nav className="h-6 flex items-center px-2.5 border-b border-[#1a1714]/8">
        <div className="flex gap-1 mr-2"><NavDot/></div>
        <span className="text-[9px] font-black tracking-wider mr-auto">AUREL<span className="text-rose-400">.</span></span>
        <div className="hidden sm:flex gap-2 text-[5px] text-[#1a1714]/45 mr-2">{['New In','Collections','Sale'].map(n=><span key={n}>{n}</span>)}</div>
        <div className="flex gap-1.5 text-[#1a1714]/50">{['🔍','♡','🛍️'].map(i=><span key={i} className="text-xs">{i}</span>)}</div>
      </nav>
      <div className="grid grid-cols-2 h-[calc(100%-24px)]">
        <div className="flex flex-col justify-center px-3 py-2">
          <div className="text-[5px] uppercase tracking-widest text-rose-400 mb-2 font-semibold">Bộ Sưu Tập 2026</div>
          <div className="text-[15px] font-bold leading-[0.88] mb-2 tracking-tight">Effortless<br/><span className="italic font-light">Elegance</span></div>
          <div className="text-[5px] text-[#1a1714]/55 mb-3">Trang phục nữ cao cấp — tối giản, tự nhiên, bền vững.</div>
          <div className="flex gap-2">
            <div className="bg-[#1a1714] text-[#faf9f7] text-[6px] font-bold px-2 py-0.5 uppercase tracking-widest">Shop Now</div>
            <div className="border-b-2 border-[#1a1714] text-[6px] uppercase tracking-widest pb-0.5">Lookbook →</div>
          </div>
        </div>
        <div className="bg-[#f5ede6] flex flex-col justify-end">
          <div className="flex-1 flex items-center justify-center text-5xl">👗</div>
          <div className="bg-white/90 p-2 m-2 rounded-xl">
            <div className="text-[5px] text-rose-500 font-semibold uppercase mb-0.5">New Arrival</div>
            <div className="text-[7px] font-bold">Summer Linen Collection</div>
            <div className="text-[5px] text-[#1a1714]/55">Từ 650.000đ</div>
          </div>
        </div>
      </div>
    </div>,

    /* ── 10 GYM ── bg #0c0c0c, orange */
    10: <div className="w-full h-full bg-[#0c0c0c] text-white" style={{fontFamily:'sans-serif'}}>
      <div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/10 rounded-full blur-[40px]"/></div>
      <nav className="h-6 flex items-center gap-1.5 px-2.5 border-b border-white/5 relative z-10">
        <div className="flex gap-1"><NavDot/></div>
        <span className="text-[9px] font-black mr-auto">IRON<span className="text-orange-500">PEAK</span></span>
        <div className="hidden sm:flex gap-2 text-[5px] text-white/40 mr-1.5">{['Lịch Tập','HLV','Gói Tập'].map(n=><span key={n}>{n}</span>)}</div>
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[6px] font-bold px-1.5 py-0.5 rounded-lg">Tập Thử</div>
      </nav>
      <div className="px-3 pt-2.5 relative z-10">
        <div className="inline-flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 text-orange-300 text-[5px] px-1.5 py-0.5 rounded-full mb-2"><div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"/>Chi Nhánh 3 khai trương T7/2026</div>
        <div className="text-[15px] font-black leading-tight mb-2">FORGE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">YOUR</span><br/>LIMITS</div>
        <div className="text-[6px] text-white/50 mb-2">Hơn 2,000 hội viên · 12 HLV elite · 3 chi nhánh</div>
        <div className="flex gap-1.5 mb-3">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[6px] font-black px-2.5 py-1 rounded-lg">TẬP THỬ MIỄN PHÍ</div>
          <div className="border border-white/20 text-white text-[6px] px-2 py-1 rounded-lg">Xem Lịch</div>
        </div>
        <div className="flex gap-4">{[['2K+','Members'],['50+','Lớp/tuần'],['12','HLV']].map(([v,l])=><div key={l}><div className="text-[10px] font-black text-orange-400">{v}</div><div className="text-[5px] text-white/35">{l}</div></div>)}</div>
      </div>
    </div>,

    /* ── 11 PORTFOLIO ── bg #0d0d0d, violet/pink gradient */
    11: <div className="w-full h-full bg-[#0d0d0d] text-white" style={{fontFamily:'sans-serif'}}>
      <nav className="h-6 flex items-center gap-1.5 px-2.5 border-b border-white/5">
        <div className="flex gap-1"><NavDot/></div>
        <span className="text-[7px] font-bold tracking-tight mr-auto">Nguyễn Hoàng Minh</span>
        <div className="hidden sm:flex gap-2 text-[5px] text-white/45">{['Work','About','Process','Contact'].map(n=><span key={n}>{n}</span>)}</div>
      </nav>
      <div className="px-3 pt-3">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-[7px] font-black">M</div>
          <div className="flex items-center gap-1 text-[5px] text-white/40"><div className="w-1 h-1 bg-green-400 rounded-full"/>Available for work</div>
        </div>
        <div className="text-[14px] font-black leading-tight mb-1.5">Creative<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-orange-300">Designer</span><br/>&amp; Developer</div>
        <div className="text-[5px] text-white/45 mb-2">Đà Nẵng · 6 năm kinh nghiệm · 80+ dự án hoàn thành</div>
        <div className="flex flex-wrap gap-1 mb-2">{['Brand Identity','UI/UX Design','Web Design','Motion'].map(s=><span key={s} className="text-[5px] border border-white/15 text-white/55 px-1.5 py-0.5 rounded-full">{s}</span>)}</div>
        <div className="flex gap-1.5"><div className="bg-white text-[#0d0d0d] text-[6px] font-bold px-2.5 py-1 rounded-lg">Xem Portfolio</div><div className="border border-white/15 text-white text-[6px] px-2.5 py-1 rounded-lg">Liên hệ</div></div>
      </div>
    </div>,

    /* ── 12 ECOMMERCE ── bg #f8f9fb, blue, clean */
    12: <div className="w-full h-full bg-[#f8f9fb] text-[#111]" style={{fontFamily:'sans-serif'}}>
      <nav className="h-6 flex items-center px-2.5 border-b border-gray-200 bg-white/95">
        <div className="flex gap-1 mr-2"><NavDot/></div>
        <div className="flex items-center gap-1 mr-auto"><div className="w-3.5 h-3.5 bg-blue-600 rounded-md text-white text-[6px] font-black flex items-center justify-center">VT</div><span className="text-[7px] font-black">TechShop<span className="text-blue-600">.</span></span></div>
        <div className="flex-1 max-w-20 mx-2 border border-gray-200 rounded text-[5px] text-gray-400 px-1.5 py-0.5 bg-gray-50">🔍 Tìm...</div>
        <div className="bg-blue-600 text-white text-[5px] font-semibold px-1.5 py-0.5 rounded-lg">Giỏ hàng</div>
      </nav>
      <div className="mx-2 mt-1.5 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-2.5 flex items-center">
        <div>
          <div className="text-[5px] text-blue-300 mb-0.5">⚡ Flash Sale hôm nay</div>
          <div className="text-[11px] font-black text-white leading-tight">Giảm Đến <span className="text-yellow-400">50%</span><br/>Phụ Kiện Tech</div>
          <div className="bg-yellow-400 text-[#111] text-[6px] font-black px-2 py-0.5 rounded-lg mt-1 inline-block">Mua Ngay →</div>
        </div>
        <div className="ml-auto text-3xl opacity-60">⌨️</div>
      </div>
      <div className="mx-2 mt-1.5 grid grid-cols-4 gap-1">
        {[{e:'🎧',n:'Headphones',p:'2.49M',d:'-22%'},{e:'⌚',n:'Smart Watch',p:'5.99M',d:'-20%'},{e:'⌨️',n:'Keyboard',p:'1.89M',d:'-14%'},{e:'📷',n:'Webcam 4K',p:'1.29M',d:'-19%'}].map(item=>(
          <div key={item.n} className="bg-white rounded-lg p-1 border border-gray-100 shadow-sm text-center">
            <div className="text-base">{item.e}</div>
            <div className="text-[5px] font-semibold truncate text-[#111]">{item.n}</div>
            <div className="text-blue-600 font-black text-[5px]">{item.p}</div>
            <span className="text-[4px] bg-red-500 text-white px-0.5 rounded">{item.d}</span>
          </div>
        ))}
      </div>
    </div>,

    /* ── 13 BILLIARDS ── bg #080b10, green ambient */
    13: <div className="w-full h-full bg-[#080b10] text-white" style={{fontFamily:'sans-serif'}}>
      <div className="absolute inset-0 pointer-events-none"><div className="absolute top-1/4 left-0 w-24 h-24 bg-green-900/20 blur-[40px]"/></div>
      <nav className="h-6 flex items-center gap-1.5 px-2.5 border-b border-white/5 relative z-10">
        <div className="flex gap-1"><NavDot/></div>
        <span className="text-[7px] mr-1">🎱</span>
        <span className="text-[8px] font-black mr-auto">PRESTIGE<span className="text-green-400"> BILLIARDS</span></span>
        <div className="flex items-center gap-1 text-[5px] text-green-400 font-bold"><div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"/>5 bàn trống</div>
      </nav>
      <div className="px-3 pt-2.5 relative z-10">
        <div className="text-[5px] text-green-300 mb-1.5">VBA Certified · Diamond & Brunswick · Snooker 12ft</div>
        <div className="text-[14px] font-black leading-tight mb-2">BREAK<br/><span className="text-green-400">YOUR</span><br/>LIMITS</div>
        <div className="text-[6px] text-white/45 mb-2">8 bàn chuyên nghiệp · Carom · Snooker · 9-Ball</div>
        <div className="flex gap-1.5 mb-3">
          <div className="bg-green-500 text-[#080b10] text-[6px] font-black px-2.5 py-1 rounded-lg">🎱 Đặt Bàn Ngay</div>
          <div className="border border-white/20 text-white text-[6px] px-2 py-1 rounded-lg">🏆 Giải Đấu</div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[{s:'available'},{s:'occupied'},{s:'available'},{s:'booked'},{s:'available'},{s:'occupied'},{s:'available'},{s:'available'}].map((t,i)=>(
            <div key={i} className="rounded p-1 border border-[#2d7a4a]" style={{background:'#1a4a2e'}}>
              <div className={`w-1.5 h-1.5 rounded-full mx-auto ${t.s==='available'?'bg-green-400 animate-pulse':t.s==='occupied'?'bg-red-400':'bg-yellow-400'}`}/>
            </div>
          ))}
        </div>
      </div>
    </div>,

    /* ── 14 NET CAFE ── bg #05080f, cyan cyberpunk */
    14: <div className="w-full h-full bg-[#05080f] text-white" style={{fontFamily:'sans-serif'}}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden"><div className="absolute top-0 left-1/3 w-20 h-16 bg-cyan-900/20 blur-[30px]"/><div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage:'linear-gradient(rgba(0,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,0.5) 1px,transparent 1px)',backgroundSize:'20px 20px'}}/></div>
      <nav className="h-6 flex items-center gap-1.5 px-2.5 border-b border-cyan-500/10 relative z-10">
        <div className="flex gap-1"><NavDot/></div>
        <div className="w-3.5 h-3.5 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-[6px] font-black text-[#05080f]">NX</div>
        <span className="text-[8px] font-black mr-auto">NEXUS<span className="text-cyan-400"> GAMING</span></span>
        <div className="flex items-center gap-1 text-[5px] font-bold"><div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"/><span className="text-green-400">8 máy trống</span></div>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[6px] font-black px-1.5 py-0.5 rounded-lg ml-1">Đặt Máy</div>
      </nav>
      <div className="px-3 pt-2.5 relative z-10">
        <div className="text-[5px] text-cyan-300 mb-1.5">Esports chuẩn QT · 24/7 · 10Gbps · DXRacer</div>
        <div className="text-[14px] font-black leading-tight mb-2">GG OR<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">GO HOME</span></div>
        <div className="flex gap-1.5 mb-2.5">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[6px] font-black px-2.5 py-1 rounded-lg">🎮 Đặt Máy</div>
          <div className="border border-white/15 text-white text-[6px] px-2 py-1 rounded-lg">Xem Combo</div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[['360Hz','Màn hình'],['RTX4090','Zone A'],['10Gbps','Internet'],['24/7','Mở cửa']].map(([v,l])=>(
            <div key={l} className="bg-white/4 border border-cyan-500/12 rounded p-1 text-center"><div className="text-[6px] font-black text-cyan-400">{v}</div><div className="text-[4px] text-white/30">{l}</div></div>
          ))}
        </div>
      </div>
    </div>,

    /* ── 15 ĐẶT VÉ XE ── bg #f0f9ff, sky blue, gov style */
    15: <div className="w-full h-full bg-[#f0f9ff] text-[#0c1a2e]" style={{fontFamily:'sans-serif'}}>
      <nav className="h-6 flex items-center px-2.5 border-b border-sky-200/50 bg-white/90">
        <div className="flex gap-1 mr-2"><NavDot/></div>
        <div className="flex items-center gap-1 mr-auto">
          <div className="w-3.5 h-3.5 rounded-lg bg-sky-600 flex items-center justify-center text-white text-[7px]">🚌</div>
          <span className="text-[7px] font-bold text-sky-700">VéXe<span className="text-sky-400">.VN</span></span>
        </div>
        <div className="hidden sm:flex gap-1.5 text-[5px] text-sky-700/50 mr-1.5">{['Tuyến','Lịch','Đặt Vé'].map(n=><span key={n}>{n}</span>)}</div>
        <div className="bg-sky-600 text-white text-[5px] font-bold px-1.5 py-0.5 rounded-lg">Đặt Vé</div>
      </nav>
      <div className="px-3 pt-2.5">
        <div className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-[5px] px-1.5 py-0.5 rounded-full mb-1.5"><span className="w-1 h-1 bg-green-500 rounded-full"/>Miễn phí cho đơn vị nhà nước</div>
        <div className="text-[13px] font-bold leading-tight mb-1.5">Đặt Vé Xe<br/><span className="text-sky-600">Buýt & Điện</span><br/>Toàn Quốc</div>
        <div className="text-[5px] text-sky-700/60 mb-2">Serverless · GPS real-time · Thanh toán 0đ</div>
        <div className="flex gap-1 mb-2">
          <div className="bg-sky-600 text-white text-[6px] font-bold px-2 py-0.5 rounded-lg">🚌 Đặt Vé Ngay</div>
          <div className="border border-sky-300 text-sky-700 text-[6px] px-2 py-0.5 rounded-lg">🏛️ Dành cho Nhà nước</div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{i:'🚌',l:'120+ Tuyến'},{i:'📍',l:'GPS Live'},{i:'🆓',l:'Miễn phí'}].map(c=>
            <div key={c.l} className="bg-white rounded-lg p-1.5 text-center border border-sky-100 shadow-sm">
              <div className="text-sm">{c.i}</div>
              <div className="text-[4px] font-semibold text-sky-700">{c.l}</div>
            </div>
          )}
        </div>
      </div>
    </div>,

    /* ── 16 ĐẶT LỊCH KHÁM ── bg #f0fdf4, green gov */
    16: <div className="w-full h-full bg-[#f0fdf4] text-[#0c2e1a]" style={{fontFamily:'sans-serif'}}>
      <nav className="h-6 flex items-center px-2.5 border-b border-green-200/50 bg-white/90">
        <div className="flex gap-1 mr-2"><NavDot/></div>
        <div className="flex items-center gap-1 mr-auto">
          <div className="w-3.5 h-3.5 rounded-lg bg-green-600 flex items-center justify-center text-white text-[7px]">+</div>
          <span className="text-[7px] font-bold text-green-700">Khám<span className="text-green-400">Sức</span>.VN</span>
        </div>
        <div className="hidden sm:flex gap-1.5 text-[5px] text-green-700/50 mr-1.5">{['Đặt Lịch','Bác Sĩ','BHYT'].map(n=><span key={n}>{n}</span>)}</div>
        <div className="bg-green-600 text-white text-[5px] font-bold px-1.5 py-0.5 rounded-lg">Đặt Lịch</div>
      </nav>
      <div className="px-3 pt-2.5">
        <div className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-[5px] px-1.5 py-0.5 rounded-full mb-1.5"><span className="w-1 h-1 bg-green-500 rounded-full"/>Miễn phí trạm y tế</div>
        <div className="text-[13px] font-bold leading-tight mb-1.5">Đặt Lịch<br/><span className="text-green-600">Khám Bệnh</span><br/>Pường/Xã</div>
        <div className="text-[5px] text-green-700/60 mb-2">QR code · Zalo mini-app · Số thứ tự real-time</div>
        <div className="flex gap-1 mb-2">
          <div className="bg-green-600 text-white text-[6px] font-bold px-2 py-0.5 rounded-lg">+ Đặt Lịch</div>
          <div className="border border-green-300 text-green-700 text-[6px] px-2 py-0.5 rounded-lg">🏥 Trạm Y Tế</div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{i:'📋',l:'Đặt lịch'},{i:'📱',l:'QR / Zalo'},{i:'🏥',l:'120+ trạm'}].map(c=>
            <div key={c.l} className="bg-white rounded-lg p-1.5 text-center border border-green-100 shadow-sm">
              <div className="text-sm">{c.i}</div>
              <div className="text-[4px] font-semibold text-green-700">{c.l}</div>
            </div>
          )}
        </div>
      </div>
    </div>,

    /* ── 17 THƯ VIỆN ── bg #faf5ff, violet gov */
    17: <div className="w-full h-full bg-[#faf5ff] text-[#1a0c2e]" style={{fontFamily:'sans-serif'}}>
      <nav className="h-6 flex items-center px-2.5 border-b border-violet-200/50 bg-white/90">
        <div className="flex gap-1 mr-2"><NavDot/></div>
        <div className="flex items-center gap-1 mr-auto">
          <div className="w-3.5 h-3.5 rounded-lg bg-violet-600 flex items-center justify-center text-white text-[7px]">📖</div>
          <span className="text-[7px] font-bold text-violet-700">Thư Viện<span className="text-violet-400">.VN</span></span>
        </div>
        <div className="hidden sm:flex gap-1.5 text-[5px] text-violet-700/50 mr-1.5">{['Tra Cứu','Đặt Chỗ','Mượn Sách'].map(n=><span key={n}>{n}</span>)}</div>
        <div className="bg-violet-600 text-white text-[5px] font-bold px-1.5 py-0.5 rounded-lg">Tra Cứu</div>
      </nav>
      <div className="px-3 pt-2.5">
        <div className="inline-flex items-center gap-1 bg-violet-50 border border-violet-200 text-violet-700 text-[5px] px-1.5 py-0.5 rounded-full mb-1.5"><span className="w-1 h-1 bg-violet-500 rounded-full"/>Miễn phí thư viện công</div>
        <div className="text-[13px] font-bold leading-tight mb-1.5">Thư Viện<br/><span className="text-violet-600">Công Cộng</span><br/>Trực Tuyến</div>
        <div className="text-[5px] text-violet-700/60 mb-2">Catalogue online · QR scan · Gia hạn sách</div>
        <div className="flex gap-1 mb-2">
          <div className="bg-violet-600 text-white text-[6px] font-bold px-2 py-0.5 rounded-lg">📖 Tra Cứu</div>
          <div className="border border-violet-300 text-violet-700 text-[6px] px-2 py-0.5 rounded-lg">📚 Đặt Chỗ</div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{i:'📚',l:'50K+ đầu sách'},{i:'📱',l:'QR scan'},{i:'📊',l:'Thống kê'}].map(c=>
            <div key={c.l} className="bg-white rounded-lg p-1.5 text-center border border-violet-100 shadow-sm">
              <div className="text-sm">{c.i}</div>
              <div className="text-[4px] font-semibold text-violet-700">{c.l}</div>
            </div>
          )}
        </div>
      </div>
    </div>,

    /* ── 18 ĐĂNG KÝ SỰ KIỆN ── bg #fff7ed, orange gov */
    18: <div className="w-full h-full bg-[#fff7ed] text-[#2e1a0c]" style={{fontFamily:'sans-serif'}}>
      <nav className="h-6 flex items-center px-2.5 border-b border-orange-200/50 bg-white/90">
        <div className="flex gap-1 mr-2"><NavDot/></div>
        <div className="flex items-center gap-1 mr-auto">
          <div className="w-3.5 h-3.5 rounded-lg bg-orange-600 flex items-center justify-center text-white text-[7px]">🎉</div>
          <span className="text-[7px] font-bold text-orange-700">Sự Kiện<span className="text-orange-400">.VN</span></span>
        </div>
        <div className="hidden sm:flex gap-1.5 text-[5px] text-orange-700/50 mr-1.5">{['Sự kiện','Đăng ký','Lịch'].map(n=><span key={n}>{n}</span>)}</div>
        <div className="bg-orange-600 text-white text-[5px] font-bold px-1.5 py-0.5 rounded-lg">Đăng Ký</div>
      </nav>
      <div className="px-3 pt-2.5">
        <div className="inline-flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-700 text-[5px] px-1.5 py-0.5 rounded-full mb-1.5"><span className="w-1 h-1 bg-orange-500 rounded-full"/>Miễn phí UBND phường/xã</div>
        <div className="text-[13px] font-bold leading-tight mb-1.5">Đăng Ký<br/><span className="text-orange-600">Sự Kiện</span><br/>Cộng Đồng</div>
        <div className="text-[5px] text-orange-700/60 mb-2">SMS/Zalo xác nhận · Check-in QR · Đánh giá</div>
        <div className="flex gap-1 mb-2">
          <div className="bg-orange-600 text-white text-[6px] font-bold px-2 py-0.5 rounded-lg">🎉 Đăng Ký</div>
          <div className="border border-orange-300 text-orange-700 text-[6px] px-2 py-0.5 rounded-lg">📅 Lịch Sự Kiện</div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{i:'📅',l:'20+ sự kiện/tháng'},{i:'📱',l:'SMS/Zalo'},{i:'✅',l:'QR check-in'}].map(c=>
            <div key={c.l} className="bg-white rounded-lg p-1.5 text-center border border-orange-100 shadow-sm">
              <div className="text-sm">{c.i}</div>
              <div className="text-[4px] font-semibold text-orange-700">{c.l}</div>
            </div>
          )}
        </div>
      </div>
    </div>,

    /* ── 19 PHẢN HỒI Ý KIẾN ── bg #fef2f2, red gov */
    19: <div className="w-full h-full bg-[#fef2f2] text-[#2e0c0c]" style={{fontFamily:'sans-serif'}}>
      <nav className="h-6 flex items-center px-2.5 border-b border-red-200/50 bg-white/90">
        <div className="flex gap-1 mr-2"><NavDot/></div>
        <div className="flex items-center gap-1 mr-auto">
          <div className="w-3.5 h-3.5 rounded-lg bg-red-600 flex items-center justify-center text-white text-[7px]">💬</div>
          <span className="text-[7px] font-bold text-red-700">Phản Hồi<span className="text-red-400">.VN</span></span>
        </div>
        <div className="hidden sm:flex gap-1.5 text-[5px] text-red-700/50 mr-1.5">{['Gửi PH','Tra cứu','Thống kê'].map(n=><span key={n}>{n}</span>)}</div>
        <div className="bg-red-600 text-white text-[5px] font-bold px-1.5 py-0.5 rounded-lg">Gửi PH</div>
      </nav>
      <div className="px-3 pt-2.5">
        <div className="inline-flex items-center gap-1 bg-red-50 border border-red-200 text-red-700 text-[5px] px-1.5 py-0.5 rounded-full mb-1.5"><span className="w-1 h-1 bg-red-500 rounded-full"/>Miễn phí UBND các cấp</div>
        <div className="text-[13px] font-bold leading-tight mb-1.5">Phản Hồi<br/><span className="text-red-600">Ý Kiến</span><br/>Người Dân</div>
        <div className="text-[5px] text-red-700/60 mb-2">Form web · Ảnh/Video · Tracking real-time</div>
        <div className="flex gap-1 mb-2">
          <div className="bg-red-600 text-white text-[6px] font-bold px-2 py-0.5 rounded-lg">💬 Gửi Phản Hồi</div>
          <div className="border border-red-300 text-red-700 text-[6px] px-2 py-0.5 rounded-lg">📊 Theo Dõi</div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[{i:'📝',l:'Khiếu nại'},{i:'📸',l:'Đính kèm'},{i:'⚡',l:'Tracking'}].map(c=>
            <div key={c.l} className="bg-white rounded-lg p-1.5 text-center border border-red-100 shadow-sm">
              <div className="text-sm">{c.i}</div>
              <div className="text-[4px] font-semibold text-red-700">{c.l}</div>
            </div>
          )}
        </div>
      </div>
    </div>,
  }

  const fallback = (
    <div className="w-full h-full overflow-hidden relative" style={{background:`linear-gradient(135deg,${t.accentColor}18,#0d1117 60%)`,fontFamily:'sans-serif'}}>
      <nav className="h-6 flex items-center gap-1.5 px-2.5 border-b border-white/8">
        <div className="flex gap-1 mr-1"><NavDot/></div>
        <div className="w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0" style={{background:t.accentColor}}><t.Icon size={8} color="#fff"/></div>
        <span className="text-[7px] font-bold text-white truncate mr-auto">{t.title}</span>
        <div className="text-[6px] text-white text-[5px] font-bold px-1.5 py-0.5 rounded" style={{background:t.accentColor}}>CTA</div>
      </nav>
      <div className="px-3 pt-2.5">
        <div className="text-[6px] font-bold uppercase tracking-widest mb-1.5" style={{color:t.accentColor}}>{t.subtitle}</div>
        <div className="text-[14px] font-black text-white leading-tight mb-2">{t.title.split(' ').slice(0,3).join(' ')}</div>
        <div className="text-[6px] text-white/45 mb-2">{t.longDesc.split('.')[0]}.</div>
        <div className="flex gap-1.5 flex-wrap">{t.tags.slice(0,3).map(tag=><span key={tag} className="text-[5px] px-1.5 py-0.5 rounded-full border font-semibold" style={{borderColor:`${t.accentColor}40`,color:t.accentColor,background:`${t.accentColor}15`}}>{tag}</span>)}</div>
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
    // Đặt Vé Xe — sky blue gov
    15: (
      <div className="w-full h-full bg-[#f0f9ff] text-[#0c1a2e] overflow-hidden" style={{fontFamily:'sans-serif'}}>
        <div className="h-10 flex items-center px-6 border-b border-sky-200/50 bg-white/90">
          <div className="flex items-center gap-2 mr-auto">
            <div className="w-6 h-6 rounded-lg bg-sky-600 flex items-center justify-center text-white text-xs">🚌</div>
            <span className="text-sm font-bold text-sky-700">VéXe<span className="text-sky-400">.VN</span></span>
          </div>
          <div className="hidden md:flex gap-5 text-[11px] text-sky-700/50 mr-6">{['Tuyến','Lịch','Đặt Vé','Liên hệ'].map(n=><span key={n}>{n}</span>)}</div>
          <div className="bg-sky-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg">Đặt Vé</div>
        </div>
        <div className="px-8 pt-10">
          <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-semibold px-3 py-1 rounded-full mb-4"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"/>Miễn phí cho đơn vị nhà nước</div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3 text-[#0c1a2e]">Đặt Vé Xe<br/><span className="text-sky-600">Buýt & Điện</span><br/>Toàn Quốc</h1>
          <p className="text-sky-700/60 text-sm mb-5 max-w-xs">Nền tảng serverless miễn phí — GPS real-time, thanh toán không tiền mặt, hỗ trợ đa ngôn ngữ.</p>
          <div className="flex gap-3 mb-8">
            <div className="bg-sky-600 text-white text-xs font-bold px-5 py-2 rounded-lg">🚌 Đặt Vé Ngay</div>
            <div className="border border-sky-300 text-sky-700 text-xs px-5 py-2 rounded-lg">🏛️ Dành cho Nhà nước</div>
          </div>
          <div className="inline-flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-xl px-5 py-3 mb-6">
            <Landmark size={16} className="text-sky-600" />
            <div>
              <p className="text-[11px] font-bold text-[#0c1a2e]">Đơn vị nhà nước muốn hợp tác?</p>
              <p className="text-[10px] text-sky-700/60">App riêng theo yêu cầu — tích hợp GPS, quản lý bến bãi, báo cáo hành trình.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[['120+','Tuyến xe'],['GPS','Real-time'],['0đ','Miễn phí']].map(([v,l])=>(
              <div key={l} className="bg-white border border-sky-100 rounded-xl p-3 text-center shadow-sm"><div className="text-xl font-black text-sky-600">{v}</div><div className="text-[9px] text-sky-700/50">{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    ),
    // Đặt Lịch Khám — green gov
    16: (
      <div className="w-full h-full bg-[#f0fdf4] text-[#0c2e1a] overflow-hidden" style={{fontFamily:'sans-serif'}}>
        <div className="h-10 flex items-center px-6 border-b border-green-200/50 bg-white/90">
          <div className="flex items-center gap-2 mr-auto">
            <div className="w-6 h-6 rounded-lg bg-green-600 flex items-center justify-center text-white text-xs">+</div>
            <span className="text-sm font-bold text-green-700">Khám<span className="text-green-400">Sức</span>.VN</span>
          </div>
          <div className="hidden md:flex gap-5 text-[11px] text-green-700/50 mr-6">{['Đặt Lịch','Bác Sĩ','BHYT'].map(n=><span key={n}>{n}</span>)}</div>
          <div className="bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg">Đặt Lịch</div>
        </div>
        <div className="px-8 pt-10">
          <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-semibold px-3 py-1 rounded-full mb-4"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"/>Miễn phí trạm y tế phường/xã</div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3 text-[#0c2e1a]">Đặt Lịch<br/><span className="text-green-600">Khám Bệnh</span><br/>Tại Trạm Y Tế</h1>
          <p className="text-green-700/60 text-sm mb-5 max-w-xs">Đặt lịch qua QR code hoặc Zalo mini-app — chọn khung giờ, xem số thứ tự real-time, quản lý hồ sơ khám bệnh.</p>
          <div className="flex gap-3 mb-8">
            <div className="bg-green-600 text-white text-xs font-bold px-5 py-2 rounded-lg">📋 Đặt Lịch Ngay</div>
            <div className="border border-green-300 text-green-700 text-xs px-5 py-2 rounded-lg">🏥 Trạm Y Tế</div>
          </div>
          <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-3 mb-6">
            <HeartPulse size={16} className="text-green-600" />
            <div>
              <p className="text-[11px] font-bold text-[#0c2e1a]">Nhà nước muốn hợp tác?</p>
              <p className="text-[10px] text-green-700/60">Tích hợp BHYT, hệ thống y tế quốc gia, nhắc tái khám tự động.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[['📋','Đặt lịch'],['📱','QR / Zalo'],['🏥','120+ trạm']].map(([v,l])=>(
              <div key={l} className="bg-white border border-green-100 rounded-xl p-3 text-center shadow-sm"><div className="text-xl">{v}</div><div className="text-[9px] text-green-700/50">{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    ),
    // Thư Viện — violet gov
    17: (
      <div className="w-full h-full bg-[#faf5ff] text-[#1a0c2e] overflow-hidden" style={{fontFamily:'sans-serif'}}>
        <div className="h-10 flex items-center px-6 border-b border-violet-200/50 bg-white/90">
          <div className="flex items-center gap-2 mr-auto">
            <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs">📖</div>
            <span className="text-sm font-bold text-violet-700">Thư Viện<span className="text-violet-400">.VN</span></span>
          </div>
          <div className="hidden md:flex gap-5 text-[11px] text-violet-700/50 mr-6">{['Tra Cứu','Đặt Chỗ','Mượn Sách'].map(n=><span key={n}>{n}</span>)}</div>
          <div className="bg-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg">Tra Cứu</div>
        </div>
        <div className="px-8 pt-10">
          <div className="inline-flex items-center gap-1.5 bg-violet-50 border border-violet-200 text-violet-700 text-[10px] font-semibold px-3 py-1 rounded-full mb-4"><div className="w-1.5 h-1.5 bg-violet-500 rounded-full"/>Miễn phí thư viện công</div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3 text-[#1a0c2e]">Thư Viện<br/><span className="text-violet-600">Công Cộng</span><br/>Trực Tuyến</h1>
          <p className="text-violet-700/60 text-sm mb-5 max-w-xs">Tra cứu catalogue online, đặt chỗ sách, barcode/QR scan khi mượn trả. Thống kê lượt đọc theo thể loại.</p>
          <div className="flex gap-3 mb-8">
            <div className="bg-violet-600 text-white text-xs font-bold px-5 py-2 rounded-lg">📖 Tra Cứu Sách</div>
            <div className="border border-violet-300 text-violet-700 text-xs px-5 py-2 rounded-lg">📚 Đặt Chỗ Online</div>
          </div>
          <div className="inline-flex items-center gap-3 bg-violet-50 border border-violet-200 rounded-xl px-5 py-3 mb-6">
            <BookOpen size={16} className="text-violet-600" />
            <div>
              <p className="text-[11px] font-bold text-[#1a0c2e]">Đơn vị nhà nước muốn hợp tác?</p>
              <p className="text-[10px] text-violet-700/60">Tích hợp mạng lưới thư viện quốc gia, OCR tìm kiếm nội dung.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[['📚','50K+ đầu sách'],['📱','QR scan'],['📊','Thống kê']].map(([v,l])=>(
              <div key={l} className="bg-white border border-violet-100 rounded-xl p-3 text-center shadow-sm"><div className="text-xl">{v}</div><div className="text-[9px] text-violet-700/50">{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    ),
    // Đăng Ký Sự Kiện — orange gov
    18: (
      <div className="w-full h-full bg-[#fff7ed] text-[#2e1a0c] overflow-hidden" style={{fontFamily:'sans-serif'}}>
        <div className="h-10 flex items-center px-6 border-b border-orange-200/50 bg-white/90">
          <div className="flex items-center gap-2 mr-auto">
            <div className="w-6 h-6 rounded-lg bg-orange-600 flex items-center justify-center text-white text-xs">🎉</div>
            <span className="text-sm font-bold text-orange-700">Sự Kiện<span className="text-orange-400">.VN</span></span>
          </div>
          <div className="hidden md:flex gap-5 text-[11px] text-orange-700/50 mr-6">{['Sự kiện','Đăng ký','Lịch'].map(n=><span key={n}>{n}</span>)}</div>
          <div className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg">Đăng Ký</div>
        </div>
        <div className="px-8 pt-10">
          <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-[10px] font-semibold px-3 py-1 rounded-full mb-4"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full"/>Miễn phí UBND phường/xã</div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3 text-[#2e1a0c]">Đăng Ký<br/><span className="text-orange-600">Sự Kiện</span><br/>Cộng Đồng</h1>
          <p className="text-orange-700/60 text-sm mb-5 max-w-xs">Hội thảo, lớp học miễn phí, ngày hội sức khỏe. Xác nhận qua SMS/Zalo, check-in QR, đánh giá sự kiện.</p>
          <div className="flex gap-3 mb-8">
            <div className="bg-orange-600 text-white text-xs font-bold px-5 py-2 rounded-lg">🎉 Đăng Ký Ngay</div>
            <div className="border border-orange-300 text-orange-700 text-xs px-5 py-2 rounded-lg">📅 Lịch Sự Kiện</div>
          </div>
          <div className="inline-flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl px-5 py-3 mb-6">
            <CalendarDays size={16} className="text-orange-600" />
            <div>
              <p className="text-[11px] font-bold text-[#2e1a0c]">UBND phường/xã muốn hợp tác?</p>
              <p className="text-[10px] text-orange-700/60">Tích hợp cổng thông tin điện tử tỉnh, quản lý sự kiện cộng đồng.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[['📅','20+ SK/tháng'],['📱','SMS/Zalo'],['✅','QR check-in']].map(([v,l])=>(
              <div key={l} className="bg-white border border-orange-100 rounded-xl p-3 text-center shadow-sm"><div className="text-xl">{v}</div><div className="text-[9px] text-orange-700/50">{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    ),
    // Phản Hồi Ý Kiến — red gov
    19: (
      <div className="w-full h-full bg-[#fef2f2] text-[#2e0c0c] overflow-hidden" style={{fontFamily:'sans-serif'}}>
        <div className="h-10 flex items-center px-6 border-b border-red-200/50 bg-white/90">
          <div className="flex items-center gap-2 mr-auto">
            <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center text-white text-xs">💬</div>
            <span className="text-sm font-bold text-red-700">Phản Hồi<span className="text-red-400">.VN</span></span>
          </div>
          <div className="hidden md:flex gap-5 text-[11px] text-red-700/50 mr-6">{['Gửi PH','Tra cứu','Thống kê'].map(n=><span key={n}>{n}</span>)}</div>
          <div className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg">Gửi PH</div>
        </div>
        <div className="px-8 pt-10">
          <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-700 text-[10px] font-semibold px-3 py-1 rounded-full mb-4"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"/>Miễn phí UBND các cấp</div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3 text-[#2e0c0c]">Phản Hồi<br/><span className="text-red-600">Ý Kiến</span><br/>Người Dân</h1>
          <p className="text-red-700/60 text-sm mb-5 max-w-xs">Cổng tiếp nhận phản hồi, kiến nghị, khiếu nại — đính kèm ảnh/video, tracking real-time, báo cáo theo khu vực.</p>
          <div className="flex gap-3 mb-8">
            <div className="bg-red-600 text-white text-xs font-bold px-5 py-2 rounded-lg">💬 Gửi Phản Hồi</div>
            <div className="border border-red-300 text-red-700 text-xs px-5 py-2 rounded-lg">📊 Theo Dõi Trạng Thái</div>
          </div>
          <div className="inline-flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-3 mb-6">
            <MessageCircleWarning size={16} className="text-red-600" />
            <div>
              <p className="text-[11px] font-bold text-[#2e0c0c]">UBND muốn hợp tác?</p>
              <p className="text-[10px] text-red-700/60">Tích hợp Cổng Dịch vụ Công Quốc gia, phân công xử lý tự động.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[['📝','Khiếu nại'],['📸','Đính kèm'],['⚡','Tracking']].map(([v,l])=>(
              <div key={l} className="bg-white border border-red-100 rounded-xl p-3 text-center shadow-sm"><div className="text-xl">{v}</div><div className="text-[9px] text-red-700/50">{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    ),

    /* ── 20 ANTI-BULLYING / SAFE SCHOOL ── bg #0f0a1a, purple accent */
    20: (
      <div className="w-full h-full bg-[#0f0a1a] text-white overflow-hidden" style={{fontFamily:'sans-serif'}}>
        <nav className="h-6 flex items-center gap-2 px-2.5 border-b border-purple-500/10 bg-[#16102a]/90">
          <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500/70"/><div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60"/><div className="w-1.5 h-1.5 rounded-full bg-green-500/60"/></div>
          <div className="flex items-center gap-1 mr-auto">
            <div className="w-3.5 h-3.5 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center text-[6px]">🛡️</div>
            <span className="text-[8px] font-black text-purple-200">An Toàn<span className="text-purple-400">.VN</span></span>
          </div>
          <div className="hidden sm:flex gap-2 text-[5px] text-purple-300/40">{['Báo cáo','Theo dõi','Tài liệu'].map(n=><span key={n}>{n}</span>)}</div>
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 text-[5px] font-bold px-1.5 py-0.5 rounded">111</div>
        </nav>
        <div className="px-3 pt-3">
          <div className="inline-flex items-center gap-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[5px] px-1.5 py-0.5 rounded-full mb-2"><span className="w-1 h-1 bg-purple-400 rounded-full"/>Nền tảng bảo vệ HS</div>
          <div className="text-[11px] font-black leading-tight mb-1.5">Mỗi Trẻ Em<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Đáng Được</span><br/>An Toàn</div>
          <div className="text-[5px] text-purple-300/40 mb-2">Báo cáo ẩn danh · Hotline 111 · 24/7</div>
          <div className="flex gap-1"><div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[5px] font-bold px-2 py-0.5 rounded-lg">Báo cáo</div><div className="border border-purple-500/20 text-purple-300 text-[5px] px-2 py-0.5 rounded-lg">Tài liệu</div></div>
          <div className="flex gap-2 mt-2">
            <div className="bg-white/[0.03] border border-purple-500/10 rounded-lg p-1.5 w-16"><div className="text-[5px] text-purple-300/40">Báo cáo</div><div className="text-[9px] font-black text-purple-300">12,847</div></div>
            <div className="bg-white/[0.03] border border-purple-500/10 rounded-lg p-1.5 w-16"><div className="text-[5px] text-purple-300/40">Giải quyết</div><div className="text-[9px] font-black text-green-400">94%</div></div>
          </div>
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

function TemplateModal({ t: tpl, onClose }: { t: Template; onClose: () => void }) {
  const { t } = useI18n()
  const [device, setDevice] = useState<DeviceType>('desktop')
  const [loaded, setLoaded] = useState(false)
  const current = DEVICES.find(d => d.key === device)!

  // Khi đổi template reset loaded
  const iframeKey = `${tpl.id}-${device}`

  const deviceWidth: Record<DeviceType, string> = {
    desktop: '100%',
    tablet: '768px',
    mobile: '390px',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      <div
        className="relative z-10 w-full max-w-6xl max-h-[95vh] flex flex-col rounded-2xl border overflow-hidden"
        style={{ borderColor: 'var(--card-border)', background: 'var(--surface-2)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Top bar ── */}
        <div className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0" style={{ borderColor: 'var(--border-subtle)', background: 'var(--surface-1)' }}>
          <div className="flex gap-1.5">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="flex-1 flex items-center gap-2 border rounded-lg px-3 h-7 min-w-0" style={{ background: 'var(--surface-2)', borderColor: 'var(--border-subtle)' }}>
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: tpl.accentColor }} />
            <span className="text-[11px] truncate font-mono" style={{ color: 'var(--muted)' }}>vai-tech.asia{tpl.demoHref}</span>
          </div>
          {/* Device switcher */}
          <div className="flex items-center gap-1 border rounded-lg p-1" style={{ background: 'var(--surface-2)', borderColor: 'var(--border-subtle)' }}>
            {DEVICES.map(({ key, label, Icon }) => (
              <button key={key} onClick={() => { setDevice(key); setLoaded(false) }} title={label}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${device === key ? 'bg-white/15 text-white' : 'hover:opacity-80'}`}
                style={device === key ? { background: 'var(--accent)' + '26', color: 'var(--accent)' } : { color: 'var(--muted)' }}>
                <Icon size={13} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
          <Link href={tpl.demoHref} target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 flex-shrink-0"
            style={{ background: tpl.accentColor, color: '#fff' }}>
            <ExternalLink size={12} />
            <span className="hidden sm:inline">{t('tpl.openTab')}</span>
          </Link>
          {tpl.category === 'nha-nuoc' && (
            <Link href="/contact" target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-500 text-white transition-all hover:scale-105 flex-shrink-0">
              <Landmark size={12} />
              <span className="hidden sm:inline">{t('tpl.contact')}</span>
            </Link>
          )}
        </div>

        {/* ── iframe Preview ── */}
        <div className="flex-1 min-h-0 flex items-start justify-center overflow-auto p-3" style={{ height: '560px', background: 'var(--background)' }}>
          <div
            className="relative transition-all duration-400 ease-out rounded-xl overflow-hidden border shadow-2xl bg-white flex-shrink-0"
            style={{ width: deviceWidth[device], maxWidth: '100%', height: '100%', minHeight: '500px', borderColor: 'var(--card-border)' }}
          >
            {!loaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3" style={{ background: 'var(--surface-2)' }}>
                <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--border-subtle)', borderTopColor: 'var(--accent)' }} />
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{t('tpl.loading')} {current.label} preview...</p>
              </div>
            )}
            <iframe
              key={iframeKey}
              src={tpl.demoHref}
              className="w-full h-full border-0"
              style={{ minHeight: '500px' }}
              onLoad={() => setLoaded(true)}
              title={`${tpl.title} preview`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex items-center justify-between gap-4 px-5 py-3 border-t flex-shrink-0" style={{ borderColor: 'var(--border-subtle)', background: 'var(--surface-1)' }}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${tpl.accentColor}20` }}>
              <tpl.Icon size={14} style={{ color: tpl.accentColor }} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{tpl.title}</p>
              <p className="text-[10px]" style={{ color: 'var(--muted)' }}>{tpl.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden md:flex gap-1.5">
              {tpl.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border font-semibold"
                  style={{ borderColor: `${tpl.accentColor}35`, color: tpl.accentColor, background: `${tpl.accentColor}10` }}>
                  {tag}
                </span>
              ))}
            </div>
            <Link href={tpl.demoHref} target="_blank"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs border transition-all whitespace-nowrap"
              style={{ borderColor: 'var(--card-border)', color: 'var(--text-secondary)' }}>
              <ExternalLink size={12} />{t('tpl.openTab')}
            </Link>
            {tpl.category === 'nha-nuoc' ? (
              <Link href="/contact" target="_blank"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs transition-all whitespace-nowrap"
                style={{ background: tpl.accentColor, color: '#fff' }}>
                <Landmark size={12} />{t('tpl.contact')}
              </Link>
            ) : (
              <Link href="/register"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs transition-all whitespace-nowrap"
                style={{ background: tpl.accentColor, color: '#fff' }}>
                <Rocket size={12} />{t('tpl.useTpl')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default function TemplatesPage() {
  const { t } = useI18n()
  const [active, setActive] = useState('all')
  const [selected, setSelected] = useState<Template | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  const categories = getCategories(t)
  const filtered = active === 'all' ? templates : templates.filter(t => t.category === active)

  const scroll = (dir: 'left' | 'right') => {
    filterRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' })
  }

  return (
    <>
      <div className="pt-32 pb-[120px] px-6 md:px-16 max-w-[1280px] mx-auto">
        {/* Header */}
        <header className="mb-16 max-w-3xl">
          <div className="inline-block px-3 py-1 mb-6 border rounded-full" style={{ borderColor: 'var(--accent)' + '33', background: 'var(--accent)' + '0d' }}>
            <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: 'var(--accent)' }}>{t('tpl.badge')}</span>
          </div>
          <h1 className="text-[clamp(36px,5vw,64px)] font-bold mb-5 leading-tight tracking-[-0.02em]" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            {t('tpl.title1')}{' '}
            <span style={{ color: 'var(--accent)', opacity: 0.6 }}>{t('tpl.title2')}</span>.
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('tpl.desc')}
          </p>
        </header>

        {/* Filter — scrollable với arrows */}
        <div className="relative flex items-center gap-2 mb-12">
          {/* Arrow trái */}
          <button onClick={() => scroll('left')}
            className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{ background: 'var(--surface-1)', borderColor: 'var(--card-border)' }}>
            <ChevronLeft size={14} style={{ color: 'var(--text-secondary)' }} />
          </button>

          {/* Filter row */}
          <div ref={filterRef} className="flex gap-2 overflow-x-auto pb-0 scrollbar-hide flex-1">
            {categories.map(cat => (
              <button key={cat.key} onClick={() => setActive(cat.key)}
                className="flex-shrink-0 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest border transition-all duration-200"
                style={active === cat.key
                  ? { background: 'var(--surface-1)', color: 'var(--accent)', borderColor: 'var(--accent)' + '66' }
                  : { background: 'transparent', color: 'var(--text-secondary)', borderColor: 'var(--card-border)' }}>
                {cat.label}
                {cat.key === 'all' && <span className="ml-1.5" style={{ color: 'var(--muted)' }}>{templates.length}</span>}
              </button>
            ))}
          </div>

          {/* Arrow phải */}
          <button onClick={() => scroll('right')}
            className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            style={{ background: 'var(--surface-1)', borderColor: 'var(--card-border)' }}>
            <ChevronRight size={14} style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(tpl => (
            <div key={tpl.id}
              className="group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'var(--surface-2)', borderColor: 'var(--card-border)' }}
              onMouseEnter={() => setHovered(tpl.id)} onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(tpl)}>

              {/* Thumbnail — mini preview render trực tiếp */}
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* Browser chrome */}
                <div className="absolute top-0 left-0 right-0 h-6 flex items-center gap-1.5 px-2.5 z-10" style={{ background: 'var(--surface-1)' + 'ee' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                  <div className="flex-1 mx-2 h-2.5 rounded-sm text-[8px] flex items-center px-1.5 font-mono overflow-hidden"
                    style={{ background: 'var(--border-subtle)', color: 'var(--muted)' }}>
                    vai-tech.asia{tpl.demoHref}
                  </div>
                </div>

                {/* Mini preview content */}
                <div className="absolute inset-0 pt-6 overflow-hidden">
                  <CardPreview t={tpl} />
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-20 ${hovered === tpl.id ? 'opacity-100' : 'opacity-0'}`}
                  style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm backdrop-blur-sm shadow-xl" style={{ background: tpl.accentColor, color: '#fff' }}>
                    <Eye size={14} />{t('tpl.viewDetail')}
                  </div>
                </div>

                {/* Accent line */}
                <div className="absolute top-6 left-0 right-0 h-px z-10" style={{ background: `linear-gradient(90deg, transparent, ${tpl.accentColor}50, transparent)` }} />
              </div>

              {/* Card info */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest block mb-1" style={{ color: tpl.accentColor }}>{tpl.subtitle}</span>
                  <h3 className="font-bold text-base leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{tpl.title}</h3>
                  <p className="text-xs mt-1 line-clamp-1" style={{ color: 'var(--muted)' }}>{tpl.desc}</p>
                </div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ml-3 transition-transform group-hover:scale-110 duration-300" style={{ background: `${tpl.accentColor}20` }}>
                  <tpl.Icon size={18} style={{ color: tpl.accentColor }} />
                </div>
              </div>

              {/* Tags */}
              <div className="px-5 pb-5 flex flex-wrap gap-1.5">
                {tpl.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 rounded border" style={{ background: 'var(--surface-1)', color: 'var(--muted)', borderColor: 'var(--border-subtle)' }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 glass-card rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-48 h-80 rounded-full blur-[80px] opacity-20" style={{ background: 'var(--accent)' }} />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-[80px] opacity-20" style={{ background: 'var(--accent)' }} />
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('tpl.noMatch')}</h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>{t('tpl.ctaDesc')}</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 border"
            style={{ background: 'var(--accent)', color: 'var(--accent-dim)', borderColor: 'var(--accent)' }}>
            <Paintbrush size={16} />{t('tpl.ctaBtn')}
          </Link>
        </div>
      </div>

      {selected && <TemplateModal t={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
