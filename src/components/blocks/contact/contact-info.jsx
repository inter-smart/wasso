import Image from "next/image";
import parse from "html-react-parser";
import { Heading, Text } from "@/components/utils/typography";
import { cn } from "@/lib/utils";
import ContactEnquiryForm from "@/components/form/contact-enquiry-form";

export default function ContactInfo({ data, locale }) {
  return (
    <section className="w-full h-auto block py-6 sm:py-10 lg:py-12 xl:py-15 2xl:py-18 3xl:py-22">
      <div className="container">
        <Heading
          as="h2"
          size="h3"
          className="leading-tight font-normal sm:text-center text-[#1e1e1e] mb-4 lg:mb-6 xl:mb-10 2xl:mb-12 3xl:mb-13 xl:max-w-11/12 mx-auto"
        >
          {parse(locale == "ar" ? data?.title_ar : data?.title)}
        </Heading>
        <div className="flex flex-wrap -mx-1 sm:-mx-2 lg:-mx-3 xl:-mx-4 2xl:-mx-5 [&>*]:p-1 sm:[&>*]:p-2 lg:[&>*]:p-3 xl:[&>*]:p-4 2xl:[&>*]:p-5">
          <div className="w-full lg:w-6/12">
            <div className="flex flex-wrap -m-1 sm:-m-2 lg:-m-1.5 xl:-m-2 2xl:-m-2.5 [&>*]:p-1 sm:[&>*]:p-2 lg:[&>*]:p-1.5 xl:[&>*]:p-2 2xl:[&>*]:p-2.5">
              {data?.address && (
                <div className="w-full sm:w-1/2">
                  <SubItems
                    data={data?.address}
                    className="bg-[#fffbf2]"
                    info={<p>{data?.address?.details}</p>}
                    locale={locale}
                  />
                </div>
              )}
              {data?.phone && (
                <div className="w-full sm:w-1/2">
                  <SubItems
                    data={data?.phone}
                    info={
                      <a href={`tel:${data?.phone?.details}`}>
                        {data?.phone?.details}
                      </a>
                    }
                    locale={locale}
                  />
                </div>
              )}
              {data?.email && (
                <div className="w-full sm:w-1/2">
                  <SubItems
                    data={data?.email}
                    info={
                      <a href={`mailto:${data?.email?.details}`}>
                        {data?.email?.details}
                      </a>
                    }
                    locale={locale}
                  />
                </div>
              )}
              {data?.whatsapp && (
                <div className="w-full sm:w-1/2">
                  <SubItems
                    data={data?.whatsapp}
                    className="bg-[#fffbf2]"
                    info={
                      <a href={`https://wa.me/${data?.whatsapp?.details}`}>
                        {data?.whatsapp?.details}
                      </a>
                    }
                    locale={locale}
                  />
                </div>
              )}
              {data?.location && (
                <div className="w-full">
                  <div className="w-full aspect-520/320 sm:aspect-554/230 overflow-hidden rounded mt-2 lg:mt-3 xl:mt-4 2xl:mt-5 grayscale-100">
                    <iframe
                      src={data?.location?.details}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-6/12">
            <div className="w-full bg-[#fffbf2] p-4 lg:p-8 xl:p-12.5 2xl:p-15 3xl:p-18">
              <ContactEnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SubItems({ data, className, info, locale }) {
  return (
    <div
      dir="ltr"
      className={cn(
        "w-full h-full bg-[#fafafa] p-4 xl:p-6 2xl:p-7 3xl:p-8",
        className,
      )}
    >
      <Image
        src={data?.icon_path}
        alt={locale == "ar" ? data?.label_ar : data?.label}
        width={45}
        height={45}
        className="w-5 sm:w-[28px] xl:w-[32px] 2xl:w-[38px] 3xl:w-[47px] aspect-square object-contain block select-none mb-2.5 xl:mb-7 2xl:mb-6 3xl:mb-7"
      />
      <Heading
        as="h6"
        size="h5"
        className="font-medium line-clamp-1 text-[#1e1e1e] mb-0.5 xl:mb-1"
      >
        {parse(locale == "ar" ? data?.label_ar : data?.label)}
      </Heading>
      <Text
        as="div"
        size="none"
        className="text-[11px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[16px] leading-normal font-normal text-[#1e1e1e]"
      >
        {info}
      </Text>
    </div>
  );
}
