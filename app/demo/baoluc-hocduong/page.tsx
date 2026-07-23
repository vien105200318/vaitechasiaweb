'use client'
import { useState } from 'react'
import {
  ShieldAlert, Phone, Send, Eye, EyeOff, Heart,
  Users, BarChart3, Clock, CheckCircle2, AlertTriangle,
  BookOpen, MessageCircle, ChevronRight, Lock,
  Star, Shield, GraduationCap, Megaphone, Home, School,
  Image, X,
} from 'lucide-react'
import { DemoBackButton, ToastContainer, CountUp } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const SCHOOL_TYPES = [
  'Đánh đập, gây thương tích',
  'Bắt nạt tinh thần / đe doạ',
  'Xúc phạm, chửi bới',
  'Cô lập, tẩy chay',
  'Lợi dụng quyền lực',
  'Cyberbullying',
]

const FAMILY_TYPES = [
  'Bạo lực gia đình',
  'Lạm dụng tinh thần',
  'Bỏ mặc / Bỏ bê',
]

const REPORTS = [
  { id: 1, type: 'Bắt nạt tinh thần', location: 'school', school: 'THPT Nguyễn Huệ', status: 'processing', date: '2h trước', anon: true },
  { id: 2, type: 'Đánh đập', location: 'school', school: 'THCS Lê Quý Đôn', status: 'urgent', date: '30 phút', anon: true },
  { id: 3, type: 'Bạo lực gia đình', location: 'home', school: 'Quận 3, TP.HCM', status: 'new', date: '1 giờ', anon: true },
  { id: 4, type: 'Cô lập, tẩy chay', location: 'school', school: 'THCS Nguyễn Văn Cừ', status: 'resolved', date: '3 ngày', anon: true },
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
  const [location, setLocation] = useState<'school' | 'home' | ''>('')
  const [type, setType] = useState('')
  const [detail, setDetail] = useState('')
  const [school, setSchool] = useState('')
  const [anonymous, setAnonymous] = useState(true)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [phone, setPhone] = useState('')
  const [showHotline, setShowHotline] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const incidentTypes = location === 'home' ? FAMILY_TYPES : location === 'school' ? SCHOOL_TYPES : []

  const handleSubmit = async () => {
    if (!type || !detail) { add('Vui lòng điền đầy đủ thông tin', 'error'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false); setDone(true)
    setType(''); setDetail(''); setSchool(''); setLocation(''); setFiles([])
    const code = 'BL-' + Math.floor(Math.random() * 9000 + 1000)
    add(`Báo cáo đã gửi thành công! Mã: ${code}. Bạn an toàn.`, 'success')
  }

  return (
    <div className="min-h-screen text-[#2C1810] overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: '#FFF9F0' }}>
      {/* Inline style overrides for crayon theme */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Patrick+Hand&family=Inter:wght@400;500;600&display=swap');
        .crayon-title { font-family: 'Caveat', cursive; font-weight: 700; }
        .crayon-hand { font-family: 'Patrick Hand', cursive; }
        .crayon-border { border: 3px solid #E8D5C4; border-radius: 20px; }
        .crayon-border-dashed { border: 3px dashed #C9A87C; border-radius: 20px; }
        .crayon-shadow { box-shadow: 3px 3px 0 #E8D5C4; }
        .crayon-shadow-lg { box-shadow: 4px 4px 0 #E8D5C4; }
        .crayon-btn { border: 3px solid #2C1810; border-radius: 16px; position: relative; }
        .crayon-btn::after { content: ''; position: absolute; top: 3px; left: 3px; right: -3px; bottom: -3px; border: 2px solid #C9A87C; border-radius: inherit; z-index: -1; }
        .crayon-btn:active { transform: translate(2px, 2px); }
        .crayon-btn:active::after { transform: translate(-2px, -2px); }
      `}</style>

      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* Header */}
      <div style={{ background: 'rgba(255,249,240,0.95)', borderBottom: '3px solid #E8D5C4', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 900 }}>
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FF6B6B', border: '3px solid #E85555' }}>
              <ShieldAlert size={20} className="text-white" />
            </div>
            <div>
              <span className="crayon-title text-xl" style={{ color: '#2C1810' }}>Em An</span>
              <span className="crayon-hand text-xs ml-2" style={{ color: '#6B5B4F' }}>Mỗi tiếng nói đều quan trọng</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowHotline(!showHotline)}
              className="crayon-hand flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full transition-colors"
              style={{ background: '#FF6B6B', color: 'white', border: '3px solid #E85555' }}>
              <Phone size={14} />
              {showHotline ? '111' : 'Hotline'}
            </button>
          </div>
        </div>
      </div>

      {/* Hotline Banner */}
      {showHotline && (
        <div style={{ background: 'linear-gradient(135deg, rgba(255,107,107,0.15), rgba(247,131,172,0.15))', borderBottom: '3px solid #E8D5C4' }}>
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#FF6B6B', animation: 'pulse 2s ease-in-out infinite' }}>
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="crayon-hand text-base font-bold" style={{ color: '#2C1810' }}>Tổng đài bảo vệ trẻ em: 111</p>
                <p className="crayon-hand text-sm" style={{ color: '#6B5B4F' }}>Hoạt động 24/7 — Miễn phí — Bảo mật tuyệt đối</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '20px' }}>
        {/* Background doodles */}
        <div className="absolute pointer-events-none" style={{ top: '10%', left: '5%', animation: 'float 4s ease-in-out infinite' }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 4L29.5 17.5H44L32 27L36.5 42L24 33L11.5 42L16 27L4 17.5H18.5L24 4Z" stroke="#FFD43B" strokeWidth="2.5" strokeLinecap="round" fill="rgba(255,212,59,0.2)"/></svg>
        </div>
        <div className="absolute pointer-events-none" style={{ bottom: '15%', right: '8%', animation: 'float 4s ease-in-out infinite 1.5s' }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 35S4 24 4 14C4 8 8 4 13 4C16 4 18.5 5.5 20 8C21.5 5.5 24 4 27 4C32 4 36 8 36 14C36 24 20 35 20 35Z" stroke="#F783AC" strokeWidth="2.5" strokeLinecap="round" fill="rgba(247,131,172,0.15)"/></svg>
        </div>
        <div className="absolute pointer-events-none" style={{ top: '25%', right: '3%', animation: 'float 4s ease-in-out infinite 0.8s' }}>
          <svg width="44" height="52" viewBox="0 0 44 52" fill="none"><path d="M22 4L4 12V26C4 38 12 46 22 50C32 46 40 38 40 26V12L22 4Z" stroke="#74C0FC" strokeWidth="2.5" strokeLinecap="round" fill="rgba(116,192,252,0.12)"/></svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 pt-8 pb-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 crayon-hand text-base font-semibold" style={{ background: '#69DB7C', color: '#2C1810', border: '3px solid #4EBA62', boxShadow: '2px 2px 0 #E8D5C4', animation: 'float 3s ease-in-out infinite' }}>
            <span style={{ width: 10, height: 10, background: '#2C1810', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
            Hệ thống hoạt động 24/7
          </div>

          <h1 className="crayon-title leading-tight mb-5" style={{ fontSize: 'clamp(42px, 8vw, 72px)', color: '#2C1810' }}>
            Mỗi tiếng nói<br />
            <span style={{ background: 'linear-gradient(135deg, #FF6B6B, #FFA94D, #FFD43B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>đều quan trọng</span>
          </h1>

          <p className="crayon-hand mb-8 max-w-xl mx-auto" style={{ fontSize: '22px', color: '#6B5B4F', lineHeight: 1.5 }}>
            Bạn bị bắt nạt ở trường? Bị bạo lực tại nhà?<br />
            Đừng im lặng — báo cáo ẩn danh, không ai biết bạn là ai.
          </p>

          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            <button onClick={() => { setActiveTab('report'); document.getElementById('report-form')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="crayon-btn crayon-hand text-lg font-bold px-6 py-3 flex items-center gap-2"
              style={{ background: '#FF6B6B', color: 'white', borderColor: '#E85555' }}>
              <Send size={18} /> Báo cáo ngay
            </button>
            <a href="tel:111"
              className="crayon-btn crayon-hand text-lg font-bold px-6 py-3 flex items-center gap-2 no-underline"
              style={{ background: '#F783AC', color: 'white', borderColor: '#E06B8E' }}>
              <Phone size={18} /> Gọi 111
            </a>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 flex-wrap">
            <div className="text-center">
              <p className="crayon-title" style={{ fontSize: '48px', color: '#FF6B6B' }}><CountUp target={12847} /></p>
              <p className="crayon-hand" style={{ fontSize: '18px', color: '#6B5B4F' }}>Báo cáo đã xử lý</p>
            </div>
            <div className="text-center">
              <p className="crayon-title" style={{ fontSize: '48px', color: '#69DB7C' }}><CountUp target={94} suffix="%" /></p>
              <p className="crayon-hand" style={{ fontSize: '18px', color: '#6B5B4F' }}>Giải quyết kịp thời</p>
            </div>
            <div className="text-center">
              <p className="crayon-title" style={{ fontSize: '48px', color: '#F783AC' }}><CountUp target={3842} /></p>
              <p className="crayon-hand" style={{ fontSize: '18px', color: '#6B5B4F' }}>Trẻ em được hỗ trợ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-2 border-b-2" style={{ borderColor: '#E8D5C4' }}>
          {[
            { key: 'report' as const, label: 'Báo cáo', icon: Send },
            { key: 'track' as const, label: 'Theo dõi', icon: BarChart3 },
            { key: 'resource' as const, label: 'Tài liệu', icon: BookOpen },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className="crayon-hand flex items-center gap-2 px-6 py-3 text-lg font-semibold border-b-3 transition-all"
              style={{
                borderBottom: `3px solid ${activeTab === tab.key ? '#FF6B6B' : 'transparent'}`,
                color: activeTab === tab.key ? '#FF6B6B' : '#6B5B4F',
                background: activeTab === tab.key ? 'rgba(255,107,107,0.08)' : 'transparent',
                borderRadius: '12px 12px 0 0',
              }}>
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Report Form */}
      {activeTab === 'report' && (
        <div className="max-w-5xl mx-auto px-4 py-8" id="report-form">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="crayon-border crayon-shadow-lg p-6 relative overflow-hidden" style={{ background: '#FFFFFF' }}>
                {/* Rainbow top bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: 'linear-gradient(90deg, #FF6B6B, #FFA94D, #FFD43B, #69DB7C, #74C0FC, #B197FC)' }} />

                <h2 className="crayon-title text-2xl mb-1" style={{ color: '#2C1810' }}>Gửi báo cáo ẩn danh</h2>
                <p className="crayon-hand text-sm mb-6" style={{ color: '#6B5B4F' }}>Thông tin của bạn được bảo mật tuyệt đối</p>

                {done ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#69DB7C', border: '3px solid #4EBA62' }}>
                      <CheckCircle2 size={40} className="text-white" />
                    </div>
                    <h3 className="crayon-title text-2xl mb-2" style={{ color: '#2C1810' }}>Báo cáo đã được gửi!</h3>
                    <p className="crayon-hand text-base mb-4" style={{ color: '#6B5B4F' }}>Báo cáo của bạn đã được lưu vào blockchain. Không ai có thể thay đổi hoặc xóa nó.</p>
                    <div className="inline-block px-6 py-3 rounded-xl mb-4" style={{ background: '#FFD43B', border: '3px solid #C9A87C', boxShadow: '2px 2px 0 #E8D5C4' }}>
                      <span className="crayon-hand text-sm" style={{ color: '#6B5B4F' }}>Mã theo dõi: </span>
                      <span className="crayon-title text-xl font-bold" style={{ color: '#2C1810' }}>BL-{Math.floor(Math.random() * 9000 + 1000)}</span>
                    </div>
                    <p className="crayon-hand text-sm" style={{ color: '#9E8E82' }}>Token ẩn danh đã được thay đổi. Không ai theo dõi được bạn.</p>
                    <button onClick={() => setDone(false)} className="crayon-btn crayon-hand text-base font-bold px-5 py-2 mt-4" style={{ background: '#74C0FC', color: 'white', borderColor: '#5AADE0' }}>
                      Gửi báo cáo khác
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Anonymous toggle */}
                    <div className="crayon-border-dashed p-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #FFD43B, #FFA94D)' }}>
                      <div className="flex items-center gap-2">
                        {anonymous ? <EyeOff size={16} style={{ color: '#2C1810' }} /> : <Eye size={16} style={{ color: '#2C1810' }} />}
                        <span className="crayon-hand text-base font-semibold" style={{ color: '#2C1810' }}>
                          {anonymous ? 'Báo cáo ẩn danh' : 'Báo cáo công khai'}
                        </span>
                      </div>
                      <button onClick={() => setAnonymous(!anonymous)}
                        className="w-12 h-6 rounded-full transition-colors relative"
                        style={{ background: anonymous ? '#69DB7C' : '#E8D5C4', border: '3px solid #C9A87C' }}>
                        <div className="w-5 h-5 rounded-full absolute top-0.5 transition-all flex items-center justify-center text-xs"
                          style={{ background: '#FFD43B', right: anonymous ? 2 : 'auto', left: anonymous ? 'auto' : 2 }}>
                          {anonymous ? '🕵️' : '😊'}
                        </div>
                      </button>
                    </div>

                    {/* Location selector */}
                    <div>
                      <label className="crayon-hand text-base font-semibold block mb-2" style={{ color: '#2C1810' }}>
                        Nơi xảy ra <span style={{ color: '#FF6B6B' }}>*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => { setLocation('school'); setType('') }}
                          className="crayon-border flex flex-col items-center gap-2 py-4 transition-all"
                          style={{ background: location === 'school' ? 'linear-gradient(135deg, rgba(105,219,124,0.1), rgba(99,230,190,0.1))' : '#FFFFFF', borderColor: location === 'school' ? '#69DB7C' : '#E8D5C4', transform: location === 'school' ? 'scale(1.02)' : 'none' }}>
                          <School size={28} style={{ color: location === 'school' ? '#69DB7C' : '#6B5B4F' }} />
                          <span className="crayon-hand text-base font-semibold" style={{ color: '#2C1810' }}>Trường học</span>
                        </button>
                        <button onClick={() => { setLocation('home'); setType('') }}
                          className="crayon-border flex flex-col items-center gap-2 py-4 transition-all"
                          style={{ background: location === 'home' ? 'linear-gradient(135deg, rgba(105,219,124,0.1), rgba(99,230,190,0.1))' : '#FFFFFF', borderColor: location === 'home' ? '#69DB7C' : '#E8D5C4', transform: location === 'home' ? 'scale(1.02)' : 'none' }}>
                          <Home size={28} style={{ color: location === 'home' ? '#69DB7C' : '#6B5B4F' }} />
                          <span className="crayon-hand text-base font-semibold" style={{ color: '#2C1810' }}>Gia đình / Nhà riêng</span>
                        </button>
                      </div>
                    </div>

                    {/* Incident type */}
                    <div>
                      <label className="crayon-hand text-base font-semibold block mb-2" style={{ color: '#2C1810' }}>
                        Loại sự cố <span style={{ color: '#FF6B6B' }}>*</span>
                      </label>
                      {location ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {incidentTypes.map(t => (
                            <button key={t} onClick={() => setType(t)}
                              className="crayon-border text-left text-sm px-3 py-3 transition-all flex flex-col items-center text-center"
                              style={{
                                background: type === t ? 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(255,169,77,0.1))' : '#FFFFFF',
                                borderColor: type === t ? '#FF6B6B' : '#E8D5C4',
                                transform: type === t ? 'scale(1.02)' : 'none',
                              }}>
                              <span className="crayon-hand font-semibold" style={{ color: '#2C1810', fontSize: 14 }}>{t}</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="crayon-hand text-base text-center py-4" style={{ color: '#9E8E82' }}>
                          Vui lòng chọn nơi xảy ra sự cố trước
                        </p>
                      )}
                    </div>

                    {/* School / Location */}
                    <div>
                      <label className="crayon-hand text-base font-semibold block mb-2" style={{ color: '#2C1810' }}>Địa điểm cụ thể (tuỳ chọn)</label>
                      <input value={school} onChange={e => setSchool(e.target.value)}
                        placeholder={location === 'home' ? 'Quận/Huyện, Thành phố' : 'VD: THPT Nguyễn Huệ'}
                        className="w-full crayon-border px-4 py-3 text-sm outline-none transition-colors"
                        style={{ background: '#FFFFFF', color: '#2C1810', borderColor: '#E8D5C4', borderRadius: 16, fontFamily: 'Inter, sans-serif' }} />
                    </div>

                    {/* Detail */}
                    <div>
                      <label className="crayon-hand text-base font-semibold block mb-2" style={{ color: '#2C1810' }}>
                        Mô tả sự việc <span style={{ color: '#FF6B6B' }}>*</span>
                      </label>
                      <textarea value={detail} onChange={e => setDetail(e.target.value)}
                        placeholder="Hãy kể cho chúng tôi nghe..."
                        rows={4}
                        className="w-full crayon-border px-4 py-3 text-sm outline-none transition-colors resize-none"
                        style={{ background: '#FFFFFF', color: '#2C1810', borderColor: '#E8D5C4', borderRadius: 16, fontFamily: 'Inter, sans-serif' }} />
                      <div className="crayon-hand text-sm text-right" style={{ color: '#9E8E82' }}>{detail.length}/2000 ký tự</div>
                    </div>

                    {/* File upload placeholder */}
                    <div>
                      <label className="crayon-hand text-base font-semibold block mb-2" style={{ color: '#2C1810' }}>Bằng chứng (tuỳ chọn)</label>
                      <div className="crayon-border-dashed p-6 text-center cursor-pointer transition-colors"
                        style={{ background: '#FFF5E6', minHeight: 120 }}>
                        <Image size={32} className="mx-auto mb-2" style={{ color: '#74C0FC' }} />
                        <p className="crayon-hand text-base" style={{ color: '#2C1810' }}>Kéo thả ảnh/video vào đây</p>
                        <p className="crayon-hand text-sm" style={{ color: '#9E8E82' }}>JPG, PNG, GIF, WebP, MP4 — Tối đa 10MB</p>
                      </div>
                    </div>

                    {/* Phone (optional) */}
                    {!anonymous && (
                      <div>
                        <label className="crayon-hand text-base font-semibold block mb-2" style={{ color: '#2C1810' }}>Số điện thoại liên hệ</label>
                        <input value={phone} onChange={e => setPhone(e.target.value)}
                          placeholder="Để chúng tôi liên hệ hỗ trợ"
                          className="w-full crayon-border px-4 py-3 text-sm outline-none transition-colors"
                          style={{ background: '#FFFFFF', color: '#2C1810', borderColor: '#E8D5C4', borderRadius: 16, fontFamily: 'Inter, sans-serif' }} />
                      </div>
                    )}

                    <button onClick={handleSubmit} disabled={loading}
                      className="w-full crayon-btn crayon-hand text-lg font-bold py-3 flex items-center justify-center gap-2"
                      style={{ background: '#FF6B6B', color: 'white', borderColor: '#E85555', opacity: loading ? 0.5 : 1 }}>
                      {loading ? (
                        <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
                      ) : (
                        <><Send size={18} /> Gửi báo cáo</>
                      )}
                    </button>

                    <p className="crayon-hand text-sm text-center" style={{ color: '#9E8E82' }}>
                      <Lock size={12} className="inline mr-1" />
                      Báo cáo được mã hoá end-to-end. Không lưu IP. Không cookie tracking.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Emergency card */}
              <div className="crayon-border p-5" style={{ background: 'linear-gradient(135deg, #FF6B6B, #F783AC)', border: '3px solid #E85555' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'white' }}>
                    <Phone size={18} style={{ color: '#FF6B6B' }} />
                  </div>
                  <div>
                    <p className="crayon-hand text-base font-bold text-white">Cần giúp đỡ ngay?</p>
                    <p className="crayon-hand text-sm text-white opacity-80">Gọi 111 — Miễn phí 24/7</p>
                  </div>
                </div>
                <a href="tel:111" className="w-full crayon-hand text-base font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 no-underline"
                  style={{ background: 'white', color: '#FF6B6B', border: '3px solid #E8D5C4' }}>
                  <Phone size={14} /> Gọi ngay 111
                </a>
              </div>

              {/* Recent reports */}
              <div className="crayon-border crayon-shadow p-5" style={{ background: '#FFFFFF' }}>
                <h3 className="crayon-hand text-base font-bold mb-3" style={{ color: '#2C1810' }}>Báo cáo gần đây</h3>
                <div className="space-y-2">
                  {REPORTS.map(r => (
                    <div key={r.id} className="p-3 rounded-xl" style={{ background: '#FFF5E6', border: '2px solid #E8D5C4' }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="crayon-hand text-sm font-bold" style={{ color: '#2C1810' }}>{r.type}</span>
                        <span className="crayon-hand text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{ background: STATUS_MAP[r.status as keyof typeof STATUS_MAP].color + '20', color: STATUS_MAP[r.status as keyof typeof STATUS_MAP].color, border: `2px solid ${STATUS_MAP[r.status as keyof typeof STATUS_MAP].color}40` }}>
                          {STATUS_MAP[r.status as keyof typeof STATUS_MAP].label}
                        </span>
                      </div>
                      <p className="crayon-hand text-xs" style={{ color: '#9E8E82' }}>
                        {r.location === 'school' ? '🏫' : '🏠'} {r.school} · {r.date}
                      </p>
                      {r.anon && <span className="crayon-hand text-xs inline-flex items-center gap-0.5 mt-1" style={{ color: '#B197FC' }}><EyeOff size={10} /> Ẩn danh</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee */}
              <div className="crayon-border p-5" style={{ background: '#FFF5E6' }}>
                <h3 className="crayon-hand text-base font-bold mb-3" style={{ color: '#2C1810' }}>Cam kết của Em An</h3>
                <div className="space-y-2.5">
                  {[
                    { icon: Lock, text: 'Mã hoá end-to-end', color: '#B197FC' },
                    { icon: EyeOff, text: 'Báo cáo ẩn danh 100%', color: '#74C0FC' },
                    { icon: Clock, text: 'Xử lý trong 24 giờ', color: '#FFA94D' },
                    { icon: Heart, text: 'Hỗ trợ tâm lý miễn phí', color: '#F783AC' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <item.icon size={14} style={{ color: item.color }} />
                      <span className="crayon-hand text-sm" style={{ color: '#6B5B4F' }}>{item.text}</span>
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
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Tổng báo cáo', value: 12847, color: '#FF6B6B' },
              { label: 'Đang xử lý', value: 234, color: '#FFA94D' },
              { label: 'Khẩn cấp', value: 18, color: '#FF6B6B' },
              { label: 'Đã giải quyết', value: 11903, color: '#69DB7C' },
            ].map(s => (
              <div key={s.label} className="crayon-border crayon-shadow p-4 text-center" style={{ background: '#FFFFFF' }}>
                <p className="crayon-hand text-sm mb-1" style={{ color: '#6B5B4F' }}>{s.label}</p>
                <p className="crayon-title" style={{ fontSize: '36px', color: s.color }}>
                  <CountUp target={s.value} />
                </p>
              </div>
            ))}
          </div>

          <div className="crayon-border crayon-shadow p-6" style={{ background: '#FFFFFF' }}>
            <h3 className="crayon-hand text-lg font-bold mb-4" style={{ color: '#2C1810' }}>Thống kê theo loại sự cố</h3>
            <div className="space-y-3">
              {[
                { type: 'Bắt nạt tinh thần', pct: 32, count: 4111, color: '#FFA94D' },
                { type: 'Đánh đập', pct: 20, count: 2569, color: '#FF6B6B' },
                { type: 'Cyberbullying', pct: 16, count: 2055, color: '#B197FC' },
                { type: 'Bạo lực gia đình', pct: 14, count: 1799, color: '#F783AC' },
                { type: 'Cô lập, tẩy chay', pct: 10, count: 1285, color: '#74C0FC' },
                { type: 'Lạm dụng tinh thần', pct: 5, count: 642, color: '#63E6BE' },
                { type: 'Bỏ mặc / Bỏ bê', pct: 3, count: 386, color: '#FFD43B' },
              ].map(item => (
                <div key={item.type} className="flex items-center gap-3">
                  <span className="crayon-hand text-sm w-40 shrink-0" style={{ color: '#6B5B4F' }}>{item.type}</span>
                  <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: '#FFF5E6', border: '2px solid #E8D5C4' }}>
                    <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                  </div>
                  <span className="crayon-hand text-sm font-bold shrink-0" style={{ color: item.color }}>{item.pct}%</span>
                  <span className="crayon-hand text-xs w-16 text-right shrink-0" style={{ color: '#9E8E82' }}>{item.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Resource Tab */}
      {activeTab === 'resource' && (
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Students card */}
            <div className="crayon-border crayon-shadow overflow-hidden" style={{ background: '#FFFFFF' }}>
              <div className="p-5 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #74C0FC, #63E6BE)', borderBottom: '3px dashed #E8D5C4' }}>
                <GraduationCap size={28} style={{ color: '#2C1810' }} />
                <h3 className="crayon-hand text-xl font-bold" style={{ color: '#2C1810' }}>Cho trẻ em & học sinh</h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="crayon-hand text-base font-bold mb-2" style={{ color: '#2C1810' }}>Nhận biết dấu hiệu bị bắt nạt</h4>
                  <p className="crayon-hand text-sm" style={{ color: '#6B5B4F' }}>
                    Bị gọi bằng nickname xấu, bị tẩy chay, bị đánh/đẩy/lừa,
                    bị đăng ảnh xấu trên mạng, bị đe doạ...
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="crayon-hand text-base font-bold mb-2" style={{ color: '#2C1810' }}>Dấu hiệu bạo lực tại nhà</h4>
                  <p className="crayon-hand text-sm" style={{ color: '#6B5B4F' }}>
                    Bị đánh, bị la mắng dữ dội, bị bỏ mặc không chăm sóc,
                    bị sợ hãi người thân, thương tích trên người...
                  </p>
                </div>
                <div>
                  <h4 className="crayon-hand text-base font-bold mb-2" style={{ color: '#2C1810' }}>Bạn có thể làm gì?</h4>
                  <ul className="space-y-1.5">
                    {['Nói với người lớn tin cậy', 'Ghi lại sự việc', 'Gọi 111 — Tổng đài bảo vệ trẻ em', 'Báo cáo ẩn danh trên nền tảng này'].map((t, i) => (
                      <li key={i} className="crayon-hand text-sm flex items-start gap-2" style={{ color: '#6B5B4F' }}>
                        <span>✏️</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <blockquote className="mt-4 p-4 rounded-xl" style={{ background: '#FFD43B', borderLeft: '4px solid #FFA94D', borderRadius: '0 16px 16px 0' }}>
                  <p className="crayon-hand text-base italic" style={{ color: '#2C1810' }}>
                    &ldquo;Điều xảy ra với bạn không phải lỗi của bạn. Bạn xứng đáng được giúp đỡ.&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>

            {/* Parents card */}
            <div className="crayon-border crayon-shadow overflow-hidden" style={{ background: '#FFFFFF' }}>
              <div className="p-5 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #B197FC, #F783AC)', borderBottom: '3px dashed #E8D5C4' }}>
                <Users size={28} style={{ color: '#2C1810' }} />
                <h3 className="crayon-hand text-xl font-bold" style={{ color: '#2C1810' }}>Cho phụ huynh</h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="crayon-hand text-base font-bold mb-2" style={{ color: '#2C1810' }}>Dấu hiệu con bạn bị bắt nạt</h4>
                  <ul className="space-y-1.5">
                    {['Sợ đi học, viện cớ ốm', 'Thay đổi tâm tính', 'Giấc ngủ rối loạn', 'Thương tích không giải thích được'].map((t, i) => (
                      <li key={i} className="crayon-hand text-sm flex items-start gap-2" style={{ color: '#6B5B4F' }}>
                        <span>✏️</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h4 className="crayon-hand text-base font-bold mb-2" style={{ color: '#2C1810' }}>Cách nói chuyện với con</h4>
                  <ul className="space-y-1.5">
                    {['Nghe không phán xét', 'Đừng đổ lỗi', 'Đảm bảo con an toàn', 'Liên hệ nhà trường và chuyên gia'].map((t, i) => (
                      <li key={i} className="crayon-hand text-sm flex items-start gap-2" style={{ color: '#6B5B4F' }}>
                        <span>✏️</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <a href="tel:111" className="crayon-border p-3 text-center rounded-xl no-underline" style={{ background: '#FF6B6B', border: '3px solid #E85555' }}>
                    <Phone size={18} className="mx-auto mb-1 text-white" />
                    <p className="crayon-hand text-lg font-bold text-white">111</p>
                    <p className="crayon-hand text-xs text-white opacity-80">Bảo vệ trẻ em</p>
                  </a>
                  <a href="tel:18001567" className="crayon-border p-3 text-center rounded-xl no-underline" style={{ background: '#FFF5E6', border: '3px solid #E8D5C4' }}>
                    <Phone size={18} className="mx-auto mb-1" style={{ color: '#6B5B4F' }} />
                    <p className="crayon-hand text-lg font-bold" style={{ color: '#2C1810' }}>1800 1567</p>
                    <p className="crayon-hand text-xs" style={{ color: '#9E8E82' }}>Tư vấn tâm lý</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stories */}
          <h3 className="crayon-hand text-lg font-bold mb-4" style={{ color: '#2C1810' }}>Câu chuyện thật từ học sinh</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STORIES.map((s, i) => (
              <div key={i} className="crayon-border crayon-shadow p-5" style={{ background: '#FFFFFF' }}>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: s.rating }).map((_, j) => (
                    <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="crayon-hand text-sm leading-relaxed mb-4 italic" style={{ color: '#6B5B4F' }}>&ldquo;{s.story}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: '#B197FC', border: '3px solid #9775D0' }}>
                    {s.name[0]}
                  </div>
                  <div>
                    <p className="crayon-hand text-sm font-semibold" style={{ color: '#2C1810' }}>{s.name}, {s.age} tuổi</p>
                    <p className="crayon-hand text-xs" style={{ color: '#9E8E82' }}>{s.school}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12" style={{ background: '#FFFFFF', borderTop: '3px solid #E8D5C4' }}>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FF6B6B', border: '3px solid #E85555' }}>
                  <ShieldAlert size={16} className="text-white" />
                </div>
                <span className="crayon-title text-lg" style={{ color: '#2C1810' }}>Em An</span>
              </div>
              <p className="crayon-hand text-sm" style={{ color: '#6B5B4F' }}>
                Nền tảng báo cáo bạo lực học đường và bạo lực gia đình. Ẩn danh. Bảo mật. Miễn phí.
              </p>
            </div>
            <div>
              <h4 className="crayon-hand text-base font-bold mb-3" style={{ color: '#FF6B6B' }}>Hotline</h4>
              <a href="tel:111" className="crayon-hand text-sm block mb-1 no-underline" style={{ color: '#6B5B4F' }}>
                <Phone size={12} className="inline mr-1" /> <strong>111</strong> — Tổng đài bảo vệ trẻ em
              </a>
              <a href="tel:18001567" className="crayon-hand text-sm block mb-1 no-underline" style={{ color: '#6B5B4F' }}>
                <Phone size={12} className="inline mr-1" /> <strong>1800 1567</strong> — Tư vấn tâm lý
              </a>
              <a href="tel:113" className="crayon-hand text-sm block no-underline" style={{ color: '#6B5B4F' }}>
                <Phone size={12} className="inline mr-1" /> <strong>113</strong> — Công an
              </a>
            </div>
            <div>
              <h4 className="crayon-hand text-base font-bold mb-3" style={{ color: '#FF6B6B' }}>Đối tác</h4>
              <div className="space-y-1.5">
                {['Bộ GD&ĐT', 'UNICEF Việt Nam', 'Quỹ Nhi Đồng LHQ', 'Tổ chức ChildFund'].map((t, i) => (
                  <p key={i} className="crayon-hand text-sm" style={{ color: '#6B5B4F' }}>{t}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 text-center" style={{ borderTop: '2px dashed #E8D5C4' }}>
            <p className="crayon-hand text-sm" style={{ color: '#9E8E82' }}>&copy; 2026 Em An. Bảo vệ mọi trẻ em Việt Nam.</p>
            <p className="crayon-hand text-xs mt-1" style={{ color: '#9E8E82' }}>Không cookie tracking · Không lưu IP · Không analytics ẩn</p>
          </div>
        </div>
      </div>

      {/* Inline keyframes */}
      <style jsx global>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(0.8); } }
      `}</style>
    </div>
  )
}
