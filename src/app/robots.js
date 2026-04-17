// export default function robots() {
//   return {
//     rules: [
//       {
//         userAgent: "*",
//         allow: "/",
//       },
//       {
//         userAgent: "*",
//         disallow: "/admin",
//       },
//     ],
//     sitemap: "https://wasso.intersmart.in/sitemap.xml",
//   };
// }

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  };
}