import { NextRequest, NextResponse } from 'next/server'

// Map subdomain → internal path
const subdomainMap: Record<string, string> = {
  features:     '/features',
  pricing:      '/pricing',
  integrations: '/integrations',
  about:        '/about',
  careers:      '/careers',
  press:        '/press',
  contact:      '/contact',
  docs:         '/docs',
  help:         '/help',
  community:    '/community',
  blog:         '/blog',
}

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'vaitech.vn'

  // Tách subdomain: "features.vaitech.vn" → "features"
  const subdomain = host.replace(`.${domain}`, '').replace(domain, '')

  if (subdomain && subdomainMap[subdomain]) {
    const url = req.nextUrl.clone()
    url.pathname = subdomainMap[subdomain] + (req.nextUrl.pathname === '/' ? '' : req.nextUrl.pathname)
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
