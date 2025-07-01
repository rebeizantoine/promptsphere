// src/app/page.tsx
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
