import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { SectionMarker } from "./section-marker";
import { Reveal } from "./reveal";
import { projects, type Project } from "../data";
import { EASE } from "../constants";

function WorkCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative w-full overflow-hidden"
    >
      <Link
        to={project.caseStudy}
        aria-label={`View project ${project.title}`}
        className="group relative block aspect-square w-full overflow-hidden bg-neutral-950 select-none"
      >
        {/* Full bleed image filling the box */}
        <ImageWithFallback
          src={project.cover}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          width={800}
          height={600}
        />

        {/* Gradient overlay for high legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25 p-5 sm:p-6 md:p-7 flex flex-col justify-between transition-colors duration-300 group-hover:from-black/95 group-hover:via-black/50">
          {/* Top metadata */}
          <div className="flex items-center justify-between gap-3">
            <span className="eyebrow font-mono text-[11px] tracking-widest text-white/80">
              [ 0{index + 1} ]
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] tracking-widest text-neutral-200 font-sans uppercase border border-white/15 backdrop-blur-md">
              {project.discipline} • {project.category}
            </span>
          </div>

          {/* Bottom title, excerpt, and arrow */}
          <div className="transform transition-transform duration-300 ease-out group-hover:-translate-y-1">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-[28px] text-white leading-tight tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-1 text-xs sm:text-[13px] text-neutral-300 font-sans leading-relaxed">
                  {project.description}
                </p>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </div>

            {/* Tools badges */}
            {project.tools.length > 0 && (
              <div className="mt-3.5 flex flex-wrap gap-1.5 opacity-90 transition-opacity duration-300">
                {project.tools.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="eyebrow rounded-sm border border-white/20 bg-black/30 px-2 py-0.5 text-[9px] text-neutral-300 backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
                {project.tools.length > 3 && (
                  <span className="eyebrow text-[9px] text-neutral-400 self-center pl-1">
                    +{project.tools.length - 3}
                  </span>
                )}
              </div>
            )}
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
            {filteredProjects.map((p, i) => (
              <WorkCard key={p.id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

