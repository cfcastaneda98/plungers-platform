import Hero from "@/components/layout/Hero";
import Categories from "@/components/sections/Categories";
import FeaturedExperiences from "@/components/sections/FeaturedExperiences";
import HowItWorks from "@/components/sections/HowItWorks";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedExperiences />
      <HowItWorks />
    </main>
  );
}