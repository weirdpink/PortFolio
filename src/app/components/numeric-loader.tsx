import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { projects } from "../data";

// Helper to collect images based on route
export function getImagesForRoute(pathname: string): string[] {
  if (pathname.startsWith("/project/")) {
    const id = pathname.replace("/project/", "");
    const project = projects.find((p) => p.id === id);
    if (project) {
      return Array.from(new Set([project.cover, ...project.gallery]));
    }
  }
  // Default to project covers on home
  return projects.map((p) => p.cover);
}

interface NumericLoaderProps {
  pathname: string;
}

export function NumericLoader({ pathname }: NumericLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [isInitial, setIsInitial] = useState(true);
  const [pageProgress, setPageProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const initialTimer = useRef<number | null>(null);

  const isFirstMount = useRef(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (!loading) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (initialTimer.current !== null) {
        window.clearTimeout(initialTimer.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      setIsInitial(true);
      startInitialLoading();
    } else if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      // Only show loader when navigating into a project page, never when going back to home
      if (pathname.startsWith("/project/")) {
        setIsInitial(false);
        startPageLoading(pathname);
      } else {
        setLoading(false);
      }
    }
  }, [pathname]);

  // Initial app launch: preload the hero image before shrinking it into place.
  const startInitialLoading = () => {
    setLoading(true);
    const image = new Image();
    const startedAt = performance.now();
    const finish = () => {
      const remaining = Math.max(0, 720 - (performance.now() - startedAt));
      initialTimer.current = window.setTimeout(() => setLoading(false), remaining);
    };

    image.onload = () => {
      image.decode?.().catch(() => {}).finally(finish);
    };
    image.onerror = finish;
    image.src = "/image.webp";
  };

  // Opening a project page: Continuous real-time progress across 1.1s
  const startPageLoading = (currentPath: string) => {
    setLoading(true);
    setPageProgress(0);

    const images = getImagesForRoute(currentPath);

    // Preload and decode all images into memory
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (!img.complete) {
        img.onload = () => {
          if (typeof img.decode === "function") {
            img.decode().catch(() => {});
          }
        };
      }
    });

    // Continuous smooth progression across 1.1s
    const FIXED_DURATION = 1100;
    const startTime = performance.now();
    let pageRafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progressRatio = Math.min(1, elapsed / FIXED_DURATION);
      const currentPercent = Math.min(100, Math.floor(progressRatio * 100));

      setPageProgress(currentPercent);

      if (elapsed < FIXED_DURATION) {
        pageRafId = requestAnimationFrame(tick);
      } else {
        setPageProgress(100);
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    };

    pageRafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(pageRafId);
    };
  };

  return (
    <AnimatePresence>
      {loading && isInitial && (
        <motion.div
          key="initial-loader"
          layoutId="hero-image"
          initial={false}
          className="fixed inset-0 z-[99999] overflow-hidden bg-neutral-950 select-none will-change-transform"
          transition={{
            layout: {
              duration: reduceMotion ? 0 : 1.1,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
        >
          <motion.img
            src="/image.webp"
            alt=""
            width={2400}
            height={1600}
            loading="eager"
            decoding="async"
            initial={reduceMotion ? false : { scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full object-cover object-[50%_48%]"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/[0.03]" />
        </motion.div>
      )}

      {loading && !isInitial && (
        /* Opening a project page: centered text and loading bar */
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[99999] select-none bg-white text-neutral-950"
        >
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <div className="flex w-full max-w-md flex-col items-center gap-5">
              <p className="font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] leading-snug tracking-tight text-neutral-950">
                Good design takes a <span className="italic-serif italic">moment</span>.
              </p>

              <div className="relative h-[2px] w-full max-w-xs overflow-hidden bg-black/10">
                <div
                  className="h-full w-full origin-left bg-neutral-950"
                  style={{ transform: `scaleX(${pageProgress / 100})` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
