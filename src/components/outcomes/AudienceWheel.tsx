import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import type { Audience, AudienceFilter } from '../../lib/config'
import { useReducedMotion } from '../../lib/useReducedMotion'

interface SpokePosition {
  angleDeg: number
  x: number
  y: number
}

interface AudienceWheelProps {
  title: string
  subtitle?: string
  small?: string
  ringOpacity?: number
  audiences: Audience[]
  onSelect?: (filter: AudienceFilter) => void
}

// Compute spoke positions using polar coordinates
function computeSpokePositions(count: number, radius: number): SpokePosition[] {
  const positions: SpokePosition[] = []
  for (let i = 0; i < count; i++) {
    const angleDeg = (i / count) * 360
    const angleRad = ((angleDeg - 90) * Math.PI) / 180 // Start at top
    const x = 50 + (radius / 100) * 50 * Math.cos(angleRad) // Percentage-based
    const y = 50 + (radius / 100) * 50 * Math.sin(angleRad)
    positions.push({ angleDeg, x, y })
  }
  return positions
}

export function AudienceWheel({
  title,
  subtitle,
  small,
  ringOpacity = 0.2,
  audiences,
  onSelect,
}: AudienceWheelProps) {
  const [activeAudience, setActiveAudience] = useState<Audience | null>(null)
  const [prevActiveIndex, setPrevActiveIndex] = useState<number>(-1)
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const [showTrail, setShowTrail] = useState(false)
  const reducedMotion = useReducedMotion()
  const spokesRef = useRef<(HTMLButtonElement | null)[]>([])

  const spokePositions = computeSpokePositions(audiences.length, 90) // 90% radius

  // Generate SVG arc path between two spokes
  const generateTrailPath = useCallback((fromIndex: number, toIndex: number): string => {
    if (fromIndex === -1 || toIndex === -1) return ''
    
    const radius = 270 // Match ring radius
    const centerX = 320
    const centerY = 320
    
    const fromAngle = ((fromIndex / audiences.length) * 360 - 90) * (Math.PI / 180)
    const toAngle = ((toIndex / audiences.length) * 360 - 90) * (Math.PI / 180)
    
    const startX = centerX + radius * Math.cos(fromAngle)
    const startY = centerY + radius * Math.sin(fromAngle)
    const endX = centerX + radius * Math.cos(toAngle)
    const endY = centerY + radius * Math.sin(toAngle)
    
    // Calculate if we should go the short way or long way around the circle
    let angleDiff = toIndex - fromIndex
    if (Math.abs(angleDiff) > audiences.length / 2) {
      angleDiff = angleDiff > 0 ? angleDiff - audiences.length : angleDiff + audiences.length
    }
    
    const largeArc = Math.abs(angleDiff) > audiences.length / 2 ? 1 : 0
    const sweep = angleDiff > 0 ? 1 : 0
    
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${endX} ${endY}`
  }, [audiences.length])

  const handleSpokeClick = useCallback((audience: Audience, index: number) => {
    setPrevActiveIndex(activeIndex)
    setActiveIndex(index)
    setActiveAudience(audience)
    setFocusedIndex(index)
    
    // Trigger trail animation (disabled if reduced motion)
    if (!reducedMotion && activeIndex !== -1) {
      setShowTrail(true)
      setTimeout(() => setShowTrail(false), 1000) // Trail fades after 1s
    }
  }, [activeIndex, reducedMotion])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        const nextIndex = (index + 1) % audiences.length
        spokesRef.current[nextIndex]?.focus()
        setFocusedIndex(nextIndex)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        const prevIndex = (index - 1 + audiences.length) % audiences.length
        spokesRef.current[prevIndex]?.focus()
        setFocusedIndex(prevIndex)
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleSpokeClick(audiences[index], index)
      }
    },
    [audiences, handleSpokeClick]
  )

  const handleCTAClick = () => {
    if (activeAudience && onSelect) {
      onSelect(activeAudience.filter)
      // Scroll handled by parent (App.tsx)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white px-4 py-32 sm:px-6 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              {subtitle}
            </p>
          )}
          {small && (
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">
              {small}
            </p>
          )}
        </motion.div>

        {/* Desktop: Radial Wheel */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto ferris-wheel"
            style={{ width: '640px', height: '640px' }}
          >
            {/* Rotating Ring */}
            <div
              className={`rotating-ring ${reducedMotion ? 'reduced-motion' : ''}`}
              style={{ opacity: ringOpacity }}
            />
            
            {/* Subtle Inner Ring - Counter-rotating */}
            <div
              className={`counter-rotating-ring ${reducedMotion ? 'reduced-motion' : ''}`}
              style={{ opacity: ringOpacity * 0.5 }}
            />

            {/* SVG Layer for Trail Arc */}
            <svg
              className="pointer-events-none absolute inset-0"
              width="640"
              height="640"
              viewBox="0 0 640 640"
            >
              {/* Trail Arc - animated drawing from prev to current spoke */}
              {showTrail && prevActiveIndex !== -1 && activeIndex !== -1 && (
                <motion.path
                  d={generateTrailPath(prevActiveIndex, activeIndex)}
                  stroke="url(#trailGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    pathLength: { duration: 0.6, ease: 'easeInOut' },
                    opacity: { duration: 0.3 }
                  }}
                />
              )}
              
              {/* Gradient definition for trail */}
              <defs>
                <linearGradient id="trailGradient" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#9a7bff" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#1fe0b4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#9a7bff" stopOpacity="0.3" />
                </linearGradient>
                <radialGradient id="spokeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#9a7bff" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#1fe0b4" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>

            {/* Brand Glow Behind Active Spoke */}
            {activeIndex !== -1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
                className="pointer-events-none absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${spokePositions[activeIndex].x}%`,
                  top: `${spokePositions[activeIndex].y}%`,
                  background: 'radial-gradient(circle, rgba(154, 123, 255, 0.3) 0%, rgba(31, 224, 180, 0.2) 40%, transparent 70%)',
                  filter: 'blur(20px)',
                  zIndex: 5,
                }}
              />
            )}

            {/* Center Content */}
            <div className="absolute left-1/2 top-1/2 z-20 flex h-80 w-80 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-gray-200 bg-white p-8 shadow-2xl">
              <AnimatePresence mode="wait">
                {!activeAudience ? (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="text-center"
                  >
                    <div className="mb-4 text-5xl">👋</div>
                    <h3 className="text-2xl font-bold text-gray-900">Choose your world</h3>
                    <p className="mt-3 text-sm text-gray-600">
                      Click a role to see personalized benefits
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeAudience.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-full w-full flex-col items-center justify-center text-center"
                  >
                    <div className="mb-4 text-5xl">{activeAudience.icon}</div>
                    <h3 className="mb-6 text-2xl font-bold text-gray-900">
                      {activeAudience.label}
                    </h3>
                    <div className="mb-8 flex justify-center gap-3">
                      {activeAudience.benefits.map((benefit, idx) => (
                        <Badge
                          key={idx}
                          variant="default"
                          className="border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 whitespace-nowrap"
                        >
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      onClick={handleCTAClick}
                      className="gap-2 shadow-lg hover:shadow-xl"
                    >
                      See example workflow
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Spokes - Ferris Wheel Rotation */}
            <div
              role="tablist"
              aria-label="Audience selector"
              className={`absolute inset-0 ferris-spokes ${reducedMotion ? 'reduced-motion' : ''}`}
            >
              {audiences.map((audience, index) => {
                const position = spokePositions[index]
                const isActive = activeAudience?.id === audience.id

                return (
                  <button
                    key={audience.id}
                    ref={(el) => (spokesRef.current[index] = el)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`${audience.label}. Benefits: ${audience.benefits.join('; ')}.`}
                    title={`${audience.label}\n• ${audience.benefits.join('\n• ')}`}
                    tabIndex={focusedIndex === index || (focusedIndex === -1 && index === 0) ? 0 : -1}
                    onClick={() => handleSpokeClick(audience, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`group absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-white/40 hover:border-blue-400/60 hover:bg-white/80 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ferris-cabin ${isActive ? 'active' : ''}`}
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      ...(isActive && {
                        boxShadow: `0 0 0 3px rgba(59, 130, 246, 0.5), 0 10px 30px rgba(59, 130, 246, 0.3)`,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      }),
                    }}
                  >
                    <span className="text-3xl transition-transform group-hover:scale-110">
                      {audience.icon}
                    </span>
                    <span className="text-[11px] font-semibold leading-tight text-gray-700">
                      {audience.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Mobile & Tablet: Horizontal Carousel */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Center Panel - Shows above on mobile */}
            {activeAudience && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto mb-8 max-w-md rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-xl"
              >
                <div className="text-center">
                  <div className="mb-4 text-5xl">{activeAudience.icon}</div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    {activeAudience.label}
                  </h3>
                  <div className="mb-6 flex justify-center gap-3">
                    {activeAudience.benefits.map((benefit, idx) => (
                      <Badge
                        key={idx}
                        variant="default"
                        className="border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 whitespace-nowrap"
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    onClick={handleCTAClick}
                    className="w-full gap-2"
                  >
                    See example workflow
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Scrollable Spokes */}
            <div className="relative -mx-4 overflow-x-auto px-4 pb-6">
              <div className="flex gap-4 snap-x snap-mandatory">
                {audiences.map((audience, index) => {
                  const isActive = activeAudience?.id === audience.id

                  return (
                    <button
                      key={audience.id}
                      onClick={() => handleSpokeClick(audience, index)}
                      title={`${audience.label}\n• ${audience.benefits.join('\n• ')}`}
                      className="group flex min-w-[140px] snap-center flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:scale-[1.02] hover:border-blue-400 hover:shadow-lg"
                      style={{
                        ...(isActive && {
                          borderColor: '#3b82f6',
                          boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(59, 130, 246, 0.2)',
                        }),
                      }}
                    >
                      <span className="text-4xl">{audience.icon}</span>
                      <span className="text-center text-sm font-semibold text-gray-800">
                        {audience.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {!activeAudience && (
              <p className="mt-4 text-center text-sm text-gray-500">
                Tap a role to see personalized benefits
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        .rotating-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 540px;
          height: 540px;
          margin-left: -270px;
          margin-top: -270px;
          border: 3px solid rgba(147, 197, 253, 0.3);
          border-radius: 50%;
          animation: rotate-ring 25s linear infinite;
          pointer-events: none;
          z-index: 10;
        }

        .rotating-ring::before {
          content: '';
          position: absolute;
          inset: -6px;
          border: 2px dashed rgba(147, 197, 253, 0.2);
          border-radius: 50%;
        }

        .rotating-ring::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(
            to bottom,
            rgba(59, 130, 246, 0.15),
            transparent
          );
          border-radius: 270px 270px 0 0;
        }

        .rotating-ring.reduced-motion {
          animation: none;
        }

        .counter-rotating-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 420px;
          height: 420px;
          margin: -210px 0 0 -210px;
          border: 1px solid rgba(31, 224, 180, 0.08);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(31, 224, 180, 0.02) 0%,
            transparent 70%
          );
          animation: counter-rotate-ring 30s linear infinite;
        }

        .counter-rotating-ring.reduced-motion {
          animation: none;
        }

        /* Ferris Wheel Effect */
        .ferris-spokes {
          animation: ferris-wheel-rotate 45s linear infinite;
          transform-origin: center;
        }

        .ferris-spokes.reduced-motion {
          animation: none;
        }

        .ferris-cabin {
          animation: ferris-cabin-counter-rotate 45s linear infinite;
          transform-origin: center;
        }

        .ferris-cabin.reduced-motion {
          animation: none;
        }

        /* Active state with counter-rotation */
        .ferris-cabin.active {
          animation: ferris-cabin-counter-rotate 45s linear infinite;
          transform: translate(-50%, -50%) scale(1.15) !important;
        }

        .ferris-cabin.active.reduced-motion {
          animation: none;
        }

        @keyframes rotate-ring {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes counter-rotate-ring {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes ferris-wheel-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ferris-cabin-counter-rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }

        /* Custom scrollbar for mobile carousel */
        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </section>
  )
}
