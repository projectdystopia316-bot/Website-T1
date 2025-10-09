import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { GalaxyNode, Category } from './types'
import {
  polarToCartesian,
  arcPath,
  distributeOnArc,
  orbitRadii,
} from './polar'
import { OrbitNode } from './OrbitNode'
import { SidePanel } from './SidePanel'
import { galaxySectors, GALAXY, PROMPTS } from '../../data/galaxy'
import { useReducedMotion } from '../../lib/useReducedMotion'

interface TaskGalaxyProps {
  onSelect?: (node: GalaxyNode | null) => void
}

// Galaxy dimensions
const SVG_WIDTH = 1100
const SVG_HEIGHT = 800
const CENTER_X = SVG_WIDTH / 2
const CENTER_Y = SVG_HEIGHT / 2
const CORE_RADIUS = 100

// Orbit configuration
const BASE_ORBIT = 170
const ORBIT_GAP = 85
const orbits = orbitRadii(BASE_ORBIT, ORBIT_GAP)

export function TaskGalaxy({ onSelect }: TaskGalaxyProps) {
  const [selectedSector, setSelectedSector] = useState<Category | null>(null)
  const [selectedNode, setSelectedNode] = useState<GalaxyNode | null>(null)
  const [selectedPrompt, setSelectedPrompt] = useState<string>('')
  const [hoveredSector, setHoveredSector] = useState<Category | null>(null)
  const reducedMotion = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)

  // Listen for external sector selection events (from AudienceWheel)
  useEffect(() => {
    const handleExternalSectorSelect = (event: Event) => {
      const customEvent = event as CustomEvent<{ sector: Category }>
      if (customEvent.detail?.sector) {
        setSelectedSector(customEvent.detail.sector)
        setSelectedNode(null)
      }
    }

    window.addEventListener('select_galaxy_sector', handleExternalSectorSelect)
    return () => {
      window.removeEventListener('select_galaxy_sector', handleExternalSectorSelect)
    }
  }, [])

  const handleSectorClick = (sectorId: Category | null) => {
    setSelectedSector(sectorId)
    setSelectedNode(null) // Clear node selection when changing sector
    
    // Emit analytics event
    window.dispatchEvent(
      new CustomEvent('galaxy_sector', {
        detail: { sector: sectorId },
      })
    )
  }

  const handleSectorKeyDown = (e: React.KeyboardEvent, sectorId: Category | null) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSectorClick(sectorId)
    }
  }

  const handleNodeClick = (node: GalaxyNode) => {
    setSelectedNode(node)
    onSelect?.(node)
    
    // Compute prompt from GALAXY map
    const category = node.category as 'home' | 'work' | 'school' | 'health'
    const sectorData = GALAXY[category]
    if (sectorData && sectorData.map) {
      const promptKey = sectorData.map[node.id as keyof typeof sectorData.map]
      const prompt = PROMPTS[promptKey as keyof typeof PROMPTS] || node.prompt || ''
      setSelectedPrompt(prompt)
    } else {
      setSelectedPrompt(node.prompt || '')
    }
    
    // Emit analytics event
    window.dispatchEvent(
      new CustomEvent('galaxy_node', {
        detail: {
          nodeId: node.id,
          nodeTitle: node.title,
          category: node.category,
        },
      })
    )
  }

  const handleClosePanel = () => {
    setSelectedNode(null)
    setSelectedPrompt('')
    onSelect?.(null)
  }

  // Distribute nodes across three orbits per sector
  const getNodePositions = (sectorIndex: number, nodes: GalaxyNode[]) => {
    const sectorAngle = 90 // Each sector gets 90°
    const thetaStart = sectorIndex * sectorAngle
    const thetaEnd = thetaStart + sectorAngle

    const positions: Array<{ node: GalaxyNode; x: number; y: number; orbit: string }> = []
    
    // Group nodes by orbit type (content, actions, outputs)
    const nodesByOrbit = {
      contentR: nodes.filter(n => n.tags.includes('content')),
      actionsR: nodes.filter(n => n.tags.includes('actions')),
      outputsR: nodes.filter(n => n.tags.includes('outputs')),
    }

    // Distribute each orbit's nodes using distributeOnArc
    Object.entries(nodesByOrbit).forEach(([orbitKey, orbitNodes]) => {
      const orbitR = orbits[orbitKey as keyof typeof orbits]
      const angles = distributeOnArc(thetaStart, thetaEnd, orbitNodes.length)
      
      orbitNodes.forEach((node, idx) => {
        const theta = angles[idx]
        const pos = polarToCartesian(CENTER_X, CENTER_Y, orbitR, theta)
        positions.push({ node, x: pos.x, y: pos.y, orbit: orbitKey })
      })
    })

    return positions
  }

  return (
    <div className="relative">
      {/* Sector Toolbar */}
      <div className="mb-8 flex flex-wrap justify-center gap-3" role="toolbar" aria-label="Galaxy sector filters">
        <button
          onClick={() => handleSectorClick(null)}
          onKeyDown={e => handleSectorKeyDown(e, null)}
          role="button"
          tabIndex={0}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
            selectedSector === null
              ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200'
          }`}
          aria-pressed={selectedSector === null}
        >
          All
        </button>
        {galaxySectors.map(sector => (
          <button
            key={sector.id}
            onClick={() => handleSectorClick(sector.id)}
            onKeyDown={e => handleSectorKeyDown(e, sector.id)}
            role="button"
            tabIndex={0}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              selectedSector === sector.id
                ? `bg-gradient-to-r ${sector.color} text-white shadow-lg scale-105`
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200'
            }`}
            aria-pressed={selectedSector === sector.id}
            aria-label={`${sector.label} sector (${sector.nodes.length} tasks)`}
          >
            {sector.label}
          </button>
        ))}
      </div>

      {/* Galaxy Visualization */}
      <div className="relative mx-auto max-w-5xl overflow-visible">
        <motion.svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="h-full w-full overflow-visible"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Orbit rings */}
          {[orbits.contentR, orbits.actionsR, orbits.outputsR].map((r, i) => (
            <motion.circle
              key={i}
              cx={CENTER_X}
              cy={CENTER_Y}
              r={r}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={1}
              strokeDasharray="8,8"
              opacity={0.3}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, delay: i * 0.15 }}
            />
          ))}

          {/* Sector wedges (background) */}
          {galaxySectors.map((sector, idx) => {
            const sectorAngle = 90
            const thetaStart = galaxySectors.indexOf(sector) * sectorAngle
            const thetaEnd = thetaStart + sectorAngle
            const isHovered = hoveredSector === sector.id
            const isSelected = selectedSector === sector.id
            const isVisible = selectedSector === null || selectedSector === sector.id

            return (
              <motion.g
                key={`sector-${sector.id}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: isVisible ? 1 : 0.3,
                }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
                onMouseEnter={() => setHoveredSector(sector.id)}
                onMouseLeave={() => setHoveredSector(null)}
              >
                {/* Sector wedge background */}
                <path
                  d={arcPath(
                    CENTER_X,
                    CENTER_Y,
                    CORE_RADIUS,
                    orbits.outputsR,
                    thetaStart,
                    thetaEnd
                  )}
                  fill={sector.colorHex}
                  opacity={isSelected ? 0.08 : isHovered ? 0.06 : 0.03}
                  className="transition-opacity duration-300"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSectorClick(sector.id)}
                />

                {/* Sector border lines */}
                {[thetaStart, thetaEnd].map((angle, lineIdx) => {
                  const inner = polarToCartesian(CENTER_X, CENTER_Y, CORE_RADIUS, angle)
                  const outer = polarToCartesian(CENTER_X, CENTER_Y, orbits.outputsR, angle)
                  return (
                    <line
                      key={lineIdx}
                      x1={inner.x}
                      y1={inner.y}
                      x2={outer.x}
                      y2={outer.y}
                      stroke={sector.colorHex}
                      strokeWidth={1}
                      opacity={isVisible ? 0.2 : 0.05}
                      className="transition-opacity duration-300"
                    />
                  )
                })}
              </motion.g>
            )
          })}

          {/* Center core */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
          >
            {/* Core circle */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r={CORE_RADIUS}
              fill="url(#coreGradient)"
            />

            {/* Pulsing ring */}
            <motion.circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r={CORE_RADIUS}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={3}
              opacity={0.5}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
            />

            {/* Logo */}
            <text
              x={CENTER_X}
              y={CENTER_Y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={40}
              fontWeight="bold"
              fill="#1f2937"
            >
              Δ
            </text>
            <text
              x={CENTER_X}
              y={CENTER_Y + 35}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={12}
              fontWeight="600"
              fill="#6b7280"
            >
              DYSTOPIA
            </text>
          </motion.g>

          {/* Orbit rings with sector-aware opacity */}
          {[orbits.contentR, orbits.actionsR, orbits.outputsR].map((r, i) => (
            <motion.circle
              key={`orbit-${i}`}
              cx={CENTER_X}
              cy={CENTER_Y}
              r={r}
              fill="none"
              stroke={hoveredSector ? galaxySectors.find(s => s.id === hoveredSector)?.colorHex : '#e5e7eb'}
              strokeWidth={hoveredSector ? 2 : 1}
              strokeDasharray="8,8"
              opacity={hoveredSector ? 0.4 : 0.3}
              className="transition-all duration-300"
            />
          ))}

          {/* Sectors with nodes */}
          {galaxySectors.map((sector, sectorIdx) => {
            const nodePositions = getNodePositions(sectorIdx, sector.nodes)
            const isVisible = selectedSector === null || selectedSector === sector.id

            return (
              <motion.g
                key={sector.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: isVisible ? 1 : 0.95,
                  opacity: isVisible ? 1 : 0.25,
                  rotate: reducedMotion ? 0 : [0, 2.5, 0, -2.5, 0],
                }}
                transition={{
                  scale: { delay: sectorIdx * 0.15, duration: 0.5 },
                  opacity: { delay: sectorIdx * 0.15, duration: 0.5 },
                  rotate: {
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: 'mirror',
                  },
                }}
                style={{ 
                  transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
                  pointerEvents: isVisible ? 'auto' : 'none',
                }}
              >
                {/* Nodes */}
                {nodePositions.map(({ node, x, y, orbit }, nodeIdx) => {
                  const orbitType = orbit === 'contentR' ? 'content' : orbit === 'actionsR' ? 'action' : 'output'
                  const nodeRadius = 26
                  const isLocal = node.tags.includes('local')
                  
                  return (
                    <motion.g
                      key={node.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: isVisible ? sectorIdx * 0.1 + nodeIdx * 0.05 : 0,
                        duration: 0.3,
                      }}
                    >
                      <OrbitNode
                        x={x}
                        y={y}
                        r={nodeRadius}
                        label={node.title}
                        emoji={node.icon}
                        selected={selectedNode?.id === node.id}
                        onSelect={() => handleNodeClick(node)}
                        local={isLocal}
                        color={sector.colorHex}
                        ariaLabel={`${node.title} — ${orbitType} node (${sector.label} sector)`}
                      />
                    </motion.g>
                  )
                })}

                {/* Connection lines */}
                {nodePositions.map(({ node, x, y }) => (
                  <motion.line
                    key={`line-${node.id}`}
                    x1={CENTER_X}
                    y1={CENTER_Y}
                    x2={x}
                    y2={y}
                    stroke={sector.colorHex}
                    strokeWidth={selectedNode?.id === node.id ? 2 : 1}
                    opacity={selectedNode?.id === node.id ? 0.5 : isVisible ? 0.1 : 0.05}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: sectorIdx * 0.1 }}
                    className="transition-opacity duration-300"
                  />
                ))}
              </motion.g>
            )
          })}

          {/* Gradients */}
          <defs>
            <radialGradient id="coreGradient">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#a78bfa" />
            </radialGradient>
          </defs>
        </motion.svg>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {galaxySectors.map(sector => (
            <div key={sector.id} className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full bg-gradient-to-r ${sector.color}`}
              />
              <span className="text-sm text-gray-600">{sector.label}</span>
              <span className="text-xs text-gray-400">
                ({sector.nodes.length})
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Side Panel */}
      <SidePanel
        node={
          selectedNode
            ? {
                id: selectedNode.id,
                label: selectedNode.title,
                layer: (selectedNode.tags.includes('content')
                  ? 'content'
                  : selectedNode.tags.includes('actions')
                  ? 'actions'
                  : 'outputs') as 'content' | 'actions' | 'outputs',
                emoji: selectedNode.icon,
                local: selectedNode.tags.includes('local'),
              }
            : undefined
        }
        sector={selectedNode?.category as 'home' | 'work' | 'school' | 'health' | undefined}
        prompt={selectedPrompt}
        onClose={handleClosePanel}
      />
    </div>
  )
}

