"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

export default function LiquidSlider({ slides, activeIndex }) {
  const [prevIndex, setPrevIndex] = useState(activeIndex);
  const [direction, setDirection] = useState(0); // -1 or 1

  useEffect(() => {
    if (activeIndex !== prevIndex) {
      setDirection(activeIndex > prevIndex ? 1 : -1);
      // Wait for animation to finish before updating prev?
      // Actually with AnimatePresence we just change the key.
      setPrevIndex(activeIndex);
    }
  }, [activeIndex, prevIndex]);

  // We will render only the ACTIVE slide, but AnimatePresence will handle the exit/enter.
  const activeSlide = slides[activeIndex];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* SVG Filter Definition */}
      <svg style={{ display: "none" }}>
        <defs>
          <filter id="liquid-distortion">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              className="displacement-map"
            />
          </filter>
        </defs>
      </svg>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, filter: "url(#liquid-distortion)" }}
          animate={{ opacity: 1, filter: "url(#liquid-distortion)" }}
          exit={{ opacity: 0, filter: "url(#liquid-distortion)", zIndex: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          onAnimationStart={() => {
            // We need to animate the scale of the displacement map.
            // Since we can't easily animate the SVG tag attribute via CSS/framer directly
            // without specific targeting, we might rely on the crossfade + scale effect
            // or use a custom motion value updater.
            // For a "Liquid" feel, simple crossfade is often not enough.
            // But modifying the global ID filter affects BOTH entering and exiting elements
            // effectively canceling the cross-effect if they share the filter.
            // Solution: Use specific IDs or scoped filters if possible?
            // SVG filters by ID are global to the page.
            // This is a limitation.
            // ALTERNATIVE: Use CSS clip-path or mask for a "liquid" wipe.
            // Let's try a premium CSS clip-path animation instead which is safer
            // and often looks like liquid with the right ease.
          }}
        >
          <SlideMedia item={activeSlide} priority={true} />
        </motion.div>
      </AnimatePresence>

      {/* Fallback/Overlay to ensure we don't see white flashes */}
      <div className="absolute inset-0 bg-black -z-10" />
    </div>
  );
}

function SlideMedia({ item, priority }) {
  if (item?.media_type === "video") {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={item?.media_desktop_path} type="video/mp4" />
      </video>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={item?.media_desktop_path}
        alt={item?.media_alt || "Hero Image"}
        fill
        sizes="100vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
