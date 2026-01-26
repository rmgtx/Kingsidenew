import { BrandButton, GridPattern } from "@/components";
import { Scan, Cpu, GitBranch, ArrowRight } from "@phosphor-icons/react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "The Audit",
    description:
      "We pop the hood on your business. We analyze your current stack, identify the bottlenecks, and design a fractional AI roadmap tailored to your goals.",
    icon: Scan,
  },
  {
    number: "02",
    title: "The Build",
    description:
      "We engineer the solution. Whether it's custom apps or agent workflows, we build the infrastructure required to bridge your disconnected tools.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "The Orchestration",
    description:
      "We hand you the keys to MagnusAI. Deploy your agents, monitor performance, and scale your automated workforce from a single dashboard.",
    icon: GitBranch,
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32 border-b border-border">
      {/* Grid Pattern Background (Static) */}
      <div className="absolute inset-0 z-0">
        <GridPattern
          width={30}
          height={30}
          className="opacity-70"
          flip={true}
        />
      </div>

      {/* Gradient fades for smooth transitions */}
      <div
        className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-[1]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-[1]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium tracking-widest uppercase font-body text-accent mb-6"
          >
            The Process
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight font-heading text-foreground sm:text-5xl lg:text-6xl"
          >
            From Blueprint to Breakthrough
          </motion.h2>
        </div>

        {/* Timeline & Cards Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Gradient Connector Line (Desktop) - runs through icon level */}
          <div className="absolute top-[56px] left-0 w-full hidden lg:block z-0" aria-hidden="true">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Card with Watermark Number */}
                  <div className="relative w-full h-full rounded-xl border border-border bg-card p-8 shadow-sm overflow-hidden">
                    {/* Watermark Number */}
                    <div
                      className="absolute -top-8 -right-4 text-[150px] font-bold font-heading text-border/30 leading-none select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {step.number}
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10">
                      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-accent">
                        <Icon size={24} weight="fill" />
                      </div>

                      <h3 className="text-xl font-bold font-heading text-foreground mb-3">
                        {step.title}
                      </h3>

                      <p className="font-body text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex justify-center text-center lg:mt-12"
        >
          <div className="flex flex-col items-center gap-6">
            <BrandButton
              href="#contact"
              variant="brand"
              size="lg"
              className="text-lg px-10 py-6"
              rightIcon={<ArrowRight size={20} weight="bold" />}
            >
              Start Your Roadmap
            </BrandButton>
            <p className="text-sm font-body text-muted-foreground">
              Begin with a free discovery call.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
