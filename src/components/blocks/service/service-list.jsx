"use client";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import ServiceCard from "./service-card";
import {
  ScrollRevealStagger,
  ScrollRevealItem,
} from "@/components/animations/scroll-reveal";

export default function ServiceList({ data, locale = "en" }) {
  return (
    <section className="w-full h-auto block relative z-0 py-[30px] sm:py-[40px] xl:py-[70px_90px] 2xl:py-[80px_100px] 3xl:py-[100px_130px] bg-white overflow-hidden">
      <div className="container">
        <ScrollRevealStagger
          className="flex flex-wrap sm:items-center -mx-2 [&>*]:p-2 mb-[30px] md:mb-[50px] xl:mb-[70px] 2xl:mb-[90px] 3xl:mb-[100px]"
          staggerDelay={0.2}
        >
          <ScrollRevealItem className="w-full md:w-5/12 lg:w-4/12">
            <Heading
              as="div"
              size="h6"
              className="flex items-center gap-x-4 text-[#1e1e1e]"
            >
              <span className="inline-block size-2 rounded-full bg-[#c09c86]" />
              {parse(
                locale == "ar"
                  ? data?.sub_title_ar || ""
                  : data?.sub_title || "",
              )}
            </Heading>

            <Heading
              as="h3"
              size="h3"
              className="mb-2 font-normal text-[#1E1E1E]"
            >
              {parse(locale == "ar" ? data?.title_ar || "" : data?.title || "")}
            </Heading>
          </ScrollRevealItem>

          <ScrollRevealItem className="w-full flex items-center md:w-7/12 lg:w-8/12 ltr:pt-[20px] ltr:md:pt-0">
            <div className="w-full ltr:md:pl-[30px] ltr:xl:pl-[50px] ltr:2xl:pl-[60px] ltr:3xl:pl-[80px] rtl:pt-[20px] rtl:md:pt-0 rtl:md:pr-[30px] rtl:xl:pr-[50px] rtl:2xl:pr-[60px] rtl:3xl:pr-[80px] relative">
              <div className="w-full md:w-[1px] h-[1px] md:h-full absolute bg-[#EACC99] inset-0 ltr:md:right-auto rtl:md:left-auto bottom-auto md:bottom-0 m-auto" />
              {data?.description && (
                <Text as="div" size="p1" className="font-light text-black">
                  {parse(
                    locale == "ar"
                      ? data?.description_ar || ""
                      : data?.description || "",
                  )}
                </Text>
              )}
            </div>
          </ScrollRevealItem>
        </ScrollRevealStagger>

        <ScrollRevealStagger className="flex flex-wrap -mx-2 sm:-mx-4 2xl:-mx-6 3xl:-mx-8 [&>*]:p-2 sm:[&>*]:p-4 2xl:[&>*]:p-6 3xl:[&>*]:p-8">
          {data?.items?.map((item, index) => (
            <ScrollRevealItem
              key={`${item.id}-${index}`}
              className="w-full sm:w-1/2"
            >
              <ServiceCard locale={locale} data={item} index={index} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
