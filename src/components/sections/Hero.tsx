import React from "react";
import { motion } from "motion/react";
import { BrandButton, GridPattern } from "@/components";

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
      className="relative overflow-hidden bg-background group border-b border-border"
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

      {/* Gradient fade - transitions grid to background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 lg:h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-0 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-end">
          {/* Left column - Text content */}
          <div className="max-w-xl pointer-events-auto pb-12 lg:pb-16">
            {/* Eyebrow text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs sm:text-sm font-medium tracking-widest uppercase text-sky-500 mb-6"
            >
              Put your busy work in check
            </motion.p>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6"
            >
              Your business is unique. Your AI should be too.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10"
            >
              Kingside transforms messy operations into reliable AI systems that bridge the gap between custom software and human adoption.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <BrandButton
                href="#contact"
                variant="brand"
                size="lg"
                aria-label="Try it firsthand"
              >
                Try it firsthand
              </BrandButton>
              <BrandButton
                href="#why-kingside"
                variant="brandOutline"
                size="lg"
                aria-label="Schedule a demo"
              >
                Schedule a demo
              </BrandButton>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Marketing professional image - hidden on mobile, visible on lg+ */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="hidden lg:flex absolute top-20 bottom-0 right-5 sm:right-6 lg:right-8 xl:right-[calc((100vw-80rem)/2+2rem)] flex-col justify-end items-end pointer-events-auto z-10"
      >
        {/* ============================================
            ANIMATED BLUE GLOW EFFECT - Hero Background
            Hidden on mobile to prevent overflow, visible on lg+
            ============================================ */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-accent/30 blur-3xl"
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
        </div>

        {/* Image container - Marketing professional WebP */}
        <div className="relative h-full">
          <img
            src={`${import.meta.env.BASE_URL}marketing-professional.webp`}
            alt="Marketing professional with smartphone"
            className="relative z-10 h-full w-auto object-contain object-bottom"
            onError={(e) => {
              // Hide image container if it fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
