import { Toaster } from 'sonner';
import {
  Navigation,
  Hero,
  InfoCardsSection,
  OrbitSection,
  AIStatisticsGrid,
  ContactForm,
  Footer
} from '@/components';


function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <InfoCardsSection />
      <OrbitSection />
      <AIStatisticsGrid />
      <ContactForm />
      <Footer />
      <Toaster />
    </main>
  );
}

export default App;
