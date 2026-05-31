"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AskAI.module.css";

type Msg = { from: "bot" | "user"; text: string };
type Intent = { keys: string[]; reply: string; go?: string };

const INTENTS: Intent[] = [
  {
    keys: ["project", "built", "foresight", "signlingo", "sooner"],
    reply:
      "Nandana has three main projects: Foresight (an MLOps data pipeline), SignLingo (a full-stack ASL learning app with live webcam practice), and Sooner (a real-time virtual queue manager). Taking you there ↓",
    go: "#projects",
  },
  {
    keys: ["skill", "tech", "stack", "tool", "language", "python", "react"],
    reply:
      "Her toolset spans languages (Python, TypeScript, Java, C++), frameworks (React, Next.js, FastAPI), cloud/infra (AWS, GCP, Docker, Kubernetes, Terraform), and data tools (PostgreSQL, MongoDB, Airflow, DVC). Have a look ↓",
    go: "#skills",
  },
  {
    keys: ["resume", "cv", "download"],
    reply: "You can view or download her résumé in the Contact section ↓",
    go: "#contact",
  },
  {
    keys: ["education", "school", "degree", "northeastern", "master", "study"],
    reply:
      "She's pursuing an M.S. in Computer Science at Northeastern University (expected 2027). Details below ↓",
    go: "#education",
  },
  {
    keys: ["open", "available", "hiring", "internship", "intern"],
    reply:
      "Yes — she's open to SWE internships, targeting summer/fall 2026. The Contact section has the best ways to reach her ↓",
    go: "#timeline",
  },
  {
    keys: ["experience", "job", "history", "trajectory", "background"],
    reply: "Here's her trajectory — experience and education on the timeline ↓",
    go: "#timeline",
  },
  {
    keys: ["activity", "commit", "throughput", "shipping", "pushes"],
    reply:
      "Here's her live GitHub activity — a feed of recent pushes and a throughput graph showing she's actively shipping ↓",
    go: "#activity",
  },
  {
    keys: [
      "contact",
      "email",
      "reach",
      "hire",
      "linkedin",
      "github",
      "phone",
      "talk",
    ],
    reply:
      "You can reach her via email, LinkedIn, GitHub, or the message form — all in the Contact section ↓",
    go: "#contact",
  },
  {
    keys: ["interest", "hobby", "fun", "office", "paint", "game"],
    reply:
      "Outside of code: painting & graphic design, exploring the city for new food, building side projects, and a lot of The Office. See ↓",
    go: "#interests",
  },
  {
    keys: ["about", "who", "yourself"],
    reply:
      "Nandana is a software engineer who works across the whole stack — clean interfaces on top, MLOps and observability underneath. More below ↓",
    go: "#about",
  },
];

const FALLBACK =
  "I can tell you about Nandana's projects, skills, experience, education, interests, or how to contact her — try asking about one of those!";
const SUGGESTIONS = ["Projects", "Skills", "Résumé", "Contact"];

export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hi! I'm Nandana's assistant. Ask me about her projects, skills, experience, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({
      top: logRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, busy]);

  const flashSection = (go?: string) => {
    if (!go) return;
    const el = document.querySelector(go) as HTMLElement | null;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.remove(styles.flash);
    void el.offsetWidth;
    el.classList.add(styles.flash);
    setTimeout(() => el.classList.remove(styles.flash), 1600);
  };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const history = [...msgs, { from: "user" as const, text: q }];
    setMsgs(history);
    setInput("");
    setBusy(true);

    const intent = INTENTS.find((i) =>
      i.keys.some((k) => q.toLowerCase().includes(k))
    );

    let reply = "";
    try {
      const r = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (r.ok) reply = (await r.json()).reply ?? "";
    } catch {
      // network error — fall through to the keyword fallback below
    }
    if (!reply) reply = intent ? intent.reply : FALLBACK;

    setMsgs((m) => [...m, { from: "bot", text: reply }]);
    setBusy(false);
    setTimeout(() => flashSection(intent?.go), 300);
  };

  return (
    <>
      {open && (
        <div className={styles.panel}>
          <div className={styles.head}>
            <span className={styles.live} />
            ask-ai · nandana
            <button
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className={styles.log} ref={logRef}>
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`${styles.msg} ${
                  m.from === "bot" ? styles.bot : styles.user
                }`}
              >
                {m.text}
              </div>
            ))}
            {busy && (
              <div className={`${styles.msg} ${styles.bot}`}>typing…</div>
            )}
          </div>
          <div className={styles.sugg}>
            {SUGGESTIONS.map((s) => (
              <button key={s} className={styles.chip} onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
          <div className={styles.inputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send(input);
              }}
              placeholder="Ask about Nandana…"
            />
            <button
              className={styles.send}
              onClick={() => send(input)}
              disabled={busy}
            >
              send
            </button>
          </div>
        </div>
      )}
      <button className={styles.fab} onClick={() => setOpen((o) => !o)}>
        <span className={styles.dot} />
        {open ? "Close" : "Ask AI"}
      </button>
    </>
  );
}
