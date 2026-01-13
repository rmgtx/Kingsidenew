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

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
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
