// Cấu hình subdomain cho từng trang
// Dùng khi đã có domain thật, ví dụ: features.vaitech.vn
// Hiện tại tất cả vẫn chạy bình thường trên cùng domain qua /route

export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'vaitech.vn'

export const subdomains: Record<string, string> = {
  features:     `features.${DOMAIN}`,
  pricing:      `pricing.${DOMAIN}`,
  integrations: `integrations.${DOMAIN}`,
  about:        `about.${DOMAIN}`,
  careers:      `careers.${DOMAIN}`,
  press:        `press.${DOMAIN}`,
  contact:      `contact.${DOMAIN}`,
  docs:         `docs.${DOMAIN}`,
  help:         `help.${DOMAIN}`,
  community:    `community.${DOMAIN}`,
  blog:         `blog.${DOMAIN}`,
}

// Trả về URL đúng: subdomain nếu có domain thật, fallback về /path
export function getUrl(key: keyof typeof subdomains): string {
  if (process.env.NEXT_PUBLIC_DOMAIN) {
    return `https://${subdomains[key]}`
  }
  return `/${key}`
}
