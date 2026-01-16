import React from "react";
import {Card} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {
  TrendUp,
  Clock,
  Coins,
  Lightning,
  ChartLineUp,
  GearSix
} from "@phosphor-icons/react";

type StatItem={
  key:string;
  title:string;
  value:string;
  delta?:string;
  description:string;
  source:string;
  Icon:React.ComponentType<any>;
  variant:"wide"|"tall"|"standard";
  chart:"ring"|"bars"|"spark"|"none";
  ringValue?:number; // 0-100
  bars?:number[];
  spark?:number[];
};

const stats:StatItem[]=[
  {
    key:"adoption",
    title:"AI Adoption Is Mainstream",
    value:"88%",
    delta:"Now using AI",
    description:"AI is no longer optional — most businesses already use it in at least one function.",
    source:"McKinsey & Company",
    Icon:TrendUp,
    variant:"wide",
    chart:"ring",
    ringValue:88
  },
  {
    key:"time",
    title:"Massive Time Savings",
    value:"40–60 min",
    delta:"Saved per employee/day",
    description:"AI tools reclaim time daily by automating repetitive work and accelerating execution.",
    source:"OpenAI & Anthropic Workplace Study",
    Icon:Clock,
    variant:"standard",
    chart:"spark",
    spark:[12,18,20,22,28,32,40,44,52,60]
  },
  {
    key:"cost",
    title:"Up to 60% Cost Reduction",
    value:"20–60%",
    delta:"Lower operating costs",
    description:"Automation cuts overhead across operations and improves margin efficiency.",
    source:"HypeStudio Research",
    Icon:Coins,
    variant:"standard",
    chart:"bars",
    bars:[20,32,45,60]
  },
  {
    key:"efficiency",
    title:"55% Boost in Efficiency",
    value:"55%",
    delta:"Higher ops efficiency",
    description:"AI agents improve throughput, reduce delays, and tighten handoffs across teams.",
    source:"Warmly.ai Survey",
    Icon:Lightning,
    variant:"tall",
    chart:"ring",
    ringValue:55
  },
  {
    key:"revenue",
    title:"Revenue Growth with AI",
    value:"10–25%",
    delta:"Growth reported",
    description:"AI-driven personalization and automation increase conversion, retention, and scale.",
    source:"HypeStudio.org",
    Icon:ChartLineUp,
    variant:"standard",
    chart:"spark",
    spark:[6,8,10,12,15,18,20,22,25]
  },
  {
    key:"scale",
    title:"Scalable AI Workflows Skyrocketing",
    value:"15–50%",
    delta:"Processes automated by 2027",
    description:"AI agents are forecast to automate a major share of business processes — scale becomes default.",
    source:"IBM & Warmly.ai",
    Icon:GearSix,
    variant:"wide",
    chart:"bars",
    bars:[15,25,35,50]
  }
];

function Ring({value}:{value:number}){
  // simple SVG ring; no external libs
  const size=88;
  const stroke=8;
  const r=(size-stroke)/2;
  const c=2*Math.PI*r;
  const pct=Math.max(0,Math.min(100,value));
  const dash=c*(pct/100);
  const gap=c-dash;

  return(
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle
        cx={size/2}
        cy={size/2}
        r={r}
        fill="none"
        stroke="rgba(15,23,42,0.08)"
        strokeWidth={stroke}
      />
      <circle
        cx={size/2}
        cy={size/2}
        r={r}
        fill="none"
        stroke="rgb(14,165,233)" // sky-500
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${gap}`}
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
    </svg>
  );
}

function Bars({values}:{values:number[]}){
  const max=Math.max(...values,1);
  return(
    <div className="flex items-end gap-2 h-[72px]">
      {values.map((v,i)=>(
        <div key={i} className="w-3 rounded-full bg-sky-500/15 overflow-hidden">
          <div
            className="w-full rounded-full bg-sky-500"
            style={{height:`${Math.round((v/max)*100)}%`}}
          />
        </div>
      ))}
    </div>
  );
}

function Spark({values}:{values:number[]}){
  const w=160;
  const h=52;
  const max=Math.max(...values,1);
  const min=Math.min(...values,0);
  const span=Math.max(1,max-min);

  const points=values.map((v,i)=>{
    const x=(i/(values.length-1))*w;
    const y=h-((v-min)/span)*h;
    return `${x},${y}`;
  }).join(" ");

  return(
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke="rgba(14,165,233,0.9)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={`${points} ${w},${h} 0,${h}`}
        fill="rgba(14,165,233,0.10)"
        stroke="none"
      />
    </svg>
  );
}

function StatCard({s}:{s:StatItem}){
  const BgIcon=s.Icon;

  const spanClass=
    s.variant==="wide"
      ? "lg:col-span-2"
      : s.variant==="tall"
        ? "lg:row-span-2"
        : "";

  return(
    <Card
      className={[
        "group relative overflow-hidden rounded-2xl bg-card shadow-md",
        "border-0", // no border
        "ring-1 ring-foreground/10", // softer than border
        "transition-transform duration-300 hover:-translate-y-0.5",
        spanClass
      ].join(" ")}
    >
      {/* subtle background wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/[0.035] to-transparent" />

      {/* big faint icon (make it very subtle) */}
      <div className="pointer-events-none absolute -right-10 -top-10 opacity-[0.04] blur-[0.5px]">
        <BgIcon size={300} className="text-foreground" weight="thin" />
      </div>

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-500/10">
                <s.Icon size={20} className="text-sky-500" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {s.title}
              </h3>
            </div>

            <div className="mt-4 flex items-end gap-3">
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                {s.value}
              </div>
              {s.delta ? (
                <div className="pb-1 text-sm text-muted-foreground">
                  {s.delta}
                </div>
              ) : null}
            </div>

            <p className="mt-3 max-w-prose text-sm leading-relaxed text-foreground/80">
              {s.description}
            </p>
          </div>

          {/* chart area */}
          <div className="hidden sm:flex items-center justify-end">
            {s.chart==="ring" && typeof s.ringValue==="number" ? <Ring value={s.ringValue} /> : null}
            {s.chart==="bars" && s.bars ? <Bars values={s.bars} /> : null}
            {s.chart==="spark" && s.spark ? <Spark values={s.spark} /> : null}
          </div>
        </div>

        <Separator className="my-5" />

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            Source: <span className="text-foreground/70">{s.source}</span>
          </span>

          <span className="text-xs font-medium text-sky-500">
            AI efficiency
          </span>
        </div>

        {/* blue hover line */}
        <div className="pointer-events-none absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </Card>
  );
}

export function AIStatisticsGrid(){
  return(
    <section className="w-full py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase">
            AI efficiency at a glance
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-foreground">Measurable impact.</span>{" "}
            <span className="text-sky-500">Fast wins.</span>
          </h2>

          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Six proof points that show why AI automation is now a competitive requirement.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4 lg:auto-rows-[1fr]">
          {stats.map((s)=>(
            <div
              key={s.key}
              className={
                s.variant==="wide"
                  ? "lg:col-span-2"
                  : s.variant==="tall"
                    ? "lg:row-span-2 lg:col-span-2"
                    : "lg:col-span-2"
              }
            >
              <StatCard s={s} />
            </div>
          ))}
        </div>

        {/* small mobile chart hint */}
        <p className="mt-6 text-xs text-muted-foreground sm:hidden">
          Tip: Charts appear on larger screens to keep mobile clean and readable.
        </p>
      </div>
    </section>
  );
}
