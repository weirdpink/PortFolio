import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { projects, type Project } from "../data";
import { writeSession } from "../browser";

function WorkCard({ project }: { project: Project }) {
  return (
    <div className="relative w-full overflow-hidden border-b border-black/10 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <Link
        to={project.caseStudy}
        onClick={() => {
          writeSession("homeScrollPos", String(window.scrollY));
          writeSession("returningFromProject", "true");
        }}
        aria-label={`View project ${project.title}`}
        className="group relative block min-h-[280px] w-full bg-neutral-950 p-6 text-white transition-colors duration-300 hover:bg-neutral-900 sm:p-8"
      >
        <div className="flex h-full min-h-[240px] flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <span className="eyebrow text-[11px] uppercase tracking-[0.2em] text-neutral-400">
              {project.category}
            </span>

            <span className="text-neutral-500 transition-all duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </span>
          </div>

          <div>
            <h3 className="font-serif text-3xl leading-none tracking-tight text-white sm:text-4xl lg:text-[40px]">
              {project.title}
            </h3>
          </div>

          <span className="inline-flex w-fit items-center text-[11px] uppercase tracking-[0.2em] text-neutral-400">
            View project
          </span>
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
