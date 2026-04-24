"use client";
import Link from "next/link";
import { Heading, Text } from "@/components/utils/typography";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function NotFound() {
  const params = useParams();
  const locale = params?.locale || "en";

  return (
    <section className="flex flex-col items-center justify-center py-[60px] sm:py-[100px] lg:py-[140px] 2xl:py-[200px] min-h-[100vh] bg-[#00050f] text-center px-4 w-full pt-[var(--header-y)]">
      <Heading
        as="h1"
        size="h1"
        className="lg:text-[82px] 2xl:text-[88px] 3xl:text-[100px] font-bold leading-none text-[#c09c86] mb-2 mt-[15px] sm:mt-[30px] lg:mt-[60px] 2xl:mt-[100px]"
      >
        404
      </Heading>
      <Heading as="h2" size="h3" className="mb-4 text-white">
        {locale === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
      </Heading>
      <Text
        size="p1"
        className="text-white mb-8 max-w-[500px] mx-auto leading-relaxed"
      >
        {locale === "ar"
          ? "ربما تم إزالة الصفحة التي تبحث عنها، أو تم تغيير اسمها، أو أنها غير متاحة مؤقتًا."
          : "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}
      </Text>
      <Button
        size="lg"
        variant={"outline"}
        className="text-white min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
        asChild
      >
        <Link href={`/${locale}/`}>
          {locale === "ar" ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}
        </Link>
      </Button>
    </section>
  );
}
