"use client";

import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectsExplore({ data, locale }) {
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
    <section className="w-full py-[15px_30px] sm:py-[20px_40px] xl:py-[45px_90px] 2xl:py-[55px_110px]">
      <div className="container">
        <div className="w-full max-w-[576px] xl:max-w-[668px] 2xl:max-w-[810px] mx-auto mb-4 xl:mb-6 2xl:mb-8">
          <Heading
            as="h2"
            size="h2"
            className="font-normal text-center text-[#1e1e1e] mb-1 xl:mb-2"
          >
            {parse(locale == "ar" ? data?.title_ar || "" : data?.title || "")}
          </Heading>
          <div className="flex justify-center">
            <Button
              size="lg"
              variant={"outline"}
              className="text-center min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] transition-all duration-300 bg-[#fffbf2] hover:scale-105"
              asChild
            >
              <Link href={data?.slug}>
                {locale == "ar"
                  ? "عرض المزيد من المشاريع"
                  : "View More Projects"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
