'use client'
import { useState } from 'react'
import { ArrowRight, Search, SearchX } from 'lucide-react'
import Link from 'next/link'
import { posts, categories } from '@/lib/blog-data'
import { Badge, Avatar } from '@/components/ui'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useI18n } from '@/context/I18nContext'

export default function BlogPage() {
  const { t } = useI18n()
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === 'all' || p.cat === activeCategory
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = posts.find(p => p.featured)
  const regular = filtered.filter(p => !p.featured || activeCategory !== 'all' || !!search)

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <div className="px-6 md:px-16 max-w-[1280px] mx-auto mb-14">
        <ScrollReveal>
          <div className="inline-block px-3 py-1 mb-5 rounded-full" style={{ border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)', background: 'color-mix(in srgb, var(--accent) 5%, transparent)' }}>
            <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: 'var(--accent)' }}>{t('blog.badge')}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-[clamp(32px,4vw,56px)] font-bold font-[family-name:var(--font-montserrat)] leading-tight" style={{ color: 'var(--text-primary)' }}>
                {t('blog.title1')}<br/>
                <span style={{ color: 'var(--accent)', opacity: 0.6 }}>{t('blog.title2')}</span>
              </h1>
              <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>{t('blog.desc').replace('{count}', String(posts.length))}</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--muted)' }} />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder={t('blog.searchPlaceholder')}
                className="w-full border rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                aria-label={t('blog.searchPlaceholder')}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Categories */}
      <div className="px-6 md:px-16 max-w-[1280px] mx-auto mb-10 overflow-x-auto" role="tablist" aria-label="Lọc theo danh mục">
        <div className="flex gap-2 pb-1 min-w-max">
          <button onClick={() => setActiveCategory('all')}
            role="tab"
            aria-selected={activeCategory === 'all'}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
              activeCategory === 'all'
                ? 'text-[var(--accent)]'
                : 'hover:text-[var(--text-primary)]'
            }`}
            style={activeCategory === 'all'
              ? { background: 'var(--surface-2)', borderColor: 'var(--accent)', borderWidth: '1px', borderStyle: 'solid' }
              : { color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }
            }>
            {t('blog.all')}
          </button>
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)}
              role="tab"
              aria-selected={activeCategory === c}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                activeCategory === c
                  ? 'text-[var(--accent)]'
                  : 'hover:text-[var(--text-primary)]'
              }`}
              style={activeCategory === c
                ? { background: 'var(--surface-2)', borderColor: 'var(--accent)', borderWidth: '1px', borderStyle: 'solid' }
                : { color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }
              }>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featured && !search && activeCategory === 'all' && (
        <div className="px-6 md:px-16 max-w-[1280px] mx-auto mb-12">
          <ScrollReveal>
            <Link href={`/blog/${featured.slug}`} className="glass-card rounded-2xl overflow-hidden group block hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="accent">⭐ {t('blog.featured')}</Badge>
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>{featured.cat}</span>
                    </div>
                    <h2 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] mb-4 leading-tight transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {featured.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>{featured.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar name={featured.author} size="sm" />
                      <div>
                        <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{featured.author}</p>
                        <p className="text-[10px]" style={{ color: 'var(--muted)' }}>{featured.role}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                      {t('blog.readArticle')} <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      )}

      {/* Grid */}
      <div className="px-6 md:px-16 max-w-[1280px] mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <SearchX size={32} className="mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>{t('blog.noResult')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(search || activeCategory !== 'all' ? filtered : regular).map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 60}>
                <Link href={`/blog/${post.slug}`}
                  className="glass-card rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] h-full">
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--background) 70%, transparent)' }} />
                    <div className="absolute bottom-3 left-3">
                      <Badge>{post.cat}</Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold font-[family-name:var(--font-montserrat)] text-sm leading-tight mb-3 transition-colors line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                      {post.title}
                    </h3>
                    <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                      <div className="flex items-center gap-2">
                        <Avatar name={post.author} size="sm" />
                        <div>
                          <p className="text-[10px] font-semibold" style={{ color: 'var(--text-primary)' }}>{post.author}</p>
                          <p className="text-[9px]" style={{ color: 'var(--muted)' }}>{post.read} {t('blog.reads')}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                        {t('blog.read')} <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Stats */}
        <ScrollReveal>
          <div className="mt-12 glass-card rounded-2xl p-6 flex flex-wrap justify-center gap-8">
            {[{v:`${posts.length}`,l:t('blog.statArticles')},{v:'9',l:t('blog.statTopics')},{v:'15+',l:t('blog.statAuthors')},{v:t('blog.statWeekly'),l:t('blog.statUpdate')}].map(s=>(
              <div key={s.l} className="text-center">
                <p className="text-2xl font-bold font-[family-name:var(--font-montserrat)]" style={{ color: 'var(--accent)' }}>{s.v}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
