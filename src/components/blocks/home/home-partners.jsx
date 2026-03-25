"use client";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/typography";

import parse from "html-react-parser";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import ScrollReveal from "@/components/animations/scroll-reveal";
import CharacterAnimation from "./character-animation";

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.25 },
  },
};

const hoverVariants = {
  initial: { y: 0, opacity: 0.4 },
  hover: {
    y: -6,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export default function HomePartners({ data, locale }) {
  const [visibleIndices, setVisibleIndices] = useState([]);

  const allItems = data?.items || [];

  // Initialize with random 10 items
  useEffect(() => {
    if (allItems.length > 0) {
      setVisibleIndices(getRandomIndices(allItems.length, 10));
    }
  }, [allItems.length]);

  // Helper function to get random unique indices
  const getRandomIndices = (totalItems, count) => {
    const indices = Array.from({ length: totalItems }, (_, i) => i);
    const shuffled = indices.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, totalItems));
  };

  // Rotate logos: replace random items with new ones
  useEffect(() => {
    if (allItems.length <= 10) return; // No rotation needed if 10 or fewer items

    const interval = setInterval(() => {
      setVisibleIndices((prevIndices) => {
        // Get indices not currently visible
        const hiddenIndices = Array.from(
          { length: allItems.length },
          (_, i) => i,
        ).filter((i) => !prevIndices.includes(i));

        if (hiddenIndices.length === 0) return prevIndices;

        // Replace 3-5 random items
        const itemsToReplace = Math.min(
          Math.floor(Math.random() * 3) + 3, // Random between 3-5
          hiddenIndices.length,
        );

        const newIndices = [...prevIndices];

        // Randomly select positions to replace
        const positionsToReplace = Array.from({ length: 10 }, (_, i) => i)
          .sort(() => Math.random() - 0.5)
          .slice(0, itemsToReplace);

        // Replace with random hidden items
        const shuffledHidden = hiddenIndices.sort(() => Math.random() - 0.5);

        positionsToReplace.forEach((pos, i) => {
          if (shuffledHidden[i] !== undefined) {
            newIndices[pos] = shuffledHidden[i];
          }
        });

        return newIndices;
      });
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, [allItems.length]);

  // Get current 10 items to display
  const currentItems = visibleIndices.map((index) => ({
    ...allItems[index],
    uniqueKey: `${index}-${Date.now()}`,
  }));

  return (
    <section className="w-full h-auto bg-white block pt-[30px] sm:pt-[40px] xl:pt-[70px] 2xl:pt-[90px] overflow-hidden relative z-0">
      <div
        className={cn(
          "w-full sm:max-w-[calc(var(--container-sm)/2+50%)] md:max-w-[calc(var(--container-md)/2+50%)] lg:max-w-[calc(var(--container-lg)/2+50%)] xl:max-w-[calc(var(--container-xl)/2+50%)] 2xl:max-w-[calc(var(--container-2xl)/2+50%)] 3xl:max-w-[calc(var(--container-3xl)/2+50%)]",
          locale === "ar"
            ? "pr-4 mr-auto [mask-image:linear-gradient(to_left,black_0%,black_90%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_left,black_0%,black_95%,transparent_100%)]"
            : "pl-4 ml-auto [mask-image:linear-gradient(to_right,black_0%,black_90%,transparent_100%)] max-sm:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_95%,transparent_100%)]",
        )}
      >
        <div className="flex flex-wrap items-center -mx-1 [&>*]:p-1">
          <div className="w-full sm:w-4/12">
            <ScrollReveal delay={0.1}>
              <Heading
                as="div"
                size="h6"
                className="tracking-widest font-normal text-[#1e1e1e] flex items-center gap-x-4 mb-1 xl:mb-1.5 2xl:mb-1.5"
              >
                <span className="size-2 rounded-full bg-[#c09c86] inline-block" />
                {parse(locale == "ar" ? data?.sub_title_ar : data?.sub_title)}
              </Heading>
            </ScrollReveal>
            <Heading as="h2" size="h3" className="font-normal text-[#1e1e1e]">
              {parse(locale == "ar" ? data?.title_ar : data?.title)}
            </Heading>
          </div>

          <div className="w-full sm:w-8/12">
            <div
              variants={listVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-4 sm:grid-cols-5 grid-rows-2 gap-[1px] relative overflow-hidden"
            >
              <div className="w-full sm:w-8/10 h-full sm:h-8/10 bg-black opacity-[0%] sm:opacity-10 m-auto blur-md absolute -z-1 inset-0" />
              {currentItems.map((item, index) => (
                <div
                  key={`slot-${index}`}
                  className={cn(
                    "w-full h-full aspect-[16/11] relative bg-white select-none",
                  )}
                >
                  {item && (
                    <motion.div
                      key={`item-${visibleIndices[index]}`}
                      initial={{ opacity: 0, scale: 0.7, rotateY: -90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.7, rotateY: 90 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="absolute inset-0 p-2 sm:p-3 xl:p-5 2xl:p-8 overflow-hidden"
                    >
                      <div variants={itemVariants} className="w-full h-full">
                        <motion.div
                          initial="initial"
                          whileHover="hover"
                          className={cn(
                            "w-full h-full overflow-hidden relative",
                          )}
                        >
                          <motion.span
                            variants={{
                              initial: { y: 0 },
                              hover: { y: "-100%" },
                            }}
                            transition={{
                              duration: 0.3,
                              ease: [0.33, 1, 0.68, 1],
                            }}
                            className="w-full h-full"
                          >
                            <Image
                              src={item?.media?.path}
                              alt={
                                locale == "ar"
                                  ? item?.media?.alt_ar
                                  : item?.media?.alt
                              }
                              width={125}
                              height={60}
                              className="w-full h-full object-contain transition-all duration-500"
                              title={item?.name}
                            />
                          </motion.span>
                          <motion.span
                            variants={{
                              initial: { y: "100%" },
                              hover: { y: 0 },
                            }}
                            transition={{
                              duration: 0.3,
                              ease: [0.33, 1, 0.68, 1],
                            }}
                            className="absolute inset-0 block"
                          >
                            <Image
                              src={item?.media?.path}
                              alt={
                                locale == "ar"
                                  ? item?.media?.alt_ar
                                  : item?.media?.alt
                              }
                              width={125}
                              height={60}
                              className="w-full h-full object-contain transition-all duration-500"
                              title={item?.name}
                            />
                          </motion.span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CharacterAnimation locale={locale} />
    </section>
  );
}
