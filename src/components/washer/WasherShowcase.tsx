import { motion } from 'framer-motion'
import { Sparkles, Droplet, FolderOpen } from 'lucide-react'
import { Card } from '../ui/Card'

const cycles = [
  {
    icon: Sparkles,
    name: 'Quick Wash',
    description: 'Daily triage',
    details: 'Inbox zero in minutes. Sort, tag, and prioritize your daily tasks.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Droplet,
    name: 'Deep Clean',
    description: 'Weekly review',
    details: 'Reflect on progress. Archive completed work and plan the week ahead.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FolderOpen,
    name: 'Sort & Fold',
    description: 'Organize projects',
    details: 'Structure your long-term work. Group related tasks and set milestones.',
    color: 'from-orange-500 to-red-500',
  },
]

export function WasherShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            The Washer Method
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            Your tasks go through cycles—just like laundry. Let the machine do
            the work.
          </p>
        </motion.div>

        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: Enhanced Washer Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Washer Container - Dark Glass */}
            <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-gray-800/20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 shadow-2xl">
              {/* Outer Drum Border */}
              <div className="absolute inset-6 rounded-full border-4 border-white/10 bg-gradient-to-br from-gray-800 to-gray-900 shadow-inner" />

              {/* Rotating Outer Ring with dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-6 rounded-full"
              >
                {/* Dots around the drum */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 360) / 12
                  const radius = 45 // percentage
                  return (
                    <div
                      key={i}
                      className="absolute h-2 w-2 rounded-full bg-white/30"
                      style={{
                        left: `${50 + radius * Math.cos((angle * Math.PI) / 180)}%`,
                        top: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  )
                })}
              </motion.div>

              {/* Spinning Ring with gradient */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-8 rounded-full border-4 border-transparent border-t-blue-500/70 border-r-purple-500/70"
              />

              {/* Water Level - Oscillating */}
              <motion.div
                animate={{
                  scaleY: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-x-12 bottom-12 h-32 rounded-b-full bg-gradient-to-t from-blue-400/30 to-transparent blur-sm"
              />

              {/* Inner Drum with tumbling effect */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-14 rounded-full bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 backdrop-blur-sm"
              >
                {/* Tumbling "tasks" inside */}
                {['📋', '📝', '✅', '🎯'].map((emoji, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    animate={{
                      rotate: -360,
                      x: [0, Math.sin(i) * 20, 0],
                      y: [0, Math.cos(i) * 20, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.3,
                    }}
                    style={{
                      left: `${25 + i * 15}%`,
                      top: `${30 + (i % 2) * 20}%`,
                    }}
                  >
                    {emoji}
                  </motion.div>
                ))}

                {/* Center glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/50 to-purple-500/50 blur-2xl" />
              </motion.div>

              {/* Enhanced Bubbles with varied sizes */}
              {[...Array(12)].map((_, i) => {
                const size = Math.random() * 8 + 4 // 4-12px
                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/50 backdrop-blur-sm shadow-sm"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                    }}
                    initial={{
                      x: `${Math.random() * 80 + 10}%`,
                      y: '100%',
                      scale: 0,
                    }}
                    animate={{
                      y: '-10%',
                      scale: [0, 1, 1, 0],
                      x: `${Math.random() * 80 + 10}%`,
                    }}
                    transition={{
                      duration: 4 + Math.random() * 3,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'easeOut',
                    }}
                  />
                )
              })}

              {/* Foam/Suds at top */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-x-8 top-8 h-16 rounded-t-full bg-white/20 blur-md"
              />

              {/* Glass reflection */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent" />

              {/* Control Panel Lights */}
              <div className="absolute right-4 top-4 flex gap-2">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full bg-green-400"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Enhanced Glow effect */}
            <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl" />
            
            {/* Secondary glow */}
            <motion.div
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-12 -z-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-pink-500/20 blur-3xl"
            />
          </motion.div>

          {/* Right: Cycle Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {cycles.map((cycle, idx) => {
              const Icon = cycle.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <Card className="group border-gray-200/50 bg-white/90 backdrop-blur-sm transition-all hover:shadow-xl">
                    <div className="flex gap-5">
                      {/* Icon */}
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cycle.color} shadow-lg`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-xl font-bold text-gray-900">
                            {cycle.name}
                          </h3>
                          <span className="text-sm font-medium text-gray-500">
                            {cycle.description}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">
                          {cycle.details}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

