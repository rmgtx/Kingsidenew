import React from "react";
import { BrandButton } from "@/components";
import { motion, useInView } from "framer-motion";
import { Crosshair, PlusCircle, FileText } from "phosphor-react";

const features = [
    {
        icon: Crosshair,
        title: "Strategic decision making",
        desc: "Harness the power of analytics to inform strategies, enabling targeted campaigns that resonate with your audience and drive results."
    },
    {
        icon: PlusCircle,
        title: "Marketing automation",
        desc: "Harness the power of analytics to inform strategies, enabling targeted campaigns that resonate with your audience and drive results."
    },
    {
        icon: FileText,
        title: "Content Creation",
        desc: "Adopt a responsive content strategy that evolves with market trends, allowing timely updates that capture audience interest and engagement."
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
        <section className="w-full bg-white">
            {/* Extra top padding creates breathing room from the Hero */}
            <div className="mx-auto max-w-6xl px-6 pt-16 pb-24 sm:pt-20 sm:pb-28">
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
                        Why Top Companies Choose Kingside
                    </motion.h2>

                    <motion.p
                        variants={item}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="mt-5 text-base leading-relaxed text-neutral-500 sm:text-lg"
                    >
                        Leverage data-driven strategies and market analysis to identify opportunities, enhance performance, and foster sustainable growth for your business.
                    </motion.p>

                    <motion.div
                        variants={item}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="mt-8 flex items-center justify-center"
                    >
                        <BrandButton
                            href="#contact"
                            variant="brand"
                            size="lg"
                            aria-label="Contact us"
                        >
                            Contact us
                        </BrandButton>
                    </motion.div>
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
                                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-sky-200 sm:mx-0">
                                    <Icon size={20} weight="regular" className="text-sky-500" />
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
