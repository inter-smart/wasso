"use client";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import ServiceForm from "@/components/form/service-form";

export default function ServiceHearFrom({ data, locale = "en" }) {
  const isArabic = locale === "ar";

  return (
    <section className="w-full h-auto block relative z-0 pb-[30px] sm:pb-[40px] xl:pb-[90px] 2xl:pb-[100px] 3xl:pb-[120px] bg-white">
      <div className="container ">
        <div className="flex flex-col md:flex-row gap-4 xl:gap-7 2xl:gap-10 md:items-center relative">
          <div className="w-full md:w-5/12 lg:w-[30%]">
            <Heading
              as="h3"
              size="h3"
              className="text-xl font-normal text-black"
            >
              <span className="font-extralight">
                {parse((locale === "ar" ? data?.title_lit_ar : data?.title_lit) || "")}
              </span>
              <br className="max-md:hidden" />
              {parse((locale === "ar" ? data?.title_ar : data?.title) || "")}
            </Heading>
          </div>
          <div className="w-full md:w-7/12 lg:w-[70%] flex flex-wrap items-center pt-[20px] md:pt-0 md:pl-[30px] xl:pl-[50px] 2xl:pl-[60px] 3xl:pl-[80px] relative">
            <div className="w-full">
             <ServiceForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
