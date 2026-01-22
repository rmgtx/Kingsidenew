import { motion, useInView } from "framer-motion";
import React from "react";

const cards = [
  {
    title: "Strategy Development",
    description:
      "Establish clear goals for your business, such as showcasing expertise and attracting ideal clients.",
  },
  {
    title: "Design and Implementation",
    description:
      "Build intelligent AI agents that handle the admin, operations, and repetitive grind seamlessly.",
  },
  {
    title: "Content Strategy",
    description:
      "Optimize workflows and automate processes to scale your operations efficiently.",
  },
  {
    title: "Continuous Optimization",
    description:
      "Monitor performance data and refine strategies to ensure sustainable long-term growth.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
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

function InfoCard({
  card,
  className = "",
}: {
  card: (typeof cards)[0];
  className?: string;
}) {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-xl bg-card/40 backdrop-blur-md p-8 shadow-lg shadow-accent/5 ring-1 ring-border/40 transition-all duration-300 hover:bg-card/60 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 ${className}`}
    >
      {/* Decorative circle */}
      <div className="absolute top-6 right-6 h-10 w-10 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 ring-1 ring-accent/20 transition-all duration-300 group-hover:from-accent/30 group-hover:to-accent/20" />

      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground leading-tight">
        {card.title}
      </h3>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {card.description}
      </p>
    </div>
  );
}

export function InfoCardsSection() {
  const { ref, inView } = useScrollReveal({ amount: 0.2, once: true });

  return (
    <section className="w-full bg-gradient-to-b from-accent/10 via-accent/5 to-background">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-24 lg:py-32">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col items-center gap-16"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
              What We Offer
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive approach to building your automated future, step
              by step.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:gap-8">
            {cards.map((card) => (
              <motion.div key={card.title} variants={itemVariants}>
                <InfoCard card={card} className="h-full" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
