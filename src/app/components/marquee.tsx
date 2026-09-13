import { useEffect, useState } from "react";

const text = (
  <>
    DESIGNER <span className="mx-4 font-light text-neutral-400">✕</span>{" "}
    ENGINEER <span className="mx-4 font-light text-neutral-400">✕</span>{" "}
  </>
);

export function Marquee() {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShouldAnimate(false);
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes css-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-css-marquee {
          animation: css-marquee 20s linear infinite;
          will-change: transform;
        }
      `}</style>
      <div className="flex overflow-hidden whitespace-nowrap border-y border-black/10 py-4 dark:border-white/10" aria-hidden>
        <div
          className={`flex shrink-0 items-center font-sans text-[clamp(1.2rem,2.5vw,2rem)] tracking-tight text-black dark:text-white ${shouldAnimate ? "animate-css-marquee" : ""}`}
        >
          <span className="pr-4 flex items-center">{text}</span>
          <span className="pr-4 flex items-center">{text}</span>
          <span className="pr-4 flex items-center">{text}</span>
          <span className="pr-4 flex items-center">{text}</span>
          <span className="pr-4 flex items-center">{text}</span>
          <span className="pr-4 flex items-center">{text}</span>
          <span className="pr-4 flex items-center">{text}</span>
          <span className="pr-4 flex items-center">{text}</span>
          <span className="pr-4 flex items-center">{text}</span>
          <span className="pr-4 flex items-center">{text}</span>
        </div>
      </div>
    </>
  );
}
