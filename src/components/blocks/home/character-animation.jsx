"use client";
import { motion, useSpring } from "motion/react";
import { useRef, useCallback } from "react";

const LETTERS = ["W", "A", "S", "S", "O"];
const MAX_SCALE = 1.25;
const SPREAD = 180;

export default function CharacterAnimation() {
  const refs = useRef([]);

  const s0 = useSpring(1, { stiffness: 280, damping: 22, mass: 0.6 });
  const s1 = useSpring(1, { stiffness: 280, damping: 22, mass: 0.6 });
  const s2 = useSpring(1, { stiffness: 280, damping: 22, mass: 0.6 });
  const s3 = useSpring(1, { stiffness: 280, damping: 22, mass: 0.6 });
  const s4 = useSpring(1, { stiffness: 280, damping: 22, mass: 0.6 });

  const springs = [s0, s1, s2, s3, s4];

  const onMouseMove = useCallback(
    (e) => {
      refs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
        const ratio = Math.max(0, 1 - dist / SPREAD);
        const eased = ratio * ratio * (3 - 2 * ratio);
        springs[i].set(1 + (MAX_SCALE - 1) * eased);
      });
    },
    [s0, s1, s2, s3, s4],
  );

  const onMouseLeave = useCallback(() => {
    springs.forEach((s) => s.set(1));
  }, [s0, s1, s2, s3, s4]);

  return (
    <div
      className="text-[90px] 3xs:text-[100px] sm:text-[240px] xl:text-[300px] 2xl:text-[368px] 3xl:text-[440px] leading-none font-medium text-center text-[#c09c86]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {LETTERS.map((letter, index) => (
        <motion.span
          key={"letter-" + index}
          ref={(el) => (refs.current[index] = el)}
          className="inline-block cursor-default origin-bottom"
          style={{ scaleY: springs[index] }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}
