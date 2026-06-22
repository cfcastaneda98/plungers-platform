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

// Display label for "Experiences"
export const SECTION_LABEL = "Ways to Connect Locally"