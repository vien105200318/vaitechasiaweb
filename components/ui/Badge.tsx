import type { ReactNode } from 'react'

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'error' | 'outline'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-white/8 text-[#c7c6cd] border-white/10',
  accent: 'bg-[#c2c6db]/10 text-[#c2c6db] border-[#c2c6db]/20',
  success: 'bg-green-900/30 text-green-300 border-green-500/20',
  warning: 'bg-amber-900/30 text-amber-300 border-amber-500/20',
  error: 'bg-red-900/30 text-red-300 border-red-500/20',
  outline: 'bg-transparent text-[#c7c6cd] border-[#46464c]',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-semibold border rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          variant === 'success' ? 'bg-green-400' :
          variant === 'warning' ? 'bg-amber-400' :
          variant === 'error' ? 'bg-red-400' :
          'bg-[#c2c6db]'
        }`} />
      )}
      {children}
    </span>
  )
}
