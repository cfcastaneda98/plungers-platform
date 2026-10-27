export const EXPERIENCE_CATEGORIES = [
  "Heritage & History",
  "Traditional Knowledge",
  "Art & Craftsmanship",
  "Music & Performance",
  "Food Traditions",
  "Agriculture & Farms",
  "Nature & Local Knowledge",
  "Community & Local Life",
  "Festivals & Celebrations",
  "Storytelling & Oral Traditions",
  "Spiritual & Cultural Practices",
  "Volunteering & Impact",
  "Ways of Life",
] as const

export type ExperienceCategory = typeof EXPERIENCE_CATEGORIES[number]

// Slug mapping for URL params
export const CATEGORY_SLUGS: Record<string, string> = {
  "heritage-history": "Heritage & History",
  "traditional-knowledge": "Traditional Knowledge",
  "art-craftsmanship": "Art & Craftsmanship",
  "music-performance": "Music & Performance",
  "food-traditions": "Food Traditions",
  "agriculture-farms": "Agriculture & Farms",
  "nature-local-knowledge": "Nature & Local Knowledge",
  "community-local-life": "Community & Local Life",
  "festivals-celebrations": "Festivals & Celebrations",
  "storytelling-oral-traditions": "Storytelling & Oral Traditions",
  "spiritual-cultural-practices": "Spiritual & Cultural Practices",
  "volunteering-impact": "Volunteering & Impact",
  "ways-of-life": "Ways of Life",
}

export const CATEGORY_SLUG_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([slug, label]) => [label, slug])
)

// ---------------------------------------------------------------------------
// Temporarily disabled categories
// Slugs listed here are hidden from the homepage carousel, the Experiences page
// carousel, and the business sign-up picker. Nothing is deleted: the category
// stays in EXPERIENCE_CATEGORIES / CATEGORY_SLUGS, in Supabase, and on any
// experience that already uses it (badges and direct links keep working).
// To re-enable a category, just remove its slug from this list.
// ---------------------------------------------------------------------------
export const DISABLED_CATEGORY_SLUGS: string[] = [
  "volunteering-impact",
]

export function isCategoryEnabled(slug: string): boolean {
  return !DISABLED_CATEGORY_SLUGS.includes(slug)
}

// Category labels offered when a business signs up
export const ACTIVE_EXPERIENCE_CATEGORIES = EXPERIENCE_CATEGORIES.filter(
  (label) => isCategoryEnabled(CATEGORY_SLUG_MAP[label])
)

// Display label for "Experiences"
export const SECTION_LABEL = "Where are you traveling to?"