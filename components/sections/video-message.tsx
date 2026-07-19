"use client"

import { type CSSProperties } from "react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
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
  accent: "var(--color-welcome-green)",
} as const

const dividerLineStyle = {
  background:
    "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
} as const

const glassPanelStyle = {
  background: "rgba(255, 255, 255, 0.24)",
  borderWidth: "1px",
  borderStyle: "solid" as const,
  borderColor: "rgba(255, 255, 255, 0.38)",
  boxShadow:
    "0 8px 32px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.55)",
} as const

function GlassSurfaceLayers() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/30 via-white/12 to-white/4"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/28"
        aria-hidden
      />
    </>
  )
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: palette.accent }}
        aria-hidden
      />
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
        }}
      />
    </div>
  )
}

function InsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: palette.accent }}
        aria-hidden
      />
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
        }}
      />
    </div>
  )
}

function VideoMessageTitle() {
  return (
    <h2
      className="welcome-title-lockup relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": layeredSectionTitleSize.main,
          "--script-size": layeredSectionTitleSize.script,
          "--script-overlap": layeredSectionTitleSize.overlap,
        } as CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.13em] md:tracking-[0.14em]`}
        style={{
          fontSize: "var(--title-size)",
          color: palette.heading,
        }}
      >
        Send Us a Video Message
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          marginTop: "var(--script-overlap)",
          fontSize: "var(--script-size)",
          color: palette.accent,
          textShadow:
            "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
        }}
      >
        A message we will treasure
      </span>
      <span className="sr-only">A message we will treasure</span>
    </h2>
  )
}

export function VideoMessage() {
  const siteConfig = useSiteConfig()
  const uploadUrl = siteConfig.snapShare?.googleDriveLink ?? ""

  return (
    <section
      id="video-message"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 overflow-visible bg-transparent py-6 sm:py-10 md:py-12 lg:py-16`}
    >
      <div className="relative z-10 mx-auto max-w-4xl px-2 @container/video-message sm:px-3 md:px-4 lg:px-6">
        <div
          className="relative overflow-visible rounded-xl border backdrop-blur-xl sm:rounded-2xl sm:backdrop-blur-2xl"
          style={glassPanelStyle}
        >
          <GlassSurfaceLayers />

          <div className="relative z-10 px-4 py-6 text-center sm:px-6 sm:py-8 md:px-8 md:py-10">
            <div className="relative mb-6 sm:mb-8 md:mb-10">
              <div className="mx-auto mb-4 sm:mb-5">
                <SectionDivider />
              </div>
              <VideoMessageTitle />
              <div className="mt-3 flex items-center justify-center sm:mt-4">
                <span className="h-px w-16 sm:w-24 md:w-32" style={dividerLineStyle} />
              </div>
            </div>

            <div
  className={`font-goudy-italic space-y-2.5 sm:space-y-3 ${sectionType.textRelaxed}`}
  style={{ color: palette.body }}
>
  <p>
    As we celebrate twenty-five wonderful years of marriage, our hearts are filled with gratitude
    for God's faithfulness and for the family and friends who have been part of our journey.
  </p>
  <p style={{ color: palette.accent }}>
    Your presence and unwavering support have been one of life's greatest blessings.
  </p>
  <p>
    We would be honored to receive a short video message from you—sharing your memories, warm
    wishes, or words of encouragement as we celebrate this special Silver Wedding Anniversary.
  </p>
  <p>
    Your heartfelt message will become a treasured keepsake that we will cherish for years to come.
    Thank you for celebrating this meaningful milestone with us.
  </p>
</div>
            <div className="mx-auto flex items-center justify-center pt-4 sm:pt-5 md:pt-6">
              <InsideDivider />
            </div>

            <div className="space-y-3 pt-4 sm:space-y-4 sm:pt-5 md:pt-6">
              <p
                className={`font-goudy-italic ${sectionType.text}`}
                style={{ color: palette.heading }}
              >
                Upload your video message here:
              </p>

              {uploadUrl ? (
                <a
                  href={uploadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cinzel.className} group relative inline-flex items-center justify-center rounded-sm border px-6 py-2.5 ${sectionType.label} font-semibold uppercase tracking-[0.2em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-8 sm:py-3 sm:tracking-[0.24em] md:px-10 md:py-3.5 md:tracking-[0.28em]`}
                  style={{
                    backgroundColor: "var(--color-welcome-green)",
                    borderColor: "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)",
                    color: "var(--color-welcome-bg)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-welcome-navy)"
                    e.currentTarget.style.borderColor = "var(--color-welcome-green)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-welcome-green)"
                    e.currentTarget.style.borderColor =
                      "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)"
                  }}
                >
                  <span className="relative z-10">Upload Video Message</span>
                  <div
                    className="absolute inset-0 -z-0 rounded-sm opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25"
                    style={{ backgroundColor: "var(--color-motif-deep)" }}
                  />
                </a>
              ) : (
                <p className={`font-goudy-italic ${sectionType.text}`} style={{ color: palette.body }}>
                  Upload link coming soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
