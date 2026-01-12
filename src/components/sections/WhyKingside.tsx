import { AnimatedNeuCard } from "@/components";
import { Crown, Shield, Star } from "@phosphor-icons/react";


export function WhyKingside() {
  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-left">
            Your next move…<br />
            <span className="text-accent">INTELLIGENT AUTOMATION</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {/* Card 1 - Purple (Rook) */}
          <AnimatedNeuCard shadow="secondary" index={0} className="p-8">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <Shield size={32} weight="fill" />
            </div>
            <h3 className="mb-4 font-heading text-xl font-bold">Reclaim your time</h3>
            <p className="text-muted-foreground">
              Every founder knows the grind — endless admin work and scattered tools that drain your focus. Kingside cuts through the chaos with intelligent systems that give you back your most valuable resource: time to grow, create, and lead.
            </p>
          </AnimatedNeuCard>

          {/* Card 2 - Red (Queen) */}
          <AnimatedNeuCard shadow="destructive" index={1} className="p-8">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
               <Star size={32} weight="fill" />
            </div>
            <h3 className="mb-4 font-heading text-xl font-bold">Compete like a giant</h3>
            <p className="text-muted-foreground">
              AI isn't just for the tech giants anymore. Kingside gives small and midsize teams access to the same strategic automation and intelligence tools — empowering every business to operate smarter, scale faster, and compete with clarity.
            </p>
          </AnimatedNeuCard>

          {/* Card 3 - Blue (King) */}
          <AnimatedNeuCard shadow="accent" index={2} className="p-8">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Crown size={32} weight="fill" />
            </div>
            <h3 className="mb-4 font-heading text-xl font-bold">Execute with precision</h3>
            <p className="text-muted-foreground">
              We don't just talk transformation — we deliver it. Kingside turns your strategic plans into daily progress with AI-driven automations that keep your business moving forward, one smart step at a time.
            </p>
          </AnimatedNeuCard>
        </div>
      </div>
    </section>
  );
}
