"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, SlidersHorizontal, MapPin,
  Clock, Star, X, ChevronDown, Map
} from "lucide-react";
import { Experience } from "@/lib/types";
import dynamic from "next/dynamic";
import { EXPERIENCE_CATEGORIES, CATEGORY_SLUGS, SECTION_LABEL } from "@/lib/constants";

const ExperienceMap = dynamic(
  () => import("@/components/ui/ExperienceMap"),
  { ssr: false }
)

const CATEGORIES = [
  { label: "All", slug: "" },
  ...Object.entries(CATEGORY_SLUGS).map(([slug, label]) => ({ label, slug }))
];

const SORT_OPTIONS = [
  { label: "Most Popular", value: "" },
  { label: "Top Rated", value: "rating" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

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
  if (remaining === 0) return `${hours} hour${hours > 1 ? 's' : ''}`
  return `${hours}h ${remaining}min`
}

interface Props {
  initialExperiences: Experience[]
  cities: string[]
  searchParams: {
    search?: string
    category?: string
    city?: string
    min_price?: string
    max_price?: string
    sort?: string
  }
}

export default function ExperiencesClient({
  initialExperiences,
  cities,
  searchParams,
}: Props) {
  const router = useRouter()
  const [search, setSearch] = useState(searchParams.search || "")
  const [showFilters, setShowFilters] = useState(false)
  const [showMap, setShowMap] = useState(false)

  const activeCategory = searchParams.category || ""
  const activeSort = searchParams.sort || ""
  const activeCity = searchParams.city || ""

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams()
    const current = {
      search: searchParams.search || "",
      category: searchParams.category || "",
      city: searchParams.city || "",
      min_price: searchParams.min_price || "",
      max_price: searchParams.max_price || "",
      sort: searchParams.sort || "",
      ...updates,
    }
    Object.entries(current).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    router.push(`/experiences?${params.toString()}`)
  }

  function handleSearch() {
    updateParams({ search })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch()
  }

  function clearFilters() {
    setSearch("")
    router.push("/experiences")
  }

  const hasActiveFilters = activeCategory || activeCity ||
    searchParams.min_price || searchParams.max_price || searchParams.search

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f4f7f7", fontFamily: "'Montserrat', sans-serif" }}>

      {/* Page Header */}
      <div style={{ backgroundColor: "#062626", paddingTop: "6rem", paddingBottom: "2.5rem", paddingLeft: "80px", paddingRight: "80px" }}>
        <p style={{ color: "#89e3d5", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>
          Explore
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, color: "white", fontFamily: "'Montserrat', sans-serif", marginBottom: "1.75rem" }}>
        {SECTION_LABEL}
          </h1>

        {/* Search Bar */}
        <div style={{ display: "flex", alignItems: "center", backgroundColor: "white", borderRadius: "9999px", boxShadow: "0 4px 24px rgba(0,0,0,0.15)", overflow: "hidden", maxWidth: "680px" }}>
          <div style={{ display: "flex", alignItems: "center", paddingLeft: "1.5rem", color: "#9ca3af", flexShrink: 0 }}>
            <Search size={18} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search experiences, cities, categories..."
            style={{
              flex: 1, padding: "1.1rem 1rem",
              fontSize: "0.875rem", color: "#374151",
              outline: "none", background: "transparent",
              fontWeight: 500, fontFamily: "'Montserrat', sans-serif",
              minWidth: 0,
            }}
          />
          {search && (
            <button
              onClick={() => { setSearch(""); updateParams({ search: "" }) }}
              style={{ background: "none", border: "none", cursor: "pointer", paddingRight: "0.75rem", color: "#9ca3af", display: "flex", alignItems: "center" }}
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "#006f6b",
              borderRadius: "9999px",
              margin: "6px",
              paddingLeft: "1.75rem",
              paddingRight: "1.75rem",
              paddingTop: "0.875rem",
              paddingBottom: "0.875rem",
              color: "white", fontWeight: 700,
              fontSize: "0.875rem", whiteSpace: "nowrap",
              border: "none", cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
              flexShrink: 0,
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#00534d"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#006f6b"}
          >
            Search
          </button>
        </div>
      </div>

      {/* Category Pills + Filters Bar */}
      <div style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e0eeee",
        position: "sticky", top: "72px", zIndex: 30,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "80px", paddingRight: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingTop: "0.875rem", paddingBottom: "0.875rem", overflowX: "auto" }}>

            {/* Category Pills */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, overflowX: "auto" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => updateParams({ category: cat.slug })}
                  style={{
                    flexShrink: 0,
                    padding: "0.5rem 1.25rem",
                    borderRadius: "9999px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    border: activeCategory === cat.slug ? "none" : "1.5px solid #e0eeee",
                    backgroundColor: activeCategory === cat.slug ? "#006f6b" : "white",
                    color: activeCategory === cat.slug ? "white" : "#062626",
                    cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style={{ width: "1px", height: "24px", backgroundColor: "#e0eeee", flexShrink: 0, margin: "0 0.5rem" }} />

            {/* Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1.25rem",
                borderRadius: "9999px",
                fontSize: "0.8rem",
                fontWeight: 700,
                border: "1.5px solid #e0eeee",
                backgroundColor: showFilters ? "#062626" : "white",
                color: showFilters ? "white" : "#062626",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              <SlidersHorizontal size={14} />
              Filters
              {hasActiveFilters && (
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#006f6b", display: "inline-block" }} />
              )}
            </button>

            {/* Clear */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  border: "none",
                  backgroundColor: "transparent",
                  color: "#dc2626",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                <X size={12} />
                Clear all
              </button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div style={{ borderTop: "1px solid #e0eeee", paddingTop: "1.25rem", paddingBottom: "1.25rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>

              {/* City */}
              <div>
                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#062626", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                  City
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    value={activeCity}
                    onChange={(e) => updateParams({ city: e.target.value })}
                    style={{ width: "100%", appearance: "none", backgroundColor: "#f4f7f7", border: "1.5px solid #e0eeee", borderRadius: "10px", padding: "0.75rem 1rem", fontSize: "0.85rem", fontWeight: 500, color: "#062626", outline: "none", cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => <option key={city} value={city}>{city}</option>)}
                  </select>
                  <ChevronDown size={14} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                </div>
              </div>

              {/* Price */}
              <div>
                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#062626", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                  Price Range
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="number"
                    placeholder="Min $"
                    value={searchParams.min_price || ""}
                    onChange={(e) => updateParams({ min_price: e.target.value })}
                    style={{ flex: 1, backgroundColor: "#f4f7f7", border: "1.5px solid #e0eeee", borderRadius: "10px", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#062626", outline: "none", fontFamily: "'Montserrat', sans-serif" }}
                  />
                  <span style={{ color: "rgba(6,38,38,0.3)", fontWeight: 700 }}>—</span>
                  <input
                    type="number"
                    placeholder="Max $"
                    value={searchParams.max_price || ""}
                    onChange={(e) => updateParams({ max_price: e.target.value })}
                    style={{ flex: 1, backgroundColor: "#f4f7f7", border: "1.5px solid #e0eeee", borderRadius: "10px", padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#062626", outline: "none", fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#062626", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                  Sort By
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    value={activeSort}
                    onChange={(e) => updateParams({ sort: e.target.value })}
                    style={{ width: "100%", appearance: "none", backgroundColor: "#f4f7f7", border: "1.5px solid #e0eeee", borderRadius: "10px", padding: "0.75rem 1rem", fontSize: "0.85rem", fontWeight: 500, color: "#062626", outline: "none", cursor: "pointer", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  <ChevronDown size={14} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 80px" }}>

        {/* Results Count + Map Toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <p style={{ color: "rgba(6,38,38,0.5)", fontSize: "0.85rem", fontWeight: 600 }}>
            {initialExperiences.length === 0
              ? "No experiences found"
              : `${initialExperiences.length} experience${initialExperiences.length !== 1 ? 's' : ''} found`
            }
          </p>
          <button
            onClick={() => setShowMap(!showMap)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.6rem 1.5rem",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              border: "1.5px solid #e0eeee",
              backgroundColor: showMap ? "#062626" : "white",
              color: showMap ? "white" : "#062626",
              cursor: "pointer",
              fontFamily: "'Montserrat', sans-serif",
              transition: "all 0.2s",
            }}
          >
            <Map size={14} />
            {showMap ? "Hide Map" : "Show Map"}
          </button>
        </div>

        {/* Map */}
        {showMap && (
          <div style={{ marginBottom: "2rem" }}>
            <ExperienceMap
              experiences={initialExperiences}
              height="450px"
              zoom={2}
              center={{ lat: 20, lng: 10 }}
            />
          </div>
        )}

        {/* Empty State */}
        {initialExperiences.length === 0 && (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <p style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌍</p>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#062626", marginBottom: "0.75rem", fontFamily: "'Montserrat', sans-serif" }}>
              No experiences found
            </h3>
            <p style={{ color: "rgba(6,38,38,0.5)", fontWeight: 500, marginBottom: "1.5rem", fontSize: "0.9rem" }}>
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              style={{ backgroundColor: "#006f6b", color: "white", fontWeight: 700, padding: "0.875rem 2rem", borderRadius: "9999px", border: "none", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: "0.875rem" }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Cards Grid */}
        <div className="experiences-grid" style={{ gap: "1.25rem" }}>
          {initialExperiences.map((exp) => (
            <Link
              key={exp.id}
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
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = "#006f6b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#e8eeee";
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                  <img
                    src={exp.cover_image_url || CATEGORY_IMAGES[exp.category] || CATEGORY_IMAGES['default']}
                    alt={exp.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                  <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", flexDirection: "column", gap: "4px", maxWidth: "80%" }}>
                  <div style={{ backgroundColor: "rgba(6,38,38,0.85)", backdropFilter: "blur(4px)", color: "#89e3d5", fontSize: "0.68rem", fontWeight: 700, padding: "4px 10px", borderRadius: "9999px", fontFamily: "'Montserrat', sans-serif", display: "inline-block" }}>
                    {exp.primary_category || exp.category}
                  </div>
                </div>
                  {exp.is_featured && (
                    <div style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "#9d691d", color: "white", fontSize: "0.68rem", fontWeight: 700, padding: "4px 10px", borderRadius: "9999px", fontFamily: "'Montserrat', sans-serif" }}>
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: "1rem 1rem 0.875rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.6rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "3px", color: "#006f6b", fontSize: "0.7rem", fontWeight: 600 }}>
                      <MapPin size={10} />
                      {exp.city}, {exp.country}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "3px", color: "#8a9e9e", fontSize: "0.7rem", fontWeight: 500 }}>
                      <Clock size={10} />
                      {formatDuration(exp.duration_minutes)}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: "0.9rem", fontWeight: 800, color: "#062626",
                    lineHeight: 1.35, marginBottom: "0.875rem",
                    fontFamily: "'Montserrat', sans-serif",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical" as const,
                    overflow: "hidden",
                  }}>
                    {exp.title}
                  </h3>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.75rem", borderTop: "1px solid #e8eeee" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ fontSize: "1.2rem", fontWeight: 900, color: "#062626", fontFamily: "'Montserrat', sans-serif", lineHeight: 1 }}>
                        {exp.average_rating.toFixed(1)}
                      </span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#9d691d">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      <span style={{ fontSize: "0.7rem", color: "#8a9e9e", fontWeight: 500 }}>
                        ({exp.total_reviews})
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
                      <span style={{ fontSize: "0.72rem", color: "#8a9e9e", fontWeight: 500 }}>from</span>
                      <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#062626", fontFamily: "'Montserrat', sans-serif", lineHeight: 1 }}>
                        ${exp.price}
                      </span>
                    </div>
                  </div>
                {/* Secondary Categories */}
              {exp.secondary_categories && exp.secondary_categories.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "0.5rem" }}>
                  {exp.secondary_categories.map((cat) => (
                    <span key={cat} style={{
                      fontSize: "0.62rem", fontWeight: 600,
                      color: "#006f6b",
                      backgroundColor: "rgba(0,111,107,0.08)",
                      padding: "2px 8px", borderRadius: "9999px",
                      fontFamily: "'Montserrat', sans-serif",
                    }}>
                      {cat}
                    </span>
                  ))}
                </div>
              )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}