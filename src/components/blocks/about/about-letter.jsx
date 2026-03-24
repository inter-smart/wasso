import CharacterAnimation from "../home/character-animation";

export default function AboutLetter() {
  return (
    <section className="w-full block ">
      {/* border-t border-[#C09C86]/30 */}
      {/* <div
        dir="ltr"
        className="text-[90px] 3xs:text-[100px] sm:text-[240px] lg:text-[260px] xl:text-[300px] 2xl:text-[368px] 3xl:text-[440px] leading-none font-medium text-center text-[#fff3e8]"
      >
        {["W", "A", "S", "S", "O"].map((letter, index) => (
          <motion.span
            key={"letter-" + index}
            className="inline-block cursor-default origin-bottom"
            whileHover={{ scaleY: 1.1 }}
            transition={{
              duration: 0.3,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div> */}

      <CharacterAnimation />
    </section>
  );
}
