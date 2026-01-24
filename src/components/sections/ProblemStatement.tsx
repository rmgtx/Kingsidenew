import React from "react";
import { motion, useInView } from "motion/react";
import { ChartBar, Target, Lightning } from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// --- Data ---
const PAIRS: {
  pain: string;
  solution: string;
  icon: PhosphorIcon;
}[] = [
  {
    pain: "Manually pulling reports every Monday",
    solution: "Dashboards that update themselves",
    icon: ChartBar,
  },
  {
    pain: "Chasing leads through sticky notes and spreadsheets",
    solution: "Automated follow-ups that never miss",
    icon: Target,
  },
  {
    pain: "Reacting to problems after they cost you",
    solution: "Predictive insights before they happen",
    icon: Lightning,
  },
];

// --- Animation constants ---
const EASING = [0.22, 1, 0.36, 1] as const;
const BLOCK_ENTRANCE_DELAY = 0.3;
const BLOCK_STAGGER = 0.2;
const STRIKETHROUGH_DURATION = 500; // ms

// --- Variants ---
const headerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASING },
  },
};

// --- Components ---
interface StatementBlockProps {
  pain: string;
  solution: string;
  icon: PhosphorIcon;
  index: number;
  parentInView: boolean;
}

const StatementBlock = React.memo(function StatementBlock({
  pain,
  solution,
  icon: Icon,
  index,
  parentInView,
}: StatementBlockProps) {
  const entranceDelay = BLOCK_ENTRANCE_DELAY + index * BLOCK_STAGGER;
  const blockRef = React.useRef<HTMLDivElement | null>(null);

  // Use parentInView + stagger instead of separate blockInView
  const [strikeComplete, setStrikeComplete] = React.useState(false);

  React.useEffect(() => {
    if (!parentInView) return;
    // Delay strikethrough based on entrance + extra pause
    const strikeDelay = (entranceDelay + 0.3) * 1000;
    const timer = setTimeout(() => setStrikeComplete(true), strikeDelay + STRIKETHROUGH_DURATION);
    return () => clearTimeout(timer);
  }, [parentInView, entranceDelay]);

  return (
    <motion.div
      ref={blockRef}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={parentInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: entranceDelay, duration: 0.6, ease: EASING }}
      className={cn(
        "relative rounded-2xl p-6 sm:p-8 lg:p-10 transition-all duration-700",
        strikeComplete
          ? "bg-accent/[0.04] ring-1 ring-accent/20 shadow-md shadow-accent/5"
          : "bg-white ring-1 ring-neutral-200/60 shadow-sm"
      )}
    >
      {/* Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={parentInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: entranceDelay + 0.1, duration: 0.4, ease: EASING }}
        className="mb-3 sm:mb-4"
      >
        <Icon
          size={28}
          weight="bold"
          className={cn(
            "transition-colors duration-500",
            strikeComplete ? "text-accent" : "text-muted-foreground"
          )}
        />
      </motion.div>

      {/* Pain text with CSS strikethrough */}
      <span
        className={cn(
          "text-lg sm:text-xl lg:text-2xl font-heading font-medium transition-all duration-500 block",
          strikeComplete && "line-through decoration-accent/50 decoration-2",
          strikeComplete ? "text-muted-foreground/40" : "text-foreground"
        )}
      >
        {pain}
      </span>

      {/* Solution text — fades in after strikethrough completes */}
      <motion.p
        className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-foreground mt-3 sm:mt-4"
        initial={{ opacity: 0, y: 12 }}
        animate={strikeComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: EASING }}
      >
        {solution}
      </motion.p>
    </motion.div>
  );
});

export function ProblemStatement() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.2, once: true });

  return (
    <section className="w-full bg-background" aria-label="Problems we solve">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-24 lg:py-32">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Header */}
          <motion.div
            variants={headerVariants}
            className="text-center mb-12 lg:mb-16"
          >
            <motion.p
              variants={itemVariant}
              className="text-xs sm:text-sm uppercase tracking-widest text-accent font-medium mb-4"
            >
              Sound familiar?
            </motion.p>
            <motion.h2
              variants={itemVariant}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            >
              The old playbook is over.
            </motion.h2>
            <motion.p
              variants={itemVariant}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-4 sm:mt-6"
            >
              We transform how teams work by replacing manual processes with intelligent automation.
            </motion.p>
          </motion.div>

          {/* Statement Blocks */}
          <div className="mx-auto max-w-5xl flex flex-col gap-5 sm:gap-6">
            {PAIRS.map((pair, i) => (
              <StatementBlock
                key={pair.pain}
                pain={pair.pain}
                solution={pair.solution}
                icon={pair.icon}
                index={i}
                parentInView={inView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
