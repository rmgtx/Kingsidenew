import React from "react";
import {
  TrendUp,
  Clock,
  Coins,
  Lightning,
  ChartLineUp,
  GearSix
} from "@phosphor-icons/react";


type StatItem={
  key:StatKey;
  title:string;
  value:string;
  delta?:string;
  description:string;
  Icon:React.ComponentType<any>;
};

const stats:StatItem[]=[
  {
    key:"adoption",
    title:"AI Adoption Is Mainstream",
    value:"88%",
    delta:"Now using AI",
    description:"AI is no longer optional — most businesses already use it in at least one function.",
    Icon:TrendUp,
  },
  {
    key:"time",
    title:"Massive Time Savings",
    value:"40–60 min",
    delta:"Saved per employee/day",
    description:"AI tools reclaim time daily by automating repetitive work and accelerating execution.",
    Icon:Clock,
  },
  {
    key:"cost",
    title:"Up to 60% Cost Reduction",
    value:"20–60%",
    delta:"Lower operating costs",
    description:"Automation cuts overhead across operations and improves margin efficiency.",
    source:"HypeStudio Research",
    Icon:Coins,
  },
  {
    key:"efficiency",
    title:"55% Boost in Efficiency",
    value:"55%",
    delta:"Higher ops efficiency",
    description:"AI agents improve throughput, reduce delays, and tighten handoffs across teams.",
    Icon:Lightning,
  },
  {
    key:"revenue",
    title:"Revenue Growth with AI",
    value:"10–25%",
    delta:"Growth reported",
    description:"AI-driven personalization and automation increase conversion, retention, and scale.",
    Icon:ChartLineUp,
  },
  {
    key:"scale",
    title:"Scalable AI Workflows Skyrocketing",
    value:"15–50%",
    delta:"Processes automated by 2027",
    description:"AI agents are forecast to automate a major share of business processes — scale becomes default.",
    Icon:GearSix,
  }
];

function clampPct(value:number){
  return Math.max(0,Math.min(100,value));
}

function Ring({value,size=92}:{value:number;size?:number}){
  const stroke=10;
  const r=(size-stroke)/2;
  const c=2*Math.PI*r;
  const pct=clampPct(value);
  const dash=c*(pct/100);
  const gap=c-dash;

  return(
    <div className="relative shrink-0">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <circle
          cx={size/2}
          cy={size/2}
          r={r}
          fill="none"
          stroke="rgba(148,163,184,0.25)"
          strokeWidth={stroke}
        />
        <circle
          cx={size/2}
          cy={size/2}
          r={r}
          fill="none"
          stroke="rgba(14,165,233,0.95)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <div className="text-sm font-semibold text-foreground/90">{pct}%</div>
      </div>
    </div>
  );
}

function Bars({values,height=84}:{values:number[];height?:number}){
  const max=Math.max(...values,1);
  return(
    <div className="flex items-end gap-2" style={{height}}>
      {values.map((v,i)=>(
        <div key={i} className="w-3 rounded-full bg-sky-500/15 overflow-hidden" title={`${v}%`}>
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
  // responsive: fills available width, fixed height
  const w=220;
  const h=64;
  const max=Math.max(...values,1);
  const min=Math.min(...values,0);
  const span=Math.max(1,max-min);

  const points=values.map((v,i)=>{
    const x=(i/(values.length-1))*w;
    const y=h-((v-min)/span)*h;
    return `${x},${y}`;
  }).join(" ");

  return(
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="block h-14 w-56 max-w-full"
    >
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(14,165,233,0.25)" />
          <stop offset="1" stopColor="rgba(14,165,233,0.00)" />
        </linearGradient>
      </defs>

      <polyline
        points={points}
        fill="none"
        stroke="rgba(14,165,233,0.95)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <polyline
        points={`${points} ${w},${h} 0,${h}`}
        fill="url(#sparkFill)"
        stroke="none"
      />
    </svg>
  );
}

function Badge({text}:{text:string}){
  return(
    <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-500">
      {text}
    </span>
  );
}

function BentoShell({children,className=""}:{children:React.ReactNode;className?:string}){
  return(
    <div className={[
      "group relative h-full overflow-hidden rounded-3xl",
      "bg-background/70 backdrop-blur",
      "ring-1 ring-foreground/10 hover:ring-sky-500/35",
      "transition-transform duration-300 hover:-translate-y-0.5",
      className
    ].join(" ")}>
      {/* subtle grid texture only (no watermark icons) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(14,165,233,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,165,233,0.08) 1px, transparent 1px)",
          backgroundSize:"52px 52px"
        }}
      />

      {/* hover glow */}
      <div
        className="pointer-events-none absolute -inset-24 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:"radial-gradient(circle at 28% 18%, rgba(14,165,233,0.22), transparent 60%)"
        }}
      />

      <div className="relative h-full p-6 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function TileHeader({s}:{s:StatItem}){
  return(
    <div className="flex items-center gap-3 min-w-0">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500/10 shrink-0">
        <s.Icon size={18} className="text-sky-500" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground truncate">{s.title}</div>
        {s.delta ? <div className="text-xs text-muted-foreground truncate">{s.delta}</div> : null}
      </div>
    </div>
  );
}

function TileFooter({s}:{s:StatItem}){
  return(
    <div className="mt-auto">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] text-muted-foreground truncate">
        </span>
      </div>
    </div>
  );
}

function HeroTile({s}:{s:StatItem}){
  return(
    <BentoShell className="p-0">
      <div className="relative h-full p-7 flex flex-col">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {s.value} adoption. <span className="text-sky-500">Already mainstream.</span>
            </h3>
            <p className="mt-3 max-w-xl text-sm text-foreground/80 leading-relaxed line-clamp-3">
              {s.description}
            </p>
          </div>

          {typeof s.ringValue==="number" ? (
            <div className="hidden sm:block shrink-0">
              <Ring value={s.ringValue} size={108} />
            </div>
          ) : null}
        </div>

        <div className="mt-6 grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-7">
            <div className="rounded-2xl bg-sky-500/5 ring-1 ring-sky-500/15 p-4">
              <div className="mt-2 text-3xl font-bold tracking-tight text-foreground">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                Businesses using AI in at least one function
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-5">
          </div>
        </div>

        <TileFooter s={s} />
      </div>
    </BentoShell>
  );
}

function SparkTile({s}:{s:StatItem}){
  return(
    <BentoShell>
      <div className="h-full flex flex-col min-w-0">
        <div className="flex items-start justify-between gap-4">
          <TileHeader s={s} />
          <Badge text="Time saved" />
        </div>

        <div className="mt-5 grid grid-cols-12 gap-4 items-end min-w-0">
          <div className="col-span-12 sm:col-span-6 min-w-0">
            <div className="text-4xl font-bold tracking-tight text-foreground">{s.value}</div>
            <div className="mt-2 text-sm text-foreground/75 line-clamp-3">
              {s.description}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 flex justify-start sm:justify-end min-w-0 overflow-hidden">
            {s.spark ? <Spark values={s.spark} /> : null}
          </div>
        </div>

        <TileFooter s={s} />
      </div>
    </BentoShell>
  );
}

function BarsTile({s}:{s:StatItem}){
  return(
    <BentoShell>
      <div className="h-full flex flex-col min-w-0">
        <div className="flex items-start justify-between gap-4">
          <TileHeader s={s} />
          <Badge text="Cost impact" />
        </div>

        <div className="mt-5 grid grid-cols-12 gap-4 items-end min-w-0">
          <div className="col-span-12 sm:col-span-7 min-w-0">
            <div className="text-4xl font-bold tracking-tight text-foreground">{s.value}</div>
            <p className="mt-2 text-sm text-foreground/75 line-clamp-3">
              {s.description}
            </p>
          </div>

          <div className="col-span-12 sm:col-span-5 flex justify-start sm:justify-end min-w-0">
            {s.bars ? <Bars values={s.bars} height={84} /> : null}
          </div>
        </div>

        <TileFooter s={s} />
      </div>
    </BentoShell>
  );
}

function RingTile({s}:{s:StatItem}){
  return(
    <BentoShell>
      <div className="h-full flex flex-col min-w-0">
        <div className="flex items-start justify-between gap-4">
          <TileHeader s={s} />
          <Badge text="Efficiency" />
        </div>

        <div className="mt-6 flex items-center justify-between gap-6 min-w-0">
          <div className="min-w-0">
            <div className="text-5xl font-bold tracking-tight text-foreground">{s.value}</div>
            <div className="mt-2 text-sm text-foreground/75 line-clamp-3">
              {s.description}
            </div>
          </div>

          <div className="hidden sm:block shrink-0">
            {typeof s.ringValue==="number" ? <Ring value={s.ringValue} /> : null}
          </div>
        </div>

        <TileFooter s={s} />
      </div>
    </BentoShell>
  );
}

function MiniTile({s}:{s:StatItem}){
  return(
    <BentoShell>
      <div className="h-full flex flex-col min-w-0">
        <TileHeader s={s} />

        <div className="mt-6 min-w-0">
          <div className="text-4xl font-bold tracking-tight text-foreground">{s.value}</div>
          <div className="mt-2 text-sm text-foreground/75 line-clamp-2">{s.delta}</div>
        </div>

        <div className="mt-4 hidden sm:block overflow-hidden">
          {s.spark ? <Spark values={s.spark} /> : null}
        </div>

        <TileFooter s={s} />
      </div>
    </BentoShell>
  );
}

function WideTile({s}:{s:StatItem}){
  return(
    <BentoShell>
      <div className="h-full flex flex-col min-w-0">
        <div className="flex items-start justify-between gap-4">
          <TileHeader s={s} />
          <Badge text="Automation scale" />
        </div>

        <div className="mt-6 grid grid-cols-12 gap-5 items-center min-w-0">
          <div className="col-span-12 sm:col-span-7 min-w-0">
            <div className="text-5xl font-bold tracking-tight text-foreground">{s.value}</div>
            <p className="mt-2 text-sm text-foreground/75 line-clamp-3">
              {s.description}
            </p>
          </div>

          <div className="col-span-12 sm:col-span-5 flex justify-start sm:justify-end min-w-0">
            {s.bars ? <Bars values={s.bars} height={90} /> : null}
          </div>
        </div>

        <TileFooter s={s} />
      </div>
    </BentoShell>
  );
}

export function AIStatisticsGrid(){
  const adoption=stats.find((s)=>s.key==="adoption")!;
  const time=stats.find((s)=>s.key==="time")!;
  const cost=stats.find((s)=>s.key==="cost")!;
  const efficiency=stats.find((s)=>s.key==="efficiency")!;
  const revenue=stats.find((s)=>s.key==="revenue")!;
  const scale=stats.find((s)=>s.key==="scale")!;

  return(
    <section className="relative w-full py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-500/[0.06] via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest text-sky-500 uppercase">
            AI efficiency at a glance
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-foreground">Measurable impact.</span>{" "}
            <span className="text-sky-500">Fast wins.</span>
          </h2>
        </div>

        {/* IMPORTANT: taller row heights so nothing clips */}
        <div className="grid gap-5 lg:grid-cols-12 lg:auto-rows-[210px] xl:lg:auto-rows-[220px]">
          <div className="lg:col-span-7 lg:row-span-2">
            <HeroTile s={adoption} />
          </div>

          <div className="lg:col-span-5 lg:row-span-1">
            <SparkTile s={time} />
          </div>

          <div className="lg:col-span-5 lg:row-span-1">
            <BarsTile s={cost} />
          </div>

          <div className="lg:col-span-4 lg:row-span-1">
            <RingTile s={efficiency} />
          </div>

          <div className="lg:col-span-3 lg:row-span-1">
            <MiniTile s={revenue} />
          </div>

          <div className="lg:col-span-5 lg:row-span-1">
            <WideTile s={scale} />
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground sm:hidden">
          Tip: Extra charts expand on larger screens to keep mobile clean.
        </p>
      </div>
    </section>
  );
}
