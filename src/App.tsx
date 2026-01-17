import { Toaster } from 'sonner';
import {
  Navigation,
  Hero,
  HeroStats,
  WhyKingside,
  InfoCardsSection,
  OrbitSection,
  HowItWorks,
  ContactForm,
  Footer
} from '@/components';


function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <HeroStats />
      <WhyKingside />
      <InfoCardsSection />
      <OrbitSection />
      <HowItWorks />
      <ContactForm />
      <Footer />
      <Toaster />
    </main>
  );
}

export default App;
