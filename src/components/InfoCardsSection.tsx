import React from "react";
import {Card} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {
  Lightning,
  Target,
  ShieldCheck,
  CrownCross,
  Crown,
  Horse,
} from "@phosphor-icons/react";

const services = [
  {
    key:"automation",
    title:"AI Solutions",
    Icon:Lightning,
    bgIcon:CrownCross,
    summary:
      "We eliminate busywork by building AI agents that route messages, respond instantly, and keep systems in sync. The result is cleaner handoffs, faster cycles, and consistent execution without chaos."
  },
  {
    key:"acquisition",
    title:"E2E Consulting",
    Icon:Target,
    bgIcon:Crown,
    summary:
      "We design and deliver end-to-end AI integrations that work in the real world. From strategy to deployment, we ensure systems scale reliably, teams understand how to use them, and adoption carries forward long after launch. The result is AI that actually gets used—driving consistent outcomes, confident teams, and long-term value."
  },
  {
    key:"reliability",
    title:"Risk & Reliability",
    Icon:ShieldCheck,
    bgIcon:Horse,
    summary:
      "We add monitoring, safeguards, and fallback paths so your systems stay reliable under pressure. Problems stay small, incidents drop, and confidence scales with growth."
  }
];

function Pill({children}:{children:React.ReactNode}){
  return(
    <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs font-medium text-foreground/80">
      {children}
    </span>
  );
}

function Label({children}:{children:React.ReactNode}){
  return(
    <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
      {children}
    </p>
  );
}

export function InfoCardsSection(){
  return(
    <section className="w-full py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Header */}
        <div className="mb-10">
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
  <span className="text-sky-500">Why Companies Choose Kingside.</span>{" "}
</h2>

          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Clear outcomes, fast implementation, and systems that hold up under real-world use.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((s)=>{
            const BgIcon=s.bgIcon;

            return(
              <Card
                key={s.key}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-md"
              >
                {/* Gentle background */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.04] to-transparent" />

                {/* Soft background icon */}
                <div className="pointer-events-none absolute -right-12 -top-12 opacity-[0.03] blur-[0.5px]">
                  <BgIcon size={340} className="text-foreground" weight="thin" />
                </div>

                <div className="relative p-6">
  {/* Top */}
  <div className="flex items-start gap-4">
    <div className="grid h-11 w-11 place-items-center rounded-xl border bg-muted">
      <s.Icon size={20} className="text-foreground/80" />
    </div>

    <div className="min-w-0">
      <h3 className="mt-1 text-xl font-semibold tracking-tight">
        {s.title}
      </h3>
    </div>
  </div>

  <Separator className="my-5" />

  <p className="text-sm leading-relaxed text-foreground/85 max-w-prose">
    {s.summary}
  </p>
</div>


                  {/* Subtle hover polish */}
                  <div className="pointer-events-none absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-sky-500/35 to-transparent opacity-0 blur-[0.5px] transition-opacity duration-300 group-hover:opacity-100" />
                  </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
