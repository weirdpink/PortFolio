import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "../constants";
import { resumeUrl } from "../data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const line = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto w-full px-6 min-h-screen flex flex-col justify-center py-20 md:px-12"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center text-center max-w-6xl mx-auto"
      >
        <h1 className="font-serif text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[0.95] tracking-[-0.02em] text-center">
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              engineering by <span className="italic-serif text-[#D93D87]">logic</span>,
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span variants={line} className="block">
              designing by <span className="italic-serif">instinct</span>.
            </motion.span>
          </span>
        </h1>

        <motion.div
          variants={fade}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12 font-sans text-[10px] md:text-xs tracking-[0.15em] text-neutral-500 dark:text-neutral-400 uppercase"
        >
          <a
            href="#work"
            className="group border-b border-black/20 pb-1 transition-colors hover:border-black hover:text-black dark:border-white/20 dark:hover:border-white dark:hover:text-white"
          >
            VIEW WORK
          </a>
          <a
            href="#about"
            className="group border-b border-black/20 pb-1 transition-colors hover:border-black hover:text-black dark:border-white/20 dark:hover:border-white dark:hover:text-white"
          >
            ABOUT ME
          </a>
          <a
            href="#contact"
            className="group border-b border-black/20 pb-1 transition-colors hover:border-black hover:text-black dark:border-white/20 dark:hover:border-white dark:hover:text-white"
          >
            GET IN TOUCH
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 border-b border-black/20 pb-1 transition-colors hover:border-black hover:text-black dark:border-white/20 dark:hover:border-white dark:hover:text-white"
          >
            <span>RÉSUMÉ</span>
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
