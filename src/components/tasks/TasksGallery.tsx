import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trash2,
  Search,
  FileText,
  Calendar,
  ClipboardList,
  BookOpen,
  Heart,
  Home,
  Plane,
  DollarSign,
  Image,
  Code,
  Copy,
  Check,
  Grid3x3,
  Orbit,
} from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { useToast } from '../../lib/toast'
import { TaskGalaxy } from '../vis/TaskGalaxy'

type Category = 'all' | 'home' | 'work' | 'school' | 'health'
type Cycle = 'quick' | 'deep' | 'fold'

interface Task {
  id: string
  icon: typeof Trash2
  title: string
  description: string
  cycle: Cycle
  category: Category
  tags: string[]
  prompt: string
}

const tasks: Task[] = [
  {
    id: 'clean-desktop',
    icon: Trash2,
    title: 'Clean my desktop',
    description: 'Archive old files, organize downloads',
    cycle: 'quick',
    category: 'home',
    tags: ['organization', 'files'],
    prompt: 'Help me organize my desktop files by moving old items to archive and sorting downloads by type',
  },
  {
    id: 'find-file',
    icon: Search,
    title: 'Find that file',
    description: 'Smart search across folders',
    cycle: 'quick',
    category: 'work',
    tags: ['search', 'productivity'],
    prompt: 'Search my documents for files related to [topic] modified in the last [timeframe]',
  },
  {
    id: 'smart-rename',
    icon: FileText,
    title: 'Smart rename & sort',
    description: 'Batch rename with patterns',
    cycle: 'fold',
    category: 'work',
    tags: ['automation', 'files'],
    prompt: 'Rename these files using pattern: [YYYY-MM-DD]_[project]_[description] and sort into folders',
  },
  {
    id: 'auto-schedule',
    icon: Calendar,
    title: 'Auto-schedule',
    description: 'Time-block your calendar',
    cycle: 'fold',
    category: 'work',
    tags: ['calendar', 'planning'],
    prompt: 'Schedule my tasks into my calendar, respecting existing meetings and my energy levels',
  },
  {
    id: 'form-filler',
    icon: ClipboardList,
    title: 'Form filler',
    description: 'Auto-fill repetitive forms',
    cycle: 'quick',
    category: 'work',
    tags: ['automation', 'forms'],
    prompt: 'Fill this form using my saved profile data and previous responses',
  },
  {
    id: 'study-buddy',
    icon: BookOpen,
    title: 'Study buddy',
    description: 'Quiz me on course material',
    cycle: 'deep',
    category: 'school',
    tags: ['learning', 'education'],
    prompt: 'Create a quiz from my notes on [topic] and explain wrong answers',
  },
  {
    id: 'clinic-handoff',
    icon: Heart,
    title: 'Clinic handoff',
    description: 'Medical appointment notes',
    cycle: 'fold',
    category: 'health',
    tags: ['medical', 'organization'],
    prompt: 'Organize my medical records and create a summary for my next doctor appointment',
  },
  {
    id: 'household-brain',
    icon: Home,
    title: 'Household brain',
    description: 'Track chores and maintenance',
    cycle: 'deep',
    category: 'home',
    tags: ['home', 'maintenance'],
    prompt: 'Create a household maintenance schedule based on my appliances and last service dates',
  },
  {
    id: 'travel-pack',
    icon: Plane,
    title: 'Travel pack & plan',
    description: 'Itinerary + packing list',
    cycle: 'fold',
    category: 'home',
    tags: ['travel', 'planning'],
    prompt: 'Generate packing list and daily itinerary for my [destination] trip based on weather and activities',
  },
  {
    id: 'money-tidy',
    icon: DollarSign,
    title: 'Money tidy',
    description: 'Categorize expenses',
    cycle: 'deep',
    category: 'home',
    tags: ['finance', 'organization'],
    prompt: 'Categorize my transactions and flag unusual spending patterns',
  },
  {
    id: 'screenshot-table',
    icon: Image,
    title: 'Screenshot→table',
    description: 'Extract data from images',
    cycle: 'quick',
    category: 'work',
    tags: ['data', 'automation'],
    prompt: 'Extract table data from this screenshot and format as CSV',
  },
  {
    id: 'dev-assist',
    icon: Code,
    title: 'Dev assist',
    description: 'Code review and docs',
    cycle: 'deep',
    category: 'work',
    tags: ['development', 'code'],
    prompt: 'Review this code for bugs and suggest improvements with explanations',
  },
]

const categories = [
  { id: 'all' as Category, label: 'All', count: tasks.length },
  { id: 'home' as Category, label: 'Home', count: tasks.filter(t => t.category === 'home').length },
  { id: 'work' as Category, label: 'Work', count: tasks.filter(t => t.category === 'work').length },
  { id: 'school' as Category, label: 'School', count: tasks.filter(t => t.category === 'school').length },
  { id: 'health' as Category, label: 'Health', count: tasks.filter(t => t.category === 'health').length },
]

const cycleLabels: Record<Cycle, string> = {
  quick: 'Quick',
  deep: 'Deep',
  fold: 'Fold',
}

const cycleColors: Record<Cycle, string> = {
  quick: 'from-blue-500 to-cyan-500',
  deep: 'from-purple-500 to-pink-500',
  fold: 'from-orange-500 to-red-500',
}

export function TasksGallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'galaxy'>('grid')
  const { showToast } = useToast()

  const filteredTasks = activeCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === activeCategory)

  const handleCopy = async (task: Task) => {
    try {
      await navigator.clipboard.writeText(task.prompt)
      setCopiedId(task.id)
      setTimeout(() => setCopiedId(null), 2000)
      showToast('Prompt copied to clipboard!', 'success')
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      showToast('Clipboard access denied', 'error')
      console.error('Copy failed:', err)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 px-4 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            What can it do?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            Real tasks, automated. Copy any prompt to try with your favorite AI.
          </p>

          {/* View Mode Toggle */}
          <div className="mt-6 inline-flex rounded-full bg-gray-100 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid3x3 className="h-4 w-4" />
              Grid View
            </button>
            <button
              onClick={() => setViewMode('galaxy')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                viewMode === 'galaxy'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Orbit className="h-4 w-4" />
              Galaxy View
            </button>
          </div>
        </motion.div>

        {/* Category Filter Toolbar - Only in Grid View */}
        {viewMode === 'grid' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 flex flex-wrap justify-center gap-3"
          >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {cat.label}
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                  activeCategory === cat.id
                    ? 'bg-white/20'
                    : 'bg-gray-100'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </motion.div>

        )}

        {/* Galaxy View */}
        {viewMode === 'galaxy' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-16"
          >
            <TaskGalaxy />
          </motion.div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredTasks.map(task => {
                  const Icon = task.icon
                  return (
                    <motion.div
                      key={task.id}
                      variants={item}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="group flex h-full flex-col hover:shadow-xl">
                        {/* Header with Icon and Cycle Badge */}
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${cycleColors[task.cycle]} shadow-lg`}
                          >
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                          <Badge
                            variant="default"
                            className="text-xs"
                          >
                            {cycleLabels[task.cycle]}
                          </Badge>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">
                            {task.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-gray-600">
                            {task.description}
                          </p>

                          {/* Tags */}
                          <div className="mt-4 flex flex-wrap gap-2">
                            {task.tags.map(tag => (
                              <span
                                key={tag}
                                className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Copy Button - Aligned at Bottom */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-center"
                            onClick={() => handleCopy(task)}
                          >
                            {copiedId === task.id ? (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                <span className="text-green-600 font-semibold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="mr-2 h-4 w-4" />
                                <span>Try it: copy prompt</span>
                              </>
                            )}
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredTasks.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 text-center"
              >
                <p className="text-gray-500">No tasks found in this category.</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

// Export for testing
export { tasks, categories, type Task, type Category, type Cycle }

