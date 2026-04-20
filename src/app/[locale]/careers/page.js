import { notFound } from "next/navigation";
import InnerHero from "@/components/common/inner-hero";
import CareerHero from "@/components/blocks/career/career-hero";
import CareerJoin from "@/components/blocks/career/career-join";
import CareerCulture from "@/components/blocks/career/career-culture";
import CareerOpening from "@/components/blocks/career/career-opening";
import { STRAPI_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  let careerData = null;

  try {
    const res = await fetch(`${STRAPI_URL}/api/career-page?locale=${locale}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const response = await res.json();
      careerData = response;
    }
  } catch (error) {
    console.error("Error fetching career data:", error);
  }

  return {
    title:
      locale === "ar"
        ? careerData?.seoTitle_ar || "عن واسو"
        : careerData?.seoTitle || "Career WASSO",
    description:
      locale === "ar"
        ? careerData?.seoDescription_ar || careerData?.seoDescription
        : careerData?.seoDescription,
  };
}

export default async function CareerPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  let careerData = null;

  try {
    const res = await fetch(`${STRAPI_URL}/api/career-page?locale=${locale}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const response = await res.json();
      careerData = response;
    }
  } catch (error) {
    console.error("Error fetching career data:", error);
  }

  if (!careerData) {
    notFound();
  }

  const { hero, quote, whyJoin, culture, openings } = careerData;

  return (
    <>
      <InnerHero
        locale={locale}
        data={hero}
        slug={locale === "ar" ? hero?.title_ar : hero?.title}
      />

      <CareerHero locale={locale} data={quote} />
      <CareerJoin locale={locale} data={whyJoin} />
      <CareerCulture locale={locale} data={culture} />
      <CareerOpening locale={locale} data={openings} />
    </>
  );
}
