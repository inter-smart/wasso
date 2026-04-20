"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import {
  DotButton,
  useDotButton,
} from "@/components/utils/embla-carousel-dot-button";

import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/typography";

import { Parallax, ParallaxProvider } from "react-scroll-parallax";
const WebglDisplacementCarousel = dynamic(
  () => import("@/components/animations/WebglDisplacementCarousel"),
  { ssr: false }
);
import HackingText from "@/components/ui/hacking-text";

import Image from "next/image";
import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

export default function HomeHero({ data, locale }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      direction: locale === "ar" ? "rtl" : "ltr",
      duration: 30,
      dragFree: false,
    },
    [Autoplay({ delay: 6000, stopOnInteraction: false, pauseOnHover: false })],
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 1000], [1, 0]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const currentSlide = data?.sliders?.[selectedIndex];

  const images = useMemo(() => {
    return data?.sliders?.map((slide) => slide.media_desktop_path) || [];
  }, [data?.sliders]);

  return (
    <ParallaxProvider>
      <section className="w-full h-auto block bg-black relative z-0 xl:sticky xl:top-0 overflow-hidden">
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              className="absolute inset-0 z-50 bg-black origin-bottom"
              initial={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          )}
        </AnimatePresence>

        {/* WebGL Slider Background */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={
            isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }
          }
          style={{ opacity }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute inset-0 w-full h-full z-0"
        >
          {/* Priority Static Image for LCP */}
          {data?.sliders?.[0]?.media_desktop_path && (
            <Image
              src={data.sliders[0].media_desktop_path}
              alt={data.sliders[0].title || "Hero"}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover"
              style={{
                opacity: isRevealed ? 0 : 1,
                transition: "opacity 0.5s ease-in-out",
              }}
            />
          )}

          <div className="absolute inset-0 w-full h-full bg-linear-to-b from-black/70 via-transparent to-black/60 z-10 pointer-events-none" />
          {/* Single WebGL instance with conditional parallax for desktop */}
          <div className="w-full h-full">
            <WebglDisplacementCarousel
              images={images}
              activeIndex={selectedIndex}
            />
          </div>
          {/* <MediaQuery minWidth={640}>
            {images.length > 0 && (
              <div className="w-full h-full">
                <WebglDisplacementCarousel
                  images={images}
                  activeIndex={selectedIndex}
                />
              </div>
            )}
          </MediaQuery>
          <MediaQuery maxWidth={639}>
            {images.length > 0 && (
              <div className="w-full h-full">
                <WebglDisplacementCarousel
                  images={images}
                  activeIndex={selectedIndex}
                />
              </div>
            )}
          </MediaQuery> */}
        </motion.div>

        {/* Invisible Embla Layer for Swipe Detection */}
        <div className="absolute inset-0 z-20" ref={emblaRef}>
          <div className="flex h-full touch-pan-y">
            {data?.sliders?.map((_, index) => (
              <div
                key={"sensor-" + index}
                className="flex-[0_0_100%] h-full min-w-0"
              />
            ))}
          </div>
        </div>

        {/* Static Content Overlay */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative z-30 pointer-events-none w-full h-[576px] sm:h-[576px] xl:h-screen min-h-[576px] sm:min-h-[576px] xl:min-h-[576px] 2xl:min-h-[768px] 3xl:min-h-[900px] flex items-end py-[calc(20px+var(--header-y))_20px] sm:py-[calc(30px+var(--header-y))_30px] xl:py-[calc(40px+var(--header-y))_40px] 2xl:py-[calc(60px+var(--header-y))_60px]"
        >
          <div className="container">
            <div className="flex flex-wrap items-end">
              <div className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={
                    isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Heading
                        as="h1"
                        size="h1"
                        className="leading-snug text-white mb-4 xl:mb-7.5 2xl:mb-8 [&>span]:text-[128%] [&>span]:font-medium [&>span]:block"
                      >
                        {parse(
                          locale === "ar"
                            ? currentSlide?.title_ar || ""
                            : currentSlide?.title || "",
                        )}
                      </Heading>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="w-full sm:w-1/2 pointer-events-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="w-fit rounded-full bg-[#d9d9d9]/20 backdrop-blur-sm p-2 flex items-center gap-0.5"
                >
                  {scrollSnaps.map((_, index) => (
                    <DotButton
                      key={index}
                      onClick={() => onDotButtonClick(index)}
                      className={cn(
                        "size-2.5 border rounded-full transition-all ",
                        index === selectedIndex
                          ? "bg-none border-white"
                          : "border-[#d9d9d9] bg-[#d9d9d9] scale-60",
                      )}
                    />
                  ))}
                </motion.div>
              </div>

              <div className="w-full sm:w-1/2">
                <Heading
                  as="h6"
                  size="h6"
                  className="max-sm:text-[12px] text-end tracking-widest font-normal text-white/50 mb-1 xl:mb-2"
                >
                  <HackingText
                    text={
                      locale === "ar"
                        ? currentSlide?.project_tag_ar
                        : currentSlide?.project_tag
                    }
                    speed={50}
                  />
                </Heading>
                <Heading
                  as="h5"
                  size="h5"
                  className="max-sm:text-[14px] text-end font-medium tracking-widest text-white/50"
                >
                  <HackingText
                    text={
                      locale === "ar"
                        ? currentSlide?.project_name_ar
                        : currentSlide?.project_name
                    }
                    speed={60}
                  />
                </Heading>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </ParallaxProvider>
  );
}
