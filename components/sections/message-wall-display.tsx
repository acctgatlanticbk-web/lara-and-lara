"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { Cinzel } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const palette = {
  body: "#2a2520",
  heading: "#1a1a1a",
  label: "var(--color-motif-medium)",
  accent: "var(--color-motif-accent)",
  deep: "var(--color-motif-deep)",
  cream: "var(--color-motif-cream)",
} as const

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, serif",
}

const ct = {
  name: "text-xs sm:text-sm md:text-base",
  date: "text-[10px] sm:text-[11px] md:text-xs",
  message: "text-xs sm:text-sm md:text-base lg:text-lg",
  emptyTitle: "text-base sm:text-lg md:text-xl lg:text-2xl",
  emptyBody: "text-xs sm:text-sm md:text-base",
  badge: "text-[10px] sm:text-xs md:text-sm",
} as const

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="shadow-lg bg-motif-cream rounded-xl sm:rounded-2xl border border-motif-deep/20">
            <CardContent className="p-3 sm:p-4 md:p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-motif-deep/25" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-24 sm:w-32 bg-motif-deep/20" />
                    <Skeleton className="h-2.5 w-20 bg-motif-deep/15" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-14 sm:h-16 w-full bg-motif-deep/10 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 md:py-16 px-4">
        <div className="relative inline-block mb-5 sm:mb-6">
          <div className="absolute inset-0 bg-motif-deep/25 rounded-full blur-xl scale-150 animate-pulse-slow" />
          <div
            className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto shadow-lg"
            style={{ backgroundColor: palette.deep }}
          >
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
          </div>
        </div>
        <h3
          className={`${cinzel.className} ${ct.emptyTitle} font-semibold mb-2 sm:mb-3`}
          style={{ color: palette.cream }}
        >
          No messages yet
        </h3>
        <p
          className={`${ct.emptyBody} max-w-md mx-auto leading-relaxed mb-5 sm:mb-6`}
          style={{ ...bodyFont, color: palette.cream }}
        >
          Be the first to leave a note for the happy couple.
        </p>
        <div className="flex justify-center">
          <div className="flex items-center gap-2 sm:gap-3 px-4 py-2 bg-motif-cream/90 rounded-full border border-motif-deep/30">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-pulse" style={{ color: palette.accent }} />
            <span className={ct.badge} style={{ ...bodyFont, color: palette.body }}>
              Your message will appear here
            </span>
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-pulse" style={{ color: palette.accent, animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative shadow-lg bg-motif-cream hover:shadow-2xl transition-all duration-500 group overflow-hidden transform rounded-xl sm:rounded-2xl hover:scale-[1.01] border border-motif-deep/20 ${
            isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? "none" : "fadeInUp 0.6s ease-out forwards",
            boxShadow:
              "0 4px 18px color-mix(in srgb, var(--color-motif-deep) 15%, transparent), 0 2px 8px color-mix(in srgb, var(--color-motif-deep) 10%, transparent)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 8px 26px color-mix(in srgb, var(--color-motif-deep) 20%, transparent), 0 4px 12px color-mix(in srgb, var(--color-motif-deep) 12%, transparent)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 18px color-mix(in srgb, var(--color-motif-deep) 15%, transparent), 0 2px 8px color-mix(in srgb, var(--color-motif-deep) 10%, transparent)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-motif-deep/5 via-transparent to-motif-deep/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-motif-deep/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

          <CardContent className="relative p-3 sm:p-4 md:p-5">
            <div className="flex justify-between items-start mb-2 sm:mb-3">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md ring-2 ring-white"
                  style={{ backgroundColor: palette.accent }}
                >
                  <span className={`${cinzel.className} text-white text-[10px] sm:text-xs font-semibold`}>
                    {msg.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className={`${cinzel.className} ${ct.name} font-semibold truncate`}
                    style={{ color: palette.heading }}
                  >
                    {msg.name}
                  </h4>
                  <span className={ct.date} style={{ color: palette.label }}>
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all duration-300 group-hover:scale-110" style={{ color: palette.accent }} />
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" style={{ color: palette.label }} />
              </div>
            </div>

            <div className="relative pl-5 sm:pl-6 pr-2 sm:pr-4 py-1 sm:py-2">
              <span
                className="absolute left-0 top-0 text-2xl sm:text-3xl leading-none select-none"
                style={{ color: palette.label, opacity: 0.35, fontFamily: bodyFont.fontFamily }}
              >
                &ldquo;
              </span>
              <p
                className={`${ct.message} leading-relaxed italic relative z-10`}
                style={{ ...bodyFont, color: palette.body }}
              >
                {msg.message}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
