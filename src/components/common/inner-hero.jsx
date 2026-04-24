"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import parse from "html-react-parser";

import { Heading } from "@/components/utils/typography";
import {
  Parallax,
  ParallaxBanner,
  ParallaxBannerLayer,
  ParallaxProvider,
} from "react-scroll-parallax";
export default function InnerHero({ slug, data, locale }) {
  return (
    <ParallaxProvider>
      <ParallaxBanner>
        <section className="w-full aspect-6/4 sm:aspect-1920/770 overflow-hidden bg-black flex items-end relative z-0">
          <div className="w-full h-full bg-gradient-to-b from-black/50 via-black/0 to-black/50 absolute -z-1 inset-0" />
          <ParallaxBannerLayer speed={5} className="absolute -z-2 inset-0">
            {data?.media?.media_type === "video" ? (
              <>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover absolute -z-2 inset-0 opacity-80 block sm:hidden"
                >
                  <source src={data?.media?.mobile_path} type="video/mp4" />
                </video>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover absolute -z-2 inset-0 opacity-80 hidden sm:block"
                >
                  <source src={data?.media?.desktop_path} type="video/mp4" />
                </video>
              </>
            ) : (
              <picture className="absolute -z-2 inset-0 opacity-95">
                <source
                  media="(max-width: 640px)"
                  srcSet={data?.media?.mobile_path}
                />
                <Image
                  src={data?.media?.desktop_path}
                  alt={data?.media?.media_alt || "Hero Media"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
                  className="-z-2 object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                />
              </picture>
            )}
          </ParallaxBannerLayer>
          <div className="container">
            <div className="w-full sm:max-w-1/2 py-[20px] sm:py-[40px] lg:py-[50px] xl:py-[60px] 2xl:py-[80px] 3xl:py-[100px]">
              <Heading
                as="h2"
                size="h2"
                className="leading-snug text-white mb-1 [&>span]:text-[128%] [&>span]:font-medium [&>span]:block"
              >
                {parse(
                  (locale == "ar" ? data?.title_ar : data?.title) ||
                    slug
                      ?.split("-")
                      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      ?.join(" ") ||
                    "",
                )}
              </Heading>
              <Breadcrumb className="mb-1 lg:mb-1.5 xl:mb-2 2xl:mb-2.5">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="hover:text-[#c09c86]" href="/">
                      {locale === "ar" ? "الرئيسية" : "Home"}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  {slug && (
                    <BreadcrumbItem>
                      <BreadcrumbPage className="capitalize">
                        {(locale === "ar" ? data?.title_ar : data?.title) ||
                          slug?.replace(/-/g, " ")}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </section>
      </ParallaxBanner>
    </ParallaxProvider>
  );
}