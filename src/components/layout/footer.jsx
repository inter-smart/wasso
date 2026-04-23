"use client";

import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Heading, Text } from "../utils/typography";

import dynamic from "next/dynamic";
import { convertRichTextToHtml } from "@/lib/sanitizer";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

export default function Footer({ footerData, socialLinkData, locale }) {
  const [openSection, setOpenSection] = useState(null);

  return (
    <footer className="w-full py-[30px_20px] xl:py-[60px_30px] 2xl:py-[60px_40px] overflow-hidden bg-[#fffbf2] relative z-0 max-sm:pb-12">
      <div className="container">
        <div className="flex flex-wrap -mx-2.5 sm:-mx-3 xl:-mx-5 2xl:-mx-7.5 [&>*]:p-2.5 sm:[&>*]:p-3 xl:[&>*]:p-5 2xl:[&>*]:p-7.5 max-lg:flex-col-reverse">
          <div className="w-full lg:w-[24%] 2xl:w-[23.5%]">
            {footerData?.quick_link_navigation && (
              <div className="w-full">
                <MediaQuery minWidth={1024}>
                  <>
                    <Heading
                      as="div"
                      size="h7"
                      className="font-medium text-[#c09c86] mb-1 xl:mb-2.5 2xl:mb-4"
                    >
                      {locale === "ar" ? "روابط سريعة" : "QUICK LINKS"}
                    </Heading>
                    {footerData?.quick_link_navigation?.map((item, index) => (
                      <div key={"quick_link_navigation" + index}>
                        <Heading
                          as="div"
                          size="h6"
                          className="font-normal text-[#1e1e1e] transition [&>a]:hover:text-[#cda278] mb-1 xl:mb-1.5"
                        >
                          <Link href={`/${locale}${item?.link}`}>
                            {locale == "ar" ? item?.label_ar : item?.label}
                          </Link>
                        </Heading>
                      </div>
                    ))}
                  </>
                </MediaQuery>
                <MediaQuery maxWidth={1023}>
                  <>
                    <AccordionItem
                      locale={locale}
                      title="Quick links"
                      title_ar="QUICK LINKS"
                      section="quick"
                      openSection={openSection}
                      setOpenSection={setOpenSection}
                    >
                      {footerData?.quick_link_navigation?.map((item, index) => (
                        <div key={"quick_link_navigation" + index}>
                          <Heading
                            as="div"
                            size="h6"
                            className="text-[#1e1e1e] transition [&>a]:hover:text-[#cda278] mb-2"
                          >
                            <Link href={`/${locale}${item?.link}`}>
                              {locale == "ar" ? item?.label_ar : item?.label}
                            </Link>
                          </Heading>
                        </div>
                      ))}
                    </AccordionItem>
                    <hr className="border-[#eadcce] mt-4" />
                  </>
                </MediaQuery>
              </div>
            )}
          </div>

          <div className="w-full lg:w-[26%] 2xl:w-[27%]">
            {footerData?.services_navigation && (
              <div className="w-full">
                <MediaQuery minWidth={1024}>
                  <>
                    <Heading
                      as="div"
                      size="h7"
                      className="font-medium text-[#c09c86] mb-1 xl:mb-2.5 2xl:mb-4"
                    >
                      {locale === "ar" ? "خدمات" : "SERVICES"}
                    </Heading>
                    {footerData?.services_navigation?.map((item, index) => (
                      <div key={"services_navigation" + index}>
                        <Heading
                          as="div"
                          size="h6"
                          className="font-normal text-[#1e1e1e] transition [&>a]:hover:text-[#cda278] mb-1 xl:mb-1.5"
                        >
                          <Link href={`/${locale}${item?.link}`}>
                            {locale == "ar" ? item?.label_ar : item?.label}
                          </Link>
                        </Heading>
                      </div>
                    ))}
                  </>
                </MediaQuery>
                <MediaQuery maxWidth={1023}>
                  <AccordionItem
                    locale={locale}
                    title="Services"
                    title_ar="خدمات"
                    section="services"
                    openSection={openSection}
                    setOpenSection={setOpenSection}
                  >
                    {footerData?.services_navigation?.map((item, index) => (
                      <div key={"services_navigation" + index}>
                        <Heading
                          as="div"
                          size="h6"
                          className="text-[#1e1e1e] transition [&>a]:hover:text-[#cda278] mb-2"
                        >
                          <Link href={`/${locale}${item?.link}`}>
                            {locale == "ar" ? item?.label_ar : item?.label}
                          </Link>
                        </Heading>
                      </div>
                    ))}
                  </AccordionItem>
                </MediaQuery>
              </div>
            )}

            <MediaQuery minWidth={1024}>
              {socialLinkData && (
                <div className="mt-3 xl:mt-5">
                  <Heading
                    as="div"
                    size="h7"
                    className="font-medium text-[#c09c86] mb-1 xl:mb-2.5 2xl:mb-4"
                  >
                    {locale === "ar" ? "تابعنا" : "FOLLOW US"}
                  </Heading>
                  <div className="flex flex-wrap items-center gap-x-3 xl:gap-x-5">
                    {socialLinkData?.map((item, index) => (
                      <div key={"social_link" + index}>
                        <Button variant="link" size="none" asChild>
                          <a href={item?.link || "#"} target="_blank" aria-label={item?.media?.media_alt || "Social Media Link"}>
                            <Image
                              src={item?.media?.media_path || "/images/placeholder.webp"}
                              alt={item?.media?.media_alt || "Social Media"}
                              width={12}
                              height={12}
                              className="w-2.5 xl:w-3 2xl:w-5 aspect-square block hover:scale-110 transition"
                            />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </MediaQuery>
          </div>

          <MediaQuery minWidth={1024}>
            <div className="w-full sm:w-3/12 lg:w-[24%] 2xl:w-[23%]">
              <Link
                href={`/${locale}/${footerData?.slug}`}
                aria-label={locale === "ar" ? footerData?.name_ar : footerData?.name || "Logo"}
                className="w-[120px] xl:w-[160px] 2xl:w-[200px] block"
              >
                <Image
                  src={footerData?.logoUrl || "/images/placeholder.webp"}
                  alt={locale === "ar" ? footerData?.name_ar : footerData?.name || "Logo"}
                  width={290}
                  height={260}
                  className="w-full h-full block hover:scale-105 transition"
                />
              </Link>
            </div>
          </MediaQuery>

          <div className="w-full lg:w-[26%] 2xl:w-[24%]">
            <div className="flex flex-wrap">
              <MediaQuery maxWidth={1023}>
                <div className="w-full 3xs:w-4/12 max-sm:mb-3">
                  <Link
                    href={`/${locale}/${footerData?.slug}`}
                    aria-label={locale === "ar" ? footerData?.name_ar : footerData?.name || "Logo"}
                    className="w-[80px] sm:w-[120px] block"
                  >
                    <Image
                      src={footerData?.logoUrl || "/images/placeholder.webp"}
                      alt={
                        locale === "ar" ? footerData?.name_ar : footerData?.name || "Logo"
                      }
                      width={290}
                      height={260}
                      className="w-full h-full block hover:scale-105 transition"
                    />
                  </Link>
                </div>
              </MediaQuery>
              <div className="w-full sm:w-8/12 lg:w-full">
                {footerData?.address && (
                  <div>
                    <Heading
                      as="div"
                      size="h7"
                      className="font-medium text-[#c09c86] mb-1 xl:mb-2.5 2xl:mb-4"
                    >
                      {locale === "ar" ? "اتصل بنا" : "CONTACT US"}
                    </Heading>
                    <Heading
                      as="div"
                      size="h6"
                      className="max-3xs:text-[13px] font-normal text-[#1e1e1e] transition [&>a]:hover:text-[#cda278] mb-2 lg:mb-4 xl:mb-6 "
                    >
                      {parse(convertRichTextToHtml(
                        locale == "ar"
                          ? footerData?.address_ar || []
                          : footerData?.address || [],
                      ))}
                    </Heading>
                  </div>
                )}
                {footerData?.phone && (
                  <div className="flex items-center gap-3 mb-1.5 xl:mb-2.5">
                    <div className="w-3 xl:w-5">
                      <Image
                        src={"/images/footer-telephone.svg"}
                        alt="Telephone"
                        width={20}
                        height={20}
                        className="w-full h-full block"
                        style={{ height: "auto" }}
                      />
                    </div>
                    <Heading
                      as="div"
                      size="h6"
                      className="font-normal text-[#1e1e1e] flex-1 transition [&>a]:hover:text-[#cda278]"
                    >
                      {footerData?.phone.map((phone, index) => (
                        <a
                          key={"phone" + index}
                          href={`tel:${phone}`}
                          dir="ltr"
                        >
                          {phone}{" "}
                        </a>
                      ))}
                    </Heading>
                  </div>
                )}
                {footerData?.email && (
                  <div className="flex flex-wrap items-center gap-3 mb-2.5 xl:mb-3.5">
                    <div className="w-3 xl:w-5">
                      <Image
                        src={"/images/footer-mail.svg"}
                        alt="Email"
                        width={20}
                        height={20}
                        className="w-full h-full block"
                        style={{ height: "auto" }}
                      />
                    </div>
                    <div className="flex-1">
                      <Heading
                        as="div"
                        size="h6"
                        className="font-normal text-[#1e1e1e] transition [&>a]:hover:text-[#cda278]"
                      >
                        {footerData?.email.map((email, index) => (
                          <a
                            key={"email" + index}
                            href={`mailto:${email}`}
                            dir="ltr"
                          >
                            {email}{" "}
                          </a>
                        ))}
                      </Heading>
                    </div>
                  </div>
                )}
                {footerData?.location_map_link && (
                  <Button
                    size="lg"
                    variant={"outline"}
                    className="text-[#cda278] min-w-[100px] xl:min-w-[100px] 2xl:min-w-[130px]"
                    asChild
                  >
                    <a href={footerData?.location_map_link} target="_blank">
                      <Image
                        src={"/images/footer-map.svg"}
                        alt="Map Locator"
                        width={20}
                        height={20}
                        className="w-3 xl:w-5 block"
                        style={{ height: "auto" }}
                      />
                      {locale === "ar" ? "تحديد الموقع على الخريطة" : "Locate on Map"}
                    </a>
                  </Button>
                )}

                <MediaQuery maxWidth={1023}>
                  {socialLinkData && (
                    <div className="mt-3">
                      <Heading
                        as="div"
                        size="h7"
                        className="font-medium text-[#c09c86] mb-1"
                      >
                        {locale === "ar" ? "تابعنا" : "FOLLOW US"}
                      </Heading>
                      <div className="flex flex-wrap items-center gap-x-4">
                        {socialLinkData?.map((item, index) => (
                          <div key={"social_link" + index}>
                            <Button variant="link" size="none" asChild>
                              <a href={item?.link} target="_blank" aria-label={item?.media?.media_alt || "Social Media Link"}>
                                <Image
                                  src={item?.media?.media_path || "/images/placeholder.webp"}
                                  alt={item?.media?.media_alt || "Social Media"}
                                  width={12}
                                  height={12}
                                  className="w-4 aspect-square block hover:scale-110 transition"
                                />
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </MediaQuery>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-x-5 mt-6 xl:mt-8 2xl:mt-10">
          <Text as="div" size="p2" className="tracking-wide text-[#1e1e1e]">
            {parse(
              locale == "ar" ? footerData?.copyright_ar || "" : footerData?.copyright || "",
            )}
          </Text>
          <hr className="border-[#eadcce] flex-1 max-sm:hidden" />
          <Text
            as="div"
            size="p2"
            className="whitespace-nowrap text-end tracking-wide text-[#1e1e1e] flex gap-1"
          >
            {locale === "ar" ? "تصميم بواسطة: " : "Designed By: "}
            <a href="https://www.intersmartsolution.com/" target="_blank" aria-label="Intersmart Web Design">
              <Image
                src="/images/footer-author.svg"
                alt="footer-author"
                width={100}
                height={20}
                className="w-[70px] sm:w-[50px] xl:w-[70px] 2xl:w-[85px] inline ml-1"
              />
            </a>
          </Text>
        </div>
      </div>
    </footer>
  );
}

// Accordion Item Component
function AccordionItem({
  locale,
  title,
  title_ar,
  children,
  section,
  openSection,
  setOpenSection,
}) {
  const isOpen = openSection === section;

  const toggleAccordion = () => {
    setOpenSection(isOpen ? null : section);
  };

  return (
    <div className="border-t border-[#eadcce]">
      <button
        onClick={toggleAccordion}
        className="w-full flex items-center justify-between pt-4 text-start"
      >
        <Heading as="div" size="h7" className="font-medium text-black">
          {locale === "ar" ? title_ar : title}
        </Heading>

        <ChevronDown
          className={cn(
            "w-4 h-4 text-[#1e1e1e] transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[500px] mt-5" : "max-h-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}
