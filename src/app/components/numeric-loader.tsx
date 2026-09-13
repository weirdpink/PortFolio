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

  // Opening a page: Simple, minimal, fast loader to cover image preloading
  const startPageLoading = (currentPath: string) => {
    setLoading(true);

    const images = getImagesForRoute(currentPath);
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Fast 380ms cover duration to load assets, then smooth fade out
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 380);

    return () => clearTimeout(timeout);
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
            duration: isInitial ? 0.45 : 0.22,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[99999] select-none bg-white dark:bg-neutral-950"
        >
          {isInitial ? (
            /* 1. Initial app start: Big bottom-left numeric loader */
            <div className="flex h-full w-full flex-col justify-end p-8 sm:p-14 md:p-20">
              <div className="font-mono text-[clamp(6rem,20vw,15rem)] font-medium leading-none tracking-tighter tabular-nums text-neutral-950 dark:text-white">
                {count < 10 ? `0${count}` : count}
              </div>
            </div>
          ) : (
            /* 2. Opening a page: Very simple, delicate minimal loader */
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-[1.5px] border-black/15 border-t-black dark:border-white/20 dark:border-t-white" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
