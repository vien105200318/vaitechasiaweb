'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

const quickActions = [
  { icon: 'add_circle', label: 'Tạo dự án mới', href: '/templates' },
  { icon: 'grid_view', label: 'Xem mẫu website', href: '/templates' },
  { icon: 'support_agent', label: 'Liên hệ hỗ trợ', href: '/#contact' },
  { icon: 'settings', label: 'Cài đặt tài khoản', href: '#' },
]

const recentTemplates = [
  { name: 'Doanh Nghiệp Chuyên Nghiệp', category: 'Doanh nghiệp', status: 'Đang xem', icon: 'corporate_fare' },
  { name: 'Phong Cách Thủ Công Cao Cấp', category: 'Quán Cà phê', status: 'Đã lưu', icon: 'local_cafe' },
]

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
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

  const displayName = user.displayName || user.email?.split('@')[0] || 'Người dùng'
  const initials = displayName.slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-16 max-w-[1280px] mx-auto">
      {/* Tiêu đề chào mừng */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#c2c6db]/10 border border-[#c2c6db]/20 flex items-center justify-center text-xl font-bold text-[#c2c6db] font-[family-name:var(--font-montserrat)] overflow-hidden">
            {user.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoURL} alt={displayName} className="w-full h-full object-cover" />
            ) : initials}
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-[#c7c6cd] font-semibold mb-1">CHÀO MỪNG TRỞ LẠI</p>
            <h1 className="text-3xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5]">
              {displayName}
            </h1>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 border border-[#46464c] text-[#c7c6cd] hover:border-[#c2c6db] hover:text-[#c2c6db] px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          Đăng xuất
        </button>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Dự án đang hoạt động', value: '0', icon: 'folder_open' },
          { label: 'Mẫu đã lưu', value: '2', icon: 'bookmark' },
          { label: 'Ngày tham gia', value: 'Hôm nay', icon: 'calendar_today' },
          { label: 'Gói dịch vụ', value: 'Miễn phí', icon: 'workspace_premium' },
        ].map((s) => (
          <div key={s.label} className="glass-card p-6 rounded-xl">
            <span className="material-symbols-outlined text-[#c2c6db] text-2xl mb-3 block">{s.icon}</span>
            <div className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-1">{s.value}</div>
            <div className="text-xs text-[#c7c6cd]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thao tác nhanh */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-6">
            Thao tác nhanh
          </h2>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-[#c7c6cd] hover:text-[#e0e3e5] transition-all duration-300 group"
              >
                <span className="material-symbols-outlined text-[#c2c6db] text-xl group-hover:scale-110 transition-transform">
                  {action.icon}
                </span>
                <span className="text-sm font-medium">{action.label}</span>
                <span className="material-symbols-outlined text-xs ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mẫu gần đây */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold font-[family-name:var(--font-montserrat)] text-[#e0e3e5]">
              Mẫu website gần đây
            </h2>
            <Link href="/templates" className="text-xs text-[#c2c6db] hover:underline font-semibold">
              Xem tất cả
            </Link>
          </div>

          <div className="space-y-3">
            {recentTemplates.map((t) => (
              <div key={t.name} className="flex items-center justify-between p-4 bg-[#1d2022] rounded-lg border border-white/5 hover:border-[#c2c6db]/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0a0f1e] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#c2c6db] text-xl">{t.icon}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#e0e3e5]">{t.name}</div>
                    <div className="text-xs text-[#c7c6cd]">{t.category}</div>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  t.status === 'Đã lưu'
                    ? 'bg-[#c2c6db]/10 text-[#c2c6db]'
                    : 'bg-[#272a2c] text-[#909097]'
                }`}>
                  {t.status}
                </span>
              </div>
            ))}

            <div className="pt-4 text-center">
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 text-sm text-[#c2c6db] font-bold hover:underline"
              >
                Khám phá thêm mẫu website <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin tài khoản */}
      <div className="mt-6 glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-4">
          Thông tin tài khoản
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#1d2022] rounded-lg p-4 border border-white/5">
            <p className="text-xs text-[#909097] font-semibold uppercase tracking-wider mb-1">Email</p>
            <p className="text-sm text-[#e0e3e5]">{user.email}</p>
          </div>
          <div className="bg-[#1d2022] rounded-lg p-4 border border-white/5">
            <p className="text-xs text-[#909097] font-semibold uppercase tracking-wider mb-1">Tên hiển thị</p>
            <p className="text-sm text-[#e0e3e5]">{displayName}</p>
          </div>
          <div className="bg-[#1d2022] rounded-lg p-4 border border-white/5">
            <p className="text-xs text-[#909097] font-semibold uppercase tracking-wider mb-1">Đăng nhập qua</p>
            <p className="text-sm text-[#e0e3e5]">
              {user.providerData[0]?.providerId === 'google.com' ? 'Google' : 'Email & Mật khẩu'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
