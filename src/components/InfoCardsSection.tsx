import React from "react";
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
    <section className="w-full py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
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

                <div className="relative p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 transition-colors duration-500 group-hover:bg-white/15">
                        <Icon
                          size={48}
                          className="h-6 w-6 text-accent transition-colors duration-500 group-hover:text-white"
                          weight="bold"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-medium text-black/50 transition-colors duration-500 group-hover:text-white/70">
                          {c.subtitle}
                        </p>
                        <h3 className="text-lg font-semibold text-black transition-colors duration-500 group-hover:text-white">
                          {c.title}
                        </h3>
                      </div>
                    </div>

                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-black/5 transition-all duration-500 group-hover:bg-white/15">
                      <ArrowRightIcon
                        size={20}
                        className="text-black/70 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white"
                        weight="bold"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm leading-relaxed text-black/60 transition-colors duration-500 group-hover:text-white/85">
                      {c.body}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
