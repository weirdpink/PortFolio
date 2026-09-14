import { motion, useReducedMotion } from "motion/react";
import { EASE } from "../constants";
import { MusicPlayer } from "./music-player";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const line = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const isReturning =
    typeof window !== "undefined" &&
    sessionStorage.getItem("returningFromProject") === "true";

  return (
    <section
      id="top"
      className="relative mx-auto mt-10 flex min-h-[100dvh] w-full flex-col justify-center px-6 py-20 pb-28 md:mt-12 md:h-[100dvh] md:min-h-0 md:px-12 md:pb-32"
    >
      <motion.div
        variants={container}
        initial={isReturning ? "show" : "hidden"}
        animate="show"
        className="flex w-full max-w-6xl flex-col items-start text-left"
      >
        <h1 className="font-serif text-[clamp(3.5rem,11.5vw,11.5rem)] leading-[0.95] tracking-[-0.02em]">
          <span className="block overflow-visible pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              Ideas become
            </motion.span>
          </span>
          <span className="block overflow-visible pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              experiences when
            </motion.span>
          </span>
          <span className="block overflow-visible pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              <span className="italic-serif">Armaan</span> creates
            </motion.span>
          </span>
          <span className="block overflow-visible pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              with precision &amp; <span className="italic-serif">magic.</span>
            </motion.span>
          </span>
        </h1>
      </motion.div>

      <motion.figure
        layoutId="hero-image"
        className="relative mt-12 aspect-[4/3] w-full max-w-xl overflow-hidden bg-neutral-100 md:absolute md:bottom-32 md:right-12 md:mt-0 md:w-[35%] md:max-w-none"
        transition={{
          layout: {
            duration: reduceMotion ? 0 : 1.1,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
      >
        <img
          src="/image.webp"
          alt="Black-and-white mountain landscape"
          width={2400}
          height={1600}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-[50%_48%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/[0.03]" />
      </motion.figure>

      <MusicPlayer />
    </section>
  );
}
