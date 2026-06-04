"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

export default function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const [isCarousel, setIsCarousel] = useState(false);
  const [direction, setDirection] = useState("none"); // "left" | "right"
  const cursorRef = useRef(null);

  const isMobileQuery = useMediaQuery({ maxWidth: 1023 });
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent flash

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const cursorXSpring = cursorX;
  const cursorYSpring = cursorY;

  useEffect(() => {
    document.body.style.cursor = isHovering ? "" : "none";
    return () => { document.body.style.cursor = ""; };
  }, [isHovering]);

  useEffect(() => {
    if (isMobile) return;

    let rafId = null;

    const moveCursor = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);

        if (e.clientX < window.innerWidth / 2) {
          setDirection("left");
        } else {
          setDirection("right");
        }
        rafId = null;
      });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target instanceof Element) {
        if (target.closest('[data-cursor="default"]')) {
          setIsHovering(true);
          setIsCarousel(false);
          return;
        }

        if (
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.tagName === "LABEL" ||
          target.closest("a") ||
          target.closest("button") ||
          target.classList.contains("cursor-highlight")
        ) {
          setIsHovering(true);
        }

        if (
          target.closest(".embla__container") ||
          target.closest(".embla__viewport") ||
          target.closest('[data-cursor="carousel"]')
        ) {
          setIsCarousel(true);
          setIsHovering(true);
        }
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      if (target instanceof Element) {
        if (target.closest('[data-cursor="default"]')) {
          return;
        }

        if (
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.tagName === "LABEL" ||
          target.closest("a") ||
          target.closest("button") ||
          target.classList.contains("cursor-highlight")
        ) {
          setIsHovering(false);
        }

        if (
          target.closest(".embla__container") ||
          target.closest(".embla__viewport") ||
          target.closest('[data-cursor="carousel"]')
        ) {
          setIsCarousel(false);
          setIsHovering(false);
        }
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseEnter, true);
    document.addEventListener("mouseout", handleMouseLeave, true);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseEnter, true);
      document.removeEventListener("mouseout", handleMouseLeave, true);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;
  if (isHovering && !isCarousel) return null;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovering || isCarousel ? 1.3 : 1,
        }}
        transition={{
          duration: 0.1,
          ease: "easeOut",
        }}
      >
        <Image
          src="/images/icon-cursor-brand.svg"
          alt="Cursor"
          width={40}
          height={35}
          className={cn(
            "w-5 h-4.5 object-contain transition-all duration-100",
            isHovering && !isCarousel
              ? "opacity-0"
              : isCarousel
                ? "opacity-100"
                : "opacity-80",
          )}
          priority
        />
        {isCarousel && (
          <motion.div
            className="absolute flex items-center gap-3 text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <ChevronLeft
              className={cn(
                "size-4 transition-opacity duration-100",
                direction === "left" ? "opacity-100" : "opacity-30",
              )}
            />
            <ChevronRight
              className={cn(
                "size-4 transition-opacity duration-100",
                direction === "right" ? "opacity-100" : "opacity-30",
              )}
            />
          </motion.div>
        )}
      </motion.div>

      {!isCarousel && (
        <motion.div
          className="fixed pointer-events-none z-[9998] rounded-full bg-white/10 mix-blend-difference"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            width: isHovering ? 8 : 6,
            height: isHovering ? 8 : 6,
          }}
          transition={{
            duration: 0.1,
            ease: "easeOut",
          }}
        />
      )}
    </>
  );
}
