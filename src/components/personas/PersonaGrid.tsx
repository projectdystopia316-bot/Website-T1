import { motion } from 'framer-motion'
import { Card } from '../ui/Card'

interface Persona {
  emoji: string
  title: string
  description: string
  tasks: string[]
}

const personas: Persona[] = [
  {
    emoji: '🎓',
    title: 'Students & creators',
    description: 'Organize coursework and creative projects',
    tasks: ['Essay outlines', 'Research notes', 'Portfolio prep'],
  },
  {
    emoji: '🚀',
    title: 'Operators & founders',
    description: 'Run lean teams with less chaos',
    tasks: ['Sprint planning', 'OKR tracking', 'Investor updates'],
  },
  {
    emoji: '💻',
    title: 'Developers',
    description: 'Ship code, not context switches',
    tasks: ['PR reviews', 'Bug triage', 'Documentation'],
  },
  {
    emoji: '🩺',
    title: 'Doctors & clinicians',
    description: 'Patient care without admin burden',
    tasks: ['Chart notes', 'Follow-ups', 'Care plans'],
  },
  {
    emoji: '💬',
    title: 'Sales & support',
    description: 'Close deals and delight customers',
    tasks: ['Lead follow-up', 'Demo prep', 'Ticket resolution'],
  },
  {
    emoji: '🏠',
    title: 'Parents & households',
    description: 'Keep life running smoothly',
    tasks: ['Meal planning', 'School events', 'Home maintenance'],
  },
  {
    emoji: '🔬',
    title: 'Researchers & academics',
    description: 'Focus on discoveries, not paperwork',
    tasks: ['Literature review', 'Grant writing', 'Lab scheduling'],
  },
  {
    emoji: '🎨',
    title: 'Designers & PMs',
    description: 'Ship great products faster',
    tasks: ['User research', 'Roadmap sync', 'Design reviews'],
  },
  {
    emoji: '📚',
    title: 'Students (K-12)',
    description: 'Master homework and study habits',
    tasks: ['Assignment tracker', 'Study schedule', 'Project deadlines'],
  },
]

export function PersonaGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            Built for everyone
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            From students to CEOs, Dystopia adapts to how you work.
          </p>
        </motion.div>

        {/* Persona Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {personas.map((persona, idx) => (
            <motion.div key={idx} variants={item}>
              <Card className="group relative flex h-full flex-col overflow-hidden border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl">
                {/* Gradient border shimmer on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
                
                <div className="relative flex flex-col">
                  {/* Emoji Icon */}
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 text-5xl shadow-sm">
                    {persona.emoji}
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {persona.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                    {persona.description}
                  </p>

                  {/* Task Chips */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {persona.tasks.map((task, taskIdx) => (
                      <span
                        key={taskIdx}
                        className="rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1.5 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-200/50"
                      >
                        {task}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

