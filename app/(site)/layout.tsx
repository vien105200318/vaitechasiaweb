import { Montserrat, Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  weight: ['600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${montserrat.variable} ${inter.variable}`}>
      <AuthProvider>
        <Navbar />
        {children}
        <Footer />
      </AuthProvider>
    </div>
  )
}
