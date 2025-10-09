import type { GalaxySector, GalaxyNode } from '../components/vis/types'

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type SectorKey = 'home' | 'work' | 'school' | 'health'
export type OrbitKey = 'content' | 'actions' | 'outputs'

// ============================================================================
// PROMPT LIBRARY
// ============================================================================

export const PROMPTS = {
  clean: 'Tidy my desktop: group by project, move screenshots to /Screenshots, delete duplicates.',
  find: 'Find the PDF with cardiology slides downloaded last week and open it.',
  rename: 'Rename files in Downloads by content and move to the correct course folders.',
  schedule: 'Time-block these tasks across this week with 45-min focus blocks and 10-min breaks.',
  form: 'Fill this onboarding form with my saved profile, pause to confirm anything sensitive.',
  study: 'From these notes, generate 20 flashcards and a 5-day study plan.',
  clinic: 'Create a SBAR handoff from these notes. Keep PHI local; ask before any cloud use.',
  home: 'From these 3 recipes, build a grocery list by aisle and a chores rota for the week.',
  travel: 'Make a 3-day itinerary from these emails and a packing list for 2 adults.',
  money: 'Extract totals from these receipts and export a CSV. Tag by project.',
  ocr: 'From this screenshot, produce a clean table and copy to clipboard.',
  dev: 'Explain this stack trace and provide a 3-step fix I can try.',
}

// ============================================================================
// SECTOR COLORS
// ============================================================================

export const SECTOR_COLORS = {
  home: { base: 'var(--brand-2)', ring: '#1fe0b4' },
  work: { base: 'var(--brand)', ring: '#9a7bff' },
  school: { base: '#3b82f6', ring: '#60a5fa' },
  health: { base: '#10b981', ring: '#34d399' },
}

// ============================================================================
// GALAXY STRUCTURE
// ============================================================================

export const GALAXY = {
  home: {
    content: [{ id: 'shots', label: 'Screenshots', emoji: '📸', local: true }],
    actions: [
      { id: 'rename', label: 'Rename/Sort', emoji: '🏷️', local: true },
      { id: 'search', label: 'Context Search', emoji: '🔎', local: true },
    ],
    outputs: [{ id: 'checklist', label: 'Checklist', emoji: '✅', local: true }],
    map: { shots: 'ocr', rename: 'rename', search: 'find', checklist: 'clean' },
  },
  work: {
    content: [
      { id: 'emails', label: 'Emails', emoji: '✉️', local: true },
      { id: 'calendar', label: 'Calendar', emoji: '📆', local: true },
    ],
    actions: [
      { id: 'timeblock', label: 'Time-block', emoji: '⏱️', local: true },
      { id: 'formfill', label: 'Form Fill', emoji: '🧾', local: true },
    ],
    outputs: [
      { id: 'draft', label: 'Draft reply', emoji: '✍️', local: true },
      { id: 'csv', label: 'Expense CSV', emoji: '📈', local: true },
    ],
    map: {
      emails: 'find',
      calendar: 'schedule',
      timeblock: 'schedule',
      formfill: 'form',
      draft: 'find',
      csv: 'money',
    },
  },
  school: {
    content: [
      { id: 'notes', label: 'Notes', emoji: '🗒️', local: true },
      { id: 'pdfs', label: 'PDFs', emoji: '📄', local: true },
    ],
    actions: [
      { id: 'summarize', label: 'Summarize', emoji: '🧠', local: true },
      { id: 'ocr-school', label: 'OCR', emoji: '📋', local: true },
    ],
    outputs: [{ id: 'flashcards', label: 'Flashcards', emoji: '🗂️', local: true }],
    map: {
      notes: 'study',
      pdfs: 'study',
      summarize: 'study',
      'ocr-school': 'ocr',
      flashcards: 'study',
    },
  },
  health: {
    content: [{ id: 'notes-med', label: 'Patient Notes', emoji: '📝', local: true }],
    actions: [{ id: 'summarize-med', label: 'Summarize', emoji: '🧠', local: true }],
    outputs: [{ id: 'handoff', label: 'Handoff', emoji: '🩺', local: true }],
    map: {
      'notes-med': 'clinic',
      'summarize-med': 'clinic',
      handoff: 'clinic',
    },
  },
}

// ============================================================================
// GENERATE GALAXY NODES FROM STRUCTURE
// ============================================================================

function generateNodesFromGalaxy(): GalaxyNode[] {
  const nodes: GalaxyNode[] = []

  Object.entries(GALAXY).forEach(([sectorKey, sectorData]) => {
    const sector = sectorKey as SectorKey

    // Process each orbit
    Object.entries(sectorData).forEach(([orbitKey, orbitData]) => {
      if (orbitKey === 'map') return // Skip the map object

      const orbit = orbitKey as OrbitKey
      const orbitNodes = orbitData as Array<{
        id: string
        label: string
        emoji: string
        local: boolean
      }>

      orbitNodes.forEach(nodeData => {
        const promptKey = sectorData.map[nodeData.id as keyof typeof sectorData.map]
        const prompt = PROMPTS[promptKey as keyof typeof PROMPTS] || 'No prompt available'

        nodes.push({
          id: nodeData.id,
          title: nodeData.label,
          description: `${orbit.charAt(0).toUpperCase() + orbit.slice(0, -1)} for ${sector}`, // e.g., "Content for home"
          category: sector as any,
          icon: nodeData.emoji,
          prompt: prompt,
          tags: [orbit, sector, nodeData.local ? 'local' : 'cloud'],
          angle: 0, // Will be calculated by TaskGalaxy
          radius: 0, // Will be calculated by TaskGalaxy
        })
      })
    })
  })

  return nodes
}

const allGeneratedNodes = generateNodesFromGalaxy()

// ============================================================================
// GALAXY SECTORS (Legacy format for compatibility)
// ============================================================================

export const galaxySectors: GalaxySector[] = [
  {
    id: 'home',
    label: 'Home',
    color: 'from-cyan-400 to-teal-400',
    colorHex: SECTOR_COLORS.home.ring,
    nodes: allGeneratedNodes.filter(n => n.category === 'home'),
  },
  {
    id: 'work',
    label: 'Work',
    color: 'from-purple-500 to-pink-500',
    colorHex: SECTOR_COLORS.work.ring,
    nodes: allGeneratedNodes.filter(n => n.category === 'work'),
  },
  {
    id: 'school',
    label: 'School',
    color: 'from-blue-500 to-cyan-500',
    colorHex: SECTOR_COLORS.school.ring,
    nodes: allGeneratedNodes.filter(n => n.category === 'school'),
  },
  {
    id: 'health',
    label: 'Health',
    color: 'from-emerald-500 to-green-500',
    colorHex: SECTOR_COLORS.health.ring,
    nodes: allGeneratedNodes.filter(n => n.category === 'health'),
  },
]

export const allNodes = allGeneratedNodes

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get nodes by sector and orbit
 */
export function getNodesBySectorOrbit(sector: SectorKey, orbit: OrbitKey): GalaxyNode[] {
  return allNodes.filter(
    n => n.category === sector && n.tags.includes(orbit)
  )
}

/**
 * Get prompt for a node
 */
export function getNodePrompt(nodeId: string): string {
  const node = allNodes.find(n => n.id === nodeId)
  return node?.prompt || ''
}

/**
 * Get related nodes in same sector
 */
export function getRelatedNodes(nodeId: string, limit = 2): GalaxyNode[] {
  const node = allNodes.find(n => n.id === nodeId)
  if (!node) return []

  return allNodes
    .filter(n => n.category === node.category && n.id !== nodeId)
    .slice(0, limit)
}

