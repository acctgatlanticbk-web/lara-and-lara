"use client"

import React from 'react';
import Link from 'next/link';
import { StorySection } from '@/components/StorySection';
import { Cinzel } from "next/font/google";
import {
  coastalLightBg,
  coastalPalette,
  displayScript,
  coastalTitleShadow,
} from '@/lib/coastal-palette';

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, 'Times New Roman', serif",
}

export function LoveStory() {
  return (
    <div className="min-h-screen overflow-x-hidden">

      <div
        className="relative z-0 px-4 pb-2 pt-8 text-center sm:pt-10 md:pt-12"
        style={{ backgroundColor: coastalLightBg }}
      >
        <div
          className="mx-auto mb-5 h-px w-12 opacity-70 sm:mb-6 sm:w-16 md:mb-7"
          style={{ backgroundColor: `color-mix(in srgb, ${coastalPalette.blueGray} 75%, white)` }}
        />
        <h1
          className="mx-auto mt-2 max-w-[16ch] leading-[1.08] sm:mt-3 md:max-w-none md:mt-4"
          style={{
            ...displayScript,
            fontSize: "clamp(2.35rem, 7.5vw, 4.25rem)",
            color: coastalPalette.title,
            letterSpacing: "0.02em",
            textShadow: coastalTitleShadow,
          }}
        >
          Our Love Story
        </h1>

        <p
          className="mx-auto mt-4 max-w-xl text-sm font-normal leading-snug tracking-[0.12em] sm:mt-5 sm:text-lg md:mt-6 md:text-xl lg:text-2xl"
          style={{ ...bodyFont, color: coastalPalette.body, fontStyle: 'italic' }}
        >
          &ldquo;11 Years of Love, Now Forever&rdquo;
        </p>
      </div>

      {/* SECTION 1: Top - Light */}
      <StorySection
        theme="light"
        layout="image-left"
        isFirst={true}
        title="From Friends to Lovers"
        imageSrc="/mobile-background/image.png"
        text={
          <>
            <p className="mb-4">
            We first met at PLV during our first year in college as Biological Science students. As classmates, we shared classes, projects, and countless memories, and without realizing it, our story had already begun.
            </p>
           
          </>
        }
      />

      {/* SECTION 2: Middle - Dark */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/image.png"
        text={
          <>
            <p>
            Although life eventually took us on different paths, fate brought us back together in 2014. What started as friendship blossomed into love, and on April 27, 2015, we officially began our journey as boyfriend and girlfriend. ❤️
            </p>
          </>
        }
      />

      {/* SECTION 3: Bottom - Light */}
      <StorySection
        theme="light"
        layout="image-left"
        imageSrc="/mobile-background/image.png"
        text={
          <>
            <p>
            Over the past 11 years, we have faced distance, challenges, and sacrifices, but each experience only strengthened our love, trust, and commitment to one another.
            </p>
           
          </>
        }
      />
      {/* SECTION 4: Middle - Dark */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/image.png"
        text={
          <>
            <p>
            And now, after 11 wonderful years together, we are excited to begin our greatest adventure yet. We can&apos;t wait to celebrate this special day and the start of our forever with all of you. 
            </p>
          </>
        }
      />

      {/* SECTION 5: Bottom - Light */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/image.png"
        text={
          <>
            <p>
            Together with our families, we invite you to witness as we say, &ldquo;I do&rdquo;.
            </p>
          </>
        }
      />
      
      {/* Footer */}
      <div
        className="relative z-0 px-4 pb-16 pt-8 text-center sm:pb-20 sm:pt-10 md:pb-24 md:pt-12"
        style={{ backgroundColor: coastalLightBg }}
      >
        <div
          className="mx-auto mb-5 h-px w-12 opacity-70 sm:mb-6 sm:w-16"
          style={{ backgroundColor: `color-mix(in srgb, ${coastalPalette.blueGray} 75%, white)` }}
        />
        <Link 
          href="#guest-list"
          className={`${cinzel.className} group relative inline-flex items-center justify-center rounded-sm border px-6 py-2.5 text-[0.7rem] font-normal uppercase tracking-[0.2em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-8 sm:py-3 sm:text-xs sm:tracking-[0.3em] md:px-10 md:py-3.5 md:text-sm`}
          style={{
            backgroundColor: coastalPalette.teal,
            borderColor: coastalPalette.deep,
            color: coastalPalette.cream,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = coastalPalette.title
            e.currentTarget.style.borderColor = coastalPalette.teal
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = coastalPalette.teal
            e.currentTarget.style.borderColor = coastalPalette.deep
          }}
        >
          <span className="relative z-10">Join us</span>
          <div
            className="absolute inset-0 -z-0 rounded-sm opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25"
            style={{ backgroundColor: coastalPalette.blueGray }}
          />
        </Link>
      </div>
    </div>
  );
}
