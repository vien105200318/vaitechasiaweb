'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { DemoBackButton, Reveal, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast, useTyped, useLocalCart } from '@/hooks/useDemo'

const FEATURES = [
  { icon: 'psychology', title: 'AI Tự Động Hóa', desc: 'Phân tích dữ liệu và ra quyết định thông minh 24/7.' },
  { icon: 'hub', title: '200+ Tích Hợp', desc: 'Slack, Notion, Jira, Salesforce và hơn thế nữa.' },
  { icon: 'speed', title: '<50ms Độ Trễ', desc: 'Xử lý 10 triệu request/giây trên toàn cầu.' },
  { icon: 'shield_locked', title: 'SOC 2 Type II', desc: 'Mã hoá AES-256, zero-trust architecture.' },
  { icon: 'analytics', title: 'Real-time Analytics', desc: '50+ metric có thể tuỳ chỉnh, alert thông minh.' },
  { icon: 'code', title: 'API-first', desc: 'REST & GraphQL, SDK 12 ngôn ngữ, Webhooks.' },
]

const PLANS = [
  { name: 'Starter', price: 0, mo: '/tháng', features: ['5 workspace', '10K API calls/tháng', '1GB storage', 'Community support'], cta: 'Bắt đầu miễn phí' },
  { name: 'Pro', price: 49, mo: '/tháng', features: ['Unlimited workspace', '1M API calls/tháng', '100GB storage', 'Priority support 24/7', 'Advanced analytics'], cta: 'Dùng thử 14 ngày', hot: true },
  { name: 'Enterprise', price: null, mo: '', features: ['Custom limits', 'Dedicated infra', 'SLA 99.99%', 'On-premise', 'Custom contract'], cta: 'Liên hệ Sales' },
]

const FAQS = [
  { q: 'flowAI có hỗ trợ on-premise không?', a: 'Có, gói Enterprise hỗ trợ triển khai on-premise hoặc private cloud theo yêu cầu riêng.' },
  { q: 'Giới hạn API call tính thế nào?', a: 'Mỗi request đến server là 1 API call. Batch request tính theo số item trong batch.' },
  { q: 'Có thể nâng cấp gói giữa chừng không?', a: 'Được, nâng cấp ngay lập tức. Phần chênh lệch tính theo tỷ lệ ngày còn lại.' },
  { q: 'Dữ liệu của tôi có an toàn không?', a: 'Dữ liệu được mã hoá AES-256 in-transit và at-rest. Chúng tôi không bán dữ liệu cho bên thứ ba.' },
]

const PIPELINE = [
  { name: 'Sync CRM → Notion', status: 'active', runs: '2.4K/ngày' },
  { name: 'Email auto-reply AI', status: 'active', runs: '847/ngày' },
  { name: 'Invoice generation', status: 'active', runs: '156/ngày' },
  { name: 'Weekly report', status: 'paused', runs: '0' },
]

function DashboardPreview() {
  const [metrics, setMetrics] = useState([2400000, 847000, 43, 99.99])
  useEffect(() => {
    const iv = setInterval(() => {
      setMetrics([
        2400000 + Math.floor(Math.random() * 5000),
        847000 + Math.floor(Math.random() * 2000),
        40 + Math.floor(Math.random() * 8),
        99.95 + Math.random() * 0.05,
      ])
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  const bars = [40,65,45,80,60,90,75,95,70,88,78,100]

  return (
    <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0d0a1f] overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.2)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
        <div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-yellow-500/60" /><div className="w-3 h-3 rounded-full bg-green-500/60" />
        <div className="flex-1 mx-4 h-5 bg-white/5 rounded-md flex items-center px-3 text-[11px] text-white/25">app.flowai.vn/dashboard</div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { label: 'Users', val: `${(metrics[0]/1000000).toFixed(1)}M`, c: 'text-purple-400', trend: '+18%' },
            { label: 'API calls/min', val: `${(metrics[1]/1000).toFixed(0)}K`, c: 'text-blue-400', trend: '+32%' },
            { label: 'Latency', val: `${metrics[2]}ms`, c: 'text-cyan-400', trend: '-12%' },
            { label: 'Uptime', val: `${metrics[3].toFixed(2)}%`, c: 'text-green-400', trend: '→' },
          ].map(m => (
            <div key={m.label} className="bg-white/4 rounded-xl p-3.5 border border-white/5 transition-all">
              <p className="text-white/35 text-xs mb-1.5">{m.label}</p>
              <p className={`text-2xl font-black ${m.c} transition-all duration-1000`}>{m.val}</p>
              <p className="text-xs text-white/30 mt-0.5">{m.trend}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Chart */}
          <div className="md:col-span-3 bg-white/3 rounded-xl p-4 border border-white/5">
            <p className="text-white/40 text-xs mb-3">API Requests (24h)</p>
            <div className="flex items-end gap-1 h-20">
              {bars.map((h,i)=>(
                <div key={i} className="flex-1 rounded-t transition-all duration-1000" style={{height:`${h}%`,background:`rgba(139,92,246,${0.3+h*0.005})`}} />
              ))}
            </div>
          </div>
          {/* Pipeline */}
          <div className="md:col-span-2 bg-white/3 rounded-xl p-4 border border-white/5">
            <p className="text-white/40 text-xs mb-3">Active Pipelines</p>
            <div className="space-y-2">
              {PIPELINE.map(p => (
                <div key={p.name} className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${p.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-white/20'}`} />
                  <span className="text-[11px] text-white/55 flex-1 truncate">{p.name}</span>
                  <span className="text-[10px] text-white/30">{p.runs}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SaasDemo() {
  const { toasts, add } = useToast()
  const typed = useTyped(['Quy trình kinh doanh', 'Tác vụ lặp lại', 'Workflow thủ công', 'Báo cáo định kỳ'], 60)
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [demoInput, setDemoInput] = useState('')
  const [demoResult, setDemoResult] = useState<string | null>(null)
  const [demoLoading, setDemoLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [trialSent, setTrialSent] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const runDemo = useCallback(async () => {
    if (!demoInput.trim()) { add('Vui lòng nhập mô tả quy trình', 'error'); return }
    setDemoLoading(true)
    setDemoResult(null)
    await new Promise(r => setTimeout(r, 900))
    setDemoResult(`✓ Phân tích "${demoInput}": Phát hiện 4 bước có thể tự động hoá · Tiết kiệm ước tính 14h/tuần · Độ chính xác AI 97.3% · Cần 2 integration`)
    setDemoLoading(false)
    add('Phân tích hoàn tất!', 'success')
  }, [demoInput, add])

  return (
    <div className="min-h-screen bg-[#06040f] text-white overflow-x-hidden font-sans">
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* Fixed orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] animate-glow" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px] animate-glow" style={{animationDelay:'1.5s'}} />
      </div>

      {/* ── Nav ── */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-400 ${scrolled ? 'bg-[#06040f]/95 backdrop-blur-xl border-b border-white/6' : 'bg-transparent'}`}>
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-xs text-white font-black">bolt</span>
            </div>
            <span className="font-black text-lg">flow<span className="text-purple-400">AI</span></span>
          </div>
          <div className="hidden md:flex gap-7 text-sm text-white/50">
            {['Tính năng', 'Live Demo', 'Pricing', 'Docs'].map(n => (
              <a key={n} href="#" className="hover:text-white transition-colors relative group">
                {n}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-purple-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="text-white/60 hover:text-white text-sm transition-colors">Đăng nhập</button>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white text-sm font-bold px-5 py-2 rounded-lg transition-opacity active:scale-95">
              Bắt đầu miễn phí
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 pb-10 relative">
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            v3.0 mới ra mắt — AI Agent nhanh hơn 5x
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight mb-6 max-w-4xl">
            Tự Động Hóa<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400">
              {typed}<span className="animate-pulse">|</span>
            </span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-white/45 text-xl max-w-2xl mb-10 leading-relaxed">
            flowAI kết nối mọi công cụ, tự động hóa tác vụ lặp lại, và ra quyết định thông minh bằng AI.
          </p>
        </Reveal>
        <Reveal delay={240}>
          {!trialSent ? (
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-6">
              <input type="email" placeholder="Email doanh nghiệp của bạn" value={email} onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-white/6 border border-white/12 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-purple-400 focus:bg-white/8 outline-none transition-all" />
              <button onClick={() => { if (!email.includes('@')) { add('Email không hợp lệ', 'error'); return } setTrialSent(true); add('Kiểm tra email để kích hoạt!', 'success') }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold px-6 py-3.5 rounded-xl transition-opacity whitespace-nowrap active:scale-95">
                Dùng thử miễn phí
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/25 text-green-300 px-6 py-3 rounded-xl mb-6 animate-scale-in">
              <span className="material-symbols-outlined text-base" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
              Kiểm tra email để kích hoạt tài khoản!
            </div>
          )}
        </Reveal>
        <Reveal delay={280} className="w-full flex justify-center mt-6">
          <DashboardPreview />
        </Reveal>
      </section>

      {/* ── Live Demo ── */}
      <section className="py-20 px-6 max-w-[900px] mx-auto">
        <Reveal className="text-center mb-10">
          <span className="text-purple-400 text-xs font-bold uppercase tracking-widest block mb-3">Thử Ngay</span>
          <h2 className="text-4xl font-black mb-3">Trải Nghiệm AI Thực Tế</h2>
          <p className="text-white/40">Nhập mô tả quy trình — AI phân tích và đề xuất tự động hoá trong giây lát</p>
        </Reveal>
        <Reveal>
          <div className="flex gap-3 mb-4">
            <input value={demoInput} onChange={e => setDemoInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && runDemo()}
              placeholder='Ví dụ: "Xử lý đơn hàng từ email → CRM → gửi xác nhận"'
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:border-purple-400 focus:bg-white/7 outline-none transition-all" />
            <button onClick={runDemo} disabled={demoLoading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 disabled:opacity-50 text-white font-bold px-6 py-3.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 active:scale-95">
              {demoLoading ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> : <span className="material-symbols-outlined text-base">psychology</span>}
              Phân tích AI
            </button>
          </div>
          {demoResult && (
            <div className="bg-purple-500/8 border border-purple-500/25 rounded-xl p-5 text-sm text-purple-200 leading-relaxed animate-slide-in-up">
              {demoResult}
            </div>
          )}
        </Reveal>
      </section>

      {/* ── Features ── */}
      <section className="py-16 px-6 max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-12">
          <span className="text-purple-400 text-xs font-bold uppercase tracking-widest block mb-3">Tính Năng</span>
          <h2 className="text-4xl font-black">Mọi Thứ Bạn Cần</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}
              className="group bg-white/3 border border-white/8 hover:border-purple-500/40 rounded-2xl p-7 transition-all hover:-translate-y-1 duration-300 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-purple-500/12 group-hover:bg-purple-500/20 flex items-center justify-center mb-5 transition-colors">
                <span className="material-symbols-outlined text-xl text-purple-300">{f.icon}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 px-6 max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-10">
          <span className="text-purple-400 text-xs font-bold uppercase tracking-widest block mb-3">Pricing</span>
          <h2 className="text-4xl font-black mb-4">Bảng Giá Đơn Giản</h2>
          <div className="inline-flex bg-white/5 rounded-xl p-1">
            {(['monthly', 'yearly'] as const).map(t => (
              <button key={t} onClick={() => setBilling(t)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${billing === t ? 'bg-purple-600 text-white' : 'text-white/45 hover:text-white'}`}>
                {t === 'monthly' ? 'Hàng tháng' : <span>Hàng năm <span className="text-purple-300 text-xs">−20%</span></span>}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}
              className={`rounded-2xl p-7 border flex flex-col relative ${p.hot ? 'border-purple-500/55 bg-gradient-to-b from-purple-900/25 to-indigo-900/15' : 'border-white/8 bg-white/3'}`}>
              {p.hot && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">⭐ Phổ biến nhất</div>}
              <h3 className="font-black text-xl mb-2">{p.name}</h3>
              <div className="flex items-end gap-1 mb-5">
                {p.price === null ? <span className="text-3xl font-black text-purple-300">Liên hệ</span> : (
                  <><span className="text-4xl font-black">${billing === 'yearly' ? Math.round(p.price * 0.8) : p.price}</span><span className="text-white/35 mb-1">{p.mo}</span></>
                )}
              </div>
              <ul className="space-y-2.5 mb-7 flex-1">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/65">
                    <span className="material-symbols-outlined text-purple-400 text-base" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>{f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3.5 rounded-xl font-black text-sm transition-all active:scale-95 ${p.hot ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white' : 'border border-white/15 hover:border-purple-400/60 hover:text-purple-300 text-white/60'}`}>
                {p.cta}
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-6 max-w-[760px] mx-auto">
        <Reveal className="text-center mb-10">
          <h2 className="text-3xl font-black">Câu Hỏi Thường Gặp</h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="w-full bg-white/3 border border-white/8 hover:border-purple-500/30 rounded-xl overflow-hidden transition-all">
                <div className="flex justify-between items-center p-5 text-left">
                  <span className="font-semibold text-sm">{f.q}</span>
                  <span className="material-symbols-outlined text-white/40 transition-transform flex-shrink-0 ml-3"
                    style={{ transform: faqOpen === i ? 'rotate(180deg)' : '' }}>expand_more</span>
                </div>
                {faqOpen === i && (
                  <div className="px-5 pb-5 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-3 animate-slide-in-up">
                    {f.a}
                  </div>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 max-w-[900px] mx-auto">
        <Reveal>
          <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/30 border border-purple-500/20 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.2),transparent_70%)]" />
            <h2 className="text-4xl font-black mb-4 relative">Bắt Đầu Hôm Nay</h2>
            <p className="text-white/45 mb-8 relative">14 ngày miễn phí. Không cần thẻ tín dụng.</p>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-black px-12 py-4 rounded-xl text-lg transition-all hover:scale-105 active:scale-95 relative">
              Dùng thử miễn phí
            </button>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-white/5 py-10 px-6 text-center">
        <span className="font-black text-lg">flow<span className="text-purple-400">AI</span></span>
        <p className="text-white/25 text-sm mt-2">© 2026 flowAI Inc. · Mẫu bởi <span className="text-purple-400">Vaitech</span></p>
      </footer>
    </div>
  )
}
