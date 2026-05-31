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
          <div className="svc">
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
                Real-time ML data pipeline — ingests, validates, and serves data
                with monitoring built in.
              </p>
              <div className="telemetry">
                <span className="tele">
                  uptime <b>99.8%</b>
                </span>
                <span className="tele">
                  p99 <b>42ms</b>
                </span>
              </div>
              <div className="tags">
                <span className="tag">Python</span>
                <span className="tag">PostgreSQL</span>
                <span className="tag">MLflow</span>
              </div>
            </div>
          </div>

          {/* trading-portal */}
          <div className="svc">
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
                <span className="svc-name">trading-portal</span>
                <span className="health">
                  <span className="d" />
                  healthy
                </span>
              </div>
              <p className="svc-desc">
                Rebuilt a 5+ year legacy trading portal frontend — faster,
                cleaner, fully charted.
              </p>
              <div className="telemetry">
                <span className="tele">
                  uptime <b>99.9%</b>
                </span>
                <span className="tele">
                  p99 <b>28ms</b>
                </span>
              </div>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">Redux</span>
                <span className="tag">Chart.js</span>
              </div>
            </div>
          </div>

          {/* project-three (placeholder) */}
          <div className="svc">
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
                <span className="svc-name">project-three</span>
                <span className="health">
                  <span className="d" />
                  healthy
                </span>
              </div>
              <p className="svc-desc">
                [ Placeholder — a real project: what it does + impact, one line.
                ]
              </p>
              <div className="telemetry">
                <span className="tele">
                  uptime <b>99.x%</b>
                </span>
                <span className="tele">
                  p99 <b>--ms</b>
                </span>
              </div>
              <div className="tags">
                <span className="tag">stack</span>
                <span className="tag">stack</span>
              </div>
            </div>
          </div>

          {/* portfolio.sys */}
          <div className="svc">
            <div className="svc-viz">
              <svg viewBox="0 0 300 74">
                <defs>
                  <pattern
                    id="dd"
                    width="16"
                    height="16"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx="3"
                      cy="3"
                      r="1.1"
                      fill="#666b64"
                      opacity="0.6"
                    />
                  </pattern>
                </defs>
                <rect width="300" height="74" fill="url(#dd)" />
                <circle
                  cx="150"
                  cy="37"
                  r="20"
                  fill="none"
                  stroke="#748b91"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <circle
                  cx="150"
                  cy="37"
                  r="34"
                  fill="none"
                  stroke="#636467"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <circle cx="150" cy="37" r="4" fill="#c1d1cf" />
              </svg>
            </div>
            <div className="svc-pad">
              <div className="svc-top">
                <span className="svc-name">portfolio.sys</span>
                <span className="health build">
                  <span className="d" />
                  deploying
                </span>
              </div>
              <p className="svc-desc">
                This site — a portfolio rendered as a live monitoring dashboard.
                Meta, on purpose.
              </p>
              <div className="telemetry">
                <span className="tele">
                  uptime <b>building</b>
                </span>
                <span className="tele">
                  commit <b>now</b>
                </span>
              </div>
              <div className="tags">
                <span className="tag">Next.js</span>
                <span className="tag">TypeScript</span>
                <span className="tag">FastAPI</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
