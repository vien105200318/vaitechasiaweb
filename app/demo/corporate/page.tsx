'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const services = [
  { icon: 'account_tree', title: 'Tư Vấn Chiến Lược', desc: 'Phân tích thị trường và xây dựng lộ trình phát triển bền vững.', detail: '→ Nghiên cứu đối thủ · Bản đồ hành trình · OKR' },
  { icon: 'monitoring', title: 'Chuyển Đổi Số', desc: 'Hiện đại hóa quy trình với AI và tự động hóa thông minh.', detail: '→ ERP · CRM · RPA · Cloud Migration' },
  { icon: 'groups', title: 'Đào Tạo Nhân Lực', desc: 'Nâng cao năng lực đội ngũ với chương trình đào tạo chuyên biệt.', detail: '→ Workshop · Mentoring · E-learning' },
  { icon: 'bar_chart', title: 'Phân Tích Dữ Liệu', desc: 'Khai thác insight từ dữ liệu để ra quyết định chính xác.', detail: '→ BI Dashboard · ML Models · Reporting' },
  { icon: 'security', title: 'Bảo Mật Doanh Nghiệp', desc: 'Hệ thống bảo mật đa lớp theo chuẩn ISO 27001.', detail: '→ Audit · Pen Test · SIEM · SOC' },
  { icon: 'cloud_sync', title: 'Hạ Tầng Cloud', desc: 'Thiết kế và vận hành hạ tầng cloud hiệu suất cao.', detail: '→ AWS · Azure · GCP · Kubernetes' },
]

const caseStudies = [
  { company: 'TechViet Corp', sector: 'Fintech', result: 'Tăng 340% hiệu suất xử lý giao dịch', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO04BddMbSNQ6NeNP_QB43WinFa9-X2-jIGHegvTybTvFK5PIFe9SG43Vr_oas5GO4SeWyzKSC3G3gAQ2FhTXWCnmwDhBVYMgiPPZXTueFkeE-DBICLX3c7DY-gRLYzuDc_yjhY1uIevWCOLLtQXVMlro_Xm5uxrCfDmFxm4ZDh-DY2-bVVxhCEae82O3o5W2u-YFElzBsVEBgSrfVMJlfkximi6ApsbkHGg3vwDr_CyCFJOaUcTbfPUSTw9EsixJitb0QxhMaayVg' },
  { company: 'Bamboo Capital', sector: 'Real Estate', result: 'Giảm 60% thời gian phê duyệt dự án', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl' },
  { company: 'Sun Group', sector: 'Hospitality', result: 'ROI 280% sau 12 tháng triển khai', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIA27ThB3jLA-qXMeC1ArCwxN3AU9YWSxzLNOkDHAljhMkNu_M2gUho1i80PYCX5TfV6rbiByE2R5duq-b4StNtEnWZMFAHo2VsXmW1PGS6eaMgvukTw8IdB11hE5AMSljcaEOuhRrHM7897vT9iRMe4c1REruuBC53SnOMNJfuTs-N3mNxE7MVbnZSJDSdEJivVC3KoHRphq9e97Px_FTJ4edGXEix8PkkJXFSDowLKA-R1OnQwspyNjha-RYVFjaIkcgDD4cwL1Pe' },
]

const team = [
  { name: 'Nguyễn Minh Đức', role: 'CEO & Founder', exp: '20 năm kinh nghiệm', avatar: 'M' },
  { name: 'Trần Thị Thu Lan', role: 'CTO', exp: 'Ex-Google · Ex-Microsoft', avatar: 'L' },
  { name: 'Lê Hoàng Phúc', role: 'Strategy Director', exp: 'MBA Harvard', avatar: 'P' },
  { name: 'Phạm Quỳnh Anh', role: 'Head of Delivery', exp: 'PMP · PRINCE2', avatar: 'A' },
]

const metrics = [
  { value: '18+', label: 'Năm kinh nghiệm' },
  { value: '400+', label: 'Dự án thành công' },
  { value: '98%', label: 'Khách hàng hài lòng' },
  { value: '12', label: 'Văn phòng toàn quốc' },
]

export default function CorporateDemo() {
  const [activeTab, setActiveTab] = useState(0)
  const [formSent, setFormSent] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', budget: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSent(true)
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white overflow-x-hidden font-sans">
      {/* Demo badge */}
      <div className="fixed top-4 right-4 z-50">
        <Link href="/templates" className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Templates
        </Link>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-[#050a14]/90 backdrop-blur-xl">
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">NX</div>
            <span className="font-bold text-lg tracking-tight">NEXTECH<span className="text-blue-400">.</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-white/60">
            {['Dịch Vụ', 'Case Study', 'Đội Ngũ', 'Blog', 'Liên Hệ'].map(n => (
              <a key={n} href={`#${n.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">{n}</a>
            ))}
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded transition-colors">
            Tư Vấn Miễn Phí
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-16">
        <div className="flex flex-col justify-center px-8 md:px-16 py-20">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 w-fit">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Đối Tác Chuyển Đổi Số Hàng Đầu Việt Nam
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
            Kiến Tạo<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Tương Lai</span><br />
            Doanh Nghiệp
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-md mb-8">
            18 năm đồng hành cùng 400+ doanh nghiệp hàng đầu Việt Nam trong hành trình chuyển đổi số và tăng trưởng bền vững.
          </p>
          <div className="flex gap-4 mb-12">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105">
              Bắt Đầu Ngay
            </button>
            <button className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-lg transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-base">play_circle</span> Xem Case Study
            </button>
          </div>
          <div className="flex flex-wrap gap-6">
            {['ISO 27001', 'SOC 2 Type II', 'CMMI Level 5'].map(cert => (
              <div key={cert} className="flex items-center gap-2 text-sm text-white/50">
                <span className="material-symbols-outlined text-blue-400 text-base" style={{fontVariationSettings:"'FILL' 1"}}>verified</span>
                {cert}
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden lg:block bg-[#0a1628] overflow-hidden">
          <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO04BddMbSNQ6NeNP_QB43WinFa9-X2-jIGHegvTybTvFK5PIFe9SG43Vr_oas5GO4SeWyzKSC3G3gAQ2FhTXWCnmwDhBVYMgiPPZXTueFkeE-DBICLX3c7DY-gRLYzuDc_yjhY1uIevWCOLLtQXVMlro_Xm5uxrCfDmFxm4ZDh-DY2-bVVxhCEae82O3o5W2u-YFElzBsVEBgSrfVMJlfkximi6ApsbkHGg3vwDr_CyCFJOaUcTbfPUSTw9EsixJitb0QxhMaayVg"
            alt="Office" fill className="object-cover opacity-40" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a1628]/70" />
          <div className="absolute top-1/4 left-8 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 w-52">
            <p className="text-white/50 text-xs mb-1">Tăng trưởng Q1 2025</p>
            <p className="text-3xl font-bold text-blue-400">+247%</p>
            <div className="flex items-center gap-1 mt-2 text-green-400 text-xs">
              <span className="material-symbols-outlined text-xs">trending_up</span> So với năm trước
            </div>
            <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" style={{width:'72%'}} />
            </div>
          </div>
          <div className="absolute bottom-1/3 right-8 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 w-52">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/50 text-xs">Hệ thống hoạt động</span>
            </div>
            <p className="text-white font-bold text-lg">Uptime 99.99%</p>
            <p className="text-white/40 text-xs mt-1">24/7 · 365 ngày</p>
            <div className="grid grid-cols-4 gap-1 mt-3">
              {Array.from({length:12}).map((_,i) => (
                <div key={i} className="h-4 rounded-sm bg-green-400/60" style={{height: `${8+Math.random()*12}px`}} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-blue-600/10 border-y border-blue-500/20 py-12">
        <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-1">{s.value}</div>
              <div className="text-white/50 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="dịch-vụ" className="py-24 px-8 max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest block mb-3">Dịch Vụ</span>
            <h2 className="text-4xl md:text-5xl font-bold">Giải Pháp Toàn Diện<br />Cho Mọi Quy Mô</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div key={s.title} className={`rounded-2xl p-7 border transition-all hover:-translate-y-1 duration-300 cursor-pointer group ${i === 1 ? 'bg-blue-600 border-blue-500' : 'bg-white/3 border-white/8 hover:border-blue-500/40'}`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${i === 1 ? 'bg-white/20' : 'bg-blue-500/10'}`}>
                <span className="material-symbols-outlined text-xl text-blue-400">{s.icon}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{s.title}</h3>
              <p className={`text-sm leading-relaxed mb-3 ${i === 1 ? 'text-white/80' : 'text-white/50'}`}>{s.desc}</p>
              <p className="text-xs text-blue-300/70">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-study" className="py-24 bg-[#0a1628]">
        <div className="px-8 max-w-[1280px] mx-auto">
          <div className="mb-12">
            <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest block mb-3">Case Study</span>
            <h2 className="text-4xl font-bold">Thành Công Của Khách Hàng</h2>
          </div>
          <div className="flex gap-4 mb-8">
            {caseStudies.map((c, i) => (
              <button key={c.company} onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === i ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                {c.company}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-72 rounded-2xl overflow-hidden">
              <Image src={caseStudies[activeTab].image} alt={caseStudies[activeTab].company} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="bg-blue-600/80 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full">{caseStudies[activeTab].sector}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">{caseStudies[activeTab].company}</h3>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 mb-6">
                <p className="text-3xl font-bold text-blue-400">{caseStudies[activeTab].result}</p>
              </div>
              <div className="space-y-3">
                {['Phân tích hiện trạng & đề xuất giải pháp', 'Thiết kế kiến trúc hệ thống mới', 'Triển khai & đào tạo đội ngũ', 'Vận hành & tối ưu liên tục'].map((step, i) => (
                  <div key={step} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="đội-ngũ" className="py-24 px-8 max-w-[1280px] mx-auto">
        <div className="mb-12">
          <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest block mb-3">Đội Ngũ</span>
          <h2 className="text-4xl font-bold">Những Người Dẫn Đường</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map(m => (
            <div key={m.name} className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-blue-500/30 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-xl font-bold mb-4">{m.avatar}</div>
              <h3 className="font-bold text-base mb-0.5">{m.name}</h3>
              <p className="text-blue-400 text-xs font-semibold mb-1">{m.role}</p>
              <p className="text-white/40 text-xs">{m.exp}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section id="liên-hệ" className="py-24 bg-[#0a1628]">
        <div className="px-8 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest block mb-4">Liên Hệ</span>
              <h2 className="text-4xl font-bold mb-6">Bắt Đầu Dự Án Của Bạn</h2>
              <p className="text-white/60 leading-relaxed mb-8">Điền thông tin để nhận tư vấn miễn phí từ đội ngũ chuyên gia của chúng tôi trong vòng 24 giờ.</p>
              <div className="space-y-4">
                {[{icon:'email',v:'hello@nextech.vn'},{icon:'phone',v:'1800 6789'},{icon:'location_on',v:'123 Cầu Giấy, Hà Nội'}].map(c => (
                  <div key={c.v} className="flex items-center gap-3 text-white/60">
                    <span className="material-symbols-outlined text-blue-400">{c.icon}</span>{c.v}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/3 border border-white/8 rounded-2xl p-8">
              {formSent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-blue-400 text-3xl" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Gửi thành công!</h3>
                  <p className="text-white/50 text-sm">Chúng tôi sẽ liên hệ trong 24 giờ.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[{k:'name',label:'Họ tên *',ph:'Nguyễn Văn A',t:'text'},{k:'company',label:'Công ty',ph:'Tên doanh nghiệp',t:'text'},{k:'email',label:'Email *',ph:'ban@cty.com',t:'email'},{k:'phone',label:'Điện thoại',ph:'0912 345 678',t:'tel'}].map(f => (
                      <div key={f.k}>
                        <label className="text-xs text-white/50 font-semibold uppercase tracking-wider block mb-1.5">{f.label}</label>
                        <input type={f.t} placeholder={f.ph} required={f.label.includes('*')} value={form[f.k as keyof typeof form]} onChange={e=>setForm({...form,[f.k]:e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-blue-400 outline-none transition-all" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs text-white/50 font-semibold uppercase tracking-wider block mb-1.5">Dịch vụ quan tâm</label>
                    <select value={form.service} onChange={e=>setForm({...form,service:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-blue-400 outline-none">
                      <option value="">Chọn dịch vụ...</option>
                      {services.map(s=><option key={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-white/50 font-semibold uppercase tracking-wider block mb-1.5">Ngân sách dự kiến</label>
                    <select value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-blue-400 outline-none">
                      <option value="">Chọn ngân sách...</option>
                      {['Dưới 50 triệu','50–200 triệu','200–500 triệu','Trên 500 triệu'].map(b=><option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-sm transition-all hover:scale-[1.02]">
                    Gửi Yêu Cầu Tư Vấn
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">NX</div>
            <span className="font-bold">NEXTECH<span className="text-blue-400">.</span></span>
          </div>
          <p className="text-white/30 text-sm">© 2025 NEXTECH Corporation · Mẫu bởi <span className="text-blue-400">Vaitech</span></p>
          <div className="flex gap-6 text-sm text-white/40">
            {['Privacy','Terms','Careers'].map(l=><a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  )
}
