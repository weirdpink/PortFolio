import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  const [count, setCount] = useState(0);
  const [isInitial, setIsInitial] = useState(true);
  const [pageProgress, setPageProgress] = useState(0);

  const isFirstMount = useRef(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      setIsInitial(true);
      startInitialLoading(pathname);
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

  // Initial app launch: Big bottom-left numeric loader counting to 100
  const startInitialLoading = (currentPath: string) => {
    setLoading(true);
    setCount(0);

    const images = getImagesForRoute(currentPath);
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const DURATION = 850; // 0.85s
    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / DURATION);
      const nextCount = Math.min(100, Math.floor(progress * 100));

      setCount(nextCount);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => {
          setLoading(false);
        }, 70);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
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
      {loading && (
        <motion.div
          key={isInitial ? "initial-loader" : "page-loader"}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={isInitial ? { y: "-100%" } : { opacity: 0 }}
          transition={{
            duration: isInitial ? 0.45 : 0.25,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[99999] select-none bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white"
        >
          {isInitial ? (
            /* 1. Initial app start: Big bottom-left numeric loader */
            <div className="flex h-full w-full flex-col justify-end p-8 sm:p-14 md:p-20">
              <div className="font-mono text-[clamp(6rem,20vw,15rem)] font-medium leading-none tracking-tighter tabular-nums text-neutral-950 dark:text-white">
                {count < 10 ? `0${count}` : count}
              </div>
            </div>
          ) : (
            /* 2. Opening a project page: Centered waiting text, loading bar, and percent */
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <div className="flex flex-col items-center gap-3.5 w-full max-w-xs">
                {/* Waiting text */}
                <span className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase">
                  PLEASE WAIT A MOMENT...
                </span>

                {/* Loading bar */}
                <div className="h-[2px] w-full bg-black/10 dark:bg-white/10 overflow-hidden relative">
                  <div
                    className="h-full w-full bg-neutral-950 dark:bg-white origin-left"
                    style={{ transform: `scaleX(${pageProgress / 100})` }}
                  />
                </div>

                {/* Percentage */}
                <span className="tabular-nums font-mono text-xs tracking-widest text-neutral-600 dark:text-neutral-400">
                  {pageProgress}%
                </span>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
