"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number is required")
    .max(20, "Phone number is too long"),
  additionalDetails: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length >= 2, "Message is too short"),
});

// ✅ Shared styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]",
);

const inputStyle = cn(
  "text-[14px] lg:text-[14px] 2xl:text-[15px] 3xl:text-[18px] leading-none font-light text-black placeholder:text-[#1E1E1E] placeholder:uppercase h-[35px] 2xl:h-[45px] bg-white border-0 border-b border-[#CDA278] rounded-[0px] px-[15px] pl-0 focus-visible:ring-1 focus:shadow-none",
);

const errorStyle = cn("text-[#f17423]");

const textareaStyle = cn(
  inputStyle,
  "leading-tight min-h-[60px] 2xl:min-h-[60px] py-[15px] resize-none",
);

export default function ServiceForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      additionalDetails: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (values) => {
    setLoading(true);
    setSuccess(null);

    try {
      const res = await fetch(`${STRAPI_URL}/api/service-enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: values }),
      });

      if (!res.ok) throw new Error("Failed to send enquiry");

      form.reset();
      setSuccess("Message sent successfully!");
    } catch (err) {
      console.error(err);
      setSuccess("Something went wrong. Please try again.");
    }

    setLoading(false);
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
            <FormItem className="w-full sm:w-4/12">
              <FormLabel className={labelStyle}>
                <span className={errorStyle}></span>
              </FormLabel>
              <FormControl>
                <Input {...field} className={inputStyle} placeholder="NAME" />
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
            <FormItem className="w-full sm:w-4/12">
              <FormLabel className={labelStyle}>
                <span className={errorStyle}></span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  className={inputStyle}
                  placeholder="PHONE"
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
            <FormItem className="w-full sm:w-4/12">
              <FormLabel className={labelStyle}>
                <span className={errorStyle}></span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className={inputStyle}
                  placeholder="EMAIL"
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
            <FormItem className="w-full sm:w-9/12 2xl:w-10/12">
              <FormLabel className={labelStyle}> </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className={textareaStyle}
                  placeholder="Message"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="w-full sm:w-3/12 2xl:w-2/12 mt-auto flex flex-end">
          

          <Button
            size="lg"
            type="submit"
            variant="outline"
            disabled={loading}
            className="w-full min-w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </div>

        {/* Success Message */}
        {success && !loading && (
          <p className="text-green-600 mt-1">{success}</p>
        )}
      </form>
    </Form>
  );
}
