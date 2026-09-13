import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { SectionMarker } from "./section-marker";
import { Reveal } from "./reveal";
import { projects, type Project } from "../data";
import { EASE } from "../constants";

function WorkCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="relative w-full overflow-hidden"
    >
      <Link
        to={project.caseStudy}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }}
        aria-label={`View project ${project.title}`}
        className="group relative block aspect-square w-full overflow-hidden bg-neutral-950 select-none"
      >
        {/* Full bleed image filling the box */}
        <ImageWithFallback
          src={project.cover}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          width={800}
          height={800}
        />

        {/* Minimal gradient overlay with title and category only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 sm:p-8 flex flex-col justify-end transition-colors duration-300 group-hover:from-black/90">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow block mb-2 text-[11px] tracking-[0.2em] text-neutral-300 uppercase font-sans">
                {project.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] text-white leading-none tracking-tight">
                {project.title}
              </h3>
            </div>

            <span className="text-white/60 transition-all duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight size={22} strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function Work() {
  const [filter, setFilter] = useState<"All" | "Design" | "Engineering">("All");

  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    return p.discipline === filter;
  });

  return (
    <section id="work" className="w-full py-24 md:py-32">
      {/* Header Row */}
      <div className="mx-auto w-full px-6 md:px-12 mb-12 flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <Reveal className="max-w-sm">
          <SectionMarker index="02" label="Work" />
          <p className="mt-6 text-[15px] leading-relaxed text-neutral-500">
            A curated showcase of 6 projects spanning editorial design systems and full-stack software engineering. Click any card to view the complete case study.
          </p>
        </Reveal>

        <div className="flex flex-col items-start gap-8 md:items-end">
          <Reveal as="span" delay={0.1}>
            <h2 className="font-serif text-[clamp(3.5rem,9vw,7.5rem)] leading-none tracking-tight">
              Work.
            </h2>
          </Reveal>

          {/* Filter Pills */}
          <Reveal as="div" delay={0.2} className="flex items-center gap-1 rounded-full border border-black/10 p-1.5 dark:border-white/10">
            {(["All", "Design", "Engineering"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  filter === tab
                    ? "text-white dark:text-black"
                    : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                {filter === tab && (
                  <motion.div
                    layoutId="work-tab"
                    className="absolute inset-0 rounded-full bg-black dark:bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {tab} {tab === "All" ? "(6)" : "(3)"}
                </span>
              </button>
            ))}
          </Reveal>
        </div>
      </div>

      {/* 6 Filled Box Cards Grid (Edge-to-edge perfect squares) */}
      <div className="w-full overflow-hidden border-y border-black/10 dark:border-white/10 bg-black/10 dark:bg-white/10">
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <WorkCard key={p.id} project={p} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

