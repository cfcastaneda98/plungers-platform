import Link from "next/link";
import { Search, CalendarCheck, Smile } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Discover Experiences",
    description:
      "Browse authentic local experiences by location, category, or theme. Find exactly what excites you.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Book Instantly",
    description:
      "Select your date, confirm your spot, and pay securely — all in a few clicks. No back-and-forth needed.",
  },
  {
    icon: Smile,
    step: "03",
    title: "Live the Experience",
    description:
      "Show up and immerse yourself. Your local host takes care of the rest. Leave with memories that last.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#006f6b] font-bold text-xs uppercase tracking-[0.2em] mb-3">
            Simple Process
          </p>
          <h2
            className="text-3xl font-black text-[#062626] mb-5"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            How Plungers works
          </h2>
          <p className="text-[#062626]/60 text-base leading-relaxed font-medium">
            From discovery to experience — we make it effortless to connect
            with local hosts and book something unforgettable.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative flex flex-col items-center text-center p-10 rounded-2xl border border-[#e0f0ef] hover:border-[#006f6b] hover:shadow-lg transition-all duration-300 group bg-white"
              >
                {/* Step Number */}
                <span className="text-[#e0f0ef] font-black text-7xl leading-none mb-4 group-hover:text-[#89e3d5] transition-colors select-none">
                  {step.step}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#006f6b] flex items-center justify-center mb-6 shadow-md group-hover:bg-[#062626] group-hover:scale-110 transition-all duration-200">
                  <Icon size={24} className="text-white" />
                </div>

                {/* Text */}
                <h3
                  className="text-xl font-black text-[#062626] mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-[#062626]/60 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 bg-[#006f6b] hover:bg-[#00534d] text-white font-black px-10 py-4 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl tracking-wide"
          >
            Start Exploring →
          </Link>
        </div>
      </div>
    </section>
  );
}