import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ImageWithFallback } from "./ImageWithFallback";
import { SectionMarker } from "./section-marker";
import { Reveal } from "./reveal";
import { projects, type Project } from "../data";
import { EASE } from "../constants";

function ProjectMeta({ project, index }: { project: Project; index: number }) {
  return (
    <div className="mb-12">
      <div className="eyebrow mb-4 flex items-center gap-3">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-6 bg-black/20 dark:bg-white/25" />
        <span>{project.category}</span>
      </div>
      <h3 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.02] tracking-tight">
        {project.title}
      </h3>
      <p className="mt-5 max-w-4xl text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
        {project.description}
      </p>

      {project.tools.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tools.map((t) => (
            <motion.span
              key={t}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="eyebrow cursor-default border border-black/15 px-3 py-1.5 dark:border-white/20"
            >
              {t}
            </motion.span>
          ))}
        </div>
      )}

      {(project.link || project.caseStudy) && (
        <div className="mt-7 flex items-center gap-6">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group eyebrow flex items-center gap-1.5 text-black dark:text-white"
            >
              <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:w-full">
                Visit
              </span>
              <span className="inline-block transition-transform duration-300 group-hover:rotate-45">
                ↗
              </span>
            </a>
          )}
          {project.caseStudy && (
            <Link
              to={project.caseStudy}
              className="group eyebrow flex items-center gap-1.5 text-black dark:text-white"
            >
              <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:w-full">
                Case study
              </span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function Placeholder({ className }: { className?: string }) {
  return <div className={`bg-neutral-200 dark:bg-neutral-800 ${className ?? ""}`} />;
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  if (project.category === "Website") {
    return (
      <motion.article
        className="border-t border-black/10 py-14 dark:border-white/10 md:py-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <ProjectMeta project={project} index={index} />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="grid grid-rows-2 gap-4 md:col-span-2">
            {project.gallery?.[0] ? (
              <div className="group overflow-hidden bg-neutral-100 dark:bg-neutral-900 aspect-video w-full">
                <ImageWithFallback src={project.gallery[0]} alt={`${project.title} screenshot`} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" width={640} height={360} />
              </div>
            ) : (
              <Placeholder className="aspect-video w-full" />
            )}
            {project.gallery?.[1] ? (
              <div className="group overflow-hidden bg-neutral-100 dark:bg-neutral-900 aspect-video w-full">
                <ImageWithFallback src={project.gallery[1]} alt={`${project.title} screenshot`} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" width={640} height={360} />
              </div>
            ) : (
              <Placeholder className="aspect-video w-full" />
            )}
          </div>
          {project.gallery?.[2] || project.cover ? (
            <div className="group overflow-hidden bg-neutral-100 dark:bg-neutral-900 w-full h-full min-h-[300px] md:col-span-3">
              <ImageWithFallback src={project.gallery?.[2] || project.cover!} alt={`${project.title} screenshot`} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" width={960} height={540} />
            </div>
          ) : (
            <Placeholder className="w-full h-full min-h-[300px] md:col-span-3" />
          )}
        </div>
      </motion.article>
    );
  }

  if (project.category === "Brand Identity") {
    return (
      <motion.article
        className="border-t border-black/10 py-14 dark:border-white/10 md:py-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <ProjectMeta project={project} index={index} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.gallery?.[0] || project.cover ? (
            <div className="group overflow-hidden bg-neutral-100 dark:bg-neutral-900 aspect-square w-full">
              <ImageWithFallback src={project.gallery?.[0] || project.cover!} alt={`${project.title} — image 1`} className="w-full h-full object-cover transition-all duration-700" width={600} height={600} />
            </div>
          ) : (
            <Placeholder className="aspect-square w-full" />
          )}
          <div className="grid grid-rows-2 gap-4">
            {project.gallery?.[1] ? (
              <div className="group overflow-hidden bg-neutral-100 dark:bg-neutral-900 w-full h-full min-h-[150px]">
                <ImageWithFallback src={project.gallery[1]} alt={`${project.title} — image 2`} className="w-full h-full object-cover transition-all duration-700" width={600} height={300} />
              </div>
            ) : (
              <Placeholder className="w-full h-full" />
            )}
            {project.gallery?.[2] ? (
              <div className="group overflow-hidden bg-neutral-100 dark:bg-neutral-900 w-full h-full min-h-[150px]">
                <ImageWithFallback src={project.gallery[2]} alt={`${project.title} — image 3`} className="w-full h-full object-cover transition-all duration-700" width={600} height={300} />
              </div>
            ) : (
              <Placeholder className="w-full h-full" />
            )}
          </div>
        </div>
      </motion.article>
    );
  }

  const flip = index % 2 === 1;
  return (
    <motion.article
      className="grid items-center gap-8 border-t border-black/10 py-14 dark:border-white/10 md:grid-cols-12 md:gap-12 md:py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div
        className={project.cover ? `md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : "md:order-1"}` : "md:col-span-12 order-2 w-[calc(100%+3rem)] -ml-6 md:w-[calc(100%+6rem)] md:-ml-12"}
      >
        {project.category === "Logo" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
            {[...Array(6)].map((_, i) => (
              project.gallery?.[i] ? (
                <div key={`${project.id}-logo-${i}`} className="group overflow-hidden bg-neutral-100 dark:bg-neutral-900 aspect-square w-full">
                  <ImageWithFallback src={project.gallery[i]} alt={`${project.title} logo ${i + 1}`} className="w-full h-full object-cover transition-all duration-700" width={300} height={300} />
                </div>
              ) : (
                <div key={`${project.id}-logo-${i}`} className="bg-neutral-200 dark:bg-neutral-800 aspect-square w-full" />
              )
            ))}
          </div>
        ) : (
          <>
            {project.cover && (
              <div className="group relative overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <ImageWithFallback
                  src={project.cover}
                  alt={project.title}
                  className="aspect-[4/3] w-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
                  width={800}
                  height={600}
                />
              </div>
            )}
            {project.gallery && project.gallery.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
                {project.gallery.map((g, i) => (
                  <motion.div 
                    key={`${project.id}-gallery-${i}`}
                    className="group overflow-hidden bg-neutral-100 dark:bg-neutral-900"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                  >
                    <ImageWithFallback
                      src={g}
                      alt={`${project.title} — image ${i + 2}`}
                      className={project.cover 
                        ? "aspect-square w-full object-cover transition-all duration-700 group-hover:scale-105" 
                        : "w-full h-auto transition-all duration-700 group-hover:scale-105"}
                      width={400}
                      height={400}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div
        className={project.cover ? `md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-9"}` : "md:col-span-12 order-1 mb-4"}
      >
        <div className="eyebrow mb-4 flex items-center gap-3">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-6 bg-black/20 dark:bg-white/25" />
          <span>{project.category}</span>
        </div>
        <h3 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.02] tracking-tight">
          {project.title}
        </h3>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
          {project.description}
        </p>

        {project.tools.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <motion.span
                key={t}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="eyebrow cursor-default border border-black/15 px-3 py-1.5 dark:border-white/20"
              >
                {t}
              </motion.span>
            ))}
          </div>
        )}

        {(project.link || project.caseStudy) && (
          <div className="mt-7 flex items-center gap-6">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group eyebrow flex items-center gap-1.5 text-black dark:text-white"
              >
                <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:w-full">
                  Visit
                </span>
                <span className="inline-block transition-transform duration-300 group-hover:rotate-45">
                  ↗
                </span>
              </a>
            )}
            {project.caseStudy && (
              <Link
                to={project.caseStudy}
                className="group eyebrow flex items-center gap-1.5 text-black dark:text-white"
              >
                <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:w-full">
                  Case study
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function Work() {
  const [filter, setFilter] = useState<"Design" | "Engineering">("Design");

  const filteredProjects = projects.filter(p => {
    if (filter === "Design") return ["Poster", "Logo", "Brand Identity"].includes(p.category);
    if (filter === "Engineering") return ["Website"].includes(p.category);
    return true;
  });

  return (
    <section id="work" className="mx-auto w-full px-6 py-24 md:px-12 md:py-32">
      <div className="mb-12 flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <Reveal className="max-w-sm">
          <SectionMarker index="02" label="Work" />
          <p className="mt-6 text-[15px] leading-relaxed text-neutral-500">
            Websites, posters, logos, and comprehensive brand identity systems. I craft visual experiences that tell stories and solve problems.
          </p>
        </Reveal>

        <div className="flex flex-col items-start gap-8 md:items-end">
          <Reveal as="span" delay={0.1}>
            <h2 className="font-serif text-[clamp(3.5rem,9vw,7.5rem)] leading-none tracking-tight">
              Work.
            </h2>
          </Reveal>

          <Reveal as="div" delay={0.2} className="flex items-center gap-1 rounded-full border border-black/10 p-1.5 dark:border-white/10">
            {(["Design", "Engineering"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`relative rounded-full px-6 py-2 text-sm font-medium transition-colors ${filter === tab ? "text-white dark:text-black" : "text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"}`}
              >
                {filter === tab && (
                  <motion.div
                    layoutId="work-tab"
                    className="absolute inset-0 rounded-full bg-black dark:bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="flex flex-col">
        {filteredProjects.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
