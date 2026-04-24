import type { SiteStat } from "@/lib/data/types";

type StatGridProps = {
  stats: SiteStat[];
};

export default function StatGrid({ stats }: StatGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <article key={stat.label} className="glass-card p-5 text-slate-950">
          <div className="text-3xl font-semibold tracking-tight md:text-4xl">{stat.value}</div>
          <div className="mt-2 text-sm uppercase tracking-[0.2em] text-blue-700">{stat.label}</div>
          <p className="mt-3 text-sm leading-7 text-slate-600">{stat.detail}</p>
        </article>
      ))}
    </div>
  );
}
