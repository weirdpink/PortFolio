import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects, type Project } from "../data";

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
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [assetsLoaded, setAssetsLoaded] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);

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

  // Opening a project page: Personalized editorial loader with a fixed duration
  const startPageLoading = (currentPath: string) => {
    setLoading(true);

    const id = currentPath.replace("/project/", "");
    const project = projects.find((p) => p.id === id) || null;
    setActiveProject(project);

    const images = project ? Array.from(new Set([project.cover, ...project.gallery])) : getImagesForRoute(currentPath);
    const total = Math.max(1, images.length);
    setTotalAssets(total);
    setAssetsLoaded(0);

    let loaded = 0;

    // Preload and decode all images into memory
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      const onDone = () => {
        loaded++;
      };
      if (img.complete) {
        onDone();
      } else {
        img.onload = () => {
          if (typeof img.decode === "function") {
            img.decode().catch(() => {}).then(onDone);
          } else {
            onDone();
          }
        };
        img.onerror = onDone;
      }
    });

    // Fixed duration so the personalized loader is visible for a while (1.1s)
    const FIXED_DURATION = 1100;
    const startTime = performance.now();
    let pageRafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const timeRatio = Math.min(1, elapsed / FIXED_DURATION);

      // Smoothly advance display counter across the duration
      const simulatedCount = Math.floor(timeRatio * total);
      setAssetsLoaded(Math.min(total, Math.max(loaded, simulatedCount)));

      if (elapsed < FIXED_DURATION) {
        pageRafId = requestAnimationFrame(tick);
      } else {
        setAssetsLoaded(total);
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
            /* 2. Opening a project page: Personalized editorial loader with live asset caching */
            <div className="flex h-full w-full flex-col justify-between p-8 sm:p-14 md:p-20">
              {/* Top metadata bar */}
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-neutral-400 sm:text-xs">
                <span>[ ARMAAN VERMA ]</span>
                <span>PROJECT CASE STUDY</span>
              </div>

              {/* Center personalized project intro */}
              <div className="flex flex-col items-start justify-center max-w-2xl">
                <div className="eyebrow text-neutral-500 mb-3 font-mono text-[11px] tracking-[0.25em]">
                  [ {activeProject?.discipline?.toUpperCase() || "DESIGN"} • {activeProject?.category?.toUpperCase() || "CASE STUDY"} ]
                </div>
                <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight text-neutral-950 dark:text-neutral-100 mb-6">
                  {activeProject?.title || "Project"}
                </h2>

                {/* Live asset preloading indicator */}
                <div className="flex flex-col gap-2 w-full max-w-sm">
                  <div className="flex justify-between font-mono text-[11px] tracking-wider text-neutral-500">
                    <span>CACHING HIGH-RES ASSETS</span>
                    <span>
                      {assetsLoaded} / {totalAssets}
                    </span>
                  </div>
                  <div className="h-[2px] w-full bg-black/10 dark:bg-white/10 overflow-hidden relative">
                    <div
                      className="h-full bg-neutral-950 dark:bg-white transition-all duration-150 ease-out"
                      style={{ width: `${totalAssets > 0 ? (assetsLoaded / totalAssets) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom metadata bar */}
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-neutral-400 sm:text-xs">
                <span>INDEXING ASSETS</span>
                <span>STANDBY</span>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
