import { motion } from 'framer-motion'
import { TaskGalaxy } from '../components/vis/TaskGalaxy'
import { Badge } from '../components/ui/Badge'
import { HardDrive, Cloud, Sparkles, Clock, Home, Briefcase } from 'lucide-react'

interface TopTask {
  icon: typeof Home
  title: string
  description: string
  category: string
}

const topTasks: TopTask[] = [
  {
    icon: Home,
    title: 'Tidy Desktop',
    description: 'Group files by project, move screenshots to folders, delete duplicates automatically.',
    category: 'Home',
  },
  {
    icon: Briefcase,
    title: 'Time-block Tasks',
    description: 'Schedule tasks across your week with 45-min focus blocks and 10-min breaks.',
    category: 'Work',
  },
  {
    icon: Sparkles,
    title: 'Study Flashcards',
    description: 'Generate 20 flashcards from your notes and create a 5-day study plan.',
    category: 'School',
  },
  {
    icon: Clock,
    title: 'Form Filler',
    description: 'Fill onboarding forms with your saved profile, pause to confirm sensitive data.',
    category: 'Work',
  },
]

export default function WhatItCanDoGalaxy() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white px-4 py-32 sm:px-6 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            What it can do
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            Click any node to see its AI prompt. Explore by sector or orbit.
          </p>

          {/* Chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Badge variant="default" className="flex items-center gap-2">
              <HardDrive className="h-3 w-3" />
              Local by default
            </Badge>
            <Badge variant="default" className="flex items-center gap-2">
              <Cloud className="h-3 w-3" />
              Cloud opt-in for heavy tasks
            </Badge>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            All processing happens on your device. You approve any cloud escalation.
          </p>
        </motion.div>

        {/* Galaxy Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TaskGalaxy />
        </motion.div>

        {/* Static SEO Card Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-24"
        >
          <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
            Top AI-Powered Tasks
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topTasks.map((task, idx) => {
              const Icon = task.icon
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="default" className="text-xs">
                      {task.category}
                    </Badge>
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900">
                    {task.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {task.description}
                  </p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

