import Reveal from "@/components/Reveal";

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <Reveal className="sec-head">
          <span className="sec-num">01</span>
          <span className="sec-title">Projects</span>
          <span className="sec-kick">deployed services</span>
        </Reveal>

        <Reveal className="grid2">
          {/* foresight-ml */}
          <a
            className="svc"
            href="https://github.com/Nandana-125/foresight_ml"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="svc-viz">
              <svg viewBox="0 0 300 74" preserveAspectRatio="none">
                <polyline
                  points="0,58 30,52 60,56 90,40 120,46 150,30 180,36 210,22 240,28 270,16 300,20"
                  fill="none"
                  stroke="#c1d1cf"
                  strokeWidth="1.2"
                />
                <polyline
                  points="0,68 60,64 120,66 180,58 240,60 300,52"
                  fill="none"
                  stroke="#636467"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <div className="svc-pad">
              <div className="svc-top">
                <span className="svc-name">foresight-ml</span>
                <span className="health">
                  <span className="d" />
                  healthy
                </span>
              </div>
              <p className="svc-desc">
                End-to-end MLOps data pipeline turning public SEC filings &
                macro signals into validated, bias-checked training data,
                Airflow-orchestrated, DVC-versioned, CI-gated.
              </p>
              <div className="telemetry">
                <span className="tele">
                  sources <b>SEC+FRED</b>
                </span>
                <span className="tele">
                  data <b>DVC-versioned</b>
                </span>
              </div>
              <div className="tags">
                <span className="tag">Python</span>
                <span className="tag">Airflow</span>
                <span className="tag">MLflow</span>
                <span className="tag">DVC</span>
                <span className="tag">BigQuery</span>
              </div>
            </div>
          </a>

          {/* signlingo */}
          <a
            className="svc"
            href="https://github.com/Nandana-125/Signlingo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="svc-viz">
              <svg viewBox="0 0 300 74">
                <g fill="#748b91">
                  <rect x="20" y="40" width="14" height="20" />
                  <rect x="50" y="28" width="14" height="32" />
                  <rect x="80" y="46" width="14" height="14" />
                  <rect x="110" y="22" width="14" height="38" />
                  <rect x="140" y="34" width="14" height="26" />
                </g>
                <g fill="#c1d1cf">
                  <rect x="180" y="16" width="14" height="44" />
                  <rect x="210" y="30" width="14" height="30" />
                  <rect x="240" y="24" width="14" height="36" />
                </g>
              </svg>
            </div>
            <div className="svc-pad">
              <div className="svc-top">
                <span className="svc-name">signlingo</span>
                <span className="health">
                  <span className="d" />
                  healthy
                </span>
              </div>
              <p className="svc-desc">
                Full-stack ASL learning app — lessons, timed quizzes, and live
                webcam sign practice via an ML detector, with XP, levels, and a
                leaderboard.
              </p>
              <div className="telemetry">
                <span className="tele">
                  quiz levels <b>10</b>
                </span>
                <span className="tele">
                  live <b>webcam ML</b>
                </span>
              </div>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">Express</span>
                <span className="tag">MongoDB</span>
                <span className="tag">FastAPI</span>
              </div>
            </div>
          </a>

          {/* sooner */}
          <a
            className="svc"
            href="https://github.com/Nandana-125/soonerapp1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="svc-viz">
              <svg viewBox="0 0 300 74">
                <g stroke="#636467" strokeWidth="1" fill="none" opacity="0.7">
                  <line x1="60" y1="37" x2="150" y2="20" />
                  <line x1="60" y1="37" x2="150" y2="54" />
                  <line x1="150" y1="20" x2="240" y2="37" />
                  <line x1="150" y1="54" x2="240" y2="37" />
                </g>
                <g fill="#748b91">
                  <circle cx="60" cy="37" r="4" />
                  <circle cx="150" cy="20" r="4" />
                  <circle cx="150" cy="54" r="4" />
                </g>
                <circle cx="240" cy="37" r="5" fill="#c1d1cf" />
              </svg>
            </div>
            <div className="svc-pad">
              <div className="svc-top">
                <span className="svc-name">sooner</span>
                <span className="health">
                  <span className="d" />
                  healthy
                </span>
              </div>
              <p className="svc-desc">
                Virtual walk-in queue manager — customers join a live queue at a
                venue, track real-time position and wait, and get a 45-min
                near-turn timer; owners manage capacity from a live dashboard.
              </p>
              <div className="telemetry">
                <span className="tele">
                  queue <b>real-time</b>
                </span>
                <span className="tele">
                  timer <b>45-min</b>
                </span>
              </div>
              <div className="tags">
                <span className="tag">Node</span>
                <span className="tag">Express</span>
                <span className="tag">MongoDB</span>
                <span className="tag">Vanilla JS</span>
              </div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
