'use client'

import { useEffect, useState, useCallback, createContext, useContext, type ReactNode } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'
interface ToastItem {
  id: number
  message: string
  type: ToastType
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div
        className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2 pointer-events-none"
        aria-live="polite"
        aria-label="Thông báo"
      >
        {toasts.map((t) => (
          <Toast key={t.id} item={t} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function Toast({ item, onRemove }: { item: ToastItem; onRemove: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(item.id), 4000)
    return () => clearTimeout(timer)
  }, [item.id, onRemove])

  const icons = {
    success: <CheckCircle2 size={16} className="text-green-400 shrink-0" />,
    error: <XCircle size={16} className="text-red-400 shrink-0" />,
    info: <Info size={16} className="text-blue-400 shrink-0" />,
  }

  const styles = {
    success: 'bg-green-900/90 border-green-500/40 text-green-200',
    error: 'bg-red-900/90 border-red-500/40 text-red-200',
    info: 'bg-slate-900/90 border-white/20 text-white',
  }

  return (
    <div
      role="status"
      className={`
        flex items-center gap-2.5 pl-4 pr-2 py-3 rounded-xl text-sm font-semibold
        shadow-2xl pointer-events-auto backdrop-blur-sm border
        animate-slide-in-right
        ${styles[item.type]}
      `}
    >
      {icons[item.type]}
      <span className="flex-1">{item.message}</span>
      <button
        onClick={() => onRemove(item.id)}
        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors shrink-0"
        aria-label="Đóng thông báo"
      >
        <X size={12} />
      </button>
    </div>
  )
}
