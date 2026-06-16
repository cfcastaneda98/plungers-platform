"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

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
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between py-5">

          {/* Logo — left aligned, larger */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src={scrolled
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
                { label: "For Businesses", href: "/apply" },
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

            {/* Divider */}
            <div className={`w-px h-5 ${scrolled ? "bg-[#062626]/20" : "bg-white/30"}`} />
            {/* Auth Actions */}
            {user ? (
              <div className="flex items-center gap-6">
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
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={22} className={scrolled ? "text-[#062626]" : "text-white"} />
            ) : (
              <Menu size={22} className={scrolled ? "text-[#062626]" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[#e0f0ef] py-6 px-6 flex flex-col gap-1">
            {[
              { label: "Experiences", href: "/experiences" },
              { label: "How It Works", href: "/#how-it-works" },
              { label: "For Businesses", href: "/apply" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#062626] font-medium py-3 px-5 rounded-xl hover:bg-[#f4fafa] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-[#e0f0ef] my-2 mx-4" />
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-[#062626] font-medium py-3 px-4 rounded-xl hover:bg-[#f4fafa] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-left text-[#062626] font-medium py-3 px-4 rounded-xl hover:bg-[#f4fafa] transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-[#062626] font-medium py-3 px-4 rounded-xl hover:bg-[#f4fafa] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/apply"
                  className="bg-[#006f6b] text-white text-center font-semibold px-6 py-3.5 rounded-full mt-2 hover:bg-[#00534d] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  List Your Experience
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}