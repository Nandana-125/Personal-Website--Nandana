import Reveal from "@/components/Reveal";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className={styles.col}>
          <Reveal className={`sec-head ${styles.head}`}>
            <span className="sec-num">04</span>
            <span className="sec-title">About</span>
          </Reveal>
          <Reveal>
            <p className={styles.statement}>
              I build interfaces that think in systems.
            </p>
            <p className={styles.note}>
              [ 2–3 sentences in your voice: what you love building, why the
              frontend + MLOps combo is your edge, and what you&apos;re hunting
              for next. Keep it human. ]
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
