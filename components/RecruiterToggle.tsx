"use client";

export default function RecruiterToggle() {
  return (
    <button
      className="rtoggle"
      onClick={() => document.body.classList.toggle("recruiter")}
    >
      <span className="switch" />
      recruiter mode
    </button>
  );
}
