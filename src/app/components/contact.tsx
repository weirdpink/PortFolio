import { ArrowRight, ArrowUpRight, Github, Linkedin, Figma, Instagram } from "lucide-react";
import { SectionMarker } from "./section-marker";
import { Reveal } from "./reveal";
import { motion } from "motion/react";
import { contactLinks } from "../data";
import { EASE } from "../constants";

const email = contactLinks.find((c) => c.label === "Email");

const rowContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const rowItem = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

function XIcon({ size = 17, className = "" }: { size?: number | string; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const IconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Figma: Figma,
  Instagram: Instagram,
  X: XIcon,
};

export function Contact() {
  return (
    <section id="contact" className="bg-white dark:bg-neutral-950 scroll-mt-20 md:scroll-mt-24">
      <div className="mx-auto w-full px-6 pt-12 pb-24 md:px-12 md:pt-16 md:pb-32">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <SectionMarker index="04" label="Contact" />
        </Reveal>

        <Reveal delay={0.05} y={40}>
          <h2 className="mt-10 md:mt-12 font-serif text-[clamp(4rem,12vw,11rem)] leading-[1.02] tracking-tight">
            <a href={email?.href || "mailto:worksarmaan@gmail.com"} aria-label="Send an email to Armaan" className="inline-block">
              <span className="contact-underline inline-block">
                Let&apos;s make
              </span>{" "}
              <span className="italic-serif text-neutral-500">something</span>
              <br className="hidden md:block" />
              <span className="group inline-block">
                <span className="contact-underline inline-block">
                  worth reading.
                </span>
                <ArrowRight
                  size="0.45em"
                  strokeWidth={1.5}
                  className="inline-block ml-[0.15em] -rotate-45 text-neutral-500 transition-transform duration-300 group-hover:rotate-0"
                />
              </span>
            </a>
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col md:mt-16">
          <Reveal className="flex flex-col items-start">
            <div className="mb-6 inline-flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="eyebrow">Available for new work</span>
            </div>
            <p className="max-w-2xl font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.2] tracking-tight">
              Designing and building digital products where engineering and craft meet.
            </p>
            {email && (
              <a
                href={email.href}
                aria-label={`Send an email to ${email.value}`}
                className="group mt-8 inline-flex items-center gap-2 pb-1 text-[15px] text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
              >
                <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:w-full">
                  {email.value}
                </span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />
              </a>
            )}
          </Reveal>

          <motion.ul
            className="mt-12 flex flex-wrap justify-start gap-4 pb-12 md:pb-16"
            variants={rowContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {contactLinks.filter(c => c.label !== "Email").filter(c => c.href !== "#").map((c) => {
              const external = !c.href.startsWith("mailto:");
              const Icon = IconMap[c.label as keyof typeof IconMap];
              return (
                <motion.li key={c.label} variants={rowItem}>
                  <a
                    href={c.href}
                    aria-label={c.label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-black/15 text-black transition-all hover:bg-black hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black"
                  >
                    {Icon && <Icon size={20} />}
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
