import Hero from "@/components/layout/Hero";
import Categories from "@/components/sections/Categories";
import FeaturedExperiences from "@/components/sections/FeaturedExperiences";
import HowItWorks from "@/components/sections/HowItWorks";
import { supabase } from "@/lib/supabase";
import { Experience } from "@/lib/types";

async function getFeaturedExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('status', 'active')
    .eq('is_featured', true)
    .order('total_reviews', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching experiences:', error)
    return []
  }

  return data || []
}

export default async function HomePage() {
  const featuredExperiences = await getFeaturedExperiences()

  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedExperiences experiences={featuredExperiences} />
      <HowItWorks />
    </main>
  );
}