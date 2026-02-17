import { Heading } from "@/components/utils/typography";

export default function CareerHero({ data, locale }) {
  return (
    <section className="w-full py-[30px_15px] sm:py-[44px_28px] xl:py-[55px_35px] 2xl:py-[70px_44px]">
      <div className="container">
        <div className="w-full lg:max-w-[65%] mx-auto">
          <Heading
            as="h2"
            size="h2"
            className="font-normal text-[#1e1e1e] text-center xl:leading-[1]"
          >
            {locale === "ar" ? data?.text_ar : data?.text}
          </Heading>
        </div>
      </div>
    </section>
  );
}
