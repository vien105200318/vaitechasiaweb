'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const features = [
  {
    icon: 'psychology',
    title: 'Xây Dựng Bằng AI',
    desc: 'Hệ thống tự động hóa thông minh giúp xây dựng hạ tầng số một cách nhanh chóng và chính xác tuyệt đối.',
    cta: 'Khám phá',
  },
  {
    icon: 'auto_awesome',
    title: 'Hiệu Ứng Thị Giác',
    desc: 'Trải nghiệm thị giác cao cấp với hiệu ứng 3D và tương tác mượt mà, tạo ấn tượng mạnh mẽ từ cái nhìn đầu tiên.',
    cta: 'Trải nghiệm',
  },
  {
    icon: 'speed',
    title: 'Tối Ưu Hiệu Suất',
    desc: 'Tối ưu hóa quy trình vận hành và chuyển đổi số toàn diện, giúp doanh nghiệp bứt phá doanh thu.',
    cta: 'Tìm hiểu',
  },
]

const stats = [
  { value: '200+', label: 'Dự án hoàn thành' },
  { value: '99.9%', label: 'Uptime đảm bảo' },
  { value: '50+', label: 'Đối tác tin cậy' },
  { value: '<1s', label: 'Tốc độ tải trang' },
]

export default function HomePage() {
  const revealRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    revealRefs.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const ref = (i: number) => (el: HTMLElement | null) => { revealRefs.current[i] = el }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="hero-gradient absolute inset-0" />
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9UdR6dtRb57GzjnL8gNMiUf1WNS_pBt9LHN61HCtGZU1dyAYZNS5tZ93ekpUKSPuFC6guHPwFcxZf44R-bndGuj7OLbTq0Opqr5L5s3l2q8I-ra7QQd513EwUTv-Aek_SVKAn9wR9zIbbW-lqll0MJT34jNr0BkWpj56xIyeY8Rm5odfyt9SmtxqSCjHMAlvfIo10ryzg5ID1UkWD2pUympFQOWpx-3cDxiXeRPzbK_jzDwzmM-tINhTmDncjEj-2ET0_HYIrFxVN"
            alt="Vaitech Hero"
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
            priority
            unoptimized
          />
        </div>

        <div className="relative z-10 px-6 md:px-16 max-w-[1280px] mx-auto w-full">
          <div className="max-w-4xl">
            <h1 className="text-[40px] md:text-[72px] font-bold leading-[1.1] tracking-tight font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-8">
              Nâng tầm thương hiệu của bạn với{' '}
              <span className="text-[#c2c6db]">Vaitech</span>
            </h1>
            <p className="text-lg text-[#c7c6cd] mb-10 max-w-2xl leading-relaxed">
              Chúng tôi kiến tạo những trải nghiệm kỹ thuật số đột phá, kết hợp giữa trí tuệ
              nhân tạo và thiết kế thẩm mỹ cao cấp để hiện thực hóa tương lai của doanh nghiệp bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center bg-[#c2c6db] text-[#2b3040] px-10 py-4 rounded-lg font-bold text-lg hover:bg-transparent hover:text-[#c2c6db] border border-[#c2c6db] transition-all duration-500"
              >
                Bắt đầu hành trình
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center justify-center px-10 py-4 rounded-lg font-bold text-lg border border-[#909097] hover:bg-white/5 transition-all duration-500 text-[#e0e3e5]"
              >
                Xem Portfolio
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute right-[10%] top-[40%] w-64 h-80 glass-card rounded-xl p-6 rotate-6 electric-glow">
          <div className="flex flex-col h-full justify-between">
            <span className="material-symbols-outlined text-[#c2c6db] text-4xl">database</span>
            <div className="space-y-2">
              <div className="h-1 w-12 bg-[#c2c6db] rounded-full" />
              <p className="text-xs tracking-widest uppercase text-[#c7c6cd] font-semibold">OPTIMIZING SYSTEMS</p>
              <p className="text-2xl font-semibold font-[family-name:var(--font-montserrat)] text-[#e0e3e5]">99.9% Eff</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-[120px] px-6 md:px-16 max-w-[1280px] mx-auto">
        <div ref={ref(0)} className="reveal flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <span className="text-xs tracking-widest uppercase text-[#c2c6db] font-semibold mb-4 block">
              CÔNG NGHỆ TIÊN PHONG
            </span>
            <h2 className="text-3xl md:text-[40px] font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] leading-tight">
              Đặc quyền kỹ thuật số dành riêng cho bạn
            </h2>
          </div>
          <p className="text-[#c7c6cd] max-w-xs text-sm leading-relaxed">
            Mỗi giải pháp được thiết kế tỉ mỉ để tối ưu hóa hiệu suất và nâng tầm giá trị thương hiệu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={f.title} ref={ref(i + 1)} className="reveal glass-card p-10 rounded-xl group">
              <div className="mb-8 w-14 h-14 rounded-lg bg-[#0a0f1e] flex items-center justify-center text-[#c2c6db] group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-3xl">{f.icon}</span>
              </div>
              <h3 className="text-2xl font-semibold font-[family-name:var(--font-montserrat)] mb-4 text-[#e0e3e5]">
                {f.title}
              </h3>
              <p className="text-[#c7c6cd] text-sm leading-relaxed mb-6">{f.desc}</p>
              <div className="flex items-center gap-2 text-[#c2c6db] font-bold cursor-pointer hover:gap-4 transition-all text-sm">
                {f.cta} <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase */}
      <section className="py-[120px] bg-[#191c1e]">
        <div className="px-6 md:px-16 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div ref={ref(4)} className="reveal lg:col-span-5 order-2 lg:order-1">
              <div className="glass-card p-12 rounded-xl">
                <h2 className="text-[40px] font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-6 leading-tight">
                  Kiến trúc của sự hoàn mỹ
                </h2>
                <p className="text-[#c7c6cd] text-base leading-relaxed mb-8">
                  Tại Vaitech, chúng tôi không chỉ tạo ra website — chúng tôi xây dựng những di sản kỹ thuật số.
                  Mỗi pixel đều được tính toán để mang lại sự cân bằng hoàn hảo giữa công năng và nghệ thuật.
                </p>
                <ul className="space-y-4 mb-10">
                  {['Thiết kế tùy chỉnh 100%', 'Tốc độ tải trang dưới 1s', 'Bảo mật đa lớp AI'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#c2c6db] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span className="text-sm text-[#e0e3e5]">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 bg-[#c2c6db] text-[#2b3040] px-8 py-3 rounded-lg font-bold text-sm hover:bg-transparent hover:text-[#c2c6db] border border-[#c2c6db] transition-all duration-300"
                >
                  Xem Templates <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div ref={ref(5)} className="reveal lg:col-span-7 order-1 lg:order-2">
              <div className="relative h-[500px] w-full group overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCskbDaVvG1TNcrbuTW9bHNbE5NEVIIZrnuf--MXLte0y2wHERNx2JnlC_5eSjVkrtuIJhD3mG-nSGZvT3VbK_f5BsD5LZcEOTkaHoqXv8oP3v6n2-tnVwX3uQfQ7ZBA62ve7Tukep7hKuRAbZbkSrFh0wLbaYCKzFw8MRqLC1mBb2QeTLv6TgSNyMOoz0MkXlelsYEX-qDA6zEjkMcN-ktpdvqB3AqDB6TkYDeiaIe2MS-fIKkL1H09RDo-T7iiiHjvHdoDzIcKxVl"
                  alt="Vaitech Workspace"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#191c1e] to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 md:px-16 max-w-[1280px] mx-auto">
        <div ref={ref(6)} className="reveal grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center glass-card p-8 rounded-xl">
              <div className="text-4xl font-bold font-[family-name:var(--font-montserrat)] text-[#c2c6db] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[#c7c6cd]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-[120px] px-6 md:px-16 max-w-[1280px] mx-auto text-center">
        <div ref={ref(7)} className="reveal glass-card py-20 px-8 rounded-3xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#c2c6db]/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#c2c6db]/10 blur-[100px] rounded-full" />
          <h2 className="text-[40px] md:text-[72px] font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-8 leading-tight">
            Sẵn sàng định hình tương lai?
          </h2>
          <p className="text-lg text-[#c7c6cd] mb-12 max-w-2xl mx-auto leading-relaxed">
            Hãy cùng chúng tôi bắt đầu hành trình chuyển đổi số và nâng tầm thương hiệu của bạn lên một đẳng cấp mới.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center bg-[#c2c6db] text-[#2b3040] px-12 py-5 rounded-lg font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl electric-glow"
          >
            Liên hệ với chuyên gia
          </Link>
        </div>
      </section>
    </>
  )
}
