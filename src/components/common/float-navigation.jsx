import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function FloatNavigation({ data = [], locale }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  // 🔥 Auto detect link type
  const generateHref = (value) => {
    if (!value) return "#";

    const trimmed = value.trim();

    // Already full URL
    if (trimmed.startsWith("http")) return trimmed;

    // Email detection
    if (/\S+@\S+\.\S+/.test(trimmed)) {
      return `mailto:${trimmed}`;
    }

    // Phone detection (+ or numbers only)
    if (/^\+?\d+$/.test(trimmed)) {
      return `tel:${trimmed}`;
    }

    return trimmed;
  };

  return (
    <div
      className={cn(
        "fixed z-1 bottom-0 sm:bottom-6 xl:bottom-6 flex flex-row sm:flex-col sm:gap-1.5 xl:gap-1 2xl:gap-1.5 3xl:gap-2 max-sm:w-full",
        locale === "ar"
          ? "left-0 sm:left-4 xl:left-5.5 2xl:left-8"
          : "right-0 sm:right-4 xl:right-5.5 2xl:right-8",
      )}
    >
      {data.map((item, index) => {
        const href = generateHref(item.link);

        return (
          <a
            key={item.id ?? index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "w-1/3 sm:w-8 xl:w-9 2xl:w-11 3xl:w-11.5 max-sm:h-11 sm:aspect-square bg-[#1e1e1e] flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#c09c86] translate-y-0 hover:translate-y-[1px] shadow-lg shadow-black/20",
            )}
          >
            {item.icon?.media_path && (
              <Image
                src={item.icon.media_path}
                alt={item.icon.media_alt || "contact icon"}
                width={50}
                height={50}
                className="w-4.5 sm:w-4 xl:w-5 2xl:w-5.5 3xl:w-6"
              />
            )}
          </a>
        );
      })}
    </div>
  );
}
