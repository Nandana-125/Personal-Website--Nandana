import Reveal from "@/components/Reveal";
import styles from "./Interests.module.css";

const PROCS = ["[ interest one ]", "[ interest two ]", "[ interest three ]"];

export default function Interests() {
  return (
    <section id="interests">
      <div className="container">
        <div className={styles.col}>
          <Reveal className="sec-head">
            <span className="sec-num">05</span>
            <span className="sec-title">Interests</span>
            <span className="sec-kick">background processes</span>
          </Reveal>
          <Reveal className={styles.procs}>
            {PROCS.map((p, i) => (
              <div className={styles.proc} key={i}>
                <span className={styles.pid}>proc 0{i + 1}</span>
                <span>{p}</span>
                <span className={styles.usage}>
                  <span />
                </span>
                <span className={styles.pc}>running</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
