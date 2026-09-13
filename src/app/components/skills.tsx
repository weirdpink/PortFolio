import { motion } from "motion/react";
import { SectionMarker } from "./section-marker";
import { Reveal } from "./reveal";
import { skillGroups } from "../data";
import { EASE } from "../constants";

const rowContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const rowItem = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function SkillRow({
  index,
  title,
  items,
  delay = 0,
}: {
  index: string;
  title: string;
  items: string[];
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="grid grid-cols-1 gap-6 border-t border-black/10 py-10 dark:border-white/10 md:grid-cols-12 md:items-baseline md:gap-8 md:py-14">
        <div className="md:col-span-3">
          <div className="eyebrow flex items-center gap-3">
            <span>{index}</span>
            <span className="h-px w-6 bg-black/20 dark:bg-white/25" />
            <span>{title}</span>
          </div>
        </div>

        <motion.div
          className="flex flex-wrap items-baseline gap-x-3 gap-y-2 md:col-span-9"
          variants={rowContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {items.map((item, i) => (
            <motion.span key={item} variants={rowItem} className="inline-flex items-baseline">
              <span
                data-cursor="hover"
                className="text-[clamp(1.6rem,3.5vw,2.75rem)] font-serif tracking-tight text-neutral-950 transition-colors duration-300 hover:text-neutral-400 dark:text-neutral-100 dark:hover:text-neutral-500"
              >
                {item}
              </span>
              {i < items.length - 1 && (
                <span className="ml-3 select-none text-[clamp(1rem,2vw,1.5rem)] text-neutral-300 dark:text-neutral-700">
                  /
                </span>
              )}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </Reveal>
  );
}

export function Skills() {
  const [technical, design, environment] = skillGroups;

  return (
    <section id="skills" className="bg-white dark:bg-neutral-950">
      <div className="mx-auto w-full px-6 py-24 md:px-12 md:py-32">
        <div className="mb-12 flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <Reveal className="max-w-sm">
            <SectionMarker index="03" label="Skills" />
            <p className="mt-6 text-[15px] leading-relaxed text-neutral-500">
              Languages, creative tools, and environments I use daily to write code and craft interfaces.
              Each one earns its place through real-world use.
            </p>
          </Reveal>

          <div className="flex items-center gap-6">
            <Reveal as="span" delay={0.1}>
              <h2 className="font-serif text-[clamp(3.5rem,9vw,7.5rem)] leading-none tracking-tight">
                Skills.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-8">
          <SkillRow
            index="01"
            title={technical.title}
            items={technical.items}
          />
          <SkillRow
            index="02"
            title={design.title}
            items={design.items}
            delay={0.05}
          />
          <SkillRow
            index="03"
            title={environment.title}
            items={environment.items}
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
}
