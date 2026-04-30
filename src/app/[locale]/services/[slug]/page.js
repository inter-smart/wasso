import InnerHero from "@/components/common/inner-hero";
import ServiceFlagship from "@/components/blocks/service/service-flagship";
import ServiceHearFrom from "@/components/blocks/service/service-hear";
import ServiceApproach from "@/components/blocks/service/service-approach";
import ServiceOverview from "@/components/blocks/service/service-overview";
import ServiceBenefits from "@/components/blocks/service/service-benefits";
import { STRAPI_URL } from "@/lib/constants";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

/* -------------------- Metadata -------------------- */

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;

  try {
    const url = `${STRAPI_URL}/api/services?filters[slug][$eq]=${slug}&locale=${locale}`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) throw new Error("Metadata fetch failed");

    const response = await res.json();
    const serviceData = response.data?.[0];

    if (!serviceData) {
      return {
        title: locale === "ar" ? "الخدمة غير موجودة" : "Service Not Found",
      };
    }

    return {
      title: serviceData.title || (locale === "ar" ? "الخدمة" : "Service"),
      description: serviceData.description || "",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);

    return {
      title: locale === "ar" ? "الخدمة غير موجودة" : "Service Not Found",
    };
  }
}

/* -------------------- Page -------------------- */

export default async function ServiceDetailPage({ params }) {
  const { locale, slug } = await params;

  try {
    // Fetch pre-structured service detail data
    const res = await fetch(`${STRAPI_URL}/api/services?filters[slug][$eq]=${slug}&locale=${locale}`, {
      cache: "no-store",
    });

    if (!res.ok) notFound();

    const { data } = await res.json();
    const serviceData = data?.[0];

    if (!serviceData) notFound();

    // Fetch form data from our-service single type
    const ourServiceRes = await fetch(
      `${STRAPI_URL}/api/our-service?locale=${locale}`,
      { cache: "no-store" }
    );
    const ourServiceJson = await ourServiceRes.json();
    const contactData = ourServiceJson?.data?.contactSection;

    return (
      <>
        <InnerHero
          locale={locale}
          data={serviceData.heroInfo_data}
          slug={
            locale === "ar"
              ? serviceData.heroInfo_data.title_ar || "خدمة"
              : serviceData.heroInfo_data.title || slug?.replace(/-/g, " ")
          }
          parent={{
            label: locale === "ar" ? "خدمة" : "Service",
            link: `/${locale}/services`,
          }}
        />

        <ServiceOverview data={serviceData.overview_data} locale={locale} />

        <ServiceApproach data={serviceData.approach_data} locale={locale} />

        <ServiceBenefits data={serviceData.benefit_data} locale={locale} />

        <ServiceFlagship data={serviceData.flagship_data} locale={locale} />

        <ServiceHearFrom data={contactData} locale={locale} />
      </>
    );
  } catch (error) {
    console.error("Error fetching service data:", error);
    notFound();
  }
}

