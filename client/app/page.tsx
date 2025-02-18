"use client";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <Hero />
      <Features />
    </div>
  );
}
