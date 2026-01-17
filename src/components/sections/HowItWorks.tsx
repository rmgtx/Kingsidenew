import { CalendarCheck, ChatCircleDots, ClipboardText } from "@phosphor-icons/react";
import { motion } from "motion/react";

const steps = [
  {
    title: "Book Call",
    description: "Schedule a free consultation to discuss your business needs and goals.",
    icon: CalendarCheck,
    color: "accent",
  },
  {
    title: "Tell Us Your Needs",
    description: "Share your challenges and objectives so we can understand your unique requirements.",
    icon: ChatCircleDots,
    color: "chart-5",
  },
  {
    title: "Get Your Customized Plan",
    description: "Receive a tailored automation strategy designed specifically for your business.",
    icon: ClipboardText,
    color: "chart-4",
  },
];

function getColorClasses(color: string) {
  switch (color) {
    case "accent":
      return { bg: "bg-accent", dot: "bg-accent" };
    case "chart-5":
      return { bg: "bg-chart-5", dot: "bg-chart-5" };
    case "chart-4":
      return { bg: "bg-chart-4", dot: "bg-chart-4" };
    default:
      return { bg: "bg-accent", dot: "bg-accent" };
  }
}

function DesktopConnectors() {
  // 3 columns => connectors live BETWEEN col 1-2 and col 2-3
  return (
    <div className="hidden md:grid grid-cols-3 items-center mt-8 mb-10">
      {/* spacer under step 1 icon */}
      <div />

      {/* connector between 1 and 2 (sits under the gap) */}
      <div className="flex items-center justify-center">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="mx-4 h-px flex-1 border-t border-dotted border-foreground/20" />
        <span className="h-2 w-2 rounded-full bg-chart-5" />
      </div>

      {/* connector between 2 and 3 */}
      <div className="flex items-center justify-center">
        <span className="h-2 w-2 rounded-full bg-chart-5" />
        <span className="mx-4 h-px flex-1 border-t border-dotted border-foreground/20" />
        <span className="h-2 w-2 rounded-full bg-chart-4" />
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 px-5 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            How it works?
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colors = getColorClasses(step.color);

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className={`w-20 h-20 grid place-items-center rounded-2xl ${colors.bg} shadow-lg`}>
                  <Icon size={30} weight="fill" className="text-primary-foreground" />
                </div>

                {/* Title */}
                <h3 className="mt-8 font-heading text-2xl sm:text-3xl font-bold">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Dotted connectors (desktop only) */}
        <DesktopConnectors />
      </div>
    </section>
  );
}
