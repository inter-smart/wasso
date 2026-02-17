import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  const careers = {
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
            iconPath: "/images/career-perks-1.svg",
            title: "Health Insurance",
            title_ar: "التأمين الصحي",
          },
          {
            iconPath: "/images/career-perks-2.svg",
            title: "Paid Time Off",
            title_ar: "الإجازات المدفوعة",
          },
          {
            iconPath: "/images/career-perks-3.svg",
            title: "Career Growth",
            title_ar: "بيئة عمل تعاونية",
          },
          {
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

  const career = careers[slug];

  if (!career) {
    return NextResponse.json(
      {
        success: false,
        message: "Career not found",
        message_ar: "الوظيفة غير موجودة",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Career fetched successfully",
      message_ar: "تم جلب الوظيفة بنجاح",
      data: {
        career: career,
        // Optional: Include a hero object if page needs it from API, though typically detail page uses career content for hero
        hero: {
          title: career.title,
          title_ar: career.title_ar,
        },
      },
    },
    { status: 200 },
  );
}
