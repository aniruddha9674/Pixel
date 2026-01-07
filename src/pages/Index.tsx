import  Navigation  from '@/components/Navigation';
import  HeroSection  from '@/components/HeroSection';
import IdentitySection  from '@/components/IdentitySection';

import  FeaturedSection  from '@/components/FeaturedSection';
import  ProcessSection  from '@/components/ProcessSection';
import  EventsSection  from '@/components/EventsSection';
import  BenefitsSection  from '@/components/BenefitsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <IdentitySection />
     
        <FeaturedSection />
        <ProcessSection />
        <EventsSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
