'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Globe, Share2, Mail } from 'lucide-react'
import { getUrl } from '@/lib/subdomains'
import { useI18n } from '@/context/I18nContext'
import { useTheme } from '@/context/ThemeContext'

const socialLinks = [
  { Icon: Globe, label: 'Website', href: '#' },
  { Icon: Share2, label: 'Social', href: '#' },
  { Icon: Mail, label: 'Email', href: '#' },
]

export default function Footer() {
  const { t, lang } = useI18n()
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError(lang === 'vi' ? 'Email không hợp lệ' : 'Invalid email')
      return
    }
    setError('')
    setSubscribed(true)
    setEmail('')
  }

  const platformLinks = [
    { label: 'Features', href: getUrl('features') },
    { label: 'Templates', href: '/templates' },
    { label: 'Pricing', href: getUrl('pricing') },
    { label: 'Integrations', href: getUrl('integrations') },
  ]

  const companyLinks = [
    { label: 'About Us', href: getUrl('about') },
    { label: 'Careers', href: getUrl('careers') },
    { label: 'Press', href: getUrl('press') },
    { label: 'Contact', href: getUrl('contact') },
  ]

  const resourceLinks = [
    { label: 'Documentation', href: getUrl('docs') },
    { label: 'Help Center', href: getUrl('help') },
    { label: 'Community', href: getUrl('community') },
    { label: 'Blog', href: getUrl('blog') },
  ]

  return (
    <footer className="w-full py-[100px] border-t" role="contentinfo" style={{ borderColor: 'var(--border-subtle)', background: 'var(--background)' }}>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-5 md:px-16 max-w-[1280px] mx-auto">
        <div className="col-span-2">
          <Link href="/" className="mb-6 inline-block" aria-label="Vaitech">
            <div className="px-3 py-1.5 rounded-lg" style={{ background: '#101415' }}>
              <Image src="/logo.svg" alt="Vaitech" width={72} height={40} />
            </div>
          </Link>
          <p className="text-sm max-w-xs mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('footer.desc')}</p>
          <div className="flex gap-3">
            {socialLinks.map(({ Icon, label, href }) => (
              <a key={label} href={href} aria-label={label}
                className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg transition-all duration-300 border"
                style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-secondary)' }}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label={t('footer.platform')}>
          <span className="font-bold text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--text-primary)' }}>{t('footer.platform')}</span>
          <ul className="flex flex-col gap-3">
            {platformLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="transition-colors text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t('footer.company')}>
          <span className="font-bold text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--text-primary)' }}>{t('footer.company')}</span>
          <ul className="flex flex-col gap-3">
            {companyLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="transition-colors text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t('footer.resources')}>
          <span className="font-bold text-xs tracking-widest uppercase mb-4 block" style={{ color: 'var(--text-primary)' }}>{t('footer.resources')}</span>
          <ul className="flex flex-col gap-3">
            {resourceLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="transition-colors text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 lg:col-span-1 mt-8 lg:mt-0">
          <span className="font-bold text-xs tracking-widest uppercase mb-6 block" style={{ color: 'var(--text-primary)' }}>{t('footer.subscribe')}</span>
          {subscribed ? (
            <p className="text-sm" style={{ color: '#22c55e' }}>{t('footer.subscribed')}</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2" noValidate>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder={t('footer.subscribePlaceholder')}
                className="flex-1 min-w-0 px-4 py-2.5 rounded-lg text-sm outline-none border transition-colors"
                style={{ background: 'var(--card-bg)', borderColor: error ? '#ef4444' : 'var(--card-border)', color: 'var(--text-primary)' }}
                aria-label={t('footer.subscribePlaceholder')}
              />
              <button type="submit" className="px-4 py-2.5 rounded-lg text-sm font-bold transition-all active:scale-95 whitespace-nowrap border"
                style={{ borderColor: 'var(--card-border)', color: 'var(--accent)', background: 'var(--card-bg)' }}>
                {t('footer.subscribeBtn')}
              </button>
            </form>
          )}
          {error && <p className="text-xs mt-1.5" style={{ color: '#ef4444' }}>{error}</p>}
        </div>
      </div>

      <div className="mt-20 px-5 md:px-16 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t pt-8" style={{ borderColor: 'var(--border-subtle)' }}>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('footer.copyright')}</p>
        <div className="flex gap-8 text-xs" style={{ color: 'var(--muted)' }}>
          <Link href="#" className="transition-colors">Privacy</Link>
          <Link href="#" className="transition-colors">Terms</Link>
          <Link href="#" className="transition-colors">Cookie Policy</Link>
        </div>
        <div className="flex gap-6">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--muted)' }}>VIETNAM</span>
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--muted)' }}>GLOBAL</span>
        </div>
      </div>
    </footer>
  )
}
