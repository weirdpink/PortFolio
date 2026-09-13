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
  const isReturning =
    typeof window !== "undefined" &&
    sessionStorage.getItem("returningFromProject") === "true";

  return (
    <section
      id="top"
      className="mx-auto w-full px-6 min-h-screen flex flex-col justify-center py-20 md:px-12"
    >
      <motion.div
        variants={container}
        initial={isReturning ? "show" : "hidden"}
        animate="show"
        className="flex flex-col items-center text-center max-w-6xl mx-auto"
      >
        <h1 className="font-sans font-black text-[clamp(2.75rem,8.8vw,9.5rem)] leading-[0.95] tracking-[-0.04em] text-center uppercase text-neutral-950 dark:text-neutral-100 flex items-center justify-center select-none">
          <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span
              variants={line}
              className="inline-flex items-center justify-center flex-wrap"
            >
              <span>ARMAAN</span>
              <span
                className="inline-flex items-center justify-center mx-[0.18em] transition-transform duration-500 ease-out hover:scale-110 hover:rotate-180 cursor-pointer"
                title="Armaan Verma"
              >
                <svg
                  viewBox="0 0 50 100"
                  className="h-[0.74em] w-[0.37em] fill-[#D93D87]"
                  aria-hidden="true"
                >
                  <path d="M 0 0 A 50 50 0 0 1 0 100 Z" />
                </svg>
              </span>
              <span>VERMA</span>
            </motion.span>
          </span>
        </h1>

        <motion.div
          variants={fade}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12 font-sans text-[10px] md:text-xs tracking-[0.15em] text-neutral-500 dark:text-neutral-400 uppercase"
        >
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
