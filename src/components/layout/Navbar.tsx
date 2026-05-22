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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
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
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-18 py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src={scrolled
                ? "/images/plungers-logo-dark.svg"
                : "/images/plungers-logo.svg"
              }
              alt="Plungers"
              className="h-10 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: "Experiences", href: "/experiences" },
              { label: "How It Works", href: "/#how-it-works" },
              { label: "For Businesses", href: "/apply" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors duration-300 hover:opacity-70 ${
                  scrolled ? "text-[#062626]" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-5">
            {user ? (
              // Logged in state
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 hover:opacity-70 ${
                    scrolled ? "text-[#062626]" : "text-white"
                  }`}
                >
                  <User size={16} />
                  My Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 hover:opacity-70 ${
                    scrolled ? "text-[#062626]" : "text-white"
                  }`}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            ) : (
              // Logged out state
              <>
                <Link
                  href="/auth/login"
                  className={`text-sm font-semibold transition-colors duration-300 hover:opacity-70 ${
                    scrolled ? "text-[#062626]" : "text-white"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/apply"
                  className="bg-[#006f6b] hover:bg-[#00534d] text-white text-sm font-bold px-6 py-3 rounded-full transition-colors duration-200 tracking-wide"
                >
                  List Your Experience
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={24} className={scrolled ? "text-[#062626]" : "text-white"} />
            ) : (
              <Menu size={24} className={scrolled ? "text-[#062626]" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[#e0f0ef] py-5 px-2 flex flex-col gap-4">
            {[
              { label: "Experiences", href: "/experiences" },
              { label: "How It Works", href: "/#how-it-works" },
              { label: "For Businesses", href: "/apply" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#062626] font-semibold py-2 px-3 rounded-lg hover:bg-[#f4fafa]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-[#062626] font-semibold py-2 px-3 rounded-lg hover:bg-[#f4fafa]"
                  onClick={() => setMenuOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-left text-[#062626] font-semibold py-2 px-3 rounded-lg hover:bg-[#f4fafa]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-[#062626] font-semibold py-2 px-3 rounded-lg hover:bg-[#f4fafa]"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/apply"
                  className="bg-[#006f6b] text-white text-center font-bold px-6 py-3 rounded-full mt-2"
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