import { motion, useInView } from "framer-motion";
import React from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.06 } }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function useScrollReveal({ amount = 0.25, once = true } = {}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount, once });
  return { ref, inView };
}

export function InfoCardsSection() {
  const { ref, inView } = useScrollReveal({ amount: 0.25, once: true });

  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center"
        >
          <motion.h2
            variants={item}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl"
          >
            {/* Add your section title here */}
            New Section Coming Soon
          </motion.h2>

          <motion.p
            variants={item}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg max-w-2xl mx-auto"
          >
            {/* Add your section description here */}
            This section is ready for your new content.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
