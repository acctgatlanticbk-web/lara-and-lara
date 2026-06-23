"use client"

import { Section } from "@/components/section"
import { Cinzel } from "next/font/google"
import {
  coastalPalette,
  coastalTitleShadow,
  displayScript,
} from "@/lib/coastal-palette"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const DRIVE_URL =
  "https://drive.google.com/drive/folders/1fH_NKSGFyW1DupwtElpS-cZIldXJ3280?usp=sharing"

const BUTTON_COLOR = "#FBCFC6"

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, 'Times New Roman', serif",
}

const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  body: "text-xs sm:text-sm md:text-base lg:text-lg",
  btn: "text-xs sm:text-sm",
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

export function VideoMessage() {
  return (
    <Section
      id="video-message"
      className="relative bg-transparent pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 pb-2 sm:pb-3">
        <div
          className="relative overflow-hidden rounded-2xl border px-4 py-6 sm:rounded-3xl sm:px-5 sm:py-8 md:rounded-[2rem] md:px-8 md:py-10 lg:px-10 lg:py-11"
          style={cardStyle}
        >
          <div className="relative space-y-4 text-center sm:space-y-5 md:space-y-6">
            <div className="space-y-1 sm:space-y-1.5 md:space-y-2.5">
              <p
                className={`${cinzel.className} ${ct.label} uppercase tracking-[0.2em] sm:tracking-[0.24em]`}
                style={{ color: coastalPalette.dustyRose }}
              >
                A Message We Will Treasure
              </p>

              <h2
                className="mx-auto my-4 max-w-[18ch] leading-[1.08] sm:my-5 md:my-6 md:max-w-none"
                style={{
                  ...displayScript,
                  fontSize: "clamp(2.35rem, 7.5vw, 4.25rem)",
                  color: coastalPalette.title,
                  letterSpacing: "0.02em",
                  textShadow: coastalTitleShadow,
                }}
              >
                Send us a video message
              </h2>

              <div className="flex items-center justify-center gap-2 pt-1 sm:pt-2">
                <span
                  className="h-px w-10 sm:w-16 md:w-20"
                  style={{ backgroundColor: `color-mix(in srgb, ${coastalPalette.blueGray} 70%, white)` }}
                />
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: coastalPalette.teal }}
                />
                <span
                  className="h-px w-10 sm:w-16 md:w-20"
                  style={{ backgroundColor: `color-mix(in srgb, ${coastalPalette.blueGray} 70%, white)` }}
                />
              </div>
            </div>

            <div
              className={`${ct.body} leading-relaxed space-y-2.5 sm:space-y-3`}
              style={{ ...bodyFont, color: coastalPalette.body }}
            >
              <p>
                As we begin this new chapter under the Lord&apos;s guidance, we are
                deeply grateful for everyone He has placed in our lives.
              </p>
              <p className="italic" style={{ color: coastalPalette.dustyRose }}>
                You are a blessing we hold close to our hearts.
              </p>
              <p>
                We would love to receive a short video message from you—something we
                can keep and look back on through the years ahead.
              </p>
              <p>
                Your words will make our wedding day, and our life together, even more
                meaningful. Thank you for your love and support.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span
                className="h-px w-10 sm:w-16 md:w-20"
                style={{ backgroundColor: `color-mix(in srgb, ${coastalPalette.blueGray} 70%, white)` }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: coastalPalette.teal }}
              />
              <span
                className="h-px w-10 sm:w-16 md:w-20"
                style={{ backgroundColor: `color-mix(in srgb, ${coastalPalette.blueGray} 70%, white)` }}
              />
            </div>

            <div className="space-y-3 sm:space-y-4 pt-2 mt-10 sm:mt-12 md:mt-14">
              <p
                className={ct.body}
                style={{ ...bodyFont, color: coastalPalette.deep }}
              >
                Upload your video message here:
              </p>

              <a
                href={DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cinzel.className} inline-flex items-center justify-center rounded-full px-6 py-2.5 sm:px-8 sm:py-3 ${ct.btn} uppercase tracking-[0.18em] font-semibold border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
                style={{
                  backgroundColor: BUTTON_COLOR,
                  borderColor: coastalPalette.dustyRose,
                  color: coastalPalette.deep,
                  boxShadow: `0 6px 20px color-mix(in srgb, ${BUTTON_COLOR} 45%, transparent)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = coastalPalette.peach
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = BUTTON_COLOR
                }}
              >
                Upload Video Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
