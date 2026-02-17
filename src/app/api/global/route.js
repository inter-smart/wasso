import { NextResponse } from "next/server";

/**
 * GET /api/global
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  const globalData = {
    header_data: {
      id: "uuid-primary-key",
      name: "WASSO Project Management LLC",
      name_ar: "واسو لإدارة المشاريع",
      slug: "/",
      logoUrl: "/images/brand-logo.svg",
      logoWhiteUrl: "/images/brand-footer-logo.svg",
      description: "Leading project management and workspace solutions",
      description_ar: "الحلول الرائدة في إدارة المشاريع ومساحات العمل",
      websiteUrl: "https://wasso.ae/",
      countryOfOrigin: "AE",
      establishedYear: "2026",
      specialties: [
        "project management",
        "workspace solutions",
        "office furniture",
      ],
      specialties_ar: ["إدارة المشاريع", "حلول مساحات العمل", "أثاث المكاتب"],
      isFeatured: true,
      sortOrder: 0,
      isActive: true,
      seoTitle: "WASSO Project Management LLC",
      seoTitle_ar: "واسو لإدارة المشاريع",
      seoDescription: "Leading project management and workspace solutions",
      seoDescription_ar: "الحلول الرائدة في إدارة المشاريع ومساحات العمل",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    navigation_data: [
      {
        id: 1,
        hasSubmenu: false,
        name: "Home",
        name_ar: "الرئيسية",
        slug: "",
      },
      {
        id: 2,
        hasSubmenu: false,
        name: "About Us",
        name_ar: "من نحن",
        slug: "/about",
      },
      {
        id: 3,
        hasSubmenu: false,
        name: "Services",
        name_ar: "الخدمات",
        slug: "/services",
      },
      {
        id: 4,
        hasSubmenu: false,
        name: "Projects",
        name_ar: "المشاريع",
        slug: "/projects",
      },
      {
        id: 5,
        hasSubmenu: false,
        name: "Careers",
        name_ar: "الوظائف",
        slug: "/careers",
      },
      {
        id: 6,
        hasSubmenu: false,
        name: "Contact Us",
        name_ar: "اتصل بنا",
        slug: "/contact",
      },
    ],
    footer_data: {
      id: "uuid-primary-key",
      name: "WASSO Project Management LLC",
      name_ar: "واسو لإدارة المشاريع",
      slug: "/",
      logoUrl: "/images/brand-footer-logo.svg",
      logoWhiteUrl: "/images/brand-logo.svg",
      address:
        "<p>WASSO Project Management LLC,<br /> 57PH+4PJ - Business Bay - Bay Square Dubai United Arab Emirates</p>",
      address_ar:
        "<p>واسو لإدارة المشاريع ش.ذ.م.م<br /> مكتب رقم 133، برج الأعمال، طريق ميدان،294568</p>",
      websiteUrl: "https://wasso.ae/",
      phone: ["+971 4 123 4567"],
      email: ["info@wassopm.com"],
      location_map_link: "https://goo.gl/maps/example",
      services_navigation: [
        {
          id: "01",
          label: "Project Management",
          label_ar: "إدارة المشاريع",
          link: "/services/project-management",
        },
        {
          id: "02",
          label: "Engineering Supervision",
          label_ar: "حلول مساحات العمل",
          link: "/services/workspace-solutions",
        },
        {
          id: "03",
          label: "Contracts & Tenders",
          label_ar: "الاستشارات",
          link: "/services",
        },
        {
          id: "04",
          label: "Quality Assurance",
          label_ar: "عرض جميع الخدمات",
          link: "/services",
        },
      ],
      quick_link_navigation: [
        {
          id: "01",
          label: "Home",
          label_ar: "الرئيسية",
          link: "/",
        },
        {
          id: "02",
          label: "About",
          label_ar: "من نحن",
          link: "/about",
        },
        {
          id: "03",
          label: "Services",
          label_ar: "الخدمات",
          link: "/services",
        },
        {
          id: "04",
          label: "Projects",
          label_ar: "المشاريع",
          link: "/projects",
        },
        {
          id: "05",
          label: "Careers",
          label_ar: "الوظائف",
          link: "/careers",
        },
        {
          id: "06",
          label: "Contact",
          label_ar: "اتصل بنا",
          link: "/contact",
        },
      ],
      copyright: "<p>© 2026 WASSO. All Rights Reserved.</p>",
      copyright_ar:
        "<p>© 2026 واسو لإدارة المشاريع ش.ذ.م.م. جميع الحقوق محفوظة.</p>",
    },
    social_link_data: [
      {
        id: "01",
        name: "facebook",
        link: "https://www.facebook.com/",
        media: {
          media_type: "image",
          media_path: "/images/social-1.svg",
          media_alt: "social-fb",
        },
      },
      {
        id: "02",
        name: "instagram",
        link: "https://www.instagram.com/",
        media: {
          media_type: "image",
          media_path: "/images/social-2.svg",
          media_alt: "social-insta",
        },
      },
      {
        id: "03",
        name: "youtube",
        link: "https://www.youtube.com/",
        media: {
          media_type: "image",
          media_path: "/images/social-3.svg",
          media_alt: "social-youtube",
        },
      },
      {
        id: "04",
        name: "linkedin",
        link: "https://www.linkedin.com/",
        media: {
          media_type: "image",
          media_path: "/images/social-4.svg",
          media_alt: "social-linkedin",
        },
      },
      {
        id: "05",
        name: "linkedin",
        link: "https://www.linkedin.com/",
        media: {
          media_type: "image",
          media_path: "/images/social-5.svg",
          media_alt: "social-linkedin",
        },
      },
    ],
  };

  return NextResponse.json(
    {
      success: true,
      message: "Global data fetched successfully",
      message_ar: "تم جلب البيانات العامة بنجاح",
      data: globalData,
    },
    { status: 200 },
  );
}
