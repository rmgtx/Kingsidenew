import { Toaster } from 'sonner';
import {
  Navigation,
  Hero,
  OrbitSection,
  BentoGrid,
  IntelligentAutomation,
  ContactForm,
  Footer
} from '@/components';

import {InfoCardsSection} from "@/components/InfoCardsSection";
import {AIStatisticsGrid} from "@/components/AIStatisticsGrid";

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <InfoCardsSection />
      <OrbitSection />
      <div className="py-6 text-2xl font-bold text-sky-500">AI GRID TEST</div>
      <AIStatisticsGrid />
      <BentoGrid />
      <IntelligentAutomation />
      <ContactForm />
      <Footer />
      <Toaster />
    </main>
  );
}

export default App;
