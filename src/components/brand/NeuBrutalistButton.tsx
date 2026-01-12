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
  size?: 'sm' | 'default' | 'lg';
  href?: string;
  children: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const sizeClasses = {
  sm: "h-8 px-4 text-xs gap-1.5",
  default: "h-10 px-6 text-sm gap-2",
  lg: "h-12 px-8 text-base gap-2.5",
};

const arrowSizes = {
  sm: 16,
  default: 20,
  lg: 24,
};

export function NeuBrutalistButton({
  variant = 'primary',
  size = 'default',
  href,
  children,
  ariaLabel,
  type,
  className,
  disabled = false,
}: NeuBrutalistButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, SPRING_OPTIONS);
  const ySpring = useSpring(y, SPRING_OPTIONS);

  const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

  // Animation handler - calculates spring offset based on mouse position
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (!ref.current || disabled) return;

    const { height, width } = ref.current.getBoundingClientRect();
    const { offsetX, offsetY } = e.nativeEvent;

    const xPct = offsetX / width;
    const yPct = 1 - offsetY / height;

    // Noticeable 4-8px animation range for modern feel
    const newY = 4 + yPct * 4;
    const newX = 4 + xPct * 4;

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

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Component
      ref={ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
      {...(isButton 
        ? { type, disabled } 
        : { href, onClick: handleAnchorClick }
      )}
      style={{ transform }}
      onMouseMove={handleMove}
      onMouseLeave={handleReset}
      onMouseDown={handleReset}
      className={cn(
        // Base styles - consistent across all instances
        "group relative inline-flex items-center justify-center",
        "whitespace-nowrap rounded-md font-medium",
        "transition-all duration-200",
        "outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "disabled:pointer-events-none disabled:opacity-50",
        "cursor-pointer",
        // Size variants
        sizeClasses[size],
        // Variant styles
        isPrimary
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        // Disabled state
        disabled && "cursor-not-allowed",
        // Custom className override
        className
      )}
      aria-label={ariaLabel || children}
      aria-disabled={disabled}
    >
      <TextSlide>{children}</TextSlide>
      <ArrowSlide variant={variant} size={size} />
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

const ArrowSlide = ({ variant, size }: { variant: 'primary' | 'secondary'; size: 'sm' | 'default' | 'lg' }) => {
  const containerSizes = {
    sm: "size-4",
    default: "size-5",
    lg: "size-6",
  };

  return (
    <div className={cn("pointer-events-none flex overflow-hidden", containerSizes[size])}>
      <ArrowRight
        size={arrowSizes[size]}
        className={cn(
          "shrink-0 -translate-x-full transition-all duration-300 group-hover:translate-x-0",
          variant === 'primary' ? "text-accent" : "text-foreground"
        )}
        aria-hidden="true"
      />
    </div>
  );
};
