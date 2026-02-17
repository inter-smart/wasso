import CareerDetailInfo from "@/components/blocks/career/career-detail-info";
import InnerHero from "@/components/common/inner-hero";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return {
    title: locale === "ar" ? "تفاصيل الوظيفة" : "Job Detail",
    description: locale === "ar" ? "" : "",
  };
}

const careerData = {
  hero: {
    media: {
      media_type: "image",
      mobile_path: "/images/contact-banner.jpg",
      desktop_path: "/images/contact-banner.jpg",
      media_alt: "career-hero-1",
    },
    title_ar: "عننا",
    title: "Career",
  },
  career_info: {
    title: "Site Engineer",
    title_ar: "مهندس موقع",
    description:
      "<p>We are seeking a skilled and motivated Site Engineer to join our construction team. The ideal candidate will be responsible for overseeing day-to-day construction activities, ensuring project specifications are met, and maintaining quality standards on-site. This role offers an excellent opportunity to work on diverse construction projects and grow your career in the construction industry.</p>",
    description_ar:
      "نبحث عن مهندس موقع ماهر ومتحمس للانضمام إلى فريق البناء لدينا. سيكون المرشح المثالي مسؤولاً عن الإشراف على الأنشطة الإنشائية اليومية، وضمان تلبية مواصفات المشروع، والحفاظ على معايير الجودة في الموقع. يوفر هذا الدور فرصة ممتازة للعمل في مشاريع بناء متنوعة وتطوير مسيرتك المهنية في قطاع الإنشاءات.",
    jobSpecs: [
      {
        id: 1,
        iconPath: "/images/career-benefits-1.svg",
        title: "Job Type",
        title_ar: "النوع الوظيفي",
        description: "Full-time",
        description_ar: "دوام كامل",
      },
      {
        id: 2,
        iconPath: "/images/career-benefits-2.svg",
        title: "Requirements",
        title_ar: "المتطلبات",
        description: "Minimum 5 years of experience",
        description_ar: "خبرة لا تقل عن 5 سنوات",
      },
      {
        id: 3,
        iconPath: "/images/career-benefits-3.svg",
        title: "Deadline to Apply",
        title_ar: " край موعد التقديم",
        description: "2025-12-31",
        description_ar: "2025-12-31",
      },
      {
        id: 4,
        iconPath: "/images/career-benefits-4.svg",
        title: "Division",
        title_ar: "القسم",
        description: "Construction",
        description_ar: "الإنشاءات",
      },
      {
        id: 5,
        iconPath: "/images/career-benefits-5.svg",
        title: "Location",
        title_ar: "الموقع",
        description: "Multiple",
        description_ar: "مواقع متعددة",
      },
      {
        id: 6,
        iconPath: "/images/career-benefits-6.svg",
        title: "Salary",
        title_ar: "الراتب",
        description: "Competitive",
        description_ar: "متناوب",
      },
    ],

    responsibilitiesMedia: {
      media_type: "image",
      media_url: "/images/career-responsibilities.jpg",
      media_alt: "Career Responsibilities",
      media_alt_ar: "مسؤوليات الوظيفة",
    },
    responsibilities_title: "Key Responsibilities",
    responsibilities_title_ar: "المسؤوليات الرئيسية",
    responsibilities_description:
      "<ul><li>Supervise and coordinate all on-site construction activities and workers</li><li>Review and interpret construction drawings, specifications, and blueprints</li><li>Monitor project progress and ensure work is completed on schedule</li><li>Ensure compliance with health, safety, and environmental regulations</li></ul>",
    responsibilities_description_ar:
      "<ul><li>الإشراف على الأنشطة الإنشائية اليومية</li><li>مراجعة وتفسير الرسومات والمواصفات والمخططات الإنشائية</li><li>مراقبة تقدم العمل وضمان إنجازه في الموعد المحدد</li><li>ضمان الامتثال للوائح الصحة والسلامة والبيئة</li></ul>",

    benefits: {
      title: "Ready to Join Our Team?",
      title_ar: "هل أنت مستعد للانضمام إلى فريقنا؟",
      items: [
        {
          id: 1,
          iconPath: "/images/career-perks-1.svg",
          title: "Health Insurance",
          title_ar: "التأمين الصحي",
        },
        {
          id: 2,
          iconPath: "/images/career-perks-2.svg",
          title: "Paid Time Off",
          title_ar: "الإجازات المدفوعة",
        },
        {
          id: 3,
          iconPath: "/images/career-perks-3.svg",
          title: "Career Growth",
          title_ar: "بيئة عمل تعاونية",
        },
        {
          id: 4,
          iconPath: "/images/career-perks-4.svg",
          title: "Life Insurance",
          title_ar: "التأمين على الحياة",
        },
      ],
    },

    formTitle: "Ready to Join Our Team?",
    formTitle_ar: "هل أنت مستعد للانضمام إلى فريقنا؟",
  },
};

export default async function CareerDetailPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // let careerData = null;

  // try {
  //   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  //   const res = await fetch(`${baseUrl}/api/contact?locale=${locale}`, {
  //     cache: "no-store",
  //   });

  //   if (res.ok) {
  //     const response = await res.json();
  //     careerData = response.data;
  //   }
  // } catch (error) {
  //   console.error("Error fetching about data:", error);
  // }

  // if (!careerData) {
  //   notFound();
  // }

  const { hero, career_info } = careerData;

  return (
    <>
      <InnerHero locale={locale} data={hero} slug={"Career"} />
      <CareerDetailInfo data={career_info} locale={locale} />
    </>
  );
}
