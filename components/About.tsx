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
              I' m a software engineer who' s just as happy designing a clean
              interface as I am babysitting the pipeline underneath it — and I
              watch production the way Dwight watches the office, so nothing
              breaks without me noticing first. I love when something looks
              simple on top and hides a genuinely complicated system below, and
              I get a little too excited about dashboards and drift alerts. Off
              the clock: painting and graphic design, exploring the city one new
              restaurant at a time, and rewatching The Office for a frankly
              unscientific number of times and calling it research.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
