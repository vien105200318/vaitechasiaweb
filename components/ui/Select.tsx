import { forwardRef, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs text-[#c7c6cd] font-semibold mb-2 tracking-wider uppercase"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full bg-[#1d2022] border rounded-lg px-4 py-3 text-sm text-[#e0e3e5]
              appearance-none pr-10
              focus:border-[#c2c6db] focus:ring-1 focus:ring-[#c2c6db]
              focus-visible:outline-none
              transition-all duration-300
              ${error ? 'border-[#ffb4ab]/50' : 'border-[#46464c]'}
              ${className}
            `}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : undefined}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#909097] pointer-events-none"
          />
        </div>
        {error && (
          <p id={`${selectId}-error`} className="mt-1.5 text-xs text-[#ffb4ab]" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'
export default Select
