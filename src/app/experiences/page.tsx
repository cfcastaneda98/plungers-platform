import { supabase } from "@/lib/supabase";
import { Experience } from "@/lib/types";
import ExperiencesClient from "./ExperiencesClient";

interface SearchParams {
  search?: string
  category?: string
  city?: string
  min_price?: string
  max_price?: string
  sort?: string
}

async function getExperiences(params: SearchParams): Promise<Experience[]> {
  try {
    let query = supabase
      .from('experiences')
      .select('*')
      .eq('status', 'active')

    if (params.search) {
      query = query.or(
        `title.ilike.%${params.search}%,description.ilike.%${params.search}%,city.ilike.%${params.search}%`
      )
    }

    if (params.category) {
      const categoryMap: { [key: string]: string } = {
        'food-drink': 'Food & Drink',
        'outdoor': 'Outdoor Adventures',
        'arts-crafts': 'Arts & Crafts',
        'music': 'Music & Shows',
        'photography': 'Photography',
        'water-sports': 'Water Sports',
        'nature': 'Nature & Wildlife',
        'culture': 'City & Culture',
      }
      const categoryLabel = categoryMap[params.category]
      if (categoryLabel) {
        query = query.eq('category', categoryLabel)
      }
    }

    if (params.city) {
      query = query.ilike('city', `%${params.city}%`)
    }

    if (params.min_price) {
      query = query.gte('price', parseFloat(params.min_price))
    }

    if (params.max_price) {
      query = query.lte('price', parseFloat(params.max_price))
    }

    switch (params.sort) {
      case 'price_asc':
        query = query.order('price', { ascending: true })
        break
      case 'price_desc':
        query = query.order('price', { ascending: false })
        break
      case 'rating':
        query = query.order('average_rating', { ascending: false })
        break
      default:
        query = query.order('total_reviews', { ascending: false })
    }

    const { data, error } = await query
    if (error) return []
    return data || []
  } catch {
    return []
  }
}

async function getCities(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('city')
      .eq('status', 'active')

    if (error) return []
    const cities = [...new Set(data?.map(d => d.city) || [])]
    return cities.sort()
  } catch {
    return []
  }
}

export default async function ExperiencesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  // Await searchParams — required in Next.js 15
  const resolvedParams = await searchParams

  const [experiences, cities] = await Promise.all([
    getExperiences(resolvedParams),
    getCities(),
  ])

  return (
    <ExperiencesClient
      initialExperiences={experiences}
      cities={cities}
      searchParams={resolvedParams}
    />
  )
}