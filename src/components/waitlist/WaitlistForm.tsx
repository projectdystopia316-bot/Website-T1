import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, Download, Trash2 } from 'lucide-react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { addEntry, listEntries, clearEntries, getEntryCount } from '../../lib/db'
import { exportToCSV, exportToXLSX } from '../../lib/export'
import { pageConfig } from '../../lib/config'
import { useToast } from '../../lib/toast'

export function WaitlistForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [entryCount, setEntryCount] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  
  const { showToast } = useToast()
  const waitlistProps = pageConfig.sections.waitlist.props

  useEffect(() => {
    loadEntryCount()
    checkAdminMode()
  }, [])

  const checkAdminMode = () => {
    const params = new URLSearchParams(window.location.search)
    setIsAdmin(params.get('admin') === '1')
  }

  const loadEntryCount = async () => {
    const count = await getEntryCount()
    setEntryCount(count)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!name.trim()) {
      showToast('Please enter your name', 'error')
      return
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      await addEntry({ name: name.trim(), email: email.trim(), consent })
      
      // Reset form
      setName('')
      setEmail('')
      setConsent(false)
      
      // Update count and show success
      await loadEntryCount()
      showToast('🎉 Successfully joined the waitlist!')
    } catch (error) {
      showToast('Error saving entry. Please try again.', 'error')
      console.error('Error adding entry:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleExportCSV = async () => {
    const entries = await listEntries()
    exportToCSV(entries)
    showToast('CSV exported successfully')
  }

  const handleExportXLSX = async () => {
    const entries = await listEntries()
    exportToXLSX(entries)
    showToast('XLSX exported successfully')
  }

  const handleClearEntries = async () => {
    if (confirm('Are you sure you want to clear all entries? This cannot be undone.')) {
      await clearEntries()
      await loadEntryCount()
      showToast('All entries cleared', 'info')
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 px-4 py-32 sm:px-6 lg:px-8 lg:py-40">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl shadow-blue-500/30">
              <Mail className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <h2 className="mt-8 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            {waitlistProps?.sectionTitle as string}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            {waitlistProps?.description as string}
          </p>

          {entryCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Badge variant="gradient" className="text-sm">
                ✨ {entryCount} {entryCount === 1 ? 'person' : 'people'} already joined
              </Badge>
            </motion.div>
          )}
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-12 max-w-xl"
        >
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white py-4 pl-12 pr-4 text-base transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  placeholder="Your name"
                  aria-required="true"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white py-4 pl-12 pr-4 text-base transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  placeholder="you@example.com"
                  aria-required="true"
                />
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start justify-center pt-2">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
              />
              <label htmlFor="consent" className="ml-3 text-sm text-gray-600">
                Send me occasional updates about privacy-focused productivity tools
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Joining...' : '✨ Join the Beta'}
            </Button>
          </div>

          {/* Privacy Note */}
          <p className="mt-6 text-center text-xs text-gray-500">
            {waitlistProps?.privacyNote as string}
          </p>
        </motion.form>

        {/* Admin Panel */}
        {isAdmin && entryCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-8 max-w-xl rounded-xl border border-gray-200 bg-white/80 p-6 backdrop-blur-sm"
          >
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
              Admin Controls
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExportCSV}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                CSV
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExportXLSX}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                XLSX
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearEntries}
                className="w-full text-red-600 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

