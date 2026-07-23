'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'

const ctaPages = ['/', '/pricing', '/templates', '/features', '/about']

export default function StickyMobileCTA() {
  const pathname = usePathname()

  if (!ctaPages.includes(pathname)) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#101415]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 safe-area-inset-bottom">
      <Link href="/register" className="block">
        <Button size="lg" className="w-full" icon={<ArrowRight size={16} />}>
          Bắt đầu miễn phí
        </Button>
      </Link>
    </div>
  )
}
