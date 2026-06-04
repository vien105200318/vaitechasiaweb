'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Xử lý kết quả redirect sau khi quay lại từ Google
  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result?.user) router.push('/dashboard')
      } catch {
        // không có redirect result, bình thường
      }
    }
    checkRedirect()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đăng nhập thất bại'
      setError(msg.includes('invalid-credential') ? 'Email hoặc mật khẩu không đúng.' : msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      router.push('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ''
      // Popup bị block → fallback sang redirect
      if (msg.includes('popup-blocked') || msg.includes('popup-closed') || msg.includes('cancelled-popup-request')) {
        await signInWithRedirect(auth, provider)
        // trang sẽ redirect, không cần setLoading(false)
        return
      }
      setError('Đăng nhập Google thất bại. Vui lòng thử lại.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="hero-gradient absolute inset-0" />
      </div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c2c6db]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#c2c6db]/5 blur-[100px] rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex justify-center mb-6">
            <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">
              <Image src="/logo.svg" alt="Vaitech" width={72} height={40} />
            </div>
          </Link>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-2">
            Chào mừng trở lại
          </h1>
          <p className="text-[#c7c6cd] text-sm">
            Đăng nhập để tiếp tục hành trình của bạn
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8">
          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[#e0e3e5] py-3 rounded-lg font-semibold text-sm transition-all duration-300 mb-6 disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            Tiếp tục với Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-[#909097] font-semibold">HOẶC</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-[#c7c6cd] font-semibold mb-2 tracking-wider uppercase">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ban@example.com"
                required
                className="w-full bg-[#1d2022] border border-[#46464c] rounded-lg px-4 py-3 text-sm text-[#e0e3e5] placeholder:text-[#909097] focus:border-[#c2c6db] focus:ring-1 focus:ring-[#c2c6db] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-[#c7c6cd] font-semibold mb-2 tracking-wider uppercase">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#1d2022] border border-[#46464c] rounded-lg px-4 py-3 text-sm text-[#e0e3e5] placeholder:text-[#909097] focus:border-[#c2c6db] focus:ring-1 focus:ring-[#c2c6db] outline-none transition-all"
              />
            </div>

            {error && (
              <div className="bg-[#93000a]/20 border border-[#ffb4ab]/30 rounded-lg px-4 py-3">
                <p className="text-[#ffb4ab] text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c2c6db] text-[#2b3040] py-3 rounded-lg font-bold text-sm hover:bg-transparent hover:text-[#c2c6db] border border-[#c2c6db] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Đang đăng nhập...
                </span>
              ) : 'Đăng nhập'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[#c7c6cd] mt-6">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-[#c2c6db] font-bold hover:underline">
            Đăng ký miễn phí
          </Link>
        </p>
      </div>
    </div>
  )
}
