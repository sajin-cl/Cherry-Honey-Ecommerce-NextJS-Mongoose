"use client";

import Hero from "@/components/user/home/Hero";
import FeaturedProjects from "@/components/user/home/FeaturedProjects";
import OurStory from "@/components/user/home/OurStory";
import Testimonials from "@/components/user/home/Testimonials";
import OurJourney from "@/components/user/home/OurJourney";

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
