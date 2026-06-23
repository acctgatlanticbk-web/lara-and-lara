"use client"

import { useEffect, useState, type ReactNode } from "react"
import { motion } from "motion/react"
import { Instagram, Facebook, Twitter, Share2, Copy, Download, Check } from "lucide-react"
import { Section } from "@/components/section"
import { QRCodeCanvas } from "qrcode.react"
import { useSiteConfig } from "@/hooks/use-site-config"
import Image from "next/image"
import { Cinzel } from "next/font/google"
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

const BUTTON_COLOR = "#FBCFC6"

const palette = {
  body: coastalPalette.body,
  heading: coastalPalette.deep,
  label: coastalPalette.dustyRose,
  accent: coastalPalette.title,
  deep: coastalPalette.deep,
} as const

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, serif",
}

const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  body: "text-xs sm:text-sm md:text-base",
  bodyLg: "text-sm sm:text-base md:text-lg",
  cardTitle: "text-sm sm:text-base md:text-lg lg:text-xl",
  btn: "text-xs sm:text-sm md:text-base",
} as const

const cardStyle = {
  background: `linear-gradient(
    155deg,
    color-mix(in srgb, ${coastalPalette.peach} 88%, white) 0%,
    color-mix(in srgb, ${coastalPalette.lavenderBlue} 92%, white) 50%,
    color-mix(in srgb, ${coastalPalette.blueGray} 55%, white) 100%
  )`,
  borderColor: `color-mix(in srgb, ${coastalPalette.dustyRose} 38%, white)`,
  boxShadow: `0 12px 32px color-mix(in srgb, ${coastalPalette.teal} 12%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.72)`,
} as const

const QR_FG = coastalPalette.deep

function CardShell({
  children,
  className = "",
  padding = "",
}: {
  children: ReactNode
  className?: string
  padding?: string
}) {
  return (
    <div
      className={`relative w-full min-w-0 rounded-xl sm:rounded-2xl border backdrop-blur-md flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 ${padding} ${className}`}
      style={cardStyle}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/30 via-transparent to-transparent"
        aria-hidden
      />
      <div className="relative z-[1] flex flex-col gap-3 sm:gap-4 min-w-0">{children}</div>
    </div>
  )
}

export function SnapShare() {
  const siteConfig = useSiteConfig()
  const [copiedHashtagIndex, setCopiedHashtagIndex] = useState<number | null>(null)
  const [copiedAllHashtags, setCopiedAllHashtags] = useState(false)
  const [copiedDriveLink, setCopiedDriveLink] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const { groomNickname, brideNickname } = siteConfig.couple
  const coupleDisplayName = `${groomNickname} & ${brideNickname}`
  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"
  const uploadLink = siteConfig.snapShare.googleDriveLink
  const hashtags = siteConfig.snapShare.hashtag
  const allHashtagsText = hashtags.join(" ")
  const sanitizedGroomName = groomNickname.replace(/\s+/g, "")
  const sanitizedBrideName = brideNickname.replace(/\s+/g, "")

  const shareText = `Celebrate ${coupleDisplayName}'s wedding! Explore the details and share your special memories: ${websiteUrl} ${allHashtagsText}`

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      instagram: "https://www.instagram.com/",
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: "https://www.tiktok.com/",
    }

    const target = urls[platform]
    if (target) window.open(target, "_blank", "width=600,height=400")
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `${sanitizedGroomName.toLowerCase()}-${sanitizedBrideName.toLowerCase()}-wedding-qr.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const downloadAlbumQRCode = () => {
    const canvas = document.getElementById("album-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "album-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const copyHashtag = async (hashtag: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hashtag)
      setCopiedHashtagIndex(index)
      setTimeout(() => setCopiedHashtagIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyAllHashtags = async () => {
    try {
      await navigator.clipboard.writeText(allHashtagsText)
      setCopiedAllHashtags(true)
      setTimeout(() => setCopiedAllHashtags(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyUploadLink = async () => {
    if (!uploadLink) return
    try {
      await navigator.clipboard.writeText(uploadLink)
      setCopiedDriveLink(true)
      setTimeout(() => setCopiedDriveLink(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.15 } },
  }

  const primaryBtnClass = `${cinzel.className} ${ct.btn} font-semibold uppercase tracking-[0.1em] sm:tracking-[0.12em] inline-flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`

  const softBorder = `color-mix(in srgb, ${coastalPalette.blueGray} 35%, white)`

  return (
    <Section
      id="snap-share"
      className="relative bg-transparent pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 min-w-0">
        {/* Header — on silk backdrop */}
        <motion.div
          className="text-center mb-6 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p
            className={`${cinzel.className} ${ct.label} uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-2`}
            style={{ color: OUTSIDE_LABEL }}
          >
            Share Your Memories
          </p>
          <h2
            className="mx-auto my-4 whitespace-nowrap leading-[1.08] sm:my-5 md:my-6"
            style={{
              ...displayScript,
              fontSize: "clamp(2rem, 6.5vw, 4.25rem)",
              color: OUTSIDE_TEXT,
              letterSpacing: "0.02em",
              textShadow: OUTSIDE_TITLE_SHADOW,
            }}
          >
            Snap &amp; Share
          </h2>
          <p
            className={`${ct.bodyLg} max-w-2xl mx-auto leading-relaxed px-2`}
            style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}
          >
            Help us remember the little moments of {coupleDisplayName}&apos;s day — every smile, embrace, and candid laugh.
          </p>
          <div className="flex items-center justify-center pt-2 sm:pt-3">
            <span className="h-px w-16 sm:w-24 md:w-32 bg-white/50" />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-start"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Photo collage */}
          {/* <motion.div className="w-full min-w-0 lg:order-1" variants={fadeInUp}>
            <CardShell>
              <h4
                className={`${cinzel.className} ${ct.cardTitle} font-semibold text-center uppercase tracking-[0.08em]`}
                style={{ color: palette.heading }}
              >
                Our Favorite Moments
              </h4>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full min-w-0">
                <div
                  className="relative aspect-square rounded-xl overflow-hidden"
                  style={{ border: `1px solid ${softBorder}` }}
                >
                  <Image src="/mobile-background/couple (8).webp" alt="Wedding moment 1" fill className="object-cover" style={{ imageOrientation: "from-image" }} />
                </div>
                <div
                  className="relative aspect-square rounded-xl overflow-hidden"
                  style={{ border: `1px solid ${softBorder}` }}
                >
                  <Image src="/mobile-background/couple (3).webp" alt="Wedding moment 2" fill className="object-cover" style={{ imageOrientation: "from-image" }} />
                </div>
                <div
                  className="relative col-span-2 aspect-[3/2] rounded-xl overflow-hidden"
                  style={{ border: `1px solid ${softBorder}` }}
                >
                  <Image src="/desktop-background/couple (2).webp" alt="Wedding moment 3" fill className="object-cover" />
                </div>
              </div>
              <p className={`${ct.body} text-center leading-relaxed`} style={{ ...bodyFont, color: palette.body }}>
                Share your snapshots to be featured in our keepsake gallery.
              </p>
            </CardShell>
          </motion.div> */}

          {/* Right column */}
          <motion.div className="w-full min-w-0 space-y-5 sm:space-y-6 lg:order-2" variants={fadeInUp}>
            <CardShell>
              <h4
                className={`${cinzel.className} ${ct.cardTitle} font-semibold text-center uppercase tracking-[0.08em]`}
                style={{ color: palette.heading }}
              >
                Share Our Wedding Website
              </h4>
              <p className={`${ct.body} leading-relaxed text-center`} style={{ ...bodyFont, color: palette.body }}>
                Spread the word about {coupleDisplayName}&apos;s celebration. Share this QR code so friends and family can join us.
              </p>
              <div
                className="mx-auto w-full max-w-[240px] flex flex-col items-center bg-white p-3 sm:p-4 rounded-xl"
                style={{ border: `1px solid ${softBorder}`, boxShadow: `0 4px 14px color-mix(in srgb, ${coastalPalette.teal} 8%, transparent)` }}
              >
                <QRCodeCanvas
                  id="snapshare-qr"
                  value={websiteUrl}
                  size={isMobile ? 160 : 200}
                  includeMargin
                  className="max-w-full h-auto bg-white"
                  fgColor={QR_FG}
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={downloadQRCode}
                  className={primaryBtnClass}
                  style={{
                    backgroundColor: BUTTON_COLOR,
                    borderColor: coastalPalette.dustyRose,
                    color: coastalPalette.deep,
                  }}
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  Download QR
                </button>
              </div>
            </CardShell>

            <CardShell padding="!p-4 sm:!p-5">
              <h5
                className={`${cinzel.className} ${ct.body} font-semibold text-center uppercase tracking-[0.1em]`}
                style={{ color: palette.heading }}
              >
                Wedding Hashtags
              </h5>
              <div className="space-y-2 w-full min-w-0">
                {hashtags.map((hashtag, index) => (
                  <motion.button
                    key={index}
                    onClick={() => copyHashtag(hashtag, index)}
                    className="w-full min-w-0 flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border transition-all duration-200 active:scale-[0.98]"
                    style={{
                      borderColor: copiedHashtagIndex === index ? coastalPalette.teal : softBorder,
                      backgroundColor: copiedHashtagIndex === index
                        ? `color-mix(in srgb, ${coastalPalette.teal} 10%, white)`
                        : "white",
                    }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <span
                      className={`${ct.body} font-semibold text-left break-all flex-1 min-w-0`}
                      style={{ ...bodyFont, color: copiedHashtagIndex === index ? palette.accent : palette.body }}
                    >
                      {hashtag}
                    </span>
                    <span
                      className={`${cinzel.className} flex items-center gap-1 flex-shrink-0 text-[10px] sm:text-xs font-semibold uppercase tracking-wider whitespace-nowrap`}
                      style={{ color: copiedHashtagIndex === index ? palette.accent : palette.label }}
                    >
                      {copiedHashtagIndex === index ? (
                        <>
                          <Check className="w-3 h-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </span>
                  </motion.button>
                ))}
              </div>
              <button
                onClick={copyAllHashtags}
                className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full border transition-all duration-200 active:scale-[0.98] ${primaryBtnClass}`}
                style={{
                  backgroundColor: copiedAllHashtags ? coastalPalette.teal : BUTTON_COLOR,
                  borderColor: copiedAllHashtags ? coastalPalette.teal : coastalPalette.dustyRose,
                  color: copiedAllHashtags ? coastalPalette.cream : coastalPalette.deep,
                }}
              >
                {copiedAllHashtags ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedAllHashtags ? "All Copied!" : "Copy All"}
              </button>
            </CardShell>

            <CardShell>
              <h5
                className={`${cinzel.className} ${ct.cardTitle} font-semibold text-center uppercase tracking-[0.08em]`}
                style={{ color: palette.heading }}
              >
                Share on Social Media
              </h5>
              <p className={`${ct.body} text-center leading-relaxed`} style={{ ...bodyFont, color: palette.body }}>
                Help spread the word about {coupleDisplayName}&apos;s wedding across your favorite platforms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full min-w-0">
                {(
                  [
                    { platform: "instagram" as const, Icon: Instagram, label: "Instagram" },
                    { platform: "facebook" as const, Icon: Facebook, label: "Facebook" },
                    { platform: "tiktok" as const, Icon: Share2, label: "TikTok" },
                    { platform: "twitter" as const, Icon: Twitter, label: "Twitter" },
                  ] as const
                ).map(({ platform, Icon, label }) => (
                  <button
                    key={platform}
                    onClick={() => shareOnSocial(platform)}
                    className="group w-full min-w-0 flex items-center justify-center gap-2 bg-white px-3 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    style={{ border: `1px solid ${softBorder}` }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" style={{ color: coastalPalette.teal }} />
                    <span className={`${cinzel.className} ${ct.btn} font-semibold uppercase tracking-[0.08em] truncate`} style={{ color: palette.heading }}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </CardShell>

            {uploadLink && (
              <CardShell>
                <p
                  className={`${cinzel.className} ${ct.label} w-full text-center rounded-full px-3 py-1.5 uppercase tracking-[0.14em] sm:tracking-[0.18em] leading-snug break-words`}
                  style={{
                    color: coastalPalette.deep,
                    border: `1px solid ${softBorder}`,
                    backgroundColor: `color-mix(in srgb, ${coastalPalette.lavenderBlue} 40%, white)`,
                  }}
                >
                  Upload Your Photos &amp; Videos
                </p>
                <p className={`${ct.body} leading-relaxed text-center break-words`} style={{ ...bodyFont, color: palette.body }}>
                  {siteConfig.snapShare.instructions}
                </p>
                <div
                  className="mx-auto w-full max-w-[240px] flex flex-col items-center bg-white p-3 sm:p-4 rounded-xl"
                  style={{ border: `1px solid ${softBorder}` }}
                >
                  <QRCodeCanvas
                    id="album-qr"
                    value={uploadLink}
                    size={isMobile ? 160 : 200}
                    level="H"
                    includeMargin
                    className="max-w-full h-auto bg-white"
                    fgColor={QR_FG}
                  />
                  <p className={`${ct.body} mt-2 sm:mt-3 text-center`} style={{ ...bodyFont, color: palette.label }}>
                    Scan with your camera app
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-3 w-full">
                  <button
                    onClick={copyUploadLink}
                    className={primaryBtnClass}
                    style={{
                      backgroundColor: copiedDriveLink ? coastalPalette.teal : BUTTON_COLOR,
                      borderColor: copiedDriveLink ? coastalPalette.teal : coastalPalette.dustyRose,
                      color: copiedDriveLink ? coastalPalette.cream : coastalPalette.deep,
                    }}
                  >
                    {copiedDriveLink ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />}
                    {copiedDriveLink ? "Copied!" : "Copy Link"}
                  </button>
                  <button
                    onClick={downloadAlbumQRCode}
                    className={primaryBtnClass}
                    style={{
                      backgroundColor: BUTTON_COLOR,
                      borderColor: coastalPalette.dustyRose,
                      color: coastalPalette.deep,
                    }}
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    Download QR
                  </button>
                  <a
                    href={uploadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={primaryBtnClass}
                    style={{
                      backgroundColor: "white",
                      borderColor: softBorder,
                      color: palette.heading,
                    }}
                  >
                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    Upload Photos
                  </a>
                </div>
              </CardShell>
            )}
          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-6 sm:mt-10 md:mt-12 w-full min-w-0" variants={fadeInUp}>
          <CardShell className="max-w-3xl mx-auto" padding="!p-4 sm:!p-6">
            <p className={`${ct.bodyLg} leading-relaxed break-words`} style={{ ...bodyFont, color: palette.body }}>
              Thank you for helping make {coupleDisplayName}&apos;s wedding celebration memorable. Your photos and messages create beautiful memories we will treasure for a lifetime.
            </p>
            <p
              className={`${cinzel.className} ${ct.label} uppercase tracking-[0.18em] sm:tracking-[0.2em]`}
              style={{ color: palette.accent }}
            >
              Thank you for sharing the joy
            </p>
          </CardShell>
        </motion.div>
      </div>
    </Section>
  )
}
