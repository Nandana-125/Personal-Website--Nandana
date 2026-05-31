"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import styles from "./GitHubActivity.module.css";

const USER = "Nandana-125";
const DAYS = 14;

type Commit = { repo: string; msg: string; url: string; date: Date };
type GHEvent = {
  type: string;
  created_at: string;
  repo?: { name?: string };
  payload?: {
    commits?: { message?: string; sha?: string }[];
    head?: string;
    ref?: string;
  };
};

function ago(d: Date) {
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const dd = Math.floor(h / 24);
  if (dd < 7) return `${dd}d ago`;
  return `${Math.floor(dd / 7)}w ago`;
}

export default function GitHubActivity() {
  const [feed, setFeed] = useState<Commit[]>([]);
  const [buckets, setBuckets] = useState<number[]>([]);
  const [grown, setGrown] = useState(false);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    let alive = true;
    fetch(`https://api.github.com/users/${USER}/events/public?per_page=100`, {
      cache: "no-store",
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((events: GHEvent[]) => {
        if (!alive) return;
        const commits: Commit[] = [];
        events
          .filter((e) => e.type === "PushEvent")
          .forEach((e) => {
            const repo = e.repo?.name || "";
            const date = new Date(e.created_at);
            const cs = e.payload?.commits || [];
            if (cs.length) {
              cs.forEach((c) =>
                commits.push({
                  repo,
                  msg: (c.message || "").split("\n")[0],
                  url: `https://github.com/${repo}/commit/${c.sha}`,
                  date,
                })
              );
            } else {
              const branch = (e.payload?.ref || "").replace("refs/heads/", "");
              const sha = e.payload?.head || "";
              commits.push({
                repo,
                msg: `pushed to ${branch || "main"}${
                  sha ? ` · #${sha.slice(0, 7)}` : ""
                }`,
                url: sha
                  ? `https://github.com/${repo}/commit/${sha}`
                  : `https://github.com/${repo}`,
                date,
              });
            }
          });

        commits.sort((a, b) => b.date.getTime() - a.date.getTime());

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const bk = new Array(DAYS).fill(0);
        commits.forEach((c) => {
          const d = new Date(c.date);
          d.setHours(0, 0, 0, 0);
          const diff = Math.floor((today.getTime() - d.getTime()) / 86400000);
          if (diff >= 0 && diff < DAYS) bk[DAYS - 1 - diff] += 1;
        });

        setFeed(commits.slice(0, 6));
        setBuckets(bk);
        setStatus("ok");
        requestAnimationFrame(() => alive && setGrown(true));
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, []);

  const max = Math.max(1, ...buckets);
  const total = buckets.reduce((a, b) => a + b, 0);

  return (
    <section id="activity">
      <div className="container">
        <div className={styles.col}>
          <Reveal className="sec-head">
            <span className="sec-num">06</span>
            <span className="sec-title">Activity</span>
            <span className="sec-kick">// throughput</span>
          </Reveal>
          <Reveal>
            <div className={styles.panel}>
              <div className={styles.bar}>
                <span className={styles.d} />
                live commit feed
                <span className={styles.right}>
                  {status === "ok"
                    ? `${total} pushes · ${DAYS}d`
                    : status === "loading"
                    ? "syncing…"
                    : "offline"}
                </span>
              </div>

              {status === "ok" && (
                <>
                  <div className={styles.graph}>
                    {buckets.map((v, i) => (
                      <span
                        key={i}
                        className={`${styles.gbar} ${
                          v >= max && v > 0 ? styles.hot : ""
                        }`}
                        style={{
                          height: grown
                            ? `${Math.max(4, (v / max) * 100)}%`
                            : "0%",
                        }}
                        title={`${v} push${v === 1 ? "" : "es"}`}
                      />
                    ))}
                  </div>
                  <div className={styles.glabel}>
                    <span>{DAYS} days ago</span>
                    <span>today</span>
                  </div>

                  <div className={styles.log}>
                    {feed.length === 0 && (
                      <div className={styles.state}>
                        No public pushes in the recent window.
                      </div>
                    )}
                    {feed.map((c, i) => (
                      <a
                        key={i}
                        className={styles.row}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className={styles.rdot} />
                        <span className={styles.repo}>
                          {c.repo.split("/")[1]}
                        </span>
                        <span className={styles.msg}>{c.msg}</span>
                        <span className={styles.when}>{ago(c.date)}</span>
                      </a>
                    ))}
                  </div>
                </>
              )}

              {status === "loading" && (
                <div className={styles.state}>syncing with GitHub…</div>
              )}
              {status === "error" && (
                <div className={styles.state}>
                  Couldn&apos;t reach GitHub right now.
                </div>
              )}

              <div className={styles.foot}>
                <a
                  href={`https://github.com/${USER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  view full activity on GitHub →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
