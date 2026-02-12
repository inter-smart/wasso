import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ data, index, locale }) {
  const isArabic = locale === "ar";
  return (
    <div
      className={cn(
        "group relative w-full h-full bg-[#FAFAFA] overflow-hidden p-[20px_20px_30px] sm:p-[25px_25px_40px] lg:p-[35px_35px_50px] 2xl:p-[45px_45px_80px] transition-colors duration-300 hover:shadow-xl",
        ((index + 1) % 4 === 2 || (index + 1) % 4 === 3) && "bg-[#FFFBF2]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Image
          src="/images/service-card-bg.png"
          alt={data?.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-start justify-between">
        {data?.icon && (
          <div className="w-[40px] sm:w-[50px] md:w-[60px] xl:w-[76px] 2xl:w-[100px] 3xl:w-[120px] h-[40px] sm:h-[50px] md:h-[60px] xl:h-[76px] 2xl:h-[100px] 3xl:h-[120px]">
            <Image
              src={data?.icon}
              alt={data?.title}
              width={120}
              height={120}
              className="h-full w-full object-contain"
            />
          </div>
        )}
      

        <Button
          size="lg"
          type="submit"
          variant="outline"
          className="min-w-[90px] sm:min-w-[100px] xl:min-w-[110px] 2xl:min-w-[120px] 3xl:min-w-[160px] transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <Link href={data?.slug}>
            {locale == "ar" ? "اعرف المزيد" : "Know More"}
          </Link>
        </Button>
      </div>

      <div className="mt-4 xl:mt-6 2xl:mt-8 xl:max-w-[85%] 2xl:max-w-[75%] 3xl:max-w-[60%]">
        <Heading
          as="h4"
          size="h4"
          className="text-[16px] sm:text-[18px] lg:text-[22px] xl:text-[26px] 2xl:text-[35px] 3xl:text-[40px] font-normal text-black mb-4"
        >
          {parse(locale === "ar" ? data?.title_ar : data?.title)}
        </Heading>
        <Text
          as="div"
          size="p1"
          className="font-normal line-clamp-3 text-[#1E1E1E]"
        >
          {parse(locale == "ar" ? data?.description_ar : data?.description)}
        </Text>
      </div>
    </div>
  );
}
