import { supabase } from "@/lib/supabase";
import { Experience } from "@/lib/types";
import ExperienceDetailClient from "./ExperienceDetailClient";
import { notFound } from "next/navigation";

async function getExperience(id: string): Promise<Experience | null> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .eq('status', 'active')
      .single()

    if (error || !data) return null
    return data
  } catch {
    return null
  }
}

async function getSimilarExperiences(
  category: string,
  currentId: string
): Promise<Experience[]> {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('status', 'active')
      .eq('category', category)
      .neq('id', currentId)
      .limit(3)

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const experience = await getExperience(id)

  if (!experience) notFound()

  const similarExperiences = await getSimilarExperiences(
    experience.category,
    experience.id
  )

  return (
    <ExperienceDetailClient
      experience={experience}
      similarExperiences={similarExperiences}
    />
  )
}