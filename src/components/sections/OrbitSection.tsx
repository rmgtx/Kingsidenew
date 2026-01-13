import React from 'react';

// Import PNG icons (large versions for retina)
import ClaudeIcon from '@/assets/large icons/Claudelarge.png';
import CopilotIcon from '@/assets/large icons/Copilotlarge.png';
import CursorIcon from '@/assets/large icons/Cursorlarge.png';
import FigmaIcon from '@/assets/large icons/Figmalarge.png';
import GeminiIcon from '@/assets/large icons/Geminilarge.png';
import GitHubIcon from '@/assets/large icons/GitHublarge.png';
import GoogleDriveIcon from '@/assets/large icons/Google Drive large.png';
import GPTIcon from '@/assets/large icons/GPTlarge.png';
import GrokIcon from '@/assets/large icons/Groklarge.png';
import MidjourneyIcon from '@/assets/large icons/Midjourneylarge.png';
import N8nIcon from '@/assets/large icons/n8nlarge.png';
import OllamaIcon from '@/assets/large icons/Ollamalarge.png';
import OneDriveIcon from '@/assets/large icons/One Drive large.png';

export function OrbitSection() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-end overflow-hidden bg-background text-foreground min-h-[700px] pb-[400px] border-t border-b border-border"
      aria-label="AI tools we work with"
    >
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        {/* Header Content */}
        <div className="max-w-4xl space-y-4 relative z-20">
          {/* Eyebrow Text */}
          <p className="text-sm font-medium tracking-wide uppercase text-accent">
            Open-Ecosystem Integration
          </p>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Unbiased model selection.<br className="hidden md:block" />
            <span className="text-accent">Unrestricted capabilities.</span>
          </h2>
        </div>
      </div>

      {/* Subtle gradient at orbit center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center bottom, rgba(32, 164, 243, 0.28) 0%, rgba(32, 164, 243, 0.18) 15%, rgba(32, 164, 243, 0.10) 30%, rgba(32, 164, 243, 0.05) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      {/* Orbit Animation Section */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        {/* Orbit 1 (Inner) - LLMs */}
        <OrbitingCircles radius={140} duration={9} reverse>
          <TechIcon src={ClaudeIcon} alt="Claude" />
          <TechIcon src={GPTIcon} alt="ChatGPT" />
          <TechIcon src={GeminiIcon} alt="Google Gemini" />
          <TechIcon src={OllamaIcon} alt="Ollama" />
        </OrbitingCircles>

        {/* Orbit 2 (Middle) - Dev/AI Tools */}
        <OrbitingCircles radius={250} duration={14}>
          <TechIcon src={CursorIcon} alt="Cursor" />
          <TechIcon src={FigmaIcon} alt="Figma" />
          <TechIcon src={MidjourneyIcon} alt="Midjourney" />
          <TechIcon src={GrokIcon} alt="Grok" />
          <TechIcon src={CopilotIcon} alt="GitHub Copilot" />
        </OrbitingCircles>

        {/* Orbit 3 (Outer) - Integrations */}
        <OrbitingCircles radius={360} duration={19} reverse>
          <TechIcon src={N8nIcon} alt="n8n" />
          <TechIcon src={GoogleDriveIcon} alt="Google Drive" />
          <TechIcon src={OneDriveIcon} alt="OneDrive" />
          <TechIcon src={GitHubIcon} alt="GitHub" />
        </OrbitingCircles>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbit-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .orbit-container {
            animation: none !important;
          }
          .orbit-counter-rotate {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

// --- Sub-components ---

interface OrbitingCirclesProps {
  radius?: number;
  duration?: number;
  reverse?: boolean;
  children: React.ReactNode;
}

function OrbitingCircles({
  radius = 150,
  duration = 20,
  reverse = false,
  children
}: OrbitingCirclesProps) {
  const cssDuration = `${duration}s`;
  const cssDirection = reverse ? 'reverse' : 'normal';

  const items = React.Children.toArray(children);
  const count = items.length;

  return (
    <div className="absolute flex items-center justify-center">
      {/* The Ring Track (Visual only) */}
      <div
        className="absolute rounded-full border border-border"
        style={{
          width: radius * 2,
          height: radius * 2
        }}
      />

      {/* The Spinner Container */}
      <div
        className="orbit-container absolute flex items-center justify-center"
        style={{
          width: radius * 2,
          height: radius * 2,
          animation: `orbit ${cssDuration} linear infinite ${cssDirection}`
        }}
      >
        {items.map((child, index) => {
          const angle = (360 / count) * index;
          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg) translate(-50%, -50%)`,
              }}
            >
              {/* Counter-rotate to keep icons upright */}
              <div
                className="orbit-counter-rotate"
                style={{
                  animation: `orbit-reverse ${cssDuration} linear infinite ${cssDirection}`
                }}
              >
                {child}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface TechIconProps {
  src: string;
  alt: string;
}

function TechIcon({ src, alt }: TechIconProps) {
  return (
    <div className="group relative flex flex-col items-center justify-center">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-card border border-border shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover rounded-xl"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default OrbitSection;
