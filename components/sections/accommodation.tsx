"use client"

import { ExternalLink, Phone } from "lucide-react"
import { Cinzel } from "next/font/google"
import { Section } from "@/components/section"
import { useSiteConfig } from "@/hooks/use-site-config"
import {
  coastalPalette,
  displayScript,
} from "@/lib/coastal-palette"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const OUTSIDE_TEXT = coastalPalette.cream
const OUTSIDE_TEXT_MUTED = "rgba(255, 252, 248, 0.88)"
const OUTSIDE_LABEL = "rgba(255, 252, 248, 0.72)"
const OUTSIDE_TITLE_SHADOW =
  "0 2px 6px rgba(0, 0, 0, 0.28), 0 0 18px rgba(0, 0, 0, 0.12)"

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, serif",
}

const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  body: "text-xs sm:text-sm md:text-base lg:text-lg",
  bodyLg: "text-sm sm:text-base md:text-lg",
} as const

const cardStyle = {
  background: `linear-gradient(
    155deg,
    color-mix(in srgb, ${coastalPalette.peach} 88%, white) 0%,
    color-mix(in srgb, ${coastalPalette.lavenderBlue} 92%, white) 50%,
    color-mix(in srgb, ${coastalPalette.blueGray} 55%, white) 100%
  )`,
  borderColor: `color-mix(in srgb, ${coastalPalette.dustyRose} 38%, white)`,
  boxShadow: `0 16px 48px color-mix(in srgb, ${coastalPalette.teal} 14%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.72)`,
} as const

function formatPhoneHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`
}

function FacebookLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${ct.body} inline-flex items-center gap-1.5 mt-2 underline underline-offset-2 transition-opacity hover:opacity-80`}
      style={{ ...bodyFont, color: coastalPalette.teal }}
    >
      <ExternalLink size={14} aria-hidden />
      Facebook
    </a>
  )
}

export function Accommodation() {
  const siteConfig = useSiteConfig()
  const { accommodation } = siteConfig

  return (
    <Section
      id="accommodation"
      className="relative bg-transparent pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <p
            className={`${cinzel.className} ${ct.label} uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-2`}
            style={{ color: OUTSIDE_LABEL }}
          >
            Where to Stay
          </p>
          <h2
            className="mx-auto my-4 leading-[1.08] sm:my-5 md:my-6"
            style={{
              ...displayScript,
              fontSize: "clamp(2rem, 6.5vw, 4.25rem)",
              color: OUTSIDE_TEXT,
              letterSpacing: "0.02em",
              textShadow: OUTSIDE_TITLE_SHADOW,
            }}
          >
            Hotel &amp; Accommodation
          </h2>
          <p
            className={`${ct.bodyLg} max-w-2xl mx-auto leading-relaxed px-2`}
            style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}
          >
            Here are our recommended hotels and accommodations within the area.
            Let them know that you are our wedding guest to avail their generous
            discount offers, or coordinate with our accommodation coordinator.
          </p>
          <div className="flex items-center justify-center pt-2 sm:pt-3">
            <span className="h-px w-16 sm:w-24 md:w-32 bg-white/50" />
          </div>
        </div>

        <div
          className="relative rounded-xl sm:rounded-2xl border backdrop-blur-md px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8 mb-6 sm:mb-8"
          style={cardStyle}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <p
                className={`${cinzel.className} ${ct.label} tracking-[0.18em] uppercase`}
                style={{ color: coastalPalette.dustyRose }}
              >
                Accommodation Coordinator
              </p>
              <p
                className={`${cinzel.className} mt-1 text-sm sm:text-base font-semibold`}
                style={{ color: coastalPalette.deep }}
              >
                {accommodation.coordinator.name}
              </p>
            </div>
            <a
              href={formatPhoneHref(accommodation.coordinator.phone)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-85"
              style={{
                backgroundColor: coastalPalette.teal,
                color: coastalPalette.cream,
                fontFamily: "'SortsMillGoudy', Georgia, serif",
              }}
            >
              <Phone size={16} aria-hidden />
              {accommodation.coordinator.phone}
            </a>
          </div>
        </div>

        <ol className="space-y-3 sm:space-y-4">
          {accommodation.hotels.map((hotel, index) => (
            <li
              key={hotel.name}
              className="rounded-xl sm:rounded-2xl border backdrop-blur-md px-4 sm:px-5 md:px-6 py-4 sm:py-5"
              style={cardStyle}
            >
              <div className="flex gap-3 sm:gap-4">
                <span
                  className={`${cinzel.className} flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold`}
                  style={{
                    backgroundColor: coastalPalette.teal,
                    color: coastalPalette.cream,
                  }}
                  aria-hidden
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3
                    className={`${cinzel.className} text-sm sm:text-base md:text-lg font-semibold tracking-wide`}
                    style={{ color: coastalPalette.deep }}
                  >
                    {hotel.name}
                  </h3>
                  {hotel.discount && (
                    <p
                      className={`${ct.body} mt-1 leading-relaxed`}
                      style={{ ...bodyFont, color: coastalPalette.body }}
                    >
                      {hotel.discount}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                    {hotel.phone && (
                      <a
                        href={formatPhoneHref(hotel.phone)}
                        className={`${ct.body} inline-flex items-center gap-1.5 underline underline-offset-2 transition-opacity hover:opacity-80`}
                        style={{ ...bodyFont, color: coastalPalette.teal }}
                      >
                        <Phone size={14} aria-hidden />
                        {hotel.phone}
                      </a>
                    )}
                    {"facebook" in hotel && hotel.facebook && (
                      <FacebookLink href={hotel.facebook} />
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {accommodation.carRentals.length > 0 && (
          <div className="mt-10 sm:mt-12 md:mt-14">
            <div className="text-center mb-5 sm:mb-6 md:mb-8">
              <p
                className={`${cinzel.className} ${ct.label} uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-2`}
                style={{ color: OUTSIDE_LABEL }}
              >
                Getting Around
              </p>
              <h3
                className={`${cinzel.className} text-lg sm:text-xl md:text-2xl font-semibold tracking-wide`}
                style={{ color: OUTSIDE_TEXT, textShadow: OUTSIDE_TITLE_SHADOW }}
              >
                Recommended Car Rental
              </h3>
              <div className="flex items-center justify-center pt-2 sm:pt-3">
                <span className="h-px w-12 sm:w-20 md:w-28 bg-white/50" />
              </div>
            </div>

            <ul className="space-y-3 sm:space-y-4">
              {accommodation.carRentals.map((rental) => (
                <li
                  key={rental.name}
                  className="rounded-xl sm:rounded-2xl border backdrop-blur-md px-4 sm:px-5 md:px-6 py-4 sm:py-5"
                  style={cardStyle}
                >
                  <h4
                    className={`${cinzel.className} text-sm sm:text-base md:text-lg font-semibold tracking-wide`}
                    style={{ color: coastalPalette.deep }}
                  >
                    {rental.name}
                  </h4>
                  <FacebookLink href={rental.facebook} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  )
}
