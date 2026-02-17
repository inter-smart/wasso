import InnerHero from "@/components/common/inner-hero";
import ContactInfo from "@/components/blocks/contact/contact-info";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return {
    title: locale === "ar" ? "اتصل بنا" : "Contact Us",
    description: locale === "ar" ? "" : "",
  };
}

export default async function ContactPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  let contactData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const res = await fetch(`${baseUrl}/api/contact?locale=${locale}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const response = await res.json();
      contactData = response.data;
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
      {hero && <InnerHero locale={locale} data={hero} slug={"Contact Us"} />}

      {contact_info && <ContactInfo data={contact_info} locale={locale} />}
    </>
  );
}
