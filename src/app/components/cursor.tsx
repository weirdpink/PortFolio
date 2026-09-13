import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Smooth follow with a light spring
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse / trackpad), and
    // respect users who prefer reduced motion.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
      );
      setHovering(interactive);
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white"
      style={{
        x: springX,
        y: springY,
        mixBlendMode: "difference",
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: hovering ? 56 : 24,
        height: hovering ? 56 : 24,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        width: { type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        height: { type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.25, ease: "easeOut" },
      }}
    />
  );
}
