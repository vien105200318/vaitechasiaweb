'use client'
import { CheckCircle2, Globe, Mail, MapPin, Phone, Share2 } from 'lucide-react'

import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageComponents'

const contactMethods = [
  { Icon: Mail, title: 'Email', value: 'vaistudio.world@gmail.com', desc: 'Phản hồi trong vòng 24 giờ' },
  { Icon: Phone, title: 'Điện thoại', value: '0796 716 811', desc: 'Thứ 2–7, 8:00–18:00' },
  { Icon: MapPin, title: 'Địa chỉ', value: '29 Bùi Xuân Phái, Thuận Phước, Đà Nẵng', desc: 'Ghé thăm văn phòng chúng tôi' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '', service: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <>
      <PageHeader
        badge="LIÊN HỆ"
        title="Hãy cùng nhau"
        accent="bắt đầu"
        desc="Cho chúng tôi biết về dự án của bạn. Đội ngũ tư vấn sẽ phản hồi trong vòng 24 giờ."
      />

      <section className="pb-20 px-6 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {contactMethods.map((m) => (
              <div key={m.title} className="glass-card rounded-xl p-6 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0a0f1e] flex items-center justify-center flex-shrink-0">
                  <m.Icon size={16} />
                </div>
                <div>
                  <p className="text-xs text-[#909097] uppercase tracking-wider font-semibold mb-1">{m.title}</p>
                  <p className="text-[#e0e3e5] font-semibold text-sm">{m.value}</p>
                  <p className="text-xs text-[#c7c6cd]">{m.desc}</p>
                </div>
              </div>
            ))}

            <div className="glass-card rounded-xl p-6">
              <p className="text-xs text-[#909097] uppercase tracking-wider font-semibold mb-4">Theo dõi chúng tôi</p>
              <div className="flex gap-3">
                {[Globe, Share2, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg bg-[#1d2022] border border-white/5 flex items-center justify-center text-[#c7c6cd] hover:text-[#c2c6db] hover:border-[#c2c6db]/30 transition-all">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 rounded-2xl bg-[#c2c6db]/10 flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} className="text-[#c2c6db]" />
                </div>
                <h3 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-3">Đã gửi thành công!</h3>
                <p className="text-[#c7c6cd]">Chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: 'Họ và tên *', key: 'name', placeholder: 'Nguyễn Văn A', type: 'text' },
                    { label: 'Email *', key: 'email', placeholder: 'ban@cty.com', type: 'email' },
                    { label: 'Số điện thoại', key: 'phone', placeholder: '0912 345 678', type: 'tel' },
                    { label: 'Công ty', key: 'company', placeholder: 'Tên doanh nghiệp', type: 'text' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs text-[#c7c6cd] font-semibold mb-2 uppercase tracking-wider">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.label.includes('*')}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full bg-[#1d2022] border border-[#46464c] rounded-lg px-4 py-3 text-sm text-[#e0e3e5] placeholder:text-[#909097] focus:border-[#c2c6db] focus:ring-1 focus:ring-[#c2c6db] outline-none transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs text-[#c7c6cd] font-semibold mb-2 uppercase tracking-wider">Dịch vụ quan tâm</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-[#1d2022] border border-[#46464c] rounded-lg px-4 py-3 text-sm text-[#e0e3e5] focus:border-[#c2c6db] outline-none transition-all"
                  >
                    <option value="">Chọn dịch vụ...</option>
                    <option>Thiết kế website</option>
                    <option>Ứng dụng di động</option>
                    <option>Tư vấn chuyển đổi số</option>
                    <option>Phát triển phần mềm</option>
                    <option>Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#c7c6cd] font-semibold mb-2 uppercase tracking-wider">Mô tả dự án *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Hãy mô tả ngắn gọn về dự án, mục tiêu và timeline dự kiến..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#1d2022] border border-[#46464c] rounded-lg px-4 py-3 text-sm text-[#e0e3e5] placeholder:text-[#909097] focus:border-[#c2c6db] focus:ring-1 focus:ring-[#c2c6db] outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#c2c6db] text-[#2b3040] py-3.5 rounded-lg font-bold text-sm hover:bg-transparent hover:text-[#c2c6db] border border-[#c2c6db] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Đang gửi...</>
                  ) : 'Gửi yêu cầu tư vấn'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
