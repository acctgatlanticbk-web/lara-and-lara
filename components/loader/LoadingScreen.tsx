"use client"

import React, { useEffect, useState, useRef } from "react"
import { siteConfig } from "@/content/site"
import { SectionCornerDecorations } from "@/components/section-corner-decorations"
import { parseWeddingDate } from "@/lib/wedding-date"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import Image from "next/image"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const theSeasons = localFont({
  src: "../../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
})

const aboveTheBeyond = localFont({
  src: "../../Font/above-the-beyond-script.otf",
  display: "swap",
})

interface LoadingScreenProps {
  onComplete: () => void
}

/** Splits a date string like "May 8, 2026" into ["05", "08", "26"] */
function getDateSegments(dateStr: string): string[] {
  const d = new Date(dateStr)
  return [
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
    String(d.getFullYear()).slice(-2),
  ]
}

/** Returns calendar days remaining until the wedding date (0 if already past) */
function getDaysUntil(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  return Math.max(0, Math.round((target.getTime() - today.getTime()) / 86_400_000))
}

const EVENT_DATE = siteConfig.ceremony.date ?? siteConfig.wedding.date
const GHOST_NUMBERS = getDateSegments(EVENT_DATE)
const DAYS_REMAINING = getDaysUntil(EVENT_DATE)
const PARSED_EVENT = parseWeddingDate(EVENT_DATE)
const CEREMONY_DAY = (siteConfig.ceremony.day ?? PARSED_EVENT.dayOfWeek).toUpperCase()
const CEREMONY_TIME = siteConfig.ceremony.time ?? siteConfig.wedding.time

const dateLabelStyle = {
  fontFamily: "var(--font-cinzel), Cinzel, serif",
  fontSize: "clamp(0.54rem, 1.3vw, 0.66rem)",
  letterSpacing: "0.20em",
  textTransform: "uppercase" as const,
  color: "rgba(28, 28, 30, 0.48)",
}

const verticalRuleStyle = {
  width: "1px",
  height: "clamp(2rem, 5.5vw, 2.75rem)",
  background:
    "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-motif-deep) 22%, transparent), transparent)",
  flexShrink: 0,
}

/** Recumbent figure-eight infinity (jump-loader path) */
const INFINITY_PATH =
  "M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"

/** Path length for stroke-dash animation (matches jump-loader CodePen) */
const INFINITY_PATH_LEN = 242.776657104492

function InfinityLoader({ visible }: { visible: boolean }) {
  return (
    <div
      className={`relative flex h-11 w-[5.25rem] items-center justify-center sm:h-[3.25rem] sm:w-[6.25rem] ${
        visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
      } transition-all duration-700 ease-out`}
      aria-hidden
    >
      <div
        className="absolute inset-0 rounded-full opacity-40 blur-md"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-welcome-green) 35%, transparent) 0%, transparent 70%)",
        }}
      />
      <svg
        viewBox="0 0 187.3 93.7"
        preserveAspectRatio="xMidYMid meet"
        className="relative h-full w-full overflow-visible drop-shadow-sm"
        aria-hidden
      >
        <path
          className="loader-infinity-track"
          d={INFINITY_PATH}
          fill="none"
          stroke="color-mix(in srgb, var(--color-motif-deep) 14%, transparent)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
        <path
          className="loader-infinity-outline"
          d={INFINITY_PATH}
          fill="none"
          stroke="var(--color-welcome-navy)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
        />
      </svg>
    </div>
  )
}

function CeremonyDateDisplay({ visible }: { visible: boolean }) {
  return (
    <div
      className={`mx-auto flex w-full max-w-[18rem] flex-col items-center gap-2.5 sm:max-w-[19rem] sm:gap-3 ${
        visible
          ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
          : "opacity-0 translate-y-4 transition-all duration-700 ease-out"
      }`}
      aria-label={`${CEREMONY_DAY}, ${EVENT_DATE} at ${CEREMONY_TIME}`}
    >
      <div
        className="h-px w-full max-w-[9rem]"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 28%, transparent), transparent)",
        }}
      />

      <p
        className={`${cinzel.className} font-semibold uppercase tracking-[0.28em] sm:tracking-[0.32em]`}
        style={{
          ...dateLabelStyle,
          color: "rgba(28, 28, 30, 0.55)",
          fontSize: "clamp(0.6rem, 1.45vw, 0.74rem)",
          letterSpacing: "0.28em",
        }}
      >
        {PARSED_EVENT.month}
      </p>

      <div className="flex w-full items-center justify-center" style={{ lineHeight: 1 }}>
        <p
          className={`${cinzel.className} shrink-0 font-semibold uppercase`}
          style={{
            ...dateLabelStyle,
            paddingRight: "clamp(0.55rem, 1.8vw, 0.85rem)",
          }}
        >
          {CEREMONY_DAY}
        </p>

        <div style={verticalRuleStyle} aria-hidden />

        <p
          className={`${theSeasons.className} shrink-0 tabular-nums`}
          style={{
            fontSize: "clamp(2.15rem, 7vw, 3rem)",
            letterSpacing: "-0.01em",
            color: "var(--color-welcome-navy)",
            padding: "0 clamp(0.55rem, 1.8vw, 0.85rem)",
            lineHeight: 1,
          }}
        >
          {PARSED_EVENT.day}
        </p>

        <div style={verticalRuleStyle} aria-hidden />

        <p
          className={`${cinzel.className} shrink-0 font-semibold uppercase`}
          style={{
            ...dateLabelStyle,
            letterSpacing: "0.12em",
            paddingLeft: "clamp(0.55rem, 1.8vw, 0.85rem)",
          }}
        >
          At {CEREMONY_TIME}
        </p>
      </div>

      <p
        className={`${cinzel.className} font-semibold uppercase tabular-nums tracking-[0.28em] sm:tracking-[0.32em]`}
        style={{
          ...dateLabelStyle,
          color: "rgba(28, 28, 30, 0.42)",
          fontSize: "clamp(0.6rem, 1.45vw, 0.74rem)",
          letterSpacing: "0.28em",
        }}
      >
        {PARSED_EVENT.year}
      </p>
    </div>
  )
}

function LoadingProgress({
  progress,
  visible,
}: {
  progress: number
  visible: boolean
}) {
  return (
    <div
      className={`mt-7 flex w-full max-w-[16rem] flex-col items-center sm:max-w-[18rem] ${
        visible
          ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
          : "opacity-0 translate-y-4 transition-all duration-700 ease-out"
      }`}
    >
      <InfinityLoader visible={visible} />

      <div className="mt-5 w-full">
        <div
          className="mb-2.5 flex items-center justify-between gap-3"
          style={{ fontFamily: "var(--font-cinzel), Cinzel, serif" }}
        >
          <p
            className="font-semibold uppercase"
            style={{
              fontSize: "clamp(0.56rem, 1.35vw, 0.66rem)",
              letterSpacing: "0.22em",
              color: "color-mix(in srgb, var(--color-welcome-text) 62%, transparent)",
            }}
          >
            Preparing your invitation
          </p>
          <p
            className="shrink-0 tabular-nums font-semibold uppercase"
            style={{
              fontSize: "clamp(0.56rem, 1.35vw, 0.66rem)",
              letterSpacing: "0.18em",
              color: "var(--color-welcome-green)",
            }}
            aria-live="polite"
          >
            {progress}%
          </p>
        </div>

          <div
            className="relative h-1.5 w-full overflow-hidden rounded-full"
            style={{
              background:
                "color-mix(in srgb, var(--color-motif-deep) 10%, var(--color-welcome-bg))",
              boxShadow: "inset 0 1px 2px color-mix(in srgb, var(--color-motif-deep) 8%, transparent)",
            }}
            aria-hidden
          >
            <div
              className="loader-progress-fill absolute inset-y-0 left-0 overflow-hidden rounded-full"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, var(--color-welcome-green), color-mix(in srgb, var(--color-welcome-navy) 75%, var(--color-welcome-green)))",
              boxShadow:
                "0 0 12px color-mix(in srgb, var(--color-welcome-green) 35%, transparent)",
              transition: "width 280ms ease-out",
            }}
          />
        </div>
      </div>
    </div>
  )
}

function OrnamentalDivider({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center justify-center ${compact ? "gap-1.5" : "gap-2"}`}>
      <span
        className={`h-px ${compact ? "w-6 sm:w-10" : "w-8 sm:w-12"}`}
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
      <span className="h-0.5 w-0.5 rounded-full bg-motif-deep/45 sm:h-1 sm:w-1" aria-hidden />
      <span
        className={`h-px ${compact ? "w-6 sm:w-10" : "w-8 sm:w-12"}`}
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
    </div>
  )
}

type ParticleKind = "orb" | "sparkle"

interface Particle {
  kind: ParticleKind
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  twinklePhase: number
  twinkleSpeed: number
  colorIdx: number
  rotation: number
  spin: number
}

const PARTICLE_COLORS = [
  "175, 145, 108",
  "188, 155, 165",
  "142, 142, 142",
  "210, 205, 198",
  "165, 155, 148",
]

function createParticles(width: number, height: number): Particle[] {
  const area = width * height
  const orbCount = Math.min(64, Math.max(32, Math.floor(area / 11000)))
  const sparkleCount = Math.min(36, Math.max(16, Math.floor(area / 22000)))

  const orbs: Particle[] = Array.from({ length: orbCount }, () => ({
    kind: "orb",
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.24,
    vy: -(Math.random() * 0.16 + 0.04),
    radius: Math.random() * 2.4 + 0.5,
    opacity: Math.random() * 0.16 + 0.05,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 0.012 + 0.003,
    colorIdx: Math.floor(Math.random() * PARTICLE_COLORS.length),
    rotation: 0,
    spin: 0,
  }))

  const sparkles: Particle[] = Array.from({ length: sparkleCount }, () => ({
    kind: "sparkle",
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.12,
    vy: -(Math.random() * 0.22 + 0.08),
    radius: Math.random() * 1.4 + 0.35,
    opacity: Math.random() * 0.28 + 0.08,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 0.022 + 0.008,
    colorIdx: Math.floor(Math.random() * PARTICLE_COLORS.length),
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.018,
  }))

  return [...orbs, ...sparkles]
}

function drawSparkle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  alpha: number,
  rotation: number,
  color: string
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.strokeStyle = `rgba(${color}, ${alpha})`
  ctx.lineWidth = 0.6
  ctx.lineCap = "round"

  ctx.beginPath()
  ctx.moveTo(0, -size * 2.2)
  ctx.lineTo(0, size * 2.2)
  ctx.moveTo(-size * 2.2, 0)
  ctx.lineTo(size * 2.2, 0)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(-size, -size)
  ctx.lineTo(size, size)
  ctx.moveTo(size, -size)
  ctx.lineTo(-size, size)
  ctx.stroke()
  ctx.restore()
}

/** Paints an organic handmade-paper texture once into the given canvas. */
function paintPaperTexture(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const W = canvas.width
  const H = canvas.height

  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(0, 0, W, H)

  const patches = 14
  for (let i = 0; i < patches; i++) {
    const cx = Math.random() * W
    const cy = Math.random() * H
    const r = Math.random() * W * 0.5 + W * 0.1
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
    const warm = Math.random() > 0.4
    g.addColorStop(
      0,
      warm
        ? `rgba(230, 218, 198, ${Math.random() * 0.018 + 0.004})`
        : `rgba(210, 206, 200, ${Math.random() * 0.012 + 0.003})`
    )
    g.addColorStop(1, "rgba(255, 255, 255, 0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }

  const imageData = ctx.getImageData(0, 0, W, H)
  const px = imageData.data
  for (let i = 0; i < px.length; i += 4) {
    const grain = (Math.random() - 0.5) * 14
    const speck = Math.random() < 0.008 ? (Math.random() - 0.5) * 10 : 0
    const total = grain + speck
    px[i] = Math.max(0, Math.min(255, px[i] + total))
    px[i + 1] = Math.max(0, Math.min(255, px[i + 1] + total * 0.93))
    px[i + 2] = Math.max(0, Math.min(255, px[i + 2] + total * 0.8))
  }
  ctx.putImageData(imageData, 0, 0)

  const fiberCount = Math.min(2400, Math.floor((W * H) / 1800))
  for (let i = 0; i < fiberCount; i++) {
    const x = Math.random() * W
    const y = Math.random() * H
    const angle = Math.random() * Math.PI
    const len = Math.random() * 80 + 10
    const alpha = Math.random() * 0.038 + 0.007
    const lw = Math.random() * 0.6 + 0.12
    const rr = Math.floor(Math.random() * 50 + 100)
    const gg = Math.floor(Math.random() * 32 + 65)
    const bb = Math.floor(Math.random() * 20 + 40)

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(
      len * 0.25,
      (Math.random() - 0.5) * 3.0,
      len * 0.7,
      (Math.random() - 0.5) * 3.0,
      len,
      (Math.random() - 0.5) * 2.0
    )
    ctx.strokeStyle = `rgba(${rr}, ${gg}, ${bb}, ${alpha})`
    ctx.lineWidth = lw
    ctx.stroke()
    ctx.restore()
  }

  const speckCount = Math.floor((W * H) / 9000)
  for (let i = 0; i < speckCount; i++) {
    const x = Math.random() * W
    const y = Math.random() * H
    const r = Math.random() * 0.9 + 0.2
    const alpha = Math.random() * 0.07 + 0.02
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(90, 62, 38, ${alpha})`
    ctx.fill()
  }
}

// ── Component ───────────────────────────────────────────────────────────────

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  const paperCanvasRef = useRef<HTMLCanvasElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  const TOTAL_LOAD_MS = 12000
  const FADE_MS = 700

  useEffect(() => {
    const canvas = paperCanvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    paintPaperTexture(canvas)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesRef.current = createParticles(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let running = true

    const draw = () => {
      if (!running) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p) => {
        p.twinklePhase += p.twinkleSpeed
        const twinkle = (Math.sin(p.twinklePhase) + 1) * 0.5
        const alpha = p.opacity * (0.3 + twinkle * 0.7)
        const color = PARTICLE_COLORS[p.colorIdx]

        if (p.kind === "sparkle") {
          p.rotation += p.spin
          drawSparkle(ctx, p.x, p.y, p.radius, alpha, p.rotation, color)
        } else {
          const blurR = p.radius * 4.8
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, blurR)
          g.addColorStop(0, `rgba(${color}, ${alpha})`)
          g.addColorStop(0.4, `rgba(${color}, ${alpha * 0.4})`)
          g.addColorStop(1, "rgba(255, 255, 255, 0)")

          ctx.beginPath()
          ctx.arc(p.x, p.y, blurR, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()
        }

        p.x += p.vx
        p.y += p.vy

        const { width, height } = canvas
        if (p.y < -30) {
          p.y = height + 16
          p.x = Math.random() * width
        }
        if (p.x < -30) p.x = width + 30
        if (p.x > width + 30) p.x = -30
      })

      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      running = false
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 460),
      setTimeout(() => setPhase(3), 760),
      setTimeout(() => setPhase(4), 990),
      setTimeout(() => setPhase(5), 1220),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    let rafId = 0
    const start = performance.now()
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / TOTAL_LOAD_MS)
      const next = Math.round(easeOutCubic(t) * 100)
      setProgress((prev) => (next > prev ? next : prev))
      if (t < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const fadeTimer = setTimeout(() => setFadeOut(true), TOTAL_LOAD_MS - FADE_MS)
    const doneTimer = setTimeout(() => {
      setProgress(100)
      onComplete()
    }, TOTAL_LOAD_MS)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  const vis = (minPhase: number) =>
    phase >= minPhase
      ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
      : "opacity-0 translate-y-5 transition-all duration-700 ease-out"

  return (
    <>
      <style jsx global>{`
        .loader-infinity-track {
          opacity: 0.22;
        }

        .loader-infinity-outline {
          stroke-dasharray: ${INFINITY_PATH_LEN * 0.01} ${INFINITY_PATH_LEN};
          stroke-dashoffset: 0;
          animation: loader-infinity-jump 1.6s linear infinite;
        }

        @keyframes loader-infinity-jump {
          12.5% {
            stroke-dasharray: ${INFINITY_PATH_LEN * 0.14} ${INFINITY_PATH_LEN};
            stroke-dashoffset: ${INFINITY_PATH_LEN * -0.11};
          }
          43.75% {
            stroke-dasharray: ${INFINITY_PATH_LEN * 0.35} ${INFINITY_PATH_LEN};
            stroke-dashoffset: ${INFINITY_PATH_LEN * -0.35};
          }
          100% {
            stroke-dasharray: ${INFINITY_PATH_LEN * 0.01} ${INFINITY_PATH_LEN};
            stroke-dashoffset: ${INFINITY_PATH_LEN * -0.99};
          }
        }

        .loader-progress-fill::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.35) 50%,
            transparent 100%
          );
          animation: loader-progress-shimmer 1.8s ease-in-out infinite;
        }

        @keyframes loader-progress-shimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }
      `}</style>

      <div
        className={`fixed inset-0 z-50 flex flex-col overflow-hidden transition-opacity duration-700 ease-out ${
          fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        style={{ background: "var(--color-welcome-bg)" }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading invitation"
      >
        <canvas ref={paperCanvasRef} className="absolute inset-0 pointer-events-none" aria-hidden />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse 85% 72% at 50% 42%, rgba(255, 255, 255, 0.92) 0%, rgba(252, 252, 251, 0.55) 45%, transparent 72%)",
              "linear-gradient(90deg, rgba(245, 243, 240, 0.35) 0%, transparent 22%, transparent 78%, rgba(245, 243, 240, 0.35) 100%)",
            ].join(", "),
          }}
        />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-80"
          style={{ mixBlendMode: "multiply" }}
          aria-hidden
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse 92% 88% at 50% 50%, transparent 48%, rgba(120, 118, 116, 0.045) 100%)",
              "linear-gradient(180deg, rgba(230, 228, 226, 0.06) 0%, transparent 18%, transparent 82%, rgba(230, 228, 226, 0.07) 100%)",
            ].join(", "),
          }}
        />

        <SectionCornerDecorations
          size="section"
          zIndex={{ frame: 8, flowers: 12 }}
          flowerClassName="max-w-[170px] opacity-90 sm:max-w-[220px] md:max-w-[290px] lg:max-w-[340px]"
        />

        <div
          className="absolute inset-0 pointer-events-none flex flex-col items-end justify-center pr-4 sm:pr-10 md:pr-16 select-none"
          aria-hidden
        >
          {GHOST_NUMBERS.map((num, i) => (
            <span
              key={`ghost-${num}-${i}`}
              className="font-bold leading-[0.82]"
              style={{
                fontFamily: "var(--font-cinzel), Cinzel, serif",
                fontSize: "clamp(5rem, 14vw, 12rem)",
                color: "color-mix(in srgb, var(--color-motif-deep) 4%, transparent)",
                letterSpacing: "-0.04em",
                opacity: phase >= 2 ? 1 : 0,
                transition: `opacity 1.6s ease-out ${i * 150}ms`,
              }}
            >
              {num}
            </span>
          ))}
        </div>

        <div className="relative z-20 flex flex-col items-center pt-[8vh] sm:pt-[10vh] md:pt-[11vh]">
          <div
            className={`mt-2 sm:mt-3 ${
              phase >= 1
                ? "scale-100 opacity-100 transition-all duration-700 ease-out"
                : "scale-95 opacity-0 transition-all duration-700 ease-out"
            }`}
          >
            <Image
              src={siteConfig.couple.monogram}
              alt="Monogram"
              width={240}
              height={240}
              className="h-16 w-16 object-contain object-center sm:h-[4.5rem] sm:w-[4.5rem]"
              style={{
                filter:
                  "brightness(0) sepia(1) saturate(0.15) hue-rotate(10deg) opacity(0.72)",
              }}
              priority
            />
          </div>

          <p
            className={`${theSeasons.className} ${vis(1)} uppercase`}
            style={{
              fontSize: "clamp(1.35rem, 3.8vw, 2rem)",
              color: "var(--color-welcome-navy)",
              lineHeight: 1.1,
              letterSpacing: "0.10em",
              marginTop: "clamp(1rem, 2.8vh, 1.5rem)",
              marginBottom: "clamp(0.35rem, 1.2vh, 0.65rem)",
            }}
          >
            {siteConfig.hero.eventTitle}
          </p>

          <p
            className={`${aboveTheBeyond.className} ${vis(1)}`}
            style={{
              fontSize: "clamp(1.05rem, 2.8vw, 1.35rem)",
              color: "var(--color-welcome-green)",
              lineHeight: 1,
              marginBottom: "clamp(0.85rem, 2.2vh, 1.35rem)",
              textShadow:
                "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
            }}
          >
            {siteConfig.hero.eventSubtitle}
          </p>

          <p
            className={`${cinzel.className} ${vis(1)} font-semibold uppercase`}
            style={{
              fontSize: "clamp(0.62rem, 1.6vw, 0.78rem)",
              letterSpacing: "0.32em",
              color: "var(--color-welcome-green)",
              marginTop: 0,
            }}
          >
            {DAYS_REMAINING} {DAYS_REMAINING === 1 ? "day" : "days"} to go
          </p>

          <div className={`mt-3 ${vis(1)}`}>
            <OrnamentalDivider compact />
          </div>
        </div>

        <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6">
          <h1
            className={`mx-auto w-full max-w-[min(92vw,36rem)] text-center ${vis(2)}`}
            style={{ transitionDelay: "50ms" }}
          >
            <span
              className={`${theSeasons.className} block uppercase`}
              style={{
                fontSize: "clamp(3.2rem, 10.5vw, 6rem)",
                color: "var(--color-welcome-navy)",
                lineHeight: 1.12,
                letterSpacing: "0.06em",
                textShadow:
                  "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 8px 28px color-mix(in srgb, var(--color-motif-deep) 6%, transparent)",
              }}
            >
              {siteConfig.couple.groomNickname.trim()}
            </span>

            <span
              className={`${aboveTheBeyond.className} block`}
              style={{
                fontSize: "clamp(1.35rem, 3.5vw, 2.1rem)",
                color: "var(--color-welcome-green)",
                lineHeight: 1.1,
                marginTop: "clamp(0.45rem, 2vw, 0.95rem)",
                marginBottom: "clamp(0.45rem, 2vw, 0.95rem)",
                textShadow:
                  "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
              }}
            >
              and
            </span>

            <span
              className={`${theSeasons.className} block uppercase`}
              style={{
                fontSize: "clamp(3.2rem, 10.5vw, 6rem)",
                color: "var(--color-welcome-navy)",
                lineHeight: 1.12,
                letterSpacing: "0.06em",
                textShadow:
                  "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 8px 28px color-mix(in srgb, var(--color-motif-deep) 6%, transparent)",
              }}
            >
              {siteConfig.couple.brideNickname.trim()}
            </span>
          </h1>
        </div>

        <div className="relative z-20 flex flex-col items-center px-6 pb-[8vh] text-center sm:pb-[10vh]">
          <div className={vis(3)}>
            <OrnamentalDivider compact />
          </div>

          <div className={`${vis(3)} flex flex-col items-center gap-1.5 sm:gap-2`}>
            <p
              className={`${aboveTheBeyond.className}`}
              style={{
                fontSize: "clamp(1rem, 2.6vw, 1.2rem)",
                color: "var(--color-welcome-green)",
                lineHeight: 1.1,
                textShadow:
                  "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
              }}
            >
              {siteConfig.hero.togetherWith}
            </p>
            <p
              className={`${theSeasons.className}`}
              style={{
                fontSize: "clamp(0.95rem, 2.4vw, 1.15rem)",
                color: "var(--color-welcome-navy)",
                letterSpacing: "0.06em",
              }}
            >
              {siteConfig.hero.hosts.first}
            </p>
            <p
              className={`${aboveTheBeyond.className}`}
              style={{
                fontSize: "clamp(0.95rem, 2.4vw, 1.1rem)",
                color: "var(--color-welcome-green)",
                lineHeight: 1,
                textShadow:
                  "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
              }}
            >
              and
            </p>
            <p
              className={`${theSeasons.className}`}
              style={{
                fontSize: "clamp(0.95rem, 2.4vw, 1.15rem)",
                color: "var(--color-welcome-navy)",
                letterSpacing: "0.06em",
              }}
            >
              {siteConfig.hero.hosts.second}
            </p>
          </div>

          <div className={`mt-5 sm:mt-6 ${vis(4)}`}>
            <CeremonyDateDisplay visible={phase >= 4} />
          </div>

          <LoadingProgress progress={progress} visible={phase >= 5} />
        </div>
      </div>
    </>
  )
}