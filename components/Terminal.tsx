"use client";

import { useEffect, useRef, useState } from "react";

type Tok = { t: string; c: string };

const TOKENS: Tok[] = [
  { t: "$ ", c: "tp" },
  { t: "whoami", c: "tc" },
  { t: "\n", c: "pn" },
  { t: "nandana pradeep", c: "to" },
  { t: "\n", c: "pn" },
  { t: "$ ", c: "tp" },
  { t: "cat role.txt", c: "tc" },
  { t: "\n", c: "pn" },
  { t: "frontend + mlops engineer", c: "to" },
  { t: "\n", c: "pn" },
  { t: "$ ", c: "tp" },
  { t: "cat runtime.txt", c: "tc" },
  { t: "\n", c: "pn" },
  { t: "Northeastern M.S. CS", c: "to" },
  { t: "\n", c: "pn" },
  { t: "$ ", c: "tp" },
  { t: "cat status.txt", c: "tc" },
  { t: "\n", c: "pn" },
  { t: "open to SWE internships", c: "to" },
  { t: "\n", c: "pn" },
  { t: "$ ", c: "tp" },
];

export default function Terminal() {
  const hostRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const [shown, setShown] = useState<Tok[]>([]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const clear = () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
    const renderStatic = () => {
      clear();
      setShown(TOKENS.map((t) => ({ ...t })));
    };

    const type = () => {
      clear();
      let ti = 0,
        ci = 0;
      const build: Tok[] = [];
      const step = () => {
        if (document.body.classList.contains("recruiter")) {
          renderStatic();
          return;
        }
        if (ti >= TOKENS.length) {
          timer.current = null;
          return;
        }
        const tk = TOKENS[ti];
        if (ci === 0) build.push({ t: "", c: tk.c });
        const ch = tk.t[ci];
        build[build.length - 1] = {
          t: build[build.length - 1].t + ch,
          c: tk.c,
        };
        setShown(build.map((b) => ({ ...b })));
        ci++;
        if (ci >= tk.t.length) {
          ti++;
          ci = 0;
        }
        timer.current = window.setTimeout(step, ch === "\n" ? 140 : 34);
      };
      step();
    };

    const start = () =>
      document.body.classList.contains("recruiter") ? renderStatic() : type();

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) start();
          else {
            clear();
            setShown([]);
          }
        }),
      { threshold: 0.35 }
    );
    io.observe(host);

    const rt = document.querySelector(".rtoggle");
    const onToggle = () => {
      clear();
      setTimeout(start, 0);
    };
    rt?.addEventListener("click", onToggle);

    return () => {
      io.disconnect();
      clear();
      rt?.removeEventListener("click", onToggle);
    };
  }, []);

  return (
    <div className="hterm" ref={hostRef}>
      <div className="hterm-bar">
        <span className="b" />
        <span className="b" />
        <span className="b" />
        <span className="ttl">nandana@portfolio: ~</span>
      </div>
      <pre className="hterm-body">
        {shown.map((s, i) => (
          <span key={i} className={`tok ${s.c}`}>
            {s.t}
          </span>
        ))}
        <span className="vs-cur" />
      </pre>
    </div>
  );
}
