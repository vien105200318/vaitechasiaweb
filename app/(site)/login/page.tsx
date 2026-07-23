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
import { Button } from '@/components/ui'
import Input from '@/components/ui/Input'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      if (msg.includes('popup-blocked') || msg.includes('popup-closed') || msg.includes('cancelled-popup-request')) {
        await signInWithRedirect(auth, provider)
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
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c2c6db]/5 blur-[120px] rounded-full" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#c2c6db]/5 blur-[100px] rounded-full" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex justify-center mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2c6db] rounded-lg">
            <div className="px-3 py-1.5 rounded-lg" style={{ background: '#101415' }}>
              <Image src="/logo.svg" alt="Vaitech" width={72} height={40} />
            </div>
          </Link>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-montserrat)] mb-2" style={{ color: 'var(--text-primary)' }}>
            Chào mừng trở lại
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Đăng nhập để tiếp tục hành trình của bạn
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8">
          {/* Google */}
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={handleGoogle}
            disabled={loading}
            icon={
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
              </svg>
            }
          >
            Tiếp tục với Google
          </Button>

          <div className="flex items-center gap-4 my-6" role="separator">
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
            <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>HOẶC</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ban@example.com"
              required
              autoComplete="email"
            />
            <Input
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />

            {error && (
              <div className="bg-[#93000a]/20 border border-[#ffb4ab]/30 rounded-lg px-4 py-3" role="alert">
                <p className="text-[#ffb4ab] text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              loading={loading}
              className="mt-2"
            >
              Đăng nhập
            </Button>
          </form>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: 'var(--text-secondary)' }}>
          Chưa có tài khoản?{' '}
          <Link href="/register" className="font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded" style={{ color: 'var(--accent)' }}>
            Đăng ký miễn phí
          </Link>
        </p>
      </div>
    </div>
  )
}
