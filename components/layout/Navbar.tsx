'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const navLinks = [
  { href: '/', label: 'Solutions', key: '/' },
  { href: '/templates', label: 'Templates', key: '/templates' },
  { href: '/pricing', label: 'Pricing', key: '/pricing' },
  { href: '/contact', label: 'Resources', key: '/contact' },
]

export default function Navbar() {
  const { user, profile, logout } = useAuth()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeKey, setActiveKey] = useState(pathname)

  // Sync activeKey khi đổi route (back/forward, direct navigation)
  useEffect(() => {
    const matched = navLinks.find(l => l.key === pathname)
    if (matched) setActiveKey(matched.key)
    else if (pathname === '/') setActiveKey('/')
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (key: string) => {
    setActiveKey(key)
    setMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b border-white/10 transition-all duration-500 ${
        scrolled
          ? 'bg-[#101415]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)]'
          : 'bg-[#101415]/5 backdrop-blur-xl'
      }`}
    >
      <div className="flex justify-between items-center h-20 px-6 md:px-16 max-w-[1280px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => handleClick('/')}>
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
            <Image src="/logo.svg" alt="Vaitech" width={72} height={40} priority sizes="72px" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(({ href, label, key }) => (
            <Link
              key={key}
              href={href}
              onClick={() => handleClick(key)}
              className={`text-sm transition-all duration-300 pb-1 border-b-2 ${
                activeKey === key
                  ? 'text-[#c2c6db] font-semibold border-[#c2c6db]'
                  : 'text-[#c7c6cd] hover:text-[#c2c6db] border-transparent'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-[#c7c6cd] hover:text-[#c2c6db] text-sm transition-all duration-300 flex items-center gap-2"
              >
                {user.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full object-cover" />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-[#c2c6db]/20 flex items-center justify-center text-xs font-bold text-[#c2c6db]">
                    {(profile?.displayName || user.displayName || user.email || 'U')[0].toUpperCase()}
                  </span>
                )}
                {profile?.displayName || user.displayName || user.email?.split('@')[0]}
              </Link>
              <button
                onClick={logout}
                className="border border-[#46464c] text-[#c7c6cd] hover:border-[#c2c6db] hover:text-[#c2c6db] px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 active:scale-95"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[#c7c6cd] hover:text-[#c2c6db] text-sm font-semibold transition-all duration-300"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="bg-[#c2c6db] text-[#2b3040] px-6 py-2 rounded-lg text-sm font-bold hover:bg-transparent hover:text-[#c2c6db] border border-[#c2c6db] transition-all duration-300 active:scale-95"
              >
                Bắt đầu
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-[#e0e3e5] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#e0e3e5] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#e0e3e5] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden border-t border-white/10 bg-[#101415]/95 backdrop-blur-xl overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map(({ href, label, key }) => (
            <Link
              key={key}
              href={href}
              onClick={() => handleClick(key)}
              className={`py-3 border-b border-white/5 text-sm transition-colors ${
                activeKey === key ? 'text-[#c2c6db] font-semibold' : 'text-[#c7c6cd]'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-3 pt-4">
            {user ? (
              <button
                onClick={() => { logout(); setMenuOpen(false) }}
                className="flex-1 border border-[#46464c] text-[#c7c6cd] px-4 py-2.5 rounded-lg text-sm font-semibold"
              >
                Đăng xuất
              </button>
            ) : (
              <>
                <Link href="/login" className="flex-1 text-center border border-[#46464c] text-[#c7c6cd] px-4 py-2.5 rounded-lg text-sm font-semibold" onClick={() => setMenuOpen(false)}>
                  Đăng nhập
                </Link>
                <Link href="/register" className="flex-1 text-center bg-[#c2c6db] text-[#2b3040] px-4 py-2.5 rounded-lg text-sm font-bold" onClick={() => setMenuOpen(false)}>
                  Bắt đầu
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
