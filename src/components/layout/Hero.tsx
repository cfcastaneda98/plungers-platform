"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const TRUST_BADGES = [
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    label: "Handpicked Experiences"
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: "Local Expert Hosts"
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    label: "Verified Reviews"
  },
  {
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    label: "No Hidden Fees"
  },
];

export default function Hero() {
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSearch = () => {
    router.push(
      search.trim()
        ? `/experiences?search=${encodeURIComponent(search)}`
        : "/experiences"
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const sidePadding = isMobile ? "24px" : "80px";

  return (
    <section style={{ position: "relative", minHeight: "92vh", display: "flex", flexDirection: "column" }}>

      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('images/group-of-people-with-backpacks-looking-at-beautifu-2026-03-10-22-29-56-utc.jpg')",
        backgroundSize: "cover", backgroundPosition: "center",
      }} />

      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(6,38,38,0.88) 0%, rgba(6,38,38,0.65) 50%, rgba(0,111,107,0.3) 100%)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", alignItems: "center" }}>
        <div style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          paddingLeft: sidePadding,
          paddingRight: sidePadding,
          paddingTop: isMobile ? "100px" : "120px",
          paddingBottom: "40px",
        }}>

          {/* Eyebrow */}
          <p style={{
            color: "#89e3d5", fontWeight: 700,
            fontSize: "0.7rem", textTransform: "uppercase",
            letterSpacing: "0.2em", marginBottom: "1.25rem",
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Plunge Into A World Of Change
          </p>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? "2.1rem" : "clamp(2.4rem, 4vw, 3.2rem)",
            fontWeight: 900, color: "white",
            lineHeight: 1.15, marginBottom: "1.25rem",
            paddingRight: isMobile ? "100px" : "200px",
          }}>
            Travel deeper,{" "}
            <span style={{ color: "#89e3d5" }}>Connect</span> locally.
          </h1>

          {/* Subheadline */}
          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: isMobile ? "0.875rem" : "1rem",
            lineHeight: 1.7, marginBottom: "2rem",
            maxWidth: "520px", fontWeight: 500,
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Experience local life through the people, traditions, and stories that
            make each every place unique.
          </p>

          {/* Search Bar */}
          <div style={{
            display: "flex", alignItems: "center",
            backgroundColor: "white",
            borderRadius: "9999px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.22)",
            overflow: "hidden",
            width: "100%",
            maxWidth: isMobile ? "100%" : "680px",
          }}>
            {!isMobile && (
              <div style={{ display: "flex", alignItems: "center", paddingLeft: "1.5rem", color: "#9ca3af", flexShrink: 0 }}>
                <Search size={18} />
              </div>
            )}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Where would you like to experience local life?"
              style={{
                flex: 1,
                padding: isMobile ? "1rem 1rem" : "1.25rem 1rem",
                fontSize: "0.875rem",
                color: "#374151", outline: "none",
                background: "transparent", fontWeight: 500,
                fontFamily: "'Montserrat', sans-serif",
                minWidth: 0,
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                backgroundColor: "#006f6b",
                borderRadius: "9999px",
                margin: "6px",
                paddingLeft: isMobile ? "1.25rem" : "2rem",
                paddingRight: isMobile ? "1.25rem" : "2rem",
                paddingTop: isMobile ? "0.75rem" : "1rem",
                paddingBottom: isMobile ? "0.75rem" : "1rem",
                color: "white", fontWeight: 700,
                fontSize: "0.875rem", whiteSpace: "nowrap",
                transition: "background-color 0.2s",
                border: "none", cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#00534d")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#006f6b")}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div style={{
        position: "relative", zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderTop: "1px solid rgba(255, 255, 255, 0)",
      }}>
        <div style={{
          maxWidth: "1280px", margin: "0 auto",
          paddingLeft: sidePadding, paddingRight: sidePadding,
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          }}>
            {TRUST_BADGES.map((badge, index) => (
              <div
                key={badge.label}
                style={{
                  display: "flex", alignItems: "center",
                  gap: "0.75rem", color: "white",
                  paddingTop: "1rem", paddingBottom: "1rem",
                  paddingLeft: isMobile ? "0.5rem" : (index === 0 ? "0" : "1.5rem"),
                  paddingRight: isMobile ? "0.5rem" : (index === 3 ? "0" : "1.5rem"),
                  borderRight: isMobile
                    ? (index % 2 === 0 ? "1px solid rgba(255,255,255,0.15)" : "none")
                    : (index < 3 ? "1px solid rgba(255,255,255,0.15)" : "none"),
                  borderBottom: isMobile && index < 2
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "none",
                }}
              >
                <span style={{ color: "white", flexShrink: 0 }}>{badge.icon}</span>
                <span style={{
                  fontSize: isMobile ? "0.9rem" : "1.1rem",
                  fontWeight: 600, color: "white",
                  fontFamily: "'Montserrat', sans-serif",
                }}>
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}