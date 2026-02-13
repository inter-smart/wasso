import { notFound } from "next/navigation";
import ProjectsMonth from "@/components/blocks/projects/projects-month";
import InnerHero from "@/components/common/inner-hero";
import ProjectsMore from "@/components/blocks/projects/projects-more";
import ProjectsSuccessStories from "@/components/blocks/projects/projects-success-stories";
import ProjectsImage from "@/components/blocks/projects/projects-image";

// Local data removed

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return {
    title: locale === "ar" ? "المشاريع" : "Projects",
    description:
      locale === "ar"
        ? "استعرض مشاريعنا المميزة في إدارة المشاريع والهندسة وتطوير العقارات"
        : "Browse our featured projects in project management, engineering, and real estate development",
  };
}

export default async function ProjectsPage({ params, searchParams }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  let projectsData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/projects?locale=${locale}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const response = await res.json();
      projectsData = response.data;
    }
  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  if (!projectsData) {
    notFound();
  }

  const {
    projects_hero,
    project_month,
    recent_projects,
    success_stories,
    project_image,
  } = projectsData;

  // const category = searchParams?.category || null;
  // const page = searchParams?.page || "1";

  // let projectsData = null;

  // try {
  //   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  //   const queryParams = new URLSearchParams({
  //     locale,
  //     page,
  //     limit: "12",
  //   });
  //   if (category) queryParams.append("category", category);

  //   const res = await fetch(
  //     `${baseUrl}/api/projects?${queryParams.toString()}`,
  //     {
  //       cache: "no-store",
  //     },
  //   );

  //   if (res.ok) {
  //     const response = await res.json();
  //     projectsData = response.data;
  //   }
  // } catch (error) {
  //   console.error("Error fetching projects data:", error);
  // }

  // if (!projectsData) {
  //   notFound();
  // }

  // const { projects, pagination } = projectsData;

  return (
    <>
      <InnerHero
        locale={locale}
        data={projects_hero}
        slug={"Our Projects"}
      />

      <ProjectsMonth locale={locale} data={project_month} />

      <ProjectsSuccessStories
        locale={locale}
        data={success_stories}
      />

      <ProjectsMore locale={locale} data={recent_projects} />

      <ProjectsImage locale={locale} data={project_image} />
    </>
  );
}
