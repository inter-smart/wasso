"use client";
import Image from "next/image";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";

import {
  Parallax,
  ParallaxBanner,
  ParallaxBannerLayer,
  ParallaxProvider,
} from "react-scroll-parallax";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/animations/scroll-reveal";

export default function AboutSpec({ data, locale }) {
  return (
    <ParallaxProvider>
      <section className="w-full h-auto block bg-white">
        <div className={cn("", locale === "ar" ? "pl-0" : "pr-0")}>
          <div className="flex flex-wrap">
            <div className="w-full md:w-[53%]">
              <div className="h-full flex flex-wrap [&>*]:p-[1px]">
                {data?.items.map((item, i) => (
                  <ScrollReveal
                    key={item?.id || i}
                    delay={0.1}
                    className="w-full sm:w-1/2 sm:h-1/2"
                  >
                    <SubItems data={item} i={i} locale={locale} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div className="w-full md:w-[47%]">
              <ParallaxBanner className="w-full h-auto aspect-[2/1] md:aspect-[885/1000]">
                <ParallaxBannerLayer speed={-5}>
                  {data?.media?.media_path && (
                    <Image
                      src={data?.media?.media_path}
                      alt={
                        locale == "ar"
                          ? data?.media?.media_alt_ar
                          : data?.media?.media_alt
                      }
                      width={885}
                      height={1000}
                      className="w-full h-full object-cover select-none hover:scale-105 transition-all duration-500"
                    />
                  )}
                </ParallaxBannerLayer>
              </ParallaxBanner>
            </div>
          </div>
        </div>
      </section>
    </ParallaxProvider>
  );
}

function SubItems({ data, i, locale }) {
  const special = (Math.floor(i / 2) + (i % 2)) % 2 === 0;

  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center p-5 lg:p-11 xl:p-12 2xl:p-20 3xl:p-25 max-md:py-8",
        special ? "bg-[#fffbf2]" : "bg-[#fafafa]",
      )}
    >
      <div>
        {data?.icon_path && (
          <Image
            src={data?.icon_path}
            alt={locale == "ar" ? data?.title_ar : data?.title}
            width={45}
            height={45}
            className="w-[40px] lg:w-[42px] xl:w-[45px] 2xl:w-[52px] 3xl:w-[60px] object-contain block select-none mx-auto mb-2.5 lg:mb-3.5 xl:mb-5 2xl:mb-6 3xl:mb-7"
          />
        )}
        <Heading
          as="h6"
          size="h5"
          className="font-medium text-center text-[#1e1e1e] mb-2 lg:mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5"
        >
          {parse(locale == "ar" ? data?.title_ar || "" : data?.title || "")}
        </Heading>
        <Text
          as="div"
          size="p1"
          className="line-clamp-3 text-center text-black"
        >
          {parse(locale == "ar" ? data?.description_ar || "" : data?.description || "")}
        </Text>
      </div>
    </div>
  );
}
