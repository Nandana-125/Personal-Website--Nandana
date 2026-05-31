"use client";

import { useEffect, useState } from "react";

type Star = {
  left: string;
  top: string;
  size: number;
  delay: string;
  dur: string;
  spark: boolean;
  bright: boolean;
};

export default function Stars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const n = window.innerWidth < 700 ? 48 : 92;
    const id = requestAnimationFrame(() => {
      setStars(
        Array.from({ length: n }, () => {
          const spark = Math.random() < 0.15;
          return {
            left: `${(Math.random() * 100).toFixed(2)}%`,
            top: `${(Math.random() * 100).toFixed(2)}%`,
            size: spark ? 7 + Math.random() * 7 : 1 + Math.random() * 1.8,
            delay: `${(Math.random() * 5).toFixed(2)}s`,
            dur: `${(3 + Math.random() * 4).toFixed(2)}s`,
            spark,
            bright: Math.random() < 0.4,
          };
        })
      );
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className={`star${s.spark ? " spark" : s.bright ? " s" : ""}`}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        />
      ))}
    </div>
  );
}
