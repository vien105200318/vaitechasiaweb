'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useI18n } from '@/context/I18nContext'
import { useTheme } from '@/context/ThemeContext'
import Avatar from '@/components/ui/Avatar'
import { Globe, Sun, Moon, Menu, X } from 'lucide-react'

export default function Navbar() {
  const { user, profile, logout } = useAuth()
  const { lang, setLang, t } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeKey, setActiveKey] = useState(pathname)
  const lastScrollY = useRef(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const navLinks = [
    { href: '/', label: t('nav.solutions'), key: '/' },
    { href: '/templates', label: t('nav.templates'), key: '/templates' },
    { href: '/pricing', label: t('nav.pricing'), key: '/pricing' },
    { href: '/blog', label: t('nav.blog'), key: '/blog' },
    { href: '/contact', label: t('nav.contact'), key: '/contact' },
  ]

  useEffect(() => {
    const matched = navLinks.find((l) => l.key === pathname)
    if (matched) setActiveKey(matched.key)
    else if (pathname === '/') setActiveKey('/')
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        buttonRef.current?.focus()
      }
    },
    [menuOpen],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const handleClick = (key: string) => { setActiveKey(key); setMenuOpen(false) }

  const displayName = profile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'U'

  return (
    <nav
      role="navigation"
      aria-label={lang === 'vi' ? 'Điều hướng chính' : 'Main navigation'}
      className="fixed top-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
        backdropFilter: 'blur(20px)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div className="flex justify-between items-center h-16 md:h-20 px-5 md:px-16 max-w-[1280px] mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg"
          onClick={() => handleClick('/')}
          aria-label="Vaitech"
        >
          <div className="px-3 py-1.5 rounded-lg" style={{ background: '#101415' }}>
            <Image src="/logo.svg" alt="Vaitech" width={72} height={40} priority sizes="72px" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center" role="menubar">
          {navLinks.map(({ href, label, key }) => (
            <Link
              key={key}
              href={href}
              role="menuitem"
              onClick={() => handleClick(key)}
              aria-current={activeKey === key ? 'page' : undefined}
              className="text-sm transition-all duration-300 pb-1 border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
              style={{
                color: activeKey === key ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: activeKey === key ? 600 : 400,
                borderColor: activeKey === key ? 'var(--accent)' : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 border"
            style={{ color: 'var(--text-secondary)', borderColor: 'var(--card-border)', background: 'var(--card-bg)' }}
            aria-label={lang === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
          >
            <Globe size={13} />
            {lang === 'vi' ? 'EN' : 'VI'}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 border"
            style={{ color: 'var(--text-secondary)', borderColor: 'var(--card-border)', background: 'var(--card-bg)' }}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Chuyển sang chế độ tối'}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <div className="w-px h-5 mx-1" style={{ background: 'var(--border-subtle)' }} />

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Avatar src={user.photoURL} name={displayName} size="sm" />
                <span className="max-w-[120px] truncate text-sm">{displayName}</span>
              </Link>
              <button
                onClick={logout}
                className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 active:scale-95 border"
                style={{ color: 'var(--text-secondary)', borderColor: 'var(--card-border)' }}
              >
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('nav.login')}
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 active:scale-95"
                style={{ background: 'var(--accent)', color: 'var(--accent-dim)' }}
              >
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu + theme */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-lg" style={{ color: 'var(--text-secondary)' }}>
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')} className="text-[10px] font-bold px-2 py-1 rounded" style={{ color: 'var(--accent)' }}>
            {lang === 'vi' ? 'EN' : 'VI'}
          </button>
          <button
            ref={buttonRef}
            className="flex flex-col gap-1.5 p-3 min-w-[44px] min-h-[44px] items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} style={{ color: 'var(--text-primary)' }} /> : <Menu size={20} style={{ color: 'var(--text-primary)' }} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ borderTop: menuOpen ? '1px solid var(--nav-border)' : 'none', backgroundColor: 'var(--nav-bg)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {navLinks.map(({ href, label, key }) => (
            <Link
              key={key}
              href={href}
              role="menuitem"
              onClick={() => handleClick(key)}
              className="py-3.5 min-h-[44px] flex items-center text-sm transition-colors"
              style={{
                color: activeKey === key ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: activeKey === key ? 600 : 400,
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-3 pt-4">
            {user ? (
              <button onClick={() => { logout(); setMenuOpen(false) }}
                className="flex-1 border text-sm font-semibold py-3 min-h-[44px] rounded-lg active:scale-[0.97] transition-all"
                style={{ color: 'var(--text-secondary)', borderColor: 'var(--card-border)' }}>
                {t('nav.logout')}
              </button>
            ) : (
              <>
                <Link href="/login" className="flex-1 text-center border text-sm font-semibold py-3 min-h-[44px] flex items-center justify-center rounded-lg active:scale-[0.97] transition-all"
                  style={{ color: 'var(--text-secondary)', borderColor: 'var(--card-border)' }} onClick={() => setMenuOpen(false)}>
                  {t('nav.login')}
                </Link>
                <Link href="/register" className="flex-1 text-center text-sm font-bold py-3 min-h-[44px] flex items-center justify-center rounded-lg active:scale-[0.97] transition-all"
                  style={{ background: 'var(--accent)', color: 'var(--accent-dim)' }} onClick={() => setMenuOpen(false)}>
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
