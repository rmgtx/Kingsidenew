import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedTaskTextProps {
  className?: string;
}

export function AnimatedTaskText({ className }: AnimatedTaskTextProps) {
  const tasks = [
    { text: "BUSY WORK", colorClass: "text-foreground" },
    { text: "PAPERWORK", colorClass: "text-accent" },
    { text: "FOLLOW-UPS", colorClass: "text-secondary" },
    { text: "QUOTES", colorClass: "text-destructive" },
    { text: "INVOICING", colorClass: "text-chart-3" },
    { text: "DATA ENTRY", colorClass: "text-chart-4" },
    { text: "SCHEDULING", colorClass: "text-chart-5" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tasks.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [tasks.length]);

  // Animation values - signature brand animation
  const animationOffset = 40;
  const animationDuration = 0.6;

  return (
    <div
      className="relative block w-full overflow-y-clip"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: animationOffset, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -animationOffset, opacity: 0 }}
          transition={{
            duration: animationDuration,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className={cn(
            "absolute top-0 left-0 whitespace-nowrap drop-shadow-glow",
            className,
            tasks[currentIndex].colorClass
          )}
        >
          {tasks[currentIndex].text}
        </motion.span>
      </AnimatePresence>
      {/* Placeholder for height */}
      <span
        aria-hidden="true"
        className={cn("opacity-0 pointer-events-none whitespace-nowrap", className)}
      >
        SCHEDULING
      </span>
    </div>
  );
}
