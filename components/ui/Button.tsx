import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: ReactNode
  iconRight?: ReactNode
  fullWidth?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[#c2c6db] text-[#2b3040] border border-[#c2c6db] hover:bg-transparent hover:text-[#c2c6db] active:bg-[#c2c6db]/90',
  secondary:
    'bg-white/5 text-[#e0e3e5] border border-white/10 hover:bg-white/10 hover:border-white/20',
  ghost:
    'bg-transparent text-[#c7c6cd] border border-transparent hover:bg-white/5 hover:text-[#e0e3e5]',
  outline:
    'bg-transparent text-[#c2c6db] border border-[#c2c6db]/40 hover:bg-[#c2c6db] hover:text-[#2b3040]',
  danger:
    'bg-[#93000a]/30 text-[#ffb4ab] border border-[#ffb4ab]/30 hover:bg-[#93000a]/50',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs rounded-lg gap-1.5',
  md: 'px-6 py-2.5 text-sm rounded-lg gap-2',
  lg: 'px-8 py-3.5 text-base rounded-xl gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconRight,
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          inline-flex items-center justify-center font-bold
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          active:scale-[0.97]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2c6db] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101415]
          disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button
