import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { Reveal } from "./reveal";
import { projects, type Project } from "../data";
import { writeSession } from "../browser";

function WorkCard({ project }: { project: Project }) {
  return (
    <div className="relative w-full overflow-hidden">
      <Link
        to={project.caseStudy}
        onClick={() => {
          writeSession("homeScrollPos", String(window.scrollY));
          writeSession("returningFromProject", "true");
        }}
        aria-label={`View project ${project.title}`}
        className="group relative block aspect-square w-full overflow-hidden bg-neutral-950 select-none"
      >
        {/* Full bleed image filling the box */}
        {project.cover ? (
          <ImageWithFallback
            src={project.cover}
            alt={project.title}
            className="h-full w-full object-cover"
            width={800}
            height={800}
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full flex-col justify-between bg-neutral-900 p-6 text-white sm:p-8"
          >
            <span className="eyebrow text-neutral-400">{project.category}</span>
            <div>
              <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                Visual pending
              </span>
              <span className="block font-serif text-3xl leading-none tracking-tight sm:text-4xl">
                {project.title}
              </span>
            </div>
          </div>
        )}

        {/* Gradient overlay — hidden by default, revealed on hover */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 opacity-100 transition-opacity duration-300 sm:p-8 md:opacity-0 md:group-hover:opacity-100">
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
    </div>
  );
}

export function Work() {
  return (
    <section id="work" tabIndex={-1} className="w-full py-24 md:py-32">
      {/* Header Row */}
      <div className="mx-auto w-full px-6 md:px-12 mb-12">
        <Reveal as="div" delay={0.1}>
          <h2 className="text-right font-serif text-[clamp(3.5rem,9vw,7.5rem)] leading-none tracking-tight">
            Work.
          </h2>
        </Reveal>
      </div>

      {/* 6 Filled Box Cards Grid (Edge-to-edge perfect squares) */}
      <div className="w-full overflow-hidden border-y border-black/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <WorkCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
