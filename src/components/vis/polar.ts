/**
 * Convert polar to Cartesian coordinates
 * @param cx - Center X
 * @param cy - Center Y
 * @param r - Radius
 * @param theta - Angle in degrees (0° = top, clockwise)
 */
export function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  theta: number
): { x: number; y: number } {
  const angleRad = ((theta - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  }
}

/**
 * Generate SVG path for sector arc/wedge
 * @param cx - Center X
 * @param cy - Center Y
 * @param rInner - Inner radius
 * @param rOuter - Outer radius
 * @param thetaStart - Start angle in degrees
 * @param thetaEnd - End angle in degrees
 */
export function arcPath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  thetaStart: number,
  thetaEnd: number
): string {
  const startOuter = polarToCartesian(cx, cy, rOuter, thetaStart)
  const endOuter = polarToCartesian(cx, cy, rOuter, thetaEnd)
  const startInner = polarToCartesian(cx, cy, rInner, thetaEnd)
  const endInner = polarToCartesian(cx, cy, rInner, thetaStart)

  const largeArc = thetaEnd - thetaStart > 180 ? 1 : 0

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}`,
    'Z',
  ].join(' ')
}

/**
 * Distribute angles evenly along an arc
 * @param thetaStart - Start angle in degrees
 * @param thetaEnd - End angle in degrees
 * @param count - Number of points to distribute
 * @returns Array of angles in degrees
 */
export function distributeOnArc(
  thetaStart: number,
  thetaEnd: number,
  count: number
): number[] {
  if (count === 0) return []
  if (count === 1) return [(thetaStart + thetaEnd) / 2]

  const angles: number[] = []
  const range = thetaEnd - thetaStart
  const step = range / (count + 1)

  for (let i = 1; i <= count; i++) {
    angles.push(thetaStart + step * i)
  }

  return angles
}

/**
 * Calculate three orbit radii with consistent spacing
 * @param base - Base radius (minimum)
 * @param gap - Gap between orbits
 * @returns Object with content, actions, and outputs radii
 */
export function orbitRadii(
  base: number,
  gap: number
): { contentR: number; actionsR: number; outputsR: number } {
  return {
    contentR: base,
    actionsR: base + gap,
    outputsR: base + gap * 2,
  }
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

