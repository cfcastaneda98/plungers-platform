"use client";

import Link from "next/link";
import { MapPin, Clock, Users } from "lucide-react";
import { Experience } from "@/lib/types";

const CATEGORY_IMAGES: { [key: string]: string } = {
  'Food & Drink': 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=600&q=80',
  'Outdoor Adventures': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
  'Arts & Crafts': 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
  'Music & Shows': 'https://images.unsplash.com/photo-1545959570-a94084071b5d?w=600&q=80',
  'Water Sports': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
  'default': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  if (remaining === 0) return `${hours} Hours`
  return `${hours}h ${remaining}min`
}

function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <Link
      href={`/experiences/${exp.id}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1.5px solid #e8eeee",
          transition: "all 0.25s ease",
          cursor: "pointer",
          height: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.borderColor = "#006f6b";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "#e8eeee";
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
          <img
            src={
              exp.cover_image_url ||
              CATEGORY_IMAGES[exp.category] ||
              CATEGORY_IMAGES['default']
            }
            alt={exp.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          />
          {/* Category Badge */}
          <div style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            backgroundColor: "rgba(0,83,77,100)",
            backdropFilter: "blur(4px)",
            color: "#ffffff",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "5px 12px",
            borderRadius: "9999px",
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "0.02em",
          }}>
            {exp.category}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.25rem 1.25rem 1rem" }}>

          {/* Meta Row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "0.75rem",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#006f6b", fontSize: "0.72rem", fontWeight: 600 }}>
              <MapPin size={11} />
              {exp.city}, {exp.country}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#6b8080", fontSize: "0.72rem", fontWeight: 500 }}>
              <Clock size={11} />
              {formatDuration(exp.duration_minutes)}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#6b8080", fontSize: "0.72rem", fontWeight: 500 }}>
              <Users size={11} />
              Max {exp.max_guests}
            </span>
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: "1rem",
            fontWeight: 800,
            color: "#062626",
            lineHeight: 1.35,
            marginBottom: "1rem",
            fontFamily: "'Montserrat', sans-serif",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}>
            {exp.title}
          </h3>

          {/* Footer — Rating + Price */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.75rem",
            borderTop: "1px solid #e8eeee",
          }}>
            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{
                fontSize: "1.4rem",
                fontWeight: 900,
                color: "#00534d",
                fontFamily: "'Montserrat', sans-serif",
                lineHeight: 1,
              }}>
                {exp.average_rating.toFixed(1)}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#9d691d">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span style={{ fontSize: "0.75rem", color: "#8a9e9e", fontWeight: 500 }}>
                ({exp.total_reviews})
              </span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span style={{ fontSize: "0.75rem", color: "#8a9e9e", fontWeight: 500 }}>from</span>
              <span style={{
                fontSize: "1.5rem",
                fontWeight: 900,
                color: "#00534d",
                fontFamily: "'Montserrat', sans-serif",
                lineHeight: 1,
              }}>
                ${exp.price}
              </span>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
}

interface FeaturedExperiencesProps {
  experiences: Experience[]
}

export default function FeaturedExperiences({ experiences }: FeaturedExperiencesProps) {
  if (!experiences || experiences.length === 0) {
    return (
      <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "80px", paddingRight: "80px", textAlign: "center" }}>
          <p style={{ color: "rgba(6,38,38,0.4)", fontWeight: 500 }}>
            No featured experiences available yet.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section style={{ padding: "5rem 0", backgroundColor: "white" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "80px", paddingRight: "80px" }}>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{
            color: "#006f6b",
            fontWeight: 700,
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: "0.75rem",
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Trending Now
          </p>
          <h2 style={{
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 900,
            color: "#062626",
            fontFamily: "'Montserrat', sans-serif",
            lineHeight: 1.2,
          }}>
            Most popular experiences
          </h2>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
        }}>
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>

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