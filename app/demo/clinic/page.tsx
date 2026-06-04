'use client'
import { useState } from 'react'
import Link from 'next/link'

const services = [
  { icon:'healing', title:'Khám Tổng Quát', price:'500.000đ', duration:'60 phút', desc:'Khám sức khoẻ toàn diện, xét nghiệm máu cơ bản, tư vấn dinh dưỡng.' },
  { icon:'favorite', title:'Tim Mạch', price:'800.000đ', duration:'90 phút', desc:'Điện tâm đồ, siêu âm tim, đánh giá nguy cơ tim mạch toàn diện.' },
  { icon:'psychology', title:'Tâm Lý Lâm Sàng', price:'650.000đ', duration:'75 phút', desc:'Tư vấn tâm lý, đánh giá stress, lo âu và trầm cảm.' },
  { icon:'child_care', title:'Nhi Khoa', price:'450.000đ', duration:'45 phút', desc:'Khám và theo dõi sự phát triển toàn diện cho trẻ từ 0–15 tuổi.' },
  { icon:'pregnant_woman', title:'Sản Phụ Khoa', price:'600.000đ', duration:'60 phút', desc:'Siêu âm, tư vấn thai kỳ, tầm soát ung thư cổ tử cung.' },
  { icon:'biotech', title:'Xét Nghiệm', price:'200.000đ+', duration:'30 phút', desc:'Xét nghiệm máu, nước tiểu, hormon và các chỉ số sinh hoá.' },
]

const doctors = [
  { name:'BS. Nguyễn Thị Lan', spec:'Tim Mạch', exp:'15 năm', degree:'GS.TS', avail:'T2,T4,T6' },
  { name:'BS. Trần Văn Minh', spec:'Nội Tổng Quát', exp:'12 năm', degree:'PGS.TS', avail:'T3,T5,T7' },
  { name:'BS. Lê Hương Giang', spec:'Tâm Lý', exp:'10 năm', degree:'TS', avail:'T2-T6' },
  { name:'BS. Phạm Quốc Bảo', spec:'Nhi Khoa', exp:'18 năm', degree:'GS.TS', avail:'T2,T4,T6,T7' },
]

export default function ClinicDemo() {
  const [appt, setAppt] = useState({ name:'', phone:'', dob:'', service:'', doctor:'', date:'', time:'', insurance:'' })
  const [apptDone, setApptDone] = useState(false)
  const [activeDoc, setActiveDoc] = useState(doctors[0])

  return (
    <div className="min-h-screen bg-[#f0f7ff] text-[#0d1b2e] overflow-x-hidden font-sans">
      <div className="fixed top-4 right-4 z-50">
        <Link href="/templates" className="flex items-center gap-2 bg-[#0d1b2e]/80 backdrop-blur border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#0d1b2e] transition-all">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Templates
        </Link>
      </div>

      <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-xl border-b border-[#0d1b2e]/8 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl" style={{fontVariationSettings:"'FILL' 1"}}>local_hospital</span>
            </div>
            <div>
              <p className="font-bold text-base leading-none text-blue-700">MedCare</p>
              <p className="text-[10px] text-[#0d1b2e]/40 uppercase tracking-widest">Phòng Khám Đa Khoa</p>
            </div>
          </div>
          <div className="hidden md:flex gap-7 text-sm text-[#0d1b2e]/60">
            {['Dịch Vụ','Bác Sĩ','Đặt Lịch','Tin Tức','Liên Hệ'].map(n=><a key={n} href="#" className="hover:text-blue-600 transition-colors">{n}</a>)}
          </div>
          <a href="#booking" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">Đặt Lịch Khám</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-8 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Đang tiếp nhận hôm nay · Không cần chờ đợi lâu
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-[#0d1b2e]">
              Sức Khoẻ Của Bạn<br/>Là <span className="text-blue-600">Ưu Tiên</span><br/>Số 1 Của Chúng Tôi
            </h1>
            <p className="text-[#0d1b2e]/60 text-lg leading-relaxed mb-8">Đội ngũ 50+ bác sĩ chuyên khoa hàng đầu, trang thiết bị hiện đại, kết quả nhanh chóng — cam kết chăm sóc bạn toàn diện.</p>
            <div className="flex gap-4 mb-10">
              <a href="#booking" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors">Đặt Lịch Ngay</a>
              <a href="tel:02836789999" className="border border-[#0d1b2e]/20 hover:border-blue-600 text-[#0d1b2e] font-semibold px-8 py-4 rounded-xl transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-base">call</span>028 3678 9999
              </a>
            </div>
            <div className="flex flex-wrap gap-6">
              {[{v:'50+',l:'Bác sĩ chuyên khoa'},{v:'98%',l:'Bệnh nhân hài lòng'},{v:'15+',l:'Năm kinh nghiệm'}].map(s=>(
                <div key={s.l} className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{s.v}</p>
                  <p className="text-xs text-[#0d1b2e]/50">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white">
              <span className="material-symbols-outlined text-4xl mb-4 block" style={{fontVariationSettings:"'FILL' 1"}}>health_and_safety</span>
              <h3 className="text-xl font-bold mb-2">Gói Khám Sức Khoẻ 2025</h3>
              <p className="text-blue-100 text-sm mb-4">Kiểm tra toàn diện 40+ chỉ số sức khoẻ quan trọng</p>
              <p className="text-2xl font-bold">1.200.000đ <span className="text-sm font-normal line-through text-blue-300">2.400.000đ</span></p>
            </div>
            {[{icon:'emergency',label:'Cấp Cứu 24/7',sub:'Phản hồi trong 5 phút'},{icon:'video_call',label:'Khám Online',sub:'Qua video call'}].map(c=>(
              <div key={c.label} className="bg-white border border-[#0d1b2e]/8 rounded-2xl p-5 shadow-sm">
                <span className="material-symbols-outlined text-blue-600 text-2xl mb-2 block">{c.icon}</span>
                <p className="font-bold text-sm">{c.label}</p>
                <p className="text-xs text-[#0d1b2e]/50 mt-0.5">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="px-8 max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest block mb-3">Chuyên Khoa</span>
            <h2 className="text-4xl font-bold">Dịch Vụ Khám Chữa Bệnh</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(s=>(
              <div key={s.title} className="border border-[#0d1b2e]/8 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <span className="material-symbols-outlined text-blue-600 group-hover:text-white text-2xl transition-colors">{s.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                <p className="text-[#0d1b2e]/50 text-sm mb-4 leading-relaxed">{s.desc}</p>
                <div className="flex justify-between items-center pt-4 border-t border-[#0d1b2e]/6">
                  <div className="flex gap-4 text-xs text-[#0d1b2e]/50">
                    <span>⏱ {s.duration}</span>
                  </div>
                  <span className="font-bold text-blue-600">{s.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-20 bg-blue-50">
        <div className="px-8 max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest block mb-3">Đội Ngũ Y Bác Sĩ</span>
            <h2 className="text-4xl font-bold">Chuyên Gia Hàng Đầu</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {doctors.map(d=>(
              <div key={d.name} onClick={()=>setActiveDoc(d)} className={`bg-white rounded-2xl p-5 border-2 cursor-pointer transition-all ${activeDoc.name===d.name?'border-blue-600 shadow-lg':'border-transparent hover:border-blue-200'}`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xl font-bold mb-4">
                  {d.name.split(' ').slice(-1)[0][0]}
                </div>
                <p className="text-xs text-blue-600 font-bold mb-0.5">{d.degree}</p>
                <p className="font-bold text-sm leading-tight mb-1">{d.name}</p>
                <p className="text-xs text-[#0d1b2e]/50 mb-3">{d.spec} · {d.exp}</p>
                <p className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-full inline-block font-semibold">{d.avail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-20 bg-white">
        <div className="px-8 max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest block mb-3">Đặt Lịch</span>
            <h2 className="text-4xl font-bold">Đặt Lịch Khám Trực Tuyến</h2>
          </div>
          {apptDone?(
            <div className="bg-green-50 border-2 border-green-400 rounded-3xl p-10 text-center">
              <span className="material-symbols-outlined text-green-500 text-5xl block mb-4" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
              <h3 className="text-2xl font-bold text-green-700 mb-2">Đặt lịch thành công!</h3>
              <p className="text-green-600">Nhân viên sẽ gọi xác nhận trong vòng 30 phút.</p>
            </div>
          ):(
            <form onSubmit={e=>{e.preventDefault();setApptDone(true)}} className="bg-[#f8fbff] border border-[#0d1b2e]/8 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {[{k:'name',l:'Họ tên bệnh nhân',p:'Nguyễn Văn A',t:'text'},{k:'phone',l:'Số điện thoại',p:'0912 345 678',t:'tel'},{k:'dob',l:'Ngày sinh',p:'',t:'date'},{k:'insurance',l:'Số BHYT (nếu có)',p:'DN4...',t:'text'},{k:'date',l:'Ngày khám',p:'',t:'date'},{k:'time',l:'Giờ khám',p:'',t:'time'}].map(f=>(
                <div key={f.k}>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0d1b2e]/40 mb-1.5">{f.l}</label>
                  <input type={f.t} placeholder={f.p} value={appt[f.k as keyof typeof appt]} onChange={e=>setAppt({...appt,[f.k]:e.target.value})}
                    className="w-full bg-white border border-[#0d1b2e]/12 rounded-xl px-4 py-3 text-sm text-[#0d1b2e] placeholder:text-[#0d1b2e]/25 focus:border-blue-500 outline-none transition-all shadow-sm"/>
                </div>
              ))}
              {[{k:'service',l:'Chuyên khoa',opts:services.map(s=>s.title)},{k:'doctor',l:'Bác sĩ',opts:doctors.map(d=>d.name)}].map(f=>(
                <div key={f.k}>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0d1b2e]/40 mb-1.5">{f.l}</label>
                  <select value={appt[f.k as keyof typeof appt]} onChange={e=>setAppt({...appt,[f.k]:e.target.value})} className="w-full bg-white border border-[#0d1b2e]/12 rounded-xl px-4 py-3 text-sm text-[#0d1b2e] focus:border-blue-500 outline-none shadow-sm">
                    <option value="">Chọn...</option>
                    {f.opts.map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div className="md:col-span-2">
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-sm transition-colors">
                  Xác Nhận Đặt Lịch Khám
                </button>
                <p className="text-center text-xs text-[#0d1b2e]/40 mt-3">Miễn phí đặt lịch · Nhắc lịch qua SMS trước 24 giờ</p>
              </div>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-[#0d1b2e] text-white/50 py-10 px-8 text-center text-sm font-sans">
        © 2025 MedCare Phòng Khám Đa Khoa · Mẫu bởi <span className="text-blue-400">Vaitech</span>
      </footer>
    </div>
  )
}
