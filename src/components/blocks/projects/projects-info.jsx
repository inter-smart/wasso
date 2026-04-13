"use client";

import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

export default function ProjectsInfo({ data, locale }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      direction: locale === "ar" ? "rtl" : "ltr",
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, pauseOnHover: true })],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const currentSlide = data?.items?.[selectedIndex];

  // if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section className="w-full py-[30px_15px] sm:py-[40px_20px] xl:py-[80px_45px] 2xl:py-[100px_55px]">
      <div className="container">
        <div className="flex flex-wrap -mx-1.5 lg:-mx-6 2xl:-mx-7.5 [&>*]:p-1.5 lg:[&>*]:p-6 2xl:[&>*]:p-7.5">
          {data.items && data.items.length > 0 && (
            <div className="w-full sm:w-7/12">
              <div
                ref={emblaRef}
                className="w-full max-w-full overflow-hidden relative z-0"
                data-cursor="carousel"
              >
                <div className="flex touch-pan-y touch-pinch-zoom">
                  {data?.items?.map((item, index) => (
                    <div
                      key={"product" + index}
                      className={cn("flex-[0_0_100%] min-w-0 select-none")}
                    >
                      <div className="w-full h-[320px] xl:h-[440px] 2xl:h-[530px] 3xl:h-[668px]">
                        <Image
                          src={item?.media?.path}
                          alt={
                            locale === "ar"
                              ? item?.media?.alt_ar
                              : item?.media?.alt
                          }
                          width={1100}
                          height={668}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute z-0 bottom-4 right-4 xl:bottom-6 xl:right-6 flex gap-2">
                  {scrollSnaps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={cn(
                        "size-2.5 xl:size-3.5 border rounded-full transition-all",
                        index === selectedIndex
                          ? "bg-none border-white"
                          : "border-white bg-white scale-60",
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentSlide?.title ||
            currentSlide?.title_ar ||
            currentSlide?.description ||
            (currentSlide?.description_ar && (
              <div className="w-full sm:w-5/12">
                <div className="w-full h-full bg-[#fffbf2] p-6 xl:p-9 2xl:p-10 3xl:p-12 relative z-0">
                  <Image
                    src={"/images/projects-info-bg.png"}
                    alt="projects-info-bg"
                    width={536}
                    height={668}
                    className="w-full h-full object-cover absolute -z-1 inset-0"
                  />

                  <Heading
                    as="h2"
                    size="h8"
                    className="font-normal text-[#1e1e1e] mb-3 xl:mb-8 3xl:mb-11"
                  >
                    {parse(
                      (locale == "ar"
                        ? currentSlide?.title_ar
                        : currentSlide?.title) || "",
                    )}
                  </Heading>
                  <Text
                    as="div"
                    size="p1"
                    className="text-[#1e1e1e] mb-3 xl:mb-5 2xl:mb-6 xl:[&>p]:mb-2.5 3xl:[&>p]:mb-3"
                  >
                    {parse(
                      (locale === "ar"
                        ? currentSlide?.description_ar
                        : currentSlide?.description) || "",
                    )}
                  </Text>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
