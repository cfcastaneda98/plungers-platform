import Link from "next/link";
import {
  Utensils,
  Mountain,
  Palette,
  Music,
  Camera,
  Waves,
  TreePine,
  Building2,
} from "lucide-react";

const CATEGORIES = [
  { label: "Food & Drink", icon: Utensils, slug: "food-drink", color: "bg-orange-50 text-orange-500" },
  { label: "Outdoor Adventures", icon: Mountain, slug: "outdoor", color: "bg-green-50 text-green-500" },
  { label: "Arts & Crafts", icon: Palette, slug: "arts-crafts", color: "bg-purple-50 text-purple-500" },
  { label: "Music & Shows", icon: Music, slug: "music", color: "bg-blue-50 text-blue-500" },
  { label: "Photography", icon: Camera, slug: "photography", color: "bg-yellow-50 text-yellow-500" },
  { label: "Water Sports", icon: Waves, slug: "water-sports", color: "bg-cyan-50 text-cyan-500" },
  { label: "Nature & Wildlife", icon: TreePine, slug: "nature", color: "bg-emerald-50 text-emerald-500" },
  { label: "City & Culture", icon: Building2, slug: "culture", color: "bg-rose-50 text-rose-500" },
];

export default function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-1">
              Browse By Type
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              What kind of experience are you after?
            </h2>
          </div>
          <Link
            href="/experiences"
            className="hidden sm:flex items-center gap-1 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors"
          >
            View all →
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/experiences?category=${cat.slug}`}
                className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-200 text-center"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon size={22} />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-orange-500 transition-colors leading-tight">
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