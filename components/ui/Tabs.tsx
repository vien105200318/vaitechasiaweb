'use client'

'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface TabsContextType {
  active: string
  setActive: (value: string) => void
}

const TabsContext = createContext<TabsContextType>({ active: '', setActive: () => {} })

interface TabsProps {
  defaultValue: string
  children: ReactNode
  className?: string
}

export function Tabs({ defaultValue, children, className = '' }: TabsProps) {
  const [active, setActive] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

interface TabListProps {
  children: ReactNode
  className?: string
}

export function TabList({ children, className = '' }: TabListProps) {
  return (
    <div
      role="tablist"
      className={`flex gap-2 overflow-x-auto pb-1 ${className}`}
    >
      {children}
    </div>
  )
}

interface TabTriggerProps {
  value: string
  children: ReactNode
  className?: string
}

export function TabTrigger({ value, children, className = '' }: TabTriggerProps) {
  const { active, setActive } = useContext(TabsContext)
  const isActive = active === value

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActive(value)}
      className={`
        px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2c6db]
        ${isActive
          ? 'bg-[#c2c6db]/10 text-[#c2c6db] border border-[#c2c6db]/30'
          : 'text-[#c7c6cd] border border-transparent hover:bg-white/5 hover:text-[#e0e3e5]'
        }
        ${className}
      `}
    >
      {children}
    </button>
  )
}

interface TabContentProps {
  value: string
  children: ReactNode
  className?: string
}

export function TabContent({ value, children, className = '' }: TabContentProps) {
  const { active } = useContext(TabsContext)
  if (active !== value) return null
  return (
    <div role="tabpanel" className={className}>
      {children}
    </div>
  )
}
