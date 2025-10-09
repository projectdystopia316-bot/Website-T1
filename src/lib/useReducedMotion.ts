import { useMemo } from 'react'

/**
 * Detects if the user has requested reduced motion in their OS settings
 * Returns true if reduced motion is preferred
 */
export function useReducedMotion(): boolean {
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  return prefersReducedMotion
}

