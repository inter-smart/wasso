import { notFound } from "next/navigation";
import Link from "next/link";
import { STRAPI_URL } from "@/lib/constants";

import InnerHero from "@/components/common/inner-hero";
import ServiceList from "@/components/blocks/service/service-list";

// Local data removed

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  console.log("STRAPI_URL", STRAPI_URL);

  return {
    title: locale === "ar" ? "الخدمات" : "Services",
    description:
      locale === "ar"
        ? "استعرض خدماتنا في إدارة المشاريع والإشراف الهندسي وإدارة العقود وضمان الجودة"
        : "Browse our services in project management, engineering supervision, contracts management, and quality assurance",
  };
}

export default async function ServicesPage({ params }) {
  const resolvedParams = await params;
  // const resolvedSearchParams = await searchParams;
  const locale = resolvedParams.locale;

  try {
    // =========================
    // HERO SECTION (Strapi)
    // =========================
    const heroRes = await fetch(
      `${STRAPI_URL}/api/our-service?locale=${locale}&populate[bannerSection][populate]=*`,
      { cache: "no-store" },
    );

    if (!heroRes.ok) notFound();

    const heroJson = await heroRes.json();
    const hero = heroJson?.data;

    const banner = hero?.bannerSection;

    const heroInfo = {
      media: {
        media_type: banner?.enableVideo ? "video" : "image",

        mobile_path: banner?.enableVideo
          ? `${STRAPI_URL}${banner?.video?.url}`
          : `${STRAPI_URL}${banner?.mobileImage?.url}`,

        desktop_path: banner?.enableVideo
          ? `${STRAPI_URL}${banner?.video?.url}`
          : `${STRAPI_URL}${banner?.desktopImage?.url}`,

        media_alt:
          banner?.mobileImage?.alternativeText ||
          banner?.title ||
          "service-hero",
      },

      title: banner?.title || "",
      title_ar: banner?.title || "",
    };

    // =========================
    // SERVICES LIST (Strapi)
    // =========================
    const servicesRes = await fetch(
      `${STRAPI_URL}/api/services?locale=${locale}&populate=*`,
      { cache: "no-store" },
    );

    if (!servicesRes.ok) notFound();

    const servicesJson = await servicesRes.json();

    const serviceList = {
      sub_title: hero?.subTitle || "",
      sub_title_ar: hero?.subTitle || "",

      title: hero?.title || "",
      title_ar: hero?.title || "",

      description: hero?.description || "",
      description_ar: hero?.description || "",

      items:
        servicesJson?.data?.map((item) => ({
          id: item.id,
          title: item.title,
          title_ar: item.title,

          description: item.description,
          description_ar: item.description,

          slug: `/${locale}/services/${item.slug}`,

          icon: item.icon?.url ? `${STRAPI_URL}${item.icon.url}` : null,
        })) || [],
    };

    // =========================
    // FINAL DATA OBJECT
    // =========================
    const local_data = {
      heroInfo,
      serviceList,
    };

    // =========================
    // RETURN (unchanged layout)
    // =========================
    return (
      <>
        <InnerHero locale={locale} data={local_data.heroInfo} slug="Services" />

        <ServiceList data={local_data.serviceList} locale={locale} />
      </>
    );
  } catch (error) {
    console.error("Services page error:", error);
    notFound();
  }

  const { heroInfo, serviceList } = servicesData;

  return (
    <>
      <InnerHero locale={locale} data={heroInfo} slug={heroInfo.title} />

      <ServiceList data={serviceList} locale={locale} />
    </>
  );
}