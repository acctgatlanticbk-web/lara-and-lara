import React, { useEffect, useRef, useState } from 'react';
import { Cinzel } from "next/font/google";
import Image from 'next/image';
import {
  coastalDarkBg,
  coastalLightBg,
  coastalPalette,
} from '@/lib/coastal-palette';

import { TornPaperEdge } from './TornPaperEdge';

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, 'Times New Roman', serif",
}

interface StorySectionProps {
  imageSrc: string;
  title?: string;
  text: React.ReactNode;
  layout: 'image-left' | 'image-right';
  theme: 'dark' | 'light';
  isFirst?: boolean;
  isLast?: boolean;
}

export const StorySection: React.FC<StorySectionProps> = ({ 
  imageSrc, 
  title, 
  text, 
  layout, 
  theme,
  isFirst = false,
  isLast = false
}) => {
  const isDark = theme === 'dark';
  
  // Animation Hook
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } 
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const imageFrameStyle = isDark
    ? {
        background: `color-mix(in srgb, ${coastalPalette.lavenderBlue} 92%, white)`,
        boxShadow: `0 10px 28px color-mix(in srgb, ${coastalPalette.deep} 22%, transparent)`,
      }
    : {
        background: `color-mix(in srgb, ${coastalPalette.lavenderBlue} 95%, white)`,
        border: `1px solid color-mix(in srgb, ${coastalPalette.blueGray} 45%, white)`,
        boxShadow: `0 8px 24px color-mix(in srgb, ${coastalPalette.teal} 12%, transparent)`,
      };

  // Rotation
  const rotation = layout === 'image-left' ? 'rotate-1 md:rotate-2' : '-rotate-1 md:-rotate-2';

  const flexDirection = layout === 'image-left' ? 'flex-row' : 'flex-row-reverse';

  return (
    <div
      className="relative"
      style={{
        backgroundColor: isDark ? coastalDarkBg : coastalLightBg,
      }}
    >
      
      {/* Torn edges on light sections */}
      {!isDark && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 z-20 w-full -mt-[8px] md:-mt-[20px]">
             <TornPaperEdge flipped={true} color={coastalLightBg} />
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full -mb-[8px] md:-mb-[20px]">
             <TornPaperEdge flipped={false} color={coastalLightBg} />
          </div>
        </>
      )}
      <div 
        ref={sectionRef}
        className={`container mx-auto px-2 md:px-12 py-12 md:py-32 relative z-10 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} ${isFirst ? 'pt-16 md:pt-36' : ''} ${isLast ? 'pb-16 md:pb-36' : ''}`}
      >
        <div className={`flex ${flexDirection} items-center justify-between gap-3 md:gap-16`}>
          
          {/* Image Column */}
          <div className="w-[45%] md:w-5/12 flex justify-center shrink-0">
            <div className={`
              relative w-full md:max-w-md 
              transition-all duration-1000 delay-300 ease-out
              ${rotation}
              ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
            `}>
               <div className="w-full p-1.5 md:p-3" style={imageFrameStyle}>
                 <div className="aspect-[3/4] w-full overflow-hidden relative group">
                   <Image
                     src={imageSrc} 
                     alt="Story Moment" 
                     fill
                     sizes="(max-width: 768px) 45vw, (max-width: 1024px) 40vw, 33vw"
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     quality={90}
                     priority={false}
                   />
                   {isDark && <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none z-10" />}
                 </div>
               </div>
            </div>
          </div>
          {/* Text Column */}
          <div
            className="w-[55%] md:w-5/12"
            style={{ color: isDark ? coastalPalette.cream : coastalPalette.body }}
          >
            {title && (
              <h2
                className={`${cinzel.className} text-lg sm:text-2xl md:text-5xl lg:text-6xl mb-3 md:mb-6 tracking-wide leading-tight
                transition-all duration-1000 delay-500
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
                style={{ color: isDark ? coastalPalette.cream : coastalPalette.deep }}
              >
                {title}
              </h2>
            )}
            
            <div className={`text-[13px] leading-[1.6] sm:text-base md:text-xl lg:text-2xl md:leading-relaxed space-y-3 md:space-y-6
              transition-all duration-1000 delay-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              ${theme === 'light' ? 'italic font-normal' : 'font-light'}
            `}
              style={bodyFont}
            >
              {text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
