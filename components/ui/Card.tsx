import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'interactive'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'glass', padding = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]'

    const variantStyles = {
      glass: 'glass-card',
      solid: 'bg-[#1d2022] border border-white/5',
      interactive: 'glass-card hover:-translate-y-1 hover:border-[#c2c6db]/20 cursor-pointer group',
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'
export default Card
