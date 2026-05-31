"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import styles from "./Skills.module.css";

type Tool = {
  n: string;
  c: string;
  s?: string;
  col?: string;
  u?: string;
  a: string;
};

const TOOLS: Tool[] = [
  { n: "Java", c: "Languages", s: "openjdk", a: "Java" },
  { n: "Python", c: "Languages", s: "python", a: "Py" },
  { n: "C++", c: "Languages", s: "cplusplus", a: "C++" },
  { n: "JavaScript", c: "Languages", s: "javascript", a: "JS" },
  { n: "TypeScript", c: "Languages", s: "typescript", a: "TS" },
  { n: "SQL", c: "Languages", a: "SQL" },
  { n: "HTML5", c: "Languages", s: "html5", a: "HTML" },
  { n: "CSS3", c: "Languages", s: "css3", a: "CSS" },
  { n: "Three.js", c: "Languages", s: "threedotjs", col: "c1d1cf", a: "3JS" },
  { n: "React", c: "Frameworks & Libraries", s: "react", a: "Re" },
  {
    n: "Next.js",
    c: "Frameworks & Libraries",
    s: "nextdotjs",
    col: "c1d1cf",
    a: "Next",
  },
  { n: "Redux", c: "Frameworks & Libraries", s: "redux", a: "Rdx" },
  {
    n: "Express.js",
    c: "Frameworks & Libraries",
    s: "express",
    col: "c1d1cf",
    a: "Exp",
  },
  { n: "FastAPI", c: "Frameworks & Libraries", s: "fastapi", a: "API" },
  { n: "Tailwind CSS", c: "Frameworks & Libraries", s: "tailwindcss", a: "TW" },
  {
    n: "Scikit-learn",
    c: "Frameworks & Libraries",
    s: "scikitlearn",
    a: "SKL",
  },
  { n: "MediaPipe", c: "Frameworks & Libraries", s: "mediapipe", a: "MP" },
  {
    n: "AWS",
    c: "Cloud & Infra",
    s: "amazonwebservices",
    col: "FF9900",
    a: "AWS",
  },
  { n: "GCP", c: "Cloud & Infra", s: "googlecloud", a: "GCP" },
  { n: "Docker", c: "Cloud & Infra", s: "docker", a: "Dkr" },
  { n: "Kubernetes", c: "Cloud & Infra", s: "kubernetes", a: "K8s" },
  { n: "Terraform", c: "Cloud & Infra", s: "terraform", a: "TF" },
  { n: "Jenkins", c: "Cloud & Infra", s: "jenkins", a: "Jnk" },
  {
    n: "GitHub Actions",
    c: "Cloud & Infra",
    s: "githubactions",
    col: "c1d1cf",
    a: "GHA",
  },
  { n: "PostgreSQL", c: "Databases & Tools", s: "postgresql", a: "PG" },
  { n: "MongoDB", c: "Databases & Tools", s: "mongodb", a: "Mng" },
  { n: "Git", c: "Databases & Tools", s: "git", a: "Git" },
  { n: "Airflow", c: "Databases & Tools", s: "apacheairflow", a: "Air" },
  { n: "DVC", c: "Databases & Tools", s: "dvc", a: "DVC" },
  {
    n: "VS Code",
    c: "Databases & Tools",
    u: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    a: "VSC",
  },
  { n: "Cursor", c: "Databases & Tools", s: "cursor", col: "c1d1cf", a: "Cur" },
  {
    n: "GitHub Copilot",
    c: "Databases & Tools",
    s: "githubcopilot",
    col: "c1d1cf",
    a: "Cop",
  },
  {
    n: "Claude",
    c: "Databases & Tools",
    s: "anthropic",
    col: "c1d1cf",
    a: "Cld",
  },
];

const ROWS = [6, 5, 6, 5, 6, 5];

function logoUrl(t: Tool) {
  if (t.u) return t.u;
  if (t.s)
    return `https://cdn.simpleicons.org/${t.s}${t.col ? "/" + t.col : ""}`;
  return null;
}

function Hex({
  tool,
  index,
  shown,
}: {
  tool: Tool;
  index: number;
  shown: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const url = logoUrl(tool);
  return (
    <div
      className={`${styles.hex} ${shown ? styles.in : ""}`}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className={styles.face}>
        <div className={styles.core}>
          {url && !failed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt={tool.n}
              loading="lazy"
              onError={() => setFailed(true)}
            />
          ) : (
            <span className={styles.abbr}>{tool.a}</span>
          )}
        </div>
      </div>
      <div className={styles.tip}>
        <span className={styles.tn}>{tool.n}</span>
        <span className={styles.tc}>{tool.c}</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(el);
          }
        }),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rows: Tool[][] = [];
  let i = 0;
  for (const count of ROWS) {
    rows.push(TOOLS.slice(i, i + count));
    i += count;
  }
  const offsets: number[] = [];
  let acc = 0;
  for (const r of rows) {
    offsets.push(acc);
    acc += r.length;
  }

  return (
    <section id="skills">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-num">02</span>
          <span className="sec-title">Skills</span>
          <span className="sec-kick">toolset</span>
        </Reveal>

        <div className={styles.comb} ref={ref}>
          {rows.map((row, ri) => (
            <div className={styles.combRow} key={ri}>
              {row.map((tool, ci) => (
                <Hex
                  key={tool.n}
                  tool={tool}
                  index={offsets[ri] + ci}
                  shown={shown}
                />
              ))}
            </div>
          ))}
        </div>

        <div className={styles.combLegend}>
          languages · frameworks · cloud &amp; infra · databases &amp; tools —
          hover a cell
        </div>
      </div>
    </section>
  );
}
