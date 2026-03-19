import { BASE_URL, STRAPI_URL } from "@/lib/constants";

export const revalidate = 60;

export default async function sitemap() {
  const baseUrl = BASE_URL;

  const locales = ["en", "ar"];

  // Fetch pages from Strapi
  const res = await fetch(`${STRAPI_URL}/api/pages?fields=slug,updatedAt`, {
    cache: "no-store",
  });

  const data = await res.json();
  const pages = data?.data || [];

  let urls = [];

  // Static routes
  const staticRoutes = [
    "",
    "about",
    "careers",
    "contact",
    "projects",
    "services",
  ];

  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      urls.push({
        url: `${baseUrl}/${locale}/${route}`,
        lastModified: new Date(),
      });
    });
  });

  // Dynamic routes from Strapi
  pages.forEach((item) => {
    const slug = item?.attributes?.slug;
    const updatedAt = item?.attributes?.updatedAt;

    if (!slug) return;

    locales.forEach((locale) => {
      urls.push({
        url: `${baseUrl}/${locale}/${slug}`,
        lastModified: updatedAt || new Date(),
      });
    });
  });

  return urls;
}
