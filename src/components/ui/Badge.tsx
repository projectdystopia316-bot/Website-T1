import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'gradient'
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-700 border border-gray-200',
    primary: 'bg-blue-100 text-blue-700 border border-blue-200',
    secondary: 'bg-purple-100 text-purple-700 border border-purple-200',
    gradient:
      'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

