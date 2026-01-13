import React from "react";
import { motion } from "motion/react";
import {Card} from "@/components/ui/card";
import {ArrowRightIcon,CrownIcon,CrownCrossIcon,HorseIcon} from "@phosphor-icons/react";

type InfoCard={
  title:string;
  subtitle:string;
  body:string;
  Icon:React.ComponentType<{size?:number;className?:string;weight?:"thin"|"light"|"regular"|"bold"|"fill"|"duotone"}>;
};

const cards:InfoCard[]=[{
  title:"Lorem Ipsum",
  subtitle:"Human Machine Verification 3.0",
  body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  Icon:CrownCrossIcon
},{
  title:"Dolor Sit",
  subtitle:"Universal Solution",
  body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  Icon:CrownIcon
},{
  title:"Amet Consectetur",
  subtitle:"Adaptive Defense",
  body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  Icon:HorseIcon
}];

export function InfoCardsSection(){
  return(
    <section className="w-full py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16 lg:mb-20"
        >
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-accent leading-tight">
            Real Problems. Smarter Solutions. Designed to Help You Scale.
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c,idx)=>{
            const Icon=c.Icon;
            return(
              <Card
                key={idx}
                className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Hover blue overlay */}
                <div className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-br from-accent to-accent transition-transform duration-500 ease-out group-hover:translate-y-0" />

                {/* Soft background shapes */}
                <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-black/5 transition-all duration-500 group-hover:bg-white/10" />
                <div className="pointer-events-none absolute -right-14 -bottom-14 h-48 w-48 rounded-full bg-black/5 transition-all duration-500 group-hover:bg-white/10" />

                <div className="relative p-6 flex flex-col h-full">
                  {/* Icon and Arrow at top - aligned (non-hover) / Icon and Subtitle aligned (hover) */}
                  <div className="flex items-center justify-between mb-4 group-hover:justify-start group-hover:gap-3 group-hover:mb-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 transition-colors duration-500 group-hover:bg-white/15 shrink-0">
                      <Icon
                        size={48}
                        className="h-6 w-6 text-accent transition-colors duration-500 group-hover:text-white"
                        weight="bold"
                      />
                    </div>
                    <ArrowRightIcon
                      size={20}
                      className="text-black/70 transition-all duration-500 group-hover:opacity-0 group-hover:hidden"
                      weight="bold"
                    />
                    {/* Bold Subtitle - aligned with icon in hover */}
                    <h3 className="hidden group-hover:block text-lg font-bold text-white">
                      {c.subtitle}
                    </h3>
                  </div>

                  {/* Bold Subtitle - below icon in non-hover */}
                  <h3 className="text-lg font-bold text-black transition-colors duration-500 group-hover:hidden mb-4">
                    {c.subtitle}
                  </h3>

                  {/* Divider - visible in non-hover, hidden in hover */}
                  <div className="h-px w-full bg-black/10 transition-all duration-500 group-hover:opacity-0 group-hover:hidden mb-4" />

                  {/* Body text - bottom justified in non-hover, directly under subtitle in hover */}
                  <p className="text-sm leading-relaxed text-black/60 transition-colors duration-500 group-hover:text-white/85 mt-auto group-hover:mt-0">
                    <span className="group-hover:hidden">
                      {c.body.split('.')[0] + '.'}
                    </span>
                    <span className="hidden group-hover:inline">
                      {c.body}
                    </span>
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
