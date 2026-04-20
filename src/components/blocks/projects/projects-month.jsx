"use client";
import { useRef } from "react";
import Image from "next/image";
import { Heading, Text } from "@/components/utils/typography";
import ScrollReveal from "@/components/animations/scroll-reveal";
import { motion, useScroll, useTransform } from "motion/react";

import parse from "html-react-parser";

export default function ProjectsMonth({ data, locale }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section className="w-full h-auto block py-7.5 sm:py-10 xl:py-[70px_110px] 2xl:py-[90px_130px] overflow-hidden">
      <div className="container">
        <div className="w-full max-w-[668px] xl:max-w-[700px] 2xl:max-w-[840px] mx-auto mb-5 xl:mb-10 2xl:mb-18">
          <ScrollReveal delay={0.1}>
            <Heading
              as="h2"
              size="h2"
              className="font-normal text-center text-[#1e1e1e] mb-1"
            >
              {parse(locale == "ar" ? data?.title_ar || "" : data?.title || "")}
            </Heading>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Text as="div" size="p1" className="text-center text-[#1e1e1e]">
              {parse(locale == "ar" ? data?.description_ar || "" : data?.description || "")}
            </Text>
          </ScrollReveal>
        </div>
        <motion.div
          ref={ref}
          style={{ scale, opacity }}
          className="w-full aspect-172/74 overflow-hidden relative z-0 origin-center"
        >
          <picture className="absolute -z-1 inset-0 block w-full h-full">
            <source
              media="(max-width: 640px)"
              srcSet={data?.media?.mobile_path}
            />
            <Image
              src={data?.media?.desktop_path}
              alt={data?.media?.media_alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
              className="-z-1 object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
            />
          </picture>
        </motion.div>
      </div>
    </section>
  );
}
