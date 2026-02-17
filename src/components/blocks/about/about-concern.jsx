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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AboutConcern({ data, locale }) {
  return (
    <ParallaxProvider>
      <section className="w-full h-auto block py-[30px] sm:py-[40px] lg:py-[80px] xl:py-[110px] 2xl:py-[120px] 3xl:py-[140px]">
        <div className="container">
          <div className="flex flex-wrap sm:items-center -mx-4 lg:-mx-5 xl:-mx-7 2xl:-mx-8 [&>*]:p-4 lg:[&>*]:p-5 xl:[&>*]:p-7 2xl:[&>*]:p-8">
            <div className="w-full lg:w-6/12">
              <ScrollReveal delay={0.2}>
                <Heading
                  as="h2"
                  size="h3"
                  className="font-normal text-[#1e1e1e] mb-2 lg:mb-2.5 xl:mb-3 2xl:mb-6 3xl:mb-8"
                >
                  {parse(locale == "ar" ? data?.title_ar : data?.title)}
                </Heading>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className={cn("typography", "[--text-color:#1e1e1e]")}
                >
                  {parse(
                    locale == "ar" ? data?.description_ar : data?.description,
                  )}
                </div>
              </ScrollReveal>
              <Button
                variant="link"
                size="lg"
                className={"font-normal text-[#C09C86] p-0.5"}
                asChild
              >
                <Link
                  href={
                    locale == "ar" ? data?.button?.slug_ar : data?.button?.slug
                  }
                >
                  {locale == "ar"
                    ? data?.button?.label_ar
                    : data?.button?.label}
                  <Image
                    src="/images/icon-arrow-1.svg"
                    alt="icon-arrow-1"
                    width={39}
                    height={8}
                    className="w-[39px] h-[8px] object-contain select-none"
                  />
                </Link>
              </Button>
            </div>

            <div className="w-full lg:w-6/12">
              <ParallaxBanner className="w-full aspect-91/54 relative z-0">
                <ParallaxBannerLayer speed={-5}>
                  <Image
                    src={data?.media?.media_path}
                    alt={
                      locale == "ar"
                        ? data?.media?.media_alt_ar
                        : data?.media?.media_alt
                    }
                    width={913}
                    height={540}
                    className="w-full h-full object-cover select-none hover:scale-105 transition-all duration-500"
                  />
                </ParallaxBannerLayer>
                <Image
                  src={data?.companyLogo}
                  alt={locale == "ar" ? data?.title_ar : data?.title}
                  width={228}
                  height={133}
                  className="w-[130px] lg:w-[140px] xl:w-[150px] 2xl:w-[180px] 3xl:w-[220px] aspect-230/133 absolute z-0 lg:bottom-2.5 xl:bottom-3 2xl:bottom-4 3xl:bottom-5 left-3 lg:left-3.5 xl:left-4 2xl:left-5"
                />
              </ParallaxBanner>
            </div>
          </div>
        </div>
      </section>
    </ParallaxProvider>
  );
}
