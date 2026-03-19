"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    // Fallback timer: fallback to hide loader anyway if video fails to load/play
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    if (!isVideoReady) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Slightly longer for premium feel

    return () => clearTimeout(timer);
  }, [isVideoReady]);

  return (
    <>
      {/* <AnimatePresence mode="wait"> */}
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 1.0,
            ease: [0.76, 0, 0.24, 1], // Custom quint-like easing for "curtain" feel
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="relative z-10"
          >
            {/* <Image
              src="/images/brand-logo.svg"
              alt="WASSO"
              width={110}
              height={120}
              className="w-[100px] xl:w-[130px] h-auto"
              priority
            /> */}
            <video
              src="/videos/wasso-page-loader.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              fetchPriority="high"
              onPlaying={() => setIsVideoReady(true)}
            ></video>
          </motion.div>
        </motion.div>
      )}
      {/* </AnimatePresence> */}
    </>
  );
}
