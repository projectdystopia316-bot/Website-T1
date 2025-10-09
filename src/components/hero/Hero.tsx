import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { pageConfig } from '../../lib/config'

export function Hero() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist')
    waitlistSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const heroProps = pageConfig.sections.hero.props

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                {heroProps?.headline as string}
              </h1>
              
              {/* Animated badges below headline */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-blue-200/50"
                >
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    ✨
                  </motion.span>
                  AI-Generated Middleware
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-green-200/50"
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    🔒
                  </motion.span>
                  100% Privacy
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-orange-200/50"
                >
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ⚡
                  </motion.span>
                  Local-First
                </motion.span>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 text-lg leading-relaxed text-gray-600 sm:text-xl lg:text-2xl lg:leading-relaxed"
            >
              {heroProps?.subheadline as string}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
            >
              <Button size="lg" onClick={scrollToWaitlist}>
                {heroProps?.primaryCTA as string}
                <ArrowRight className="ml-2 inline h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

