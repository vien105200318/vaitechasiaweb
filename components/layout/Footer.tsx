import Link from 'next/link'
import Image from 'next/image'
import { Globe, Share2, Cloud } from 'lucide-react'
import { getUrl } from '@/lib/subdomains'

const platformLinks = [
  { label: 'Features', href: getUrl('features') },
  { label: 'Templates', href: '/templates' },
  { label: 'Pricing', href: getUrl('pricing') },
  { label: 'Integrations', href: getUrl('integrations') },
]

const companyLinks = [
  { label: 'About Us', href: getUrl('about') },
  { label: 'Careers', href: getUrl('careers') },
  { label: 'Press', href: getUrl('press') },
  { label: 'Contact', href: getUrl('contact') },
]

const resourceLinks = [
  { label: 'Documentation', href: getUrl('docs') },
  { label: 'Help Center', href: getUrl('help') },
  { label: 'Community', href: getUrl('community') },
  { label: 'Blog', href: getUrl('blog') },
]

export default function Footer() {
  return (
    <footer className="w-full py-[120px] border-t border-[#46464c] bg-[#101415]">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6 md:px-16 max-w-[1280px] mx-auto">
        <div className="col-span-2">
          <div className="mb-6 inline-block px-3 py-1.5 rounded-lg border border-white/10 bg-white/5">
            <Image src="/logo.svg" alt="Vaitech" width={72} height={40} />
          </div>
          <p className="text-[#c7c6cd] text-sm max-w-xs mb-8 leading-relaxed">
            Kiến tạo giải pháp công nghệ dẫn đầu xu hướng cho các thương hiệu toàn cầu.
          </p>
          <div className="flex gap-3">
            {[Globe, Share2, Cloud].map((Icon, i) => (
              <a key={i} href="#"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1d2022] hover:bg-[#c2c6db]/10 text-[#c7c6cd] hover:text-[#c2c6db] transition-all duration-300 border border-white/5">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-bold text-[#e0e3e5] text-xs tracking-widest uppercase mb-2">Platform</span>
          {platformLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="text-[#c7c6cd] hover:text-[#e0e3e5] transition-colors text-sm">
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-bold text-[#e0e3e5] text-xs tracking-widest uppercase mb-2">Company</span>
          {companyLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="text-[#c7c6cd] hover:text-[#e0e3e5] transition-colors text-sm">
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-bold text-[#e0e3e5] text-xs tracking-widest uppercase mb-2">Resources</span>
          {resourceLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="text-[#c7c6cd] hover:text-[#e0e3e5] transition-colors text-sm">
              {label}
            </Link>
          ))}
        </div>

        <div className="col-span-2 lg:col-span-1 mt-8 lg:mt-0">
          <span className="font-bold text-[#e0e3e5] text-xs tracking-widest uppercase mb-6 block">Subscribe to Innovation</span>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email của bạn"
              className="bg-[#1d2022] border border-[#46464c] rounded-lg px-4 py-2.5 w-full text-sm focus:border-[#c2c6db] focus:ring-1 focus:ring-[#c2c6db] outline-none transition-all text-[#e0e3e5] placeholder:text-[#909097]"
            />
            <button className="bg-[#0a0f1e] text-[#c2c6db] px-4 py-2.5 rounded-lg font-bold hover:bg-[#c2c6db] hover:text-[#2b3040] transition-all whitespace-nowrap text-sm border border-[#c2c6db]/30">
              Gửi
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 px-6 md:px-16 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-8">
        <p className="text-[#c7c6cd] text-sm">© 2026 Vaitech. Architects of the Future.</p>
        <div className="flex gap-8 text-xs text-[#909097]">
          <Link href="#" className="hover:text-[#e0e3e5] transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-[#e0e3e5] transition-colors">Terms</Link>
          <Link href="#" className="hover:text-[#e0e3e5] transition-colors">Cookie Policy</Link>
        </div>
        <div className="flex gap-6">
          <span className="text-xs text-[#909097] font-semibold tracking-widest uppercase">VIETNAM</span>
          <span className="text-xs text-[#909097] font-semibold tracking-widest uppercase">GLOBAL</span>
        </div>
      </div>
    </footer>
  )
}
