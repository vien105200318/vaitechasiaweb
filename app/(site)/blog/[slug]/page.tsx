'use client'
import { useEffect, useState, useRef } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, BookOpen, Share2 } from 'lucide-react'
import Link from 'next/link'
import { posts } from '@/lib/blog-data'
import { Badge, Avatar, Button } from '@/components/ui'
import ScrollReveal from '@/components/ui/ScrollReveal'

function renderBody(body: string) {
  return body.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="text-xl font-bold font-[family-name:var(--font-montserrat)] mt-10 mb-4" style={{ color: 'var(--text-primary)' }} id={`section-${i}`}>
          {block.replace('## ', '')}
        </h2>
      )
    }
    if (block.startsWith('**') && block.endsWith('**') && !block.slice(2).includes('**')) {
      return <h3 key={i} className="text-base font-bold mt-6 mb-2" style={{ color: 'var(--text-primary)' }}>{block.replace(/\*\*/g, '')}</h3>
    }
    const parts = block.split(/(\*\*.*?\*\*)/g)
    return (
      <p key={i} className="leading-relaxed mb-5 text-base" style={{ color: 'var(--text-secondary)' }}>
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="font-semibold" style={{ color: 'var(--text-primary)' }}>{part.replace(/\*\*/g, '')}</strong>
            : part
        )}
      </p>
    )
  })
}

function ReadingProgress({ target }: { target: React.RefObject<HTMLElement | null> }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = target.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight
      const scrolled = Math.max(0, -rect.top)
      setProgress(Math.min(100, (scrolled / (total - window.innerHeight)) * 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [target])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5" style={{ background: 'var(--surface-2)' }}>
      <div
        className="h-full transition-[width] duration-150 ease-out" style={{ background: 'var(--accent)', width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Tiến trình đọc"
      />
    </div>
  )
}

function TableOfContents({ headings }: { headings: string[] }) {
  if (headings.length < 2) return null

  return (
    <nav className="hidden xl:block sticky top-28 max-w-[200px]" aria-label="Mục lục">
      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Mục lục</p>
      <ul className="space-y-2">
        {headings.map((h, i) => (
          <li key={i}>
            <a href={`#section-${i}`} className="text-xs transition-colors leading-relaxed block py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded" style={{ color: 'var(--text-secondary)' }}>
              {h}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null)
  const articleRef = useRef<HTMLElement>(null)

  useEffect(() => {
    params.then(p => setSlug(p.slug))
  }, [params])

  if (!slug) return null

  const post = posts.find(p => p.slug === slug)
  if (!post) notFound()

  const related = posts.filter(p => p.cat === post.cat && p.slug !== post.slug).slice(0, 3)
  const headings = post.body
    ? post.body.split('\n\n').filter(b => b.startsWith('## ')).map(b => b.replace('## ', ''))
    : []

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: post.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <>
      <ReadingProgress target={articleRef} />

      <div className="pt-28 pb-20">
        {/* Back */}
        <div className="px-6 md:px-16 max-w-[1280px] mx-auto mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={16} />
            Tất cả bài viết
          </Link>
        </div>

        <div className="px-6 md:px-16 max-w-[1280px] mx-auto flex gap-12">
          {/* TOC */}
          <TableOfContents headings={headings} />

          <article ref={articleRef} className="flex-1 max-w-[800px]">
            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="accent">{post.cat}</Badge>
              <span className="text-xs flex items-center gap-1" style={{ color: 'var(--muted)' }}><Clock size={12} />{post.date}</span>
              <span className="text-xs flex items-center gap-1" style={{ color: 'var(--muted)' }}><BookOpen size={12} />{post.read}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-montserrat)] mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
              {post.title}
            </h1>

            {/* Author + share */}
            <div className="flex items-center justify-between mb-8 pb-8" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="flex items-center gap-3">
                <Avatar name={post.author} size="md" />
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{post.author}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{post.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleShare} icon={<Share2 size={14} />}>
                Chia sẻ
              </Button>
            </div>

            {/* Hero image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.img}
              alt={post.title}
              className="w-full aspect-[16/9] object-cover rounded-2xl mb-10"
            />

            {/* Excerpt highlight */}
            <div className="pl-5 mb-8" style={{ borderLeft: '4px solid var(--accent)' }}>
              <p className="italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{post.excerpt}</p>
            </div>

            {/* Body */}
            <div className="prose-custom">
              {post.body
                ? renderBody(post.body)
                : <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{post.excerpt}</p>
              }
            </div>

            {/* Tags + CTA */}
            <div className="mt-12 pt-8 flex flex-wrap justify-between items-center gap-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <div className="flex flex-wrap gap-2">
                {[post.cat, 'Vaitech Blog', 'Kinh nghiệm thực tế'].map(tag => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <Link href="/register">
                <Button>Bắt đầu với Vaitech →</Button>
              </Link>
            </div>

            {/* Newsletter CTA */}
            <ScrollReveal>
              <div className="mt-12 glass-card rounded-2xl p-8 text-center">
                <h3 className="text-lg font-bold font-[family-name:var(--font-montserrat)] mb-2" style={{ color: 'var(--text-primary)' }}>
                  Nhận bài viết mới qua email
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Không spam. Chỉ kinh nghiệm thực tế từ đội ngũ Vaitech.</p>
                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="flex-1 rounded-lg px-4 py-2.5 text-sm outline-none transition-all"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                    aria-label="Email đăng ký blog"
                  />
                  <Button size="sm">Đăng ký</Button>
                </div>
              </div>
            </ScrollReveal>
          </article>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="px-6 md:px-16 max-w-[1280px] mx-auto mt-20">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] mb-8" style={{ color: 'var(--text-primary)' }}>
              Bài viết liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 80}>
                  <Link href={`/blog/${p.slug}`}
                    className="glass-card rounded-2xl overflow-hidden transition-all hover:-translate-y-1 duration-300 group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="p-5">
                      <Badge>{p.cat}</Badge>
                      <h3 className="font-bold text-sm mt-2 mb-1 leading-tight line-clamp-2 transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {p.title}
                      </h3>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>{p.date} · {p.read}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
