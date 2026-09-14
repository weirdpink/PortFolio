import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { projects } from "../data";
import { ImageWithFallback } from "../components/ImageWithFallback";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const project = projects.find((p) => p.id === id);

  const handleBack = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isExiting) return;
    setIsExiting(true);
    sessionStorage.setItem("returningFromProject", "true");
    setTimeout(() => {
      navigate("/");
    }, 140);
  };

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-5xl md:text-7xl mb-6">Not Found</h1>
        <p className="mb-10 text-neutral-500">The project you are looking for does not exist.</p>
        <button
          type="button"
          onClick={handleBack}
          className="eyebrow group inline-flex h-12 items-center justify-center rounded-full border border-black/15 px-8 text-black transition-all hover:bg-black hover:text-white cursor-pointer"
        >
          Return to Work
        </button>
      </div>
    );
  }

  const isDesign = project.discipline === "Design";

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={isExiting ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
      transition={{ duration: isExiting ? 0.14 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full px-6 py-24 md:px-12 md:py-36"
    >
      {/* Top Navigation & Header */}
      <div className="mb-12 md:mb-16">
        <button
          type="button"
          onClick={handleBack}
          className="eyebrow group mb-8 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-black/15 px-5 text-black transition-all hover:bg-black hover:text-white cursor-pointer"
        >
          <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Work
        </button>

        <div className="flex flex-wrap items-center gap-2.5 eyebrow text-neutral-500 mb-3 font-mono text-[11px]">
          <span>{project.discipline.toUpperCase()}</span>
          <span>•</span>
          <span>{project.category.toUpperCase()}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        <h1 className="font-serif text-[clamp(2.75rem,7.5vw,6rem)] leading-[0.98] tracking-tight text-neutral-950">
          {project.title}
        </h1>

        {/* Top Metadata Bar */}
        <div className="mt-8 grid grid-cols-2 gap-6 border-y border-black/10 py-5 sm:grid-cols-4 md:mt-10">
          <div>
            <div className="eyebrow text-neutral-500 mb-1">Role</div>
            <div className="text-sm font-medium text-neutral-900">{project.role}</div>
          </div>
          <div>
            <div className="eyebrow text-neutral-500 mb-1">Timeline</div>
            <div className="text-sm font-medium text-neutral-900">{project.year}</div>
          </div>
          <div>
            <div className="eyebrow text-neutral-500 mb-1">Discipline</div>
            <div className="text-sm font-medium text-neutral-900">{project.discipline}</div>
          </div>
          <div>
            <div className="eyebrow text-neutral-500 mb-1">Deliverables</div>
            <div className="text-sm font-medium text-neutral-900">{project.tools[0]} & More</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESIGN PROJECTS: EXACT FILL STYLE IMAGE PLACEMENT, DESCRIPTION BELOW     */}
      {/* ========================================================================= */}
      {isDesign ? (
        <>
          {/* EXACT FILL STYLE IMAGE PLACEMENT (Full bleed filled box grid) */}
          <div className="w-[calc(100%+3rem)] -ml-6 md:w-[calc(100%+6rem)] md:-ml-12 overflow-hidden border-y border-black/10 bg-black/10 my-10 md:my-14">
            {project.category === "Poster" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((img, i) => (
                  <div key={i} className="group relative overflow-hidden bg-neutral-950 aspect-[2918/4096] w-full">
                    <ImageWithFallback
                      src={img}
                      alt={`${project.title} 0${i + 1}`}
                      className="h-full w-full object-contain"
                      width={2918}
                      height={4096}
                    />
                  </div>
                ))}
              </div>
            )}

            {project.category === "Logo" && (
              <div className="grid grid-cols-2 md:grid-cols-3">
                {project.gallery.map((img, i) => (
                  <div key={i} className="group relative overflow-hidden bg-neutral-950 aspect-square w-full p-8 sm:p-14 flex items-center justify-center">
                    <ImageWithFallback
                      src={img}
                      alt={`${project.title} mark 0${i + 1}`}
                      className="max-h-full max-w-full object-contain"
                      width={400}
                      height={400}
                    />
                  </div>
                ))}
              </div>
            )}

            {project.category === "Brand Identity" && (
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {project.gallery.map((img, i) => (
                  <div key={i} className="group relative overflow-hidden bg-neutral-950 aspect-[4/3] w-full">
                    <ImageWithFallback
                      src={img}
                      alt={`${project.title} asset 0${i + 1}`}
                      className="h-full w-full object-cover"
                      width={1000}
                      height={750}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DESCRIPTION BELOW ALL THE IMAGES */}
          <div className="mx-auto max-w-3xl pt-6 pb-12">
            <div className="eyebrow mb-3 text-neutral-500 font-mono">[ PHILOSOPHY & PROCESS ]</div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-neutral-950 leading-snug tracking-tight mb-5">
              {project.description}
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-700 mb-8">
              {project.overview}
            </p>

            <div className="border-t border-black/10 pt-6 mt-8">
              <div className="eyebrow mb-3.5 text-neutral-500 font-mono">CORE CAPABILITIES</div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="eyebrow border border-black/15 px-3 py-1 text-xs text-neutral-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ========================================================================= */
        /* ENGINEERING PROJECTS: CASE STUDY & FULL STACK ARCHITECTURE               */
        /* ========================================================================= */
        <>
          {/* Main Hero Showcase */}
          <div className="w-[calc(100%+3rem)] -ml-6 md:w-[calc(100%+6rem)] md:-ml-12 overflow-hidden border-y border-black/10 bg-neutral-950 aspect-[16/9] my-10 md:my-14">
            <ImageWithFallback
              src={project.cover}
              alt={project.title}
              className="h-full w-full object-cover"
              width={1400}
              height={788}
            />
          </div>

          <div className="mx-auto max-w-3xl pt-6 pb-12">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="eyebrow text-neutral-500 font-mono">[ ARCHITECTURE & OVERVIEW ]</div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow group inline-flex items-center gap-1.5 border-b border-black pb-0.5 text-black transition-opacity hover:opacity-70"
                >
                  View Repository
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
                </a>
              )}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-neutral-950 leading-snug tracking-tight mb-5">
              {project.description}
            </h2>

            <p className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-700 mb-8">
              {project.overview}
            </p>

            {/* Key Engineering Features */}
            {project.features && project.features.length > 0 && (
              <div className="border-t border-black/10 pt-6 mt-8">
                <div className="eyebrow mb-4 text-neutral-500 font-mono">KEY SYSTEM HIGHLIGHTS</div>
                <div className="space-y-2.5">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={17} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-sm sm:text-[15px] text-neutral-800 leading-relaxed">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="border-t border-black/10 pt-6 mt-8">
              <div className="eyebrow mb-3.5 text-neutral-500 font-mono">TECHNOLOGY STACK</div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="eyebrow border border-black/15 px-3 py-1 text-xs text-neutral-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer Navigation */}
      <div className="border-t border-black/10 pt-10 flex justify-between items-center max-w-3xl mx-auto">
        <button
          type="button"
          onClick={handleBack}
          className="eyebrow group inline-flex items-center gap-2 text-black transition-opacity hover:opacity-70 cursor-pointer"
        >
          <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to all work
        </button>
        <span className="eyebrow text-neutral-400 font-mono">PORTFOLIO — 2026</span>
      </div>
    </motion.article>
  );
}

