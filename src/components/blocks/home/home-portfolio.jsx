"use client";

import React, { useMemo, useState, Suspense, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";

import parse from "html-react-parser";
import Link from "next/link";
import Image from "next/image";

import { motion, AnimatePresence } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollReveal from "@/components/animations/scroll-reveal";
import { Canvas } from "@react-three/fiber";
import { CarouselScene } from "@/components/animations/WebglDisplacementCarousel";

export default function HomePortfolio({ data, locale }) {
  const items = data?.items || [];
  const [activeIndex, setActiveIndex] = useState(0);

  const images = useMemo(() => {
    return items.map((item) => item.media?.path).filter(Boolean);
  }, [items]);

  const visibleItems = useMemo(() => {
    if (!items.length) return [];
    return [
      items[activeIndex % items.length],
      items[(activeIndex + 1) % items.length],
      items[(activeIndex + 2) % items.length],
    ];
  }, [activeIndex, items]);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <section className="w-full py-[40px] sm:py-[40px] xl:py-[70px] 2xl:py-[100px] bg-[#fffbf2] overflow-hidden relative z-0">
      <div className="container">
        <div className="flex flex-wrap mb-6 xl:mb-10 2xl:mb-14">
          <div className="w-full sm:w-7/12">
            <ScrollReveal delay={0.1}>
              <Heading
                as="div"
                size="h6"
                className="tracking-widest font-normal text-[#1e1e1e] flex items-center gap-x-4 mb-1"
              >
                <span className="size-2 rounded-full bg-[#c09c86]" />
                {parse(locale === "ar" ? data?.sub_title_ar : data?.sub_title)}
              </Heading>
            </ScrollReveal>
            <Heading
              as="h2"
              size="h3"
              className="font-normal text-[#1e1e1e] mb-2"
            >
              {parse(locale === "ar" ? data?.title_ar : data?.title)}
            </Heading>
          </div>

          <div className="w-full sm:w-5/12">
            <Text
              as="div"
              size="p1"
              className="line-clamp-2 text-[#1e1e1e] mb-5"
            >
              {parse(
                locale === "ar" ? data?.description_ar : data?.description,
              )}
            </Text>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              asChild
            >
              <Link href={data?.button?.link}>
                {locale === "ar" ? data?.button?.label_ar : data?.button?.label}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "container",
          locale === "ar"
            ? "max-sm:pl-0 max-sm:[mask-image:linear-gradient(to_left,black_0%,black_90%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_left,black_0%,black_95%,transparent_100%)]"
            : "max-sm:pr-0 max-sm:[mask-image:linear-gradient(to_right,black_0%,black_90%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)]",
        )}
      >
        <div className="relative">
          <div className="flex items-center -mx-1.5 lg:-mx-[1.5%] [&>div]:px-1.5 lg:[&>div]:px-[1.5%]">
            {visibleItems.map((item, slotIndex) => (
              <div
                key={`slot-${slotIndex}`}
                className={cn(
                  "flex-[0_0_220px] sm:flex-[0_0_25%]",
                  slotIndex === 0 && "flex-[0_0_55%] sm:flex-[0_0_60%]",
                  slotIndex === 1 && "flex-[0_0_26%] sm:flex-[0_0_23%]",
                  slotIndex === 2 && "flex-[0_0_20%] sm:flex-[0_0_18%]",
                )}
              >
                <PortfolioCard
                  slot={slotIndex}
                  data={item}
                  locale={locale}
                  activeIndex={activeIndex}
                  images={images}
                />
              </div>
            ))}
          </div>

          <button
            onClick={goToNext}
            className={cn(
              "w-[60px] sm:w-[100px] xl:w-[130px] 2xl:w-[160px] absolute z-0 bottom-0 cursor-pointer",
              locale === "ar" ? "left-2 sm:left-4" : "right-2 sm:right-4",
            )}
          >
            <div className="w-full h-full bg-[url('/images/home-portfolio-button-1.svg')] bg-center bg-no-repeat bg-size-[30px] sm:bg-size-[40px] xl:bg-size-[45px] 2xl:bg-size-[50px] relative hover:bg-size-[100px] transition-all duration-300">
              <Image
                src="/images/home-portfolio-button.svg"
                alt="Next"
                width={194}
                height={194}
                className="w-full h-full animate-[spin_5s_ease-in-out_infinite] relative -z-1"
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ data, slot, locale, activeIndex, images }) {
  const imageIndex = (activeIndex + slot) % images.length;
  const currentImage = images[imageIndex];

  return (
    <Suspense
      fallback={<Skeleton className="w-full h-80 sm:h-92 bg-gray-300" />}
    >
      <div
        className={cn(
          "relative overflow-hidden w-full bg-[#cda278]/10",
          slot === 0 && "h-80 lg:h-125 2xl:h-153.75 3xl:h-167",
          slot === 1 && "h-55 lg:h-97.5 2xl:h-120 3xl:h-147.5",
          slot === 2 && "h-30 lg:h-50 2xl:h-62.5 3xl:h-75",
        )}
      >
        {/* Use WebGL only on main card (slot 0), regular images for smaller cards */}
        {slot === 0 ? (
          <div className="absolute inset-0">
            {images.length > 0 && (
              <OptimizedWebglCarousel
                images={images}
                activeIndex={imageIndex}
              />
            )}
          </div>
        ) : (
          <AnimatePresence initial={false}>
            <motion.div
              key={imageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage}
                alt={data?.title || "Portfolio"}
                fill
                priority={slot === 1}
                sizes="(max-width: 640px) 25vw, 20vw"
                className="object-cover"
                quality={85}
              />
            </motion.div>
          </AnimatePresence>
        )}

        {slot === 0 && (
          <>
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/60 pointer-events-none" />

            <div className="absolute inset-x-0 bottom-0 p-4 xl:p-10 flex flex-wrap gap-2 flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={data?.title || activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Heading size="h4" className="text-white mb-1">
                      {parse(locale === "ar" ? data?.title_ar : data?.title)}
                    </Heading>
                    <Text size="p1" className="text-white">
                      <span className="font-light">
                        {locale === "ar" ? "الموقع: " : "Location: "}
                      </span>
                      {parse(
                        locale === "ar" ? data?.location_ar : data?.location,
                      )}
                    </Text>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={data?.title + "-btn" || activeIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-white min-w-25 xl:min-w-26.25 2xl:min-w-38.75 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      asChild
                    >
                      <Link href={data?.slug}>
                        {locale === "ar" ? "اعرف المزيد" : "Know More"}
                      </Link>
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
      </div>
    </Suspense>
  );
}

// Optimized WebGL Carousel - only for main portfolio card
function OptimizedWebglCarousel({ images, activeIndex }) {
  return (
    <div className="w-full h-full relative bg-[#cda278]/10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        gl={{
          powerPreference: "default",
          antialias: false,
          alpha: true,
          stencil: false,
          depth: false,
          preserveDrawingBuffer: false,
        }}
        dpr={[1, 1.5]}
      >
        <React.Suspense fallback={null}>
          <CarouselScene
            images={images}
            displacementImage="/images/pexels-photo.jpeg"
            activeIndex={activeIndex}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
