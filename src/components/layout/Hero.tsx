"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const TRUST_BADGES = [
  { icon: "✓", label: "Handpicked Experiences" },
  { icon: "🌍", label: "Local Expert Hosts" },
  { icon: "⭐", label: "Verified Reviews" },
  { icon: "🔒", label: "No Hidden Fees" },
];

const POPULAR_TAGS = [
  "Food Tours",
  "Outdoor Adventures",
  "Artisan Workshops",
  "Cultural Experiences",
];

export default function Hero() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(
      search.trim()
        ? `/experiences?search=${encodeURIComponent(search)}`
        : "/experiences"
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80')",
        }}
      />
      {/* Gradient Overlay — teal tinted */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#062626]/85 via-[#062626]/60 to-[#006f6b]/30" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center pt-16">
        <div
          style={{ paddingLeft: "80px", paddingRight: "40px", paddingTop: "60px", paddingBottom: "60px" }}
          className="max-w-7xl mx-auto w-full"
        >
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p className="text-[#89e3d5] font-bold text-xs uppercase tracking-[0.2em] mb-4">
              Plunge Into A World Of Change
            </p>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Authentic experiences,{" "}
              <span className="text-[#89e3d5]">wherever</span> you are
            </h1>

            {/* Subheadline */}
            <p className="text-white/75 text-base leading-relaxed mb-8 max-w-lg font-medium">
              Connect with local hosts offering food tours, artisan workshops,
              outdoor adventures, and more. Explore. Connect. Transform.
            </p>

            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden max-w-xl mb-5">
              <div className="flex items-center pl-5 text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What experience are you looking for?"
                className="flex-1 px-4 py-4 text-gray-700 text-sm outline-none bg-transparent font-medium"
              />
              <button
                onClick={handleSearch}
                className="bg-[#006f6b] hover:bg-[#00534d] active:bg-[#062626] transition-colors text-white font-bold text-sm px-8 py-4 rounded-full m-1.5"
              >
                Search
              </button>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-white/50 text-xs font-medium">Popular:</span>
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    router.push(`/experiences?search=${encodeURIComponent(tag)}`)
                  }
                  className="text-white/80 hover:text-white text-xs border border-white/25 hover:border-[#89e3d5] bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="relative z-10 bg-[#062626]/60 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center justify-center gap-3 text-white py-5 px-4"
              >
                <span className="text-[#89e3d5] text-base">{badge.icon}</span>
                <span className="text-xs font-semibold text-white/90 tracking-wide">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}