import { NextResponse } from "next/server";

const projectDetailData = {
  hero: {
    media: {
      media_type: "image",
      mobile_path: "/images/projects-hero-1.jpg",
      desktop_path: "/images/projects-hero-1.jpg",
      media_alt: "projects-hero",
    },
    title_ar: "الخدمات",
    title: "Our Projects",
  },

  project_info: {
    title_ar: "الخدمات",
    title: "Our Projects",
    items: [
      {
        id: 1,
        title: "Luxury Residential Tower, Dubai",
        title_ar: "إدارة المشاريع",
        description:
          "<p>Location: <b>Dubai, UAE</b></p><p>Completion Year: <b>2022</b></p><p>Scope: <b>Commercial & Technology Development</b></p>",
        description_ar:
          "<p>المشاريع: <b>Dubai, UAE</b></p><p>المشاريع Year: <b>2022</b></p><p>المشاريع: <b>Commercial & Technology Development</b></p>",
        media: {
          path: "/images/projects-info-1.jpg",
          alt: "projects-info",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 2,
        title: "11 Luxury Residential Tower, Dubai",
        title_ar: "إدارة المشاريع",
        description:
          "<p>Location: <b>Dubai, UAE</b></p><p>Completion Year: <b>2022</b></p><p>Scope: <b>Commercial & Technology Development</b></p>",
        description_ar:
          "<p>المشاريع: <b>Dubai, UAE</b></p><p>المشاريع Year: <b>2022</b></p><p>المشاريع: <b>Commercial & Technology Development</b></p>",
        media: {
          path: "/images/projects-info-1.jpg",
          alt: "projects-info",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 3,
        title: "22 Luxury Residential Tower, Dubai",
        title_ar: "إدارة المشاريع",
        description:
          "<p>Location: <b>Dubai, UAE</b></p><p>Completion Year: <b>2022</b></p><p>Scope: <b>Commercial & Technology Development</b></p>",
        description_ar:
          "<p>المشاريع: <b>Dubai, UAE</b></p><p>المشاريع Year: <b>2022</b></p><p>المشاريع: <b>Commercial & Technology Development</b></p>",
        media: {
          path: "/images/projects-info-1.jpg",
          alt: "projects-info",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 4,
        title: "33 FLuxury Residential Tower, Dubai",
        title_ar: "إدارة المشاريع",
        description:
          "<p>Location: <b>Dubai, UAE</b></p><p>Completion Year: <b>2022</b></p><p>Scope: <b>Commercial & Technology Development</b></p>",
        description_ar:
          "<p>المشاريع: <b>Dubai, UAE</b></p><p>المشاريع Year: <b>2022</b></p><p>المشاريع: <b>Commercial & Technology Development</b></p>",
        media: {
          path: "/images/projects-info-1.jpg",
          alt: "projects-info",
          alt_ar: "إدارة المشاريع",
        },
      },
    ],
  },

  recent_projects: {
    title: "Recent Projects",
    title_ar: "المشاريع الحديثة",
    description:
      "<p>At Wasso Group, we recognize that every project is unique, with its own set of opportunities and challenges. Our project management service is built on the principle of transforming complex</p>",
    description_ar:
      "<p>في مجموعة واسو، ندرك أن كل مشروع فريد من نوعه، مع مجموعة خاصة من الفرص والتحديات. وتستند خدمة إدارة المشاريع لدينا على مبدأ تحويل المشاريع المعقدة إلى نجاحات ملموسة. سواء كان مشروعًا جديدًا أو توسعة أو تجديدًا، فإننا نقدم نهجًا شاملاً يضمن تحقيق أهدافك بكفاءة وفعالية.</p>",
    items: [
      {
        id: 1,
        title: "Lume Residences, Garden City",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-1",
        media: {
          path: "/images/projects-recent-1.jpg",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 2,
        title: "Victoria Residences, UAE",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-2",
        media: {
          path: "/images/projects-recent-2.jpg",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 3,
        title: "The Majestic Pointe, Al Shindagha",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-3",
        media: {
          path: "/images/projects-recent-3.jpg",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 4,
        title: "Lume Residences, Garden City",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-1",
        media: {
          path: "/images/projects-recent-1.jpg",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
      {
        id: 5,
        title: "Victoria Residences, UAE",
        title_ar: "إدارة المشاريع",
        slug: "/project-details-2",
        media: {
          path: "/images/projects-recent-2.jpg",
          alt: "Project Management",
          alt_ar: "إدارة المشاريع",
        },
      },
    ],
  },

  explore_projects: {
    title: "Explore All Building Project",
    title_ar: "استكشف جميع مشاريع البناء",
    slug: "/project-details-3",
  },

  seoTitle: "Project Details - WASSO",
  seoTitle_ar: "تفاصيل المشروع - واسو",
  seoDescription:
    "Explore details of our featured projects. Excellence in execution and design.",
  seoDescription_ar:
    "استكشف تفاصيل مشاريعنا المميزة. التميز في التنفيذ والتصميم.",
};

/**
 * GET /api/projects/[slug]
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
      message: "Project detail data fetched successfully",
      message_ar: "تم جلب تفاصيل المشروع بنجاح",
      data: projectDetailData,
    },
    { status: 200 },
  );
}
