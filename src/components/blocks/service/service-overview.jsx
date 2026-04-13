"use client";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";

export default function ServiceOverview({
  data = {},
  locale = "en",
  overview_data,
}) {
  const isArabic = locale === "ar";

  return (
    <section className="w-full h-auto block py-[30px] sm:py-[40px] xl:py-[90px] 2xl:py-[100px] 3xl:py-[120px] bg-white relative z-0">
      <div className="container">
        <div className="-mx-4 xl:-mx-7 2xl:-mx-8 3xl:-mx-11 [&>*]:p-4 xl:[&>*]:p-7 2xl:[&>*]:p-8 3xl:[&>*]:p-11 flex flex-wrap flex-col-reverse md:flex-row sm:items-center">
          <div className="w-full lg:w-5/12 lg:w-[52%] overflow-hidden">
            <Image
              src={data?.media?.desktop_path || "/images/icon-placeholder.svg"}
              alt={data?.media?.media_alt}
              width={885}
              height={500}
              className="h-full w-full object-fill hover:scale-105 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="w-full lg:w-7/12 lg:w-[48%] pt-[20px] md:pt-0 md:pl-[30px] xl:pl-[50px] 2xl:pl-[60px] 3xl:pl-[80px] flex flex-wrap items-center relative">
            <Heading
              as="h3"
              size="h3"
              className="text-xl font-normal text-black w-full mb-4"
            >
              {parse(locale === "ar" ? data?.title_ar : data?.title)}
            </Heading>
            <Text
              as="div"
              size="p1"
              className="font-light text-black :max-w-[100%] 3xl:max-w-[80%]"
            >
              {data?.description &&
                parse(isArabic ? data?.description_ar : data?.description)}
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
