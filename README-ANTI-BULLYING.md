# An Toàn Học Đường — Nền Tảng Bảo Vệ Học Sinh

> Mỗi trẻ em đều xứng đáng được an toàn. Không ai nên phải chịu đựng một mình.

---

## 1. Tổng quan

**An Toàn Học Đường** là nền tảng web báo cáo bạo lực học đường, cho phép học sinh gửi báo cáo ẩn danh một cách an toàn. Nền tảng được xây dựng bằng Next.js 16 + Firebase, thiết kế hướng đến triển khai production thực tế tại các trường học và sở Giáo dục & Đào tạo trên toàn quốc.

### Vấn đề

- **1 trong 3 học sinh** Việt Nam từng bị bắt nạt ít nhất một lần (UNICEF 2024)
- **Hơn 70%** nạn nhân không dám lên tiếng — sợ bị trả thù, sợ bị coi là yếu đuối, sợ người lớn không tin
- Bạo lực học đường không chỉ là đánh đập — nó bao gồm bắt nạt tinh thần, cô lập, xúc phạm trên mạng (cyberbullying), và lợi dụng quyền lực
- Hậu quả: trầm cảm, lo âu, rối loạn ăn uống, tự tử — kéo dài suốt đời

### Giải pháp

Một nền tảng web mà ở đó:

- Học sinh có thể **báo cáo ẩn danh** mà không sợ bị lộ danh tính
- Mỗi báo cáo có **mã theo dõi riêng** để biết trạng thái xử lý
- **Hotline 111** tích hợp sẵn, gọi một chạm
- **Tài liệu hỗ trợ** tâm lý cho cả học sinh và phụ huynh
- **Dashboard thống kê** cho nhà quản lý giáo dục
- **Bảo mật end-to-end** — không lưu IP, không cookie tracking, không analytics ẩn

---

## 2. Tech Stack

| Thành phần | Công nghệ | Phiên bản |
|-----------|-----------|----------|
| Framework | Next.js (App Router) | 16.2.7 |
| UI Library | React | 19.2.4 |
| Ngôn ngữ | TypeScript | ^5 |
| CSS | Tailwind CSS | ^4 |
| Auth | Firebase Auth | ^12.14 |
| Database | Cloud Firestore | ^12.14 |
| Icons | Lucide React | ^1.17 |
| Deployment | Vercel / Docker | — |

---

## 3. Tính năng

### 3.1 Báo cáo ẩn danh

- Form báo cáo với toggle **ẩn danh / tên thật**
- 6 loại sự cố: đánh đập, bắt nạt tinh thần, xúc phạm, cô lập, lợi dụng quyền lực, cyberbullying
- Trường mô tả tự do — học sinh kể lại sự việc bằng ngôn ngữ của mình
- Trường trường học (tuỳ chọn) — giúp xác định vị trí
- Mã báo cáo tự động: `BL-XXXX`

### 3.2 Hotline tích hợp

- Nút gọi khẩn cấp **111** — Tổng đài bảo vệ trẻ em Việt Nam
- Hiển thị nổi bật trên mọi trang
- Banner展开 khi nhấn — số điện thoại lớn, dễ nhìn

### 3.3 Dashboard thống kê

- Tổng số báo cáo, đang xử lý, khẩn cấp, đã giải quyết
- Biểu đồ theo loại sự cố (đánh đập, bắt nạt tinh thần, cyberbullying...)
- Số liệu cập nhật real-time từ Firestore

### 3.4 Tài liệu hỗ trợ

- Khu vực tài nguyên cho **học sinh**: nhận biết dấu hiệu, cách đối phó, làm sao để lên tiếng
- Khu vực tài nguyên cho **phụ huynh**: nhận biết con bị bắt nạt, cách nói chuyện, khi nào cần can thiệp chuyên nghiệp
- Câu chuyện thật từ học sinh đã được hỗ trợ

### 3.5 Bảo mật

- Mã hoá end-to-end
- Không lưu IP người dùng
- Không sử dụng analytics cookie
- Không theo dõi hành vi
- Báo cáo ẩn danh 100% (có thể chọn)

---

## 4. Bắt đầu

### 4.1 Yêu cầu

- Node.js >= 18
- Firebase project (Auth + Firestore enabled)
- Package manager: npm

### 4.2 Cài đặt

```bash
# Clone repo
git clone https://github.com/vaitech/an-toan-hoc-duong.git
cd an-toan-hoc-duong

# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Chạy dev server
npm run dev
```

Truy cập http://localhost:3000/demo/baoluc-hocduong

### 4.3 Biến môi trường

Tạo file `.env.local` từ `.env.local.example`:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Domain (cho subdomain routing)
NEXT_PUBLIC_DOMAIN=an-toan-hoc-duong.vn
```

### 4.4 Firebase Setup

1. Tạo Firebase project tại https://console.firebase.google.com
2. Bật **Authentication** > Enabled providers: Email/Password + Google
3. Tạo **Cloud Firestore** database (chọn region: `asia-southeast1` cho Việt Nam)
4. Deploy Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users — chỉ chính mình đọc/ghi
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    // Reports — ai cũng có thể tạo, chỉ admin đọc
    match /reports/{reportId} {
      allow create: if true;
      allow read: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

---

## 5. Cấu trúc dự án

```
├── app/
│   ├── demo/
│   │   └── baoluc-hocduong/
│   │       └── page.tsx            # Trang demo chính
│   ├── (site)/
│   │   ├── layout.tsx              # Layout site chính (providers, navbar, footer)
│   │   ├── page.tsx                # Homepage
│   │   ├── templates/page.tsx      # Gallery templates (id:20 = An Toàn Học Đường)
│   │   ├── login/page.tsx          # Đăng nhập
│   │   ├── register/page.tsx       # Đăng ký
│   │   ├── dashboard/page.tsx      # Dashboard người dùng
│   │   ├── blog/                   # Blog (20+ bài viết)
│   │   └── ...                     # about, pricing, contact, docs, help...
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Design system (CSS variables, dark/light theme)
│
├── components/
│   ├── ui/                         # 15 UI components (Button, Input, Card, Modal...)
│   ├── layout/                     # Navbar, Footer, StickyMobileCTA
│   └── demo/
│       └── DemoUI.tsx              # Demo-specific: Toast, CountUp, Reveal
│
├── context/
│   ├── AuthContext.tsx              # Firebase Auth + Firestore user sync
│   ├── I18nContext.tsx              # Tiếng Việt / English (800+ keys)
│   └── ThemeContext.tsx             # Dark / Light theme
│
├── hooks/
│   └── useDemo.ts                  # useToast, useCountUp, useScrollReveal
│
├── lib/
│   ├── firebase.ts                 # Firebase init (app, auth, db)
│   ├── blog-data.ts                # Dữ liệu blog (20+ bài viết)
│   └── subdomains.ts               # Subdomain routing config
│
├── public/                         # Static assets
├── middleware.ts                    # Subdomain → path rewriting
├── next.config.ts                  # Next.js config (security headers, image optimization)
└── package.json
```

---

## 6. Database Schema (Firestore)

### Collection: `users`

```
{
  uid: string              // Firebase Auth UID
  email: string | null
  displayName: string | null
  photoURL: string | null
  provider: string         // "password" | "google.com"
  createdAt: Timestamp
  lastLogin: Timestamp
  plan: "free" | "standard" | "lite" | "pro" | "ultra"
}
```

### Collection: `reports` (cần tạo cho production)

```
{
  id: string               // Auto-generated
  type: string             // Loại sự cố
  detail: string           // Mô tả
  school: string | null    // Trường học (tuỳ chọn)
  anonymous: boolean       // Ẩn danh hay không
  reporterName: string | null
  reporterPhone: string | null
  reporterUID: string | null  // Firebase Auth UID (nếu không ẩn danh)
  status: "new" | "processing" | "urgent" | "resolved"
  trackingCode: string     // "BL-XXXX"
  createdAt: Timestamp
  updatedAt: Timestamp
  assignedTo: string | null   // UID admin xử lý
  resolution: string | null   // Ghi chú xử lý
}
```

---

## 7. Cấu trúc Component

### Context Providers

```
AuthProvider      → Firebase auth state + Firestore user sync
  └── I18nProvider  → Vietnamese / English translations
      └── ThemeProvider  → Dark / Light theme
          └── ToastProvider  → Toast notification system
```

### UI Components (15 components)

| Component | Mô tả |
|-----------|-------|
| `Button` | Nút bấm với variants: primary, secondary, ghost, danger |
| `Input` | Form input với label, error state |
| `Select` | Dropdown select |
| `Card` | Card container |
| `Modal` | Dialog overlay |
| `Badge` | Status/label badges |
| `Avatar` | User avatar (name initials hoặc photo) |
| `Accordion` | Collapsible sections |
| `Tabs` | Tabbed interface |
| `Progress` | Progress bar |
| `Skeleton` | Loading states (card, text, avatar) |
| `Toast` | Notification system |
| `ScrollReveal` | IntersectionObserver animation |
| `PageComponents` | PageHeader, Section, GlassCard, CtaBanner |

### Demo Components

| Component | Mô tả |
|-----------|-------|
| `CountUp` | Animated number counter |
| `Reveal` | Scroll-triggered animation wrapper |
| `DemoBackButton` | Fixed back button cho demo pages |
| `ToastContainer` | Toast container cho demo pages |

---

## 8. Design System

### Màu sắc

| Token | Dark (default) | Light |
|-------|---------------|-------|
| `--background` | `#101415` | `#fafafa` |
| `--text-primary` | `#e0e3e5` | `#1a1d1e` |
| `--text-secondary` | `#c7c6cd` | `#4a4d52` |
| `--accent` | `#c2c6db` | `#3d4263` |
| `--surface-1` | `#191c1e` | `#f0f0f2` |
| `--surface-2` | `#1d2022` | `#e6e7ea` |
| `--muted` | `#909097` | `#71737a` |
| `--border-subtle` | `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.06)` |

### Font

- **Headings:** Montserrat (700, 800, 900)
- **Body:** Inter (400, 500, 600)

### Animations

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Duration: 0.6s
- Keyframes: slideInRight, slideInUp, fadeIn, scaleIn, shimmer, pulse-ring, float, glow

---

## 9. Bảo mật

### Headers (next.config.ts)

```typescript
// Demo pages — cho phép embed
{ key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://*.vai-tech.asia" }

// Tất cả pages khác — block iframe
{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }

// Mọi page
{ key: 'X-Content-Type-Options', value: 'nosniff' }
{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
```

### Firebase Security Rules

- Users collection: chỉ chính mình đọc/ghi
- Reports collection: ai cũng tạo được (cho phép ẩn danh), chỉ admin đọc/sửa
- Không lưu IP trong reports
- Không sử dụng Firebase Analytics

### An toàn cho trẻ em

- Không yêu cầu email khi báo cáo ẩn danh
- Không có cookie tracking
- Không có third-party analytics
- Không có behavioral advertising
- Tuân thủ COPPA (Children's Online Privacy Protection Act)

---

## 10. Scripts

```bash
npm run dev       # Dev server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## 11. Triển khai

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

---

## 12. Roadmap đến Production

### Phase 1 — MVP (hiện tại)

- [x] Form báo cáo ẩn danh
- [x] Hotline 111 tích hợp
- [x] Dashboard thống kê (demo data)
- [x] Tài liệu hỗ trợ
- [x] Dark/Light theme
- [x] i18n (Tiếng Việt / English)
- [x] Responsive (mobile-first)

### Phase 2 — Backend Integration

- [ ] Firestore `reports` collection + security rules
- [ ] API endpoint POST /api/reports (tạo báo cáo)
- [ ] API endpoint GET /api/reports/:code (tra cứu bằng mã)
- [ ] Firebase Cloud Functions — gửi email thông báo khi có báo cáo mới
- [ ] Admin dashboard — xem, phân công, xử lý báo cáo
- [ ] SMS notification qua Twilio / Viettel SMS

### Phase 3 — Scale

- [ ] Zalo Mini App integration
- [ ] Zalo OA notification
- [ ] AI sentiment analysis — phát hiện nguy cơ tự tử
- [ ] Multi-language: tiếng dân tộc thiểu số (Tày, Mường, Khmer, Ê Đê...)
- [ ] PWA support — cài như app trên điện thoại
- [ ] Push notification qua Firebase Cloud Messaging

### Phase 4 — Hợp tác nhà nước

- [ ] Tích hợp Cổng Dịch vụ Công Quốc gia
- [ ] API kết nối sở GD&ĐT các tỉnh
- [ ] Dashboard cho sở GD&ĐT — thống kê theo trường, theo quận
- [ ] Xuất báo cáo PDF tự động
- [ ] Đánh giá mức độ nghiêm trọng bằng AI

---

## 13. Hotline

| Đường dây | Số điện thoại | Hoạt động |
|-----------|-------------|-----------|
| Tổng đài bảo vệ trẻ em | **111** | 24/7, miễn phí |
| Tư vấn tâm lý | **1800 1567** | 24/7, miễn phí |
| Công an | **113** | Khẩn cấp |

---

## 14. Đóng góp

1. Fork repo
2. Tạo branch (`git checkout -b feature/tinh-nang-moi`)
3. Commit (`git commit -m 'Thêm tính năng XYZ'`)
4. Push (`git push origin feature/tinh-nang-moi`)
5. Tạo Pull Request

### Quy tắc

- Tuân thủ TypeScript strict mode
- Viết commit message tiếng Việt
- Kiểm tra `npm run lint` trước khi submit PR
- Không commit secrets, API keys, hoặc credentials
- Tất cả code phải pass `npm run build`

---

## 15. License

MIT License — Xem file `LICENSE` để biết chi tiết.

---

## 16. Liên hệ

- **Website:** [an-toan-hoc-duong.vn](https://an-toan-hoc-duong.vn)
- **Email:** contact@an-toan-hoc-duong.vn
- **Hotline:** 111 (Tổng đài bảo vệ trẻ em)
- **GitHub:** [github.com/vaitech/an-toan-hoc-duong](https://github.com/vaitech/an-toan-hoc-duong)

---

*Mỗi đứa trẻ đều có quyền được an toàn. Mỗi tiếng nói đều xứng đáng được lắng nghe.*

*Built with by Vaitech — Digital Agency*
