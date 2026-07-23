'use client'
import { useState } from 'react'
import { BookOpen, Search, Bookmark, Clock, Star, BookMarked, Quote, Library, ChevronDown, Heart, Eye } from 'lucide-react'
import { DemoBackButton, ToastContainer } from '@/components/demo/DemoUI'
import { useToast } from '@/hooks/useDemo'

const BOOKS = [
  { id: 1, title: 'Truyện Kiều', author: 'Nguyễn Du', year: 1820, genre: 'Thơ', rating: 4.9, avail: true, desc: 'Tác phẩm văn học kinh điển của Việt Nam', color: 'from-amber-700 to-yellow-800' },
  { id: 2, title: 'Số Đỏ', author: 'Vũ Trọng Phụng', year: 1936, genre: 'Tiểu thuyết', rating: 4.7, avail: true, desc: 'Phê phán xã hội thực dân phong kiến', color: 'from-rose-700 to-red-800' },
  { id: 3, title: 'Chí Phèo', author: 'Nam Cao', year: 1941, genre: 'Truyện ngắn', rating: 4.8, avail: false, desc: 'Đời sống người nông dân nghèo', color: 'from-emerald-700 to-teal-800' },
  { id: 4, title: 'Nhà Giả Kim', author: 'Paulo Coelho', year: 1988, genre: 'Tiểu thuyết', rating: 4.6, avail: true, desc: 'Hành trình tìm kiếm kho báu', color: 'from-sky-700 to-blue-800' },
  { id: 5, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', year: 1936, genre: 'Kỹ năng', rating: 4.5, avail: true, desc: 'Nghệ thuật đối nhân xử thế', color: 'from-violet-700 to-purple-800' },
  { id: 6, title: 'Mắt Biếc', author: 'Nguyễn Nhật Ánh', year: 1990, genre: 'Tiểu thuyết', rating: 4.8, avail: true, desc: 'Tình yêu trong trẻo thời thơ ấu', color: 'from-cyan-700 to-teal-800' },
  { id: 7, title: 'Bảy Bài Học Về Cuộc Sống', author: 'Robin Sharma', year: 2012, genre: 'Kỹ năng', rating: 4.4, avail: true, desc: 'Thay đổi bản thân từng ngày', color: 'from-orange-700 to-amber-800' },
  { id: 8, title: 'Lão Hạc', author: 'Nam Cao', year: 1943, genre: 'Truyện ngắn', rating: 4.7, avail: false, desc: 'Giai cấp bần cùng thời thuộc địa', color: 'from-stone-600 to-stone-800' },
]

const GENRES = ['Tất cả', 'Thơ', 'Tiểu thuyết', 'Truyện ngắn', 'Kỹ năng']
const QUOTES = [
  { text: 'Sách là con đường ngắn nhất dẫn đến tri thức.', author: 'Orhan Pamuk' },
  { text: 'Đọc sách là tự mình đi qua những con đường mà người khác đã đi.', author: 'Unknown' },
  { text: 'Mỗi cuốn sách là một bức cửa mở ra thế giới mới.', author: 'Stephen King' },
]

export default function ThuVienDemo() {
  const { toasts, add } = useToast()
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('Tất cả')
  const [reserved, setReserved] = useState<Set<number>>(new Set())
  const [detail, setDetail] = useState<number|null>(null)
  const [quoteIdx, setQuoteIdx] = useState(0)

  const filtered = BOOKS.filter(b =>
    (genre === 'Tất cả' || b.genre === genre) &&
    (!search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()))
  )

  const toggleReserve = (id: number) => {
    const next = new Set(reserved)
    if (next.has(id)) { next.delete(id); add('Đã hủy đặt chỗ', 'info') }
    else { next.add(id); add('Đặt chỗ thành công! Sách sẽ giữ trong 48h.', 'success') }
    setReserved(next)
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Georgia', 'Palatino Linotype', serif", background: '#faf7f2', color: '#3d2e1c' }}>
      <ToastContainer toasts={toasts} />
      <DemoBackButton />

      {/* ── Header — warm literary ── */}
      <div className="bg-[#f5efe6] border-b border-[#e8dfd2]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-700 to-yellow-800 rounded-xl flex items-center justify-center shadow-md"><BookOpen size={18} className="text-white" /></div>
            <div>
              <span className="text-sm font-bold tracking-tight" style={{ color: '#5c3d1e' }}>Thư Viện Số</span>
              <span className="text-[9px] ml-2 font-semibold tracking-wider" style={{ color: '#b09570' }}>THƯ VIỆN CÔNG CỘNG</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px]" style={{ color: '#b09570' }}>
            <Library size={12} />
            <span className="font-serif italic">Đọc · Học · Phát triển</span>
          </div>
        </div>
      </div>

      {/* ── Hero — literary, floating books aesthetic ── */}
      <section className="relative px-4 pt-12 pb-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-amber-200/30 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-100/40 rounded-full blur-[100px]" />
          {/* Floating book shapes */}
          <div className="absolute top-6 right-20 w-8 h-12 bg-amber-600/10 rounded-sm rotate-12 border border-amber-600/10" />
          <div className="absolute top-16 right-36 w-6 h-10 bg-rose-600/10 rounded-sm -rotate-6 border border-rose-600/10" />
          <div className="absolute bottom-8 left-24 w-7 h-11 bg-emerald-600/10 rounded-sm rotate-3 border border-emerald-600/10" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full mb-4 px-3 py-1 text-[10px] font-bold tracking-wider border"
            style={{ background: '#f0e8d8', borderColor: '#e0d5c0', color: '#8b6d48' }}>
            <Bookmark size={10} />MIỄN PHÍ CHO CÁN BỘ NHÀ NƯỚC
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3 tracking-tight" style={{ color: '#3d2e1c' }}>
            THƯ VIỆN<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-600">SỐ CÔNG CỘNG</span><br/>
            <span className="text-2xl md:text-4xl font-normal italic" style={{ color: '#a08060' }}>— Đọc sách, mở trí —</span>
          </h1>
          <p className="text-sm max-w-md leading-relaxed" style={{ color: '#9b8870' }}>
            Tìm kiếm · Đặt chỗ · Theo dõi đọc sách.<br/>
            Serverless · Catalogue phong phú · Quản lý mượn trả tự động.
          </p>

          <div className="grid grid-cols-3 gap-3 mt-6 max-w-lg">
            {[
              { v: BOOKS.length * 50, l: 'ĐẦU SÁCH', c: 'text-amber-700' },
              { v: 320, l: 'ĐỘC GIẢ', c: 'text-amber-600' },
              { v: 98, s: '%', l: 'SÁCH CÓ SẴN', c: 'text-green-700' },
            ].map(s => (
              <div key={s.l} className="rounded-xl p-3 text-center border" style={{ background: '#f5efe6', borderColor: '#e8dfd2' }}>
                <div className={`text-lg font-black ${s.c}`}>{s.v}{s.s || ''}</div>
                <div className="text-[8px] tracking-widest" style={{ color: '#b09570' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main: Catalogue ── */}
      <section className="px-4 pb-10">
        <div className="max-w-6xl mx-auto">
          {/* Search + Genre filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#b09570' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm sách, tác giả..."
                className="w-full bg-white border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-200 transition-all"
                style={{ borderColor: '#e0d5c0', color: '#3d2e1c' }} />
            </div>
            <div className="flex gap-1.5">
              {GENRES.map(g => (
                <button key={g} onClick={() => setGenre(g)}
                  className="px-3 py-2 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap"
                  style={{
                    background: genre === g ? '#5c3d1e' : '#f5efe6',
                    color: genre === g ? '#faf7f2' : '#8b6d48',
                    border: `1px solid ${genre === g ? '#5c3d1e' : '#e0d5c0'}`
                  }}>{g}</button>
              ))}
            </div>
          </div>

          {/* Masonry-style book grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((book, i) => (
              <div key={book.id} className="break-inside-avoid" style={{ transform: `rotate(${i % 3 === 1 ? '0.5' : i % 3 === 2 ? '-0.3' : '0'}deg)` }}>
                <div className="bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-500 group cursor-pointer"
                  style={{ borderColor: '#e8dfd2', transform: `rotate(${i % 2 === 0 ? '0.3' : '-0.2'}deg)` }}
                  onClick={() => setDetail(detail === book.id ? null : book.id)}>
                  {/* Book spine illusion */}
                  <div className={`h-2 bg-gradient-to-r ${book.color}`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-xs font-bold mb-0.5" style={{ color: '#8b6d48' }}>{book.genre}</div>
                        <div className="text-base font-bold" style={{ color: '#3d2e1c' }}>{book.title}</div>
                        <div className="text-xs mt-0.5 italic" style={{ color: '#a08060' }}>{book.author} · {book.year}</div>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-500 text-[10px] font-bold">
                        <Star size={10} className="fill-amber-400" />{book.rating}
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: '#9b8870' }}>{book.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                        style={{
                          background: book.avail ? '#f0f9f0' : '#fef2f2',
                          color: book.avail ? '#2d6a2d' : '#b91c1c',
                          border: `1px solid ${book.avail ? '#d0ecd0' : '#fecaca'}`
                        }}>
                        {book.avail ? '● Có sẵn' : '● Đang cho mượn'}
                      </span>
                      {book.avail && (
                        <button onClick={e => { e.stopPropagation(); toggleReserve(book.id) }}
                          className="flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all active:scale-95"
                          style={{
                            background: reserved.has(book.id) ? '#fef3c7' : '#f5efe6',
                            color: reserved.has(book.id) ? '#92400e' : '#5c3d1e',
                            border: `1px solid ${reserved.has(book.id) ? '#fde68a' : '#e0d5c0'}`
                          }}>
                          <Bookmark size={10} className={reserved.has(book.id) ? 'fill-amber-500' : ''} />
                          {reserved.has(book.id) ? 'Đã đặt' : 'Đặt chỗ'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Literary quote carousel ── */}
      <section className="px-4 py-10">
        <div className="max-w-6xl mx-auto text-center">
          <Quote size={24} className="mx-auto mb-3" style={{ color: '#d0c0a0' }} />
          <div className="text-lg md:text-xl italic mb-2" style={{ color: '#5c3d1e' }}>&ldquo;{QUOTES[quoteIdx].text}&rdquo;</div>
          <div className="text-xs" style={{ color: '#a08060' }}>— {QUOTES[quoteIdx].author}</div>
          <div className="flex justify-center gap-2 mt-4">
            {QUOTES.map((_, i) => (
              <button key={i} onClick={() => setQuoteIdx(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{ background: i === quoteIdx ? '#8b6d48' : '#d0c0a0' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Gov CTA ── */}
      <section className="px-4 pb-10">
        <div className="max-w-6xl mx-auto rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 border"
          style={{ background: '#f5efe6', borderColor: '#e0d5c0' }}>
          <div className="flex-1">
            <div className="text-[10px] tracking-widest font-bold mb-2" style={{ color: '#8b6d48' }}>THƯ VIỆN NHÀ NƯỚC</div>
            <div className="text-lg font-bold mb-2" style={{ color: '#3d2e1c' }}>Triển khai cho thư viện công cộng</div>
            <p className="text-xs leading-relaxed" style={{ color: '#9b8870' }}>Quản lý catalogue, mượn trả tự động, thống kê đọc sách — serverless, miễn phí.</p>
          </div>
          <button className="font-bold px-6 py-3 rounded-xl text-sm transition-all active:scale-95 whitespace-nowrap text-white"
            style={{ background: '#5c3d1e' }}>Liên hệ →</button>
        </div>
      </section>

      {/* Book detail modal */}
      {detail !== null && (() => {
        const b = BOOKS.find(x => x.id === detail)!
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setDetail(null)}>
            <div className="bg-white rounded-2xl max-w-md mx-4 w-full shadow-2xl border overflow-hidden" style={{ borderColor: '#e8dfd2' }} onClick={e => e.stopPropagation()}>
              <div className={`h-3 bg-gradient-to-r ${b.color}`} />
              <div className="p-6">
                <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold mb-2">
                  <Star size={12} className="fill-amber-400" />{b.rating}
                </div>
                <div className="text-base font-bold mb-1" style={{ color: '#3d2e1c' }}>{b.title}</div>
                <div className="text-xs italic mb-3" style={{ color: '#a08060' }}>{b.author} · {b.year}</div>
                <p className="text-xs leading-relaxed mb-4" style={{ color: '#9b8870' }}>{b.desc}</p>
                <div className="flex gap-2">
                  {b.avail && <button onClick={() => { toggleReserve(b.id); setDetail(null) }}
                    className="flex-1 font-bold py-2.5 rounded-xl text-sm text-white transition-all active:scale-95"
                    style={{ background: '#5c3d1e' }}>Đặt chỗ</button>}
                  <button onClick={() => setDetail(null)}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{ background: '#f5efe6', color: '#5c3d1e', border: '1px solid #e0d5c0' }}>Đóng</button>
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      <div className="border-t px-4 py-6" style={{ borderColor: '#e8dfd2' }}>
        <div className="max-w-6xl mx-auto text-center text-[10px]" style={{ color: '#b09570' }}>© 2026 Thư Viện Số Công Cộng · Powered by Vaitech</div>
      </div>
    </div>
  )
}
