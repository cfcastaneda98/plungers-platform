import Link from "next/link";
import { Star, Clock, MapPin } from "lucide-react";

const EXPERIENCES = [
  {
    id: "1",
    title: "Traditional Cooking Class with Local Chef",
    location: "Mexico City, Mexico",
    price: 65,
    rating: 9.4,
    reviews: 128,
    duration: "3 hours",
    category: "Food & Drink",
    image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=600&q=80",
  },
  {
    id: "2",
    title: "Sunrise Hike & Waterfall Adventure",
    location: "Medellín, Colombia",
    price: 45,
    rating: 9.7,
    reviews: 89,
    duration: "5 hours",
    category: "Outdoor",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
  },
  {
    id: "3",
    title: "Ceramics Workshop with Master Artisan",
    location: "Oaxaca, Mexico",
    price: 55,
    rating: 9.2,
    reviews: 64,
    duration: "2.5 hours",
    category: "Arts & Crafts",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
  },
  {
    id: "4",
    title: "Street Food Night Tour & Tasting",
    location: "Bangkok, Thailand",
    price: 38,
    rating: 9.5,
    reviews: 203,
    duration: "3 hours",
    category: "Food & Drink",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
  },
  {
    id: "5",
    title: "Flamenco Dance Class for Beginners",
    location: "Seville, Spain",
    price: 42,
    rating: 9.1,
    reviews: 77,
    duration: "2 hours",
    category: "Music & Shows",
    image: "https://images.unsplash.com/photo-1545959570-a94084071b5d?w=600&q=80",
  },
  {
    id: "6",
    title: "Kayaking Through Sea Caves at Sunset",
    location: "Dubrovnik, Croatia",
    price: 72,
    rating: 9.8,
    reviews: 156,
    duration: "4 hours",
    category: "Water Sports",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
  },
];

export default function FeaturedExperiences() {
  return (
    <section className="py-20 bg-[#f4fafa]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-[#006f6b] font-bold text-xs uppercase tracking-[0.2em] mb-2">
              Trending Now
            </p>
            <h2
              className="text-3xl font-black text-[#062626]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Most popular experiences
            </h2>
          </div>
          <Link
            href="/experiences"
            className="hidden sm:flex items-center gap-1 text-[#006f6b] hover:text-[#00534d] font-bold text-sm transition-colors"
          >
            View all →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCES.map((exp) => (
            <Link
              key={exp.id}
              href={`/experiences/${exp.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e0f0ef]"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-52">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#062626]/80 backdrop-blur-sm text-[#89e3d5] text-xs font-bold px-3 py-1.5 rounded-full">
                  {exp.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-[#006f6b] text-xs mb-2 font-medium">
                  <MapPin size={12} />
                  <span>{exp.location}</span>
                </div>

                <h3 className="font-bold text-[#062626] text-base leading-snug mb-3 group-hover:text-[#006f6b] transition-colors line-clamp-2">
                  {exp.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {exp.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#e0f0ef]">
                  <div className="flex items-center gap-1.5">
                    <div className="bg-[#006f6b] text-white text-xs font-black px-2 py-0.5 rounded">
                      {exp.rating}
                    </div>
                    <div className="flex items-center gap-0.5 text-[#9d691d]">
                      <Star size={12} fill="currentColor" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                      ({exp.reviews})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 font-medium">from </span>
                    <span className="text-lg font-black text-[#062626]">
                      ${exp.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}