"use client"

import React from "react"
import localFont from "next/font/local"
import { StorySection } from "@/components/StorySection"
import { SectionCornerDecorations } from "@/components/section-corner-decorations"
import { layeredSectionTitleSize, sectionType } from "@/lib/section-typography"

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

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
      <span className="h-0.5 w-0.5 rounded-full bg-motif-deep/45 sm:h-1 sm:w-1" aria-hidden />
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
    </div>
  )
}

function LoveStoryTitle() {
  return (
    <h1
      className="welcome-title-lockup relative mx-auto w-full max-w-full pb-0 pt-14 text-center sm:pt-16 md:pt-20 lg:pt-24"
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
          color: "var(--color-welcome-navy)",
        }}
      >
       A Silver Journey
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          marginTop: "var(--script-overlap)",
          fontSize: "var(--script-size)",
          color: "var(--color-welcome-green)",
          textShadow:
            "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
        }}
      >
       25 Years of Beautiful Memories
      </span>
      <span className="sr-only">25 Years of Beautiful Memories</span>
    </h1>
  )
}

export function LoveStory() {
  return (
    <div className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative min-h-screen overflow-x-hidden`}>
      <div
        className="relative px-4 pb-0 pt-8 text-center sm:pt-10 md:pt-12"
        style={{ background: "var(--color-welcome-bg)" }}
      >
        <SectionCornerDecorations showFrame={false} corners={{ bottomLeft: false, bottomRight: false }} />

        <div className="relative z-20 mx-auto max-w-5xl @container/love-story">
          <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
            <OrnamentalDivider />
          </div>
          <div className="mx-auto mt-8 sm:mt-10 md:mt-12">
            <LoveStoryTitle />
          </div>
        </div>
{/* 
        <p
          className="font-goudy-italic mx-auto mt-4 max-w-xl text-[0.75rem] leading-snug sm:mt-5 sm:text-[0.8125rem] md:mt-6 md:text-[0.84375rem]"
          style={{ color: "var(--color-welcome-text)" }}
        >
          &ldquo;11 Years of Love, Now Forever&rdquo;
        </p> */}
      </div>

      <StorySection
  theme="light"
  layout="image-left"
  isFirst={true}
  title="A Journey That Began with Love"
  imageSrc="/mobile-background/image.png"
  text={
    <>
      <p className="mb-4">
        Twenty-five years ago, we began a journey together with hopeful hearts, shared dreams, and a promise to stand by one another through every season of life. What started as a simple "I do" has become a lifetime of cherished memories and unwavering commitment.
      </p>
    </>
  }
/>

<StorySection
  theme="dark"
  layout="image-right"
  imageSrc="/mobile-background/image.png"
  title="Growing Through Every Season"
  text={
    <>
      <p className="mb-4">
        Over the years, we have experienced countless joys, faced challenges together, celebrated milestones, and learned valuable lessons along the way. Every season has strengthened our bond and reminded us of the beauty of growing together.
      </p>
    </>
  }
/>

<StorySection
  theme="light"
  layout="image-left"
  imageSrc="/mobile-background/image.png"
  title="A Home Filled with Blessings"
  text={
    <>
      <p>
        Our marriage has been blessed with precious moments shared with family, dear friends, and loved ones. Through laughter, celebrations, and everyday life, we have found that life's greatest treasures are the people who walk beside us.
      </p>
    </>
  }
/>

<StorySection
  theme="dark"
  layout="image-right"
  imageSrc="/mobile-background/image.png"
  title="Faith as Our Foundation"
  text={
    <>
      <p>
        Through every triumph and every trial, God's grace has been our constant guide. His love has strengthened our marriage, renewed our hope, and reminded us that every blessing we enjoy today comes from His faithful hand.
      </p>
    </>
  }
/>

<StorySection
  theme="light"
  layout="image-left"
  isLast={true}
  imageSrc="/mobile-background/image.png"
  title="Twenty Five Years of Memories"
  text={
    <>
      <p className="mb-4">
        Looking back, we are filled with gratitude for every smile, every challenge overcome, every lesson learned, and every memory created together. Each chapter has shaped the story we proudly celebrate today.
      </p>
    </>
  }
/>

<StorySection
  theme="dark"
  layout="image-right"
  imageSrc="/mobile-background/image.png"
  title="Grateful for Every Person Along the Way"
  text={
    <>
      <p className="mb-4">
        Our journey has been enriched by the love, encouragement, and prayers of our family and friends. Your kindness and support have become a meaningful part of our story, and we are truly thankful to celebrate this milestone with you.
      </p>
    </>
  }
/>

<StorySection
  theme="light"
  layout="image-left"
  isLast={true}
  imageSrc="/mobile-background/image.png"
  title="Looking Forward with Hope"
  text={
    <>
      <p className="mb-4">
        As we celebrate our Silver Wedding Anniversary, we thank God for the gift of twenty-five wonderful years together. With hearts full of gratitude, we look forward to the future with renewed faith, enduring love, and the hope of many more beautiful years to come.
      </p>
    </>
  }
/>
<div
        className="relative px-4 pb-16 pt-8 text-center sm:pb-20 sm:pt-10 md:pb-24 md:pt-12"
        style={{ background: "var(--color-welcome-bg)" }}
      >
        <SectionCornerDecorations showFrame={false} corners={{ topLeft: false, topRight: false }} />

        <div className="relative z-20">
          <div className="mx-auto mb-5 sm:mb-6">
            <OrnamentalDivider />
          </div>
          <blockquote className="mx-auto max-w-xl px-2">
            <p
              className={`font-goudy-italic ${sectionType.textRelaxed} italic leading-relaxed`}
              style={{ color: "var(--color-welcome-text)" }}
            >
              &ldquo;I have found the one whom my soul loves.&rdquo;
            </p>
            <footer
              className={`font-goudy-italic mt-2 sm:mt-3 ${sectionType.label} not-italic tracking-wide`}
              style={{ color: "var(--color-welcome-green)" }}
            >
              — Song of Solomon 3: 4
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
