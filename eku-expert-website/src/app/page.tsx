import { Hero } from "@/components/home/hero";
import { ServicesGrid } from "@/components/home/services-grid";
import { Situations } from "@/components/home/situations";
import { ExpertsSection } from "@/components/home/experts-section";
import { PublicationsSection } from "@/components/home/publications-section";
import { PartnersSection } from "@/components/home/partners-section";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <Situations />
      <ExpertsSection />
      <PublicationsSection />
      <PartnersSection />
      <CtaSection />
    </>
  );
}
