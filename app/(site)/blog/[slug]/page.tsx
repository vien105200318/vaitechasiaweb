import { notFound } from 'next/navigation'
import Link from 'next/link'
import { posts } from '@/lib/blog-data'

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

function renderBody(body: string) {
  return body.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="text-xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mt-10 mb-4">
          {block.replace('## ', '')}
        </h2>
      )
    }
    if (block.startsWith('**') && block.endsWith('**') && !block.slice(2).includes('**')) {
      return <h3 key={i} className="text-base font-bold text-[#e0e3e5] mt-6 mb-2">{block.replace(/\*\*/g, '')}</h3>
    }
    // inline bold
    const parts = block.split(/(\*\*.*?\*\*)/g)
    return (
      <p key={i} className="text-[#c7c6cd] leading-relaxed mb-5 text-base">
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="text-[#e0e3e5] font-semibold">{part.replace(/\*\*/g, '')}</strong>
            : part
        )}
      </p>
    )
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find(p => p.slug === slug)
  if (!post) notFound()

  const related = posts.filter(p => p.cat === post.cat && p.slug !== post.slug).slice(0, 3)

  return (
    <div className="pt-28 pb-20">
      {/* Back */}
      <div className="px-6 md:px-16 max-w-[1280px] mx-auto mb-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#c7c6cd] hover:text-[#c2c6db] transition-colors text-sm">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Tất cả bài viết
        </Link>
      </div>

      <article className="px-6 md:px-16 max-w-[800px] mx-auto">
        {/* Category + meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-xs bg-[#c2c6db]/10 text-[#c2c6db] px-3 py-1 rounded-full font-semibold border border-[#c2c6db]/20">
            {post.cat}
          </span>
          <span className="text-xs text-[#909097]">{post.date}</span>
          <span className="text-xs text-[#909097]">·</span>
          <span className="text-xs text-[#909097]">{post.read} đọc</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/8">
          <div className="w-10 h-10 rounded-full bg-[#c2c6db]/20 flex items-center justify-center text-sm font-bold text-[#c2c6db]">
            {post.author[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#e0e3e5]">{post.author}</p>
            <p className="text-xs text-[#909097]">{post.role}</p>
          </div>
        </div>

        {/* Hero image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.img}
          alt={post.title}
          className="w-full aspect-[16/9] object-cover rounded-2xl mb-10"
        />

        {/* Excerpt highlight */}
        <div className="border-l-4 border-[#c2c6db] pl-5 mb-8">
          <p className="text-[#c7c6cd] italic leading-relaxed">{post.excerpt}</p>
        </div>

        {/* Body */}
        <div className="prose-custom">
          {post.body
            ? renderBody(post.body)
            : <p className="text-[#c7c6cd] leading-relaxed">{post.excerpt}</p>
          }
        </div>

        {/* Tags + share */}
        <div className="mt-12 pt-8 border-t border-white/8 flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {[post.cat, 'Vaitech Blog', 'Kinh nghiệm thực tế'].map(tag => (
              <span key={tag} className="text-xs bg-[#1d2022] border border-white/8 text-[#c7c6cd] px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <Link href="/register" className="text-sm bg-[#c2c6db] text-[#2b3040] px-5 py-2.5 rounded-xl font-bold hover:bg-transparent hover:text-[#c2c6db] border border-[#c2c6db] transition-all">
            Bắt đầu với Vaitech →
          </Link>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <div className="px-6 md:px-16 max-w-[1280px] mx-auto mt-20">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-[#e0e3e5] mb-8">
            Bài viết liên quan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`}
                className="glass-card rounded-2xl overflow-hidden hover:border-[#c2c6db]/20 transition-all hover:-translate-y-1 duration-300 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="p-5">
                  <span className="text-[10px] bg-[#c2c6db]/10 text-[#c2c6db] px-2 py-0.5 rounded-full font-semibold">{p.cat}</span>
                  <h3 className="font-bold text-[#e0e3e5] text-sm mt-2 mb-1 leading-tight line-clamp-2 group-hover:text-[#c2c6db] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#909097]">{p.date} · {p.read}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
