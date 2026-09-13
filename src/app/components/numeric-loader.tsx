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
  const isFirstMount = useRef(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      startLoading(pathname);
    } else if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      startLoading(pathname);
    }
  }, [pathname]);

  const startLoading = (currentPath: string) => {
    setLoading(true);
    setCount(0);

    // Preload route images in the background
    const images = getImagesForRoute(currentPath);
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Snappy, balanced timer so it feels rapid without dragging
    const DURATION = 850; // 0.85s duration
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
        // Snappy pause before curtain lift
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

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="numeric-loader"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col justify-end p-8 sm:p-14 md:p-20 select-none bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white"
        >
          {/* Bottom left large numeric counter - ONLY visible element */}
          <div className="font-mono text-[clamp(6rem,20vw,15rem)] font-medium leading-none tracking-tighter tabular-nums text-neutral-950 dark:text-white">
            {count < 10 ? `0${count}` : count}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
