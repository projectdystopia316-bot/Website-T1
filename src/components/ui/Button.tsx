import { type ReactNode, type ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary:
      'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40',
    secondary:
      'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50 shadow-sm',
    ghost:
      'bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-100 hover:border-gray-400',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'rounded-full font-semibold transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}

