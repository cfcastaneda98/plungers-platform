"use client";

import Link from "next/link";

const FOOTER_LINKS = {
  Explore: [
    { label: "All Experiences", href: "/experiences" },
    { label: "Food & Drink", href: "/experiences?category=food-drink" },
    { label: "Outdoor Adventures", href: "/experiences?category=outdoor" },
    { label: "Arts & Crafts", href: "/experiences?category=arts-crafts" },
    { label: "Cultural Experiences", href: "/experiences?category=culture" },
  ],
  "For Hosts": [
    { label: "List Your Experience", href: "/apply" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Host Guidelines", href: "/apply" },
    { label: "Become a Host", href: "/apply" },
  ],
  Company: [
    { label: "About Us", href: "/" },
    { label: "Contact", href: "/" },
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
    { label: "Sustainability", href: "/" },
  ],
};

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#062626" }}>

      {/* CTA Banner */}
      <div style={{ padding: "2rem 80px", backgroundColor: "#ffffff"}}>
        <div className="footer-cta" style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            gap: "2rem",
          }}>
          {/* Background Image */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('images/group-of-people-with-backpacks-looking-at-beautifu-2026-03-10-22-29-56-utc.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }} />
          {/* Dark Overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(6,38,38,0.82)",
          }} />

          {/* Text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{
              fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
              fontWeight: 900,
              color: "white",
              fontFamily: "'Montserrat', sans-serif",
              marginBottom: "0.5rem",
              lineHeight: 1.2,
            }}>
              Ready to plunge in?
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "0.9rem",
              fontWeight: 500,
              fontFamily: "'Montserrat', sans-serif",
            }}>
              Discover authentic experiences with local hosts around the world.
            </p>
          </div>

          {/* Button */}
          <Link
            href="/apply"
            style={{
              position: "relative",
              zIndex: 1,
              flexShrink: 0,
              backgroundColor: "#006f6b",
              color: "white",
              fontWeight: 700,
              fontSize: "0.875rem",
              padding: "1rem 2.30rem",
              borderRadius: "9999px",
              fontFamily: "'Montserrat', sans-serif",
              textDecoration: "none",
              transition: "background-color 0.2s",
              overflow: "hidden",
              display: "block",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#00534d"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#006f6b"}
          >
            Become a Host →
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-pad" style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "80px", paddingRight: "80px" }}>
        <div className="footer-grid" style={{ gap: "2rem" }}>
          {/* Brand Column */}
          <div>
            <Link href="/" style={{ display: "block", marginBottom: "1.25rem" }}>
              <img
                src="/images/plungers-logo.svg"
                alt="Plungers"
                style={{ height: "120px", width: "auto" }}
              />
            </Link>
            <p style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.8rem",
              fontWeight: 500,
              fontFamily: "'Montserrat', sans-serif",
              marginBottom: "0.25rem",
            }}>
              Viaje, Aventura y Altruismo
            </p>
            <p style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.75rem",
              fontStyle: "italic",
              fontFamily: "'Montserrat', sans-serif",
              marginBottom: "1.75rem",
            }}>
              &quot;Plunge Into A World Of Change&quot;
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#006f6b"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 style={{
                fontWeight: 700,
                color: "white",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginTop: "1.25rem",
                marginBottom: "1.25rem",
                fontFamily: "'Montserrat', sans-serif",
              }}>
                {heading}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        fontFamily: "'Montserrat', sans-serif",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "#89e3d5"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom" style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.25rem 24px",
          alignItems: "center",
        }}>
        {/* Left — Legal Links */}
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy Policy", "Terms of Service"].map((label) => (
            <Link
              key={label}
              href="/"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.75rem",
                fontWeight: 500,
                fontFamily: "'Montserrat', sans-serif",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Center — Copyright */}
        <p style={{
          color: "rgba(255,255,255,0.35)",
          fontSize: "0.75rem",
          fontWeight: 400,
          fontFamily: "'Montserrat', sans-serif",
          textAlign: "center",
        }}>
          © {new Date().getFullYear()} Plungers Cultural Immersions. All rights reserved.
        </p>

        {/* Right — Built by */}
        <p style={{
          color: "rgba(255,255,255,0.35)",
          fontSize: "0.75rem",
          fontWeight: 400,
          fontFamily: "'Montserrat', sans-serif",
          textAlign: "right",
        }}>
          Built by{" "}
          <span style={{ color: "#89e3d5", fontWeight: 700 }}>
            Element Seven
          </span>
        </p>
      </div>

    </footer>
  );
}