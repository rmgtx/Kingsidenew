# Kingside Brand Components - Exact Code Reference

This document contains the exact code for brand components that MUST be preserved during the fresh start rebuild.

---

## IMPORTANT: What to Use vs. Replace

| Component | Action | Reason |
|-----------|--------|--------|
| NeuBrutalistButton | **KEEP EXACTLY** | Signature brand animation |
| AnimatedTaskText | **KEEP EXACTLY** | Hero rotating text with brand colors |
| ConfirmationModal | **SIMPLIFY** | Use shadcn Dialog + basic animation |
| NeuCard | **REPLACE** | Use shadcn Card + CSS shadow |
| AnimatedNeuCard | **REPLACE** | Use shadcn Card + CSS hover |
| ShiftHighlightTabs | **REPLACE** | Use shadcn Tabs |

**Only NeuBrutalistButton and AnimatedTaskText require the exact code below.**

For other components, use shadcn equivalents with brand colors applied.

---

## 1. NeuBrutalistButton (CRITICAL)

This is the signature brand animation. **DO NOT MODIFY THE ANIMATION LOGIC.**

```tsx
import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

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
}

export function NeuBrutalistButton({
  variant = 'primary',
  href,
  children,
  ariaLabel,
  type
}: NeuBrutalistButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, SPRING_OPTIONS);
  const ySpring = useSpring(y, SPRING_OPTIONS);

  const transform = useMotionTemplate`translateX(${xSpring}px) translateY(${ySpring}px)`;

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (!ref.current) return;

    const { height, width } = ref.current.getBoundingClientRect();
    const { offsetX, offsetY } = e.nativeEvent;

    const xPct = offsetX / width;
    const yPct = 1 - offsetY / height;

    const newY = 6 + yPct * 6;
    const newX = 6 + xPct * 6;

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
    <div className="relative h-14 w-full sm:w-auto">
      {/* Shadow Layer */}
      <div
        className="absolute inset-0 w-full h-full border border-border"
        style={{
          backgroundColor: isPrimary ? 'var(--accent)' : 'var(--secondary)',
          borderRadius: 'var(--radius-lg)',
        }}
      />

      {/* Animated Button Layer */}
      <Component
        ref={ref as any}
        {...(isButton ? { type } : { href })}
        style={{
          transform,
          borderRadius: 'var(--radius-lg)',
          fontFamily: 'var(--font-family-body)',
          fontWeight: 'var(--font-weight-semibold)',
          fontSize: 'clamp(15px, 1vw, 17px)',
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleReset}
        onMouseDown={handleReset}
        className={`
          group relative flex h-full w-full items-center justify-center gap-3 border px-8 py-4 min-h-14
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          ${isPrimary
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-background text-foreground border-border'
          }
        `}
        aria-label={ariaLabel}
      >
        <TextSlide>{children}</TextSlide>
        <ArrowSlide variant={variant} />
      </Component>
    </div>
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
    <div className="pointer-events-none flex h-5 w-5 overflow-hidden">
      <ArrowRight
        size={20}
        className="shrink-0 -translate-x-full transition-all duration-300 group-hover:translate-x-0"
        style={{
          color: variant === 'primary' ? 'var(--accent)' : 'var(--secondary)',
        }}
        aria-hidden="true"
      />
      <ArrowRight
        size={20}
        className="shrink-0 -translate-x-full transition-all duration-300 group-hover:translate-x-0"
        style={{
          color: 'inherit',
        }}
        aria-hidden="true"
      />
    </div>
  );
};
```

---

## 2. AnimatedTaskText

Rotating text for Hero section with color cycling.

```tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AnimatedTaskTextProps {
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedTaskText({ className, style }: AnimatedTaskTextProps) {
  const tasks = [
    { text: "BUSY WORK", color: "var(--foreground)" },
    { text: "PAPERWORK", color: "var(--accent)" },
    { text: "FOLLOW-UPS", color: "var(--secondary)" },
    { text: "QUOTES", color: "var(--destructive)" },
    { text: "INVOICING", color: "var(--chart-3)" },
    { text: "DATA ENTRY", color: "var(--chart-4)" },
    { text: "SCHEDULING", color: "var(--chart-5)" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tasks.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [tasks.length]);

  return (
    <div
      className="relative block w-full"
      style={{ overflow: 'visible', overflowY: 'hidden' }}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentIndex}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className={className}
          style={{
            ...style,
            color: tasks[currentIndex].color,
            position: "absolute",
            top: 0,
            left: 0,
            width: "max-content",
            minWidth: "100%",
            whiteSpace: "nowrap",
            overflow: "visible",
            textAlign: "left",
          }}
        >
          {tasks[currentIndex].text}
        </motion.h1>
      </AnimatePresence>
      {/* Placeholder for height */}
      <h1
        aria-hidden="true"
        className={className}
        style={{
          ...style,
          opacity: 0,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          overflow: "visible",
        }}
      >
        SCHEDULING
      </h1>
    </div>
  );
}
```

---

## 3. NeuCard (NEW - Create This)

Reusable wrapper for neubrutalist shadow pattern.

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: 'accent' | 'secondary' | 'destructive';
  shadowOffset?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const shadowColors = {
  accent: 'bg-accent',
  secondary: 'bg-secondary',
  destructive: 'bg-destructive',
};

const offsets = {
  sm: 4,
  md: 8,
  lg: 12,
};

export function NeuCard({
  shadow = 'accent',
  shadowOffset = 'md',
  className,
  children,
  ...props
}: NeuCardProps) {
  return (
    <div className="relative" {...props}>
      {/* Shadow layer */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl border-2 border-border",
          shadowColors[shadow]
        )}
        style={{
          transform: `translate(${offsets[shadowOffset]}px, ${offsets[shadowOffset]}px)`,
        }}
      />
      {/* Card layer */}
      <div
        className={cn(
          "relative rounded-xl border-2 border-border bg-background",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
```

---

## 4. Animated NeuCard (for WhyKingside)

Cards with spring-physics hover animation.

```tsx
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
  shadow?: 'accent' | 'secondary' | 'destructive';
  className?: string;
  children: React.ReactNode;
  index?: number; // For staggered animation
}

const shadowColors = {
  accent: 'var(--accent)',
  secondary: 'var(--secondary)',
  destructive: 'var(--destructive)',
};

export function AnimatedNeuCard({
  shadow = 'accent',
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

    const newY = 6 + yPct * 6;
    const newX = 6 + (1 - xPct) * 6;

    x.set(-newX);
    y.set(-newY);
  };

  const handleReset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* Shadow layer */}
      <div
        className="absolute inset-0 rounded-xl border-2 border-border"
        style={{
          backgroundColor: shadowColors[shadow],
          transform: "translate(8px, 8px)",
        }}
      />

      {/* Animated card */}
      <motion.div
        ref={ref}
        style={{ transform }}
        onMouseMove={handleMove}
        onMouseLeave={handleReset}
        className={cn(
          "relative h-full rounded-xl border-2 border-border bg-background cursor-pointer",
          className
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
```

---

## 5. ConfirmationModal

Spring-animated success modal.

```tsx
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle } from "@phosphor-icons/react";

interface ConfirmationModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ConfirmationModal({ isOpen, setIsOpen }: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 grid place-items-center z-50 px-4"
          style={{
            backgroundColor: 'rgba(17, 17, 17, 0.3)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.85, rotate: '8deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0.9, rotate: '-3deg' }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 16
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md"
          >
            {/* Shadow */}
            <div
              className="absolute inset-0 border-2 bg-accent border-border rounded-xl"
              style={{ transform: 'translate(8px, 8px)' }}
            />

            {/* Modal */}
            <div className="relative border-2 p-8 bg-background border-border rounded-xl">
              <div className="flex flex-col items-center">
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center mb-4 border-2 border-accent rounded-full bg-accent/10">
                  <CheckCircle size={32} className="text-accent" weight="bold" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-center text-foreground font-heading text-2xl font-medium">
                  Message Sent!
                </h3>

                {/* Description */}
                <p className="text-center mb-6 text-foreground/80 font-body">
                  Thanks for reaching out — our team at Kingside will contact you soon.
                </p>

                {/* Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full sm:w-auto px-8 py-3 border-2 bg-primary text-primary-foreground border-primary rounded-lg font-body font-semibold hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## 6. ShiftHighlightTabs

Custom neubrutalist tabs for IntelligentAutomation section.

```tsx
interface ShiftHighlightTabsProps {
  selected: string;
  onSelectedChange: (id: string) => void;
}

const TABS = [
  { id: "marketing", label: "Marketing" },
  { id: "sales", label: "Sales" },
  { id: "operations", label: "Operations" },
  { id: "customer-service", label: "Customer Service" },
];

export function ShiftHighlightTabs({ selected, onSelectedChange }: ShiftHighlightTabsProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full max-w-5xl">
        {TABS.map((tab) => (
          <ToggleButton
            key={tab.id}
            id={tab.id}
            selected={selected}
            setSelected={onSelectedChange}
          >
            {tab.label}
          </ToggleButton>
        ))}
      </div>
    </div>
  );
}

interface ToggleButtonProps {
  children: string;
  selected: string;
  setSelected: (id: string) => void;
  id: string;
}

const ToggleButton = ({ children, selected, setSelected, id }: ToggleButtonProps) => {
  const isActive = selected === id;

  return (
    <div className="relative h-14 w-full" style={{ borderRadius: 'var(--radius-lg)' }}>
      {/* Shadow layer */}
      <div
        className="absolute inset-0 w-full h-full border border-border"
        style={{
          backgroundColor: 'var(--accent)',
          borderRadius: 'var(--radius-lg)',
        }}
      />

      {/* Button */}
      <button
        onClick={() => setSelected(id)}
        className={`
          relative w-full h-full px-3 sm:px-4 py-3 sm:py-4 min-h-14 border transition-all origin-top-left border-border
          ${isActive
            ? "-translate-y-1 bg-primary text-primary-foreground"
            : "bg-background hover:-rotate-2 text-foreground"
          }
        `}
        style={{
          fontFamily: 'var(--font-family-body)',
          fontWeight: 'var(--font-weight-semibold)',
          fontSize: 'clamp(13px, 2vw, 17px)',
          borderRadius: 'var(--radius-lg)',
        }}
        aria-pressed={isActive}
        aria-label={`${children} automation`}
      >
        {children}
      </button>
    </div>
  );
};
```

---

## Chess Piece SVG Paths

Located in `src/imports/svg-s90zob6txr.ts`:

```typescript
// Reference the existing file - these are the chess piece icons used in WhyKingside
// p2a58e600 = Rook (purple)
// p397a4ff0 = Queen (red)
// p1276fe00 = King (blue)
```

---

**Document Version:** 1.0
**Last Updated:** January 12, 2026
