"use client";

import Link from "next/link";
import { Search, CalendarCheck, Smile } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Discover Experiences",
    description: "Browse authentic local experiences by location, category, or theme. Find exactly what excites you.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Book Instantly",
    description: "Select your date, confirm your spot, and pay securely — all in a few clicks. No back-and-forth needed.",
  },
  {
    icon: Smile,
    step: "03",
    title: "Live the Experiences",
    description: "Show up and immerse yourself. Your local host takes care of the rest. Leave with memories that last.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{ padding: "5rem 0", backgroundColor: "white" }}
    >
      <div className="section-pad" style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "80px", paddingRight: "80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3.5rem" }}>
          <p style={{
            color: "#006f6b",
            fontWeight: 700,
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: "0.75rem",
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Simple Process
          </p>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            fontWeight: 900,
            color: "#062626",
            fontFamily: "'Montserrat', sans-serif",
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}>
            How Plungers works
          </h2>
          <p style={{
            color: "rgba(6,38,38,0.55)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            fontWeight: 500,
            fontFamily: "'Montserrat', sans-serif",
          }}>
            From discovery to experience — we make it effortless to connect with local hosts
            and book something unforgettable
          </p>
        </div>

        <div className="steps-grid" style={{ gap: "1.5rem", marginBottom: "3rem" }}>
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                style={{
                  backgroundColor: "white",
                  border: "1.5px solid #e8eeee",
                  borderRadius: "20px",
                  padding: "2.5rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
                  e.currentTarget.style.borderColor = "#006f6b";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#e8eeee";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Step Number — large faded behind icon */}
                <div style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "1.5rem",
                  marginBottom: "1.5rem",
                  width: "100%",
                  height: "100px",
                }}>
                  {/* Faded number */}
                  <span style={{
                    position: "absolute",
                    fontSize: "5.5rem",
                    fontWeight: 900,
                    color: "rgba(0,111,107,0.12)",
                    fontFamily: "'Montserrat', sans-serif",
                    lineHeight: 1,
                    userSelect: "none",
                    top: "1%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 0,
                  }}>
                    {step.step}
                  </span>

                  {/* Icon Container */}
                  <div style={{
                    position: "relative",
                    zIndex: 1,
                    width: "68px",
                    height: "68px",
                    backgroundColor: "#00534d",
                    borderRadius: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(6,38,38,0.25)",
                  }}>
                    <Icon size={26} color="white" />
                  </div>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "#062626",
                  fontFamily: "'Montserrat', sans-serif",
                  marginBottom: "0.875rem",
                  lineHeight: 1.3,
                }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: "0.875rem",
                  color: "rgba(6,38,38,0.55)",
                  lineHeight: 1.7,
                  fontWeight: 500,
                  fontFamily: "'Montserrat', sans-serif",
                }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/experiences"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              border: "1.5px solid #062626",
              color: "#062626",
              fontWeight: 600,
              fontSize: "0.875rem",
              padding: "0.875rem 2.5rem",
              borderRadius: "9999px",
              fontFamily: "'Montserrat', sans-serif",
              transition: "all 0.2s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#062626";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#062626";
            }}
          >
            Start Exploring →
          </Link>
        </div>

      </div>
    </section>
  );
}