"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : menuOpen ? "bg-white shadow-sm md:bg-transparent md:shadow-none" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between py-5">

          {/* Logo — left aligned, larger */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src={scrolled || menuOpen
                ? "/images/plungers-logo-dark.svg"
                : "/images/plungers-logo.svg"
              }
              alt="Plungers"
              className="h-32 w-auto transition-all duration-300"
            />
          </Link>

          {/* Right side — nav links + actions */}
          <div className="hidden md:flex items-center gap-10">

            {/* Nav Links */}
            <nav className="flex items-center gap-10">
              {[
                { label: "Experiences", href: "/experiences" },
                { label: "How It Works", href: "/#how-it-works" },
                { label: "Become a Host", href: "/apply" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                    scrolled ? "text-[#062626]" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Language Switcher */}
            <LanguageSwitcher scrolled={scrolled} />

            {/* Divider */}
            <div className={`w-px h-5 ${scrolled ? "bg-[#062626]/20" : "bg-white/30"}`} />
            {/* Auth Actions */}
                  {user ? (
                    <div className="flex items-center gap-6">
                      <Link
                        href="/dashboard?tab=saved"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:opacity-70 ${
                          scrolled ? "text-[#062626]" : "text-white"
                        }`}
                      >
                        <Heart size={15} />
                        Saved
                      </Link>
                      <Link
                        href="/dashboard"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:opacity-70 ${
                          scrolled ? "text-[#062626]" : "text-white"
                        }`}
                      >
                        <User size={15} />
                        My Account
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:opacity-70 ${
                          scrolled ? "text-[#062626]" : "text-white"
                        }`}
                      >
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-6">
                      <Link
                        href="/auth/login"
                        className={`text-sm font-medium transition-colors duration-300 hover:opacity-70 ${
                          scrolled ? "text-[#062626]" : "text-white"
                        }`}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/apply"
                        onMouseEnter={() => setButtonHovered(true)}
                        onMouseLeave={() => setButtonHovered(false)}
                        style={{
                          paddingLeft: "2.25rem",
                          paddingRight: "2.25rem",
                          paddingTop: "0.875rem",
                          paddingBottom: "0.875rem",
                          borderRadius: "9999px",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          transition: "all 0.2s",
                          backgroundColor: scrolled
                            ? buttonHovered ? "#00534d" : "#006f6b"
                            : buttonHovered ? "rgba(6, 38, 38, 0.9)" : "rgba(6, 38, 38, 0.7)",
                          color: "white",
                          backdropFilter: "blur(4px)",
                          border: scrolled ? "none" : "1px solid rgba(255,255,255,0.1)",
                          whiteSpace: "nowrap" as const,
                        }}
                      >
                        List Your Experience
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Button */}
                <button
                  className="md:hidden p-2 mr-1"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? (
                    <X size={22} className={scrolled || menuOpen ? "text-[#062626]" : "text-white"} />
                  ) : (
                    <Menu size={22} className={scrolled ? "text-[#062626]" : "text-white"} />
                  )}
                </button>
              </div>

              {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white flex flex-col" style={{ borderTop: "1px solid #f0f0f0" }}>
          {[
            { label: "Experiences", href: "/experiences" },
            { label: "How It Works", href: "/#how-it-works" },
            { label: "Become a Host", href: "/apply" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "1.1rem 1.5rem",
                color: "#062626",
                fontWeight: 500,
                fontSize: "1rem",
                borderBottom: "1px solid #f0f0f0",
                textDecoration: "none",
                fontFamily: "'Montserrat', sans-serif",
                backgroundColor: "white",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Language Switcher */}
          <LanguageSwitcher variant="mobile" />

          {/* Divider */}
          <div style={{ height: "8px", backgroundColor: "#f8f8f8", borderBottom: "1px solid #f0f0f0" }} />

          {user ? (
            <>
              <Link
                href="/dashboard?tab=saved"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "1.1rem 1.5rem",
                  color: "#062626",
                  fontWeight: 500,
                  fontSize: "1rem",
                  borderBottom: "1px solid #f0f0f0",
                  textDecoration: "none",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Saved
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "1.1rem 1.5rem",
                  color: "#062626",
                  fontWeight: 500,
                  fontSize: "1rem",
                  borderBottom: "1px solid #f0f0f0",
                  textDecoration: "none",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                My Account
              </Link>
              <button
                onClick={handleSignOut}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "1.1rem 1.5rem",
                  color: "#062626",
                  fontWeight: 500,
                  fontSize: "1rem",
                  borderBottom: "1px solid #f0f0f0",
                  backgroundColor: "white",
                  border: "none",
                  fontFamily: "'Montserrat', sans-serif",
                  cursor: "pointer",
                } as React.CSSProperties}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "1.1rem 1.5rem",
                color: "#062626",
                fontWeight: 500,
                fontSize: "1rem",
                borderBottom: "1px solid #f0f0f0",
                textDecoration: "none",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Sign In
            </Link>
          )}

          {/* CTA Button */}
          <div style={{ padding: "1rem 1.5rem" }}>
            <Link
              href="/apply"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                backgroundColor: "#006f6b",
                color: "white",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "1rem",
                borderRadius: "9999px",
                textDecoration: "none",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              List Your Experience
            </Link>
          </div>
        </div>
      )}
      </div>
    </header>
  );
}