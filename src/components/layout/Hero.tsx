"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const TRUST_BADGES = [
  { icon: "✓", label: "Handpicked Experiences" },
  { icon: "🕐", label: "24/7 Customer Support" },
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
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80')",
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center pt-16">
        <div style={{paddingLeft: "80px", paddingRight: "40px", paddingTop: "60px", paddingBottom: "60px"}} className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Discover Something Real
            </p>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
              Authentic experiences,{" "}
              <span className="text-orange-400">wherever</span> you are
            </h1>

            {/* Subheadline */}
            <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-lg">
              Connect with local hosts offering food tours, artisan workshops,
              outdoor adventures, and more.
            </p>

            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden max-w-xl mb-4">
              <div className="flex items-center pl-5 text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What experience are you looking for?"
                className="flex-1 px-4 py-4 text-gray-700 text-sm outline-none bg-transparent"
              />
              <button
                onClick={handleSearch}
                className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition-colors text-white font-semibold text-sm px-7 py-4 rounded-full m-1.5 flex items-center gap-2"
              >
                Search
                <Search size={15} />
              </button>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-white/50 text-xs">Popular:</span>
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    router.push(`/experiences?search=${encodeURIComponent(tag)}`)
                  }
                  className="text-white/80 hover:text-white text-xs border border-white/25 hover:border-white/50 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="relative z-10 bg-black/40 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center justify-center gap-2.5 text-white py-4 px-4"
              >
                <span className="text-base">{badge.icon}</span>
                <span className="text-xs font-medium text-white/90">
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