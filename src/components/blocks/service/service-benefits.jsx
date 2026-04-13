"use client";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ServiceBenefits({ data, locale = "en" }) {
  return (
    <section className="w-full h-auto block pt-[30px] sm:pt-[40px] xl:pt-[90px] 2xl:pt-[100px] 3xl:pt-[120px] pb-[20px] sm:pb-[20px] xl:pb-[35px] 2xl:pb-[40px] bg-white relative z-0">
      <div className="container">
        <div className="lg:gap-10 bg-[#FFFBF2] flex flex-col-reverse md:flex-row  sm:items-center relative">
          <div className="w-[100%] lg:w-[50%] bg-[url('/images/benefit-bg.png')] bg-no-repeat bg-cover absolute inset-0 lg:left-auto z-0"></div>

          <div className="w-full lg:w-6/12 2xl:w-[57%] overflow-hidden">
            <Image
              src={data?.media?.desktop_path || "/images/icon-placeholder.svg"}
              alt={data?.media?.media_alt || ""}
              width={885}
              height={500}
              className="h-full w-full object-fill hover:scale-105 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="w-full lg:w-6/12 2xl:w-[43%] pt-[20px] lg:pt-0 pb-2 pl-[20px] md:pl-[30px] xl:pl-[50px] 2xl:pl-[60px] 3xl:pl-[80px] flex flex-wrap items-center relative">
            <Heading
              as="h3"
              size="h3"
              className="text-xl font-normal text-black w-full mb-4"
            >
              {parse(locale === "ar" ? data?.title_ar : data?.title)}
            </Heading>
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              className={cn("typography", "[--text-color:#282828]")}
            >
              {typeof data?.description === "string"
                ? parse(data.description)
                : "-"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
