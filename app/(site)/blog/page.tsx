'use client'
import { useState } from 'react'
import Link from 'next/link'
import { posts, categories } from '@/lib/blog-data'

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Tất Cả')
  const [search, setSearch] = useState('')

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === 'Tất Cả' || p.cat === activeCategory
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = posts.find(p => p.featured)
  const regular = filtered.filter(p => !p.featured || activeCategory !== 'Tất Cả' || !!search)

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <div className="px-6 md:px-16 max-w-[1280px] mx-auto mb-14">
        <div className="inline-block px-3 py-1 mb-5 border border-[#c2c6db]/20 bg-[#c2c6db]/5 rounded-full">
          <span className="text-xs tracking-widest uppercase text-[#c2c6db] font-semibold">BLOG & KIẾN THỨC THỰC CHIẾN</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-[clamp(32px,4vw,56px)] font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] leading-tight">
              Không lý thuyết suông.<br/>
              <span className="text-[#c2c6db]/60">Chỉ kinh nghiệm thực tế.</span>
            </h1>
            <p className="text-[#c7c6cd] mt-3">{posts.length} bài viết từ những người đang làm thực tế.</p>
          </div>
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#909097] text-lg">search</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Tìm bài viết..."
              className="w-full bg-[#1d2022] border border-[#46464c] rounded-xl pl-10 pr-4 py-3 text-sm text-[#e0e3e5] placeholder:text-[#909097] focus:border-[#c2c6db] outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 md:px-16 max-w-[1280px] mx-auto mb-10 overflow-x-auto">
        <div className="flex gap-2 pb-1 min-w-max">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCategory === c
                  ? 'bg-[#1d2022] text-[#c2c6db] border border-[#c2c6db]/40'
                  : 'border border-white/10 text-[#c7c6cd] hover:border-[#c2c6db]/20 hover:text-[#e0e3e5]'
              }`}>{c}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featured && !search && activeCategory === 'Tất Cả' && (
        <div className="px-6 md:px-16 max-w-[1280px] mx-auto mb-12">
          <Link href={`/blog/${featured.slug}`} className="glass-card rounded-2xl overflow-hidden group block hover:-translate-y-1 transition-all duration-300 hover:border-[#c2c6db]/20">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs bg-[#c2c6db]/10 text-[#c2c6db] px-3 py-1 rounded-full font-semibold border border-[#c2c6db]/20">⭐ BÀI NỔI BẬT</span>
                    <span className="text-xs text-[#909097]">{featured.cat}</span>
                  </div>
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-4 leading-tight group-hover:text-[#c2c6db] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-[#c7c6cd] text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#c2c6db]/20 flex items-center justify-center text-xs font-bold text-[#c2c6db]">{featured.author[0]}</div>
                    <div>
                      <p className="text-xs font-semibold text-[#e0e3e5]">{featured.author}</p>
                      <p className="text-[10px] text-[#909097]">{featured.role}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#c2c6db] font-semibold flex items-center gap-1">
                    Đọc bài <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Grid */}
      <div className="px-6 md:px-16 max-w-[1280px] mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-4xl text-[#46464c] block mb-3">search_off</span>
            <p className="text-[#c7c6cd]">Không tìm thấy bài viết phù hợp.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(search || activeCategory !== 'Tất Cả' ? filtered : regular).map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="glass-card rounded-2xl overflow-hidden group hover:border-[#c2c6db]/20 transition-all duration-300 hover:-translate-y-1 block">
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] bg-[#c2c6db]/15 backdrop-blur text-[#c2c6db] px-2 py-0.5 rounded-full font-semibold border border-[#c2c6db]/20">{post.cat}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#e0e3e5] font-[family-name:var(--font-montserrat)] text-sm leading-tight mb-3 group-hover:text-[#c2c6db] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#c7c6cd] leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#c2c6db]/15 flex items-center justify-center text-[10px] font-bold text-[#c2c6db]">{post.author[0]}</div>
                      <div>
                        <p className="text-[10px] font-semibold text-[#e0e3e5]">{post.author}</p>
                        <p className="text-[9px] text-[#909097]">{post.read} đọc</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#c2c6db] font-semibold flex items-center gap-1">
                      Đọc <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 glass-card rounded-2xl p-6 flex flex-wrap justify-center gap-8">
          {[{v:`${posts.length}`,l:'Bài viết'},{v:'9',l:'Chủ đề'},{v:'15+',l:'Tác giả thực tế'},{v:'Hàng tuần',l:'Cập nhật mới'}].map(s=>(
            <div key={s.l} className="text-center">
              <p className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-[#c2c6db]">{s.v}</p>
              <p className="text-xs text-[#c7c6cd] mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
