"use client";

import Link from "next/link";
import { Check } from "lucide-react";

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
  return (
    <main className="auth-layout" style={{ fontFamily: font }}>

      {/* Image pane — same dark-teal gradient treatment as the Experiences search header */}
      <div className="auth-layout-image" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(6,38,38,0.95) 0%, rgba(6,38,38,0.75) 45%, rgba(0,111,107,0.45) 100%)",
        }} />

        <div style={{
          position: "relative", zIndex: 1, height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "6rem",
        }}>

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

          {/* Spacer to balance the flex column */}
          <div />
        </div>
      </div>

      {/* Form pane */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "24px", backgroundColor: "#f4f7f7",
      }}>
        {children}
      </div>
    </main>
  );
}
