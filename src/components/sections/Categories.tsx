import Link from "next/link";
import {
  Utensils, Mountain, Palette, Music,
  Camera, Waves, TreePine, Building2,
} from "lucide-react";

const CATEGORIES = [
  { label: "Food & Drink", icon: Utensils, slug: "food-drink", color: "bg-[#f4fafa] text-[#006f6b]" },
  { label: "Outdoor Adventures", icon: Mountain, slug: "outdoor", color: "bg-[#f4fafa] text-[#00534d]" },
  { label: "Arts & Crafts", icon: Palette, slug: "arts-crafts", color: "bg-[#f4fafa] text-[#9d691d]" },
  { label: "Music & Shows", icon: Music, slug: "music", color: "bg-[#f4fafa] text-[#006f6b]" },
  { label: "Photography", icon: Camera, slug: "photography", color: "bg-[#f4fafa] text-[#b86d00]" },
  { label: "Water Sports", icon: Waves, slug: "water-sports", color: "bg-[#f4fafa] text-[#00a0a3]" },
  { label: "Nature & Wildlife", icon: TreePine, slug: "nature", color: "bg-[#f4fafa] text-[#00534d]" },
  { label: "City & Culture", icon: Building2, slug: "culture", color: "bg-[#f4fafa] text-[#062626]" },
];

export default function Categories() {
  return (
    <section className="py-30 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-[#006f6b] font-bold text-xs uppercase tracking-[0.2em] mb-2">
              Browse By Type
            </p>
            <h2
              className="text-3xl font-black text-[#062626]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              What kind of experience are you after?
            </h2>
          </div>
          <Link
            href="/experiences"
            className="hidden sm:flex items-center gap-1 text-[#006f6b] hover:text-[#00534d] font-bold text-sm transition-colors"
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/experiences?category=${cat.slug}`}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#e0f0ef] hover:border-[#006f6b] hover:shadow-md transition-all duration-200 text-center bg-white"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon size={22} />
                </div>
                <span className="text-xs font-bold text-[#062626] group-hover:text-[#006f6b] transition-colors leading-tight">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}