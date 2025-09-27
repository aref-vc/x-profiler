import { ProfileAnalyzer } from "@/components/profile-analyzer";
import { HeroSection } from "@/components/hero-section";
import { FeatureHighlights } from "@/components/feature-highlights";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <HeroSection />
        <ProfileAnalyzer />
        <FeatureHighlights />
      </div>
    </main>
  );
}