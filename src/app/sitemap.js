import { BASE_URL, STRAPI_URL } from "@/lib/constants";

export const revalidate = 60;

export default async function sitemap() {
  const baseUrl = BASE_URL;
  const locales = ["en", "ar"];

  const res = await fetch(`${STRAPI_URL}/api/pages?fields=slug,updatedAt`, {
    cache: "no-store",
  });

  const data = await res.json();
  const pages = data?.data || [];

  const urls = [];

  const staticRoutes = [
    "",
    "about",
    "careers",
    "contact",
    "projects",
    "services",
  ];

  // Static
  for (const locale of locales) {
    for (const route of staticRoutes) {
      urls.push({
        url: route ? `${baseUrl}/${locale}/${route}` : `${baseUrl}/${locale}`,
        lastModified: new Date().toISOString(), // ✅ FIX
      });
    }
  }

  // Dynamic
  for (const item of pages) {
    const slug = item?.attributes?.slug;
    const updatedAt = item?.attributes?.updatedAt;

    if (!slug) continue;

    for (const locale of locales) {
      urls.push({
        url: `${baseUrl}/${locale}/${slug}`,
        lastModified: updatedAt
          ? new Date(updatedAt).toISOString()
          : new Date().toISOString(),
      });
    }
  }

  return urls;
}
