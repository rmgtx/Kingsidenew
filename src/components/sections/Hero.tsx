import React from "react";
import { motion } from "motion/react";
import { NeuBrutalistButton, GridPattern } from "@/components";

export function Hero() {
  const gridContainerRef = React.useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!gridContainerRef.current) return;
    
    const rect = gridContainerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate the snapped grid coordinates (30px grid size)
    const gridSize = 30;
    const col = Math.floor(mouseX / gridSize);
    const row = Math.floor(mouseY / gridSize);
    
    const squareX = col * gridSize;
    const squareY = row * gridSize;
    
    gridContainerRef.current.style.setProperty('--mouse-x', `${mouseX}px`);
    gridContainerRef.current.style.setProperty('--mouse-y', `${mouseY}px`);
    gridContainerRef.current.style.setProperty('--grid-x', `${squareX}px`);
    gridContainerRef.current.style.setProperty('--grid-y', `${squareY}px`);
  };

  return (
    <section 
      className="relative overflow-hidden bg-background group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Grid Pattern Background */}
      <div ref={gridContainerRef} className={`absolute inset-0 z-0 ${isHovering ? 'grid-hovering' : ''}`}>
        <GridPattern 
          width={30} 
          height={30} 
          className="opacity-100"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-8 pt-32 lg:pt-40 pb-24 lg:pb-32 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column - Text content */}
          <div className="max-w-xl pointer-events-auto">
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
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6"
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
            className="relative flex justify-center lg:justify-end pointer-events-auto"
          >
            {/* ============================================
                ANIMATED BLUE GLOW EFFECT - Hero Background
                Starts behind marketing image, expands right-to-left
                ============================================ */}
            <motion.div
              className="absolute pointer-events-none right-0 top-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-accent/30 blur-3xl"
              initial={{ x: 64, y: 0, scale: 0.25, opacity: 0.15 }}
              animate={{
                x: [64, -80, -160, -240],
                y: [0, -5, -10, -15],
                scale: [0.25, 0.5, 0.85, 1.2],
                opacity: [0.15, 0.2, 0.25, 0.3],
              }}
              transition={{
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1],
                times: [0, 0.3, 0.7, 1],
              }}
            />
            
            {/* Image container - Marketing professional WebP */}
            <div className="relative">
              <img
                src={`${import.meta.env.BASE_URL}marketing-professional.webp`}
                alt="Marketing professional with smartphone"
                className="relative z-10 w-full max-w-56 sm:max-w-72 lg:max-w-80 xl:max-w-96 h-auto object-contain"
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
