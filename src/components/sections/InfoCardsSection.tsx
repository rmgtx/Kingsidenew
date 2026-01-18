import { motion, useInView } from "framer-motion";
import React from "react";

const cards = [
  {
    number: "01",
    title: "Strategy Development",
    description: "Establish clear goals for your business, such as showcasing expertise and attracting ideal clients."
  },
  {
    number: "02",
    title: "Design and Implementation",
    description: "Build intelligent AI agents that handle the admin, operations, and repetitive grind seamlessly."
  },
  {
    number: "03",
    title: "Content Strategy",
    description: "Optimize workflows and automate processes to scale your operations efficiently."
  },
  {
    number: "04",
    title: "Continuous Optimization",
    description: "Monitor performance data and refine strategies to ensure sustainable long-term growth."
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2, // Delay between header, row 1, row 2
    },
  },
};

const wrapperVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

function useScrollReveal({ amount = 0.2, once = true } = {}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount, once });
  return { ref, inView };
}

function InfoCard({ card, className = "" }: { card: typeof cards[0]; className?: string }) {
  // Use a simple div here, relying on the parent wrapper for entrance animation
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-3xl bg-white/40 backdrop-blur-md p-8 shadow-lg shadow-sky-500/5 ring-1 ring-white/60 transition-all duration-300 hover:bg-white/60 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 ${className}`}
    >
      {/* Decorative circle in top right */}
      <div className="absolute top-6 right-6 h-10 w-10 rounded-full bg-gradient-to-br from-sky-100 to-sky-50 ring-1 ring-sky-100 transition-all duration-300 group-hover:from-sky-200 group-hover:to-sky-100" />

      {/* Title */}
      <h3 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900 leading-tight">
        {card.title}
      </h3>

      {/* Description */}
      <p className="mt-4 text-sm leading-relaxed text-neutral-500">
        {card.description}
      </p>
    </div>
  );
}

export function InfoCardsSection() {
  const { ref, inView } = useScrollReveal({ amount: 0.2, once: true });

  return (
    <section className="w-full bg-gradient-to-b from-sky-100/50 via-sky-50/40 to-white/20">
      <div className="mx-auto max-w-6xl px-6 py-32 sm:py-40">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col items-center gap-16"
        >
          {/* Header Section */}
          <motion.div
            variants={wrapperVariants}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">
              What We Offer
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              A comprehensive approach to building your automated future, step by step.
            </p>
          </motion.div>

          <div className="grid w-full gap-6 sm:grid-cols-2 lg:gap-8">
            {/* Row 1 - Cards 1 & 2 */}
            <motion.div variants={wrapperVariants} className="flex flex-col gap-6 lg:gap-8">
              <InfoCard card={cards[0]} className="h-full" />
            </motion.div>

            <motion.div variants={wrapperVariants} className="flex flex-col gap-6 lg:gap-8">
              <InfoCard card={cards[1]} className="h-full" />
            </motion.div>

            {/* Row 2 - Cards 3 & 4 (Wait for Row 1) */}
            <motion.div variants={wrapperVariants} className="flex flex-col gap-6 lg:gap-8">
              <InfoCard card={cards[2]} className="h-full" />
            </motion.div>

            <motion.div variants={wrapperVariants} className="flex flex-col gap-6 lg:gap-8">
              <InfoCard card={cards[3]} className="h-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
