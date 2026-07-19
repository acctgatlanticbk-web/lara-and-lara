"use client"

import { useState, type CSSProperties } from "react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { useSiteConfig } from "@/hooks/use-site-config"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"
import Image from "next/image"

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

const dividerLineStyle = {
  background:
    "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
} as const

const glassPanelStyle = {
  background: "rgba(255, 255, 255, 0.52)",
  borderWidth: "1px",
  borderStyle: "solid" as const,
  borderColor: "rgba(255, 255, 255, 0.72)",
  boxShadow:
    "0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.92)",
} as const

const innerSurfaceStyle = {
  background: "rgba(255, 255, 255, 0.36)",
  borderColor: "rgba(255, 255, 255, 0.58)",
} as const

function GlassSurfaceLayers() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/65 via-white/28 to-white/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/55"
        aria-hidden
      />
    </>
  )
}

const ct = {
  body: sectionType.text,
  bodyLg: sectionType.textRelaxed,
  label: sectionType.label,
} as const

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
      <span
        className="h-0.5 w-0.5 rounded-full sm:h-1 sm:w-1"
        style={{ backgroundColor: palette.accent }}
        aria-hidden
      />
      <span className="h-px w-6 sm:w-10" style={dividerLineStyle} />
    </div>
  )
}

function RegistryTitle() {
  return (
    <div
      className="welcome-title-lockup relative mx-auto mt-2 w-full max-w-full text-center sm:mt-3 md:mt-4"
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
        style={{ fontSize: "var(--title-size)", color: palette.heading }}
      >
        Gift Guide
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          marginTop: "var(--script-overlap)",
          fontSize: "var(--script-size)",
          color: palette.accent,
        }}
      >
        With gratitude
      </span>
      <span className="sr-only">With gratitude</span>
    </div>
  )
}

export function Registry() {
  const siteConfig = useSiteConfig()
  const registryItems = Object.values(siteConfig.giftRegistry ?? {})
  const [activeQr, setActiveQr] = useState(registryItems[0]?.id ?? "")
  const activeItem = registryItems.find((item) => item.id === activeQr) ?? registryItems[0]
  const { brideNickname, groomNickname } = siteConfig.couple

  return (
    <section
      id="registry"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 overflow-visible bg-transparent py-6 sm:py-10 md:py-12 lg:py-16`}
    >
      <div className="relative z-10 mx-auto max-w-3xl px-2 @container/registry sm:px-3 md:px-4 lg:px-6">
        <div
          className="relative overflow-visible rounded-xl border backdrop-blur-xl sm:rounded-2xl sm:backdrop-blur-2xl"
          style={glassPanelStyle}
        >
          <GlassSurfaceLayers />

          <div className="relative z-10 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
            {/* Header */}
            <div className="relative mx-auto mb-4 max-w-2xl text-center sm:mb-6 md:mb-8">
              <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
                <SectionDivider />
              </div>

              <RegistryTitle />

              <p
                className={`font-goudy-italic mx-auto mt-5 max-w-2xl whitespace-pre-line px-2 sm:mt-6 ${ct.bodyLg}`}
                style={{ color: palette.body }}
              >
                {`As love is what this day is all about,\nyour presence is already the greatest gift we could ever ask for.\nHowever, if you'd like to give, a monetary gift toward our future would be most appreciated.`}
              </p>

              <div className="mt-4 flex items-center justify-center sm:mt-5">
                <span className="h-px w-16 sm:w-24 md:w-32" style={dividerLineStyle} />
              </div>
            </div>

            {registryItems.length > 0 && activeItem && (
              <div
                className="relative mx-auto max-w-2xl overflow-visible rounded-lg border backdrop-blur-md sm:rounded-xl md:rounded-2xl"
                style={{
                  ...innerSurfaceStyle,
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.78)",
                }}
              >
                <div className="relative z-10 px-4 py-6 text-center sm:px-6 sm:py-8 md:px-8">
                  {registryItems.length > 1 && (
                    <div className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:mb-6">
                      {registryItems.map((item) => {
                        const isActive = item.id === activeQr
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveQr(item.id)}
                            className={`${cinzel.className} rounded-sm border px-4 py-2 ${sectionType.label} font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-5 sm:py-2.5 sm:tracking-[0.2em]`}
                            style={
                              isActive
                                ? {
                                    backgroundColor: palette.accent,
                                    borderColor:
                                      "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)",
                                    color: "var(--color-welcome-bg)",
                                  }
                                : {
                                    backgroundColor: "rgba(255, 255, 255, 0.55)",
                                    borderColor: "rgba(255, 255, 255, 0.72)",
                                    color: palette.heading,
                                  }
                            }
                          >
                            {item.label}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  <p
                    className={`${cinzel.className} ${ct.label} mb-4 font-semibold uppercase tracking-[0.18em] sm:mb-5`}
                    style={{ color: palette.heading }}
                  >
                    {activeItem.label}
                  </p>

                  <div className="mx-auto mb-4 inline-flex sm:mb-5">
                    <div className="relative h-44 w-44 rounded-lg border border-white/70 bg-white/80 p-2 shadow-sm sm:h-52 sm:w-52 md:h-56 md:w-56">
                      <Image
                        src={activeItem.src}
                        alt={`${activeItem.label} QR code`}
                        fill
                        className="rounded-lg object-contain"
                        sizes="(max-width: 640px) 176px, 224px"
                      />
                    </div>
                  </div>

                  {activeItem.accountNumber && (
                    <div className="mx-auto max-w-sm">
                      <p
                        className={`${cinzel.className} ${ct.label} mb-1 font-semibold uppercase tracking-[0.14em]`}
                        style={{ color: palette.label }}
                      >
                        Account Details
                      </p>
                      <p className={`font-goudy-italic ${ct.bodyLg}`} style={{ color: palette.body }}>
                        {activeItem.accountNumber}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 space-y-2 text-center sm:mt-8">
              <p className={`font-goudy-italic ${ct.body}`} style={{ color: palette.body }}>
                Thank you from the bottom of our hearts.
              </p>
              <p className={`font-goudy-italic ${ct.body} italic`} style={{ color: palette.body }}>
                With love,
                <br />
                {groomNickname} and {brideNickname}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
