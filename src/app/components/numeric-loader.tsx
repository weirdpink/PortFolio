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
    // Check if initial mount or route changed
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

    const images = getImagesForRoute(currentPath);
    let loadedCount = 0;
    const totalImages = images.length;

    // Concurrently preload images into browser memory
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      const onDone = () => {
        loadedCount++;
      };
      img.onload = onDone;
      img.onerror = onDone;
    });

    const startTime = performance.now();
    // Fast duration: ~500ms max
    const targetDuration = 500;

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const timeRatio = Math.min(1, elapsed / targetDuration);
      const imageRatio = totalImages > 0 ? loadedCount / totalImages : 1;

      // Advance counter rapidly based on elapsed time and loaded images
      const calculated = Math.min(
        100,
        Math.floor(Math.max(timeRatio * 100, (imageRatio * 0.7 + timeRatio * 0.3) * 100))
      );

      setCount((prev) => {
        const next = Math.max(prev + Math.floor(Math.random() * 8) + 3, calculated);
        if (next >= 100 || elapsed >= targetDuration) {
          clearInterval(interval);
          setCount(100);
          // Snappy curtain exit once 100 is reached
          setTimeout(() => {
            setLoading(false);
          }, 80);
          return 100;
        }
        return next;
      });
    }, 16);

    return () => clearInterval(interval);
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="numeric-loader"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-neutral-950 p-6 text-white select-none sm:p-12 md:p-16"
        >
          {/* Top metadata bar */}
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-neutral-400 sm:text-xs">
            <span>[ ARMAAN — 2026 ]</span>
            <span>INITIALIZING ASSETS</span>
          </div>

          {/* Left-aligned large numeric counter */}
          <div className="flex flex-col items-start justify-center my-auto">
            <div className="mb-3 font-mono text-[11px] tracking-[0.25em] text-neutral-400 uppercase sm:text-xs">
              [ PRELOADING GRAPHICS ]
            </div>
            <div className="flex items-baseline font-mono text-[clamp(5rem,16vw,12rem)] font-medium leading-none tracking-tighter text-white">
              <span>{count < 10 ? `0${count}` : count}</span>
              <span className="ml-2 font-mono text-[clamp(1.5rem,4vw,3.5rem)] text-neutral-500 font-light">
                %
              </span>
            </div>
          </div>

          {/* Bottom metadata */}
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-neutral-400 sm:text-xs">
            <span>SYSTEM INDEX: OK</span>
            <span>STANDBY</span>
          </div>

          {/* Bottom hairline progress bar */}
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-white transition-all duration-75 ease-out"
            style={{ width: `${count}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
