import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Crown, Shield, Star } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";

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

// Clean modern card wrapper with subtle shadows
function BentoCard({ 
  children, 
  className = "",
  accentColor = "accent",
  delay = 0,
  span = "1"
}: { 
  children: React.ReactNode; 
  className?: string;
  accentColor?: "accent" | "secondary" | "destructive" | "chart-4";
  delay?: number;
  span?: "1" | "2" | "full";
}) {
  const spanClasses = {
    "1": "",
    "2": "md:col-span-2",
    "full": "md:col-span-3"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`relative ${spanClasses[span]}`}
    >
      {/* Clean card with subtle shadow */}
      <div 
        className={`rounded-xl border bg-card p-8 lg:p-10 h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
      >
        {children}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Reclaim Time */}
          <BentoCard accentColor="secondary" delay={0}>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5">
              <Shield size={28} weight="fill" className="text-secondary" />
            </div>
            <Badge variant="outline" className="mb-4 border-secondary/30 text-secondary">
              Time Savings
            </Badge>
            <h3 className="mb-4 font-heading text-2xl font-bold">Reclaim your time</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every founder knows the grind — endless admin work and scattered tools that drain your focus. Kingside cuts through the chaos with intelligent systems that give you back your most valuable resource: time to grow, create, and lead.
            </p>
          </BentoCard>

          {/* Card 2: Big Stat - 91% (spans 2 columns) */}
          <BentoCard accentColor="accent" delay={0.1} span="2">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between h-full">
              <div>
                <Badge variant="outline" className="mb-4 border-accent/30 text-accent">
                  Revenue Impact
                </Badge>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-heading text-7xl lg:text-8xl font-bold text-accent">
                    <AnimatedCounter value={91} suffix="%" />
                  </span>
                </div>
                <p className="text-xl lg:text-2xl font-medium max-w-md">
                  of SMBs using AI say it boosts revenue
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-4 lg:mt-0 lg:text-right max-w-xs">
                Salesforce SMB Trends Report 2025
              </p>
            </div>
          </BentoCard>

          {/* Card 3: Double Stats (spans 2 columns) */}
          <BentoCard accentColor="accent" delay={0.2} span="2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full">
              <div>
                <Badge variant="outline" className="mb-4 border-accent/30 text-accent">
                  Productivity
                </Badge>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-heading text-6xl lg:text-7xl font-bold text-accent">
                    <AnimatedCounter value={87} suffix="%" />
                  </span>
                </div>
                <p className="text-lg font-medium">report higher productivity with AI</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Service Direct Small Business AI Report 2025
                </p>
              </div>
              <div>
                <Badge variant="outline" className="mb-4 border-chart-4/30 text-chart-4">
                  Time Saved
                </Badge>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-heading text-6xl lg:text-7xl font-bold text-chart-4">
                    <AnimatedCounter value={13} suffix="h" />
                  </span>
                </div>
                <p className="text-lg font-medium">saved per week by AI-powered teams</p>
                <p className="text-sm text-muted-foreground mt-2">
                  ActiveCampaign AI Study 2025
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Card 4: Compete Like Giant */}
          <BentoCard accentColor="destructive" delay={0.3}>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-destructive/20 to-destructive/5">
              <Star size={28} weight="fill" className="text-destructive" />
            </div>
            <Badge variant="outline" className="mb-4 border-destructive/30 text-destructive">
              Competitive Edge
            </Badge>
            <h3 className="mb-4 font-heading text-2xl font-bold">Compete like a giant</h3>
            <p className="text-muted-foreground leading-relaxed">
              AI isn't just for the tech giants anymore. Kingside gives small and midsize teams access to the same strategic automation and intelligence tools — empowering every business to operate smarter, scale faster, and compete with clarity.
            </p>
          </BentoCard>

          {/* Card 5: Execute with Precision (full width) */}
          <BentoCard accentColor="accent" delay={0.4} span="full">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 shrink-0">
                <Crown size={28} weight="fill" className="text-accent" />
              </div>
              <div className="flex-1">
                <Badge variant="outline" className="mb-4 border-accent/30 text-accent">
                  Execution
                </Badge>
                <h3 className="mb-4 font-heading text-2xl lg:text-3xl font-bold">Execute with precision</h3>
                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                  We don't just talk transformation — we deliver it. Kingside turns your strategic plans into daily progress with AI-driven automations that keep your business moving forward, one smart step at a time.
                </p>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
