import { Montserrat, Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { I18nProvider } from '@/context/I18nContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProvider } from '@/components/ui/Toast'
import SkipToContent from '@/components/layout/SkipToContent'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyMobileCTA from '@/components/layout/StickyMobileCTA'

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
      <ThemeProvider>
        <I18nProvider>
          <AuthProvider>
            <ToastProvider>
              <SkipToContent />
              <Navbar />
              <main id="main-content">
                {children}
              </main>
              <Footer />
              <StickyMobileCTA />
            </ToastProvider>
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </div>
  )
}
