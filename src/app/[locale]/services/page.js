import { notFound } from "next/navigation";
import Link from "next/link";
import { STRAPI_URL } from "@/lib/constants";

import InnerHero from "@/components/common/inner-hero";
import ServiceList from "@/components/blocks/service/service-list";

// const local_data = {
//   heroInfo: {
//     media: {
//       media_type: "image",
//       mobile_path: "/images/service-hero.webp",
//       desktop_path: "/images/service-hero.webp",
//       media_alt: "service-hero-1",
//     },
//     title: "Our Services",
//     title_ar: "الخدمات",
//   },

//   serviceList: {
//     sub_title: "WHAT WE DO",
//     sub_title_ar: "ماذا نقدم",

//     title: "Comprehensive Project Solutions",
//     title_ar: "خدمات <span>احترافية</span>",

//     description:
//       "Wasso is a leading project management company committed to delivering excellence in construction and engineering solutions. We specialize in providing end-to-end services that ensure projects are completed on time, within budget, and to the highest quality standards. With expertise in project management, engineering supervision, contracts & tenders management, and quality",
//     description_ar:
//       "نقدم حلولاً متكاملة في إدارة المشاريع، والإشراف الهندسي، وإدارة العقود، وضمان الجودة.",

//     items: [
//       {
//         id: 1,
//         title: "Project Management",
//         title_ar: "",
//         description:
//           "At Wasso, we understand that successful projects require more than planning — they demand foresight, coordination, and commitment.",
//         description_ar: "",
//         slug: "/services/project-management",
//         icon: "/images/service-icon-01.png",
//       },
//       {
//         id: 2,
//         title: "Engineering Supervision",
//         title_ar: "",
//         description:
//           "Our engineering supervision services ensure quality, safety, and efficiency at every stage of your project.",
//         description_ar: "",
//         slug: "/services/engineering-supervision",
//         icon: "/images/service-icon-02.png",
//       },
//       {
//         id: 3,
//         title: "Engineering Supervision",
//         title_ar: "",
//         description:
//           "Our engineering supervision services ensure quality, safety, and efficiency at every stage of your project.",
//         description_ar: "",
//         slug: "/services/engineering-supervision",
//         icon: "/images/service-icon-03.png",
//       },
//       {
//         id: 4,
//         title: "Engineering Supervision",
//         title_ar: "",
//         description:
//           "Our engineering supervision services ensure quality, safety, and efficiency at every stage of your project.",
//         description_ar: "",
//         slug: "/services/engineering-supervision",
//         icon: "/images/service-icon-04.png",
//       },

//     ],
//   },
// };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

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

          slug: `/services/${item.slug}`,

          icon: `${STRAPI_URL}${item.icon?.url}`,
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
}
