"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import ScrollReveal from "@/components/animations/scroll-reveal";

export default function ProjectsSuccessStories({ data, locale }) {
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
    <section className="w-full py-8 sm:py-10 xl:py-[50px_80px] 2xl:py-[60px_100px] bg-[#fffbf2]">
      <div className="container">
        <div className="w-full max-w-[576px] xl:max-w-[668px] 2xl:max-w-[1020px] mx-auto mb-4 xl:mb-6 2xl:mb-8">
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
            <Text as="div" size="p1" className="text-center text-[#1e1e1e]">
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
            <div className="flex touch-pan-y touch-pinch-zoom -mx-2.5 lg:-mx-5 2xl:-mx-6 [&>*]:p-2.5 lg:[&>*]:p-5 2xl:[&>*]:p-6">
              {data?.items?.map((item, index) => (
                <div
                  key={"recent" + index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] min-w-0 select-none"
                >
                  <div className="w-full h-auto block relative z-0">
                    <div className="w-full aspect-[830/518] overflow-hidden">
                      <Image
                        src={item?.media?.path}
                        alt={
                          locale === "ar"
                            ? item?.media?.alt_ar
                            : item?.media?.alt
                        }
                        width={540}
                        height={700}
                        className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                      />
                    </div>
                    <div className="inset-x-0 bottom-0 pt-4 xl:pt-6 2xl:pt-10 flex gap-2 xl:gap-3 items-center justify-between">
                      <Heading
                        as="div"
                        size="h4"
                        className="font-normal text-[#1e1e1e]"
                      >
                        {locale == "ar" ? item?.title_ar : item?.title}
                      </Heading>
                      <Button
                        size="lg"
                        variant={"outline"}
                        className="min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        asChild
                      >
                        <Link href={item?.slug} data-cursor="default">
                          {locale == "ar" ? "عرض المشروع" : "View Project"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
