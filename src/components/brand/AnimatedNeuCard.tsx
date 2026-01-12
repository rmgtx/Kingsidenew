import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

const SPRING_OPTIONS = {
  mass: 1.5,
  stiffness: 500,
  damping: 100,
};

interface AnimatedNeuCardProps {
  className?: string;
  children: React.ReactNode;
  index?: number; // For staggered animation
}

export function AnimatedNeuCard({
  className,
  children,
  index = 0,
}: AnimatedNeuCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, SPRING_OPTIONS);
  const ySpring = useSpring(y, SPRING_OPTIONS);

  const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { height, width } = ref.current.getBoundingClientRect();
    const { offsetX, offsetY } = e.nativeEvent;

    const xPct = offsetX / width;
    const yPct = 1 - offsetY / height;

    // Subtle 2-4px animation range for modern feel
    const newY = 2 + yPct * 2;
    const newX = 2 + (1 - xPct) * 2;

    x.set(-newX);
    y.set(-newY);
  };

  const handleReset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Clean animated card with subtle shadow */}
      <motion.div
        ref={ref}
        style={{ transform }}
        onMouseMove={handleMove}
        onMouseLeave={handleReset}
        className={cn(
          "relative h-full rounded-xl border bg-card shadow-lg hover:shadow-xl transition-shadow cursor-pointer",
          className
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
