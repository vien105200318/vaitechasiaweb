'use client'
import { useState, useEffect, useRef } from 'react'
import { Activity, BadgeCheck, BarChart3, CheckCircle2, Cloud, GitBranch, Mail, MapPin, Phone, PlayCircle, Shield, TrendingUp, Users, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { DemoBackButton, Reveal, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO04BddMbSNQ6NeNP_QB43WinFa9-X2-jIGHegvTybTvFK5PIFe9SG43Vr_oas5GO4SeWyzKSC3G3gAQ2FhTXWCnmwDhBVYMgiPPZXTueFkeE-DBICLX3c7DY-gRLYzuDc_yjhY1uIevWCOLLtQXVMlro_Xm5uxrCfDmFxm4ZDh-DY2-bVVxhCEae82O3o5W2u-YFElzBsVEBgSrfVMJlfkximi6ApsbkHGg3vwDr_CyCFJOaUcTbfPUSTw9EsixJitb0QxhMaayVg'
const WORK_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl'
const TECH_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe'

const services: { Icon: LucideIcon; title: string; desc: string; tags: string[] }[] = [
  { Icon: GitBranch, title: 'Tư Vấn Chiến Lược', desc: 'Phân tích thị trường và xây dựng lộ trình phát triển bền vững.', tags: ['OKR', 'Roadmap', 'Market Research'] },
  { Icon: Activity, title: 'Chuyển Đổi Số', desc: 'Hiện đại hóa quy trình vận hành với AI và tự động hóa.', tags: ['ERP', 'CRM', 'RPA'] },
  { Icon: Users, title: 'Đào Tạo Nhân Lực', desc: 'Nâng cao năng lực đội ngũ với chương trình đào tạo chuyên biệt.', tags: ['Workshop', 'E-learning', 'Mentoring'] },
  { Icon: BarChart3, title: 'Phân Tích Dữ Liệu', desc: 'Khai thác insight từ dữ liệu để ra quyết định chính xác.', tags: ['BI Dashboard', 'ML Models', 'Reporting'] },
  { Icon: Shield, title: 'Bảo Mật Enterprise', desc: 'Hệ thống bảo mật đa lớp theo chuẩn ISO 27001.', tags: ['Audit', 'SOC', 'Pen Test'] },
  { Icon: Cloud, title: 'Hạ Tầng Cloud', desc: 'Thiết kế và vận hành hạ tầng cloud hiệu suất cao.', tags: ['AWS', 'Azure', 'Kubernetes'] },
]

const cases = [
  { company: 'TechViet Corp', sector: 'Fintech', metric: '+340%', label: 'Hiệu suất xử lý', img: TECH_IMG },
  { company: 'Bamboo Capital', sector: 'Real Estate', metric: '−60%', label: 'Thời gian phê duyệt', img: WORK_IMG },
  { company: 'Sun Group', sector: 'Hospitality', metric: '280%', label: 'ROI sau 12 tháng', img: HERO_IMG },
]

const team = [
  { name: 'Nguyễn Minh Đức', role: 'CEO & Founder', exp: '20 năm', avatar: 'M', color: 'from-blue-600 to-blue-800' },
  { name: 'Trần Thị Thu Lan', role: 'CTO', exp: 'Ex-Google', avatar: 'L', color: 'from-cyan-600 to-blue-600' },
  { name: 'Lê Hoàng Phúc', role: 'Strategy Director', exp: 'MBA Harvard', avatar: 'P', color: 'from-blue-700 to-indigo-700' },
  { name: 'Phạm Quỳnh Anh', role: 'Head of Delivery', exp: 'PMP · PRINCE2', avatar: 'A', color: 'from-indigo-600 to-blue-600' },
]

const certs = ['ISO 27001', 'SOC 2 Type II', 'CMMI Level 5']

function ContactForm() {
  const { toasts, add } = useToast()
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', budget: '', message: '' })
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = 'Vui lòng nhập họ tên'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email không hợp lệ'
    if (!form.phone.match(/^0\d{9}$/)) e.phone = 'Số điện thoại không hợp lệ'
    if (!form.message.trim()) e.message = 'Vui lòng mô tả dự án'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
    add('Đã nhận yêu cầu! Chúng tôi sẽ liên hệ trong 24 giờ.', 'success')
  }

  if (sent) return (
    <div className="h-full flex flex-col items-center justify-center py-12 text-center animate-scale-in">
      <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-4 relative">
        <CheckCircle2 size={16} />
        <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/40 animate-ping" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">Gửi thành công!</h3>
      <p className="text-white/50 text-sm">Chuyên gia sẽ liên hệ trong 24 giờ.</p>
      <button onClick={() => setSent(false)} className="mt-4 text-xs text-blue-400 hover:underline">Gửi yêu cầu khác</button>
    </div>
  )

  return (
    <>
      <ToastContainer toasts={toasts} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { k: 'name', l: 'Họ tên *', p: 'Nguyễn Văn A', t: 'text' },
            { k: 'company', l: 'Công ty', p: 'Tên doanh nghiệp', t: 'text' },
            { k: 'email', l: 'Email *', p: 'you@company.com', t: 'email' },
            { k: 'phone', l: 'Điện thoại *', p: '0912 345 678', t: 'tel' },
          ].map(f => (
            <div key={f.k}>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5 font-semibold">{f.l}</label>
              <input type={f.t} placeholder={f.p} value={form[f.k as keyof typeof form]}
                onChange={e => { setForm({ ...form, [f.k]: e.target.value }); if (errors[f.k as keyof typeof errors]) setErrors({ ...errors, [f.k]: '' }) }}
                className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none transition-all ${errors[f.k as keyof typeof errors] ? 'border-red-500/60 focus:border-red-400' : 'border-white/10 focus:border-blue-400 focus:bg-white/8'}`} />
              {errors[f.k as keyof typeof errors] && <p className="text-red-400 text-xs mt-1">{errors[f.k as keyof typeof errors]}</p>}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5 font-semibold">Dịch vụ</label>
            <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-400 focus:outline-none">
              <option value="">Chọn dịch vụ...</option>
              {services.map(s => <option key={s.title}>{s.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5 font-semibold">Ngân sách</label>
            <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-400 focus:outline-none">
              <option value="">Chọn ngân sách...</option>
              {['Dưới 50 triệu', '50–200 triệu', '200–500 triệu', 'Trên 500 triệu'].map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5 font-semibold">Mô tả dự án *</label>
          <textarea rows={4} placeholder="Mô tả ngắn về dự án, mục tiêu và timeline..."
            value={form.message} onChange={e => { setForm({ ...form, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: '' }) }}
            className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none resize-none transition-all ${errors.message ? 'border-red-500/60 focus:border-red-400' : 'border-white/10 focus:border-blue-400 focus:bg-white/8'}`} />
          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          {loading ? (<><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Đang gửi...</>) : 'Gửi Yêu Cầu Tư Vấn'}
        </button>
      </form>
    </>
  )
}

export default function CorporateDemo() {
  const [activeCase, setActiveCase] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <div className="min-h-screen bg-[#050a14] text-white overflow-x-hidden font-sans">
      <DemoBackButton />

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? 'bg-[#050a14]/95 backdrop-blur-xl border-b border-white/8 shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-xs font-black">NX</div>
            <span className="font-black text-lg tracking-tight">NEXTECH<span className="text-blue-400">.</span></span>
          </div>
          <div className="hidden md:flex gap-7 text-sm text-white/60">
            {['Dịch Vụ', 'Case Study', 'Đội Ngũ', 'Liên Hệ'].map(n => (
              <a key={n} href={`#${n}`} className="hover:text-white transition-colors relative group">
                {n}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden md:block bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all active:scale-95">
              Tư Vấn Miễn Phí
            </button>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <div className="space-y-1.5">
                <span className={`block w-5 h-0.5 bg-white transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-white transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-400 ${mobileOpen ? 'max-h-64 border-t border-white/8' : 'max-h-0'}`}>
          <div className="bg-[#050a14]/98 px-6 py-4 space-y-4">
            {['Dịch Vụ', 'Case Study', 'Đội Ngũ', 'Liên Hệ'].map(n => (
              <a key={n} href={`#${n}`} onClick={() => setMobileOpen(false)} className="block text-sm text-white/70 hover:text-white transition-colors py-1">{n}</a>
            ))}
            <button className="w-full bg-blue-600 text-white text-sm font-semibold py-3 rounded-lg">Tư Vấn Miễn Phí</button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-16">
        <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-20">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 w-fit">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Đối Tác Chuyển Đổi Số #1 Việt Nam
          </div>
          <h1 className="text-5xl md:text-[60px] lg:text-[68px] font-black leading-[1.02] tracking-tight mb-7">
            Kiến Tạo<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Tương Lai</span><br />
            Doanh Nghiệp
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-lg mb-10">
            18 năm đồng hành cùng 400+ doanh nghiệp hàng đầu Việt Nam trong hành trình chuyển đổi số và tăng trưởng bền vững.
          </p>
          <div className="flex flex-wrap gap-4 mb-12">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95">
              Bắt Đầu Ngay
            </button>
            <button className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2 hover:bg-white/5">
              <PlayCircle size={16} />Xem Case Study
            </button>
          </div>
          {/* Certs */}
          <div className="flex flex-wrap gap-4">
            {certs.map(c => (
              <div key={c} className="flex items-center gap-1.5 text-xs text-white/45">
                <BadgeCheck size={16} />
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="relative hidden lg:block bg-[#0a1628] overflow-hidden">
          <Image src={HERO_IMG} alt="Office" fill className="object-cover opacity-35" sizes="50vw" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a1628]/70" />
          {/* Floating cards */}
          <div className="absolute top-1/4 left-8 animate-float" style={{animationDelay:'0s'}}>
            <div className="bg-white/6 backdrop-blur-xl border border-white/12 rounded-2xl p-5 w-52 shadow-2xl">
              <p className="text-white/45 text-xs mb-1">Tăng trưởng Q1 2025</p>
              <p className="text-3xl font-black text-blue-400">+247%</p>
              <div className="flex items-center gap-1 mt-2 text-green-400 text-xs">
                <TrendingUp size={16} />So với năm trước
              </div>
              <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" style={{width:'72%'}} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-1/3 right-8 animate-float" style={{animationDelay:'1.5s'}}>
            <div className="bg-white/6 backdrop-blur-xl border border-white/12 rounded-2xl p-5 w-52 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
                </div>
                <span className="text-white/45 text-xs">Hệ thống hoạt động</span>
              </div>
              <p className="text-white font-bold text-lg">Uptime 99.99%</p>
              <p className="text-white/35 text-xs mt-0.5">24/7 · 365 ngày/năm</p>
              <div className="grid grid-cols-6 gap-0.5 mt-3">
                {Array.from({length:18}).map((_,i)=>(
                  <div key={i} className="h-3 rounded-sm bg-green-400/50 hover:bg-green-400 transition-colors cursor-default" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="bg-blue-600/8 border-y border-blue-500/15 py-14">
        <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {target:18, suffix:'+', label:'Năm kinh nghiệm'},
            {target:400, suffix:'+', label:'Dự án thành công'},
            {target:98, suffix:'%', label:'Khách hàng hài lòng'},
            {target:12, suffix:'', label:'Văn phòng toàn quốc'},
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-black text-blue-400 mb-1">
                <CountUp target={s.target} suffix={s.suffix} />
              </div>
              <div className="text-white/45 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section id="Dịch Vụ" className="py-24 px-8 max-w-[1280px] mx-auto">
        <Reveal className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-3">Dịch Vụ</span>
            <h2 className="text-4xl md:text-5xl font-black">Giải Pháp Toàn Diện<br />Cho Mọi Quy Mô</h2>
          </div>
          <p className="text-white/45 text-sm max-w-xs">Từ chiến lược đến triển khai — đội ngũ 200+ chuyên gia đồng hành cùng bạn.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80} className="group bg-white/3 hover:bg-blue-600/15 border border-white/8 hover:border-blue-500/40 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center mb-5 transition-colors">
                <s.Icon size={16} />
              </div>
              <h3 className="font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map(t => (
                  <span key={t} className="text-[10px] border border-white/10 text-white/40 px-2 py-0.5 rounded-full">{t}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section id="Case Study" className="py-24 bg-[#0a1628]">
        <div className="px-8 max-w-[1280px] mx-auto">
          <Reveal className="mb-12">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-3">Case Study</span>
            <h2 className="text-4xl font-black">Thành Công Của Khách Hàng</h2>
          </Reveal>
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            {cases.map((c, i) => (
              <button key={c.company} onClick={() => setActiveCase(i)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeCase === i ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                {c.company}
              </button>
            ))}
          </div>
          <div key={activeCase} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in">
            <div className="relative h-72 rounded-2xl overflow-hidden">
              <Image src={cases[activeCase].img} alt={cases[activeCase].company} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent" />
              <span className="absolute bottom-4 left-4 bg-blue-600/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full">
                {cases[activeCase].sector}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-black mb-4">{cases[activeCase].company}</h3>
              <div className="bg-blue-500/10 border border-blue-500/25 rounded-2xl p-6 mb-6">
                <p className="text-4xl font-black text-blue-400">{cases[activeCase].metric}</p>
                <p className="text-white/50 text-sm mt-1">{cases[activeCase].label}</p>
              </div>
              <div className="space-y-3">
                {['Phân tích hiện trạng & đề xuất giải pháp', 'Thiết kế kiến trúc hệ thống mới', 'Triển khai và đào tạo đội ngũ', 'Vận hành & tối ưu liên tục'].map((step, i) => (
                  <div key={step} className="flex items-center gap-3 text-sm text-white/65">
                    <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section id="Đội Ngũ" className="py-24 px-8 max-w-[1280px] mx-auto">
        <Reveal className="mb-12">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-3">Đội Ngũ</span>
          <h2 className="text-4xl font-black">Những Người Dẫn Đường</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 100}
              className="group bg-white/3 border border-white/8 hover:border-blue-500/30 rounded-2xl p-6 transition-all hover:-translate-y-1 duration-300 cursor-pointer">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-xl font-black mb-4`}>{m.avatar}</div>
              <p className="font-black text-base mb-0.5">{m.name}</p>
              <p className="text-blue-400 text-xs font-semibold mb-1">{m.role}</p>
              <p className="text-white/40 text-xs">{m.exp}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="Liên Hệ" className="py-24 bg-[#0a1628]">
        <div className="px-8 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal>
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-4">Liên Hệ</span>
              <h2 className="text-4xl font-black mb-6">Bắt Đầu<br />Dự Án Của Bạn</h2>
              <p className="text-white/50 leading-relaxed mb-8">Điền thông tin để nhận tư vấn miễn phí từ chuyên gia trong vòng 24 giờ.</p>
              <div className="space-y-4">
                {[
                  { Icon: Mail, v: 'vaistudio.world@gmail.com' },
                  { Icon: Phone, v: '0796 716 811' },
                  { Icon: MapPin, v: '29 Bùi Xuân Phái, Đà Nẵng' },
                ].map(c => (
                  <div key={c.v} className="flex items-center gap-3 text-white/55 text-sm">
                    <c.Icon size={16} />{c.v}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-white/3 border border-white/8 rounded-2xl p-7">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-xs font-black">NX</div>
            <span className="font-black">NEXTECH<span className="text-blue-400">.</span></span>
          </div>
          <p className="text-white/30 text-sm">© 2026 NEXTECH Corporation · Mẫu bởi <span className="text-blue-400">Vaitech</span></p>
          <div className="flex gap-5 text-sm text-white/35">
            {['Privacy', 'Terms', 'Careers'].map(l => <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  )
}
