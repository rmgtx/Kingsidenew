import { BrandButton, GridPattern } from "@/components";
import { CalendarCheck, ChatCircleDots, ClipboardText } from "@phosphor-icons/react";
import { motion } from "motion/react";

const steps = [
  {
    number: "1",
    title: "Book Call",
    description: "Schedule a free consultation to discuss your business needs and goals.",
    icon: CalendarCheck,
  },
  {
    number: "2",
    title: "Tell Us Your Needs",
    description: "Share your challenges and objectives so we can understand your unique requirements.",
    icon: ChatCircleDots,
  },
  {
    number: "3",
    title: "Get Your Customized Plan",
    description: "Receive a tailored automation strategy designed specifically for your business.",
    icon: ClipboardText,
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
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
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
            Simple Process
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight font-heading text-foreground sm:text-5xl lg:text-6xl mb-6"
          >
            How It Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg font-body text-muted-foreground"
          >
            From consultation to implementation in three simple steps.
          </motion.p>
        </div>

        {/* Timeline & Cards Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Connector Line (Desktop) */}
          <div className="absolute top-8 left-0 w-full hidden lg:block" aria-hidden="true">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Number Circle */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-accent/80 backdrop-blur-sm text-xl font-bold font-heading text-accent-foreground shadow-xl ring-4 ring-secondary mb-8">
                    {step.number}
                  </div>

                  {/* Card Content - Removed Hover Effects */}
                  <div className="relative w-full h-full rounded-xl border border-border bg-card p-8 shadow-sm">
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
            >
              Get Started
            </BrandButton>
            <p className="text-sm font-body text-muted-foreground">
              Ready to automate? Book your call today.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
