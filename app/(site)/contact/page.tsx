'use client'
import { CheckCircle2, Globe, Mail, MapPin, Phone, Share2 } from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '@/context/I18nContext'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function ContactPage() {
  const { t } = useI18n()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '', service: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const contactMethods = [
    { Icon: Mail, title: t('contact.email'), value: 'vaistudio.world@gmail.com', desc: t('contact.emailDesc') },
    { Icon: Phone, title: t('contact.phone'), value: '0796 716 811', desc: t('contact.phoneDesc') },
    { Icon: MapPin, title: t('contact.address'), value: '29 Bùi Xuân Phái, Thuận Phước, Đà Nẵng', desc: t('contact.addressDesc') },
  ]

  const serviceOptions = [
    { value: '', label: t('contact.service') },
    { value: 'web-design', label: t('contact.webDesign') },
    { value: 'mobile-app', label: t('contact.mobileApp') },
    { value: 'digital-consulting', label: t('contact.consulting') },
    { value: 'software-dev', label: t('contact.software') },
    { value: 'other', label: t('contact.other') },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-5 md:px-16 max-w-[1280px] mx-auto text-center">
        <span className="text-xs font-semibold mb-4 block tracking-widest uppercase" style={{ color: 'var(--accent)' }}>{t('contact.badge')}</span>
        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          {t('contact.title1')}{' '}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, var(--accent), #7c3aed)' }}>{t('contact.title2')}</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>{t('contact.desc')}</p>
      </section>

      <section className="pb-20 px-5 md:px-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <ScrollReveal className="space-y-4">
            {contactMethods.map(m => (
              <div key={m.title} className="glass-card rounded-xl p-6 flex gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--surface-1)', color: 'var(--accent)' }}>
                  <m.Icon size={16} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--muted)' }}>{m.title}</p>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{m.value}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{m.desc}</p>
                </div>
              </div>
            ))}

            <div className="glass-card rounded-xl p-6">
              <p className="text-xs uppercase tracking-wider font-semibold mb-4" style={{ color: 'var(--muted)' }}>{t('contact.follow')}</p>
              <div className="flex gap-3">
                {[
                  { Icon: Globe, label: 'Website', href: '#' },
                  { Icon: Share2, label: 'Social', href: '#' },
                  { Icon: Mail, label: 'Email', href: '#' },
                ].map(s => (
                  <a key={s.label} href={s.href} aria-label={s.label}
                    className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg transition-all border"
                    style={{ background: 'var(--surface-1)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                    <s.Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={100} className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-8">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'var(--surface-1)' }}>
                    <CheckCircle2 size={32} style={{ color: 'var(--accent)' }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{t('contact.successTitle')}</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>{t('contact.successDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('contact.nameLabel')}</label>
                      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nguyễn Văn A" required autoComplete="name"
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all border focus:ring-1"
                        style={{ background: 'var(--surface-1)', borderColor: 'var(--card-border)', color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('contact.emailLabel')}</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="ban@cty.com" required autoComplete="email"
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all border focus:ring-1"
                        style={{ background: 'var(--surface-1)', borderColor: 'var(--card-border)', color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('contact.phoneLabel')}</label>
                      <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="0912 345 678" autoComplete="tel"
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all border focus:ring-1"
                        style={{ background: 'var(--surface-1)', borderColor: 'var(--card-border)', color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('contact.companyLabel')}</label>
                      <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder={t('contact.companyPlaceholder')} autoComplete="organization"
                        className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all border focus:ring-1"
                        style={{ background: 'var(--surface-1)', borderColor: 'var(--card-border)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('contact.serviceLabel')}</label>
                    <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all border appearance-none"
                      style={{ background: 'var(--surface-1)', borderColor: 'var(--card-border)', color: 'var(--text-primary)' }}>
                      {serviceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('contact.projectLabel')}</label>
                    <textarea rows={5} required placeholder={t('contact.projectPlaceholder')} value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all border focus:ring-1 resize-none"
                      style={{ background: 'var(--surface-1)', borderColor: 'var(--card-border)', color: 'var(--text-primary)' }} />
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-50"
                    style={{ background: 'var(--accent)', color: 'var(--accent-dim)' }}>
                    {loading ? t('common.loading') : t('contact.submit')}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
