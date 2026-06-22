"use client";

import Link from "next/link";
import { EXPERIENCE_CATEGORIES } from "@/lib/constants";
import {
  Landmark, BookOpen, Palette, Music,
  UtensilsCrossed, Sprout, TreePine,
  Users, Star, BookMarked, Heart,
  HandHeart, Globe
} from "lucide-react";

const CATEGORY_CONFIG = [
  { label: "Heritage & History", icon: Landmark, slug: "heritage-history", hoverColor: "#9d691d", hoverBg: "rgba(157,105,29,0.12)" },
  { label: "Traditional Knowledge", icon: BookOpen, slug: "traditional-knowledge", hoverColor: "#006f6b", hoverBg: "rgba(0,111,107,0.12)" },
  { label: "Art & Craftsmanship", icon: Palette, slug: "art-craftsmanship", hoverColor: "#9d691d", hoverBg: "rgba(157,105,29,0.12)" },
  { label: "Music & Performance", icon: Music, slug: "music-performance", hoverColor: "#006f6b", hoverBg: "rgba(0,111,107,0.12)" },
  { label: "Food Traditions", icon: UtensilsCrossed, slug: "food-traditions", hoverColor: "#b86d00", hoverBg: "rgba(184,109,0,0.12)" },
  { label: "Agriculture & Farms", icon: Sprout, slug: "agriculture-farms", hoverColor: "#00534d", hoverBg: "rgba(0,83,77,0.12)" },
  { label: "Nature & Local Knowledge", icon: TreePine, slug: "nature-local-knowledge", hoverColor: "#00534d", hoverBg: "rgba(0,83,77,0.12)" },
  { label: "Community & Local Life", icon: Users, slug: "community-local-life", hoverColor: "#006f6b", hoverBg: "rgba(0,111,107,0.12)" },
  { label: "Festivals & Celebrations", icon: Star, slug: "festivals-celebrations", hoverColor: "#9d691d", hoverBg: "rgba(157,105,29,0.12)" },
  { label: "Storytelling & Oral Traditions", icon: BookMarked, slug: "storytelling-oral-traditions", hoverColor: "#062626", hoverBg: "rgba(6,38,38,0.1)" },
  { label: "Spiritual & Cultural Practices", icon: Heart, slug: "spiritual-cultural-practices", hoverColor: "#006f6b", hoverBg: "rgba(0,111,107,0.12)" },
  { label: "Volunteering & Impact", icon: HandHeart, slug: "volunteering-impact", hoverColor: "#00534d", hoverBg: "rgba(0,83,77,0.12)" },
  { label: "Ways of Life", icon: Globe, slug: "ways-of-life", hoverColor: "#062626", hoverBg: "rgba(6,38,38,0.1)" },
]

function CategoryCard({ cat }: { cat: typeof CATEGORY_CONFIG[0] }) {
  const Icon = cat.icon;

  return (
    <Link
      href={`/experiences?category=${cat.slug}`}
      className="group block"
    >
      <div
        style={{
          backgroundColor: "white",
          border: "1.5px solid #e8eeee",
          borderRadius: "16px",
          padding: "2.5rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          transition: "all 0.25s ease",
          cursor: "pointer",
          minHeight: "180px",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = cat.hoverColor;
          el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.1)`;
          el.style.transform = "translateY(-3px)";
          const iconWrap = el.querySelector(".icon-wrap") as HTMLElement;
          const iconEl = el.querySelector(".icon-el") as HTMLElement;
          const labelEl = el.querySelector(".label-el") as HTMLElement;
          if (iconWrap) iconWrap.style.backgroundColor = cat.hoverBg;
          if (iconEl) iconEl.style.color = cat.hoverColor;
          if (labelEl) labelEl.style.color = cat.hoverColor;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = "#e8eeee";
          el.style.boxShadow = "none";
          el.style.transform = "translateY(0)";
          const iconWrap = el.querySelector(".icon-wrap") as HTMLElement;
          const iconEl = el.querySelector(".icon-el") as HTMLElement;
          const labelEl = el.querySelector(".label-el") as HTMLElement;
          if (iconWrap) iconWrap.style.backgroundColor = "#f4f7f7";
          if (iconEl) iconEl.style.color = "#8a9e9e";
          if (labelEl) labelEl.style.color = "#062626";
        }}
      >
        {/* Icon */}
        <div
          className="icon-wrap"
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: "#f4f7f7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.25s ease",
          }}
        >
          <span
            className="icon-el"
            style={{
              color: "#8a9e9e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.25s ease",
            }}
          >
            <Icon size={28} />
          </span>
        </div>

        {/* Label */}
        <span
          className="label-el"
          style={{
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "#062626",
            textAlign: "center",
            lineHeight: 1.3,
            fontFamily: "'Montserrat', sans-serif",
            transition: "color 0.25s ease",
          }}
        >
          {cat.label}
        </span>
      </div>
    </Link>
  );
}

export default function Categories() {
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

        <div className="categories-grid" style={{ gap: "1.25rem" }}>
          {CATEGORY_CONFIG.map((cat) => (
            <CategoryCard key={cat.slug} cat={cat} />
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