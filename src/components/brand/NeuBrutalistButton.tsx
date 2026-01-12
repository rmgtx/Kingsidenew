import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// Animation constants - these are the signature brand values
const SPRING_OPTIONS = {
  mass: 1.5,
  stiffness: 500,
  damping: 100,
};

interface NeuBrutalistButtonProps {
  variant?: 'primary' | 'secondary';
  href?: string;
  children: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function NeuBrutalistButton({
  variant = 'primary',
  href,
  children,
  ariaLabel,
  type,
  className,
}: NeuBrutalistButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, SPRING_OPTIONS);
  const ySpring = useSpring(y, SPRING_OPTIONS);

  const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

  // Animation handler - calculates spring offset based on mouse position
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (!ref.current) return;

    const { height, width } = ref.current.getBoundingClientRect();
    const { offsetX, offsetY } = e.nativeEvent;

    const xPct = offsetX / width;
    const yPct = 1 - offsetY / height;

    // Subtle 2-4px animation range for modern feel
    const newY = 2 + yPct * 2;
    const newX = 2 + xPct * 2;

    x.set(newX);
    y.set(-newY);
  };

  const handleReset = () => {
    x.set(0);
    y.set(0);
  };

  const isPrimary = variant === 'primary';
  const isButton = type !== undefined;
  const Component = isButton ? motion.button : motion.a;

  return (
    <Component
      ref={ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
      {...(isButton ? { type } : { href })}
      style={{ transform }}
      onMouseMove={handleMove}
      onMouseLeave={handleReset}
      onMouseDown={handleReset}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2",
        "whitespace-nowrap rounded-md text-sm font-medium",
        "h-10 px-6 py-2",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        isPrimary
          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md"
          : "bg-background text-foreground border border-border hover:bg-muted/50",
        className
      )}
      aria-label={ariaLabel}
    >
      <TextSlide>{children}</TextSlide>
      <ArrowSlide variant={variant} />
    </Component>
  );
}

const TextSlide = ({ children }: { children: string }) => {
  return (
    <span className="relative overflow-hidden">
      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
};

const ArrowSlide = ({ variant }: { variant: 'primary' | 'secondary' }) => {
  return (
    <div className="pointer-events-none flex size-5 overflow-hidden">
      <ArrowRight
        size={20}
        className={cn(
          "shrink-0 -translate-x-full transition-all duration-300 group-hover:translate-x-0",
          variant === 'primary' ? "text-accent" : "text-accent"
        )}
        aria-hidden="true"
      />
      <ArrowRight
        size={20}
        className="shrink-0 -translate-x-full transition-all duration-300 group-hover:translate-x-0"
        aria-hidden="true"
      />
    </div>
  );
};
