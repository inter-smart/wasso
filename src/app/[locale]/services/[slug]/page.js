import ServiceFlagship from "@/components/blocks/service/service-flagship";
import ServiceHearFrom from "@/components/blocks/service/service-hear";
import InnerHero from "@/components/common/inner-hero";
import ServiceApproach from "@/components/blocks/service/service-approach";
import ServiceOverview from "@/components/blocks/service/service-overview";
import ServiceBenefit from "@/components/blocks/service/service-benefits";
import { STRAPI_URL } from "@/lib/constants";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;

  try {
    const url = `${STRAPI_URL}/api/services?filters[slug][$eq]=${slug}&locale=${locale}`;
    const res = await fetch(url, { cache: "no-store" });

    if (res.ok) {
      const response = await res.json();
      const serviceData = response.data?.[0];

      if (serviceData) {
        return {
          title: serviceData.title || (locale === "ar" ? "الخدمة" : "Service"),
          description: serviceData.description || "",
        };
      }
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  return {
    title: locale === "ar" ? "الخدمة غير موجودة" : "Service Not Found",
  };
}

export default async function ServiceDetailPage({ params }) {
  const { locale, slug } = await params;

  let serviceData = null;

  try {
    const populateQuery =
      "populate[bannerSection][populate]=*&" +
      "populate[Overview][populate]=*&" +
      "populate[approachSection][populate][approachItem][populate]=*&" +
      "populate[benefitSection][populate]=*&" +
      "populate[flagshipSection][populate][projects][populate]=*&" +
      "populate[formSection]=*";

    const url = `${STRAPI_URL}/api/services?filters[slug][$eq]=${slug}&locale=${locale}&${populateQuery}`;

    console.log("Fetching from Strapi:", url);

    const res = await fetch(url, { cache: "no-store" });

    if (res.ok) {
      const response = await res.json();
      const rawData = response.data?.[0];

      if (rawData) {
        // Refined Strapi 5 Blocks to HTML converter
        const blocksToHtml = (blocks) => {
          if (!blocks) return "";
          if (typeof blocks === "string") return blocks;
          if (!Array.isArray(blocks)) return "";

          return blocks
            .map((block) => {
              if (block.type === "text" || block.text !== undefined) {
                let text = block.text || "";
                if (block.bold) text = `<strong>${text}</strong>`;
                if (block.italic) text = `<em>${text}</em>`;
                if (block.underline) text = `<u>${text}</u>`;
                return text;
              }

              const childrenHtml = block.children
                ? blocksToHtml(block.children)
                : "";

              switch (block.type) {
                case "paragraph":
                  return childrenHtml.trim() ? `<p>${childrenHtml}</p>` : "";
                case "list":
                  const tag = block.format === "ordered" ? "ol" : "ul";
                  return `\n<${tag} style="list-style: disc; margin-left: 20px; margin-bottom: 10px;">${childrenHtml}</${tag}>\n`;
                case "list-item":
                  return `<li>${childrenHtml}</li>`;
                case "heading":
                  return `<h${block.level || 1}>${childrenHtml}</h${
                    block.level || 1
                  }>`;
                case "link":
                  return `<a href="${block.url}" class="text-blue-600 hover:underline">${childrenHtml}</a>`;
                default:
                  return childrenHtml;
              }
            })
            .join("");
        };

        // Map Strapi structure to component props
        serviceData = {
          heroInfo_data: {
            media: {
              media_type: rawData.bannerSection?.enableVideo ? "video" : "image",
              mobile_path: rawData.bannerSection?.enableVideo
                ? `${STRAPI_URL}${rawData.bannerSection?.video?.url}`
                : `${STRAPI_URL}${rawData.bannerSection?.mobileImage?.url}`,
              desktop_path: rawData.bannerSection?.enableVideo
                ? `${STRAPI_URL}${rawData.bannerSection?.video?.url}`
                : `${STRAPI_URL}${rawData.bannerSection?.desktopImage?.url}`,
              media_alt:
                rawData.bannerSection?.mobileImage?.alternativeText ||
                rawData.bannerSection?.title ||
                "hero",
            },
            title: rawData.bannerSection?.title || rawData.title,
            title_ar: rawData.bannerSection?.title || rawData.title,
          },
          overview_data: {
            title: rawData.Overview?.title || "",
            title_ar: rawData.Overview?.title || "",
            description: blocksToHtml(rawData.Overview?.description),
            description_ar: blocksToHtml(rawData.Overview?.description),
            media: {
              desktop_path: rawData.Overview?.image?.url
                ? `${STRAPI_URL}${rawData.Overview.image.url}`
                : null,
              media_alt: rawData.Overview?.image?.alternativeText || "overview",
            },
          },
          approach_data: {
            main_title: rawData.approachSection?.title || "",
            main_title_ar: rawData.approachSection?.title || "",
            items:
              rawData.approachSection?.approachItem?.map((item) => ({
                id: item.id,
                title: item.title || "",
                title_ar: item.title || "",
                description: blocksToHtml(item.description),
                description_ar: blocksToHtml(item.description),
              })) || [],
          },
          benefit_data: {
            title: rawData.benefitSection?.title || "",
            title_ar: rawData.benefitSection?.title || "",
            description: blocksToHtml(rawData.benefitSection?.description),
            media: {
              desktop_path: rawData.benefitSection?.image?.url
                ? `${STRAPI_URL}${rawData.benefitSection.image.url}`
                : null,
              media_alt:
                rawData.benefitSection?.image?.alternativeText || "benefit",
            },
          },
          flagship_data: {
            title: rawData.flagshipSection?.title || "",
            title_ar: rawData.flagshipSection?.title || "",
            items:
              rawData.flagshipSection?.projects?.map((p) => ({
                id: p.id,
                title: p.title || "",
                title_ar: p.title || "",
                description: blocksToHtml(p.description),
                description_ar: blocksToHtml(p.description),
                media: {
                  path: p.image?.url ? `${STRAPI_URL}${p.image.url}` : null,
                  alt: p.image?.alternativeText || p.title,
                },
              })) || [],
          },
          form_data: {
            title_lit: blocksToHtml(rawData.formSection?.title),
            title_lit_ar: blocksToHtml(rawData.formSection?.title),
            title: blocksToHtml(rawData.formSection?.titleContinuation),
            title_ar: blocksToHtml(rawData.formSection?.titleContinuation),
            description: blocksToHtml(rawData.formSection?.description),
            description_ar: blocksToHtml(rawData.formSection?.description),
          },
        };
      }

    } else {
      console.error("Strapi fetch failed:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error fetching service data:", error);
  }

  if (!serviceData) {
    notFound();
  }

  return (
    <>
      <InnerHero
        locale={locale}
        data={serviceData.heroInfo_data}
        slug={"Services"}
      />
      <ServiceOverview data={serviceData.overview_data} locale={locale} />
      <ServiceApproach data={serviceData.approach_data} locale={locale} />
      <ServiceBenefit data={serviceData.benefit_data} locale={locale} />
      <ServiceFlagship data={serviceData.flagship_data} locale={locale} />
      <ServiceHearFrom data={serviceData.form_data} locale={locale} />
    </>
  );
}

