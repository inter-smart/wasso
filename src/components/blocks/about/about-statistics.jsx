"use client";

import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";

import { Heading, Text } from "@/components/utils/typography";

import parse from "html-react-parser";

import CountUp from "react-countup";
import ScrollReveal from "@/components/animations/scroll-reveal";
import { cn } from "@/lib/utils";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function AboutStatistics({ data, locale }) {
  const [activeIndex, setActiveIndex] = useState(null);

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
    <section className="w-full block bg-white relative z-0">
      <div
        className={cn(
          "",
          locale === "ar"
            ? "max-sm:pl-0 max-sm:[mask-image:linear-gradient(to_left,black_0%,black_90%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_left,black_0%,black_95%,transparent_100%)]"
            : "max-sm:pr-0 max-sm:[mask-image:linear-gradient(to_right,black_0%,black_90%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)]",
        )}
      >
        <div
          ref={emblaRef}
          className="w-full max-w-full overflow-hidden"
          data-cursor="carousel"
        >
          <div className="flex touch-pan-y touch-pinch-zoom">
            {data?.items?.map((item, index) => (
              <div
                key={"statistics-item-" + index}
                className={cn(
                  "flex-[0_0_220px] sm:flex-[0_0_33.333%] lg:flex-[0_0_20%] min-w-0 select-none",
                )}
              >
                <div
                  className="w-full h-[368px] xl:h-[500px] 2xl:h-[600px] 3xl:h-[740px] bg-linear-to-b from-[#fffbf2] to-white overflow-hidden relative z-0 transition-transform duration-300 "
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <Image
                    src={"/images/about-statics-bg.jpg"}
                    alt={locale === "ar" ? item?.label_ar : item?.label}
                    width={387}
                    height={755}
                    className={cn("w-full h-full object-cover transition-transform duration-300 absolute -z-1 inset-0 translate-y-full",
                      index % 2 === 0 ? "translate-y-full" : "-translate-y-full",
                      activeIndex === index && " translate-y-0",
                      index === 2 && "translate-y-0"
                    )}
                  />
                  <div className={cn("absolute z-1 xl:inset-x-2.5 2xl:inset-x-3 flex justify-center",
                    index % 2 === 0 ? "bottom-1 xl:bottom-2.5 2xl:bottom-3" : "top-1 xl:top-2.5 2xl:top-3",
                    index === 2 && "bottom-1 xl:bottom-2.5 2xl:bottom-3"
                  )}>
                    <ScrollReveal
                      delay={index * 0.1}
                      className={cn("w-full  p-4 xl:p-6 2xl:p-8 relative z-0 overflow-hidden transition duration-300",
                        activeIndex === index ? "bg-[#fff]/90" : "bg-none",
                        index === 2 && "bg-[#fff]/90"
                      )}
                    >
                      <Image
                        src={"/images/projects-info-bg.png"}
                        alt="projects-info-bg"
                        width={536}
                        height={668}
                        className={cn("w-full h-full object-cover absolute -z-1 inset-0 scale-120 transition duration-300",
                          activeIndex === index ? "opacity-100" : "opacity-0",
                          index === 2 && "opacity-100"
                        )}
                      />

                      <Heading
                        as="div"
                        size="h1"
                        className={cn(
                          "max-sm:text-[22px] font-normal text-[#1e1e1e] mb-1 xl:mb-2 2xl:mb-3 transition-all duration-300",
                          activeIndex === index && "text-[#cda278]",
                        )}
                      >
                        <CountUp
                          end={parseInt(item?.number)}
                          duration={2.75}
                          separator=""
                          suffix={item?.suffix}
                          enableScrollSpy
                        />
                      </Heading>
                      <Heading
                        as="div"
                        size="h7"
                        className="font-medium text-black mb-1.5 xl:mb-2.5 2xl:mb-3"
                      >
                        {locale === "ar" ? item?.label_ar : item?.label}
                      </Heading>
                      <Text
                        as="div"
                        size="p2"
                        className="line-clamp-2 font-normal text-black mb-3 xl:mb-2 2xl:mb-2.5"
                      >
                        {parse(
                          locale === "ar"
                            ? item?.description_ar
                            : item?.description,
                        )}
                      </Text>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
