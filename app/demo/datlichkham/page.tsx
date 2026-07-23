'use client'
import { useState, useMemo } from 'react'
import { HeartPulse, Stethoscope, CalendarDays, Clock, User, Shield, Activity, Pill, CheckCircle2, ChevronRight, Star, MapPin } from 'lucide-react'
import { DemoBackButton, ToastContainer } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const DEPTS = [
  { id: 1, name: 'Nội khoa', Icon: Stethoscope, desc: 'Khám tổng quát, bệnh lý nội tiết', wait: 15, color: 'from-emerald-500 to-teal-500', doctors: ['BS. Nguyễn Văn A', 'BS. Trần Thị B'] },
  { id: 2, name: 'Tim mạch', Icon: HeartPulse, desc: 'Siêu âm tim, ECG, Holter 24h', wait: 25, color: 'from-rose-500 to-pink-500', doctors: ['PGS. Lê Văn C', 'BS. Phạm Thị D'] },
  { id: 3, name: 'Răng hàm mặt', Icon: Pill, desc: 'Nhổ răng, chỉnh nha, implant', wait: 10, color: 'from-amber-500 to-orange-500', doctors: ['BS. Hoàng Văn E', 'BS. Vũ Thị F'] },
  { id: 4, name: 'Mắt', Icon: Activity, desc: 'Khám mắt, đo nhãn áp, LASIK', wait: 20, color: 'from-sky-500 to-blue-500', doctors: ['BS. Đỗ Văn G', 'BS. Ngô Thị H'] },
]

const TIMES = ['07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','14:00','14:30','15:00','15:30']

export default function DatLichKhamDemo() {
  const { toasts, add } = useToast()
  const [step, setStep] = useState(0)
  const [dept, setDept] = useState<number|null>(null)
  const [doctor, setDoctor] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [bhyt, setBhyt] = useState(false)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const d = dept !== null ? DEPTS.find(x => x.id === dept)! : null
  const queueNum = useMemo(() => dept !== null ? Math.floor(Math.random() * 30 + 1) : 0, [dept])

  const handleBook = async () => {
    if (!d || !doctor || !time || !name) { add('Vui lòng điền đầy đủ thông tin', 'error'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    setDone(true)
    add('Đặt lịch thành công! Mã: K-' + Math.floor(Math.random() * 9000 + 1000), 'success')
  }

  return (
    <div className="min-h-screen bg-[#f8faf9]" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* ── Header — hospital style ── */}
      <div className="bg-white border-b border-emerald-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20"><HeartPulse size={18} className="text-white" /></div>
            <div>
              <span className="text-sm font-bold text-emerald-900 tracking-tight">Đặt Lịch Khám</span>
              <span className="text-[9px] text-emerald-600/50 ml-2 font-semibold tracking-wider">BỆNH VIỆN ĐA KHOA</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-emerald-600/40">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Đang mở cửa</span>
          </div>
        </div>
      </div>

      {/* ── Hero — clean white with medical illustration feel ── */}
      <section className="relative px-4 pt-10 pb-8 bg-white border-b border-emerald-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-50 rounded-full opacity-60" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-50 rounded-full opacity-40" />
          {/* Floating medical symbols */}
          <div className="absolute top-8 right-16 text-emerald-100 text-7xl font-bold select-none">+</div>
          <div className="absolute top-20 right-40 text-emerald-50 text-5xl font-bold select-none">+</div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full mb-4 tracking-wider border border-emerald-100">
            <Shield size={10} />MIỄN PHÍ CHO CÁN BỘ NHÀ NƯỚC
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-emerald-950 leading-tight mb-3 tracking-tight">
            ĐẶT LỊCH<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">KHÁM SỨC KHỎE</span><br/>
            ONLINE
          </h1>
          <p className="text-emerald-700/40 text-sm max-w-md leading-relaxed">
            Chọn chuyên khoa → Chọn bác sĩ → Chọn giờ.<br/>
            Kết quả lưu trữ, nhắc lịch tự động, quản lý queue trực quan.
          </p>

          <div className="grid grid-cols-3 gap-3 mt-6 max-w-lg">
            {[
              { v: '4', l: 'CHUYÊN KHOA', c: 'text-emerald-600' },
              { v: '8', l: 'BÁC SĨ', c: 'text-teal-600' },
              { v: '<5', l: 'PHÚT CHỜ', c: 'text-green-600' },
            ].map(s => (
              <div key={s.l} className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-3 text-center">
                <div className={`text-lg font-black ${s.c}`}>{s.v}</div>
                <div className="text-[8px] text-emerald-700/40 tracking-widest">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vertical Timeline Step Flow ── */}
      <section className="px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left: Vertical timeline */}
            <div className="lg:col-span-5">
              <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-emerald-100" />
                <div className="absolute left-3 top-0 w-0.5 bg-emerald-500 transition-all duration-500" style={{ height: step === 0 ? '32px' : step === 1 ? '160px' : step === 2 ? '288px' : '100%' }} />

                {['Chuyên khoa', 'Bác sĩ & Giờ', 'Thông tin', 'Xác nhận'].map((label, i) => (
                  <div key={i} className="relative mb-8">
                    <div className={`absolute -left-5 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all ${
                      i < step ? 'bg-emerald-500 border-emerald-500 text-white' :
                      i === step ? 'bg-white border-emerald-500 text-emerald-700 shadow-md shadow-emerald-500/20' :
                      'bg-white border-emerald-200 text-emerald-300'
                    }`}>
                      {i < step ? '✓' : i + 1}
                    </div>
                    <div className="text-xs font-bold text-emerald-900 mb-1">{label}</div>
                    <div className="text-[10px] text-emerald-600/30">
                      {i === 0 && (d ? d.name : 'Chưa chọn')}
                      {i === 1 && (doctor && time ? `${doctor} · ${time}` : 'Chưa chọn')}
                      {i === 2 && (name || 'Chưa điền')}
                      {i === 3 && (done ? 'Hoàn thành ✓' : 'Đang chờ')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Queue info */}
              {d && (
                <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                  <div className="text-[10px] text-emerald-600/50 tracking-widest font-bold mb-2">THÔNG TIN QUEUE</div>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-black text-emerald-600 font-mono">#{queueNum}</div>
                    <div className="text-xs text-emerald-700/50 leading-relaxed">
                      Số thứ tự của bạn<br/>
                      <span className="text-emerald-600">~{d.wait} phút chờ</span>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-emerald-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${Math.min(100, queueNum * 3)}%` }} />
                  </div>
                </div>
              )}
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-7">
              {/* Step 0: Department selection */}
              {step === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEPTS.map(dep => (
                    <button key={dep.id} onClick={() => { setDept(dep.id); setStep(1); setDoctor(''); setTime('') }}
                      className={`text-left bg-white border rounded-2xl p-5 transition-all hover:shadow-lg hover:shadow-emerald-500/5 group ${
                        dept === dep.id ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-emerald-100 hover:border-emerald-200'
                      }`}>
                      <div className={`w-10 h-10 bg-gradient-to-br ${dep.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <dep.Icon size={18} className="text-white" />
                      </div>
                      <div className="text-sm font-bold text-emerald-900 mb-1">{dep.name}</div>
                      <div className="text-[11px] text-emerald-600/40 leading-relaxed">{dep.desc}</div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[10px] text-emerald-500/50 flex items-center gap-1"><Clock size={10} />{dep.wait} phút chờ</span>
                        <ChevronRight size={14} className="text-emerald-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 1: Doctor + Time */}
              {step === 1 && d && (
                <div className="bg-white border border-emerald-100 rounded-2xl p-6">
                  <div className="text-[10px] text-emerald-600/50 tracking-widest font-bold mb-4">CHỌN BÁC SĨ — {d.name.toUpperCase()}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {d.doctors.map(doc => (
                      <button key={doc} onClick={() => setDoctor(doc)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          doctor === doc ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-100' : 'bg-gray-50 border-gray-100 hover:border-emerald-200'
                        }`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold">{doc.split(' ').pop()![0]}</div>
                          <div>
                            <div className="text-xs font-bold text-emerald-900">{doc}</div>
                            <div className="text-[10px] text-emerald-600/40 flex items-center gap-1"><Star size={8} className="text-amber-400 fill-amber-400" />4.8</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="text-[10px] text-emerald-600/50 tracking-widest font-bold mb-3">CHỌN GIỜ KHÁM</div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-6">
                    {TIMES.map(t => (
                      <button key={t} onClick={() => setTime(t)}
                        className={`py-2 rounded-lg text-[11px] font-bold font-mono transition-all ${
                          time === t ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-gray-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-100'
                        }`}>{t}</button>
                    ))}
                  </div>

                  <button onClick={() => { if (doctor && time) setStep(2) }}
                    disabled={!doctor || !time}
                    className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-200 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all active:scale-[0.98] disabled:cursor-not-allowed">
                    Tiếp tục →
                  </button>
                </div>
              )}

              {/* Step 2: Patient info */}
              {step === 2 && (
                <div className="bg-white border border-emerald-100 rounded-2xl p-6">
                  <div className="text-[10px] text-emerald-600/50 tracking-widest font-bold mb-4">THÔNG TIN BỆNH NHÂN</div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-emerald-800 mb-1.5 block">Họ và tên</label>
                      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nguyễn Văn A"
                        className="w-full bg-gray-50 border border-emerald-100 rounded-xl px-4 py-3 text-sm text-emerald-900 placeholder-emerald-300 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-50 transition-all" />
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={bhyt} onChange={e => setBhyt(e.target.checked)} className="accent-emerald-500 w-4 h-4" />
                      <span className="text-xs text-emerald-700">Có bảo hiểm y tế nhà nước</span>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button onClick={() => setStep(1)} className="bg-gray-100 hover:bg-gray-200 text-emerald-700 font-bold px-6 py-3 rounded-xl text-sm transition-all">← Quay lại</button>
                    <button onClick={() => { if (name) setStep(3) }} disabled={!name}
                      className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-200 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all active:scale-[0.98] disabled:cursor-not-allowed">
                      Xác nhận đặt lịch →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && d && (
                <div className="bg-white border border-emerald-100 rounded-2xl p-6">
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 size={28} className="text-emerald-500" />
                    </div>
                    <div className="text-sm font-bold text-emerald-900">Xác nhận lịch khám</div>
                  </div>
                  <div className="bg-emerald-50/80 rounded-xl p-4 space-y-2 mb-6 text-xs">
                    <div className="flex justify-between"><span className="text-emerald-600/50">Chuyên khoa</span><span className="font-bold text-emerald-800">{d.name}</span></div>
                    <div className="flex justify-between"><span className="text-emerald-600/50">Bác sĩ</span><span className="font-bold text-emerald-800">{doctor}</span></div>
                    <div className="flex justify-between"><span className="text-emerald-600/50">Giờ khám</span><span className="font-bold text-emerald-800 font-mono">{time}</span></div>
                    <div className="flex justify-between"><span className="text-emerald-600/50">Bệnh nhân</span><span className="font-bold text-emerald-800">{name}</span></div>
                    <div className="flex justify-between"><span className="text-emerald-600/50">BHYT</span><span className="font-bold text-emerald-800">{bhyt ? 'Có' : 'Không'}</span></div>
                    <div className="flex justify-between border-t border-emerald-200 pt-2"><span className="text-emerald-600/50">Chi phí</span><span className="font-bold text-emerald-600">{bhyt ? 'Miễn phí (BHYT)' : '150.000đ'}</span></div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="bg-gray-100 hover:bg-gray-200 text-emerald-700 font-bold px-6 py-3 rounded-xl text-sm transition-all">← Quay lại</button>
                    <button onClick={handleBook} disabled={loading}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:cursor-not-allowed">
                      {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Xác nhận & Đặt lịch'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Gov CTA — clean hospital style ── */}
      <section className="px-4 pb-10">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="text-[10px] text-emerald-600 tracking-widest font-bold mb-2">BỆNH VIỆN NHÀ NƯỚC</div>
            <div className="text-lg font-bold text-emerald-900 mb-2">Triển khai cho bệnh viện của bạn</div>
            <p className="text-xs text-emerald-700/40 leading-relaxed">Quản lý queue, nhắc lịch tự động, lưu trữ hồ sơ, báo cáo thống kê — tất cả serverless, miễn phí.</p>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all active:scale-95 whitespace-nowrap">Liên hệ →</button>
        </div>
      </section>

      {/* Success overlay */}
      {done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl border border-emerald-100">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={32} className="text-emerald-500" /></div>
            <div className="text-lg font-bold text-emerald-900 mb-1">Đặt Lịch Thành Công!</div>
            <div className="text-xs text-emerald-600/40 mb-4">Mã预约: K-{Math.floor(Math.random() * 9000 + 1000)}. Đến bệnh viện trước giờ khám 10 phút.</div>
            <button onClick={() => { setDone(false); setStep(0); setDept(null); setDoctor(''); setTime(''); setName(''); setBhyt(false) }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-95">
              Đặt Lịch Mới
            </button>
          </div>
        </div>
      )}

      <div className="border-t border-emerald-100 px-4 py-6 bg-white">
        <div className="max-w-6xl mx-auto text-center text-[10px] text-emerald-600/30">© 2026 Bệnh Viện Đa Khoa · Powered by Vaitech</div>
      </div>
    </div>
  )
}
