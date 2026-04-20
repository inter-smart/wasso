import Image from "next/image";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import CareerEnquiryForm from "@/components/form/career-enquiry-form";

export default function CareerDetailInfo({ data, locale }) {
  return (
    <section className="w-full h-auto block py-6 sm:py-10 lg:py-12 xl:py-15 2xl:py-18 3xl:py-22">
      <div className="container">
        <Heading
          as="h2"
          size="h3"
          className="leading-tight font-normal sm:text-center text-[#1e1e1e] mb-2 lg:mb-2 xl:mb-2.5 2xl:mb-3 3xl:mb-4 mx-auto"
        >
          {parse(locale == "ar" ? data?.title_ar || "" : data?.title || "")}
        </Heading>
        <Text
          as="div"
          size="p1"
          className="sm:text-center text-[#1e1e1e] max-w-[900px] mx-auto mb-6 lg:mb-9 xl:mb-12 2xl:mb-14 3xl:mb-16"
        >
          {parse(locale == "ar" ? data?.description_ar || "" : data?.description || "")}
        </Text>

        <div className="w-full bg-[#fffbf2] p-4 lg:py-4 lg:px-8 xl:py-5 xl:px-12 2xl:py-6 2xl:px-14 3xl:py-7 3xl:px-16 mb-12 lg:mb-18 xl:mb-23 2xl:mb-27 3xl:mb-32">
          <div className="flex flex-wrap justify-between -m-2 lg:-m-3 xl:-m-2 2xl:-m-2.5 3xl:-m-3 [&>*]:p-2 lg:[&>*]:p-3 xl:[&>*]:p-2 2xl:[&>*]:p-2.5 3xl:[&>*]:p-3">
            {(data?.jobSpecs?.length > 0
              ? data.jobSpecs
              : [
                  { id: "p1", title: "Job Type", title_ar: "نوع الوظيفة" },
                  { id: "p2", title: "Location", title_ar: "موقع" },
                  { id: "p3", title: "Experience", title_ar: "الخبرة" },
                ]
            ).map((item) => (
              <div
                key={item?.id}
                className="w-full 3xs:w-1/2 sm:w-1/3 xl:w-auto"
              >
                <div className="w-full flex flex-wrap items-center gap-2 lg:gap-2.5 xl:gap-3 2xl:gap-3.5 3xl:gap-4">
                  <div className="w-[20px] lg:w-[22px] xl:w-[24px] 2xl:w-[26px] 3xl:w-[30px] aspect-square">
                    <Image
                      src={item?.iconPath || "/images/career-benefits-1.svg"}
                      alt={
                        locale == "ar"
                          ? item?.title_ar || "Job Type"
                          : item?.title || "Job Type"
                      }
                      width={40}
                      height={40}
                      className="w-full h-full object-contain block"
                    />
                  </div>
                  <div className="flex-1">
                    <Text
                      as="div"
                      size="p2"
                      className="leading-none font-medium text-[#1C2222]"
                    >
                      {parse(
                        locale == "ar"
                          ? item?.title_ar || "Job Type"
                          : item?.title || "Job Type",
                      )}
                      :
                    </Text>
                    <Text as="div" size="p2" className="text-[#1C2222]">
                      {parse(
                        locale == "ar"
                          ? item?.description_ar || "-"
                          : item?.description || "-",
                      )}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap -mx-1 sm:-mx-2 lg:-mx-3 xl:-mx-4 2xl:-mx-8 3xl:-mx-10 [&>*]:p-1 sm:[&>*]:p-2 lg:[&>*]:p-3 xl:[&>*]:p-4 2xl:[&>*]:p-8 3xl:[&>*]:p-10">
          <div className="w-full lg:w-6/12">
            <div className="w-full">
              <Heading
                as="h2"
                size="h3"
                className="text-[20px] sm:text-[22px] lg:text-[26px] xl:text-[28px] 2xl:text-[32px] 3xl:text-[40px] leading-tight font-normal text-[#1e1e1e] mb-1.5 lg:mb-1.5 xl:mb-2 2xl:mb-2.5 3xl:mb-3"
              >
                {parse(
                  locale == "ar"
                    ? data?.responsibilities_title_ar || ""
                    : data?.responsibilities_title || "",
                )}
              </Heading>
              <div
                dir={locale === "ar" ? "rtl" : "ltr"}
                className={cn(
                  "typography [--text-color:#1e1e1e] [&_li]:font-normal [&_li]:my-2 lg:[&_li]:my-3 xl:[&_li]:my-3.5 2xl:[&_li]:my-4 3xl:[&_li]:my-5 marker:text-[#EFD8AF] mb-6 lg:mb-8 xl:mb-10 2xl:mb-12 3xl:mb-14",
                )}
              >
                {parse(
                  locale == "ar"
                    ? data?.responsibilities_description_ar || ""
                    : data?.responsibilities_description || "",
                )}
              </div>
              <div className="w-full">
                <Heading
                  as="h2"
                  size="h3"
                  className="text-[18px] sm:text-[20px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] 3xl:text-[35px] leading-tight font-normal text-[#1e1e1e] mb-4 lg:mb-6 xl:mb-8 2xl:mb-9 3xl:mb-11"
                >
                  {parse(
                    locale == "ar"
                      ? data?.benefits?.title_ar || ""
                      : data?.benefits?.title || "",
                  )}
                </Heading>
                <div className="flex flex-wrap justify-start xl:justify-between gap-10 lg:gap-5 xl:gap-6 2xl:gap-7 3xl:gap-8">
                  {data?.benefits?.items?.map((item) => (
                    <div key={"benefits" + item?.id}>
                      <div className="w-full max-w-[60px] sm:max-w-[70px] lg:max-w-[75px] xl:max-w-[80px] 2xl:max-w-[90px] 3xl:max-w-[100px]">
                        <Image
                          src={item?.iconPath}
                          alt={locale == "ar" ? item?.title_ar : item?.title}
                          width={40}
                          height={40}
                          className="w-[20px] lg:w-[23px] xl:w-[26px] 2xl:w-[30px] 3xl:w-[35px] aspect-square object-contain block mx-auto mb-2 lg:mb-2.5 xl:mb-3 2xl:mb-3.5 3xl:mb-4"
                        />
                        <Text
                          as="div"
                          size="p1"
                          className="leading-tight font-medium text-center text-[#1e1e1e] max-sm:text-[12px]"
                        >
                          {parse(locale == "ar" ? item?.title_ar || "" : item?.title || "")}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12">
            <div className="w-full aspect-886/550 overflow-hidden mt-3 xl:mt-0">
              <Image
                src={data?.responsibilitiesMedia?.media_url}
                alt={
                  (locale == "ar"
                    ? data?.responsibilitiesMedia?.media_alt_ar
                    : data?.responsibilitiesMedia?.media_alt) || "Career"
                }
                width={886}
                height={550}
                className="w-full h-full object-cover block hover:scale-105 transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>

        <div className="w-full bg-[#fffbf2] p-4 lg:py-4 lg:px-8 xl:py-5 xl:px-12 2xl:py-6 2xl:px-14 3xl:py-7 3xl:px-16 mt-12 lg:mt-18 xl:mt-25 2xl:mt-30 3xl:mt-35">
          <div className="flex flex-wrap items-center -m-1.5 lg:-m-1.5 xl:-m-2 2xl:-m-2.5 3xl:-m-4 [&>*]:p-1.5 lg:[&>*]:p-1.5 xl:[&>*]:p-2 2xl:[&>*]:p-2.5 3xl:[&>*]:p-4">
            <div className="w-full lg:w-4/12">
              <Heading
                as="h2"
                size="h3"
                className="leading-tight font-normal text-[#1e1e1e]"
              >
                {parse(
                  (locale == "ar" ? data?.formTitle_ar : data?.formTitle) || "",
                )}
              </Heading>
            </div>
            <div className="w-full lg:w-8/12">
              <CareerEnquiryForm locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
