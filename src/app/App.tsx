import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { Cursor } from "./components/cursor";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { ErrorBoundary } from "./components/error-boundary";
import Home from "./pages/home";
import ProjectDetail from "./pages/project-detail";
import NotFound from "./pages/not-found";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!hash) {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        requestAnimationFrame(() => {
          document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col w-full bg-white text-neutral-950 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-100">
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
