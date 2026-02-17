import { NextResponse } from "next/server";

const careerData = {
  hero: {
    title: "Careers",
    title_ar: "الوظائف",
    description:
      "Join our team and be part of the future of project management",
    description_ar: "انضم إلى فريقنا وكن جزءًا من مستقبل إدارة المشاريع",
    media: {
      media_type: "image",
      mobile_path: "/images/contact-banner.jpg",
      desktop_path: "/images/contact-banner.jpg",
      media_alt: "Careers Hero",
      media_alt_ar: "صورة الوظائف",
    },
  },

  // Career Hero Quote Section
  quote: {
    text: "We're not just building projects we're building future leaders.",
    text_ar: "نحن لا نبني المشاريع فقط، بل نبني قادة المستقبل.",
  },

  // Why Join Us Section
  whyJoin: {
    title: "Why Join Us",
    title_ar: "لماذا تنضم إلينا",
    description:
      "We're committed to creating an environment where everyone can thrive, innovate, and make an impact.",
    description_ar:
      "نحن ملتزمون بخلق بيئة يمكن للجميع فيها الازدهار والابتكار وإحداث تأثير.",
    items: [
      {
        id: 1,
        image: "/images/career-join-slider-1.svg",
        title: "Professional Growth",
        title_ar: "النمو المهني",
        description: "Continuous learning opportunities and career advancement",
        description_ar: "فرص التعلم المستمر والتقدم الوظيفي",
      },
      {
        id: 2,
        image: "/images/career-join-slider-2.svg",
        title: "Innovation",
        title_ar: "الابتكار",
        description: "Freedom to experiment and bring creative ideas to life",
        description_ar: "حرية التجربة وإحياء الأفكار الإبداعية",
      },
      {
        id: 3,
        image: "/images/career-join-slider-3.svg",
        title: "Collaboration",
        title_ar: "التعاون",
        description: "Work with talented, supportive teammates who inspire you",
        description_ar: "العمل مع زملاء موهوبين وداعمين يلهمونك",
      },
    ],
  },

  // Culture Section
  culture: {
    title: "Our Culture",
    title_ar: "ثقافتنا",
    description:
      "At our core, we believe in fostering a workplace where creativity meets collaboration. We celebrate diversity, encourage bold thinking, and support each other's growth every step of the way.",
    description_ar:
      "في جوهرنا، نؤمن بتعزيز مكان عمل حيث يلتقي الإبداع بالتعاون. نحتفل بالتنوع، ونشجع التفكير الجريء، وندعم نمو بعضنا البعض في كل خطوة على الطريق.",
    image: "/images/career-culture-img.png",
    image_alt: "Culture image",
    image_alt_ar: "صورة الثقافة",
    features: [
      {
        id: 1,
        icon: "/images/career-culture-1.svg",
        title: "Work-Life Balance",
        title_ar: "التوازن بين العمل والحياة",
        description:
          "Flexible schedules and remote work options to help you thrive",
        description_ar: "جداول مرنة وخيارات العمل عن بعد لمساعدتك على الازدهار",
      },
      {
        id: 2,
        icon: "/images/career-culture-2.svg",
        title: "Impact-Driven Work",
        title_ar: "عمل موجه نحو التأثير",
        description:
          "Your contributions directly shape our products and vision",
        description_ar: "مساهماتك تشكل منتجاتنا ورؤيتنا بشكل مباشر",
      },
      {
        id: 3,
        icon: "/images/career-culture-3.svg",
        title: "Recognition & Rewards",
        title_ar: "التقدير والمكافآت",
        description: "Competitive compensation and meaningful acknowledgment",
        description_ar: "تعويض تنافسي واعتراف ذو معنى",
      },
    ],
  },

  // Current Openings Section
  openings: {
    title: "Current Openings",
    title_ar: "الوظائف الحالية",
    description:
      "Find your next challenge and join a team that values your unique skills and perspectives.",
    description_ar:
      "ابحث عن التحدي التالي وانضم إلى فريق يقدر مهاراتك ووجهات نظرك الفريدة.",
    items: [
      {
        id: 1,
        slug: "senior-project-manager",
        jobTitle: "Senior Project Manager",
        jobTitle_ar: "مدير مشاريع أول",
        jobDesc:
          "Lead complex projects from conception to completion, managing teams and ensuring timely delivery.",
        jobDesc_ar:
          "قيادة المشاريع المعقدة من التصور إلى الإنجاز، وإدارة الفرق وضمان التسليم في الوقت المحدد.",
        ctaLabel: "Explore opportunities",
        ctaLabel_ar: "استكشف الفرص",
        opening_specs: [
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
            title: "Experience",
            title_ar: "الخبرة",
            description: "5+ years",
            description_ar: "5+ سنوات",
          },
          {
            id: 3,
            iconPath: "/images/career-benefits-3.svg",
            title: "Deadline",
            title_ar: "آخر موعد",
            description: "Jan 31, 2025",
            description_ar: "31 يناير 2025",
          },
        ],
      },
      {
        id: 2,
        slug: "interior-designer",
        jobTitle: "Interior Designer",
        jobTitle_ar: "مصمم داخلي",
        jobDesc:
          "Create innovative interior designs for commercial and office spaces, bringing creativity and functionality together.",
        jobDesc_ar:
          "إنشاء تصاميم داخلية مبتكرة للمساحات التجارية والمكتبية، وجمع الإبداع والوظائف معًا.",
        ctaLabel: "Explore opportunities",
        ctaLabel_ar: "استكشف الفرص",
        opening_specs: [
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
            title: "Experience",
            title_ar: "الخبرة",
            description: "3+ years",
            description_ar: "3+ سنوات",
          },
          {
            id: 3,
            iconPath: "/images/career-benefits-3.svg",
            title: "Deadline",
            title_ar: "آخر موعد",
            description: "Jan 31, 2025",
            description_ar: "31 يناير 2025",
          },
        ],
      },
      {
        id: 3,
        slug: "workspace-consultant",
        jobTitle: "Workspace Consultant",
        jobTitle_ar: "استشاري مساحات العمل",
        jobDesc:
          "Provide expert consulting services to clients on workspace optimization and design solutions.",
        jobDesc_ar:
          "تقديم خدمات استشارية خبيرة للعملاء حول تحسين مساحة العمل وحلول التصميم.",
        ctaLabel: "Explore opportunities",
        ctaLabel_ar: "استكشف الفرص",
        opening_specs: [
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
            title: "Experience",
            title_ar: "الخبرة",
            description: "4+ years",
            description_ar: "4+ سنوات",
          },
          {
            id: 3,
            iconPath: "/images/career-benefits-3.svg",
            title: "Deadline",
            title_ar: "آخر موعد",
            description: "Jan 15, 2025",
            description_ar: "15 يناير 2025",
          },
        ],
      },
      {
        id: 4,
        slug: "junior-project-coordinator",
        jobTitle: "Junior Project Coordinator",
        jobTitle_ar: "منسق مشاريع مبتدئ",
        jobDesc:
          "Support project managers in coordinating project activities and ensuring smooth project execution.",
        jobDesc_ar:
          "دعم مديري المشاريع في تنسيق أنشطة المشروع وضمان التنفيذ السلس للمشروع.",
        ctaLabel: "Explore opportunities",
        ctaLabel_ar: "استكشف الفرص",
        opening_specs: [
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
            title: "Experience",
            title_ar: "الخبرة",
            description: "1+ years",
            description_ar: "1+ سنوات",
          },
          {
            id: 3,
            iconPath: "/images/career-benefits-3.svg",
            title: "Deadline",
            title_ar: "آخر موعد",
            description: "Jan 10, 2025",
            description_ar: "10 يناير 2025",
          },
        ],
      },
      {
        id: 5,
        slug: "sales-executive",
        jobTitle: "Sales Executive",
        jobTitle_ar: "منفذ مبيعات",
        jobDesc:
          "Drive business growth by identifying opportunities and building relationships with clients.",
        jobDesc_ar:
          "دفع نمو الأعمال من خلال تحديد الفرص وبناء العلاقات مع العملاء.",
        ctaLabel: "Explore opportunities",
        ctaLabel_ar: "استكشف الفرص",
        opening_specs: [
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
            title: "Experience",
            title_ar: "الخبرة",
            description: "2+ years",
            description_ar: "2+ سنوات",
          },
          {
            id: 3,
            iconPath: "/images/career-benefits-3.svg",
            title: "Deadline",
            title_ar: "آخر موعد",
            description: "Jan 5, 2025",
            description_ar: "5 يناير 2025",
          },
        ],
      },
    ],
  },

  careers: [
    {
      id: 1,
      slug: "senior-project-manager",
      title: "Senior Project Manager",
      title_ar: "مدير مشاريع أول",
      department: "project-management",
      department_ar: "إدارة المشاريع",
      type: "full-time",
      type_ar: "دوام كامل",
      location: "Dubai, UAE",
      location_ar: "دبي، الإمارات العربية المتحدة",
      short_description:
        "Lead complex projects from conception to completion, managing teams and ensuring timely delivery.",
      short_description_ar:
        "قيادة المشاريع المعقدة من التصور إلى الإنجاز، وإدارة الفرق وضمان التسليم في الوقت المحدد.",
      experience_required: "5+ years",
      experience_required_ar: "5+ سنوات",
      posted_date: "2024-12-01",
      application_deadline: "2025-01-31",
      featured: true,
      tags: ["management", "leadership", "planning"],
      tags_ar: ["إدارة", "قيادة", "تخطيط"],
      seoTitle: "Senior Project Manager Position | WASSO Careers",
      seoTitle_ar: "منصب مدير مشاريع أول | وظائف واسو",
      seoDescription:
        "Join WASSO as a Senior Project Manager and lead exciting workspace projects.",
      seoDescription_ar:
        "انضم إلى واسو كمدير مشاريع أول وقيادة مشاريع مساحات عمل مثيرة.",
      createdAt: "2024-12-01T00:00:00Z",
      updatedAt: "2024-12-01T00:00:00Z",
    },
    {
      id: 2,
      slug: "interior-designer",
      title: "Interior Designer",
      title_ar: "مصمم داخلي",
      department: "design",
      department_ar: "تصميم",
      type: "full-time",
      type_ar: "دوام كامل",
      location: "Dubai, UAE",
      location_ar: "دبي، الإمارات العربية المتحدة",
      short_description:
        "Create innovative interior designs for commercial and office spaces, bringing creativity and functionality together.",
      short_description_ar:
        "إنشاء تصاميم داخلية مبتكرة للمساحات التجارية والمكتبية، وجمع الإبداع والوظائف معًا.",
      experience_required: "3+ years",
      experience_required_ar: "3+ سنوات",
      posted_date: "2024-12-01",
      application_deadline: "2025-01-31",
      featured: true,
      tags: ["design", "creative", "interior"],
      tags_ar: ["تصميم", "إبداعي", "داخلي"],
      seoTitle: "Interior Designer Position | WASSO Careers",
      seoTitle_ar: "منصب مصمم داخلي | وظائف واسو",
      seoDescription:
        "Join WASSO as an Interior Designer and create beautiful workspace designs.",
      seoDescription_ar:
        "انضم إلى واسو كمصمم داخلي وأنشئ تصاميم مساحات عمل جميلة.",
      createdAt: "2024-12-01T00:00:00Z",
      updatedAt: "2024-12-01T00:00:00Z",
    },
    {
      id: 3,
      slug: "workspace-consultant",
      title: "Workspace Consultant",
      title_ar: "استشاري مساحات العمل",
      department: "consulting",
      department_ar: "استشارات",
      type: "full-time",
      type_ar: "دوام كامل",
      location: "Abu Dhabi, UAE",
      location_ar: "أبوظبي، الإمارات العربية المتحدة",
      short_description:
        "Provide expert consulting services to clients on workspace optimization and design solutions.",
      short_description_ar:
        "تقديم خدمات استشارية خبيرة للعملاء حول تحسين مساحة العمل وحلول التصميم.",
      experience_required: "4+ years",
      experience_required_ar: "4+ سنوات",
      posted_date: "2024-11-28",
      application_deadline: "2025-01-15",
      featured: false,
      tags: ["consulting", "advisory", "workspace"],
      tags_ar: ["استشارات", "استشاري", "مساحة عمل"],
      seoTitle: "Workspace Consultant Position | WASSO Careers",
      seoTitle_ar: "منصب استشاري مساحات العمل | وظائف واسو",
      seoDescription:
        "Join WASSO as a Workspace Consultant and help clients optimize their workspaces.",
      seoDescription_ar:
        "انضم إلى واسو كاستشاري مساحات العمل وساعد العملاء على تحسين مساحات عملهم.",
      createdAt: "2024-11-28T00:00:00Z",
      updatedAt: "2024-11-28T00:00:00Z",
    },
    {
      id: 4,
      slug: "junior-project-coordinator",
      title: "Junior Project Coordinator",
      title_ar: "منسق مشاريع مبتدئ",
      department: "project-management",
      department_ar: "إدارة المشاريع",
      type: "full-time",
      type_ar: "دوام كامل",
      location: "Dubai, UAE",
      location_ar: "دبي، الإمارات العربية المتحدة",
      short_description:
        "Support project managers in coordinating project activities and ensuring smooth project execution.",
      short_description_ar:
        "دعم مديري المشاريع في تنسيق أنشطة المشروع وضمان التنفيذ السلس للمشروع.",
      experience_required: "1+ years",
      experience_required_ar: "1+ سنوات",
      posted_date: "2024-11-25",
      application_deadline: "2025-01-10",
      featured: false,
      tags: ["coordination", "support", "entry-level"],
      tags_ar: ["تنسيق", "دعم", "مستوى مبتدئ"],
      seoTitle: "Junior Project Coordinator Position | WASSO Careers",
      seoTitle_ar: "منصب منسق مشاريع مبتدئ | وظائف واسو",
      seoDescription:
        "Start your career with WASSO as a Junior Project Coordinator.",
      seoDescription_ar: "ابدأ مسيرتك المهنية مع واسو كمنسق مشاريع مبتدئ.",
      createdAt: "2024-11-25T00:00:00Z",
      updatedAt: "2024-11-25T00:00:00Z",
    },
    {
      id: 5,
      slug: "sales-executive",
      title: "Sales Executive",
      title_ar: "منفذ مبيعات",
      department: "sales",
      department_ar: "مبيعات",
      type: "full-time",
      type_ar: "دوام كامل",
      location: "Dubai, UAE",
      location_ar: "دبي، الإمارات العربية المتحدة",
      short_description:
        "Drive business growth by identifying opportunities and building relationships with clients.",
      short_description_ar:
        "دفع نمو الأعمال من خلال تحديد الفرص وبناء العلاقات مع العملاء.",
      experience_required: "2+ years",
      experience_required_ar: "2+ سنوات",
      posted_date: "2024-11-20",
      application_deadline: "2025-01-05",
      featured: false,
      tags: ["sales", "business", "client-relations"],
      tags_ar: ["مبيعات", "أعمال", "علاقات العملاء"],
      seoTitle: "Sales Executive Position | WASSO Careers",
      seoTitle_ar: "منصب منفذ مبيعات | وظائف واسو",
      seoDescription:
        "Join WASSO as a Sales Executive and help grow our business.",
      seoDescription_ar: "انضم إلى واسو كمنفذ مبيعات وساعد في نمو أعمالنا.",
      createdAt: "2024-11-20T00:00:00Z",
      updatedAt: "2024-11-20T00:00:00Z",
    },
  ],
};

/**
 * GET /api/career
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";
  const department = searchParams.get("department") || null;
  const type = searchParams.get("type") || null;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  let filteredCareers = careerData.careers;

  if (department) {
    filteredCareers = filteredCareers.filter(
      (career) => career.department === department,
    );
  }

  if (type) {
    filteredCareers = filteredCareers.filter((career) => career.type === type);
  }

  // Pagination logic can be added here if needed, or just return all for simplicity as it is a mock
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCareers = filteredCareers.slice(startIndex, endIndex);

  return NextResponse.json(
    {
      success: true,
      message: "Career data fetched successfully",
      message_ar: "تم جلب بيانات الوظائف بنجاح",
      data: {
        hero: careerData.hero,
        quote: careerData.quote,
        whyJoin: careerData.whyJoin,
        culture: careerData.culture,
        openings: careerData.openings,
        careers: paginatedCareers,
        pagination: {
          page,
          limit,
          total: filteredCareers.length,
          totalPages: Math.ceil(filteredCareers.length / limit),
        },
      },
    },
    { status: 200 },
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      career_id,
      first_name,
      last_name,
      email,
      phone,
      cover_letter,
      resume_url,
    } = body;

    // Validate required fields
    if (!career_id || !first_name || !last_name || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          message_ar: "الحقول المطلوبة مفقودة",
        },
        { status: 400 },
      );
    }

    // In a real application, you would save this to a database
    // For now, we'll just return a success response

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        message_ar: "تم تقديم الطلب بنجاح",
        data: {
          application_id: `APP-${Date.now()}`,
          status: "submitted",
          status_ar: "تم التقديم",
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error submitting application",
        message_ar: "خطأ في تقديم الطلب",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
