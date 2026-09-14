import { motion } from "motion/react";
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
  const isReturning =
    typeof window !== "undefined" &&
    sessionStorage.getItem("returningFromProject") === "true";

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100dvh] w-full flex-col justify-center px-6 py-20 pb-28 md:px-12 md:pb-32"
    >
      <motion.div
        variants={container}
        initial={isReturning ? "show" : "hidden"}
        animate="show"
        className="flex flex-col items-start text-left max-w-6xl w-full"
      >
        <h1 className="font-serif text-[clamp(3.5rem,11.5vw,11.5rem)] leading-[0.95] tracking-[-0.02em]">
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              Ideas become
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              experiences when
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              <span className="italic-serif">Armaan</span> creates
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              with precision &amp; <span className="italic-serif">magic.</span>
            </motion.span>
          </span>
        </h1>
      </motion.div>

      <MusicPlayer />
    </section>
  );
}
