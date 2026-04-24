"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TRUST_BADGES = [
  { icon: "✓", label: "Handpicked Experiences" },
  { icon: "👤", label: "Local Expert Hosts" },
  { icon: "⭐", label: "Verified Reviews" },
  { icon: "$", label: "No Hidden Fees" },
];

export default function Hero() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/experiences?search=${encodeURIComponent(search)}`);
    } else {
      router.push("/experiences");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">

          {/* Eyebrow Text */}
          <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Discover Something Real
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Authentic experiences, <br className="hidden sm:block" />
            wherever you are
          </h1>

          {/* Subheadline */}
          <p className="text-white/80 text-lg mb-8 max-w-xl">
            Connect with local hosts offering food tours, artisan workshops,
            outdoor adventures, and more.
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden max-w-2xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What experience are you looking for?"
              className="flex-1 px-6 py-4 text-gray-700 text-base outline-none bg-transparent"
            />
            <button
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold px-8 py-4 rounded-full m-1"
            >
              Search →
            </button>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["Food Tours", "Outdoor Adventures", "Artisan Workshops", "Cultural Experiences"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    router.push(
                      `/experiences?search=${encodeURIComponent(tag)}`
                    )
                  }
                  className="text-white/80 hover:text-white text-sm border border-white/30 hover:border-white/60 px-3 py-1 rounded-full transition-colors"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="relative z-10 w-full border-t border-white/20 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 text-white"
              >
                <span className="text-orange-400 text-xl font-bold">
                  {badge.icon}
                </span>
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}