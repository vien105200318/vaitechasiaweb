interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  style?: React.CSSProperties
}

const variantStyles = {
  text: 'h-4 rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-xl',
  card: 'rounded-xl',
}

export default function Skeleton({ className = '', variant = 'text', style }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${variantStyles[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="glass-card rounded-xl p-6 space-y-4" aria-busy="true" aria-label="Đang tải...">
      <Skeleton className="w-12 h-12 rounded-lg" variant="rectangular" />
      <Skeleton className="w-3/4 h-5" />
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-2/3 h-3" />
    </div>
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3" aria-busy="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={i === lines - 1 ? 'w-2/3' : 'w-full'}
        />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return (
    <Skeleton
      variant="circular"
      className="shrink-0"
      style={{ width: size, height: size }}
    />
  )
}
