import AboutInfo from "@/components/blocks/about/about-info";
import AboutSpec from "@/components/blocks/about/about-spec";
import AboutStatistics from "@/components/blocks/about/about-statistics";
import InnerHero from "@/components/common/inner-hero";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// Local data removed

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return {
    title: locale === "ar" ? "عن واسو" : "About WASSO",
    description:
      locale === "ar"
        ? "تعرف على واسو لإدارة المشاريع - شركة رائدة في إدارة المشاريع والهندسة وتطوير العقارات"
        : "Learn about WASSO Project Management - Leading company in project management, engineering, and real estate development",
  };
}

export default async function AboutPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  let aboutData = null;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/about?locale=${locale}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const response = await res.json();
      aboutData = response.data;
    }
  } catch (error) {
    console.error("Error fetching about data:", error);
  }

  if (!aboutData) {
    notFound();
  }

  // const { hero, mission, vision, values, story, team, achievements } =
  //   aboutData;

  const {
    hero,
    about_info,
    about_spec,
    about_statistics,
    recent_projects,
    success_stories,
    project_image,
  } = aboutData;

  return (
    <>
      {hero && (
        <InnerHero locale={locale} data={aboutData?.hero} slug={"Our Projects"} />
      )}

      <AboutInfo locale={locale} data={aboutData?.about_info} />

      <AboutSpec locale={locale} data={aboutData?.about_spec} />

      <AboutStatistics locale={locale} data={aboutData?.about_statistics} />

      {/* <div className="min-h-screen">
        {(mission || vision) && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="grid gap-8 md:grid-cols-2">
                {mission && (
                  <div>
                    <h2 className="mb-4 text-3xl font-bold">
                      {locale === "ar" ? mission.title_ar : mission.title}
                    </h2>
                    <p className="text-gray-600">
                      {locale === "ar"
                        ? mission.description_ar
                        : mission.description}
                    </p>
                  </div>
                )}
                {vision && (
                  <div>
                    <h2 className="mb-4 text-3xl font-bold">
                      {locale === "ar" ? vision.title_ar : vision.title}
                    </h2>
                    <p className="text-gray-600">
                      {locale === "ar"
                        ? vision.description_ar
                        : vision.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {values && values.length > 0 && (
          <section className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
                {locale === "ar" ? "قيمنا" : "Our Values"}
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {values.map((value, index) => (
                  <div key={index} className="text-center">
                    <h3 className="mb-2 text-xl font-semibold">
                      {locale === "ar" ? value.title_ar : value.title}
                    </h3>
                    <p className="text-gray-600">
                      {locale === "ar"
                        ? value.description_ar
                        : value.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {story && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-3xl font-bold md:text-4xl">
                {locale === "ar" ? story.title_ar : story.title}
              </h2>
              <div
                className="prose max-w-none text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: locale === "ar" ? story.content_ar : story.content,
                }}
              />
              {story.timeline && story.timeline.length > 0 && (
                <div className="mt-12">
                  <h3 className="mb-8 text-2xl font-bold">
                    {locale === "ar" ? "الجدول الزمني" : "Timeline"}
                  </h3>
                  <div className="space-y-8">
                    {story.timeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white">
                            {item.year}
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 text-xl font-semibold">
                            {locale === "ar" ? item.title_ar : item.title}
                          </h4>
                          <p className="text-gray-600">
                            {locale === "ar"
                              ? item.description_ar
                              : item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {team && (
          <section className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
                {locale === "ar" ? team.title_ar : team.title}
              </h2>
              <p className="mb-12 text-center text-gray-600">
                {locale === "ar" ? team.description_ar : team.description}
              </p>
              {team.stats && team.stats.length > 0 && (
                <div className="grid gap-8 md:grid-cols-3">
                  {team.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">
                        {stat.number}
                      </div>
                      <p className="text-lg text-gray-600">
                        {locale === "ar" ? stat.label_ar : stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {achievements && achievements.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
                {locale === "ar" ? "إنجازاتنا" : "Our Achievements"}
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <h3 className="mb-2 text-xl font-semibold">
                      {locale === "ar"
                        ? achievement.title_ar
                        : achievement.title}
                    </h3>
                    <p className="text-gray-600">
                      {locale === "ar"
                        ? achievement.description_ar
                        : achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div> */}
    </>
  );
}
