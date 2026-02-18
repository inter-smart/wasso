import { notFound } from "next/navigation";
import Link from "next/link";
import InnerHero from "@/components/common/inner-hero";
import ProjectsInfo from "@/components/blocks/projects/projects-info";
import ProjectsRecent from "@/components/blocks/projects/projects-recent";
import ProjectsExplore from "@/components/blocks/projects/projects-explore";
import { STRAPI_URL } from "@/lib/constants";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;

  let projectData = null;

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/projects/${slug}?locale=${locale}`,
      {
        cache: "no-store",
      },
    );

    if (res.ok) {
      const response = await res.json();
      projectData = response.data;
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
  }

  if (!projectData) {
    return {
      title: locale === "ar" ? "المشروع غير موجود" : "Project Not Found",
    };
  }

  return {
    title: locale === "ar" ? projectData.seoTitle_ar : projectData.seoTitle,
    description:
      locale === "ar"
        ? projectData.seoDescription_ar
        : projectData.seoDescription,
  };
}

export default async function ProjectsDetailPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;

  let projectData = null;

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/projects/${slug}?locale=${locale}`,
      {
        cache: "no-store",
      },
    );

    if (res.ok) {
      const response = await res.json();
      projectData = response.data;
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
  }

  if (!projectData) {
    notFound();
  }

  return (
    <>
      <InnerHero
        locale={locale}
        data={projectData?.hero}
        slug={"Our Projects"}
      />

      <ProjectsInfo locale={locale} data={projectData?.project_info} />

      <ProjectsRecent locale={locale} data={projectData?.recent_projects} />

      <ProjectsExplore locale={locale} data={projectData?.explore_projects} />
    </>
  );
}
