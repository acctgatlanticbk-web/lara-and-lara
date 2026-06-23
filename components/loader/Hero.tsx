'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSiteConfig } from '@/hooks/use-site-config';
import Image from 'next/image';

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}

const SEA_WAVES_VIDEO = '/background_music/Sea%20Waves%20-%20Sound%20Effect.mp4';

// Shared beach pastel palette — matches LoadingScreen
const PALETTE = {
  cream: '#F1EDE2',
  sand: '#E8D5C4',
  seafoam: '#AFC8E6',
  sky: '#B8D4E3',
  blush: '#D8B0B0',
  coral: '#C98B8B',
  peach: '#E8C4B8',
  shell: '#F5E6DC',
  aqua: '#9EC5D4',
  mist: '#D4E8EF',
} as const;


const NAME_COLOR = '#6A9BB8';

const LOADING_RADIAL_OVERLAY =
  'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.22) 52%, rgba(255, 255, 255, 0.1) 100%)';

const LOADING_PASTEL_WASH = `
  radial-gradient(circle at 14% 18%, ${PALETTE.seafoam}28 0%, transparent 40%),
  radial-gradient(circle at 86% 14%, ${PALETTE.blush}24 0%, transparent 38%),
  radial-gradient(circle at 78% 82%, ${PALETTE.peach}22 0%, transparent 42%),
  radial-gradient(circle at 20% 78%, ${PALETTE.mist}30 0%, transparent 38%),
  radial-gradient(circle at 50% 50%, ${PALETTE.sand}20 0%, transparent 52%)
`;

export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  const siteConfig = useSiteConfig();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setContentVisible(true), 300);
      return () => clearTimeout(timer);
    }
    setContentVisible(false);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, [visible]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gentleFloat {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-8px);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
      <div className={`fixed inset-0 z-30 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      {/* Sea waves video background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={SEA_WAVES_VIDEO} type="video/mp4" />
        </video>

        {/* Overlays — same treatment as LoadingScreen */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: LOADING_RADIAL_OVERLAY }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            opacity: 0.55,
            background: LOADING_PASTEL_WASH,
          }}
          aria-hidden
        />

        {/* Soft bottom lift for hero copy — cream/mist from LoadingScreen palette */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(
              to top,
              ${PALETTE.cream}B8 0%,
              ${PALETTE.mist}59 34%,
              transparent 62%
            )`,
          }}
          aria-hidden
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        
        {/* Top Logo/Monogram */}
        <div 
          className={`mb-auto mt-8 transition-all duration-1000 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
            {/* Monogram Image with subtle animation */}
            <div 
              className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 transition-transform duration-700 ease-out hover:scale-105"
              style={{
                animation: contentVisible ? 'gentleFloat 3s ease-in-out infinite' : 'none'
              }}
            >
              <Image
                src={siteConfig.couple.monogram}
                alt="Monogram"
                fill
                className="object-contain"
                priority
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(100%) drop-shadow(0 8px 22px rgba(175, 200, 230, 0.75))',
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col items-center justify-end w-full gap-5 sm:gap-6 pb-14 sm:pb-16 md:pb-20">
          <h2
            className={`text-6xl md:text-8xl transform -rotate-6 transition-all duration-1000 ease-out delay-200 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontWeight: 400,
              color: '#FFFFFF',
              textShadow:
                '0 2px 8px rgba(45, 67, 79, 0.35), 0 0 20px rgba(175, 200, 230, 0.45)',
            }}
          >
            You are
          </h2>
          
          <h1
            className={`text-5xl md:text-7xl font-bold tracking-wider uppercase transition-all duration-1000 ease-out delay-300 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              color: '#FFFFFF',
              textShadow:
                '0 2px 8px rgba(45, 67, 79, 0.35), 0 0 20px rgba(175, 200, 230, 0.45)',
              letterSpacing: '0.05em',
            }}
          >
            Invited!
          </h1>

          <button 
            onClick={() => {
              onOpen();
            }}
            className={`px-10 py-4 font-serif text-sm tracking-[0.2em] uppercase rounded-sm border transition-all duration-500 ease-out delay-500 shadow-lg hover:shadow-xl ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              backgroundColor: NAME_COLOR,
              borderColor: PALETTE.sky,
              color: PALETTE.cream,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = PALETTE.seafoam;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = PALETTE.cream;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = NAME_COLOR;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = PALETTE.sky;
            }}
          >
            <span
              style={{
                fontFamily: '"Cinzel", serif',
                fontWeight: 500,
                color: PALETTE.cream,
                letterSpacing: '0.18em',
              }}
            >
              Open Invitation
            </span>
          </button>
        </div>

        {/* Bottom Spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
};