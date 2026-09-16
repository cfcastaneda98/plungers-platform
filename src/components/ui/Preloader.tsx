"use client";

import { useEffect, useRef, useState } from "react";

// Keep these in sync with the durations in the .preloader-icon--revealing
// animation and .preloader-overlay transition in globals.css.
const REVEAL_MS = 1300;
const HOLD_MS = 350;
const FADE_MS = 500;
const SESSION_KEY = "plungers-preloader-shown";

type Phase = "checking" | "revealing" | "leaving" | "done";

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("checking");
  const started = useRef(false);

  useEffect(() => {
    // Dev-mode Strict Mode runs this effect twice on mount. Guard so the
    // sessionStorage write + timer scheduling only ever happens once.
    if (started.current) return;
    started.current = true;

    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (alreadyShown || prefersReduced) {
      // Never render the overlay at all for a skip — no flash.
      setTimeout(() => setPhase("done"), 0);
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    setTimeout(() => setPhase("revealing"), 0);
    setTimeout(() => setPhase("leaving"), REVEAL_MS + HOLD_MS);
    setTimeout(() => setPhase("done"), REVEAL_MS + HOLD_MS + FADE_MS);
  }, []);

  // Nothing renders during "checking" or once "done" — a skip is silent.
  if (phase === "checking" || phase === "done") return null;

  return (
    <div
      className={`preloader-overlay${
        phase === "leaving" ? " preloader-overlay--out" : ""
      }`}
      aria-hidden="true"
    >
      <img
        src="/images/plungers-icon-mark.svg"
        alt=""
        width={130}
        height={200}
        className="preloader-icon preloader-icon--revealing"
      />
    </div>
  );
}