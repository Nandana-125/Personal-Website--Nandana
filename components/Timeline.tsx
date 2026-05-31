"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import styles from "./Timeline.module.css";

type Node = {
  id?: string;
  when: string;
  title: string;
  kind: string;
  org: string;
  points: string[];
};

const NODES: Node[] = [
  {
    when: "now → next",
    title: "Open to SWE Internships",
    kind: "current",
    org: "target launch · summer/fall 2026",
    points: [
      "Frontend / Backend/ full-stack / infra roles where the MLOps + UI combo matters",
    ],
  },
  {
    id: "education",
    when: "2025 – 2027 (expected)",
    title: "M.S. Computer Science",
    kind: "education",
    org: "Northeastern University · Boston, MA",
    points: [
      "Foundations of AI · Algorithms · DBMS · Web Dev · Mobile App Dev · MLOps · Programming Design · Computer/Human Interaction",
    ],
  },
  {
    when: "2026",
    title: "1st Place🏆 — Google MLOps Expo",
    kind: "award",
    org: "Hackathon · observability tooling",
    points: [
      "Surfaced drift and performance regressions on a live dashboard",
      "won for the most complete, deployable observability story.",
    ],
  },
  {
    when: "Jun – Nov 2024",
    title: "Software Engineer Intern",
    kind: "work",
    org: "PAMP Technologies (MKS PAMP) · Kochi, India",
    points: [
      "Rebuilt a 5+ year legacy trading portal frontend with React, Redux & Chart.js",
      "Cut load time by ~35% via component & state optimization",
    ],
  },
  {
    when: " 2021 - 2024 ",
    title: "Bachelor's in Computer Applications",
    kind: "education",
    org: "Christ University · Bangalore, INDIA ",
    points: [
      "Machine Learning · DSA · Cloud Computing · Python · C++ · Networking · OOP · Operating systems",
    ],
  },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const [go, setGo] = useState(false);
  const [revealed, setRevealed] = useState<boolean[]>(NODES.map(() => false));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const clear = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    const reset = () => {
      clear();
      setGo(false);
      setRevealed(NODES.map(() => false));
    };
    const play = () => {
      clear();
      if (document.body.classList.contains("recruiter")) {
        setGo(true);
        setRevealed(NODES.map(() => true));
        return;
      }
      setGo(false);
      setRevealed(NODES.map(() => false));
      requestAnimationFrame(() => {
        setGo(true);
        const n = NODES.length;
        NODES.forEach((_, j) => {
          const orderFromBottom = n - 1 - j;
          const t = window.setTimeout(() => {
            setRevealed((prev) => {
              const next = [...prev];
              next[j] = true;
              return next;
            });
          }, 300 + orderFromBottom * 820);
          timers.current.push(t);
        });
      });
    };

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => (e.isIntersecting ? play() : reset())),
      { threshold: 0.3 }
    );
    io.observe(el);

    const rt = document.querySelector(".rtoggle");
    const onToggle = () => setTimeout(play, 0);
    rt?.addEventListener("click", onToggle);

    return () => {
      io.disconnect();
      clear();
      rt?.removeEventListener("click", onToggle);
    };
  }, []);

  return (
    <section id="timeline">
      <div className="container">
        <div className={styles.col}>
          <Reveal className="sec-head">
            <span className="sec-num">03</span>
            <span className="sec-title">Experience &amp; Education</span>
            <span className="sec-kick">trajectory</span>
          </Reveal>

          <div
            className={`${styles.timeline} ${go ? styles.go : ""}`}
            ref={ref}
          >
            <div className={styles.spine}>
              <span className={styles.trail} />
            </div>
            <div className={styles.rocket} aria-hidden="true">
              <svg viewBox="0 0 30 30">
                <path
                  d="M15 2 C19 6 20 12 20 17 L10 17 C10 12 11 6 15 2Z"
                  fill="#c1d1cf"
                />
                <circle cx="15" cy="10" r="2" fill="#171f22" />
                <path d="M10 17 L6 22 L10 20Z" fill="#748b91" />
                <path d="M20 17 L24 22 L20 20Z" fill="#748b91" />
                <path
                  className={styles.flame}
                  d="M12 20 Q15 29 18 20 Q15 24 12 20Z"
                  fill="#748b91"
                />
              </svg>
            </div>

            <div>
              {NODES.map((node, j) => (
                <div
                  key={j}
                  id={node.id}
                  className={`${styles.node} ${revealed[j] ? styles.in : ""}`}
                >
                  <div className={styles.when}>{node.when}</div>
                  <h4>
                    {node.title}
                    <span className={styles.kind}>{node.kind}</span>
                  </h4>
                  <div className={styles.org}>{node.org}</div>
                  <ul>
                    {node.points.map((p, k) => (
                      <li key={k}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
