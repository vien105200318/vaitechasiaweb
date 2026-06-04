'use client'
import { useState } from 'react'
import Link from 'next/link'

const features = [
  { icon: 'psychology', title: 'AI Tự Động Hóa', desc: 'Phân tích dữ liệu và ra quyết định thông minh 24/7 không cần can thiệp thủ công.' },
  { icon: 'hub', title: 'Kết Nối Đa Nền Tảng', desc: '200+ tích hợp native với Slack, Notion, Jira, Salesforce và hơn thế nữa.' },
  { icon: 'speed', title: 'Hiệu Suất Cực Cao', desc: 'Xử lý 10 triệu yêu cầu/giây, độ trễ trung bình 43ms trên toàn cầu.' },
  { icon: 'shield_locked', title: 'Bảo Mật Enterprise', desc: 'SOC 2 Type II, ISO 27001, mã hoá AES-256 và zero-trust architecture.' },
  { icon: 'analytics', title: 'Real-time Analytics', desc: 'Dashboard thời gian thực với 50+ metric có thể tuỳ chỉnh và alert thông minh.' },
  { icon: 'code', title: 'API-first Design', desc: 'REST & GraphQL API, SDK cho 12 ngôn ngữ, Webhook và event streaming.' },
]

const pricingPlans = [
  { name: 'Starter', price: 0, unit: '/tháng', features: ['5 workspace', '10K API calls', '1GB storage', 'Community support'], cta: 'Bắt đầu miễn phí' },
  { name: 'Pro', price: 49, unit: '/tháng', features: ['Unlimited workspace', '1M API calls', '100GB storage', 'Priority support', 'Advanced analytics'], cta: 'Dùng thử 14 ngày', hot: true },
  { name: 'Enterprise', price: null, unit: '', features: ['Custom limits', 'Dedicated infra', 'SLA 99.99%', 'On-premise option', 'Custom contract'], cta: 'Liên hệ Sales' },
]

const metrics = [
  { label: 'Người dùng hoạt động', value: '2.4M', change: '+18%', color: 'text-green-400' },
  { label: 'API calls / phút', value: '847K', change: '+32%', color: 'text-blue-400' },
  { label: 'Thời gian phản hồi', value: '43ms', change: '-12%', color: 'text-purple-400' },
  { label: 'Uptime tháng này', value: '99.99%', change: '→', color: 'text-cyan-400' },
]

const faqs = [
  { q: 'flowAI có hỗ trợ on-premise không?', a: 'Có, gói Enterprise hỗ trợ triển khai on-premise hoặc private cloud theo yêu cầu.' },
  { q: 'Giới hạn API call tính như thế nào?', a: 'Mỗi request đến server được tính là 1 API call. Batch request tính theo số item trong batch.' },
  { q: 'Tôi có thể nâng cấp gói giữa chừng không?', a: 'Có, nâng cấp ngay lập tức, phần chênh lệch được tính theo tỷ lệ ngày còn lại.' },
]

const testimonials = [
  { company: 'TechCorp VN', person: 'CTO · Nguyễn Văn Nam', quote: 'flowAI giảm 70% thời gian xử lý dữ liệu thủ công của chúng tôi.', avatar: 'N' },
  { company: 'Startup Hub', person: 'CEO · Trần Thị Mai', quote: 'API cực kỳ ổn định, 6 tháng chưa có downtime nào. Đội support phản hồi nhanh.', avatar: 'M' },
]

export default function SaasDemo() {
  const [activeTab, setActiveTab] = useState<'monthly'|'yearly'>('monthly')
  const [demoInput, setDemoInput] = useState('')
  const [demoResult, setDemoResult] = useState<string|null>(null)
  const [faqOpen, setFaqOpen] = useState<number|null>(null)
  const [trialSent, setTrialSent] = useState(false)
  const [email, setEmail] = useState('')

  const runDemo = () => {
    if (!demoInput.trim()) return
    setDemoResult(null)
    setTimeout(() => {
      setDemoResult(`✓ Đã phân tích "${demoInput}": Phát hiện 3 điểm tối ưu · Tiết kiệm ước tính 12h/tuần · Độ chính xác 97.3%`)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#06040f] text-white overflow-x-hidden font-sans">
      {/* Gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/12 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="fixed top-4 right-4 z-50">
        <Link href="/templates" className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-all">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Templates
        </Link>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-[#06040f]/80 backdrop-blur-xl">
        <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-xs">bolt</span>
            </div>
            <span className="font-bold text-lg">flow<span className="text-purple-400">AI</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-white/50">
            {['Tính năng','Demo','Pricing','Tài liệu','Blog'].map(n=>(
              <a key={n} href="#" className="hover:text-white transition-colors">{n}</a>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="text-white/60 hover:text-white text-sm transition-colors">Đăng nhập</button>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-opacity">
              Bắt đầu miễn phí
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 pt-16 relative">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
          v3.0 vừa ra mắt — AI Agent mới, nhanh hơn 5x
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight max-w-5xl mb-6">
          Tự Động Hóa Toàn Bộ<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
            Quy Trình Kinh Doanh
          </span>
        </h1>
        <p className="text-white/50 text-xl max-w-2xl mb-8 leading-relaxed">
          flowAI kết nối mọi công cụ, tự động hóa tác vụ lặp đi lặp lại, và ra quyết định thông minh nhờ AI.
        </p>
        {/* CTA */}
        {!trialSent ? (
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-16">
            <input type="email" placeholder="Email doanh nghiệp của bạn" value={email} onChange={e=>setEmail(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-purple-400 outline-none" />
            <button onClick={()=>setTrialSent(true)} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-6 py-3.5 rounded-xl hover:opacity-90 whitespace-nowrap">
              Dùng thử miễn phí
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-300 px-6 py-3 rounded-xl mb-16">
            <span className="material-symbols-outlined" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
            Kiểm tra email để kích hoạt tài khoản!
          </div>
        )}

        {/* Dashboard preview */}
        <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0d0a1f] shadow-[0_0_80px_rgba(139,92,246,0.15)] overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-white/2">
            <div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-yellow-500/60" /><div className="w-3 h-3 rounded-full bg-green-500/60" />
            <div className="flex-1 mx-4 h-5 bg-white/5 rounded flex items-center px-3 text-xs text-white/20">app.flowai.vn/dashboard</div>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {metrics.map(m=>(
                <div key={m.label} className="bg-white/3 rounded-xl p-4 border border-white/5">
                  <p className="text-white/40 text-xs mb-2">{m.label}</p>
                  <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
                  <p className="text-green-400 text-xs mt-1">{m.change}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white/3 rounded-xl p-4 border border-white/5 h-28 flex items-end gap-1.5">
                {[40,65,45,80,60,90,75,95,70,88,78,100].map((h,i)=>(
                  <div key={i} className="flex-1 rounded-t" style={{height:`${h}%`,background:`rgba(139,92,246,${0.3+h*0.005})`}} />
                ))}
              </div>
              <div className="bg-white/3 rounded-xl p-4 border border-white/5">
                <p className="text-white/50 text-xs mb-3">Pipeline hoạt động</p>
                {['Sync CRM → Notion','Email auto-reply','Invoice generation','Report weekly'].map((task,i)=>(
                  <div key={task} className="flex items-center gap-2 mb-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${i<2?'bg-green-400':'bg-yellow-400'}`} />
                    <span className="text-xs text-white/60 flex-1">{task}</span>
                    <span className={`text-[10px] font-semibold ${i<2?'text-green-400':'text-yellow-400'}`}>{i<2?'Active':'Pending'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live demo */}
      <section className="py-24 px-8 max-w-[1280px] mx-auto">
        <div className="text-center mb-10">
          <span className="text-purple-400 text-xs font-semibold uppercase tracking-widest block mb-3">Thử Ngay</span>
          <h2 className="text-4xl font-bold mb-3">Trải Nghiệm AI Thực Tế</h2>
          <p className="text-white/50">Nhập mô tả quy trình của bạn, AI sẽ phân tích và đề xuất tối ưu hoá</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3 mb-4">
            <input value={demoInput} onChange={e=>setDemoInput(e.target.value)} placeholder='Ví dụ: "Xử lý đơn hàng từ email → cập nhật CRM → gửi xác nhận"'
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-purple-400 outline-none" />
            <button onClick={runDemo} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold px-6 py-3.5 rounded-xl transition-opacity whitespace-nowrap">
              Phân tích AI
            </button>
          </div>
          {demoResult && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5 text-sm text-purple-200">
              {demoResult}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-8 max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-purple-400 text-xs font-semibold uppercase tracking-widest block mb-3">Tính Năng</span>
          <h2 className="text-4xl font-bold">Mọi Thứ Bạn Cần</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f=>(
            <div key={f.title} className="bg-white/3 border border-white/8 hover:border-purple-500/40 rounded-2xl p-7 transition-all hover:-translate-y-1 duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-xl text-purple-300">{f.icon}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-8 max-w-[1280px] mx-auto">
        <div className="text-center mb-8">
          <span className="text-purple-400 text-xs font-semibold uppercase tracking-widest block mb-3">Pricing</span>
          <h2 className="text-4xl font-bold mb-4">Bảng Giá Đơn Giản</h2>
          <div className="inline-flex bg-white/5 rounded-xl p-1">
            {(['monthly','yearly'] as const).map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab===t?'bg-purple-600 text-white':'text-white/50 hover:text-white'}`}>
                {t==='monthly'?'Hàng tháng':'Hàng năm (–20%)'}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {pricingPlans.map(p=>(
            <div key={p.name} className={`rounded-2xl p-7 border flex flex-col relative ${p.hot?'border-purple-500/60 bg-gradient-to-b from-purple-900/30 to-indigo-900/20':'border-white/8 bg-white/3'}`}>
              {p.hot && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">Phổ biến nhất</div>}
              <h3 className="font-bold text-lg mb-2">{p.name}</h3>
              <div className="flex items-end gap-1 mb-5">
                {p.price === null ? <span className="text-3xl font-extrabold text-purple-300">Liên hệ</span> : (
                  <><span className="text-4xl font-extrabold">${activeTab==='yearly'?Math.round(p.price*0.8):p.price}</span><span className="text-white/40 mb-1">{p.unit}</span></>
                )}
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {p.features.map(f=>(
                  <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="material-symbols-outlined text-purple-400 text-base" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>{f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${p.hot?'bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90':'border border-white/20 hover:border-purple-400 hover:text-purple-300'}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-8 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map(t=>(
            <div key={t.company} className="bg-white/3 border border-white/8 rounded-2xl p-7">
              <div className="flex gap-0.5 mb-4">{Array.from({length:5}).map((_,i)=><span key={i} className="text-purple-400">★</span>)}</div>
              <p className="text-white/80 italic mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-600/40 flex items-center justify-center font-bold text-sm">{t.avatar}</div>
                <div>
                  <p className="font-semibold text-sm">{t.person}</p>
                  <p className="text-white/40 text-xs">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-8 max-w-[900px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">FAQ</h2>
        <div className="space-y-3">
          {faqs.map((faq,i)=>(
            <div key={faq.q} className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
              <button className="w-full flex justify-between items-center p-5 text-left" onClick={()=>setFaqOpen(faqOpen===i?null:i)}>
                <span className="font-semibold">{faq.q}</span>
                <span className="material-symbols-outlined text-white/50 transition-transform" style={{transform:faqOpen===i?'rotate(180deg)':''}}>expand_more</span>
              </button>
              {faqOpen===i && <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-bold text-lg">flow<span className="text-purple-400">AI</span></span>
          <p className="text-white/30 text-sm">© 2025 flowAI Inc. · Mẫu bởi <span className="text-purple-400">Vaitech</span></p>
          <div className="flex gap-5 text-sm text-white/40">
            {['Privacy','Terms','Security','Status'].map(l=><a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  )
}
