import { useLayoutEffect } from "react";
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

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

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
