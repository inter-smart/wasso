import { notFound } from "next/navigation";
import Link from "next/link";
import { STRAPI_URL } from "@/lib/constants";

import InnerHero from "@/components/common/inner-hero";
import ServiceList from "@/components/blocks/service/service-list";

// Local data removed

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  try {
    const res = await fetch(`${STRAPI_URL}/api/our-service?locale=${locale}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch services metadata");

    const { data } = await res.json();

    return {
      title: data?.seoTitle || (locale === "ar" ? "الخدمات" : "Services"),
      description:
        data?.seoDescription ||
        (locale === "ar"
          ? "استعرض خدماتنا في إدارة المشاريع والإشراف الهندسي وإدارة العقود وضمان الجودة"
          : "Browse our services in project management, engineering supervision, contracts management, and quality assurance"),
    };
  } catch (error) {
    console.error("Services metadata error:", error);
    return {
      title: locale === "ar" ? "الخدمات" : "Services",
    };
  }
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;

  try {
    const res = await fetch(`${STRAPI_URL}/api/our-service?locale=${locale}`, {
      cache: "no-store",
    });

    if (!res.ok) notFound();

    const { data } = await res.json();

    if (!data) notFound();

    return (
      <>
        <InnerHero
          locale={locale}
          data={data.heroInfo}
          slug={
            locale === "ar"
              ? data.heroInfo?.title_ar || "خدماتنا"
              : data.heroInfo?.title || "Our Services"
          }
        />

        <ServiceList data={data.serviceList} locale={locale} />
      </>
    );
  } catch (error) {
    console.error("Services page error:", error);
    notFound();
  }
}

