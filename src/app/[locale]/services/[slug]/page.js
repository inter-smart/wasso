import ServiceFlagship from "@/components/blocks/service/service-flagship";
import ServiceHearFrom from "@/components/blocks/service/service-hear";
import InnerHero from "@/components/common/inner-hero";
import ServiceApproach from "@/components/blocks/service/service-approach";
import ServiceOverview from "@/components/blocks/service/service-overview";
import ServiceBenefit from "@/components/blocks/service/service-benefits";

export const dynamic = "force-dynamic";

// Local data removed

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;

  let serviceData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/services/${slug}?locale=${locale}`,
      {
        cache: "no-store",
      },
    );

    if (res.ok) {
      const response = await res.json();
      serviceData = response.data;
    }
  } catch (error) {
    console.error("Error fetching service data:", error);
  }

  if (!serviceData) {
    return {
      title: locale === "ar" ? "الخدمة غير موجودة" : "Service Not Found",
    };
  }

  return {
    title: locale === "ar" ? serviceData.seoTitle_ar : serviceData.seoTitle,
    description:
      locale === "ar"
        ? serviceData.seoDescription_ar
        : serviceData.seoDescription,
  };
}

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;

  let serviceData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/services/${slug}?locale=${locale}`,
      {
        cache: "no-store",
      },
    );

    if (res.ok) {
      const response = await res.json();
      serviceData = response.data;
    }
  } catch (error) {
    console.error("Error fetching service data:", error);
  }

  if (!serviceData) {
    notFound();
  }

  return (
    <>
      <InnerHero locale={locale} data={serviceData?.heroInfo_data} slug={"Services"} />
      <ServiceOverview data={serviceData?.overview_data} locale={locale} />
      <ServiceApproach data={serviceData?.approach_data} locale={locale} />
      <ServiceBenefit data={serviceData?.benefit_data} locale={locale} />
      <ServiceFlagship data={serviceData?.flagship_data} locale={locale} />
      <ServiceHearFrom data={serviceData?.form_data} locale={locale} />
    </>
  );
}
