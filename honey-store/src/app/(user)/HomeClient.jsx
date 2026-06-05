"use client";

import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import OurStory from "@/components/home/OurStory";
import Testimonials from "@/components/home/Testimonials";
import OurJourney from "@/components/home/OurJourney";

export default function HomeClient({ featuredProducts }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <FeaturedProjects featuredProducts={featuredProducts} />
      <OurStory />
      <Testimonials />
      <OurJourney />
    </div>
  );
}
