export default function SiteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#c2c6db] animate-spin" />
        </div>
        <p className="text-[#c7c6cd] text-sm animate-pulse">Đang tải...</p>
      </div>
    </div>
  )
}
