"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Plungers
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Experiences", href: "/experiences" },
              { label: "How It Works", href: "/#how-it-works" },
              { label: "For Businesses", href: "/apply" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 hover:opacity-70 ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className={`text-sm font-medium transition-colors duration-300 hover:opacity-70 ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/apply"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-200"
            >
              List Your Experience
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`text-2xl ${scrolled ? "text-gray-900" : "text-white"}`}
            >
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t py-4 px-4 flex flex-col gap-4">
            <Link href="/experiences" className="text-gray-700 font-medium">
              Experiences
            </Link>
            <Link href="/#how-it-works" className="text-gray-700 font-medium">
              How It Works
            </Link>
            <Link href="/apply" className="text-gray-700 font-medium">
              For Businesses
            </Link>
            <Link href="/auth/login" className="text-gray-700 font-medium">
              Sign In
            </Link>
            <Link
              href="/apply"
              className="bg-orange-500 text-white text-center font-semibold px-4 py-2 rounded-full"
            >
              List Your Experience
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}