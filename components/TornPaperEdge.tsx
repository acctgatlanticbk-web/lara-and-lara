import React, { useId } from 'react'

// Palette lives in globals.css → @theme inline → --color-motif-*
const THEME = {
  cream: 'var(--color-motif-cream)',
  yellow: 'var(--color-motif-yellow)',
  soft: 'var(--color-motif-soft)',
  accent: 'var(--color-motif-accent)',
  deep: 'var(--color-motif-deep)',
  medium: 'var(--color-motif-medium)',
  silver: 'var(--color-motif-silver)',
  white: '#FFFFFF',
} as const

const VARIANT_COLORS = {
  light: THEME.white,
  cream: THEME.cream,
  soft: THEME.soft,
  silver: THEME.silver,
  accent: THEME.accent,
  dark: THEME.medium,
} as const

interface TornPaperEdgeProps {
  className?: string
  flipped?: boolean
  /** Preset fill matching the invitation palette */
  variant?: keyof typeof VARIANT_COLORS
  /** Override fill color (takes precedence over variant) */
  color?: string
}

export const TornPaperEdge: React.FC<TornPaperEdgeProps> = ({
  className = '',
  flipped = false,
  variant = 'cream',
  color,
}) => {
  const fill = color ?? VARIANT_COLORS[variant]
  const gradientId = useId()

  const path = `
    M0,0 
    L0,6
    L2,8 L4,5 L6,9 L8,6 L10,10 L12,5 L14,9 L16,6 L18,10 L20,5 
    L22,9 L24,6 L26,10 L28,6 L30,9 L32,5 L34,10 L36,6 L38,9 L40,5 
    L42,9 L44,6 L46,10 L48,6 L50,9 L52,5 L54,10 L56,6 L58,9 L60,5
    L62,9 L64,6 L66,10 L68,6 L70,9 L72,5 L74,10 L76,6 L78,9 L80,5
    L82,9 L84,6 L86,10 L88,6 L90,9 L92,5 L94,10 L96,6 L98,9 L100,5
    L100,0 
    Z
  `

  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`}>
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className={`block h-3 w-full md:h-8 ${flipped ? 'rotate-180' : ''}`}
        aria-hidden
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fill} stopOpacity="1" />
            <stop offset="50%" stopColor={fill} stopOpacity="0.92" />
            <stop offset="100%" stopColor={fill} stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d={path} fill={`url(#${gradientId})`} />
      </svg>
    </div>
  )
}
