'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Mật khẩu xác nhận không khớp.')
      return
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.')
      return
    }
    setLoading(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName: name })
      router.push('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đăng ký thất bại'
      setError(msg.includes('email-already-in-use') ? 'Email này đã được sử dụng.' : msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đăng nhập Google thất bại'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10 relative">
      <div className="absolute inset-0 z-0">
        <div className="hero-gradient absolute inset-0" />
      </div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#c2c6db]/5 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex justify-center mb-6">
            <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">
              <Image src="/logo.svg" alt="Vaitech" width={72} height={40} />
            </div>
          </Link>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-2">
            Tạo tài khoản
          </h1>
          <p className="text-[#c7c6cd] text-sm">
            Bắt đầu hành trình kiến tạo số cùng Vaitech
          </p>
        </div>

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

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs text-[#c7c6cd] font-semibold mb-2 tracking-wider uppercase">Họ và tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                required
                className="w-full bg-[#1d2022] border border-[#46464c] rounded-lg px-4 py-3 text-sm text-[#e0e3e5] placeholder:text-[#909097] focus:border-[#c2c6db] focus:ring-1 focus:ring-[#c2c6db] outline-none transition-all"
              />
            </div>
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
                placeholder="Tối thiểu 6 ký tự"
                required
                className="w-full bg-[#1d2022] border border-[#46464c] rounded-lg px-4 py-3 text-sm text-[#e0e3e5] placeholder:text-[#909097] focus:border-[#c2c6db] focus:ring-1 focus:ring-[#c2c6db] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-[#c7c6cd] font-semibold mb-2 tracking-wider uppercase">Xác nhận mật khẩu</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
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
                  Đang tạo tài khoản...
                </span>
              ) : 'Tạo tài khoản'}
            </button>
          </form>

          <p className="text-center text-xs text-[#909097] mt-4">
            Bằng cách đăng ký, bạn đồng ý với{' '}
            <Link href="#" className="text-[#c2c6db] hover:underline">Điều khoản dịch vụ</Link>
            {' '}và{' '}
            <Link href="#" className="text-[#c2c6db] hover:underline">Chính sách bảo mật</Link>
          </p>
        </div>

        <p className="text-center text-sm text-[#c7c6cd] mt-6">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-[#c2c6db] font-bold hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}
