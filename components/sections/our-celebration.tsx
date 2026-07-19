"use client"

import { Calendar, Clock, MapPin, Sparkles } from "lucide-react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { Section } from "@/components/section"
import { SectionCornerDecorations } from "@/components/section-corner-decorations"
import { useSiteConfig } from "@/hooks/use-site-config"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const theSeasons = localFont({
  src: "../../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
  variable: "--font-the-seasons",
})

const aboveTheBeyond = localFont({
  src: "../../Font/above-the-beyond-script.otf",
  display: "swap",
  variable: "--font-above-beyond",
})

const palette = {
  body: "var(--color-welcome-text)",
  heading: "var(--color-welcome-navy)",
  label: "var(--color-welcome-heading)",
  accent: "var(--color-welcome-green)",
} as const

const cardStyle = {
  background: "var(--color-welcome-bg)",
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
  borderWidth: "1px",
  borderStyle: "solid",
  boxShadow:
    "0 8px 28px color-mix(in srgb, var(--color-motif-deep) 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
} as const

const softPanelStyle = {
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 10%, transparent)",
  backgroundColor: "var(--color-welcome-bg-soft)",
} as const

const dividerLineStyle = {
  background:
    "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
} as const

const TBA = "To Be Announced"

function isPlaceholder(value?: string): boolean {
  if (!value?.trim()) return true
  const normalized = value.trim().toLowerCase()
  return (
    normalized === "tba" ||
    normalized === "t.b.a." ||
    normalized.includes("to be announce") ||
    normalized === "—" ||
    normalized === "-"
  )
}

function resolveDetail(value: string | undefined, fallback = TBA): string {
  return isPlaceholder(value) ? fallback : value!.trim()
}

function SectionIconDivider({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2 pt-1 sm:pt-2">
      <span className="h-px w-8 sm:w-12 md:w-16" style={dividerLineStyle} aria-hidden />
      {icon}
      <span
        className="h-px w-8 sm:w-12 md:w-16"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
        aria-hidden
      />
    </div>
  )
}

function CelebrationTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full pt-2 text-center sm:pt-3 md:pt-4"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
          "--script-overlap": layeredSectionTitleSize.overlap,
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: palette.heading,
        }}
      >
        Event Details
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          marginTop: "var(--script-overlap)",
          fontSize: "var(--script-size)",
          color: "var(--color-motif-accent)",
          textShadow:
            "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
        }}
      >
        our special day
      </span>
      <span className="sr-only">our special day</span>
    </h2>
  )
}

function DetailCard({
  icon,
  label,
  primary,
  secondary,
  pending,
}: {
  icon: React.ReactNode
  label: string
  primary: string
  secondary?: string
  pending?: boolean
}) {
  return (
    <div className="relative group h-full">
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to bottom right, color-mix(in srgb, var(--color-welcome-green) 15%, transparent), transparent)",
        }}
        aria-hidden
      />
      <div
        className="relative flex h-full flex-col rounded-xl border p-5 transition-all duration-300 sm:rounded-2xl sm:p-6 md:p-7"
        style={cardStyle}
      >
        <div className="mb-4 flex items-start justify-between gap-3 sm:mb-5">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border sm:h-11 sm:w-11"
            style={softPanelStyle}
          >
            {icon}
          </div>
          {pending && (
            <span
              className={`${cinzel.className} ${sectionType.label} rounded-full border px-2.5 py-1 font-semibold uppercase tracking-[0.14em]`}
              style={{
                color: palette.accent,
                borderColor: "color-mix(in srgb, var(--color-welcome-green) 30%, transparent)",
                backgroundColor: "color-mix(in srgb, var(--color-welcome-green) 10%, transparent)",
              }}
            >
              Coming Soon
            </span>
          )}
        </div>

        <p
          className={`${cinzel.className} ${sectionType.label} mb-2 font-semibold uppercase tracking-[0.18em] sm:mb-2.5`}
          style={{ color: palette.label }}
        >
          {label}
        </p>
        <p
          className={`${theSeasons.className} text-base font-semibold uppercase leading-snug tracking-[0.08em] sm:text-lg md:text-xl`}
          style={{ color: palette.heading }}
        >
          {primary}
        </p>
        {secondary && (
          <p
            className={`font-goudy-italic ${sectionType.text} mt-2 leading-relaxed sm:mt-2.5`}
            style={{ color: palette.body }}
          >
            {secondary}
          </p>
        )}
      </div>
    </div>
  )
}

export function OurCelebration() {
  const siteConfig = useSiteConfig()
  const { ceremony } = siteConfig
  const detailsAnnounced = siteConfig.celebration?.detailsAnnounced ?? false

  const dateValue = detailsAnnounced ? resolveDetail(ceremony.date) : TBA
  const dayValue = detailsAnnounced ? resolveDetail(ceremony.day, "") : ""
  const timeValue = detailsAnnounced ? resolveDetail(ceremony.time) : TBA
  const venueName = detailsAnnounced ? resolveDetail(ceremony.location) : TBA
  const venueAddress = detailsAnnounced ? resolveDetail(ceremony.venue, "") : ""

  const datePending = !detailsAnnounced || isPlaceholder(ceremony.date)
  const timePending = !detailsAnnounced || isPlaceholder(ceremony.time)
  const venuePending =
    !detailsAnnounced || (isPlaceholder(ceremony.location) && isPlaceholder(ceremony.venue))

  const datePrimary = datePending ? TBA : dateValue
  const dateSecondary = datePending
    ? "We will share our celebration date with you soon."
    : dayValue || undefined

  const timePrimary = timePending ? TBA : timeValue
  const timeSecondary = timePending
    ? "Program schedule will be posted here once finalized."
    : ceremony.guestsTime && !isPlaceholder(ceremony.guestsTime)
      ? `Guests may arrive by ${ceremony.guestsTime}`
      : undefined

  const venuePrimary = venuePending ? TBA : venueName
  const venueSecondary = venuePending
    ? "Venue and directions will be updated here."
    : venueAddress || undefined

  const allPending = datePending && timePending && venuePending

  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full`}
      style={{ background: "var(--color-welcome-bg)" }}
    >
      <Section
        id="details"
        className="relative z-10 overflow-hidden pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
      >
        <SectionCornerDecorations />

        <div className="relative z-20 mx-auto mb-6 max-w-5xl px-6 text-center @container/our-celebration sm:mb-8 sm:px-10 md:mb-10 md:px-12">
          <p
            className={`${cinzel.className} ${sectionType.label} mb-2 pt-10 font-semibold uppercase tracking-[0.34em] min-[400px]:tracking-[0.38em] sm:pt-12 sm:tracking-[0.44em] md:pt-14 lg:pt-16`}
            style={{ color: palette.label }}
          >
            Our Celebration
          </p>
          <div className="my-4 sm:my-5 md:my-6">
            <CelebrationTitle />
          </div>
          <p
            className={`font-goudy-italic mx-auto max-w-2xl px-2 ${sectionType.textRelaxed}`}
            style={{ color: palette.body }}
          >
            {allPending
              ? "We are lovingly preparing the details of our Silver Wedding Anniversary celebration. Please check back soon — we cannot wait to share this special day with you."
              : "Everything you need to know about our special day."}
          </p>

          <SectionIconDivider
            icon={
              <Sparkles
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                style={{ color: palette.accent }}
                aria-hidden
              />
            }
          />
        </div>

        <div className="relative z-20 mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 md:gap-7">
            <DetailCard
              icon={<Calendar className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: palette.accent }} aria-hidden />}
              label="Date"
              primary={datePrimary}
              secondary={dateSecondary}
              pending={datePending}
            />
            <DetailCard
              icon={<Clock className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: palette.accent }} aria-hidden />}
              label="Time"
              primary={timePrimary}
              secondary={timeSecondary}
              pending={timePending}
            />
            <DetailCard
              icon={<MapPin className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: palette.accent }} aria-hidden />}
              label="Venue"
              primary={venuePrimary}
              secondary={venueSecondary}
              pending={venuePending}
            />
          </div>

          {allPending && (
            <div
              className="mx-auto mt-6 max-w-2xl rounded-xl border px-5 py-4 text-center sm:mt-8 sm:rounded-2xl sm:px-6 sm:py-5"
              style={softPanelStyle}
            >
              <p
                className={`font-goudy-italic ${sectionType.textRelaxed} leading-relaxed`}
                style={{ color: palette.body }}
              >
                Thank you for your patience and for being part of our journey. Formal invitations and
                complete event details will be announced here in due time.
              </p>
            </div>
          )}
        </div>
      </Section>
    </div>
  )
}
