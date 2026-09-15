import { useEffect, useRef } from "react";

const words = [
  { text: "DESIGN" },
  { text: "ENGINEER", ghost: true },
  { text: "SYSTEMS" },
  { text: "DESIGNER", ghost: true },
  { text: "INTERFACE" },
];

function useMarquee(sign: 1 | -1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let velocity = 0;
    let smooth = 0;
    let lastScroll = window.scrollY;
    let prev = performance.now();
    let raf = 0;
    let half = 0;

    const measure = () => {
      half = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const onScroll = () => {
      velocity += (window.scrollY - lastScroll) * 4;
      lastScroll = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const frame = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      velocity *= 0.9;
      smooth += (velocity - smooth) * 0.08;
      x += (80 + smooth * 0.7) * dt;
      if (half > 0) x = ((x % half) + half) % half;
      const skew = Math.max(-8, Math.min(8, smooth * -0.015));
      const dir = sign === 1 ? x : -x;
      track.style.transform = `translate3d(${dir}px,0,0) skewX(${skew}deg)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sign]);

  return ref;
}

function Circle({ variant }: { variant: number }) {
  const cls = ["bg-black", "border-2 border-black"][variant % 2];
  return (
    <span
      className={`mx-8 inline-block h-[0.5em] w-[0.5em] select-none rounded-full ${cls} md:mx-14`}
      aria-hidden
    />
  );
}

export function Marquee() {
  const mainRef = useMarquee(-1);

  return (
    <div aria-hidden className="overflow-hidden whitespace-nowrap border-y border-black/10 py-10 md:py-14">
      <div
        ref={mainRef}
        className="flex shrink-0 items-center will-change-transform text-[clamp(3.5rem,7vw,6.5rem)] font-bold leading-none tracking-tight"
      >
        {Array.from({ length: 2 }).map((_, copy) => (
          <span
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy !== 0}
          >
            {words.map((w, i) => (
              <span key={w.text} className="flex items-center">
                <span
                  className="font-sans font-bold text-black"
                  style={{
                    WebkitTextStroke: w.ghost
                      ? "1px rgba(10,10,10,0.6)"
                      : undefined,
                    color: w.ghost ? "transparent" : undefined,
                  }}
                >
                  {w.text}
                </span>
                {i < words.length - 1 && <Circle variant={i} />}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}