"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const font = "'Montserrat', sans-serif";

interface AuthLayoutProps {
  eyebrow: string
  headline: string
  subtext: string
  bullets: string[]
  imageUrl: string
  children: React.ReactNode
}

export default function AuthLayout({ eyebrow, headline, subtext, bullets, imageUrl, children }: AuthLayoutProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let ticking = false;

    const updateParallax = () => {
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const offset = Math.max(-18, Math.min(18, -rect.top * 0.06));

      el.style.transform = `translate3d(0, ${offset}px, 0)`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <main className="auth-layout" style={{ fontFamily: font }}>

      {/* Image pane — same dark-teal gradient treatment as the Experiences search header */}
      <div className="auth-layout-image" style={{ position: "relative", overflow: "hidden" }}>
        <div
          ref={imageRef}
          style={{
            position: "absolute",
            inset: "-18px 0",
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(6,38,38,0.95) 0%, rgba(6,38,38,0.75) 45%, rgba(0,111,107,0.45) 100%)",
        }} />

        <div style={{
          position: "relative", zIndex: 1, height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "6rem",
        }}>
          <Reveal distance={14} delay={0}>
          <div>
            <p style={{ color: "#89e3d5", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.875rem" }}>
              {eyebrow}
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 900, color: "white", lineHeight: 1.2, marginBottom: "1rem", fontFamily: font }}>
              {headline}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", fontWeight: 500, lineHeight: 1.6, marginBottom: "2rem", maxWidth: "420px" }}>
              {subtext}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {bullets.map((bullet) => (
                <div key={bullet} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%",
                    backgroundColor: "rgba(137,227,213,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Check size={12} color="#89e3d5" strokeWidth={3} />
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", fontWeight: 600 }}>
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>    
          </Reveal>    
          {/* Spacer to balance the flex column */}
          <div />
        </div>
      </div>

      {/* Form pane */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundColor: "#f4f7f7",
      }}>
        <Reveal distance={12} delay={0}>
          {children}
        </Reveal>
      </div>
    </main>
  );
}
