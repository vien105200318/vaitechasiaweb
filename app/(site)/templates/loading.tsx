import { SkeletonCard } from '@/components/ui/Skeleton'

export default function TemplatesLoading() {
  return (
    <div className="pt-28 pb-20 px-6 md:px-16 max-w-[1280px] mx-auto">
      {/* Header skeleton */}
      <div className="text-center mb-12">
        <div className="inline-block skeleton h-6 w-32 rounded-full mb-4" />
        <div className="skeleton h-10 w-96 mx-auto rounded-lg mb-3" />
        <div className="skeleton h-4 w-64 mx-auto rounded" />
      </div>

      {/* Filter skeleton */}
      <div className="flex gap-2 mb-10 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-8 w-20 rounded-full shrink-0" />
        ))}
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}
