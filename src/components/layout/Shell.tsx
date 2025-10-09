import { type ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface ShellProps {
  children: ReactNode
}

export function Shell({ children }: ShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20"
    >
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#hero"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-light text-gray-900">Δ</span>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Dystopia
              </span>
            </motion.a>

            {/* Desktop Nav Links */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:flex md:items-center md:space-x-8"
            >
              <a
                href="#features"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
              >
                Features
              </a>
              <a
                href="#tasks"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
              >
                Use Cases
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
              >
                How It Works
              </a>
              <a
                href="#waitlist"
                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:scale-105"
              >
                Join Waitlist
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-gray-200 bg-white md:hidden"
            >
              <div className="space-y-1 px-4 py-4">
                <a
                  href="#features"
                  onClick={handleNavClick}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#tasks"
                  onClick={handleNavClick}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Use Cases
                </a>
                <a
                  href="#how-it-works"
                  onClick={handleNavClick}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#waitlist"
                  onClick={handleNavClick}
                  className="block rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-center text-base font-medium text-white shadow-md hover:shadow-lg transition-all"
                >
                  Join Waitlist
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-20">{children}</main>

      {/* Background Gradient Orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-400/20 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-gradient-to-tl from-blue-400/20 to-cyan-400/20 blur-3xl" />
      </div>
    </motion.div>
  )
}

