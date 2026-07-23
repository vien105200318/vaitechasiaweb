import { SkeletonCard } from '@/components/ui/Skeleton'

export default function BlogLoading() {
  return (
    <div className="pt-28 pb-20 px-6 md:px-16 max-w-[1280px] mx-auto">
      {/* Header skeleton */}
      <div className="mb-14">
        <div className="inline-block skeleton h-6 w-48 rounded-full mb-5" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="skeleton h-10 w-80 rounded-lg mb-3" />
            <div className="skeleton h-4 w-48 rounded" />
          </div>
          <div className="skeleton h-12 w-72 rounded-xl" />
        </div>
      </div>

      {/* Categories skeleton */}
      <div className="flex gap-2 mb-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-8 w-20 rounded-full shrink-0" />
        ))}
      </div>

      {/* Featured skeleton */}
      <div className="skeleton h-80 rounded-2xl mb-12" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}
