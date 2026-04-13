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

  let serviceData = null;

  try {
    const populateQuery =
      "populate[bannerSection][populate]=*&" +
      "populate[Overview][populate]=*&" +
      "populate[approachSection][populate][approachItem][populate]=*&" +
      "populate[benefitSection][populate]=*&" +
      "populate[flagshipSection][populate][projects][populate]=*&" +
      "populate[formSection]=*";

    const url = `${STRAPI_URL}/api/services?filters[slug][$eq]=${slug}&locale=${locale}&${populateQuery}`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error("Strapi fetch failed:", res.status, res.statusText);
      notFound();
    }

    const response = await res.json();
    const rawData = response.data?.[0];

    if (!rawData) notFound();

    /* ---------- Mapping ---------- */

    serviceData = {
      heroInfo_data: {
        media: {
          media_type: rawData.bannerSection?.enableVideo ? "video" : "image",

          mobile_path: rawData.bannerSection?.enableVideo
            ? rawData.bannerSection?.video?.url
              ? `${STRAPI_URL}${rawData.bannerSection.video.url}`
              : "/images/placeholder.webp"
            : rawData.bannerSection?.mobileImage?.url
              ? `${STRAPI_URL}${rawData.bannerSection.mobileImage.url}`
              : rawData.bannerSection?.desktopImage?.url
                ? `${STRAPI_URL}${rawData.bannerSection.desktopImage.url}`
                : "/images/placeholder.webp",

          desktop_path: rawData.bannerSection?.enableVideo
            ? rawData.bannerSection?.video?.url
              ? `${STRAPI_URL}${rawData.bannerSection.video.url}`
              : "/images/placeholder.webp"
            : rawData.bannerSection?.desktopImage?.url
              ? `${STRAPI_URL}${rawData.bannerSection.desktopImage.url}`
              : rawData.bannerSection?.mobileImage?.url
                ? `${STRAPI_URL}${rawData.bannerSection.mobileImage.url}`
                : "/images/placeholder.webp",

          media_alt:
            rawData.bannerSection?.mobileImage?.alternativeText ||
            rawData.bannerSection?.title ||
            "hero",
        },

        title: rawData.bannerSection?.title,
        title_ar: rawData.bannerSection?.title,
      },

      overview_data: {
        title: rawData.Overview?.title || "",
        title_ar: rawData.Overview?.title || "",
        description: rawData.Overview?.description,
        description_ar: rawData.Overview?.description,
        media: {
          desktop_path: rawData.Overview?.image?.url
            ? `${STRAPI_URL}${rawData.Overview.image.url}`
            : "/images/placeholder.webp",

          media_alt: rawData.Overview?.image?.alternativeText || "overview",
        },
      },

      approach_data: {
        main_title: rawData.approachSection?.title || "",
        main_title_ar: rawData.approachSection?.title || "",
        items:
          rawData.approachSection?.approachItem?.map((item) => ({
            id: item.id,
            title: item.title || "",
            title_ar: item.title || "",
            description: item.description,
            description_ar: item.description,
          })) || [],
      },

      benefit_data: {
        title: rawData.benefitSection?.title || "",
        title_ar: rawData.benefitSection?.title || "",
        description: rawData.benefitSection?.description || "",
        media: {
          desktop_path: rawData.benefitSection?.image?.url
            ? `${STRAPI_URL}${rawData.benefitSection.image.url}`
            : "/images/placeholder.webp",
          media_alt:
            rawData.benefitSection?.image?.alternativeText || "benefit",
        },
      },

      flagship_data: {
        title: rawData.flagshipSection?.title || "",
        title_ar: rawData.flagshipSection?.title || "",
        items:
          rawData.flagshipSection?.projects?.map((p) => ({
            id: p.id,
            title: p.title || "",
            title_ar: p.title || "",
            description: p.description,
            description_ar: p.description,
            media: {
              path: p.featured_image?.url
                ? `${STRAPI_URL}${p.featured_image.url}`
                : null,
              alt: p.featured_image?.alternativeText || p.title || "",
              alt_ar: p.featured_image?.alternativeText || p.title || "",
            },
          })) || [],
      },

      form_data: {
        title_lit: rawData.formSection?.title,
        title_lit_ar: rawData.formSection?.title,
        title: rawData.formSection?.titleContinuation,
        title_ar: rawData.formSection?.titleContinuation,
      },
    };
  } catch (error) {
    console.error("Error fetching service data:", error);
    notFound();
  }

  return (
    <>
      <InnerHero
        locale={locale}
        data={serviceData.heroInfo_data}
        slug={serviceData.heroInfo_data.title}
      />

      <ServiceOverview data={serviceData.overview_data} locale={locale} />

      <ServiceApproach data={serviceData.approach_data} locale={locale} />

      <ServiceBenefits data={serviceData.benefit_data} locale={locale} />

      <ServiceFlagship data={serviceData.flagship_data} locale={locale} />

      <ServiceHearFrom data={serviceData.form_data} locale={locale} />
    </>
  );
}
