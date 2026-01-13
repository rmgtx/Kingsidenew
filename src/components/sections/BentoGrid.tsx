import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

// Animated counter component
function AnimatedCounter({ 
  value, 
  suffix = "",
  duration = 2 
}: { 
  value: number; 
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

// Simplified card wrapper with solid backgrounds
function BentoCard({ 
  children, 
  className = "",
  bgColor = "white",
  delay = 0,
  span = "1"
}: { 
  children: React.ReactNode; 
  className?: string;
  bgColor?: "primary" | "accent" | "white";
  delay?: number;
  span?: "1" | "2" | "full";
}) {
  const spanClasses = {
    "1": "",
    "2": "md:col-span-2",
    "full": "md:col-span-3"
  };

  const bgClasses = {
    "primary": "bg-primary",
    "accent": "bg-accent",
    "white": "bg-background"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`relative ${spanClasses[span]}`}
    >
      <div className={`h-full ${bgClasses[bgColor]} rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-[1.02] transition-transform duration-300 ${className}`}>
        <div className="p-8 lg:p-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export function BentoGrid() {
  return (
    <section id="why-kingside" className="py-24 lg:py-32 px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 lg:mb-20"
        >
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Your next move…<br />
            <span className="text-accent">INTELLIGENT AUTOMATION</span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Row 1: Card 1 - Reclaim Time (1 col, bg-accent) */}
          <BentoCard bgColor="accent" delay={0}>
            <h3 className="mb-4 font-heading text-2xl lg:text-3xl font-bold text-white">Reclaim your time</h3>
            <p className="text-base lg:text-lg leading-relaxed text-white">
              Every founder knows the grind — endless admin work and scattered tools that drain your focus. Kingside cuts through the chaos with intelligent systems that give you back your most valuable resource: time to grow, create, and lead.
            </p>
          </BentoCard>

          {/* Row 1: Card 2 - 91% Stat (2 col, bg-primary) */}
          <BentoCard bgColor="primary" delay={0.1} span="2">
            <div className="flex flex-col h-full">
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-heading text-6xl lg:text-7xl font-bold text-white">
                    <AnimatedCounter value={91} suffix="%" />
                  </span>
                </div>
                <p className="text-lg lg:text-xl font-medium text-white mb-6">
                  of SMBs using AI say it boosts revenue
                </p>
              </div>
              <p className="text-xs opacity-70 text-white" aria-label="Source: Salesforce SMB Trends Report 2025">
                Salesforce SMB Trends Report 2025
              </p>
            </div>
          </BentoCard>

          {/* Row 2: Card 3 - 87% Productivity Stat (1 col, bg-white) */}
          <BentoCard bgColor="white" delay={0.2}>
            <div className="flex flex-col h-full">
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-heading text-6xl lg:text-7xl font-bold text-foreground">
                    <AnimatedCounter value={87} suffix="%" />
                  </span>
                </div>
                <p className="text-lg lg:text-xl font-medium text-foreground mb-6">
                  report higher productivity with AI
                </p>
              </div>
              <p className="text-xs opacity-70 text-muted-foreground" aria-label="Source: Service Direct Small Business AI Report 2025">
                Service Direct Small Business AI Report 2025
              </p>
            </div>
          </BentoCard>

          {/* Row 2: Card 4 - 13h Saved Stat (1 col, bg-accent) */}
          <BentoCard bgColor="accent" delay={0.25}>
            <div className="flex flex-col h-full">
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-heading text-6xl lg:text-7xl font-bold text-white">
                    <AnimatedCounter value={13} suffix="h" />
                  </span>
                </div>
                <p className="text-lg lg:text-xl font-medium text-white mb-6">
                  saved per week by AI-powered teams
                </p>
              </div>
              <p className="text-xs opacity-70 text-white" aria-label="Source: ActiveCampaign AI Study 2025">
                ActiveCampaign AI Study 2025
              </p>
            </div>
          </BentoCard>

          {/* Row 2: Card 5 - Compete Like Giant (1 col, bg-white) */}
          <BentoCard bgColor="white" delay={0.3}>
            <h3 className="mb-4 font-heading text-2xl lg:text-3xl font-bold text-foreground">Compete like a giant</h3>
            <p className="text-base lg:text-lg leading-relaxed text-foreground">
              AI isn't just for the tech giants anymore. Kingside gives small and midsize teams access to the same strategic automation and intelligence tools — empowering every business to operate smarter, scale faster, and compete with clarity.
            </p>
          </BentoCard>

          {/* Row 3: Card 6 - Execute with Precision (full width, bg-primary) */}
          <BentoCard bgColor="primary" delay={0.4} span="full">
            <h3 className="mb-4 font-heading text-2xl lg:text-3xl font-bold text-white">Execute with precision</h3>
            <p className="text-base lg:text-lg leading-relaxed text-white max-w-3xl">
              We don't just talk transformation — we deliver it. Kingside turns your strategic plans into daily progress with AI-driven automations that keep your business moving forward, one smart step at a time.
            </p>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
