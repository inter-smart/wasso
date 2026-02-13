import { NextResponse } from "next/server";

const aboutData = {
  hero: {
    media: {
      media_type: "image",
      mobile_path: "/images/about-banner.jpg",
      desktop_path: "/images/about-banner.jpg",
      media_alt: "about-hero-1",
    },
    title_ar: "عننا",
    title: "About Us",
  },

  about_info: {
    media_type: "image",
    media_alt: "WASSO Graphic",
    media_alt_ar: "مشروع سكايلاين هايتس",
    media_path: "/images/home-about-1.jpg",
    sub_title: "ABOUT WASSO",
    sub_title_ar: "عن واسو",
    title: "Discover the WASSO Difference",
    title_ar: "اكتشف الفرق في واسو",
    description:
      "<p>Wasso is a leading project management company committed to delivering excellence in construction and engineering solutions.</p>",
    description_ar:
      "<p>وasso هي شركة إدارة المشاريع المتميزة، ملتزمة بتقديم القيمة في حلول البناء والهندسة.</p>",
    mission: {
      title: "Our Mission",
      title_ar: "مهمتنا",
      icon_path: "/images/mission-icon.svg",
      description:
        "<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>",
      description_ar:
        "<p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.</p>",
    },
    vision: {
      title: "Our Vision",
      title_ar: "رؤيتنا",
      icon_path: "/images/vision-icon.svg",
      description:
        "<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>",
      description_ar:
        "<p>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.</p>",
    },
  },

  about_spec: {
    media: {
      media_type: "image",
      media_path: "/images/about-spec-1.jpg",
      media_alt: "about-spec-1",
    },
    items: [
      {
        id: 1,
        title: "Integrity",
        title_ar: "الكفاءة",
        icon_path: "/images/spec-icon-1.svg",
        description:
          "<p>We uphold the highest standards of honesty, ethics, and transparency in every project we undertake.</p>",
        description_ar:
          "<p>نحن نحافظ على أعلى معايير الصدق والأخلاق والشفافية في كل مشروع نقوم به.</p>",
      },
      {
        id: 2,
        title: "Excellence",
        title_ar: "الكفاءة",
        icon_path: "/images/spec-icon-2.svg",
        description:
          "<p>We strive for precision, quality, and continuous improvement in all aspects of our work.</p>",
        description_ar:
          "<p>نحن نسعى لتحقيق الدقة والكفاءة والتحسين المستمر في جميع جوانب عملنا.</p>",
      },
      {
        id: 3,
        title: "Collaboration",
        title_ar: "التعاون",
        icon_path: "/images/spec-icon-3.svg",
        description:
          "<p>We believe in the power of teamwork, strong partnerships, and clear communication to achieve shared success.</p>",
        description_ar:
          "<p>نحن نؤمن بالقوة من التعاون، العلاقات القوية، والاتصال واضح لتحقيق النجاح المشترك.</p>",
      },
      {
        id: 4,
        title: "Innovation",
        title_ar: "الابتكار",
        icon_path: "/images/spec-icon-4.svg",
        description:
          "<p>We embrace modern technology, creative thinking, and smarter solutions to drive efficiency and sustainability.</p>",
        description_ar:
          "<p>نحن نؤمن بالقوة من التعاون، العلاقات القوية، والاتصال واضح لتحقيق النجاح المشترك.</p>",
      },
    ],
  },

  about_statistics: {
    title: "Our Achievements",
    title_ar: "إنجازاتنا",
    items: [
      {
        number: "25",
        suffix: "+",
        label: "Years of Experience",
        label_ar: "سنة من الخبرة",
        description: "Trusted project management solutions across the UAE.",
        description_ar:
          "حلول إدارة مشاريع موثوقة في جميع أنحاء الإمارات العربية المتحدة.",
      },
      {
        number: "50",
        suffix: "+",
        label: "Projects Delivered",
        label_ar: "مشروع تم تسليمه",
        description:
          "Completed residential, commercial, and infrastructure projects.",
        description_ar: "مشاريع سكنية وتجارية وبنية تحتية مكتملة.",
      },
      {
        number: "2",
        suffix: "B+",
        label: "Project Value Managed",
        label_ar: "قيمة المشاريع المدارة",
        description: "Managing diverse projects with precision and efficiency.",
        description_ar: "إدارة مشاريع متنوعة بدقة وكفاءة.",
      },
      {
        number: "300",
        suffix: "+",
        label: "Expert Professionals",
        label_ar: "محترف خبير",
        description: "Skilled team delivering quality, on-time execution.",
        description_ar: "فريق ماهر يقدم تنفيذًا عالي الجودة وفي الوقت المحدد.",
      },
      {
        number: "95",
        suffix: "%",
        label: "Client Satisfaction",
        label_ar: "رضا العملاء",
        description: "Proven record of exceeding project expectations.",
        description_ar: "سجل مثبت في تجاوز توقعات المشروع.",
      },
    ],
  },

  sister_concern: {
    title: "Our Sister Concern",
    title_ar: "الشركات الشقيقة",
    description:
      "<p>Wasso is proud to be associated with Hemin Group UAE, a diversified business group with a strong presence across multiple sectors. Hemin Group has built a reputation for reliability, innovation, and customer-focused solutions, making it a trusted name in the UAE and beyond.</p><p>Through this association, we leverage shared expertise, resources, and values to deliver greater value to our clients. Together, Wasso and Hemin Group continue to strengthen capabilities, expand opportunities, and drive sustainable growth across industries.</p>",
    description_ar:
      "<p>في مجموعة واسو، ندرك أن كل مشروع فريد من نوعه، مع مجموعة خاصة من الفرص والتحديات. وتستند خدمة إدارة المشاريع لدينا على مبدأ تحويل المشاريع المعقدة إلى نجاحات ملموسة. سواء كان مشروعًا جديدًا أو توسعة أو تجديدًا، فإننا نقدم نهجًا شاملاً يضمن تحقيق أهدافك بكفاءة وفعالية.</p>",
    button: {
      slug: "Visit Website",
      label: "/"
    }
  },

  // recent_projects: {
  //   title: "Recent Projects",
  //   title_ar: "المشاريع الحديثة",
  //   description:
  //     "<p>At Wasso Group, we recognize that every project is unique, with its own set of opportunities and challenges. Our project management service is built on the principle of transforming complex</p>",
  //   description_ar:
  //     "<p>في مجموعة واسو، ندرك أن كل مشروع فريد من نوعه، مع مجموعة خاصة من الفرص والتحديات. وتستند خدمة إدارة المشاريع لدينا على مبدأ تحويل المشاريع المعقدة إلى نجاحات ملموسة. سواء كان مشروعًا جديدًا أو توسعة أو تجديدًا، فإننا نقدم نهجًا شاملاً يضمن تحقيق أهدافك بكفاءة وفعالية.</p>",
  //   items: [
  //     {
  //       id: 1,
  //       title: "Lume Residences, Garden City",
  //       title_ar: "إدارة المشاريع",
  //       slug: "/project-details-1",
  //       media: {
  //         path: "/images/projects-recent-1.jpg",
  //         alt: "Project Management",
  //         alt_ar: "إدارة المشاريع",
  //       },
  //     },
  //     {
  //       id: 2,
  //       title: "Victoria Residences, UAE",
  //       title_ar: "إدارة المشاريع",
  //       slug: "/project-details-2",
  //       media: {
  //         path: "/images/projects-recent-2.jpg",
  //         alt: "Project Management",
  //         alt_ar: "إدارة المشاريع",
  //       },
  //     },
  //     {
  //       id: 3,
  //       title: "The Majestic Pointe, Al Shindagha",
  //       title_ar: "إدارة المشاريع",
  //       slug: "/project-details-3",
  //       media: {
  //         path: "/images/projects-recent-3.jpg",
  //         alt: "Project Management",
  //         alt_ar: "إدارة المشاريع",
  //       },
  //     },
  //     {
  //       id: 4,
  //       title: "Lume Residences, Garden City",
  //       title_ar: "إدارة المشاريع",
  //       slug: "/project-details-1",
  //       media: {
  //         path: "/images/projects-recent-1.jpg",
  //         alt: "Project Management",
  //         alt_ar: "إدارة المشاريع",
  //       },
  //     },
  //     {
  //       id: 5,
  //       title: "Victoria Residences, UAE",
  //       title_ar: "إدارة المشاريع",
  //       slug: "/project-details-2",
  //       media: {
  //         path: "/images/projects-recent-2.jpg",
  //         alt: "Project Management",
  //         alt_ar: "إدارة المشاريع",
  //       },
  //     },
  //   ],
  // },

  // success_stories: {
  //   title: "Building Success Stories",
  //   title_ar: "بناء قصص النجاح",
  //   description:
  //     "<p>At Wasso Group, we recognize that every project is unique, with its own set of opportunities and challenges. Our project management service is built on the principle of transforming complex</p>",
  //   description_ar:
  //     "<p>في مجموعة واسو، ندرك أن كل مشروع فريد من نوعه، مع مجموعة خاصة من الفرص والتحديات. وتستند خدمة إدارة المشاريع لدينا على مبدأ تحويل المشاريع المعقدة إلى نجاحات ملموسة. سواء كان مشروعًا جديدًا أو توسعة أو تجديدًا، فإننا نقدم نهجًا شاملاً يضمن تحقيق أهدافك بكفاءة وفعالية.</p>",
  //   items: [
  //     {
  //       id: 1,
  //       title: "Luxury Residential Tower, Dubai",
  //       title_ar: "برج سكني فاخر، دبي",
  //       slug: "/project-details-1",
  //       media: {
  //         path: "/images/st1.jpg",
  //         alt: "Project Management",
  //         alt_ar: "إدارة المشاريع",
  //       },
  //     },
  //     {
  //       id: 2,
  //       title: "Regal Haven, Al Raha Beach",
  //       title_ar: "إدارة المشاريع",
  //       slug: "/project-details-2",
  //       media: {
  //         path: "/images/st2.png",
  //         alt: "Project Management",
  //         alt_ar: "إدارة المشاريع",
  //       },
  //     },
  //     {
  //       id: 3,
  //       title: "The Majestic Pointe, Al Shindagha",
  //       title_ar: "إدارة المشاريع",
  //       slug: "/project-details-3",
  //       media: {
  //         path: "/images/st3.png",
  //         alt: "Project Management",
  //         alt_ar: "إدارة المشاريع",
  //       },
  //     },
  //     {
  //       id: 4,
  //       title: "Lume Residences, Garden City",
  //       title_ar: "إدارة المشاريع",
  //       slug: "/project-details-1",
  //       media: {
  //         path: "/images/st1.jpg",
  //         alt: "Project Management",
  //         alt_ar: "إدارة المشاريع",
  //       },
  //     },
  //     {
  //       id: 5,
  //       title: "Victoria Residences, UAE",
  //       title_ar: "إدارة المشاريع",
  //       slug: "/project-details-2",
  //       media: {
  //         path: "/images/st2.png",
  //         alt: "Project Management",
  //         alt_ar: "إدارة المشاريع",
  //       },
  //     },
  //   ],
  // },

  // project_image: {
  //   media: {
  //     media_type: "image",
  //     mobile_path: "/images/st4.png",
  //     desktop_path: "/images/st4.png",
  //     media_alt: "Projects images",
  //   },
  // },
};

/**
 * GET /api/about
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  return NextResponse.json(
    {
      success: true,
      message: "About data fetched successfully",
      message_ar: "تم جلب بيانات عن الشركة بنجاح",
      data: aboutData,
    },
    { status: 200 },
  );
}
