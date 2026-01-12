import { motion } from "motion/react";
import { NeuBrutalistButton } from "@/components";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column - Text content */}
          <div className="max-w-xl">
            {/* Eyebrow text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs sm:text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6"
            >
              Virtual Engagement Maximized & AI-Powered Content Transformation
            </motion.p>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Presentation Platform for Marketing Professionals
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10"
            >
              Effortlessly Create, Deliver, and Reimagine All-Hands Corporate Meetings
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <NeuBrutalistButton
                href="#contact"
                variant="primary"
                ariaLabel="Try it firsthand"
              >
                Try it firsthand
              </NeuBrutalistButton>
              <NeuBrutalistButton
                href="#why-kingside"
                variant="secondary"
                ariaLabel="Schedule a demo"
              >
                Schedule a demo
              </NeuBrutalistButton>
            </motion.div>
          </div>

          {/* Right column - Marketing professional image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* ============================================
                ANIMATED BLUE GLOW EFFECT - Hero Background
                Starts behind marketing image, expands right-to-left
                ============================================ */}
            <motion.div 
              className="absolute pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, #2AA8F3 0%, #2AA8F3 100%)',
                filter: 'blur(60px)',
                borderRadius: '50%',
                // Fixed positioning from browser adjustments
                left: '203px',
                top: '-22px',
                width: '150px',
                height: '150px',
                transformOrigin: 'center center',
              }}
              initial={{
                // Start small, positioned behind image
                scale: 0.25,
                opacity: 0.15,
              }}
              animate={{
                // Expand from right to left
                x: [0, -80, -160, -240],
                y: [0, -5, -10, -15],
                scale: [0.25, 0.5, 0.85, 1.2],
                opacity: [0.15, 0.2, 0.25, 0.3],
              }}
              transition={{
                // Quick expansion phase (1.2s)
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1],
                times: [0, 0.3, 0.7, 1],
              }}
            />
            
            {/* Image container - Marketing professional PNG */}
            <div className="relative">
              <img
                src="/marketing-professional.png"
                alt="Marketing professional with smartphone"
                className="relative z-10 w-full max-w-[224px] sm:max-w-[269px] lg:max-w-[314px] xl:max-w-[358px] h-auto object-contain"
                style={{
                  filter: 'drop-shadow(-20px 0 40px rgba(42, 168, 243, 0.25))',
                }}
                onError={(e) => {
                  // Hide image container if it fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
