import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Cloud, HardDrive } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Badge } from '../ui/Badge'
import { GALAXY, PROMPTS } from '../../data/galaxy'

type SectorKey = 'home' | 'work' | 'school' | 'health'
type LayerKey = 'content' | 'actions' | 'outputs'

interface NodeInfo {
  id: string
  label: string
  layer: LayerKey
  emoji: string
  local: boolean
}

interface SidePanelProps {
  node?: NodeInfo
  sector?: SectorKey
  prompt?: string
  onClose?: () => void
  onCopy?: () => void
}

interface RelatedPrompt {
  id: string
  label: string
  emoji: string
  prompt: string
}

export function SidePanel({ node, sector, prompt, onClose, onCopy }: SidePanelProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'success'>('idle')
  const [relatedPrompts, setRelatedPrompts] = useState<RelatedPrompt[]>([])

  useEffect(() => {
    if (node && sector) {
      // Get related prompts from same sector
      const sectorData = GALAXY[sector]
      if (!sectorData) return

      const related: RelatedPrompt[] = []
      
      // Collect nodes from all layers in this sector
      Object.entries(sectorData).forEach(([layerKey, layerData]) => {
        if (layerKey === 'map' || !Array.isArray(layerData)) return
        
        layerData.forEach((item: any) => {
          if (item.id !== node.id) {
            const promptKey = sectorData.map[item.id as keyof typeof sectorData.map]
            const promptText = PROMPTS[promptKey as keyof typeof PROMPTS] || ''
            related.push({
              id: item.id,
              label: item.label,
              emoji: item.emoji,
              prompt: promptText,
            })
          }
        })
      })

      setRelatedPrompts(related.slice(0, 2))
    }
  }, [node, sector])

  const handleCopy = async () => {
    if (!node || !prompt) return

    setCopyState('copying')

    try {
      await navigator.clipboard.writeText(prompt)
      setCopyState('success')
      
      // Emit analytics event
      window.dispatchEvent(
        new CustomEvent('prompt_copied', {
          detail: {
            id: node.id,
            sector: sector,
          },
        })
      )

      // Call optional onCopy callback
      onCopy?.()

      // Reset after animation
      setTimeout(() => setCopyState('idle'), 2500)
    } catch (err) {
      console.error('Copy failed:', err)
      setCopyState('idle')
    }
  }

  const handleRelatedCopy = async (relatedPrompt: RelatedPrompt) => {
    try {
      await navigator.clipboard.writeText(relatedPrompt.prompt)
      
      window.dispatchEvent(
        new CustomEvent('prompt_copied', {
          detail: {
            id: relatedPrompt.id,
            sector: sector,
          },
        })
      )
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const layerLabels: Record<LayerKey, string> = {
    content: 'Content',
    actions: 'Action',
    outputs: 'Output',
  }

  const layerColors: Record<LayerKey, string> = {
    content: 'from-blue-500 to-cyan-500',
    actions: 'from-purple-500 to-pink-500',
    outputs: 'from-orange-500 to-red-500',
  }

  const sectorColors: Record<SectorKey, string> = {
    home: 'from-cyan-400 to-teal-400',
    work: 'from-purple-500 to-pink-500',
    school: 'from-blue-500 to-cyan-500',
    health: 'from-emerald-500 to-green-500',
  }

  return (
    <>
      <AnimatePresence>
        {node && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-20 bottom-0 z-40 w-full max-w-md overflow-y-auto border-l border-gray-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 p-6 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${sector ? sectorColors[sector] : 'from-gray-400 to-gray-600'} text-3xl shadow-lg`}
                  >
                    {node.emoji}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {node.label}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {sector && (
                        <Badge variant="default" className="text-xs capitalize">
                          {sector}
                        </Badge>
                      )}
                      <Badge
                        variant="gradient"
                        className={`text-xs bg-gradient-to-r ${layerColors[node.layer]}`}
                      >
                        {layerLabels[node.layer]}
                      </Badge>
                    </div>
                  </div>
                </div>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    aria-label="Close panel"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="p-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                  {node.local ? (
                    <>
                      <HardDrive className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-gray-700">Local by default</span>
                    </>
                  ) : (
                    <>
                      <Cloud className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-medium text-gray-700">Cloud opt-in</span>
                    </>
                  )}
                </div>
              </div>

              {/* Prompt */}
              {prompt && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    AI Prompt
                  </h4>
                  <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm leading-relaxed text-gray-700">
                      {prompt}
                    </p>
                  </div>
                </div>
              )}

              {/* Copy Button with CSS-only animation */}
              <div className="mt-6">
                <button
                  onClick={handleCopy}
                  disabled={copyState !== 'idle'}
                  className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-90"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {copyState === 'idle' && (
                      <>
                        <Copy className="h-5 w-5" />
                        Copy Prompt
                      </>
                    )}
                    {copyState === 'copying' && (
                      <>
                        <span className="copy-spinner" />
                        Copying...
                      </>
                    )}
                    {copyState === 'success' && (
                      <>
                        <span className="copy-checkmark">✓</span>
                        Copied!
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Help Text */}
              <p className="mt-4 text-center text-xs text-gray-500">
                Use this prompt with ChatGPT, Claude, or your favorite AI
              </p>

              {/* Related Prompts */}
              {relatedPrompts.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Related Tasks
                  </h4>
                  <div className="mt-3 space-y-2">
                    {relatedPrompts.map(related => (
                      <div
                        key={related.id}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3"
                      >
                        <span className="text-xl">{related.emoji}</span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {related.label}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRelatedCopy(related)}
                          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
                          aria-label={`Copy ${related.label} prompt`}
                          title="Copy prompt"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS-only animations */}
      <style>{`
        .copy-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        .copy-checkmark {
          display: inline-block;
          font-size: 20px;
          animation: checkmark 0.3s ease-in-out;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}

