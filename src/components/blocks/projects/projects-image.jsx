
import ScrollReveal from "@/components/animations/scroll-reveal";
import Image from "next/image";

export default function ProjectsImage({ data, locale }) {
  return (
    <section className="w-full h-auto block">
      <ScrollReveal delay={0.1}>
        <div className="w-full aspect-192/74 overflow-hidden relative z-0">
          <picture className="absolute -z-1 inset-0">
            <source
              media="(max-width: 640px)"
              srcSet={data?.media?.mobile_path}
            />
            <Image
              src={data?.media?.desktop_path}
              alt={data?.media?.media_alt || "Project"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
              className="-z-1 object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
            />
          </picture>
        </div>
      </ScrollReveal>
    </section>
  );
}
