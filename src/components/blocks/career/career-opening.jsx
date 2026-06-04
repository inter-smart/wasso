import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CareerOpening({ data, locale }) {
  return (
    <section className="w-full pb-[20px] sm:pb-[25px] xl:pb-[80px] 2xl:pb-[100px] 3xl:pb-[120px] pt-8 md:pt-10 xl:pt-14 2xl:pt-16">
      <div className="container">
        <div className="w-full mb-8 xl:mb-15">
          <Heading
            as="h2"
            size="h3"
            className="font-normal text-[#1e1e1e] text-center xl:mb-2"
          >
            {locale === "ar" ? data?.title_ar : data?.title}
          </Heading>
          <Text as="div" size="p1" className="text-[#1e1e1e] text-center">
            {locale === "ar" ? data?.description_ar : data?.description}
          </Text>
        </div>
        {data?.items?.map((item) => (
          <div
            key={item.id}
            className="w-full border border-[#EDE3CE] py-4 px-3 sm:px-4 xl:py-5 xl:px-8 my-2 xl:my-5 hover:bg-[#FFFBF2]"
          >
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              <div className="w-full xl:w-[36%] px-2">
                <div className="text-[14px] xl:text-[13px] 2xl:text-[16px] 3xl:text-[20px] leading-none font-medium text-[#1e1e1e] mb-1">
                  {locale === "ar" ? item.jobTitle_ar : item.jobTitle}
                </div>
                <Text
                  as="div"
                  size="p2"
                  className="text-[#1e1e1e] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px]"
                >
                  {locale === "ar" ? item.jobDesc_ar : item.jobDesc}
                </Text>
              </div>
              <div className="w-full sm:w-[70%] xl:w-[50%]">
                <div className="flex flex-wrap justify-between gap-y-6">
                  {(() => {
                    const placeholders = [
                      {
                        id: "p1",
                        title: "Job Type",
                        title_ar: "نوع الوظيفة",
                        iconPath: "/images/career-benefits-1.svg",
                      },
                      {
                        id: "p2",
                        title: "Requirements",
                        title_ar: "المتطلبات",
                        iconPath: "/images/career-benefits-2.svg",
                      },
                      {
                        id: "p3",
                        title: "Deadline to Apply",
                        title_ar: "الموعد النهائي للتقديم",
                        iconPath: "/images/career-benefits-3.svg",
                      },
                    ];

                    return placeholders.map((placeholder) => {
                      const found = item?.opening_specs?.find(
                        (s) =>
                          s.title === placeholder.title ||
                          s.id === placeholder.id ||
                          s.id === parseInt(placeholder.id.replace("p", "")),
                      );
                      return found || placeholder;
                    });
                  })().map((spec) => (
                    <div
                      key={spec.id}
                      className="w-full sm:w-1/2 md:w-[33.333%]"
                    >
                      <div className="w-full flex flex-wrap items-center px-2 gap-2.5 lg:gap-2 xl:gap-2.5 2xl:gap-3 3xl:gap-4">
                        <div className="w-[18px] lg:w-[20px] xl:w-[22px] 2xl:w-[24px] 3xl:w-[28px] aspect-square">
                          {spec?.iconPath ? (
                            <Image
                              src={spec.iconPath}
                              alt={
                                locale == "ar" ? spec?.title_ar : spec?.title
                              }
                              width={40}
                              height={40}
                              className="w-full h-full object-contain block"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100/50 rounded-sm flex items-center justify-center">
                              <span className="text-[8px] opacity-20">
                                Icon
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <Text
                            as="div"
                            size="p2"
                            className="xl:text-[10px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-medium text-[#1C2222] mb-1"
                          >
                            {parse(
                              locale == "ar"
                                ? spec?.title_ar || "Job Type"
                                : spec?.title || "Job Type",
                            )}
                            :
                          </Text>
                          <Text
                            as="div"
                            size="p2"
                            className="xl:text-[10px] 2xl:text-[13px] 3xl:text-[16px] leading-none text-[#1C2222]"
                          >
                            {parse(
                              locale == "ar"
                                ? spec?.description_ar || "-"
                                : spec?.description || "-",
                            )}
                          </Text>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-[30%] xl:w-[14%] flex">
                <Button
                  size="lg"
                  variant={"outline"}
                  className={cn(
                    "min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] transition-all duration-300 bg-[#fffbf2] hover:scale-105 hover:shadow-lg",
                    locale == "ar" ? "mr-auto" : "ml-auto",
                  )}
                  asChild
                >
                  <Link href={`/${locale}/careers/${item?.slug}`}>
                    {locale == "ar"
                      ? item?.ctaLabel_ar || "استكشف الفرص"
                      : item?.ctaLabel || "Explore opportunities"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
