import "./../globals.css";
import { cn } from "@/lib/utils";
import { locales, localeDirection } from "../../il8n/config";
import { getFontVariable, getFontClassName } from "@/lib/fonts";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PageLoader from "@/components/animations/page-loader";
import SmoothScrolling from "@/components/utils/smooth-scrolling";
import { STRAPI_URL } from "@/lib/constants";

import dynamic from "next/dynamic";

const CursorFollower = dynamic(() => import("@/components/animations/cursor-follower"));
const FloatNavigation = dynamic(() => import("@/components/common/float-navigation"));

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  // Fetch the favicon from the Global single type in Strapi
  // The global controller already populates header_data.favicon and returns faviconUrl
  let faviconUrl = null;
  try {
    const res = await fetch(`${STRAPI_URL}/api/global`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      // Controller returns faviconUrl as a complete absolute URL string
      faviconUrl = json?.header_data?.faviconUrl || null;
    }
  } catch {
    // Silently fail — will use the static fallback favicon
  }

  return {
    title: {
      default: "WASSO Project Management LLC",
      template: "%s",
    },
    description:
      "Leading project management, engineering, and real estate development solutions across the UAE and GCC region.",
    keywords: [
      "project management",
      "engineering",
      "real estate",
      "UAE",
      "construction",
      "workspace solutions",
    ],
    authors: [{ name: "WASSO Project Management LLC" }],
    creator: "WASSO Project Management LLC",
    publisher: "WASSO Project Management LLC",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
    // Use the Strapi favicon if available, otherwise fall back to /favicon.png
    icons: {
      icon: faviconUrl || "/favicon.png",
      shortcut: faviconUrl || "/favicon.png",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: "ar_AE",
      siteName: "WASSO Project Management LLC",
    },
    twitter: {
      card: "summary_large_image",
      creator: "@wasso",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({ children, params }) {
  const resolvedParams = await params;

  const locale = resolvedParams.locale;
  const dir = localeDirection[resolvedParams.locale] || "ltr";

  let globalData = null;

  try {
    // During build, use relative URL or skip fetch
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const url = `${STRAPI_URL}/api/global?locale=${locale}`;

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const response = await res.json();
      globalData = response;
    }
  } catch (error) {
    // Silently fail during build - will use fallback data
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching global data:", error);
    }
  }

  // Fallback data if API fails
  // const fallbackData = {
  //   header_data: {
  //     name: "WASSO Project Management LLC",
  //     name_ar: "واسو لإدارة المشاريع",
  //     logoUrl: "/images/brand-logo-primary.svg",
  //     logoWhiteUrl: "/images/brand-logo.svg",
  //   },
  //   navigation_data: [],
  //   footer_data: {
  //     name: "WASSO Project Management LLC",
  //     name_ar: "واسو لإدارة المشاريع",
  //     logoUrl: "/images/brand-logo-primary.svg",
  //   },
  //   social_link_data: [],
  // };

  const data = globalData || {
    header_data: {},
    navigation_data: [],
    footer_data: {},
    social_link_data: [],
    stickyWidget: null,
    button: null,
  };

  const fontVariable = getFontVariable(locale);
  const fontClassName = getFontClassName(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(fontVariable, "antialiased")}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to image origins */}
        <link rel="preconnect" href={STRAPI_URL ? new URL(STRAPI_URL).origin : undefined} />
      </head>
      <body className={cn("antialiased", fontClassName, fontVariable)}>
        <SmoothScrolling>
          <PageLoader />
          <CursorFollower />
          <FloatNavigation locale={locale} data={data.stickyWidget} />

          <Header
            locale={locale}
            headerData={{
              ...data.header_data,
              button: data.button,
            }}
            navigationData={data.navigation_data}
          />

          <main className="min-h-screen">{children}</main>

          <Footer
            locale={locale}
            footerData={data.footer_data}
            socialLinkData={data.social_link_data}
          />
        </SmoothScrolling>
      </body>
    </html>
  );
}
