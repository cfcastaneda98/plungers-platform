"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CategoryCarousel from "@/components/sections/CategoryCarousel";

export default function Categories() {
  const router = useRouter();

  return (
    <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
      <div className="section-pad" style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "80px", paddingRight: "80px" }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{
            color: "#006f6b",
            fontWeight: 700,
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: "0.75rem",
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Browse By Type
          </p>
          <h2 style={{
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 900,
            color: "#062626",
            fontFamily: "'Montserrat', sans-serif",
            lineHeight: 1.2,
          }}>
            Ways to connect locally
          </h2>
        </div>

        <CategoryCarousel
          onSelect={(slug) => router.push(`/experiences?category=${slug}`)}
        />

        {/* View All CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
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
            View All →
          </Link>
        </div>

      </div>
    </section>
  );
}