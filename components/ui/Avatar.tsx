interface AvatarProps {
  src?: string | null
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeStyles = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Avatar({ src, alt, name = 'U', size = 'md', className = '' }: AvatarProps) {
  const initials = getInitials(name)

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || name}
        className={`${sizeStyles[size]} rounded-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`
        ${sizeStyles[size]}
        rounded-full bg-[#c2c6db]/10 border border-[#c2c6db]/20
        flex items-center justify-center font-bold text-[#c2c6db]
        font-[family-name:var(--font-montserrat)]
        ${className}
      `}
      aria-label={name}
    >
      {initials}
    </div>
  )
}
