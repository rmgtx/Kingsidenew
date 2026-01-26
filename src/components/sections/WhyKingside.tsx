import React from "react";
import { motion, useInView } from "motion/react";
import { Strategy, Code, Robot } from "@phosphor-icons/react";

const features = [
    {
        icon: Strategy,
        title: "Advisory & Planning",
        desc: "Eliminate the guesswork. From team workshops to deep-dive audits, we design a comprehensive roadmap that prepares your organization for scalable automation."
    },
    {
        icon: Code,
        title: "Application Development",
        desc: "We build the infrastructure that powers growth. We develop the tactical tools your strategy requires—including AI-powered content engines, intelligent chat systems, and custom software aimed at driving real results."
    },
    {
        icon: Robot,
        title: "Agent Management",
        desc: "Scale your capacity without the chaos. Deploy pre-built or fully custom E2E AI agents that handle your business operations with precision and efficiency."
    }
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.06 } }
};

const item = {
    hidden: { opacity: 0, y: -14 },
    show: { opacity: 1, y: 0 }
};

function useScrollReveal({ amount = 0.25, once = true } = {}) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { amount, once });
    return { ref, inView };
}

export function WhyKingside() {
    const { ref, inView } = useScrollReveal({ amount: 0.25, once: true });

    return (
        <section className="relative w-full bg-white overflow-hidden border-b border-border">
            {/* Left edge gradient */}
            <div
                className="absolute inset-y-0 left-0 w-24 sm:w-32 lg:w-48 bg-gradient-to-r from-accent/10 to-transparent pointer-events-none"
                aria-hidden="true"
            />

            {/* Right edge gradient */}
            <div
                className="absolute inset-y-0 right-0 w-24 sm:w-32 lg:w-48 bg-gradient-to-l from-accent/10 to-transparent pointer-events-none"
                aria-hidden="true"
            />

            {/* Extra top padding creates breathing room from the Hero */}
            <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 sm:pt-20 sm:pb-28">
                <motion.div
                    ref={ref}
                    variants={container}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="mx-auto max-w-3xl text-center"
                >
                    <motion.h2
                        variants={item}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-6xl leading-tight"
                    >
Build momentum with intelligent AI Orchestration.                    </motion.h2>

                    <motion.p
                        variants={item}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="mt-5 text-base leading-relaxed text-neutral-500 sm:text-lg"
                    >
Harmonize your fragmented tech stack into an AI-powered, unified operational engine. We replace tool fatigue with seamless, intelligent workflows that route complex tasks to the right resources—human or machine. Our approach ensures your technology acts as a strategic force that drives business efficiency, not just IT complexity.                    </motion.p>
                </motion.div>

                {/* Center the grid and constrain width so it doesn't feel crowded */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="mx-auto mt-16 grid max-w-5xl gap-20 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {features.map((f) => {
                        const Icon = f.icon;

                        return (
                            <motion.div
                                key={f.title}
                                variants={item}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="mx-auto w-full max-w-sm text-center sm:text-left"
                            >
                                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 sm:mx-0">
                                    <Icon size={20} weight="regular" className="text-accent" />
                                </div>

                                <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
                                    {f.title}
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                                    {f.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
