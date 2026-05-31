"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import styles from "./Contact.module.css";

const EMAIL = "nandana.pradeep125@gmail.com";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [subj, setSubj] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");
  const [modal, setModal] = useState(false);

  const send = () => {
    if (!email.trim() || !msg.trim()) {
      setStatus("⚠ add your email and a message first");
      return;
    }
    setStatus("opening your mail app…");
    const body = encodeURIComponent(
      `${msg}\n\n— sent from portfolio · reply to: ${email}`
    );
    const subject = encodeURIComponent(subj || "Message from your portfolio");
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("✓ mail app opened — hit send there"), 700);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className={styles.col}>
          <Reveal className="sec-head">
            <span className="sec-num">07</span>
            <span className="sec-title">Contact</span>
          </Reveal>
          <Reveal>
            <h2 className={styles.title}>Let&apos;s talk.</h2>
            <div className={styles.grid}>
              <div className={styles.panel}>
                <div className={styles.pbar}>
                  <span className={styles.d} />
                  send transmission
                </div>
                <div className={styles.pbody}>
                  <div className={styles.field}>
                    <label>your email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                    />
                  </div>
                  <div className={styles.field}>
                    <label>subject</label>
                    <input
                      type="text"
                      value={subj}
                      onChange={(e) => setSubj(e.target.value)}
                      placeholder="Internship opportunity / question"
                    />
                  </div>
                  <div className={styles.field}>
                    <label>message</label>
                    <textarea
                      rows={4}
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Hi Nandana, …"
                    />
                  </div>
                  <button className={styles.sendbtn} onClick={send}>
                    send to Nandana
                  </button>
                  <div className={styles.status}>{status}</div>
                </div>
              </div>

              <div className={styles.side}>
                <div className={styles.resCard}>
                  <div className={styles.rt}>résumé</div>
                  <div className={styles.resBtns}>
                    <button
                      className={`${styles.rb} ${styles.rbSolid}`}
                      onClick={() => setModal(true)}
                    >
                      ◱ view résumé
                    </button>
                    <a
                      className={styles.rb}
                      href="/resume.pdf"
                      download="Nandana_Pradeep_Resume.pdf"
                    >
                      ↓ download
                    </a>
                  </div>
                </div>
                <div className={styles.links}>
                  <a
                    className={styles.link}
                    href="https://www.linkedin.com/in/nandana-pradeep-b5a250302"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>LinkedIn</span>
                    <span className={styles.arr}>→</span>
                  </a>
                  <a
                    className={styles.link}
                    href="https://github.com/Nandana-125"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>GitHub</span>
                    <span className={styles.arr}>→</span>
                  </a>
                  <a className={styles.link} href="tel:+18572104455">
                    <span>+1 857-210-4455</span>
                    <span className={styles.arr}>→</span>
                  </a>
                  <a className={styles.link} href={`mailto:${EMAIL}`}>
                    <span>{EMAIL}</span>
                    <span className={styles.arr}>→</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {modal && (
        <div
          className={styles.modal}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModal(false);
          }}
        >
          <div className={styles.modalInner}>
            <div className={styles.modalBar}>
              <span>résumé · nandana_pradeep.pdf</span>
              <a href="/resume.pdf" download="Nandana_Pradeep_Resume.pdf">
                ↓ download
              </a>
              <button className={styles.x} onClick={() => setModal(false)}>
                ✕
              </button>
            </div>
            <div className={styles.frame}>
              <div className={styles.fallback}>
                add your résumé to preview it here
              </div>
              <iframe src="/resume.pdf" title="Résumé" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
