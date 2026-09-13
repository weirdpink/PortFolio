import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { Cursor } from "./components/cursor";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { ErrorBoundary } from "./components/error-boundary";
const Home = lazy(() => import("./pages/home"));
const ProjectDetail = lazy(() => import("./pages/project-detail"));
const NotFound = lazy(() => import("./pages/not-found"));

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-950 border-t-transparent dark:border-neutral-100 dark:border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col w-full bg-white text-neutral-950 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-100">
      <Cursor />
      <Nav />
      <div className="flex flex-1 flex-col" id="main-content">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
}
