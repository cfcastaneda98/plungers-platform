"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, SlidersHorizontal, MapPin,
  Clock, Star, X, ChevronDown
} from "lucide-react";
import { Experience } from "@/lib/types";
import dynamic from "next/dynamic"

const ExperienceMap = dynamic(
  () => import("@/components/ui/ExperienceMap"),
  { ssr: false }
)

const CATEGORIES = [
  { label: "All", slug: "" },
  { label: "Food & Drink", slug: "food-drink" },
  { label: "Outdoor Adventures", slug: "outdoor" },
  { label: "Arts & Crafts", slug: "arts-crafts" },
  { label: "Music & Shows", slug: "music" },
  { label: "Photography", slug: "photography" },
  { label: "Water Sports", slug: "water-sports" },
  { label: "Nature & Wildlife", slug: "nature" },
  { label: "City & Culture", slug: "culture" },
];

const SORT_OPTIONS = [
  { label: "Most Popular", value: "" },
  { label: "Top Rated", value: "rating" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  if (remaining === 0) return `${hours} hour${hours > 1 ? 's' : ''}`
  return `${hours}h ${remaining}min`
}

const CATEGORY_IMAGES: { [key: string]: string } = {
  'Food & Drink': 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=600&q=80',
  'Outdoor Adventures': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
  'Arts & Crafts': 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
  'Music & Shows': 'https://images.unsplash.com/photo-1545959570-a94084071b5d?w=600&q=80',
  'Water Sports': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
  'default': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
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
    <main className="min-h-screen bg-[#f4fafa]">

      {/* Page Header */}
      <div className="bg-[#062626] pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="text-[#89e3d5] font-bold text-xs uppercase tracking-[0.2em] mb-2">
            Explore
          </p>
          <h1
            className="text-4xl font-black text-white mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            All Experiences
          </h1>

          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden max-w-2xl">
            <div className="flex items-center pl-5 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search experiences, cities, categories..."
              className="flex-1 px-4 py-4 text-gray-700 text-sm outline-none bg-transparent font-medium"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); updateParams({ search: "" }) }}
                className="pr-3 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
            <button
              onClick={handleSearch}
              className="bg-[#006f6b] hover:bg-[#00534d] text-white font-bold text-sm px-8 py-4 rounded-full m-1.5 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="bg-white border-b border-[#e0f0ef] sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => updateParams({ category: cat.slug })}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  activeCategory === cat.slug
                    ? "bg-[#006f6b] text-white shadow-md"
                    : "bg-[#f4fafa] text-[#062626] hover:bg-[#e0f0ef] border border-[#e0f0ef]"
                }`}
              >
                {cat.label}
              </button>
            ))}

            {/* Divider */}
            <div className="shrink-0 w-px h-6 bg-[#e0f0ef] mx-2" />

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`shrink-0 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border transition-all duration-200 ${
                showFilters
                  ? "bg-[#062626] text-white border-[#062626]"
                  : "bg-white text-[#062626] border-[#e0f0ef] hover:border-[#006f6b]"
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#006f6b]" />
              )}
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="shrink-0 flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
              >
                <X size={12} />
                Clear all
              </button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="pb-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#e0f0ef] pt-4">

              {/* City Filter */}
              <div>
                <label className="text-xs font-bold text-[#062626] uppercase tracking-wider mb-2 block">
                  City
                </label>
                <div className="relative">
                  <select
                    value={activeCity}
                    onChange={(e) => updateParams({ city: e.target.value })}
                    className="w-full appearance-none bg-[#f4fafa] border border-[#e0f0ef] rounded-xl px-4 py-3 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] cursor-pointer"
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-xs font-bold text-[#062626] uppercase tracking-wider mb-2 block">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min $"
                    value={searchParams.min_price || ""}
                    onChange={(e) => updateParams({ min_price: e.target.value })}
                    className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl px-4 py-3 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b]"
                  />
                  <span className="text-[#062626]/40 font-bold">—</span>
                  <input
                    type="number"
                    placeholder="Max $"
                    value={searchParams.max_price || ""}
                    onChange={(e) => updateParams({ max_price: e.target.value })}
                    className="w-full bg-[#f4fafa] border border-[#e0f0ef] rounded-xl px-4 py-3 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b]"
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-xs font-bold text-[#062626] uppercase tracking-wider mb-2 block">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    value={activeSort}
                    onChange={(e) => updateParams({ sort: e.target.value })}
                    className="w-full appearance-none bg-[#f4fafa] border border-[#e0f0ef] rounded-xl px-4 py-3 text-sm font-medium text-[#062626] outline-none focus:border-[#006f6b] cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        
       {/* Results Count + Map Toggle */}
        <div className="flex items-center justify-between mb-8">
        <p className="text-[#062626]/60 text-sm font-medium">
            {initialExperiences.length === 0
            ? "No experiences found"
            : `${initialExperiences.length} experience${initialExperiences.length !== 1 ? 's' : ''} found`
            }
        </p>
        <button
            onClick={() => setShowMap(!showMap)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${
            showMap
                ? "bg-[#062626] text-white border-[#062626]"
                : "bg-white text-[#062626] border-[#e0f0ef] hover:border-[#006f6b]"
            }`}
        >
            <MapPin size={14} />
            {showMap ? "Hide Map" : "Show Map"}
        </button>
        </div>

                {/* Map View */}
                {showMap && (
                <div className="mb-8">
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
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🌍</p>
            <h3
              className="text-2xl font-black text-[#062626] mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              No experiences found
            </h3>
            <p className="text-[#062626]/50 font-medium mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className="bg-[#006f6b] hover:bg-[#00534d] text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {initialExperiences.map((exp) => (
            <Link
              key={exp.id}
              href={`/experiences/${exp.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e0f0ef]"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={
                    exp.cover_image_url ||
                    CATEGORY_IMAGES[exp.category] ||
                    CATEGORY_IMAGES['default']
                  }
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#062626]/80 backdrop-blur-sm text-[#89e3d5] text-xs font-bold px-3 py-1.5 rounded-full">
                  {exp.category}
                </div>
                {exp.is_featured && (
                  <div className="absolute top-3 right-3 bg-[#9d691d] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-[#006f6b] text-xs mb-2 font-medium">
                  <MapPin size={11} />
                  <span>{exp.city}, {exp.country}</span>
                </div>

                <h3 className="font-bold text-[#062626] text-sm leading-snug mb-3 group-hover:text-[#006f6b] transition-colors line-clamp-2">
                  {exp.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {formatDuration(exp.duration_minutes)}
                  </span>
                  <span>·</span>
                  <span>Max {exp.max_guests}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#e0f0ef]">
                  <div className="flex items-center gap-1.5">
                    <div className="bg-[#006f6b] text-white text-xs font-black px-2 py-0.5 rounded">
                      {exp.average_rating.toFixed(1)}
                    </div>
                    <Star size={11} fill="currentColor" className="text-[#9d691d]" />
                    <span className="text-xs text-gray-400">
                      ({exp.total_reviews})
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">from </span>
                    <span className="text-base font-black text-[#062626]">
                      ${exp.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}