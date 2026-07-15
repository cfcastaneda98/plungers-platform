"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Globe, ChevronDown, Check } from "lucide-react";

// This now drives real translations via next-intl (see src/i18n/request.ts).
// The locale lives in a cookie — not localStorage — because most of the site
// renders as Server Components, which can only read cookies, not browser
// storage. Selecting a language sets the cookie and refreshes the current
// route so the server re-renders with the new locale.
const LANGUAGES = [
  { code: "en", shortLabel: "EN", label: "English" },
  { code: "es-mx", shortLabel: "ES", label: "Español (México)" },
] as const;

const COOKIE_NAME = "locale";

function setLocaleCookie(code: string) {
  document.cookie = `${COOKIE_NAME}=${code}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

interface LanguageSwitcherProps {
  /** Whether the parent nav is in its "scrolled" (white bg, dark text) state. Ignored for variant="mobile". */
  scrolled?: boolean
  variant?: "desktop" | "mobile"
  currentLocale?: string
}

export default function LanguageSwitcher({ scrolled = true, variant = "desktop", currentLocale = "en" }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations("common");

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
    setOpen(false);
    if (code === currentLocale) return;
    setLocaleCookie(code);
    router.refresh();
  }

  const current = LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0];

  if (variant === "mobile") {
    return (
      <div style={{ padding: "1.1rem 1.5rem", borderBottom: "1px solid #f0f0f0" }}>
        <p style={{
          fontSize: "0.7rem", fontWeight: 700, color: "#8a9e9e",
          textTransform: "uppercase", letterSpacing: "0.1em",
          marginBottom: "0.75rem", fontFamily: "'Montserrat', sans-serif",
        }}>
          {t("language")}
        </p>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLocale(lang.code)}
              style={{
                flex: 1, padding: "0.65rem 0.75rem", borderRadius: "10px",
                border: currentLocale === lang.code ? "1.5px solid #006f6b" : "1.5px solid #e0eeee",
                backgroundColor: currentLocale === lang.code ? "rgba(0,111,107,0.06)" : "white",
                color: "#062626", fontSize: "0.8rem", fontWeight: 600,
                fontFamily: "'Montserrat', sans-serif", cursor: "pointer",
              }}
            >
              {lang.label}
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
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#062626" }}>
                {lang.label}
              </span>
              {currentLocale === lang.code && <Check size={15} color="#006f6b" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
