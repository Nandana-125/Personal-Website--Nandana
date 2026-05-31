# Nandana Pradeep — Portfolio

> **Portfolio as a production system.** A personal site built like a monitoring dashboard — set in a starfield, instrumented with live telemetry, and self-aware enough to answer questions about its owner.

**Live:** https://personal-website-nandana.vercel.app/

A software engineer's portfolio that treats itself as a deployed service: project cards report "uptime" and stack, a rocket-launch timeline charts the career trajectory, a live feed shows real GitHub pushes, and an AI assistant answers recruiter questions on the spot. Built with Next.js, TypeScript, and a hand-rolled dark "observability" design system.

---

## ✦ Highlights

- **Typing terminal hero** — replays a `whoami` / `cat role.txt` session on view.
- **Project cards** — each links to its repo, with real, defensible "telemetry" instead of vanity metrics.
- **Honeycomb skills grid** — hex tiles with live brand logos (via Simple Icons) and hover tooltips.
- **Rocket timeline** — a rocket launches up the spine as experience and education milestones light up.
- **Live GitHub activity** — a "deploy log" of recent pushes plus a throughput graph, pulled from the GitHub public API in real time.
- **Ask-AI assistant** — a floating chat widget powered by Google Gemini, scoped to answer questions about Nandana, with a keyword-based fallback and scroll-to-section behavior.
- **Recruiter mode** — a global toggle that calms every animation for a quieter, scan-friendly read.
- **Contact + résumé** — a message form (mailto handoff) and an in-page résumé viewer/download.
- Fully responsive, accessible-minded, and animated with `IntersectionObserver` (no heavy animation libraries).

---

## Tech Stack

| Layer        | Choice                                                              |
| ------------ | ------------------------------------------------------------------- |
| Framework    | Next.js (App Router, Turbopack)                                     |
| Language     | TypeScript, React                                                   |
| Styling      | Tailwind CSS v4 + CSS Modules + a custom CSS-variable design system |
| Fonts        | `next/font` — Schibsted Grotesk (sans) & Martian Mono (mono)        |
| AI assistant | Google Gemini API (free tier) via a Next.js Route Handler           |
| Live data    | GitHub public Events API (no auth/key)                              |
| Hosting      | Vercel                                                              |

---

## How It Works

### Design system

A single source of truth for the palette and shared chrome lives in `app/globals.css` as CSS variables (`--bg`, `--text`, `--muted`, `--hi`, …). Section-specific styles are co-located with their components as **CSS Modules** (e.g. `Skills.module.css`), keeping the global stylesheet small and avoiding naming collisions.

### Animations

Scroll reveals, the typing terminal, the honeycomb stagger, and the rocket timeline are all driven by the browser's `IntersectionObserver` — components fade/animate in when they enter the viewport and replay when revisited. A `recruiter` class on `<body>` (toggled by the recruiter-mode switch) disables motion across the app via `:global(body.recruiter)` rules in the modules.

### Ask-AI assistant

The chat widget (`components/AskAI.tsx`) POSTs the conversation to a server route (`app/api/ask/route.ts`). That route attaches a short bio of Nandana as a system instruction and calls the Gemini API server-side, so the API key never reaches the browser. If the AI call fails or is rate-limited, the widget falls back to a local keyword router — so it always responds, and it still smooth-scrolls to and highlights the relevant section.

### Live GitHub activity

`components/GitHubActivity.tsx` fetches recent public events from the GitHub API on the client, extracts push events, renders the six latest as a clickable "deploy log," and buckets pushes per day into a small throughput bar graph. No token required — it reads public data only and degrades gracefully if GitHub is unreachable.

---

## Project Structure

```
app/
  layout.tsx          # fonts, metadata, global chrome (Header, Stars, RecruiterToggle, AskAI)
  page.tsx            # composes the page sections in order
  globals.css         # palette (CSS variables) + shared/global styles
  api/
    ask/route.ts      # server route: proxies chat to the Gemini API (keeps key secret)

components/
  Header.tsx          # fixed nav (mix-blend-mode)
  Stars.tsx           # animated starfield background
  RecruiterToggle.tsx # global "calm the animations" switch
  Terminal.tsx        # typing terminal in the hero
  Reveal.tsx          # reusable scroll fade-up wrapper
  Projects.tsx        # project cards (linked to repos)
  Skills.tsx          + Skills.module.css         # honeycomb skill grid
  Timeline.tsx        + Timeline.module.css        # rocket experience/education timeline
  About.tsx           + About.module.css
  Interests.tsx       + Interests.module.css       # "background processes" list
  GitHubActivity.tsx  + GitHubActivity.module.css  # live commit feed + throughput
  Contact.tsx         + Contact.module.css         # message form + résumé viewer
  AskAI.tsx           + AskAI.module.css           # AI chat widget
  Easter.tsx          + Easter.module.css          # easter egg (optional, not wired by default)

public/
  resume.pdf          # served at /resume.pdf
```

---

## Getting Started (Local)

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Clone
git clone https://github.com/Nandana-125/Personal-Website--Nandana.git
cd Personal-Website--Nandana

# 2. Install
npm install

# 3. Add your environment variable (see below)
#    Create a file named .env.local in the project root.

# 4. Run
npm run dev
```

Open http://localhost:3000.

### Environment Variables

Create `.env.local` in the project root:

```
GEMINI_API_KEY=your_google_ai_studio_key
```

Get a free key (no credit card) at https://aistudio.google.com/.

> The key is **only** used server-side in `app/api/ask/route.ts` and is never exposed to the browser. `.env.local` is gitignored and must never be committed. If the key is missing, the Ask-AI widget automatically runs in keyword-only fallback mode — the rest of the site is unaffected.

---

## Deployment (Vercel)

1. Import the repo at https://vercel.com (it auto-detects Next.js — defaults are fine).
2. Add the environment variable in **Project → Settings → Environment Variables**:
   - `GEMINI_API_KEY` = your key (Production scope).
3. Deploy. Every push to `main` then auto-redeploys.

> Environment variable changes only apply to **new** deployments — redeploy after adding or editing one.

---

## Customizing

- **Bot knowledge / tone:** edit the `SYSTEM` prompt in `app/api/ask/route.ts`.
- **Bot fallback answers & section routing:** edit the `INTENTS` array in `components/AskAI.tsx`.
- **Content:** project cards live in `components/Projects.tsx`; the career timeline in the `NODES` array in `components/Timeline.tsx`; skills in the `TOOLS` array in `components/Skills.tsx`; interests in `components/Interests.tsx`.
- **Theme:** all colors are CSS variables at the top of `app/globals.css`.
- **GitHub feed:** set the `USER` constant in `components/GitHubActivity.tsx`.

---

## Credits

- Tool logos via [Simple Icons](https://simpleicons.org/).
- Fonts: Schibsted Grotesk & Martian Mono (Google Fonts).
- AI: Google Gemini API. Activity data: GitHub REST API.

---

## License

MIT — feel free to take inspiration. If you reuse the structure, a credit is appreciated.

---

## Contact

**Nandana Pradeep** — M.S. Computer Science, Northeastern University · Boston, MA
Open to SWE internships (summer/fall 2026).

- Portfolio: https://personal-website-nandana.vercel.app/
- LinkedIn: https://www.linkedin.com/in/nandana-pradeep-b5a250302
- GitHub: https://github.com/Nandana-125
- Email: nandana.pradeep125@gmail.com
