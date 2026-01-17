import {
    motion
} from "framer-motion";

const stats = [
    {
        value: "88%",
        label: "of Businesses Use AI",
        description: "AI is now essential — not optional.",
    },
    {
        value: "60 min",
        label: "Saved Daily",
        description: "AI tools reclaim an hour of work per person, every day.",
    },
    {
        value: "60%",
        label: "Cost Reduction",
        description: "AI automation slashes operational costs at scale.",
    },
    {
        value: "55%",
        label: "Efficiency Boost",
        description: "AI agents drive faster, smarter operations.",
    },
    {
        value: "25%",
        label: "Revenue Lift",
        description: "AI grows top-line results through smarter automation.",
    },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95,
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
};

export function HeroStats() {
    return (
        <section className="relative w-full bg-background">
            {/* Gradient connector from hero */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background via-background to-transparent pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pb-12 pt-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="group relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-sm ring-1 ring-neutral-100 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:ring-sky-200 hover:bg-gradient-to-br hover:from-sky-50/80 hover:to-white cursor-default"
                        >
                            {/* Subtle gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            {/* Decorative accent line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-sky-500 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

                            <div className="relative">
                                {/* Main stat value */}
                                <div className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-sky-600">
                                    {stat.value}
                                </div>

                                {/* Label */}
                                <div className="mt-2 text-sm font-semibold text-neutral-700 transition-colors duration-300 group-hover:text-sky-700">
                                    {stat.label}
                                </div>

                                {/* Description */}
                                <p className="mt-3 text-xs leading-relaxed text-neutral-500 transition-colors duration-300 group-hover:text-neutral-600">
                                    {stat.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
