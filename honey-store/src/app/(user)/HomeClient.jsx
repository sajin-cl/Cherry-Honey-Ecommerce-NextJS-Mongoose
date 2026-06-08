"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/user/home/Hero";
import FeaturedProjects from "@/components/user/home/FeaturedProjects";

const OurStory = dynamic(() => import("@/components/user/home/OurStory"));
const Testimonials = dynamic(() => import("@/components/user/home/Testimonials"));
const OurJourney = dynamic(() => import("@/components/user/home/OurJourney"));

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