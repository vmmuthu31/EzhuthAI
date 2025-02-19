"use client";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowitWorks";
import Testimonials from "./components/Testimonials";
import Benefits from "./components/Benefits";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <Testimonials />
    </div>
  );
}
