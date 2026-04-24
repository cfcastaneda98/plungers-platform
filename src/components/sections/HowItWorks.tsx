import Link from "next/link";
import { Search, CalendarCheck, Smile } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Discover Experiences",
    description:
      "Browse hundreds of authentic local experiences by location, category, or theme. Find exactly what excites you.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Book Instantly",
    description:
      "Select your date, confirm your spot, and pay securely — all in just a few clicks. No back-and-forth needed.",
  },
  {
    icon: Smile,
    step: "03",
    title: "Live the Experience",
    description:
      "Show up and immerse yourself. Your local host takes care of the rest. Leave with memories that last a lifetime.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">
            Simple Process
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            How Plungers works
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            From discovery to experience — we make it effortless to connect
            with local hosts and book something unforgettable.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-orange-100 z-0" />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative z-10 flex flex-col items-center text-center p-8 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-colors duration-300 group"
              >
                {/* Step Number */}
                <span className="text-orange-200 font-black text-6xl leading-none mb-4 group-hover:text-orange-300 transition-colors">
                  {step.step}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-200">
                  <Icon size={24} className="text-white" />
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Start Exploring →
          </Link>
        </div>
      </div>
    </section>
  );
}