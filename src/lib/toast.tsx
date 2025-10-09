import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = { id, message, type }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      <div
        className="fixed bottom-8 right-8 z-50 flex flex-col gap-2"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm ${
                toast.type === 'success'
                  ? 'border-green-200 bg-green-50/90'
                  : toast.type === 'error'
                  ? 'border-red-200 bg-red-50/90'
                  : 'border-blue-200 bg-blue-50/90'
              }`}
            >
              {/* Icon */}
              {toast.type === 'success' && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
              )}
              {toast.type === 'info' && (
                <Info className="h-5 w-5 shrink-0 text-blue-600" />
              )}

              {/* Message */}
              <p
                className={`text-sm font-medium ${
                  toast.type === 'success'
                    ? 'text-green-900'
                    : toast.type === 'error'
                    ? 'text-red-900'
                    : 'text-blue-900'
                }`}
              >
                {toast.message}
              </p>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className={`shrink-0 rounded-full p-1 transition-colors ${
                  toast.type === 'success'
                    ? 'hover:bg-green-200'
                    : toast.type === 'error'
                    ? 'hover:bg-red-200'
                    : 'hover:bg-blue-200'
                }`}
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

