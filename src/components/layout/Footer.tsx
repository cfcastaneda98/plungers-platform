import Link from "next/link";

const FOOTER_LINKS = {
  Explore: [
    { label: "All Experiences", href: "/experiences" },
    { label: "Food & Drink", href: "/experiences?category=food-drink" },
    { label: "Outdoor Adventures", href: "/experiences?category=outdoor" },
    { label: "Arts & Crafts", href: "/experiences?category=arts-crafts" },
    { label: "Cultural Experiences", href: "/experiences?category=culture" },
  ],
  "For Hosts": [
    { label: "List Your Experience", href: "/apply" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Host Guidelines", href: "/apply" },
    { label: "Become a Host", href: "/apply" },
  ],
  Company: [
    { label: "About Us", href: "/" },
    { label: "Contact", href: "/" },
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
    { label: "Sustainability", href: "/" },
  ],
};

const SOCIAL_LINKS = [
  { label: "FB", href: "/" },
  { label: "IG", href: "/" },
  { label: "TW", href: "/" },
  { label: "LI", href: "/" },
];

export default function Footer() {
  return (
    <footer className="bg-[#062626] text-white">

      {/* Top CTA Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className="text-2xl font-black text-white mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Ready to plunge in?
              </h3>
              <p className="text-white/60 text-sm font-medium">
                Discover authentic experiences with local hosts around the world.
              </p>
            </div>
            <Link
              href="/experiences"
              className="shrink-0 bg-[#006f6b] hover:bg-[#00b496] text-white font-black px-8 py-4 rounded-full transition-colors duration-200 tracking-wide text-sm"
            >
              Explore Experiences →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="block mb-5">
              <img
                src="/images/plungers-logo.svg"
                alt="Plungers"
                className="h-auto w-50 brightness-0 invert"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-3 font-medium">
              Viaje, Aventura y Altruismo
            </p>
            <p className="text-white/40 text-xs leading-relaxed mb-8 font-medium italic">
              &quot;Plunge Into A World Of Change&quot;
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-[#89e3d5] hover:bg-[#006f6b] flex items-center justify-center text-xs font-black text-white/60 hover:text-white transition-all duration-200"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] mb-6">
                {heading}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-[#89e3d5] text-sm font-medium transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs font-medium">
            © {new Date().getFullYear()} Plungers Cultural Immersions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-white/30 hover:text-white/60 text-xs font-medium transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="text-white/30 hover:text-white/60 text-xs font-medium transition-colors">
              Terms of Service
            </Link>
            <p className="text-white/30 text-xs font-medium">
              Built by{" "}
              <span className="text-[#89e3d5] font-bold">Element Seven</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}