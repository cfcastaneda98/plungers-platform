"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

// NOTE: This is a UI stub. It does not translate any page content yet —
// that's a separate, larger i18n build (routing, translation files, per-page
// content). Selecting a language here just persists the preference locally
// so we have somewhere to hook in real translation later without redoing
// this component. See conversation notes re: "Spanish (Mexican) fast-follow".
const LANGUAGES = [
  { code: "en", shortLabel: "EN", label: "English" },
  { code: "es-mx", shortLabel: "ES", label: "Español (México)", comingSoon: true },
] as const;

const STORAGE_KEY = "plungers_locale";

interface LanguageSwitcherProps {
  /** Whether the parent nav is in its "scrolled" (white bg, dark text) state. Ignored for variant="mobile". */
  scrolled?: boolean
  variant?: "desktop" | "mobile"
}

export default function LanguageSwitcher({ scrolled = true, variant = "desktop" }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<string>("en");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reading localStorage after mount (rather than as a lazy useState initializer)
    // is intentional here: it keeps server-rendered and first-client-render output
    // identical ("en"), avoiding a hydration mismatch, then syncs the real
    // preference in immediately after.
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setLocale(saved);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectLocale(code: string) {
    setLocale(code);
    setOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, code);
    }
    // Real locale switching (route/content) hooks in here once i18n is built.
  }

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  if (variant === "mobile") {
    return (
      <div style={{ padding: "1.1rem 1.5rem", borderBottom: "1px solid #f0f0f0" }}>
        <p style={{
          fontSize: "0.7rem", fontWeight: 700, color: "#8a9e9e",
          textTransform: "uppercase", letterSpacing: "0.1em",
          marginBottom: "0.75rem", fontFamily: "'Montserrat', sans-serif",
        }}>
          Language
        </p>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLocale(lang.code)}
              style={{
                flex: 1, padding: "0.65rem 0.75rem", borderRadius: "10px",
                border: locale === lang.code ? "1.5px solid #006f6b" : "1.5px solid #e0eeee",
                backgroundColor: locale === lang.code ? "rgba(0,111,107,0.06)" : "white",
                color: "#062626", fontSize: "0.8rem", fontWeight: 600,
                fontFamily: "'Montserrat', sans-serif", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem",
              }}
            >
              {lang.label}
              {"comingSoon" in lang && lang.comingSoon && (
                <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "#9d691d" }}>
                  Coming soon
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const textColor = scrolled ? "#062626" : "white";

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        style={{
          display: "flex", alignItems: "center", gap: "0.35rem",
          background: "none", border: "none", cursor: "pointer",
          color: textColor, fontSize: "0.85rem", fontWeight: 600,
          fontFamily: "'Montserrat', sans-serif", padding: "0.25rem 0",
          transition: "opacity 0.2s",
        }}
      >
        <Globe size={15} />
        {current.shortLabel}
        <ChevronDown size={13} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 14px)", right: 0,
          backgroundColor: "white", borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.14)", border: "1px solid #eef2f2",
          minWidth: "200px", overflow: "hidden", zIndex: 60,
        }}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLocale(lang.code)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "0.8rem 1rem", background: "none", border: "none",
                cursor: "pointer", fontFamily: "'Montserrat', sans-serif", textAlign: "left",
              }}
            >
              <span>
                <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#062626" }}>
                  {lang.label}
                </span>
                {"comingSoon" in lang && lang.comingSoon && (
                  <span style={{ fontSize: "0.68rem", color: "#9d691d", fontWeight: 600 }}>
                    Translation coming soon
                  </span>
                )}
              </span>
              {locale === lang.code && <Check size={15} color="#006f6b" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
