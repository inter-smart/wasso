import { notFound } from "next/navigation";
import ProjectsMonth from "@/components/blocks/projects/projects-month";
import InnerHero from "@/components/common/inner-hero";
import ProjectsMore from "@/components/blocks/projects/projects-more";
import ProjectsSuccessStories from "@/components/blocks/projects/projects-success-stories";
import ProjectsImage from "@/components/blocks/projects/projects-image";
import { STRAPI_URL } from "@/lib/constants";

// Local data removed

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  try {
    const res = await fetch(`${STRAPI_URL}/api/our-project?locale=${locale}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch projects metadata");

    const data = await res.json();

    return {
      title: data?.seoTitle || (locale === "ar" ? "المشاريع" : "Projects"),
      description:
        data?.seoDescription ||
        (locale === "ar"
          ? "استعرض مشاريعنا المميزة في إدارة المشاريع والهندسة وتطوير العقارات"
          : "Browse our featured projects in project management, engineering, and real estate development"),
    };
  } catch (error) {
    console.error("Projects metadata error:", error);
    return {
      title: locale === "ar" ? "المشاريع" : "Projects",
    };
  }
}

export default async function ProjectsPage({ params, searchParams }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  let projectsData = null;

  try {
    const res = await fetch(`${STRAPI_URL}/api/our-project?locale=${locale}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch projects");

    // your controller returns object directly
    projectsData = await res.json();
  } catch (error) {
    console.error("Error fetching projects data:", error);
  }

  if (!projectsData) {
    notFound();
  }

  const {
    projects_hero,
    project_month,
    success_stories,
    recent_projects,
    project_image,
  } = projectsData;

  return (
    <>
      <InnerHero
        locale={locale}
        data={projects_hero}
        slug={
          locale === "ar"
            ? projects_hero?.title_ar || "مشاريعنا"
            : projects_hero?.title || "Our Projects"
        }
      />

      <ProjectsMonth locale={locale} data={project_month} />

      <ProjectsSuccessStories locale={locale} data={success_stories} />

      <ProjectsMore locale={locale} data={recent_projects} />

      <ProjectsImage locale={locale} data={project_image} />
    </>
  );
}
