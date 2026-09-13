import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { projects } from "../data";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { Reveal } from "../components/reveal";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-5xl md:text-7xl mb-6">Not Found</h1>
        <p className="mb-10 text-neutral-500">The project you are looking for does not exist.</p>
        <Link
          to="/"
          className="eyebrow group inline-flex h-12 items-center justify-center rounded-full border border-black/15 px-8 text-black transition-all hover:bg-black hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto w-full px-6 py-32 md:px-12 md:py-48">
      <Reveal className="mb-16 md:mb-24">
        <Link
          to="/#work"
          className="eyebrow group mb-12 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/15 px-8 text-black transition-all hover:bg-black hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          <ArrowLeft size="0.9em" className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Work
        </Link>
        <div className="eyebrow mb-6 text-neutral-500">{project.category}</div>
        <h1 className="font-serif text-[clamp(3.5rem,8vw,7rem)] leading-none tracking-tight">
          {project.title}
        </h1>
        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
          {project.description}
        </p>
        
        {project.tools.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {project.tools.map((t) => (
              <span
                key={t}
                className="eyebrow cursor-default border border-black/15 px-3 py-1.5 dark:border-white/20"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </Reveal>

      {project.cover && (
        <Reveal delay={0.2} className="mb-12 md:mb-20">
          <div className="group overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            <ImageWithFallback
              src={project.cover}
              alt={project.title}
              className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
              width={1280}
              height={720}
            />
          </div>
        </Reveal>
      )}

      <Reveal delay={0.3} className="mx-auto max-w-3xl mb-20 md:mb-32">
        <h2 className="font-serif text-4xl mb-6">About the project</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
          This is a draft case study page for {project.title}. 
          In a full implementation, you would document the problem, the approach, and the final solution here. 
          Use rich text, headings, and inline images to tell the story of the project.
        </p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group eyebrow inline-flex items-center border-b border-black pb-1 text-black transition-opacity hover:opacity-60 dark:border-white dark:text-white"
          >
            Visit Live Project
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        )}
      </Reveal>

      {project.gallery && project.gallery.length > 0 && (
        <Reveal delay={0.4} className="grid gap-6 md:grid-cols-2">
          {project.gallery.map((g, i) => (
            <div key={`${project.id}-gallery-${i}`} className={`group overflow-hidden bg-neutral-100 dark:bg-neutral-900 ${i === 2 ? 'md:col-span-2' : ''}`}>
              <ImageWithFallback
                src={g}
                alt={`${project.title} — image ${i + 1}`}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                width={800}
                height={600}
              />
            </div>
          ))}
        </Reveal>
      )}
    </article>
  );
}
