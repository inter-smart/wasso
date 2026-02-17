import AboutConcern from "@/components/blocks/about/about-concern";
import AboutInfo from "@/components/blocks/about/about-info";
import AboutLetter from "@/components/blocks/about/about-letter";
import AboutSpec from "@/components/blocks/about/about-spec";
import AboutStatistics from "@/components/blocks/about/about-statistics";
import InnerHero from "@/components/common/inner-hero";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return {
    title: locale === "ar" ? "عن واسو" : "About WASSO",
    description:
      locale === "ar"
        ? "تعرف على واسو لإدارة المشاريع - شركة رائدة في إدارة المشاريع والهندسة وتطوير العقارات"
        : "Learn about WASSO Project Management - Leading company in project management, engineering, and real estate development",
  };
}

export default async function AboutPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  let aboutData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const res = await fetch(`${baseUrl}/api/about?locale=${locale}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const response = await res.json();
      aboutData = response.data;
    }
  } catch (error) {
    console.error("Error fetching about data:", error);
  }

  if (!aboutData) {
    notFound();
  }

  const {
    hero,
    about_info,
    about_spec,
    about_statistics,
    recent_projects,
    success_stories,
    project_image,
  } = aboutData;

  return (
    <>
      {hero && (
        <InnerHero
          locale={locale}
          data={aboutData?.hero}
          slug={"Our Projects"}
        />
      )}

      <AboutInfo locale={locale} data={aboutData?.about_info} />

      <AboutSpec locale={locale} data={aboutData?.about_spec} />

      <AboutStatistics locale={locale} data={aboutData?.about_statistics} />

      <AboutConcern locale={locale} data={aboutData?.sister_concern} />

      <AboutLetter />
    </>
  );
}
