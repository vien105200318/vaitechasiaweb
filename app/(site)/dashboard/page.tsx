'use client'

import { useEffect } from 'react'
import { ArrowRight, Award, Bookmark, Brain, FolderOpen, Globe, Headphones, LayoutGrid, LogIn, LogOut, PlusCircle, Receipt, Settings, Store } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

const quickActions = [
  { Icon: PlusCircle, label: 'Tạo dự án mới', href: '/templates' },
  { Icon: LayoutGrid, label: 'Xem mẫu website', href: '/templates' },
  { Icon: Headphones, label: 'Liên hệ hỗ trợ', href: '/contact' },
  { Icon: Settings, label: 'Cài đặt tài khoản', href: '#' },
]

const planLabel: Record<string, string> = {
  free: 'Miễn phí',
  standard: 'Standard',
  lite: 'Lite',
  pro: 'Pro',
  ultra: 'Ultra',
}

const planColor: Record<string, string> = {
  free: 'text-[#909097]',
  standard: 'text-blue-400',
  lite: 'text-[#c2c6db]',
  pro: 'text-amber-400',
  ultra: 'text-purple-400',
}

export default function DashboardPage() {
  const { user, profile, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-[#c2c6db]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          <p className="text-[#c7c6cd] text-sm">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const displayName = profile?.displayName || user.displayName || user.email?.split('@')[0] || 'Người dùng'
  const initials = displayName.slice(0, 2).toUpperCase()
  const plan = profile?.plan ?? 'free'
  const provider = profile?.provider === 'google.com' ? 'Google' : 'Email & Mật khẩu'

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-16 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#c2c6db]/10 border border-[#c2c6db]/20 flex items-center justify-center text-xl font-bold text-[#c2c6db] font-[family-name:var(--font-montserrat)] overflow-hidden">
            {user.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoURL} alt={displayName} className="w-full h-full object-cover" />
            ) : initials}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs tracking-widest uppercase text-[#c7c6cd] font-semibold">CHÀO MỪNG TRỞ LẠI</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/5 ${planColor[plan]}`}>
                {planLabel[plan]}
              </span>
            </div>
            <h1 className="text-3xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5]">
              {displayName}
            </h1>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 border border-[#46464c] text-[#c7c6cd] hover:border-[#c2c6db] hover:text-[#c2c6db] px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
        >
          <LogOut size={16} />
          Đăng xuất
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Dự án đang hoạt động', value: '0', Icon: FolderOpen },
          { label: 'Mẫu đã lưu', value: '0', Icon: Bookmark },
          { label: 'Gói dịch vụ', value: planLabel[plan], Icon: Award },
          { label: 'Đăng nhập qua', value: provider, Icon: LogIn },
        ].map((s) => (
          <div key={s.label} className="glass-card p-6 rounded-xl">
            <s.Icon size={16} />
            <div className="text-xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-1 truncate">{s.value}</div>
            <div className="text-xs text-[#c7c6cd]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thao tác nhanh */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-6">Thao tác nhanh</h2>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-[#c7c6cd] hover:text-[#e0e3e5] transition-all duration-300 group">
                <action.Icon size={16} />
                <span className="text-sm font-medium">{action.label}</span>
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </div>

        {/* Gói dịch vụ */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold font-[family-name:var(--font-montserrat)] text-[#e0e3e5]">Gói hiện tại</h2>
            <Link href="/pricing" className="text-xs text-[#c2c6db] hover:underline font-semibold">Nâng cấp</Link>
          </div>

          <div className={`bg-[#1d2022] rounded-xl p-5 border mb-5 ${plan === 'free' ? 'border-white/8' : 'border-[#c2c6db]/20'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-lg font-bold ${planColor[plan]}`}>{planLabel[plan]}</span>
              {plan === 'free' && (
                <Link href="/pricing" className="text-xs bg-[#c2c6db] text-[#2b3040] px-3 py-1 rounded-lg font-bold hover:opacity-90 transition-opacity">
                  Nâng cấp ngay
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs text-[#c7c6cd]">
              {[
                { Icon: Brain, text: plan === 'free' ? 'AI Builder: 10 lần/ngày' : plan === 'standard' ? 'AI Builder: 30 lần/ngày' : plan === 'lite' ? 'AI Builder: 100 lần/ngày' : 'AI Builder: Không giới hạn' },
                { Icon: Globe, text: plan === 'pro' || plan === 'ultra' ? 'Tên miền tuỳ chỉnh' : 'Subdomain Vaitech' },
                { Icon: Store, text: plan === 'free' ? 'Không có cửa hàng' : plan === 'standard' ? '1 cửa hàng' : plan === 'ultra' ? 'Không giới hạn cửa hàng' : '5 cửa hàng' },
                { Icon: Receipt, text: plan === 'free' ? 'Hoá đơn: 1/tháng' : plan === 'standard' ? 'Hoá đơn: 3/tháng' : plan === 'lite' ? 'Hoá đơn: 10/tháng' : plan === 'pro' ? 'Hoá đơn: 50/tháng' : 'Hoá đơn: Không giới hạn' },
              ].map(f => (
                <div key={f.text} className="flex items-center gap-2">
                  <f.Icon size={16} />
                  {f.text}
                </div>
              ))}
            </div>
          </div>

          {/* Thông tin tài khoản */}
          <h3 className="text-sm font-semibold text-[#e0e3e5] mb-3">Thông tin tài khoản</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: 'Email', value: user.email ?? '—' },
              { label: 'Tên hiển thị', value: displayName },
              { label: 'Đăng nhập qua', value: provider },
              { label: 'UID', value: user.uid.slice(0, 12) + '...' },
            ].map(item => (
              <div key={item.label} className="bg-[#1d2022] rounded-lg p-3 border border-white/5">
                <p className="text-[10px] text-[#909097] font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-sm text-[#e0e3e5] truncate">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
