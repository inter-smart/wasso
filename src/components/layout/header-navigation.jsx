"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { motion, AnimatePresence } from "motion/react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import Image from "next/image";

const dialogVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

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

export default function HeaderNavigation({
  locale,
  setIsOpen,
  menuItems,
  pathname,
  showDarkHeader,
  headerData,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HAMBURGER BUTTON */}
      <HumbergerButton
        open={open}
        onClick={() => {
          setIsOpen(true);
          setOpen(true);
        }}
        showDarkHeader={showDarkHeader}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <DialogContent
              showCloseButton={false}
              className={cn(
                "max-w-full sm:max-w-full min-h-full max-h-dvw rounded-none bg-black p-0",
              )}
            >
              <motion.div
                variants={dialogVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="h-full w-full"
              >
                <DialogHeader className="sr-only">
                  <DialogTitle>Menu</DialogTitle>
                  <DialogDescription />
                </DialogHeader>

                <div className="h-full overflow-y-auto">
                  <div className="min-h-full flex items-center justify-center py-20">
                    <motion.ul
                      variants={listVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="flex flex-col items-center gap-6 xl:gap-6 2xl:gap-10"
                    >
                      {menuItems?.map((item) => {
                        const isActive = pathname === `/${locale}${item?.slug}`;

                        return (
                          <motion.li
                            key={item?.id}
                            variants={itemVariants}
                            className="relative"
                          >
                            <motion.div
                              initial="initial"
                              whileHover="hover"
                              className={cn(
                                "relative overflow-hidden block h-auto",
                                isActive && "opacity-100!",
                              )}
                            >
                              <Button
                                variant="none"
                                size="none"
                                onClick={() => {
                                  setIsOpen(false);
                                  setOpen(false);
                                }}
                                className={cn(
                                  "text-[36px] sm:text-[48px] xl:text-[54px] 2xl:text-[60px] leading-none font-light tracking-tight uppercase block",
                                  "hover:scale-100",
                                  isActive ? "text-white" : "text-white/60",
                                )}
                                asChild
                              >
                                <Link href={`/${locale}${item?.slug}`}>
                                  <motion.span
                                    variants={{
                                      initial: { y: 0 },
                                      hover: { y: "-100%" },
                                    }}
                                    transition={{
                                      duration: 0.3,
                                      ease: [0.33, 1, 0.68, 1],
                                    }} // Smooth snappy
                                    className="block"
                                  >
                                    {locale === "ar"
                                      ? item?.name_ar
                                      : item?.name}
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
                                    className="absolute inset-0 block text-white"
                                  >
                                    {locale === "ar"
                                      ? item?.name_ar
                                      : item?.name}
                                  </motion.span>
                                </Link>
                              </Button>
                            </motion.div>
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  </div>
                </div>

                <div className="w-full h-(--header-y) flex items-center absolute top-0 left-0 right-0">
                  <div className="container flex justify-between items-center">
                    <div className="w-[60px] 2xl:w-[80px] 3xl:w-[100px]">
                      <Link href={`/${locale}${headerData?.slug}`}>
                        <Image
                          src={headerData?.logoWhiteUrl}
                          alt={headerData?.name}
                          width={110}
                          height={120}
                          className="w-full h-full block object-contain"
                          unoptimized
                        />
                      </Link>
                    </div>

                    <DialogClose asChild>
                      <Button
                        type="button"
                        className={"text-sm text-white hover:scale-105"}
                      >
                        Close
                        <X className="size-4" />
                      </Button>
                    </DialogClose>
                  </div>
                </div>

                <motion.div
                  initial={{ scale: 0.1, opacity: 0.9 }}
                  animate={{ scale: 1.2, opacity: 0.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full origin-top absolute -z-1 top-0 left-0 opacity-10 pointer-events-none"
                >
                  <Image
                    src={headerData?.logoWhiteUrl}
                    alt={headerData?.name}
                    width={110}
                    height={120}
                    className="w-full h-full block object-cover"
                    unoptimized
                  />
                </motion.div>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
}

function HumbergerButton({ open, onClick, showDarkHeader }) {
  return (
    <Button
      variant="none"
      size="none"
      onClick={onClick}
      className="flex flex-col items-end gap-1 2xl:gap-1"
    >
      {[1, 2, 3].map((item) => (
        <span
          key={item}
          className={cn(
            "h-0.5 rounded-full transition-all duration-300 ease-in-out origin-center",
            item === 1 && "w-4.5 2xl:w-5.5",
            item === 2 && "w-4 2xl:w-5",
            item === 3 && "w-4.5 2xl:w-5.5",
            showDarkHeader ? "bg-white" : "bg-white",

            // OPEN STATE
            open && item === 1 && "rotate-45 translate-y-1.5",
            open && item === 2 && "opacity-0 translate-x-2",
            open && item === 3 && "-rotate-45 -translate-y-1.5",
          )}
        />
      ))}
    </Button>
  );
}
