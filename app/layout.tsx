import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vaitech | Architects of the Future',
  description: 'Chúng tôi kiến tạo những trải nghiệm kỹ thuật số đột phá, kết hợp giữa trí tuệ nhân tạo và thiết kế thẩm mỹ cao cấp.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Vaitech | Architects of the Future',
    description: 'Premium digital agency — AI-powered web solutions for global brands.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark">
      <head>
        {/* Preconnect để giảm latency font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* display=optional: không block render, icons hiện sau khi load xong */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=optional"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
