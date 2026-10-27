# Plungers Platform

Plungers is a cultural experience marketplace that connects travelers with local hosts and the people, traditions, and stories that make each place unique. Travelers discover and book curated "Ways to Connect Locally," while verified local businesses list and manage their experiences.

Live site: [travelplungers.com](https://travelplungers.com)

---

## Project Status

- **Phase 1:** Architecture & Requirements — ✅ Complete
- **Phase 2:** Website MVP & Core Platform — ✅ Complete
- **Phase 3:** Optimization, Scaling & Enhancements — 🚧 In progress

### What shipped in Phase 2

- **Discovery:** homepage with search, a category carousel, and featured experiences; an Experiences page with search, category, city, date/time, price, and sort filters, plus a map view
- **Experience pages:** photo/video gallery, "What's included", host details, location map, reviews, and ranked category badges
- **Accounts:** email and social sign-in (Google, Facebook, Microsoft) with traveler and business account types
- **Bookings & payments:** Stripe Checkout with a webhook that confirms bookings; traveler dashboard with bookings, saved experiences, and profile
- **Favorites & reviews:** save experiences and leave reviews
- **Become a Host:** a three-step business application at `/apply`. Businesses choose **one to three categories in priority order** (primary plus up to two secondary), matching how experiences are categorized
- **Localization:** English and Spanish (Mexico)
- **Legal pages:** Privacy Policy and Terms & Conditions
- **Brand polish:** centered hero with the Plungers logo, shared photo header banners on inner pages, and a custom SVG icon set for all 13 categories (carousel and experience pages)

### Phase 3 — what's next

- **Host verification:** Stripe Identity verification for new hosts (status tracking in Supabase, verification flow inside `/apply`, webhook updates)
- **Complete social sign-in:** finish provider setup for Google, Facebook, and Microsoft
- **Re-enable "Volunteering & Impact":** currently paused at the client's request (see [Temporarily disabled categories](#temporarily-disabled-categories))
- **Optimization & scaling:** performance, accessibility, and SEO improvements ahead of wider launch
- **Platform enhancements:** the larger overhaul planned beyond the MVP, scoped with the client

---

## Tech Stack

**Frontend**
- Next.js (App Router) and React
- TypeScript
- Tailwind CSS (with inline styles for most component styling)
- Lucide icons
- next-intl for localization (cookie-based locale, no URL prefix; English and Spanish-MX)
- Google Maps via `@vis.gl/react-google-maps`

**Backend & Services**
- Next.js API routes (checkout and Stripe webhook)
- Auth: Supabase Auth (email and OAuth), with account roles stored in user metadata
- Database & storage: Supabase (PostgreSQL, Row Level Security)
- Payments: Stripe (Checkout and webhooks); Stripe Identity planned for host verification

**Infrastructure**
- Hosting: Vercel
- Version control: GitHub
- CI/CD: Vercel + GitHub integration

---

## User Roles

- **Traveler:** browses, saves, books, and reviews experiences
- **Business:** applies to host, manages listings, bookings, and payouts
- **Admin:** platform oversight and moderation

---

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env.local` file (never commit it) with:

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public client |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only admin client (API routes) |
| `STRIPE_SECRET_KEY` | Stripe server-side calls |
| `STRIPE_WEBHOOK_SECRET` | Verifying Stripe webhooks |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Maps |
| `NEXT_PUBLIC_APP_URL` | Absolute URLs for redirects |

> This project uses a recent major version of Next.js. Check `node_modules/next/dist/docs/` for the current conventions before changing routing or config.

---

## Categories

The 13 experience categories live in `src/lib/constants.ts` (`EXPERIENCE_CATEGORIES` and `CATEGORY_SLUGS`). Each has a matching icon at `public/icons/<slug>.svg`.

- **Ranked categories:** experiences and business applications store a primary category plus up to two secondary categories (three maximum).
- **Custom icons:** icons are single-color SVGs tinted in code with the category color (see `src/components/ui/CategoryIcon.tsx` and `CategoryCarousel.tsx`).

### Temporarily disabled categories

To hide a category from the carousels and the business signup picker without deleting anything, add its slug to `DISABLED_CATEGORY_SLUGS` in `src/lib/constants.ts`. Existing experiences keep their category and badge, and nothing changes in Supabase. Remove the slug to re-enable it.

Currently disabled: `volunteering-impact`.

---

## Environment Strategy

- **Development:** local development
- **Staging:** pre-production testing
- **Production:** live environment

Sensitive credentials are never committed to the repository.

---

## Repository Structure (High-Level)

```
src/
  app/            Routes: home, experiences, experiences/[id], apply, auth, dashboard,
                  saved, booking/success, privacy, terms, and API routes
  components/
    layout/       Navbar, Hero, Footer, shared page header banner
    sections/     Homepage sections, category carousel
    ui/           Reusable pieces (gallery, reviews, favorites, maps, icons)
  lib/            Supabase clients, shared constants, types
  i18n/           next-intl setup
  messages/       Translations (en, es-mx)
  docs/           Architecture, roadmap, and decision notes (in progress)
public/
  images/         Site imagery and logo
  icons/          Category SVG icons
```