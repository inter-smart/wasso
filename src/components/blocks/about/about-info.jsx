"use client";
import Image from "next/image";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";

import {
  ParallaxBanner,
  ParallaxBannerLayer,
  ParallaxProvider,
} from "react-scroll-parallax";
import ScrollReveal from "@/components/animations/scroll-reveal";
import { convertRichTextToHtml } from "@/lib/sanitizer";

export default function AboutInfo({ data, locale }) {
  return (
    <ParallaxProvider>
      <section className="w-full h-auto block py-[30px] sm:py-[40px] lg:py-[80px] xl:py-[110px] 2xl:py-[120px] 3xl:py-[140px]">
        <div className="container">
          <div className="flex flex-wrap sm:items-center -mx-3 sm:-mx-1 [&>*]:p-3 sm:[&>*]:p-1">
            <div className="w-full lg:w-6/12">
              <ParallaxBanner className="w-full max-w-[320px] lg:max-w-[400px] xl:max-w-[490px] 2xl:max-w-[590px] 3xl:max-w-[740px] aspect-74/64 mask-[url(/images/icon-brand.svg)] mask-center mask-contain mask-no-repeat max-md:mb-2">
                <ParallaxBannerLayer speed={-5}>
                  <Image
                    src={data?.media_path}
                    alt={(locale == "ar" ? data?.media_alt_ar : data?.media_alt) || "About Image"}
                    width={308}
                    height={517}
                    className="w-full h-full object-fill select-none"
                  />
                </ParallaxBannerLayer>
              </ParallaxBanner>
            </div>
            <div className="w-full lg:w-6/12">
              <ScrollReveal delay={0.1}>
                <Heading
                  as="div"
                  size="h6"
                  className="tracking-widest font-normal text-[#1e1e1e] flex items-center gap-x-4 mb-0.5 lg:mb-1 xl:mb-1.5 2xl:mb-2 3xl:mb-2.5"
                >
                  <span className="size-2 rounded-full bg-[#c09c86] inline-block" />
                  {parse(locale == "ar" ? data?.sub_title_ar || "" : data?.sub_title || "")}
                </Heading>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <Heading
                  as="h2"
                  size="h3"
                  className="font-normal leading-tight text-[#1e1e1e] lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[480px] 3xl:max-w-[560px] mb-1 lg:mb-1.5 xl:mb-2 2xl:mb-3 3xl:mb-4"
                >
                  {parse(locale == "ar" ? data?.title_ar || "" : data?.title || "")}
                </Heading>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <Text
                  as="div"
                  size="p1"
                  className="text-[#1e1e1e] lg:max-w-[450px] xl:max-w-[520px] 2xl:max-w-[620px] 3xl:max-w-[740px] mb-4 lg:mb-6 xl:mb-8 2xl:mb-10 3xl:mb-12"
                >
                  {parse(
                    convertRichTextToHtml(locale == "ar" ? data?.description_ar || "" : data?.description || "")
                  )}
                </Text>
              </ScrollReveal>

              <div className="flex flex-wrap -mx-3 sm:-mx-1 lg:-mx-2.5 xl:-mx-3.5 2xl:-mx-4 [&>*]:p-3 sm:[&>*]:p-1 lg:[&>*]:p-2.5 xl:[&>*]:p-3.5 2xl:[&>*]:p-4 mt-[30px] lg:mt-[50px] xl:mt-[70px] 2xl:mt-[80px] 3xl:mt-[100px]">
                {data?.missionVision
                  ?.sort((a, b) => a.title.localeCompare(b.title))
                  .map((item, index) => (
                    <div key={index} className="w-full sm:w-1/2">
                      <SubItems data={item} locale={locale} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ParallaxProvider>
  );
}

function SubItems({ data, locale }) {
  return (
    <div className="w-full">
      <Image
        src={data?.icon_path}
        alt={locale == "ar" ? data?.title_ar : data?.title}
        width={45}
        height={45}
        className="w-[40px] lg:w-[42px] xl:w-[45px] 2xl:w-[52px] 3xl:w-[60px] object-contain block select-none mb-2.5 lg:mb-3.5 xl:mb-5 2xl:mb-6 3xl:mb-7"
      />
      <Heading
        as="h6"
        size="h7"
        className="font-medium text-[#1e1e1e] mb-2 lg:mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5"
      >
        {parse(locale == "ar" ? data?.title_ar || "" : data?.title || "")}
      </Heading>
      <Text
        as="div"
        size="p1"
        className="lg:text-[11px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] line-clamp-20 text-[#1e1e1e]"
      >
        {parse(locale == "ar" ? data?.description_ar || "" : data?.description || "")}
      </Text>
    </div>
  );
}
