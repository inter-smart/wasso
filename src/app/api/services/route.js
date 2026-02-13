import { NextResponse } from "next/server";

const servicesData = {
  heroInfo: {
    media: {
      media_type: "image",
      mobile_path: "/images/service-hero.webp",
      desktop_path: "/images/service-hero.webp",
      media_alt: "service-hero-1",
    },
    title: "Our Services",
    title_ar: "الخدمات",
  },

  serviceList: {
    sub_title: "WHAT WE DO",
    sub_title_ar: "ماذا نقدم",

    title: "Comprehensive Project Solutions",
    title_ar: "خدمات <span>احترافية</span>",

    description:
      "Wasso is a leading project management company committed to delivering excellence in construction and engineering solutions. We specialize in providing end-to-end services that ensure projects are completed on time, within budget, and to the highest quality standards. With expertise in project management, engineering supervision, contracts & tenders management, and quality",
    description_ar:
      "نقدم حلولاً متكاملة في إدارة المشاريع، والإشراف الهندسي، وإدارة العقود، وضمان الجودة.",

    items: [
      {
        id: 1,
        title: "Project Management",
        title_ar: "",
        description:
          "At Wasso, we understand that successful projects require more than planning — they demand foresight, coordination, and commitment.",
        description_ar: "",
        slug: "/services/project-management",
        icon: "/images/service-icon-01.png",
      },
      {
        id: 2,
        title: "Engineering Supervision",
        title_ar: "",
        description:
          "Our engineering supervision services ensure quality, safety, and efficiency at every stage of your project.",
        description_ar: "",
        slug: "/services/engineering-supervision",
        icon: "/images/service-icon-02.png",
      },
      {
        id: 3,
        title: "Engineering Supervision",
        title_ar: "",
        description:
          "Our engineering supervision services ensure quality, safety, and efficiency at every stage of your project.",
        description_ar: "",
        slug: "/services/engineering-supervision",
        icon: "/images/service-icon-03.png",
      },
      {
        id: 4,
        title: "Engineering Supervision",
        title_ar: "",
        description:
          "Our engineering supervision services ensure quality, safety, and efficiency at every stage of your project.",
        description_ar: "",
        slug: "/services/engineering-supervision",
        icon: "/images/service-icon-04.png",
      },
    ],
  },
};

/**
 * GET /api/services
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  return NextResponse.json(
    {
      success: true,
      message: "Services data fetched successfully",
      message_ar: "تم جلب بيانات الخدمات بنجاح",
      data: servicesData,
    },
    { status: 200 },
  );
}
