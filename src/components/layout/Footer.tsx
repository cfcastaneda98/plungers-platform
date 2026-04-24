import Link from "next/link";

const FOOTER_LINKS = {
  Explore: [
    { label: "All Experiences", href: "/experiences" },
    { label: "Food & Drink", href: "/experiences?category=food-drink" },
    { label: "Outdoor Adventures", href: "/experiences?category=outdoor" },
    { label: "Arts & Crafts", href: "/experiences?category=arts-crafts" },
  ],
  "For Hosts": [
    { label: "List Your Experience", href: "/apply" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Host Guidelines", href: "/apply" },
  ],
  Company: [
    { label: "About Us", href: "/" },
    { label: "Contact", href: "/" },
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-extrabold text-white mb-4 block">
              Plungers
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Connecting travelers with authentic local experiences around the world.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {["f", "in", "tw", "ig"].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center text-xs font-bold cursor-pointer transition-colors duration-200"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 text-sm transition-colors duration-200"
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
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Plungers. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Built by{" "}
            <span className="text-orange-400 font-semibold">Element Seven</span>
          </p>
        </div>
      </div>
    </footer>
  );
}