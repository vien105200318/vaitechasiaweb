'use client'
import { useState } from 'react'
import {
  ShieldAlert, Phone, Send, Eye, EyeOff, Heart,
  Users, BarChart3, Clock, CheckCircle2, AlertTriangle,
  BookOpen, MessageCircle, ChevronRight, Lock,
  Star, Shield, GraduationCap, Megaphone,
} from 'lucide-react'
import { DemoBackButton, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const INCIDENT_TYPES = [
  'Đánh đập, gây thương tích',
  'Bắt nạt tinh thần / đe doạ',
  'Xúc phạm, chửi bới',
  'Cô lập, tẩy chay',
  'Lợi dụng quyền lực / hiếp dâm',
  'Quấy rối trên mạng (cyberbullying)',
]

const REPORTS = [
  { id: 1, type: 'Bắt nạt tinh thần', school: 'THPT Nguyễn Huệ', status: 'processing', date: '2h trước', anon: true },
  { id: 2, type: 'Đánh đập', school: 'THCS Lê Quý Đôn', status: 'urgent', date: '30 phút', anon: true },
  { id: 3, type: 'Cyberbullying', school: 'THPT Trần Phú', status: 'new', date: '1 giờ', anon: false },
  { id: 4, type: 'Cô lập, tẩy chay', school: 'THCS Nguyễn Văn Cừ', status: 'resolved', date: '3 ngày', anon: true },
]

const STATUS_MAP = {
  new: { label: 'Mới', color: '#3b82f6' },
  processing: { label: 'Đang xử lý', color: '#f59e0b' },
  urgent: { label: 'Khẩn cấp', color: '#ef4444' },
  resolved: { label: 'Đã giải quyết', color: '#22c55e' },
}

const STORIES = [
  { name: 'Minh Anh', age: 15, school: 'THPT Nguyễn Huệ', story: 'Mình bị các bạn trong lớp cô lập suốt 6 tháng. Sau khi báo qua hệ thống, nhà trường đã vào cuộc và mọi chuyện tốt hơn rất nhiều.', rating: 5 },
  { name: 'Thanh Hà', age: 13, school: 'THCS Lê Quý Đôn', story: 'Mình sợ nói cho bố mẹ vì sợ bị mắng. Hệ thống này giúp mình giấu tên mà vẫn được giúp đỡ.', rating: 5 },
  { name: 'Đức Phát', age: 16, school: 'THPT Trần Hưng Đạo', story: 'Bị đánh sau giờ học mà không dám nói. Nhờ đường dây nóng mà giáo viên chủ nhiệm đã can thiệp kịp thời.', rating: 5 },
]

export default function BaoLucHocDuongDemo() {
  const { toasts, add } = useToast()
  const [activeTab, setActiveTab] = useState<'report' | 'track' | 'resource'>('report')
  const [type, setType] = useState('')
  const [detail, setDetail] = useState('')
  const [school, setSchool] = useState('')
  const [anonymous, setAnonymous] = useState(true)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [phone, setPhone] = useState('')
  const [showHotline, setShowHotline] = useState(false)

  const handleSubmit = async () => {
    if (!type || !detail) { add('Vui lòng điền đầy đủ thông tin', 'error'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false); setDone(true)
    setType(''); setDetail(''); setSchool('')
    const code = 'BL-' + Math.floor(Math.random() * 9000 + 1000)
    add(`Báo cáo đã gửi thành công! Mã: ${code}. Bạn an toàn.`, 'success')
  }

  return (
    <div className="min-h-screen bg-[#0f0a1a] text-white overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* Header */}
      <div className="bg-[#16102a] border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
              <ShieldAlert size={18} className="text-white" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-purple-100">An Toàn Học Đường</span>
              <span className="text-[9px] text-purple-400/60 ml-2 font-semibold tracking-wider">SAFE SCHOOL VN</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowHotline(!showHotline)}
              className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/30 text-red-300 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition-colors">
              <Phone size={11} />
              {showHotline ? '111' : 'Hotline'}
            </button>
          </div>
        </div>
      </div>

      {/* Hotline Banner */}
      {showHotline && (
        <div className="bg-gradient-to-r from-red-600/20 to-pink-600/20 border-b border-red-500/20">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Phone size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-red-200">Tổng đài bảo vệ trẻ em: 111</p>
                <p className="text-[10px] text-red-300/60">Hoạt động 24/7 — Miễn phí — Bảo mật tuyệt đối</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-red-300/50">
              <Lock size={10} />
              <span>Bảo mật quốc gia</span>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-pink-600/10 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-semibold px-3 py-1 rounded-full mb-4">
              <Shield size={10} className="text-purple-400" />
              Nền tảng bảo vệ học sinh
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 text-white">
              Mỗi Trẻ Em Đều <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Đáng Được An Toàn</span>
            </h1>
            <p className="text-purple-200/50 text-sm mb-6 max-w-lg leading-relaxed">
              Hệ thống báo cáo bạo lực học đường ẩn danh. Bạn không đơn độc. 
              Chúng tôi lắng nghe, bảo vệ và hành động.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <button onClick={() => { setActiveTab('report'); document.getElementById('report-form')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow">
                <Send size={13} /> Báo cáo ngay
              </button>
              <button onClick={() => setActiveTab('resource')}
                className="border border-purple-500/20 text-purple-300 text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-purple-500/10 transition-colors">
                Tài liệu hỗ trợ
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="text-center">
                <p className="text-2xl font-black text-purple-300"><CountUp target={12847} /></p>
                <p className="text-[10px] text-purple-400/50 mt-0.5">Báo cáo đã xử lý</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-green-400"><CountUp target={94} suffix="%" /></p>
                <p className="text-[10px] text-purple-400/50 mt-0.5">Giải quyết kịp thời</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-pink-400"><CountUp target={3842} /></p>
                <p className="text-[10px] text-purple-400/50 mt-0.5">Học sinh được hỗ trợ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 border-b border-white/5">
          {[
            { key: 'report' as const, label: 'Báo cáo', icon: Send },
            { key: 'track' as const, label: 'Theo dõi', icon: BarChart3 },
            { key: 'resource' as const, label: 'Tài liệu', icon: BookOpen },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-purple-500 text-purple-300'
                  : 'border-transparent text-white/40 hover:text-white/60'
              }`}>
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Report Form */}
      {activeTab === 'report' && (
        <div className="max-w-7xl mx-auto px-4 py-8" id="report-form">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-[#1a1230] rounded-2xl border border-purple-500/10 p-6">
                <h2 className="text-lg font-bold text-purple-100 mb-1">Gửi báo cáo</h2>
                <p className="text-[10px] text-purple-300/40 mb-6">Thông tin của bạn được bảo mật tuyệt đối</p>

                {done ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold text-green-300 mb-2">Báo cáo đã được gửi!</h3>
                    <p className="text-xs text-purple-300/50 mb-4">Chúng tôi sẽ xử lý trong vòng 24 giờ. Bạn không đơn độc.</p>
                    <button onClick={() => setDone(false)} className="text-xs text-purple-400 hover:text-purple-300 font-semibold">
                      Gửi báo cáo khác
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Anonymous toggle */}
                    <div className="flex items-center justify-between bg-purple-500/5 border border-purple-500/10 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        {anonymous ? <EyeOff size={14} className="text-purple-400" /> : <Eye size={14} className="text-purple-400" />}
                        <span className="text-xs font-semibold text-purple-200">
                          {anonymous ? 'Báo cáo ẩn danh' : 'Báo cáo công khai'}
                        </span>
                      </div>
                      <button onClick={() => setAnonymous(!anonymous)}
                        className={`w-10 h-5 rounded-full transition-colors relative ${anonymous ? 'bg-purple-600' : 'bg-white/10'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${anonymous ? 'right-0.5' : 'left-0.5'}`} />
                      </button>
                    </div>

                    {/* Incident type */}
                    <div>
                      <label className="text-[10px] text-purple-300/60 font-semibold uppercase tracking-wider mb-1.5 block">Loại sự cố</label>
                      <div className="grid grid-cols-2 gap-2">
                        {INCIDENT_TYPES.map(t => (
                          <button key={t} onClick={() => setType(t)}
                            className={`text-left text-xs px-3 py-2 rounded-lg border transition-all ${
                              type === t
                                ? 'border-purple-500 bg-purple-500/10 text-purple-200'
                                : 'border-white/5 bg-white/[0.02] text-white/40 hover:text-white/60'
                            }`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* School */}
                    <div>
                      <label className="text-[10px] text-purple-300/60 font-semibold uppercase tracking-wider mb-1.5 block">Trường học (tuỳ chọn)</label>
                      <input value={school} onChange={e => setSchool(e.target.value)}
                        placeholder="VD: THPT Nguyễn Huệ"
                        className="w-full bg-white/[0.03] border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-purple-500/50 transition-colors" />
                    </div>

                    {/* Detail */}
                    <div>
                      <label className="text-[10px] text-purple-300/60 font-semibold uppercase tracking-wider mb-1.5 block">Mô tả sự việc</label>
                      <textarea value={detail} onChange={e => setDetail(e.target.value)}
                        placeholder="Hãy kể cho chúng tôi nghe..."
                        rows={4}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-purple-500/50 transition-colors resize-none" />
                    </div>

                    {/* Phone (optional) */}
                    {!anonymous && (
                      <div>
                        <label className="text-[10px] text-purple-300/60 font-semibold uppercase tracking-wider mb-1.5 block">Số điện thoại liên hệ</label>
                        <input value={phone} onChange={e => setPhone(e.target.value)}
                          placeholder="Để chúng tôi liên hệ hỗ trợ"
                          className="w-full bg-white/[0.03] border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-purple-500/50 transition-colors" />
                      </div>
                    )}

                    <button onClick={handleSubmit} disabled={loading}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 disabled:opacity-50 hover:shadow-purple-500/40 transition-all">
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <><Send size={14} /> Gửi báo cáo</>
                      )}
                    </button>

                    <p className="text-[10px] text-purple-300/30 text-center">
                      <Lock size={9} className="inline mr-1" />
                      Mã hoá end-to-end. Không lưu IP. Không theo dõi.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Emergency card */}
              <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 border border-red-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <Phone size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-red-200">Cần giúp đỡ ngay?</p>
                    <p className="text-[10px] text-red-300/50">Gọi 111 — Miễn phí 24/7</p>
                  </div>
                </div>
                <button className="w-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold py-2 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center gap-1.5">
                  <Phone size={11} /> Gọi ngay 111
                </button>
              </div>

              {/* Recent reports */}
              <div className="bg-[#1a1230] rounded-2xl border border-purple-500/10 p-5">
                <h3 className="text-xs font-bold text-purple-200 mb-3">Báo cáo gần đây</h3>
                <div className="space-y-2">
                  {REPORTS.map(r => (
                    <div key={r.id} className="bg-white/[0.02] rounded-lg p-3 border border-white/5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-purple-200">{r.type}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                          style={{ background: STATUS_MAP[r.status as keyof typeof STATUS_MAP].color + '20', color: STATUS_MAP[r.status as keyof typeof STATUS_MAP].color }}>
                          {STATUS_MAP[r.status as keyof typeof STATUS_MAP].label}
                        </span>
                      </div>
                      <p className="text-[9px] text-purple-300/40">{r.school} · {r.date}</p>
                      {r.anon && <span className="text-[8px] text-purple-400/30 mt-1 inline-flex items-center gap-0.5"><EyeOff size={8} /> Ẩn danh</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-5">
                <h3 className="text-xs font-bold text-purple-200 mb-3">Cam kết của chúng tôi</h3>
                <div className="space-y-2.5">
                  {[
                    { icon: Lock, text: 'Mã hoá end-to-end' },
                    { icon: EyeOff, text: 'Báo cáo ẩn danh 100%' },
                    { icon: Clock, text: 'Xử lý trong 24 giờ' },
                    { icon: Heart, text: 'Hỗ trợ tâm lý miễn phí' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <item.icon size={12} className="text-purple-400" />
                      <span className="text-[10px] text-purple-300/60">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Track Tab */}
      {activeTab === 'track' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Tổng báo cáo', value: 12847, color: '#a855f7' },
              { label: 'Đang xử lý', value: 234, color: '#f59e0b' },
              { label: 'Khẩn cấp', value: 18, color: '#ef4444' },
              { label: 'Đã giải quyết', value: 11903, color: '#22c55e' },
            ].map(s => (
              <div key={s.label} className="bg-[#1a1230] rounded-xl border border-purple-500/10 p-4">
                <p className="text-[10px] text-purple-300/50 mb-1">{s.label}</p>
                <p className="text-2xl font-black" style={{ color: s.color }}>
                  <CountUp target={s.value} />
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#1a1230] rounded-2xl border border-purple-500/10 p-6">
            <h3 className="text-sm font-bold text-purple-200 mb-4">Thống kê theo loại sự cố</h3>
            <div className="space-y-3">
              {[
                { type: 'Bắt nạt tinh thần', pct: 38, count: 4882, color: '#a855f7' },
                { type: 'Đánh đập', pct: 24, count: 3083, color: '#ef4444' },
                { type: 'Cyberbullying', pct: 19, count: 2441, color: '#3b82f6' },
                { type: 'Cô lập, tẩy chay', pct: 12, count: 1542, color: '#f59e0b' },
                { type: 'Lợi dụng quyền lực', pct: 5, count: 642, color: '#ec4899' },
                { type: 'Khác', pct: 2, count: 257, color: '#6b7280' },
              ].map(item => (
                <div key={item.type} className="flex items-center gap-3">
                  <span className="text-[10px] text-purple-300/50 w-36 shrink-0">{item.type}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                  </div>
                  <span className="text-[10px] font-bold shrink-0" style={{ color: item.color }}>{item.pct}%</span>
                  <span className="text-[9px] text-purple-300/30 w-14 text-right shrink-0">{item.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Resource Tab */}
      {activeTab === 'resource' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-[#1a1230] rounded-2xl border border-purple-500/10 p-6">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap size={20} className="text-purple-400" />
              </div>
              <h3 className="text-sm font-bold text-purple-100 mb-2">Dành cho học sinh</h3>
              <p className="text-[10px] text-purple-300/50 mb-4 leading-relaxed">
                Nhận biết dấu hiệu bị bắt nạt, cách đối phó, và tìm kiếm sự giúp đỡ an toàn.
              </p>
              <ul className="space-y-2">
                {['Các dạng bạo lực học đường phổ biến', 'Dấu hiệu nhận biết bạn bị bắt nạt', 'Cách ứng xử khi bị bắt nạt', 'Làm sao để mạnh dạn lên tiếng'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-[10px] text-purple-300/60">
                    <ChevronRight size={10} className="text-purple-500" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#1a1230] rounded-2xl border border-purple-500/10 p-6">
              <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                <Users size={20} className="text-pink-400" />
              </div>
              <h3 className="text-sm font-bold text-purple-100 mb-2">Dành cho phụ huynh</h3>
              <p className="text-[10px] text-purple-300/50 mb-4 leading-relaxed">
                Nhận biết con mình bị bắt nạt, cách hỗ trợ, và khi nào cần can thiệp chuyên nghiệp.
              </p>
              <ul className="space-y-2">
                {['Dấu hiệu con bạn đang bị bắt nạt', 'Cách nói chuyện với con về bạo lực', 'Liên hệ nhà trường hiệu quả', 'Hỗ trợ tâm lý cho con'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-[10px] text-purple-300/60">
                    <ChevronRight size={10} className="text-pink-500" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stories */}
          <h3 className="text-sm font-bold text-purple-200 mb-4">Câu chuyện thật từ học sinh</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STORIES.map((s, i) => (
              <div key={i} className="bg-[#1a1230] rounded-2xl border border-purple-500/10 p-5">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: s.rating }).map((_, j) => (
                    <Star key={j} size={10} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-[10px] text-purple-300/60 leading-relaxed mb-4 italic">&ldquo;{s.story}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-purple-500/20 rounded-full flex items-center justify-center text-[9px] font-bold text-purple-300">
                    {s.name[0]}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-purple-200">{s.name}, {s.age} tuổi</p>
                    <p className="text-[8px] text-purple-300/30">{s.school}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 border-t border-purple-500/10 bg-[#16102a]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <ShieldAlert size={14} className="text-white" />
                </div>
                <span className="text-xs font-bold text-purple-100">An Toàn Học Đường</span>
              </div>
              <p className="text-[10px] text-purple-300/40 leading-relaxed">
                Nền tảng báo cáo bạo lực học đường. Mỗi trẻ em đều xứng đáng được an toàn.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-purple-200 uppercase tracking-wider mb-3">Hotline</h4>
              <p className="text-xs text-purple-300/60">111 — Tổng đài bảo vệ trẻ em</p>
              <p className="text-xs text-purple-300/60">1800 1567 — Tư vấn tâm lý</p>
              <p className="text-[10px] text-purple-300/30 mt-1">Miễn phí · 24/7</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-purple-200 uppercase tracking-wider mb-3">Tài nguyên</h4>
              <div className="space-y-1.5">
                {['Tài liệu học sinh', 'Tài liệu phụ huynh', 'Quy trình báo cáo', 'Quyền trẻ em'].map((t, i) => (
                  <p key={i} className="text-[10px] text-purple-300/40 hover:text-purple-300/60 cursor-pointer transition-colors">{t}</p>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-purple-200 uppercase tracking-wider mb-3">Đối tác</h4>
              <div className="space-y-1.5">
                {['Bộ GD&ĐT', 'UNICEF Việt Nam', 'Quỹ Nhi Đồng LHQ', 'Tổ chức ChildFund'].map((t, i) => (
                  <p key={i} className="text-[10px] text-purple-300/40">{t}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-purple-500/5 flex items-center justify-between">
            <p className="text-[9px] text-purple-300/20">&copy; 2026 An Toàn Học Đường. Bảo vệ mọi trẻ em Việt Nam.</p>
            <div className="flex items-center gap-1 text-[9px] text-purple-300/20">
              <Lock size={8} /> Mã hoá end-to-end
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
