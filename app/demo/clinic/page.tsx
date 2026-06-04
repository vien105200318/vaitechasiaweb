'use client'
import { useState, useEffect } from 'react'
import { AlertCircle, Baby, Brain, Check, CheckCircle2, Cross, Heart, Phone, ShieldPlus, TestTube, Video, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { DemoBackButton, Reveal, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const SERVICES: { Icon: LucideIcon; title: string; price: string; dur: string; desc: string }[] = [
  { Icon: Heart, title:'Khám Tổng Quát', price:'500.000đ', dur:'60 phút', desc:'Kiểm tra sức khoẻ toàn diện, xét nghiệm máu, tư vấn dinh dưỡng.' },
  { Icon: Heart, title:'Tim Mạch', price:'800.000đ', dur:'90 phút', desc:'Điện tâm đồ, siêu âm tim, đánh giá nguy cơ toàn diện.' },
  { Icon: Brain, title:'Tâm Lý Lâm Sàng', price:'650.000đ', dur:'75 phút', desc:'Đánh giá stress, lo âu, trầm cảm và tư vấn chuyên sâu.' },
  { Icon: Baby, title:'Nhi Khoa', price:'450.000đ', dur:'45 phút', desc:'Theo dõi phát triển toàn diện cho trẻ 0–15 tuổi.' },
  { Icon: Heart, title:'Sản Phụ Khoa', price:'600.000đ', dur:'60 phút', desc:'Siêu âm, tư vấn thai kỳ, tầm soát ung thư cổ tử cung.' },
  { Icon: TestTube, title:'Xét Nghiệm', price:'200.000đ+', dur:'30 phút', desc:'Máu, nước tiểu, hormon và các chỉ số sinh hoá.' },
]

const DOCTORS = [
  { name:'BS. Nguyễn Thị Lan', spec:'Tim Mạch', exp:'15 năm', deg:'GS.TS', avail:'T2,T4,T6', color:'from-blue-600 to-blue-800' },
  { name:'BS. Trần Văn Minh', spec:'Nội Tổng Quát', exp:'12 năm', deg:'PGS.TS', avail:'T3,T5,T7', color:'from-teal-600 to-blue-600' },
  { name:'BS. Lê Hương Giang', spec:'Tâm Lý', exp:'10 năm', deg:'TS', avail:'T2–T6', color:'from-indigo-600 to-blue-600' },
  { name:'BS. Phạm Quốc Bảo', spec:'Nhi Khoa', exp:'18 năm', deg:'GS.TS', avail:'T2,T4,T6,T7', color:'from-blue-700 to-indigo-700' },
]

const STEPS = ['Chọn chuyên khoa', 'Chọn bác sĩ', 'Chọn ngày giờ', 'Xác nhận']

export default function ClinicDemo() {
  const { toasts, add } = useToast()
  const [step, setStep] = useState(0)
  const [appt, setAppt] = useState({ name:'', phone:'', dob:'', service:'', doctor:'', date:'', time:'', insurance:'' })
  const [errors, setErrors] = useState<Partial<typeof appt>>({})
  const [apptDone, setApptDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const validate = (fields: (keyof typeof appt)[]) => {
    const e: Partial<typeof appt> = {}
    if (fields.includes('name') && !appt.name.trim()) e.name = 'Bắt buộc'
    if (fields.includes('phone') && !appt.phone.match(/^0\d{9}$/)) e.phone = 'SĐT không hợp lệ'
    if (fields.includes('service') && !appt.service) e.service = 'Bắt buộc'
    if (fields.includes('doctor') && !appt.doctor) e.doctor = 'Bắt buộc'
    if (fields.includes('date') && !appt.date) e.date = 'Bắt buộc'
    if (fields.includes('time') && !appt.time) e.time = 'Bắt buộc'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    const stepFields: (keyof typeof appt)[][] = [['service'],['doctor'],['name','phone','date','time'],[]]
    if (validate(stepFields[step])) setStep(s => Math.min(s + 1, 3))
  }

  const submit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setApptDone(true)
    add('Đặt lịch thành công! Xác nhận qua SMS.', 'success')
  }

  const inputClass = (k: keyof typeof appt) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${errors[k] ? 'border-red-400 bg-red-50' : 'border-[#0d1b2e]/12 focus:border-blue-500 bg-white'}`

  return (
    <div className="min-h-screen bg-[#f0f7ff] text-[#0d1b2e] overflow-x-hidden font-sans">
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      <nav className={`fixed top-0 w-full z-40 transition-all duration-400 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-[#0d1b2e]/8 shadow-sm' : 'bg-white/90 backdrop-blur-sm'}`}>
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Cross size={16} />
            </div>
            <div>
              <p className="font-bold text-base leading-none text-blue-700">MedCare</p>
              <p className="text-[10px] text-[#0d1b2e]/35 uppercase tracking-widest">Phòng Khám Đa Khoa</p>
            </div>
          </div>
          <div className="hidden md:flex gap-7 text-sm text-[#0d1b2e]/55">
            {['Dịch Vụ', 'Bác Sĩ', 'Đặt Lịch', 'Tin Tức'].map(n => (
              <a key={n} href={`#${n}`} className="hover:text-blue-600 transition-colors relative group">
                {n}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-600 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          <a href="#Đặt Lịch" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors active:scale-95">
            Đặt Lịch Khám
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-8 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Đang tiếp nhận hôm nay · Không cần chờ lâu
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Sức Khoẻ Của Bạn<br />Là <span className="text-blue-600">Ưu Tiên</span><br />Số 1 Của Chúng Tôi
            </h1>
            <p className="text-[#0d1b2e]/55 text-lg leading-relaxed mb-8">
              Đội ngũ 50+ bác sĩ chuyên khoa, trang thiết bị hiện đại, kết quả nhanh chóng.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#Đặt Lịch" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95">
                Đặt Lịch Ngay
              </a>
              <a href="tel:02836789999" className="border border-[#0d1b2e]/15 hover:border-blue-500 text-[#0d1b2e] font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2 hover:bg-blue-50">
                <Phone size={16} />028 3678 9999
              </a>
            </div>
            <div className="flex flex-wrap gap-8">
              {[{t:50,s:'+',l:'Bác sĩ'},{t:98,s:'%',l:'Hài lòng'},{t:15,s:'+',l:'Năm KN'}].map(s=>(
                <div key={s.l} className="text-center">
                  <p className="text-2xl font-bold text-blue-600"><CountUp target={s.t} suffix={s.s} /></p>
                  <p className="text-xs text-[#0d1b2e]/40 mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white">
              <ShieldPlus size={16} />
              <h3 className="text-xl font-bold mb-2">Gói Khám Sức Khoẻ 2026</h3>
              <p className="text-blue-100 text-sm mb-4">Kiểm tra 40+ chỉ số quan trọng</p>
              <p className="text-2xl font-bold">1.200.000đ <span className="text-sm font-normal line-through text-blue-300">2.400.000đ</span></p>
            </div>
            {[{Icon: AlertCircle,l:'Cấp Cứu 24/7',s:'Phản hồi 5 phút'},{Icon: Video,l:'Khám Online',s:'Qua video call'}].map(c=>(
              <div key={c.l} className="bg-white border border-[#0d1b2e]/8 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <c.Icon size={16} />
                <p className="font-bold text-sm">{c.l}</p>
                <p className="text-xs text-[#0d1b2e]/40 mt-0.5">{c.s}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section id="Dịch Vụ" className="py-20 bg-white">
        <div className="px-8 max-w-[1280px] mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest block mb-3">Chuyên Khoa</span>
            <h2 className="text-4xl font-bold">Dịch Vụ Khám Chữa Bệnh</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}
                className="border border-[#0d1b2e]/8 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all group cursor-pointer bg-white">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center mb-4 transition-colors">
                  <s.Icon size={16} />
                </div>
                <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                <p className="text-[#0d1b2e]/45 text-sm mb-4 leading-relaxed">{s.desc}</p>
                <div className="flex justify-between items-center pt-3 border-t border-[#0d1b2e]/6">
                  <span className="text-xs text-[#0d1b2e]/35">⏱ {s.dur}</span>
                  <span className="font-bold text-blue-600 text-sm">{s.price}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="Bác Sĩ" className="py-20 bg-blue-50">
        <div className="px-8 max-w-[1280px] mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest block mb-3">Đội Ngũ Y Bác Sĩ</span>
            <h2 className="text-4xl font-bold">Chuyên Gia Hàng Đầu</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {DOCTORS.map((d, i) => (
              <Reveal key={d.name} delay={i * 80}
                className="bg-white rounded-2xl p-5 border border-transparent hover:border-blue-300 hover:shadow-lg transition-all group cursor-pointer">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${d.color} flex items-center justify-center text-white text-xl font-black mb-4`}>
                  {d.name.split(' ').slice(-1)[0][0]}
                </div>
                <p className="text-xs text-blue-600 font-bold mb-0.5">{d.deg}</p>
                <p className="font-bold text-sm leading-tight mb-1">{d.name}</p>
                <p className="text-xs text-[#0d1b2e]/45 mb-3">{d.spec} · {d.exp}</p>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-semibold">{d.avail}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="Đặt Lịch" className="py-20 bg-white">
        <div className="px-8 max-w-[860px] mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-blue-600 text-xs font-semibold uppercase tracking-widest block mb-3">Đặt Lịch</span>
            <h2 className="text-4xl font-bold">Đặt Lịch Khám Trực Tuyến</h2>
            <p className="text-[#0d1b2e]/40 mt-2 text-sm">Miễn phí · SMS nhắc lịch trước 24 giờ</p>
          </Reveal>
          {apptDone ? (
            <Reveal>
              <div className="bg-green-50 border-2 border-green-400 rounded-3xl p-10 text-center animate-scale-in">
                <CheckCircle2 size={16} />
                <h3 className="text-2xl font-bold text-green-700 mb-2">Đặt lịch thành công!</h3>
                <p className="text-green-600">Nhân viên sẽ gọi xác nhận trong 30 phút.</p>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              {/* Progress stepper */}
              <div className="flex items-center mb-8">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div className={`flex items-center gap-2 ${i <= step ? 'text-blue-600' : 'text-[#0d1b2e]/30'}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? 'bg-blue-600 text-white' : i === step ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'border-2 border-current'}`}>
                        {i < step ? <Check size={16} /> : i + 1}
                      </div>
                      <span className="text-xs font-semibold hidden sm:block">{s}</span>
                    </div>
                    {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 transition-all ${i < step ? 'bg-blue-600' : 'bg-[#0d1b2e]/10'}`} />}
                  </div>
                ))}
              </div>

              <div className="bg-[#f8fbff] border border-[#0d1b2e]/8 rounded-3xl p-8">
                {step === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <h3 className="md:col-span-2 font-bold text-lg mb-2">Chọn chuyên khoa</h3>
                    {SERVICES.map(s => (
                      <button key={s.title} onClick={() => setAppt({ ...appt, service: s.title })}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${appt.service === s.title ? 'border-blue-500 bg-blue-50' : 'border-[#0d1b2e]/8 bg-white hover:border-blue-300'}`}>
                        <s.Icon size={16} />
                        <div>
                          <p className="font-semibold text-sm">{s.title}</p>
                          <p className="text-xs text-[#0d1b2e]/40">{s.price} · {s.dur}</p>
                        </div>
                      </button>
                    ))}
                    {errors.service && <p className="md:col-span-2 text-red-500 text-xs">{errors.service}</p>}
                  </div>
                )}
                {step === 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    <h3 className="col-span-2 font-bold text-lg mb-2">Chọn bác sĩ</h3>
                    {DOCTORS.map(d => (
                      <button key={d.name} onClick={() => setAppt({ ...appt, doctor: d.name })}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${appt.doctor === d.name ? 'border-blue-500 bg-blue-50' : 'border-[#0d1b2e]/8 bg-white hover:border-blue-300'}`}>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${d.color} text-white flex items-center justify-center font-black text-sm flex-shrink-0`}>
                          {d.name.split(' ').slice(-1)[0][0]}
                        </div>
                        <div>
                          <p className="font-semibold text-xs">{d.name}</p>
                          <p className="text-[10px] text-[#0d1b2e]/40">{d.spec}</p>
                          <p className="text-[10px] text-blue-600">{d.avail}</p>
                        </div>
                      </button>
                    ))}
                    {errors.doctor && <p className="col-span-2 text-red-500 text-xs">{errors.doctor}</p>}
                  </div>
                )}
                {step === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <h3 className="md:col-span-2 font-bold text-lg mb-2">Thông tin & Lịch hẹn</h3>
                    {[
                      {k:'name',l:'Họ tên bệnh nhân *',p:'Nguyễn Văn A',t:'text'},
                      {k:'phone',l:'Số điện thoại *',p:'0912 345 678',t:'tel'},
                      {k:'dob',l:'Ngày sinh',p:'',t:'date'},
                      {k:'insurance',l:'BHYT (nếu có)',p:'DN4...',t:'text'},
                      {k:'date',l:'Ngày khám *',p:'',t:'date'},
                      {k:'time',l:'Giờ khám *',p:'',t:'time'},
                    ].map(f=>(
                      <div key={f.k}>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0d1b2e]/40 mb-1.5">{f.l}</label>
                        <input type={f.t} placeholder={f.p} value={appt[f.k as keyof typeof appt]}
                          onChange={e => { setAppt({...appt,[f.k]:e.target.value}); if(errors[f.k as keyof typeof errors]) setErrors({...errors,[f.k]:''}) }}
                          className={inputClass(f.k as keyof typeof appt)} />
                        {errors[f.k as keyof typeof errors] && <p className="text-red-500 text-xs mt-0.5">{errors[f.k as keyof typeof errors]}</p>}
                      </div>
                    ))}
                  </div>
                )}
                {step === 3 && (
                  <div>
                    <h3 className="font-bold text-lg mb-5">Xác nhận thông tin</h3>
                    <div className="space-y-3 mb-6">
                      {[
                        ['Chuyên khoa', appt.service || '—'],
                        ['Bác sĩ', appt.doctor || '—'],
                        ['Bệnh nhân', appt.name || '—'],
                        ['Điện thoại', appt.phone || '—'],
                        ['Ngày khám', appt.date ? new Date(appt.date).toLocaleDateString('vi-VN') : '—'],
                        ['Giờ khám', appt.time || '—'],
                      ].map(([k,v]) => (
                        <div key={k} className="flex justify-between py-2 border-b border-[#0d1b2e]/6 text-sm">
                          <span className="text-[#0d1b2e]/45">{k}</span>
                          <span className="font-semibold">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-3 mt-6">
                  {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)}
                      className="flex-1 border border-[#0d1b2e]/15 text-[#0d1b2e]/60 font-semibold py-3.5 rounded-2xl hover:bg-[#0d1b2e]/5 transition-colors text-sm">
                      ← Quay lại
                    </button>
                  )}
                  {step < 3 ? (
                    <button onClick={next}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl transition-colors text-sm active:scale-[0.98]">
                      Tiếp theo →
                    </button>
                  ) : (
                    <button onClick={submit} disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-2xl transition-colors text-sm active:scale-[0.98] flex items-center justify-center gap-2">
                      {loading ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> : null}
                      Xác Nhận Đặt Lịch
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <footer className="bg-[#0d1b2e] text-white/35 py-10 px-8 text-center text-sm font-sans">
        © 2026 MedCare Phòng Khám Đa Khoa · Mẫu bởi <span className="text-blue-400">Vaitech</span>
      </footer>
    </div>
  )
}
