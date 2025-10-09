import { motion } from 'framer-motion'
import { Lock, Zap, Sparkles } from 'lucide-react'
import { Card } from '../ui/Card'

const features = [
  {
    icon: Lock,
    title: 'Privacy by default',
    description: 'Your files stay with you',
    details: 'Zero cloud sync. Everything lives locally in your browser. No tracking, no servers, no third parties.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Time savers',
    description: 'Kill the repetitive stuff',
    details: 'Smart templates, keyboard shortcuts, and AI-powered suggestions that actually understand your workflow.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Sparkles,
    title: 'Fits you',
    description: 'Personal, not generic',
    details: 'Adapts to your style. Custom views, flexible tags, and a system that grows with how you work.',
    gradient: 'from-orange-500 to-red-500',
  },
]

export function FeatureGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="features" className="px-4 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            Built different
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            Not another productivity app. A tool that respects your privacy and
            actually saves you time.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 grid gap-8 md:grid-cols-3"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.div key={idx} variants={item}>
                <Card className="group relative h-full overflow-hidden border-gray-200/50 bg-white/90 backdrop-blur-sm">
                  {/* Gradient Glow Effect */}
                  <div
                    className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 blur transition-opacity duration-500 group-hover:opacity-20`}
                  />

                  <div className="relative flex flex-col">
                    {/* Icon */}
                    <div
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="mt-6 text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-base font-semibold text-gray-700">
                      {feature.description}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                      {feature.details}
                    </p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

