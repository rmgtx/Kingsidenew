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

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <InfoCardsSection />
      <OrbitSection />
      <BentoGrid />
      <IntelligentAutomation />
      <ContactForm />
      <Footer />
      <Toaster />
    </main>
  );
}

export default App;
