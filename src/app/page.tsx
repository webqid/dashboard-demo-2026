import {
  MarketingHeader,
  HeroSection,
  FeaturesSection,
  Footer,
} from '@/components/marketing';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
