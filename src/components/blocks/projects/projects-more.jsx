"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { cn } from "@/lib/utils";
import ProjectsCard from "./projects-card";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ScrollReveal from "@/components/animations/scroll-reveal";
import { Heading } from "@/components/utils/typography";
import parse from "html-react-parser";

export default function ProjectsMore({ data, locale }) {
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const items = data?.items || [];
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const calculateScrollDistance = () => {
      if (!containerRef.current) return;

      // Get the first item to measure its width
      const firstItem = containerRef.current.querySelector(
        "[data-project-item]",
      );
      if (!firstItem) return;

      const itemWidth = firstItem.offsetWidth;
      const containerWidth = containerRef.current.offsetWidth;
      const totalWidth = itemWidth * items.length;

      // Scroll distance = total width - visible width
      const distance = totalWidth - containerWidth;
      setScrollDistance(Math.max(0, distance));
    };

    calculateScrollDistance();
    window.addEventListener("resize", calculateScrollDistance);

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(calculateScrollDistance, 100);

    return () => {
      window.removeEventListener("resize", calculateScrollDistance);
      clearTimeout(timeout);
    };
  }, [items.length]);

  if (!items || items.length === 0) return null;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  // Calculate dynamic height based on number of items
  // Formula: 100vh base + (items × 40vh) for smooth sticky scroll
  // Example: 5 items = 100 + (5 × 40) = 300vh
  const sectionHeight = useMemo(() => {
    const baseHeight = 100;
    const heightPerItem = 40;
    const calculatedHeight = baseHeight + items.length * heightPerItem;
    return `${calculatedHeight}vh`;
  }, [items.length]);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: false,
      direction: locale === "ar" ? "rtl" : "ltr",
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, pauseOnHover: true })],
  );

  return (
    <>
      {/* Desktop: Scroll-based horizontal animation */}
      <section
        ref={targetRef}
        style={{ height: sectionHeight }}
        className="relative w-full hidden sm:block"
      >
        <div className="sticky top-0 h-auto min-h-screen w-full overflow-hidden flex flex-col justify-center items-center">
          <div className="container">
            <ScrollReveal delay={0.1}>
              <Heading
                as="h2"
                size="h2"
                className="leading-normal font-normal text-[#1e1e1e] truncate"
              >
                {parse(locale == "ar" ? data?.title_ar : data?.title)}
              </Heading>
            </ScrollReveal>
          </div>
          <div
            ref={containerRef}
            className={cn(
              "w-full h-[calc(100vh-60px)] h-auto flex items-center",
              "sm:max-w-[calc(var(--container-sm)/2+50%)] md:max-w-[calc(var(--container-md)/2+50%)] lg:max-w-[calc(var(--container-lg)/2+50%)] xl:max-w-[calc(var(--container-xl)/2+50%)] 2xl:max-w-[calc(var(--container-2xl)/2+50%)] 3xl:max-w-[calc(var(--container-3xl)/2+50%)]",
              locale === "ar"
                ? "pr-4 mr-auto [mask-image:linear-gradient(to_left,black_0%,black_99%,transparent_100%)]"
                : "pl-4 ml-auto [mask-image:linear-gradient(to_right,black_0%,black_99%,transparent_100%)]",
            )}
          >
            <motion.div
              style={{
                x: locale === "ar" ? useTransform(x, (value) => -value) : x,
              }}
              className={cn(
                "flex gap-0 -mx-2 lg:-mx-4 2xl:-mx-6",
                locale === "ar" ? "pl-4 " : "pr-4 ",
              )}
            >
              {items.map((item, i) => (
                <div
                  key={item.id || i}
                  data-project-item
                  className="relative h-hull w-[40vw] sm:w-[34vw] lg:w-[30vw] shrink-0 p-2 lg:p-4 2xl:p-6 flex flex-col justify-center"
                >
                  <ProjectsCard locale={locale} data={item} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full block py-8 sm:hidden">
        <div
          className={cn(
            "container",
            locale === "ar"
              ? "pl-0 mask-[linear-gradient(to_left,black_0%,black_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,black_0%,black_95%,transparent_100%)]"
              : "pr-0 mask-[linear-gradient(to_right,black_0%,black_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)]",
          )}
        >
          <ScrollReveal delay={0.1}>
            <Heading
              as="h2"
              size="h2"
              className="leading-normal font-normal text-[#1e1e1e] mb-1"
            >
              {parse(locale == "ar" ? (data?.title_ar || "المشاريع") : (data?.title || "Projects"))}
            </Heading>
          </ScrollReveal>
          <div
            ref={emblaRef}
            className="w-full max-w-full overflow-hidden"
            data-cursor="carousel"
          >
            <div className="flex touch-pan-y touch-pinch-zoom -mx-1.5 [&>*]:p-1.5">
              {items?.map((item, i) => (
                <div
                  key={item.id || i}
                  className="flex-[0_0_220px] min-w-0 select-none"
                >
                  <ProjectsCard locale={locale} data={item} />
                </div>
              ))}
              <div className="flex-[0_0_15px] min-w-0 select-none"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
