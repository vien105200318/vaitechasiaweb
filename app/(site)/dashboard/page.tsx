'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Award, Bookmark, Brain, CheckCircle2, FolderOpen, Globe, Headphones, LayoutGrid, LogIn, LogOut, PlusCircle, Receipt, Settings, Store } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Avatar, Badge, Button, Card, Progress } from '@/components/ui'
import ScrollReveal from '@/components/ui/ScrollReveal'

const quickActions = [
  { Icon: PlusCircle, label: 'Tạo dự án mới', href: '/templates' },
  { Icon: LayoutGrid, label: 'Xem mẫu website', href: '/templates' },
  { Icon: Headphones, label: 'Liên hệ hỗ trợ', href: '/contact' },
  { Icon: Settings, label: 'Cài đặt tài khoản', href: '#' },
]

const onboardingSteps = [
  { label: 'Tạo tài khoản', done: true },
  { label: 'Chọn mẫu website', done: false },
  { label: 'Tùy chỉnh nội dung', done: false },
  { label: 'Kết nối tên miền', done: false },
]

const planLabel: Record<string, string> = {
  free: 'Miễn phí',
  standard: 'Standard',
  lite: 'Lite',
  pro: 'Pro',
  ultra: 'Ultra',
}

const planVariant: Record<string, 'default' | 'accent' | 'success' | 'warning'> = {
  free: 'default',
  standard: 'accent',
  lite: 'accent',
  pro: 'warning',
  ultra: 'accent',
}

export default function DashboardPage() {
  const { user, profile, loading, logout } = useAuth()
  const router = useRouter()
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: 'var(--border-subtle)' }} />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#c2c6db] animate-spin" />
          </div>
          <p style={{ color: 'var(--text-secondary)' }} className="text-sm animate-pulse">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const displayName = profile?.displayName || user.displayName || user.email?.split('@')[0] || 'Người dùng'
  const plan = profile?.plan ?? 'free'
  const provider = profile?.provider === 'google.com' ? 'Google' : 'Email & Mật khẩu'
  const completedSteps = onboardingSteps.filter(s => s.done).length
  const progress = (completedSteps / onboardingSteps.length) * 100

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-16 max-w-[1280px] mx-auto">
      {/* Header */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-5">
            <Avatar
              src={user.photoURL}
              name={displayName}
              size="xl"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p style={{ color: 'var(--text-secondary)' }} className="text-xs tracking-widest uppercase font-semibold">CHÀO MỪNG TRỞ LẠI</p>
                <Badge variant={planVariant[plan]} dot>
                  {planLabel[plan]}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold font-[family-name:var(--font-montserrat)]" style={{ color: 'var(--text-primary)' }}>
                {displayName}
              </h1>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={logout}
            icon={<LogOut size={16} />}
          >
            Đăng xuất
          </Button>
        </div>
      </ScrollReveal>

      {/* Onboarding */}
      {plan === 'free' && !dismissed && (
        <ScrollReveal delay={50}>
          <Card className="mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-bold font-[family-name:var(--font-montserrat)]" style={{ color: 'var(--text-primary)' }}>
                    Bước đầu sử dụng
                  </h2>
                  <button onClick={() => setDismissed(true)} className="text-xs transition-colors focus-visible:outline-none" style={{ color: 'var(--muted)' }}>
                    Bỏ qua
                  </button>
                </div>
                <Progress value={progress} className="mb-4" />
                <div className="flex flex-wrap gap-3">
                  {onboardingSteps.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2">
                      {step.done ? (
                        <CheckCircle2 size={14} className="text-green-400" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[10px]" style={{ borderColor: 'var(--border-subtle)', color: 'var(--muted)' }}>{i + 1}</span>
                      )}
                      <span className={`text-xs ${step.done ? 'line-through' : 'font-semibold'}`} style={{ color: step.done ? 'var(--muted)' : 'var(--text-primary)' }}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/templates">
                <Button size="sm" icon={<ArrowRight size={14} />}>
                  Chọn mẫu ngay
                </Button>
              </Link>
            </div>
          </Card>
        </ScrollReveal>
      )}

      {/* Stats */}
      <ScrollReveal delay={100}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Dự án đang hoạt động', value: '0', Icon: FolderOpen },
            { label: 'Mẫu đã lưu', value: '0', Icon: Bookmark },
            { label: 'Gói dịch vụ', value: planLabel[plan], Icon: Award },
            { label: 'Đăng nhập qua', value: provider, Icon: LogIn },
          ].map((s) => (
            <Card key={s.label}>
              <s.Icon size={16} className="mb-3" style={{ color: 'var(--accent)' }} />
              <div className="text-xl font-bold font-[family-name:var(--font-montserrat)] mb-1 truncate" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
            </Card>
          ))}
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <ScrollReveal delay={200}>
          <Card>
            <h2 className="text-lg font-semibold font-[family-name:var(--font-montserrat)] mb-6" style={{ color: 'var(--text-primary)' }}>Thao tác nhanh</h2>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <action.Icon size={16} className="shrink-0" style={{ color: 'var(--accent)' }} />
                  <span className="text-sm font-medium flex-1">{action.label}</span>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </Card>
        </ScrollReveal>

        {/* Plan info */}
        <ScrollReveal delay={300} className="lg:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold font-[family-name:var(--font-montserrat)]" style={{ color: 'var(--text-primary)' }}>Gói hiện tại</h2>
              <Link href="/pricing" className="text-xs hover:underline font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded" style={{ color: 'var(--accent)' }}>
                Nâng cấp
              </Link>
            </div>

            <div className="rounded-xl p-5 border mb-5" style={{ background: 'var(--surface-2)', borderColor: plan === 'free' ? 'var(--border-subtle)' : 'color-mix(in srgb, var(--accent) 20%, transparent)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{planLabel[plan]}</span>
                {plan === 'free' && (
                  <Link href="/pricing">
                    <Button size="sm">Nâng cấp ngay</Button>
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                {[
                  { Icon: Brain, text: plan === 'free' ? 'AI Builder: 10 lần/ngày' : plan === 'standard' ? 'AI Builder: 30 lần/ngày' : plan === 'lite' ? 'AI Builder: 100 lần/ngày' : 'AI Builder: Không giới hạn' },
                  { Icon: Globe, text: plan === 'pro' || plan === 'ultra' ? 'Tên miền tuỳ chỉnh' : 'Subdomain Vaitech' },
                  { Icon: Store, text: plan === 'free' ? 'Không có cửa hàng' : plan === 'standard' ? '1 cửa hàng' : plan === 'ultra' ? 'Không giới hạn cửa hàng' : '5 cửa hàng' },
                  { Icon: Receipt, text: plan === 'free' ? 'Hoá đơn: 1/tháng' : plan === 'standard' ? 'Hoá đơn: 3/tháng' : plan === 'lite' ? 'Hoá đơn: 10/tháng' : plan === 'pro' ? 'Hoá đơn: 50/tháng' : 'Hoá đơn: Không giới hạn' },
                ].map(f => (
                  <div key={f.text} className="flex items-center gap-2">
                    <f.Icon size={16} className="shrink-0" style={{ color: 'var(--accent)' }} />
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Account info */}
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Thông tin tài khoản</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: 'Email', value: user.email ?? '—' },
                { label: 'Tên hiển thị', value: displayName },
                { label: 'Đăng nhập qua', value: provider },
                { label: 'UID', value: user.uid.slice(0, 12) + '...' },
              ].map(item => (
                <div key={item.label} className="rounded-lg p-3 border" style={{ background: 'var(--surface-2)', borderColor: 'var(--border-subtle)' }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--muted)' }}>{item.label}</p>
                  <p className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  )
}
