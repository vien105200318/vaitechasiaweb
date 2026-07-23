export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        fixed top-4 left-4 z-[500]
        bg-[#c2c6db] text-[#2b3040] px-4 py-2 rounded-lg
        font-bold text-sm
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2c6db]
        transition-all
      "
    >
      Chuyển đến nội dung chính
    </a>
  )
}
