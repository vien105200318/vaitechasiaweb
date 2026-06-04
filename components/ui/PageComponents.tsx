import Link from 'next/link'

interface PageHeaderProps {
  badge: string
  title: string
  accent: string
  desc: string
}

export function PageHeader({ badge, title, accent, desc }: PageHeaderProps) {
  return (
    <header className="pt-32 pb-20 px-6 md:px-16 max-w-[1280px] mx-auto text-center">
      <div className="inline-block px-3 py-1 mb-6 border border-[#c2c6db]/20 bg-[#c2c6db]/5 rounded-full">
        <span className="text-xs tracking-widest uppercase text-[#c2c6db] font-semibold">{badge}</span>
      </div>
      <h1 className="text-[clamp(36px,5vw,64px)] font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-6 leading-tight">
        {title} <span className="text-[#c2c6db]">{accent}</span>
      </h1>
      <p className="text-lg text-[#c7c6cd] max-w-2xl mx-auto leading-relaxed">{desc}</p>
    </header>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
}

export function Section({ children, className = '' }: SectionProps) {
  return (
    <section className={`py-20 px-6 md:px-16 max-w-[1280px] mx-auto ${className}`}>
      {children}
    </section>
  )
}

export function GlassCard({ children, className = '' }: SectionProps) {
  return (
    <div className={`glass-card rounded-xl p-8 ${className}`}>
      {children}
    </div>
  )
}

export function CtaBanner({ title, desc, btnLabel, btnHref }: { title: string; desc: string; btnLabel: string; btnHref: string }) {
  return (
    <section className="py-20 px-6 md:px-16 max-w-[1280px] mx-auto">
      <div className="glass-card rounded-3xl py-16 px-8 text-center relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-56 h-56 bg-[#c2c6db]/10 blur-[80px] rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-[#c2c6db]/10 blur-[80px] rounded-full" />
        <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-4">{title}</h2>
        <p className="text-[#c7c6cd] mb-8 max-w-xl mx-auto">{desc}</p>
        <Link href={btnHref} className="inline-flex items-center gap-2 bg-[#c2c6db] text-[#2b3040] px-10 py-4 rounded-lg font-bold hover:bg-transparent hover:text-[#c2c6db] border border-[#c2c6db] transition-all duration-300">
          {btnLabel}
        </Link>
      </div>
    </section>
  )
}
