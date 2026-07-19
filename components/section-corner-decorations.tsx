import { cn } from "@/lib/utils"

/** Drop-in floral corners + triple-line frame for any `relative` container. */
export const SECTION_CORNER_ASSETS = {
  topLeft: "/decoration/top-left-newcorner.png",
  topRight: "/decoration/top-right-newcorner.png",
  bottomLeft: "/decoration/bottom-left-newcorner.png",
  bottomRight: "/decoration/bottom-right-newcorner.png",
} as const

export const SECTION_CORNER_SHADOW = {
  filter:
    "drop-shadow(5px 8px 12px color-mix(in srgb, var(--color-motif-deep) 18%, transparent)) drop-shadow(2px 4px 6px color-mix(in srgb, var(--color-motif-deep) 10%, transparent))",
} as const

const FRAME_LINE_COLOR =
  "color-mix(in srgb, var(--color-motif-deep) 30%, transparent)"

/** Preset sizing — use `size="card"` for narrow cards, `size="large"` for hero-scale sections. */
export const sectionCornerPresets = {
  card: {
    frameInset: "inset-2 sm:inset-3 md:inset-4",
    frameMidInset: "inset-[2px] sm:inset-[3px]",
    frameInnerInset: "inset-[4px] sm:inset-[6px]",
    cornerClass:
      "block h-auto w-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px]",
  },
  section: {
    frameInset: "inset-3 sm:inset-5 md:inset-7 lg:inset-9",
    frameMidInset: "inset-[3px] sm:inset-[4px]",
    frameInnerInset: "inset-[6px] sm:inset-[8px]",
    cornerClass:
      "block h-auto w-auto max-w-[200px] sm:max-w-[260px] md:max-w-[340px] lg:max-w-[400px]",
  },
  large: {
    frameInset: "inset-4 sm:inset-6 md:inset-8 lg:inset-10",
    frameMidInset: "inset-[3px] sm:inset-[4px] md:inset-[5px]",
    frameInnerInset: "inset-[7px] sm:inset-[9px] md:inset-[11px]",
    cornerClass:
      "block h-auto w-auto max-w-[240px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[480px]",
  },
} as const

export type SectionCornerSize = keyof typeof sectionCornerPresets

export type SectionCornerVisibility = {
  topLeft?: boolean
  topRight?: boolean
  bottomLeft?: boolean
  bottomRight?: boolean
}

export type SectionCornerDecorationsProps = {
  /** `card` = welcome card, `section` = full-width sections, `large` = oversized florals */
  size?: SectionCornerSize
  /** Triple-line ornamental frame */
  showFrame?: boolean
  /** Corner floral PNGs with drop shadow */
  showFlowers?: boolean
  /** Pick which corners render (defaults to all four) */
  corners?: SectionCornerVisibility
  className?: string
  frameClassName?: string
  flowerClassName?: string
  zIndex?: {
    frame?: number
    flowers?: number
  }
}

const defaultCorners: Required<SectionCornerVisibility> = {
  topLeft: true,
  topRight: true,
  bottomLeft: true,
  bottomRight: true,
}

export function SectionCornerDecorations({
  size = "section",
  showFrame = true,
  showFlowers = true,
  corners,
  className,
  frameClassName,
  flowerClassName,
  zIndex = { frame: 5, flowers: 10 },
}: SectionCornerDecorationsProps) {
  const config = sectionCornerPresets[size]
  const cornerClass = cn(config.cornerClass, flowerClassName)
  const visible = { ...defaultCorners, ...corners }

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      {showFrame ? (
        <div
          className={cn(`absolute ${config.frameInset}`, frameClassName)}
          style={{ zIndex: zIndex.frame }}
        >
          <div
            className="absolute inset-0"
            style={{ border: `1px solid ${FRAME_LINE_COLOR}` }}
          />
          <div
            className={`absolute ${config.frameMidInset}`}
            style={{ border: `1px solid ${FRAME_LINE_COLOR}` }}
          />
          <div
            className={`absolute ${config.frameInnerInset}`}
            style={{ border: `1px solid ${FRAME_LINE_COLOR}` }}
          />
        </div>
      ) : null}

      {showFlowers ? (
        <>
          {visible.topLeft ? (
            <div className="absolute left-0 top-0" style={{ zIndex: zIndex.flowers }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SECTION_CORNER_ASSETS.topLeft}
                alt=""
                className={cornerClass}
                style={SECTION_CORNER_SHADOW}
              />
            </div>
          ) : null}
          {visible.topRight ? (
            <div className="absolute right-0 top-0" style={{ zIndex: zIndex.flowers }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SECTION_CORNER_ASSETS.topRight}
                alt=""
                className={cornerClass}
                style={SECTION_CORNER_SHADOW}
              />
            </div>
          ) : null}
          {visible.bottomLeft ? (
            <div className="absolute bottom-0 left-0" style={{ zIndex: zIndex.flowers }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SECTION_CORNER_ASSETS.bottomLeft}
                alt=""
                className={cornerClass}
                style={SECTION_CORNER_SHADOW}
              />
            </div>
          ) : null}
          {visible.bottomRight ? (
            <div className="absolute bottom-0 right-0" style={{ zIndex: zIndex.flowers }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SECTION_CORNER_ASSETS.bottomRight}
                alt=""
                className={cornerClass}
                style={SECTION_CORNER_SHADOW}
              />
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
