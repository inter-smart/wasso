import { Heading, Text } from "@/components/utils/typography";
import Image from "next/image";

export default function CareerCulture({ data, locale }) {
  return (
    <section className="w-full pt-[20px] sm:pt-[25px] xl:pt-[50px] 2xl:pt-[70px] 3xl:pt-[85px]">
      <div className="container">
        <div className="w-full">
          <div className="flex flex-wrap md:-m-[25px] xl:-m-[50px] 2xl:-m-[70px] 3xl:-m-[85px] md:[&>*]:p-[25px] xl:[&>*]:p-[50px] 2xl:[&>*]:p-[70px] 3xl:[&>*]:p-[85px]">
            <div className="w-full md:w-[47%]">
              <Heading as="h2" size="h3" className="font-normal text-[#1e1e1e]">
                {locale === "ar" ? data?.title_ar : data?.title}
              </Heading>
              <Text as="div" size="p1" className="text-[#1e1e1e]">
                {locale === "ar" ? data?.description_ar : data?.description}
              </Text>
              <div className="w-full">
                {data?.features?.map((item) => (
                  <div key={item.id} className="w-full">
                    <div className="flex items-center gap-[12px] sm:gap-[15px] 2xl:gap-[18px] 3xl:gap-[20px] my-[20px] xl:my-[30px] 2xl:my-[40px] 3xl:my-[50px]">
                      <div className="w-[35px] xl:w-[40px] 2xl:w-[50px] 3xl:w-[56px] h-[35px] xl:h-[40px] 2xl:h-[50px] 3xl:h-[56px]">
                        <Image
                          src={item.icon}
                          alt="culture icon"
                          width={56}
                          height={56}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="w-[calc(100%-56px)]">
                        <Heading
                          as="h3"
                          size="h4"
                          className="font-normal text-[#1e1e1e]"
                        >
                          {locale === "ar" ? item.title_ar : item.title}
                        </Heading>
                        <Text as="div" size="p1" className="text-[#1e1e1e]">
                          {locale === "ar"
                            ? item.description_ar
                            : item.description}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-[53%]">
              <div className="w-full h-full overflow-hidden">
                <Image
                  src={data?.image}
                  alt={locale === "ar" ? data?.image_alt_ar : data?.image_alt}
                  width={715}
                  height={444}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
