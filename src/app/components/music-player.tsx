import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "../constants";
import { music } from "../data";

const barHeights = [40, 90, 55, 100, 60, 80, 45];

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pausedAt = useRef(0);

  useEffect(() => {
    const audio = new Audio(music.src);
    audio.preload = "metadata";
    audioRef.current = audio;

    const onEnded = () => {
      setPlaying(false);
      pausedAt.current = 0;
      audio.currentTime = 0;
    };

    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
      audio.load();
    };
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      pausedAt.current = audio.currentTime;
      audio.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        className="absolute bottom-6 left-6 z-20 flex flex-col gap-1.5 md:bottom-8 md:left-12"
      >
        <span className="flex items-center gap-2.5">
          <span
            className="flex h-2 items-end gap-[2px] text-neutral-500 dark:text-neutral-400"
            aria-hidden
          >
            {barHeights.map((h, i) => (
              <span key={i} className="wave-bar" style={{ height: `${h}%` }} />
            ))}
          </span>
          <span className="hidden text-[9px] font-medium uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400 sm:inline">
            Now playing
          </span>
        </span>
        <span className="italic-serif w-max text-lg leading-none text-black dark:text-white">
          {music.title}
        </span>
      </motion.div>

      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        className={`absolute bottom-6 right-6 z-20 px-2 py-2 transition-colors duration-300 hover:opacity-60 active:opacity-40 md:bottom-8 md:right-12 ${
          playing
            ? "text-black dark:text-white"
            : "text-neutral-500 dark:text-neutral-400"
        }`}
        aria-label={playing ? `Pause ${music.title}` : `Play ${music.title}`}
      >
        <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em]">
          {playing ? "Pause" : "Play"}
        </span>
      </motion.button>

      <style>{`
        .wave-bar {
          width: 1.5px;
          border-radius: 1px;
          background: currentColor;
          transform-origin: bottom;
          animation: css-wave 0.9s ease-in-out infinite;
        }
        .wave-bar:nth-child(2n) {
          animation-delay: -0.35s;
          animation-duration: 0.8s;
        }
        .wave-bar:nth-child(3n) {
          animation-delay: -0.55s;
          animation-duration: 1.05s;
        }
        .wave-bar:nth-child(5n) {
          animation-delay: -0.15s;
          animation-duration: 0.7s;
        }
        @keyframes css-wave {
          0%, 100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </>
  );
}