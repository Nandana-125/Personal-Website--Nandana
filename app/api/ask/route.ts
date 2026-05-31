import { NextRequest, NextResponse } from "next/server";

const SYSTEM = `You are the friendly assistant on Nandana Pradeep's portfolio website. Answer questions about Nandana concisely (2-4 sentences) in a warm, slightly witty tone. Speak about her in the third person. Only answer questions about Nandana — her work, skills, projects, or how to contact her. If asked something unrelated or that you don't know, say so briefly and point them to the contact section. Never invent facts.

About Nandana:
- A software engineer who works across the full stack — clean frontends on top, MLOps and observability underneath.
- Pursuing an M.S. in Computer Science at Northeastern University (expected 2027), based in Boston. Open to SWE internships for summer/fall 2026.
- Projects: Foresight (an MLOps data pipeline for early warning of corporate financial distress — Airflow, GCP/BigQuery, DVC, ingesting SEC + FRED data); SignLingo (a full-stack ASL learning app with lessons, quizzes, and live webcam sign practice — React, Node/Express, MongoDB, FastAPI); Sooner (a real-time virtual walk-in queue manager — Node/Express, MongoDB, vanilla JS).
- Skills: Python, TypeScript, Java, C++; React, Next.js, FastAPI; AWS, GCP, Docker, Kubernetes, Terraform; PostgreSQL, MongoDB, Airflow, DVC.
- Outside work: painting & graphic design, exploring the city and trying new food, building side projects, gaming, and rewatching The Office.
- To reach her: the Contact section has her email, LinkedIn, GitHub, and a message form.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const key = process.env.GEMINI_API_KEY;
    if (!key)
      return NextResponse.json({ error: "missing key" }, { status: 500 });

    const contents = (messages || [])
      .map((m: { from: string; text: string }) => ({
        role: m.from === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }))
      .filter((c: { parts: { text: string }[] }) => c.parts[0].text?.trim());

    while (contents.length && contents[0].role === "model") contents.shift();
    if (!contents.length)
      return NextResponse.json({ error: "empty" }, { status: 400 });

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM }] },
          contents,
          generationConfig: {
            maxOutputTokens: 400,
            temperature: 0.6,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      }
    );

    if (!res.ok)
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!reply)
      return NextResponse.json({ error: "no reply" }, { status: 502 });
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
