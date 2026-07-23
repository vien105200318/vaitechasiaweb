import type { ReactNode } from 'react'

interface ProgressProps {
  value: number
  max?: number
  size?: 'sm' | 'md'
  color?: 'accent' | 'success' | 'warning' | 'error'
  showLabel?: boolean
  className?: string
}

const colorStyles = {
  accent: 'bg-[#c2c6db]',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
}

const sizeStyles = {
  sm: 'h-1',
  md: 'h-2',
}

export default function Progress({
  value,
  max = 100,
  size = 'md',
  color = 'accent',
  showLabel = false,
  className = '',
}: ProgressProps) {
  const percent = Math.min(Math.round((value / max) * 100), 100)

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-[#909097]">Tiến trình</span>
          <span className="text-xs font-semibold text-[#c2c6db]">{percent}%</span>
        </div>
      )}
      <div
        className={`w-full bg-white/5 rounded-full overflow-hidden ${sizeStyles[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${percent}%`}
      >
        <div
          className={`${colorStyles[color]} rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
