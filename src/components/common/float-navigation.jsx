import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const local_data = [
  {
    id: 1,
    icon: "/images/float-icon-call.svg",
    link: "tel:+966501234567",
  },
  {
    id: 2,
    icon: "/images/float-icon-mail.svg",
    link: "mailto:[EMAIL_ADDRESS]",
  },
  {
    id: 3,
    icon: "/images/float-icon-whatsapp.svg",
    link: "https://wa.me/966501234567",
  },
];

export default function FloatNavigation({ data = local_data, locale }) {
  return (
    <div
      className={cn(
        "fixed z-1 bottom-0 sm:bottom-6 xl:bottom-6 flex flex-row sm:flex-col sm:gap-1.5 xl:gap-1 2xl:gap-1.5 3xl:gap-2 max-sm:w-full",
        locale === "ar"
          ? "left-0 sm:left-4 xl:left-5.5 2xl:left-8"
          : "right-0 sm:right-4 xl:right-5.5 2xl:right-8",
      )}
    >
      {data.map((item) => (
        <a
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-1/3 sm:w-8 xl:w-9 2xl:w-11 3xl:w-11.5 max-sm:h-11 sm:aspect-square bg-[#1e1e1e] flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#c09c86] translate-y-0 hover:translate-y-[1px] shadow-lg shadow-black/20",
          )}
        >
          <Image
            src={item.icon}
            alt={item.icon}
            width={50}
            height={50}
            className="w-4.5 sm:w-4 xl:w-5 2xl:w-5.5 3xl:w-6"
          />
        </a>
      ))}
    </div>
  );
}
