import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhatIs } from "@/components/WhatIs";
import { MissionVision } from "@/components/MissionVision";
import { Values } from "@/components/Values";
import { Architecture } from "@/components/Architecture";
import { Goals } from "@/components/Goals";
import { Customers } from "@/components/Customers";
import { GlobeSection } from "@/components/GlobeSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <main className="relative">
      {/* fixed atmosphere layers */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 aurora" />
        <div className="absolute inset-0 grid-texture" />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-leaf-900/0 to-transparent" />
      </div>

      <Navbar />
      <Hero />
      <WhatIs />
      <MissionVision />
      <Architecture />
      <Values />
      <Goals />
      <Customers />
      <GlobeSection />
      <Contact />
      <Footer />
    </main>
  );
}
