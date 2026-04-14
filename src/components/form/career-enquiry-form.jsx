"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "next/navigation";
import { z } from "zod";

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
import { cn } from "@/lib/utils";

import Image from "next/image";
import { X } from "lucide-react";
import { STRAPI_URL } from "@/lib/constants";

// ✅ Final Correct Schema
const getFormSchema = (locale) => z.object({
  fullName: z
    .string()
    .min(2, locale === "ar" ? "يجب أن يتكون الاسم الكامل من حرفين على الأقل" : "Full name must be at least 2 characters")
    .max(50, locale === "ar" ? "لا يمكن أن يتجاوز الاسم الكامل 50 حرفًا" : "Full name cannot exceed 50 characters"),
  email: z.string().email(locale === "ar" ? "عنوان بريد إلكتروني غير صالح" : "Invalid email address"),
  phone: z.string().min(8, locale === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required"),
  attachment: z.any().optional(),
});

// Styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]",
);

const inputStyle = `
  text-[10px] sm:text-[10px] xl:text-[12px] 2xl:text-[12px] 3xl:text-[16px] leading-none font-normal text-black placeholder:text-[#1e1e1e] w-full !h-[40px] xl:!h-[50px] 2xl:!h-[60px] 3xl:!h-[75px] bg-none border-b-1 border-t-0 border-x-0 border-b-[#CDA278] px-0 rounded-none
  focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-[#966900]
  selection:bg-primary-800 appearance-none shadow-none
`
  .replace(/\s+/g, " ")
  .trim();

const errorStyle = cn("text-[#f17423]");

const textareaStyle = cn(
  inputStyle,
  "leading-tight min-h-[80px] 2xl:min-h-[100px] py-[15px] resize-none",
);

export default function CareerEnquiryForm() {
  const params = useParams();
  const locale = params?.locale || "en";
  const form = useForm({
    resolver: zodResolver(getFormSchema(locale)),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      // city: "",
      // message: "",
      attachment: null,
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // File upload
  const [uploadedFile, setUploadedFile] = useState(null);

  // const onSubmit = async (values) => {
  //   setLoading(true);
  //   setSuccess("");

  //   try {
  //     const res = await fetch("${STRAPI_URL}/api/career-enquiries", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ data: values }),
  //     });

  //     if (!res.ok) throw new Error("Failed to send enquiry");

  //     form.reset();
  //     setUploadedFile(null);
  //     setSuccess("Message sent successfully!");
  //   } catch {
  //     setSuccess("Something went wrong. Please try again.");
  //   }

  //   setLoading(false);
  // };

  // const onSubmit = async (values) => {
  //   setLoading(true);
  //   setSuccess("");

  //   try {
  //     const formData = new FormData();

  //     const data = {
  //       fullName: values.fullName,
  //       email: values.email,
  //       phone: values.phone,
  //       // city: values.city,
  //       // message: values.message,
  //     };

  //     formData.append("data", JSON.stringify(data));

  //     if (uploadedFile) {
  //       formData.append("files.attachment", uploadedFile);
  //     }

  //     for (let pair of formData.entries()) {
  //       console.log(pair[0], pair[1]);
  //     }
  //     const res = await fetch("${STRAPI_URL}/api/career-enquiries", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const result = await res.json();
  //     console.log(result);

  //     if (!res.ok) throw new Error("Upload failed");

  //     form.reset();
  //     setUploadedFile(null);
  //     setSuccess("Message sent successfully!");
  //   } catch (error) {
  //     console.error(error);
  //     setSuccess("Something went wrong.");
  //   }

  //   setLoading(false);
  // };

  const onSubmit = async (values) => {
    setLoading(true);
    setSuccess("");

    try {
      let attachmentId = null;

      // Ensure file upload happens FIRST
      if (uploadedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("files", uploadedFile);

        const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadRes.ok) throw new Error("File upload failed to Strapi");

        const uploadResult = await uploadRes.json();
        if (uploadResult && uploadResult.length > 0) {
          attachmentId = uploadResult[0].id;
        }
      }

      // Prepare final content API payload
      const data = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        locale: locale,
        // city: values.city,
        // message: values.message,
      };

      if (attachmentId) {
        data.attachment = attachmentId;
      }

      // Submit the text with relationship link to the newly uploaded file!
      const res = await fetch(`${STRAPI_URL}/api/career-enquiries?locale=${locale}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok) throw new Error("Form submission to Strapi failed");

      form.reset();
      setUploadedFile(null);
      setSuccess(locale === "ar" ? "تم إرسال الرسالة بنجاح!" : "Message sent successfully!");
    } catch (error) {
      console.error(error);
      setSuccess(locale === "ar" ? "حدث خطأ ما. يرجى المحاولة مرة أخرى." : "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setUploadedFile(file);
      form.setValue("attachment", file);
    }
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
    form.setValue("attachment", null);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2"
      >
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full md:w-1/3">
              <FormLabel className={"sr-only"}>Name</FormLabel>
              <FormControl>
                <Input {...field} className={inputStyle} placeholder={locale === "ar" ? "الاسم" : "NAME"} />
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
            <FormItem className="w-full md:w-1/3">
              <FormLabel className={"sr-only"}>Contact Number</FormLabel>
              <FormControl>
                <Input {...field} className={inputStyle} placeholder={locale === "ar" ? "الهاتف" : "PHONE"} />
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
            <FormItem className="w-full md:w-1/3">
              <FormLabel className={"sr-only"}>Email Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className={inputStyle}
                  placeholder={locale === "ar" ? "البريد الإلكتروني" : "EMAIL"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Upload Image */}
        <FormField
          control={form.control}
          name="attachment"
          render={() => (
            <FormItem className="w-full sm:w-[calc(100%-200px)]">
              <FormLabel className={"sr-only"}>Resume/CV</FormLabel>
              <FormControl>
                <div className="max-w-full space-y-2">
                  {!uploadedFile ? (
                    <label
                      htmlFor="file-upload"
                      className={cn(
                        inputStyle,
                        "flex items-center justify-between gap-x-1",
                      )}
                    >
                      <span className={cn(labelStyle, "text-[#1e1e1e] m-0")}>
                        {locale === "ar" ? "السيرة الذاتية" : "RESUME/CV"}
                      </span>

                      <span className="text-[9px] leading-0 font-normal text-[#1e1e1e] flex items-center gap-x-1 xl:gap-x-2 border border-[#CDA278] rounded-[4px] px-2 py-1 hover:scale-105 transition-all duration-300">
                        {locale === "ar" ? "اختر ملف" : "Choose File"}
                        <Image
                          src="/images/career-upload.svg"
                          alt="career-upload"
                          width={20}
                          height={20}
                          className="w-2 xl:w-2.5"
                          unoptimized
                        />
                      </span>

                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                  ) : (
                    <div
                      className={cn(
                        inputStyle,
                        "flex items-center justify-between gap-x-1 border",
                      )}
                    >
                      <span className="line-clamp-1 flex-1 pr-2">
                        {uploadedFile.name}
                      </span>
                      <button
                        type="button"
                        onClick={handleFileRemove}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="size-3 xl:size-4" />
                      </button>
                    </div>
                  )}
                </div>
              </FormControl>

              <FormMessage className="text-[10px] font-light text-[#939393]">
                {locale === "ar" ? "PDF أو DOC أو DOCX (بحد أقصى 5 ميجابايت)" : "PDF, DOC, or DOCX (Max 5MB)"}
              </FormMessage>
            </FormItem>
          )}
        />
        {/* Submit */}
        <div className="w-full sm:w-[200px]">
          <Button
            type="submit"
            variant={"outline"}
            disabled={loading}
            className="min-w-full font-normal mt-2 xl:mt-3.5 2xl:mt-5 3xl:mt-6"
          >
            {loading ? (locale === "ar" ? "جاري الإرسال..." : "Sending...") : locale === "ar" ? "أرسل رسالة" : "Send Message"}
          </Button>
        </div>

        {success && !loading && (
          <p className="text-green-600 mt-1">{success}</p>
        )}
      </form>
    </Form>
  );
}
