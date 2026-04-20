"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
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
import { convertRichTextToHtml } from "@/lib/sanitizer";

import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

export default function HomeAbout({ data, locale }) {
  return (
    <ParallaxProvider>
      <section className="w-full h-auto block py-[30px] sm:py-[40px] xl:py-[110px] 2xl:py-[120px] bg-white overflow-hidden relative z-0">
        <div className="container">
          <div className="flex flex-wrap sm:items-center -mx-3 sm:-mx-1 [&>*]:p-3 sm:[&>*]:p-1">
            <MediaQuery maxWidth={639}>
              <Parallax speed={-1}>
                <div className="w-full max-w-[268px] bg-gray-200 mx-auto mask-[url(/images/icon-brand.svg)] mask-center mask-contain mask-no-repeat">
                  <Image
                    src={data?.media_path}
                    alt={(locale == "ar" ? data?.media_alt_ar : data?.media_alt) || "About Section"}
                    width={308}
                    height={517}
                    className="w-full h-full object-fill"
                  />
                </div>
              </Parallax>
            </MediaQuery>
            <div className="w-full sm:w-4/12">
              <ScrollReveal delay={0.1}>
                <Heading
                  as="div"
                  size="h6"
                  className="tracking-widest font-normal text-[#1e1e1e] flex items-center gap-x-4 mb-1 xl:mb-2.5 2xl:mb-4"
                >
                  <span className="size-2 rounded-full bg-[#c09c86] inline-block" />
                  {parse(locale == "ar" ? data?.sub_title_ar || "" : data?.sub_title || "")}
                </Heading>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <Heading
                  as="h2"
                  size="h3"
                  className="font-normal text-[#1e1e1e] mb-2 xl:mb-4 2xl:mb-6"
                >
                  {parse(locale == "ar" ? data?.title_ar || "" : data?.title || "")}
                </Heading>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <Text
                  as="div"
                  size="p1"
                  className="line-clamp-10 text-black mb-4 xl:mb-8 2xl:mb-10"
                >
                  {parse(
                    convertRichTextToHtml(locale == "ar" ? data?.description_ar || "" : data?.description || "")
                  )}
                </Text>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <Button
                  size="lg"
                  variant={"outline"}
                  className="min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  asChild
                >
                  <Link
                    href={data?.button?.link}
                    target={data?.button?.isExternal ? "_blank" : "_self"}
                    rel={data?.button?.isExternal ? "noopener noreferrer" : ""}
                  >
                    {locale == "ar"
                      ? data?.button?.label_ar
                      : data?.button?.label}
                  </Link>
                </Button>
              </ScrollReveal>
            </div>

            <MediaQuery minWidth={640}>
              <div className="w-full sm:w-4/12">
                <ParallaxBanner className="w-full max-w-[268px] xl:max-w-[300px] 2xl:max-w-[360px] aspect-441/378 bg-gray-200 mx-auto mask-[url(/images/icon-brand.svg)] mask-center mask-contain mask-no-repeat">
                  <ParallaxBannerLayer speed={-5}>
                    <Image
                      src={data?.media_path}
                      alt={
                        locale == "ar" ? data?.media_alt_ar : data?.media_alt
                      }
                      width={308}
                      height={517}
                      className="w-full h-full object-fill"
                    />
                  </ParallaxBannerLayer>
                </ParallaxBanner>
              </div>
            </MediaQuery>

            <div className="w-full sm:w-4/12">
              <ScrollReveal delay={0.4}>
                <div
                  className={cn(
                    "w-full sm:max-w-[320px] 2xl:max-w-[350px] 2xl:max-w-[350px] 3xl:max-w-[430px]",
                    locale == "ar" ? "mr-auto" : "ml-auto",
                  )}
                >
                  {data?.mission && (
                    <SubItems data={data?.mission} locale={locale} />
                  )}
                  <hr className="my-4 sm:my-3 xl:my-5 2xl:my-6 border-[#d9d9d9]" />
                  {data?.vision && (
                    <SubItems data={data?.vision} locale={locale} />
                  )}
                  <hr className="my-4 sm:my-3 xl:my-5 2xl:my-6 border-[#d9d9d9]" />
                  {data?.sister_concern && (
                    <SubItems data={data?.sister_concern} locale={locale} />
                  )}
                </div>
              </ScrollReveal>
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
      <Heading
        as="h6"
        size="h7"
        className="font-medium text-[#1e1e1e] flex items-center gap-x-4 mb-3 sm:mb-1 xl:mb-2"
      >
        {parse(locale == "ar" ? data?.title_ar || "" : data?.title || "")}
        {data?.logo_path && (
          <Image
            src={data?.logo_path}
            alt={(locale == "ar" ? data?.logo_alt_ar : data?.logo_alt) || "About Logo"}
            width={52}
            height={27}
            className="w-[40px] xl:w-[50px] 2xl:w-[60px]"
          />
        )}
      </Heading>
      <Text as="div" size="p1" className="line-clamp-3 text-black">
        {parse(locale == "ar" ? data?.description_ar || "" : data?.description || "")}
      </Text>
    </div>
  );
}
