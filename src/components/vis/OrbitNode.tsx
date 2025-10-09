import { motion } from 'framer-motion'
import { useState } from 'react'
import { useReducedMotion } from '../../lib/useReducedMotion'

interface OrbitNodeProps {
  x: number
  y: number
  r: number
  label: string
  emoji: string
  selected: boolean
  onSelect: () => void
  local: boolean
  color: string
  ariaLabel?: string
}

export function OrbitNode({
  x,
  y,
  r,
  label,
  emoji,
  selected,
  onSelect,
  local,
  color,
  ariaLabel,
}: OrbitNodeProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const reducedMotion = useReducedMotion()

  const isActive = selected || isHovered || isFocused
  const circleR = isActive ? r * 1.06 : r

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect()
    }
  }

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={ariaLabel || label}
      aria-pressed={selected}
      style={{ cursor: 'pointer', outline: 'none' }}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* Shadow/Glow */}
      <motion.circle
        cx={x}
        cy={y}
        r={circleR + 6}
        fill={color}
        opacity={isActive ? 0.25 : 0.12}
        animate={{ opacity: isActive ? 0.25 : 0.12 }}
        transition={{ duration: 0.2 }}
      />

      {/* Main Circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={circleR}
        fill="white"
        stroke={color}
        strokeWidth={selected ? 4 : isActive ? 3 : 2}
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
        animate={{
          r: circleR,
          strokeWidth: selected ? 4 : isActive ? 3 : 2,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Local/Cloud indicator dot */}
      {local && (
        <circle
          cx={x + circleR * 0.6}
          cy={y - circleR * 0.6}
          r={4}
          fill="#10b981"
          stroke="white"
          strokeWidth={1.5}
        />
      )}

      {/* Emoji Icon */}
      <motion.text
        x={x}
        y={y - 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={selected ? 26 : isActive ? 22 : 20}
        animate={{ fontSize: selected ? 26 : isActive ? 22 : 20 }}
        transition={{ duration: 0.2 }}
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {emoji}
      </motion.text>

      {/* Label Text */}
      <text
        x={x}
        y={y + circleR + 16}
        textAnchor="middle"
        fontSize={10}
        fontWeight="600"
        fill={selected ? color : '#6b7280'}
        opacity={isActive ? 1 : 0.7}
        style={{ userSelect: 'none', pointerEvents: 'none' }}
        className="transition-opacity duration-200"
      >
        {label}
      </text>

      {/* Pulse ring on selection */}
      {selected && !reducedMotion && (
        <motion.circle
          cx={x}
          cy={y}
          r={circleR}
          fill="none"
          stroke={color}
          strokeWidth={2}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      )}

      {/* Focus ring */}
      {isFocused && (
        <motion.circle
          cx={x}
          cy={y}
          r={circleR + 4}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeDasharray="4,4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
        />
      )}
    </g>
  )
}

