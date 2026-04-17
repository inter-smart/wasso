import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/typography";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsCard({ locale, data }) {
  return (
    <div className="w-full h-auto block bg-white">
      <div className="w-full aspect-54/60 2xl:aspect-54/65 overflow-hidden mb-2 xl:mb-4 2xl:mb-6 select-none">
        <Image
          src={data?.media?.path}
          alt={(locale === "ar" ? data?.media?.alt_ar : data?.media?.alt) || "Project Image"}
          width={540}
          height={700}
          className="w-full h-full object-cover hover:scale-105 transition-all duration-300 select-none user-select-none"
        />
      </div>
      <div>
        <Heading
          as="div"
          size="h4"
          className="font-normal line-clamp-1 text-[#1e1e1e] mb-2 xl:mb-3 2xl:mb-4"
        >
          {locale == "ar" ? data?.title_ar : data?.title}
        </Heading>
        <Button
          size="lg"
          variant={"outline"}
          className="min-w-[100px] xl:min-w-[105px] 2xl:min-w-[130px] transition-all duration-300 bg-[#fffbf2] hover:scale-105 hover:shadow-lg"
          asChild
        >
          <Link href={data?.slug}>
            {locale == "ar" ? "عرض المشروع" : "View Project"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
