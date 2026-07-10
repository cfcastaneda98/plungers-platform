"use client";

import { useRef, useState } from "react";
import {
  ChevronLeft, ChevronRight,
  Landmark, BookOpen, Palette, Music,
  UtensilsCrossed, Sprout, TreePine,
  Users, Star, BookMarked, Heart,
  HandHeart, Globe,
} from "lucide-react";

// Icon + color config for the "Ways to Connect Locally" carousel.
// Colors mix the brand palette (teal/gold) with a few complementary hues
// for visual variety, per client's note that they like color variation
// and are open to us picking/adjusting it.
export const CATEGORY_CAROUSEL_CONFIG = [
  { label: "Heritage & History", slug: "heritage-history", icon: Landmark, bg: "#f7ecd9", color: "#9d691d" },
  { label: "Traditional Knowledge", slug: "traditional-knowledge", icon: BookOpen, bg: "#e3f2f0", color: "#006f6b" },
  { label: "Art & Craftsmanship", slug: "art-craftsmanship", icon: Palette, bg: "#fbe4e1", color: "#c0503d" },
  { label: "Music & Performance", slug: "music-performance", icon: Music, bg: "#ece4fb", color: "#7c5cbf" },
  { label: "Food Traditions", slug: "food-traditions", icon: UtensilsCrossed, bg: "#fdebd6", color: "#c9701b" },
  { label: "Agriculture & Farms", slug: "agriculture-farms", icon: Sprout, bg: "#e3f2e1", color: "#4a8f3c" },
  { label: "Nature & Local Knowledge", slug: "nature-local-knowledge", icon: TreePine, bg: "#dcefe9", color: "#1f7a5c" },
  { label: "Community & Local Life", slug: "community-local-life", icon: Users, bg: "#e1ecfb", color: "#2f6fbf" },
  { label: "Festivals & Celebrations", slug: "festivals-celebrations", icon: Star, bg: "#fbe1ef", color: "#c4499b" },
  { label: "Storytelling & Oral Traditions", slug: "storytelling-oral-traditions", icon: BookMarked, bg: "#e6ecec", color: "#062626" },
  { label: "Spiritual & Cultural Practices", slug: "spiritual-cultural-practices", icon: Heart, bg: "#eee1fb", color: "#8a4bbf" },
  { label: "Volunteering & Impact", slug: "volunteering-impact", icon: HandHeart, bg: "#dff2ea", color: "#00534d" },
  { label: "Ways of Life", slug: "ways-of-life", icon: Globe, bg: "#e5f7f4", color: "#0e8a7c" },
] as const;

interface CategoryCarouselProps {
  /** Currently active category slug, if any (used to highlight a ring around the icon). */
  activeCategory?: string
  /** Called with the category slug when a user taps/clicks an item. Caller decides
   *  whether that means "navigate to search page" or "update a local filter". */
  onSelect: (slug: string) => void
}

const ITEM_WIDTH = 140 // px, must match the button width below
const ITEM_GAP = 16
const STEP = ITEM_WIDTH + ITEM_GAP

export default function CategoryCarousel({ activeCategory = "", onSelect }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  function scrollByAmount(amount: number) {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" })
  }

  function handleScroll() {
    const el = scrollRef.current
    if (!el) return
    const index = Math.round(el.scrollLeft / STEP)
    setActiveIndex(Math.max(0, Math.min(index, CATEGORY_CAROUSEL_CONFIG.length - 1)))
  }

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Left arrow */}
        <button
          onClick={() => scrollByAmount(-STEP * 3)}
          aria-label="Scroll categories left"
          style={{
            flexShrink: 0, width: "44px", height: "44px", borderRadius: "50%",
            border: "1.5px solid #e8eeee", backgroundColor: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          }}
        >
          <ChevronLeft size={18} color="#062626" />
        </button>

        {/* Scrollable icon row */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="hide-scrollbar"
          style={{
            display: "flex", gap: `${ITEM_GAP}px`, overflowX: "auto",
            scrollSnapType: "x mandatory", flex: 1, padding: "0.5rem 0",
          }}
        >
          {CATEGORY_CAROUSEL_CONFIG.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.slug
            return (
              <button
                key={cat.slug}
                onClick={() => onSelect(cat.slug)}
                style={{
                  flexShrink: 0, width: `${ITEM_WIDTH}px`, scrollSnapAlign: "start",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: "0.85rem", background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif", padding: "0.25rem 0",
                }}
              >
                <div style={{
                  width: "66px", height: "66px", borderRadius: "50%",
                  backgroundColor: cat.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  outline: isActive ? `2.5px solid ${cat.color}` : "2.5px solid transparent",
                  outlineOffset: "3px",
                  transition: "outline-color 0.2s",
                }}>
                  <Icon size={34} strokeWidth={1.6} color={cat.color} />
                </div>
                <span style={{
                  fontSize: "0.95rem", fontWeight: 700, textAlign: "center",
                  color: isActive ? "#062626" : "#1c2e2e", lineHeight: 1.3,
                }}>
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scrollByAmount(STEP * 3)}
          aria-label="Scroll categories right"
          style={{
            flexShrink: 0, width: "44px", height: "44px", borderRadius: "50%",
            border: "1.5px solid #e8eeee", backgroundColor: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          }}
        >
          <ChevronRight size={18} color="#062626" />
        </button>
      </div>

      {/* Dot pagination */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "1.5rem" }}>
        {CATEGORY_CAROUSEL_CONFIG.map((cat, i) => (
          <span
            key={cat.slug}
            style={{
              width: "5px", height: "5px", borderRadius: "50%",
              backgroundColor: i === activeIndex ? "#006f6b" : "#dbe6e6",
              transition: "background-color 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  )
}
