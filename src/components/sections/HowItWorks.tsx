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

// Helper to get color classes based on step color
function getColorClasses(color: string) {
  switch (color) {
    case "accent":
      return { bg: "bg-accent", glow: "glow-accent" };
    case "chart-5":
      return { bg: "bg-chart-5", glow: "glow-chart-5" };
    case "chart-4":
      return { bg: "bg-chart-4", glow: "glow-chart-4" };
    default:
      return { bg: "bg-accent", glow: "glow-accent" };
  }
}

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 px-5 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            How it works?
          </h2>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
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
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Icon Box with Glow - Fixed size */}
                  <div className={`w-16 h-16 flex items-center justify-center rounded-xl ${colors.bg} ${colors.glow} mb-6`}>
                    <Icon
                      size={28}
                      weight="fill"
                      className="text-primary-foreground"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl sm:text-2xl font-bold mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Connector Lines with Dots (desktop only) */}
          <div className="hidden md:block absolute inset-x-0 top-8 pointer-events-none">
            <div className="grid grid-cols-3 gap-8 lg:gap-16">
              {/* First connector: between step 1 and step 2 */}
              <div className="flex items-center justify-end pr-0">
                <div className="flex items-center flex-1 ml-16">
                  {/* Left dot (accent color) */}
                  <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  {/* Dashed line */}
                  <div className="flex-1 h-px border-t-2 border-dashed border-border mx-1" />
                  {/* Right dot (chart-5 color) */}
                  <div className="w-2 h-2 rounded-full bg-chart-5 shrink-0" />
                </div>
              </div>

              {/* Second connector: between step 2 and step 3 */}
              <div className="flex items-center justify-end pr-0">
                <div className="flex items-center flex-1 ml-16">
                  {/* Left dot (chart-5 color) */}
                  <div className="w-2 h-2 rounded-full bg-chart-5 shrink-0" />
                  {/* Dashed line */}
                  <div className="flex-1 h-px border-t-2 border-dashed border-border mx-1" />
                  {/* Right dot (chart-4 color) */}
                  <div className="w-2 h-2 rounded-full bg-chart-4 shrink-0" />
                </div>
              </div>

              {/* Empty third column to maintain grid alignment */}
              <div />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
