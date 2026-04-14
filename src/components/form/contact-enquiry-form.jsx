"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { useParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { STRAPI_URL } from "@/lib/constants";

// ✅ Validation schema
const getFormSchema = (locale) => z.object({
  fullName: z
    .string()
    .min(2, locale === "ar" ? "يجب أن يتكون الاسم الكامل من حرفين على الأقل" : "Full name must be at least 2 characters")
    .max(50, locale === "ar" ? "لا يمكن أن يتجاوز الاسم الكامل 50 حرفًا" : "Full name cannot exceed 50 characters"),
  email: z.string().email(locale === "ar" ? "عنوان بريد إلكتروني غير صالح" : "Invalid email address"),
  phone: z
    .string()
    .min(10, locale === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required")
    .max(20, locale === "ar" ? "رقم الهاتف طويل جداً" : "Phone number is too long"),
  additionalDetails: z
    .string({ required_error: locale === "ar" ? "الرسالة مطلوبة" : "Message is required" })
    .min(2, locale === "ar" ? "الرسالة قصيرة جدا" : "Message is too short")
    .max(4999, locale === "ar" ? "الرسالة طويلة جدا" : "Message is too long")
    .refine((val) => val.trim().length >= 2, locale === "ar" ? "الرسالة قصيرة جدا" : "Message is too short")
    .refine(
      (val) => /[\p{L}\p{N}]/u.test(val),
      locale === "ar" ? "لا يمكن أن تحتوي الرسالة على رموز خاصة فقط" : "Message cannot contain only special characters"
    )
    .refine(
      (val) => !/(<script|<iframe|<img|javascript:)/i.test(val) && !/(DROP\s+TABLE|SELECT\s+.*FROM|INSERT\s+INTO|DELETE\s+FROM)/i.test(val) && !/{{.*}}/.test(val),
      locale === "ar" ? "محتوى غير صالح" : "Invalid content detected"
    ),
});

// ✅ Shared styles
const labelStyle = cn(
  "text-[12px] lg:text-[14px] 2xl:text-[15px] 3xl:text-[18px] leading-none font-normal tracking-widest text-[#1e1e1e] mb-1",
);

const inputStyle = `
  text-[10px] sm:text-[10px] xl:text-[12px] 2xl:text-[12px] 3xl:text-[16px] leading-none font-normal text-black placeholder:text-[#1e1e1e] w-full !h-[40px] xl:!h-[50px] 2xl:!h-[60px] 3xl:!h-[75px] bg-white border-[#c09c86] px-[20px]
  focus:outline-none focus:ring-0 focus-visible:ring-1 focus-visible:border-transparent
  selection:bg-primary-800 appearance-none
`
  .replace(/\s+/g, " ")
  .trim();

const textareaStyle = `
  ${inputStyle} min-h-[75px] resize-none
`
  .replace(/\s+/g, " ")
  .trim();

const iconStyle = "w-3 xl:w-3.5 2xl:w-4 3xl:w-5 aspect-square object-contain";

export default function ContactEnquiryForm() {
  const params = useParams();
  const locale = params?.locale || "en";
  const form = useForm({
    resolver: zodResolver(getFormSchema(locale)),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      additionalDetails: "",
    },
  });
  useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // 2. Define a submit handler.
  async function onSubmit(values) {
    setLoading(true);
    setSuccess(null);

    try {
      const res = await fetch(`${STRAPI_URL}/api/contact-enquiries?locale=${locale}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { ...values, locale } }),
      });

      if (res.ok) {
        setSuccess(locale === "ar" ? "تم إرسال الرسالة بنجاح!" : "Message sent successfully!");
        form.reset(); // ✅ Reset the form properly
      } else {
        setSuccess(locale === "ar" ? "فشل إرسال الرسالة." : "Failed to send message.");
      }
    } catch (err) {
      console.log(err);
      setSuccess(locale === "ar" ? "حدث خطأ." : "Error occurred.");
    }

    setLoading(false);
  }

  // function onSubmit(values) {
  //   console.log(values);
  // }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-start -mx-3 [&>*]:p-3"
      >
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                <Image
                  src="/images/form-username.svg"
                  alt="form-username"
                  width={14}
                  height={14}
                  className={iconStyle}
                />
                {locale === "ar" ? "الاسم" : "NAME"}
              </FormLabel>
              <FormControl>
                <Input className={inputStyle} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                <Image
                  src="/images/form-phone.svg"
                  alt="form-phone"
                  width={14}
                  height={14}
                  className={iconStyle}
                />
                {locale === "ar" ? "الهاتف" : "PHONE"}
              </FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  type="tel"
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                <Image
                  src="/images/form-email.svg"
                  alt="form-email"
                  width={14}
                  height={14}
                  className={iconStyle}
                />
                {locale === "ar" ? "البريد الإلكتروني" : "EMAIL"}
              </FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  type="email"
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Details */}
        <FormField
          control={form.control}
          name="additionalDetails"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                <Image
                  src="/images/form-message.svg"
                  alt="form-message"
                  width={14}
                  height={14}
                  className={iconStyle}
                />
                {locale === "ar" ? "الرسالة" : "MESSAGE"}
              </FormLabel>
              <FormControl>
                <Textarea className={textareaStyle} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="w-full mt-[5px] lg:mt-[8px] xl:mt-[10px] 2xl:mt-[20px] 3xl:mt-[25px]">
          <Button
            type="submit"
            variant="outline"
            disabled={loading}
            className={
              "min-w-[120px] lg:min-w-[160px] xl:min-w-[196px] 2xl:min-w-[260px] 3xl:min-w-[320px] lg:h-9 xl:h-10 2xl:h-12 3xl:h-14"
            }
          >
            {loading ? (locale === "ar" ? "جاري الإرسال..." : "Sending...") : locale === "ar" ? "أرسل رسالة" : "Send Message"}
          </Button>
        </div>
        {success && (
          <p className="w-full text-center text-green-500 mt-3">{success}</p>
        )}
      </form>
    </Form>
  );
}
