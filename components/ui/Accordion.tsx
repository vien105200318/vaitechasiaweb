'use client'

'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#e0e3e5] text-sm pr-4">{question}</span>
        <ChevronDown
          size={16}
          className={`text-[#909097] shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ maxHeight: open ? '500px' : '0' }}
      >
        <div className="px-5 pb-5 text-sm text-[#c7c6cd] leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  )
}

interface AccordionProps {
  children: ReactNode
  className?: string
}

export function Accordion({ children, className = '' }: AccordionProps) {
  return (
    <div className={`space-y-3 ${className}`} role="region">
      {children}
    </div>
  )
}
