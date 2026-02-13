import { NextResponse } from "next/server";

const serviceDetailData = {
  heroInfo_data: {
    media: {
      media_type: "image",
      mobile_path: "/images/service-detail-hero.jpg",
      desktop_path: "/images/service-detail-hero.jpg",
      media_alt: "service-detail-hero-1",
    },
    title: "Project Management",
    title_ar: "الخدمات",
  },

  overview_data: {
    media: {
      media_type: "image",
      mobile_path: "/images/overview-image.jpg",
      desktop_path: "/images/overview-image.jpg",
      media_alt: "overview-image",
    },

    title: "Overview",
    title_ar: "خدمات <span>احترافية</span>",
    description: `
      <p> DefiAt Wasso Group, we recognize that every project is unique, with its own set of opportunities and challenges. Our project management service is built on the principle of transforming complex requirements into seamless, successful outcomes.</p>

    `,
    description_ar:
      "نقدم حلولاً متكاملة في إدارة المشاريع، والإشراف الهندسي، وإدارة العقود، وضمان الجودة.",
  },

  approach_data: {
    main_title: "Our Approach",
    items: [
      {
        id: 1,
        order: 1,
        title: "Project Management",
        title_ar: "",
        description: "Defining project goals, resources, and timelines.",
        description_ar: "",
        slug: "/services/project-management",
        icon: "/images/service-icon-01.png",
      },
      {
        id: 2,
        order: 2,
        title: "Engineering Supervision",
        title_ar: "",
        description: "Aligning with architects, engineers, and consultants.",
        description_ar: "",
        slug: "/services/engineering-supervision",
        icon: "/images/service-icon-02.png",
      },
      {
        id: 3,
        order: 3,
        title: "Engineering Supervision",
        title_ar: "",
        description:
          "Supervising activities, controlling costs, and tracking milestones.",
        description_ar: "",
        slug: "/services/engineering-supervision",
        icon: "/images/service-icon-03.png",
      },
      {
        id: 4,
        order: 4,
        title: "Engineering Supervision",
        title_ar: "",
        description: "Mitigating risks and ensuring compliance with standards.",
        description_ar: "",
        slug: "/services/engineering-supervision",
        icon: "/images/service-icon-04.png",
      },
      {
        id: 5,
        order: 5,
        title: "Engineering Supervision",
        title_ar: "",
        description: "Delivering completed projects with client satisfaction.",
        description_ar: "",
        slug: "/services/engineering-supervision",
        icon: "/images/service-icon-05.png",
      },
    ],
  },

  benefit_data: {
    media: {
      media_type: "image",
      mobile_path: "/images/benefit-image.jpg",
      desktop_path: "/images/benefit-image.jpg",
      media_alt: "benefit-image",
    },

    title: "Key Benefits",
    title_ar: "خدمات <span>احترافية</span>",
    description: `
      <ul>
        <li>Reduced delays and cost overruns.</li>
        <li>Professional guidance from start to finish.</li>
        <li>Reliable coordination with contractors and suppliers.</li>
        <li>Peace of mind with risk-free, compliant execution.</li>
      </ul>
    `,
    description_ar: "",
  },
  flagship_data: {
    title: "Flagship Projects",
    title_ar: "تشكيل المشاريع، بناء الثقة",

    items: [
      {
        id: 1,
        title: "Office Complex,<br/> Erbil",
        title_ar: "إدارة المشاريع",
        description:
          "At Wasso Group, we recognize that every project is unique, with its own set of opportunities",
        description_ar:
          "لوريم إيبسوم دولور سيت أميت، كونسيكتيتور أديبيسينغ إيليت. سيد دو إيوسمود تيمبور إنسيديدونت أوت لابور إت دولور ماجنا أليكوا.",
        slug: "project-management",
        media: {
          path: "/images/service-flag-01.jpg",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 2,
        title: "Panorama Trade <br/> Centre, Duhok",
        title_ar: "الإشراف الهندسي",
        description:
          "At Wasso Group, we recognize that every project is unique, with its own set of opportunities",
        description_ar:
          "لوريم إيبسوم دولور سيت أميت، كونسيكتيتور أديبيسينغ إيليت. سيد دو إيوسمود تيمبور إنسيديدونت أوت لابور إت دولور ماجنا أليكوا.",
        slug: "engineering-supervision",
        media: {
          path: "/images/service-flag-02.jpg",
          alt: "Engineering Supervision",
          alt_ar: "الإشراف الهندسي",
        },
      },
      {
        id: 3,
        title: "Italian City 1 & 2",
        title_ar: "إدارة العقود والمناقصات",
        description:
          "At Wasso Group, we recognize that every project is unique, with its own set of opportunities",
        description_ar:
          "لوريم إيبسوم دولور سيت أميت، كونسيكتيتور أديبيسينغ إيليت. سيد دو إيوسمود تيمبور إنسيديدونت أوت لابور إت دولور ماجنا أليكوا.",
        slug: "contracts-tenders-management",
        media: {
          path: "/images/service-flag-03.jpg",
          alt: "Contracts & Tenders Management",
          alt_ar: "إدارة العقود والمناقصات",
        },
      },
      {
        id: 4,
        title: "Walati Zheri <br/> Village",
        title_ar: "ضمان الجودة والسلامة",
        description:
          "At Wasso Group, we recognize that every project is unique, with its own set of opportunities",
        description_ar:
          "لوريم إيبسوم دولور سيت أميت، كونسيكتيتور أديبيسينغ إيليت. سيد دو إيوسمود تيمبور إنسيديدونت أوت لابور إت دولور ماجنا أليكوا.",
        slug: "quality-safety-assurance",
        media: {
          path: "/images/service-flag-04.jpg",
          alt: "Quality & Safety Assurance",
          alt_ar: "ضمان الجودة والسلامة",
        },
      },
    ],
  },
  form_data: {
    title_lit: "We’d love to ",
    title: "hear from you",
    title_ar: "ضمان الجودة والسلامة",
  },
  seoTitle: "Project Management - WASSO",
  seoTitle_ar: "إدارة المشاريع - واسو",
  seoDescription:
    "Professional project management services by WASSO. Ensuring projects are completed on time and within budget.",
  seoDescription_ar:
    "خدمات إدارة مشاريع احترافية من واسو. ضمان إنجاز المشاريع في الوقت المحدد وفي حدود الميزانية.",
};

/**
 * GET /api/services/[slug]
 */
export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";
  const { slug } = params;

  // In a real application, you would fetch data specific to the slug.
  // For now, we return the same data structure as requested.

  return NextResponse.json(
    {
      success: true,
      message: "Service detail data fetched successfully",
      message_ar: "تم جلب تفاصيل الخدمة بنجاح",
      data: serviceDetailData,
    },
    { status: 200 },
  );
}
