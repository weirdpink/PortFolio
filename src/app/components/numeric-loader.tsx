import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { projects } from "../data";

// Helper to collect images based on route
export function getImagesForRoute(pathname: string): string[] {
  if (pathname.startsWith("/project/")) {
    const id = pathname.replace("/project/", "");
    const project = projects.find((p) => p.id === id);
    if (project) {
      return Array.from(new Set([project.cover, ...project.gallery].filter((src): src is string => Boolean(src))));
    }
  }
  // Default to project covers on home
  return projects.map((p) => p.cover).filter((src): src is string => Boolean(src));
}

interface NumericLoaderProps {
  pathname: string;
}

export function NumericLoader({ pathname }: NumericLoaderProps) {
  const [loading, setLoading] = useState(true);
  const [isInitial, setIsInitial] = useState(() => !pathname.startsWith("/project/"));
  const [pageProgress, setPageProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const isFirstMount = useRef(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (!loading) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [loading]);

  useEffect(() => {
    let cancelled = false;
    let timedOut = false;
    let timer: number | undefined;
    let loadTimeout: number | undefined;
    const pendingImages: HTMLImageElement[] = [];

    const clearPendingImages = () => {
      pendingImages.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };

    const finishInitialLoad = (startedAt: number) => {
      if (cancelled) return;
      const remaining = Math.max(0, 420 - (performance.now() - startedAt));
      if (loadTimeout) window.clearTimeout(loadTimeout);
      timer = window.setTimeout(() => {
        if (!cancelled) setLoading(false);
      }, remaining);
    };

    const startInitialLoading = () => {
      setLoading(true);
      const image = new Image();
      const startedAt = performance.now();
      pendingImages.push(image);
      loadTimeout = window.setTimeout(() => finishInitialLoad(startedAt), 4_000);

      image.onload = () => {
        if (typeof image.decode === "function") {
          void image.decode().catch(() => undefined).then(() => finishInitialLoad(startedAt));
        } else {
          finishInitialLoad(startedAt);
        }
      };
      image.onerror = () => finishInitialLoad(startedAt);
      image.src = "/image.webp";
    };

    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const image = new Image();
        let settled = false;
        pendingImages.push(image);

        const finish = () => {
          if (settled) return;
          settled = true;
          resolve();
        };

        image.onload = () => {
          if (typeof image.decode === "function") {
            void image.decode().catch(() => undefined).then(finish);
          } else {
            finish();
          }
        };
        image.onerror = finish;
        image.src = src;
      });

    const startPageLoading = (currentPath: string) => {
      setLoading(true);
      setPageProgress(0);
      const startedAt = performance.now();
      const images = getImagesForRoute(currentPath);
      let completed = 0;
      loadTimeout = window.setTimeout(() => {
        if (cancelled) return;
        timedOut = true;
        setLoading(false);
      }, 4_000);

      void Promise.all(
        images.map((src) =>
          preloadImage(src).then(() => {
            if (cancelled) return;
            completed += 1;
            setPageProgress(Math.round((completed / images.length) * 92));
          }),
        ),
      ).then(() => {
        if (cancelled || timedOut) return;

        if (loadTimeout) window.clearTimeout(loadTimeout);
        setPageProgress(100);
        const remaining = Math.max(0, 280 - (performance.now() - startedAt));
        timer = window.setTimeout(() => {
          if (!cancelled) setLoading(false);
        }, remaining + 100);
      });
    };

    if (isFirstMount.current) {
      isFirstMount.current = false;
      if (pathname.startsWith("/project/")) {
        setIsInitial(false);
        startPageLoading(pathname);
      } else {
        setIsInitial(true);
        startInitialLoading();
      }
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

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      if (loadTimeout) window.clearTimeout(loadTimeout);
      clearPendingImages();
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && isInitial && (
        <motion.div
          key="initial-loader"
          layoutId="hero-image"
          initial={false}
          role="status"
          aria-label="Loading portfolio"
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
            height={1800}
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
          role="status"
          aria-live="polite"
          aria-label="Loading project"
          className="fixed inset-0 z-[99999] select-none bg-white text-neutral-950"
        >
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <div className="flex w-full max-w-md flex-col items-center gap-5">
              <p className="font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] leading-snug tracking-tight text-neutral-950">
                Good design takes a <span className="italic-serif italic">moment</span>.
              </p>

              <div className="relative h-[2px] w-full max-w-xs overflow-hidden bg-black/10">
                <div
                  className="h-full w-full origin-left bg-neutral-950 transition-transform duration-150 ease-out"
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
