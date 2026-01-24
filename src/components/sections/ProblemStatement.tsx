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

  // Each block observes its own viewport presence for the strikethrough
  const blockRef = React.useRef<HTMLDivElement | null>(null);
  const blockInView = useInView(blockRef, { amount: 0.6, once: true });

  const [strikeComplete, setStrikeComplete] = React.useState(false);

  // After strikethrough finishes drawing, reveal the solution
  React.useEffect(() => {
    if (!blockInView) return;
    const timer = setTimeout(() => setStrikeComplete(true), STRIKETHROUGH_DURATION);
    return () => clearTimeout(timer);
  }, [blockInView]);

  return (
    <motion.div
      ref={blockRef}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={parentInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: entranceDelay, duration: 0.6, ease: EASING }}
      className={cn(
        "relative rounded-2xl p-8 sm:p-10 lg:p-12 transition-all duration-700",
        strikeComplete
          ? "bg-accent/[0.04] ring-1 ring-accent/20 shadow-md shadow-accent/5"
          : "bg-white ring-1 ring-neutral-200/60 shadow-sm"
      )}
    >
      {/* Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={blockInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, ease: EASING }}
        className="mb-4 sm:mb-5"
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

      {/* Pain text with strikethrough */}
      <div className="relative inline-block">
        <span
          className={cn(
            "text-xl sm:text-2xl lg:text-3xl font-heading font-medium transition-colors duration-500",
            strikeComplete ? "text-muted-foreground/40" : "text-foreground"
          )}
        >
          {pain}
        </span>
        <motion.div
          aria-hidden="true"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full bg-accent/50 origin-left"
          initial={{ scaleX: 0 }}
          animate={blockInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, ease: EASING }}
        />
      </div>

      {/* Solution text — fades in after strikethrough completes */}
      <motion.p
        className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mt-4 sm:mt-5"
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
