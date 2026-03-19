export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/admin",
      },
    ],
    sitemap: "https://strapi.intersmart.in/sitemap.xml",
  };
}