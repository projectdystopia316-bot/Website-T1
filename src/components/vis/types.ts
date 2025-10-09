export type Category = 'all' | 'home' | 'work' | 'school' | 'health'

export interface GalaxyNode {
  id: string
  title: string
  description: string
  category: Category
  icon: string // emoji
  prompt: string
  tags: string[]
  // Polar coordinates (relative to sector)
  angle: number // degrees
  radius: number // 0-1 (percentage)
}

export interface GalaxySector {
  id: Category
  label: string
  color: string // Tailwind gradient class
  colorHex: string // Hex color for SVG
  nodes: GalaxyNode[]
}

export interface PolarCoordinate {
  angle: number // degrees
  radius: number // percentage (0-100)
}

export interface CartesianCoordinate {
  x: number
  y: number
}

