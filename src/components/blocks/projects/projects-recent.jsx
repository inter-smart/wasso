"use client";

import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";
import ProjectsCard from "./projects-card";
import ScrollReveal from "@/components/animations/scroll-reveal";

export default function ProjectsRecent({ data, locale }) {
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
    <section className="w-full py-[15px] sm:py-[20px] xl:py-[45px] 2xl:py-[55px]">
      <div className="container">
        <div className="w-full max-w-[576px] xl:max-w-[780px] 2xl:max-w-[810px] mx-auto mb-4 xl:mb-6 2xl:mb-8">
          <ScrollReveal delay={0.1}>
            <Heading
              as="h2"
              size="h2"
              className="font-normal text-center text-[#1e1e1e] mb-1"
            >
              {parse(locale == "ar" ? data?.title_ar || "" : data?.title || "")}
            </Heading>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Text
              as="div"
              size="p1"
              className="line-clamp-2 text-center text-[#1e1e1e]"
            >
              {parse(locale == "ar" ? data?.description_ar || "" : data?.description || "")}
            </Text>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.3}>
          <div
            ref={emblaRef}
            className="w-full max-w-full overflow-hidden relative z-0"
            data-cursor="carousel"
          >
            <div className="flex touch-pan-y touch-pinch-zoom -mx-1.5 lg:-mx-3 2xl:-mx-4 [&>*]:p-1.5 lg:[&>*]:p-3 2xl:[&>*]:p-4">
              {data?.items?.map((item, index) => (
                <div
                  key={"recent" + index}
                  className={cn(
                    "flex-[0_0_220px] sm:flex-[0_0_33.333%] lg:flex-[0_0_33.333%] min-w-0 select-none",
                  )}
                >
                  <ProjectsCard locale={locale} data={item} />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
