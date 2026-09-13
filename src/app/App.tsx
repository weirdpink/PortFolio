import { useLayoutEffect, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router";
import { Cursor } from "./components/cursor";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { ErrorBoundary } from "./components/error-boundary";
import { NumericLoader } from "./components/numeric-loader";
import Home from "./pages/home";
import ProjectDetail from "./pages/project-detail";
import NotFound from "./pages/not-found";

function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  // Continuously record scroll position while on the home page
  useEffect(() => {
    if (pathname === "/") {
      const onScroll = () => {
        sessionStorage.setItem("homeScrollPos", String(window.scrollY));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [pathname]);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    document.documentElement.style.scrollBehavior = "auto";

    if (pathname.startsWith("/project/")) {
      // Always open project pages directly at the top
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else if (pathname === "/") {
      // Returning from a project page: restore saved position so you stay where you were
      if (prevPathname.current.startsWith("/project/")) {
        const stored = sessionStorage.getItem("homeScrollPos");
        if (stored) {
          const pos = parseInt(stored, 10);
          if (!isNaN(pos) && pos > 0) {
            window.scrollTo({ top: pos, left: 0, behavior: "instant" });
            document.documentElement.scrollTop = pos;
            document.body.scrollTop = pos;
          }
        }
      } else {
        // Direct initial load or refresh: start at top
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }

    prevPathname.current = pathname;

    // Clean any lingering hash so refreshing doesn't scroll
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col w-full bg-white text-neutral-950 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-100">
      <NumericLoader pathname={location.pathname} />
      <ScrollToTop />
      <Cursor />
      <Nav />
      <div className="flex flex-1 flex-col" id="main-content">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
}
