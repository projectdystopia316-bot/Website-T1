import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  asChild?: boolean
  dark?: boolean
}

export function Card({
  children,
  className = '',
  hover = true,
  asChild = false,
  dark = false,
}: CardProps) {
  const baseClasses = cn(
    'rounded-2xl border p-6 transition-all duration-300',
    dark
      ? 'border-white/10 bg-white/5 backdrop-blur-sm'
      : 'border-gray-200 bg-white shadow-sm',
    className
  )

  if (asChild) {
    return <div className={baseClasses}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={baseClasses}
    >
      {children}
    </motion.div>
  )
}

