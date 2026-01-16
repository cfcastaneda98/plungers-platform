# Plungers Platform

Plungers is a marketplace platform designed to connect travelers with curated local experiences offered by verified businesses. The platform supports secure bookings, role-based dashboards, and transaction management while maintaining strict data ownership and security boundaries.

This repository contains the source code and documentation for the Plungers web platform, beginning with the Phase 2 MVP build.

---

## Project Status

- **Phase 1:** Architecture & Requirements — ✅ Complete  
- **Phase 2:** Website MVP & Core Platform — 🚧 Upcoming  
- **Phase 3:** Optimization, Scaling & Enhancements — ⏳ Planned

---

## Tech Stack (Confirmed)

**Frontend**
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

**Backend & Services**
- Next.js API Routes
- Auth: Clerk (role-based authentication)
- Payments: Stripe (Payments + Payouts)
- Database: Supabase (PostgreSQL)

**Infrastructure**
- Hosting: Vercel
- Version Control: GitHub
- CI/CD: Vercel + GitHub integration

---

## User Roles

- **Traveler:** Browses and books experiences
- **Business:** Manages listings, bookings, and payouts
- **Admin:** Platform oversight and moderation

---

## Environment Strategy

- **Development:** Local development
- **Staging:** Pre-production testing
- **Production:** Live environment

Sensitive credentials are never committed to the repository.

---

## Repository Structure (High-Level)
