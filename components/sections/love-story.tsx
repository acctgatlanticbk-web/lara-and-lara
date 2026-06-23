"use client"

import React from 'react';
import Link from 'next/link';
import { StorySection } from '@/components/StorySection';
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

const coupleFont: React.CSSProperties = {
  fontFamily: "'HelloParisSans', serif",
}

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, serif",
}

// Palette lives in globals.css → @theme inline → --color-motif-*
// Edit there once to update every component.

export function LoveStory() {
  return (
    <div className="min-h-screen bg-motif-cream overflow-x-hidden">


      <div className="text-center z-0 relative px-4 pt-6 sm:pt-8">
        <div className="w-12 sm:w-16 h-[1px] bg-motif-silver mx-auto mb-4 sm:mb-6 opacity-60"></div>
        <h1
           className="leading-none"
           style={{
             ...coupleFont,
             fontSize: "clamp(2.15rem, 9vw, 4.75rem)",
             color: 'var(--color-motif-medium)',
             letterSpacing: "0.04em",
           }}
          >
          Our Love Story
          </h1>

        <p
          className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-[0.14em] sm:tracking-[0.18em] font-normal leading-snug mb-1 text-black"
          style={bodyFont}
        >
        “11 Years of Love, Now Forever”
        </p>
      </div>

      {/* SECTION 1: Top - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isFirst={true}
        title="From Friends to Lovers"
        imageSrc="/mobile-background/couple (2).webp"
        text={
          <>
            <p className="mb-4">
            We first met at PLV during our first year in college as Biological Science students. As classmates, we shared classes, projects, and countless memories, and without realizing it, our story had already begun.
            </p>
           
          </>
        }
      />

      {/* SECTION 2: Middle - Light */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (1).webp"
        // title="Became a Couple (2019)"
        text={
          <>
            <p>
            Although life eventually took us on different paths, fate brought us back together in 2014. What started as friendship blossomed into love, and on April 27, 2015, we officially began our journey as boyfriend and girlfriend. ❤️
            </p>
          </>
        }
      />

      {/* SECTION 3: Bottom - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (3).webp"
        // title="The Proposal (2025)"
        text={
          <>
            <p>
            Over the past 11 years, we have faced distance, challenges, and sacrifices, but each experience only strengthened our love, trust, and commitment to one another.
            </p>
           
          </>
        }
      />
            {/* SECTION 4: Middle - Light */}
            <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (4).webp"
        // title="Became a Couple (2019)"
        text={
          <>
            <p>
            And now, after 11 wonderful years together, we are excited to begin our greatest adventure yet. We can't wait to celebrate this special day and the start of our forever with all of you. 
            </p>
          </>
        }
      />

      {/* SECTION 5: Bottom - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (5).webp"
        // title="The Proposal (2025)"
        text={
          <>
            <p>
            Together with our families, we invite you to witness as we say, "I do".
            </p>
          </>
        }
      />
      
      {/* Footer Decoration */}
      <div className="bg-motif-cream pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 md:pb-24 text-center text-motif-deep z-0 relative px-4">
        <div className="w-12 sm:w-16 h-[1px] bg-motif-silver mx-auto mb-4 sm:mb-6 opacity-60"></div>
        <Link 
          href="#guest-list"
          className={`${cinzel.className} group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-[0.7rem] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-normal text-motif-cream bg-motif-deep rounded-sm border border-motif-deep transition-all duration-300 hover:bg-motif-accent hover:border-motif-accent hover:text-motif-cream hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-motif-soft/50 focus-visible:ring-offset-2 focus-visible:ring-offset-motif-cream`}
        >
          <span className="relative z-10">Join us</span>
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 rounded-sm bg-motif-soft opacity-0 group-hover:opacity-25 blur-md transition-opacity duration-300 -z-0"></div>
        </Link>
      </div>
    </div>
  );
}