import InnerHero from "@/components/common/inner-hero";
import ContactInfo from "@/components/blocks/contact/contact-info";
import { notFound } from "next/navigation";
import { STRAPI_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale } = await params; // ✅ MUST await

  const res = await fetch(`${STRAPI_URL}/api/contact-page?locale=${locale}`, {
    cache: "no-store",
  });

  if (!res.ok) return {};

  const data = await res.json();

  return {
    title: locale === "ar" ? data.seoTitle_ar || data.seoTitle : data.seoTitle,
    description:
      locale === "ar"
        ? data.seoDescription_ar || data.seoDescription
        : data.seoDescription,
  };
}

export default async function ContactPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  let contactData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const res = await fetch(`${STRAPI_URL}/api/contact-page?locale=${locale}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const response = await res.json();
      contactData = response;
    }
  } catch (error) {
    console.error("Error fetching about data:", error);
  }

  if (!contactData) {
    notFound();
  }

  const { hero, contact_info } = contactData;

  return (
    <>
      {hero && (
        <InnerHero
          locale={locale}
          data={hero}
          slug={locale === "ar" ? hero?.title_ar : hero?.title}
        />
      )}

      {contact_info && <ContactInfo data={contact_info} locale={locale} />}
    </>
  );
}
