"use client";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";

import parse from "html-react-parser";
import Link from "next/link";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { Suspense, useState } from "react";
import Image from "next/image";

import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceFlagship({ data, locale }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: false, direction: locale === "ar" ? "rtl" : "ltr" },
    [Autoplay({ delay: 6000, stopOnInteraction: true, pauseOnHover: true })],
  );

  if (!data?.items || data.items.length === 0) return null;

  return (
    <section className="w-full h-auto block py-[20px_40px] sm:py-[20px_40px] xl:py-[35px_80px] 2xl:py-[40px_110px] overflow-hidden">
      <div className="container">
        <Heading as="h2" size="h3" className="font-normal text-[#1e1e1e] mb-2">
          {parse(locale == "ar" ? data?.title_ar : data?.title)}
        </Heading>
        <div
          className={cn(
            "",
            locale === "ar"
              ? "max-sm:pl-0 max-sm:[mask-image:linear-gradient(to_left,black_0%,black_90%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_left,black_0%,black_95%,transparent_100%)]"
              : "max-sm:pr-0 max-sm:[mask-image:linear-gradient(to_right,black_0%,black_90%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)]",
          )}
        >
          <div
            className="w-full max-w-full overflow-hidden"
            ref={emblaRef}
            data-cursor="carousel"
          >
            <div className="flex touch-pan-y touch-pinch-zoom">
              {data?.items?.map((item, index) => (
                <div
                  key={"product" + index}
                  className="flex-[0_0_100%] 3xs:flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] min-w-0 select-none"
                >
                  <FlagshipCard data={item} index={index} locale={locale} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlagshipCard({ data, index, locale }) {
  const [hovered, setHovered] = useState(null);
  return (
    <Suspense
      fallback={
        <Skeleton className="w-full h-[400px] sm:h-[450px] lg:h-[500px] 2xl:h-[548px] 3xl:h-[668px] bg-gray-400" />
      }
    >
      <motion.div
        className="w-full h-[320px] sm:h-[368px] lg:h-[440px] 2xl:h-[640px] 3xl:h-[760px] relative"
        onHoverStart={() => setHovered(index)}
        onHoverEnd={() => setHovered(null)}
      >
        <motion.div className="group w-full h-full relative">
          <div
            className="absolute inset-0 backface-hidden overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div
              className={cn(
                "w-full h-[40%] bg-linear-to-b from-transparent to-black/50 absolute z-1 inset-0 top-auto pointer-events-none",
              )}
            />
            <Image
              src={data?.media?.path || "/images/placeholder.webp"}
              alt={(locale == "ar" ? data?.media?.alt_ar : data?.media?.alt) || "Service Flagship"}
              width={432}
              height={668}
              className="w-full h-full object-cover"
            />
            <Heading
              as="div"
              size="h4"
              className="font-semibold text-white absolute z-1 inset-0 top-auto p-3 xl:p-5 2xl:p-8 group-hover:opacity-0"
            >
              {parse(locale == "ar" ? data?.title_ar : data?.title)}
            </Heading>
          </div>

          <motion.div
            animate={{
              rotateY: hovered === index ? 0 : 180,
              opacity: hovered === index ? 1 : 0,
              blur: hovered === index ? 0 : 2,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ perspective: 1200 }}
            className="h-fit absolute z-1 inset-[auto_20px_20px] xl:inset-[auto_25px_25px] 3xl:inset-[auto_35px_35px] top-auto m-auto bg-[rgba(255,255,255,90%)] bg-[url(/images/home-services-box-bg.png)] bg-cover flex items-center p-5 xl:p6 2xl:p-10"
          >
            <div>
              <Heading
                as="div"
                size="h4"
                className="font-semibold text-black mb-1 xl:mb-2.5 2xl:mb-3"
              >
                {parse(locale == "ar" ? data?.title_ar : data?.title)}
              </Heading>
              <Text as="div" size="p1" className="line-clamp-7 text-black">
                {parse(
                  (locale === "ar"
                    ? data?.description_ar
                    : data?.description) || "",
                )}
              </Text>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </Suspense>
  );
}
