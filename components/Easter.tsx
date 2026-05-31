"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import styles from "./Easter.module.css";

const LINES = [
  "> [ placeholder — Nandana decides what lives here ]",
  "> ideas: mini-game · konami code · secret résumé · ascii art",
  "> status: TBD ✦",
];

export default function Easter() {
  const [out, setOut] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const run = () => {
    setOut([]);
    setDone(false);
    LINES.forEach((line, i) => {
      setTimeout(() => {
        setOut((prev) => [...prev, line]);
        if (i === LINES.length - 1) setDone(true);
      }, (i + 1) * 520);
    });
  };

  return (
    <section id="easter">
      <div className="container">
        <div className={styles.col}>
          <Reveal className="sec-head">
            <span className="sec-num">06</span>
            <span className="sec-title">Easter Egg</span>
            <span className="sec-kick">placeholder</span>
          </Reveal>
          <Reveal>
            <div className={styles.term}>
              <div className={styles.bar}>
                <span className={styles.b} />
                <span className={styles.b} />
                <span className={styles.b} />
                <span className={styles.ttl}>nandana@portfolio: ~</span>
              </div>
              <div className={styles.body}>
                <div>
                  <span className={styles.p}>$</span>{" "}
                  <span className={styles.c}>./easter-egg.sh</span>
                </div>
                {out.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
                {out.length === 0 && <span className={styles.cur} />}
                {done && (
                  <div>
                    <span className={styles.p}>$</span>{" "}
                    <span className={styles.cur} />
                  </div>
                )}
              </div>
            </div>
            <button className={styles.runbtn} onClick={run}>
              run ./easter-egg.sh
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
