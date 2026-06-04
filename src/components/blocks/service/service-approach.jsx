"use client";
import parse from "html-react-parser";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Heading } from "@/components/utils/typography";
import ServiceApproachCard from "./service-approach-card";

export default function ServiceApproach({ data, locale }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: false, direction: locale === "ar" ? "rtl" : "ltr" },
    [Autoplay({ delay: 6000, stopOnInteraction: true, pauseOnHover: true })],
  );

  return (
    <section className="w-full h-auto block relative z-0 pb-[30px] sm:pb-[40px] xl:pb-[60px] 2xl:pb-[60px] bg-white overflow-hidden">
      <div className="container">
        <div className="w-full">
          <Heading
            as="h3"
            size="h3"
            className="mb-5 font-normal text-[#1E1E1E]"
          >
            {parse(locale == "ar" ? data?.main_title_ar || "" : data?.main_title || "")}
          </Heading>
        </div>
        <div className="" ref={emblaRef}>
          <div className="flex touch-pan-y touch-pinch-zoom">
            {data?.items?.map((item, index) => (
              <div
                key={item.id}
                className={
                  "flex-[0_0_80%] 3xs:flex-[0_0_60%] xs:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%] min-w-0 select-none"
                }
              >
                <ServiceApproachCard
                  data={item}
                  index={index}
                  locale={locale}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
