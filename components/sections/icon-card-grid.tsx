import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SmartLink from "@/components/ui/smart-link";
import { cn } from "@/lib/utils";

type GridItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  label?: string;
  bullets?: string[];
};

type IconCardGridProps = {
  items: GridItem[];
  columns?: "two" | "three" | "four";
  tone?: "light" | "dark";
};

const columnClasses = {
  two: "md:grid-cols-2",
  three: "md:grid-cols-2 xl:grid-cols-3",
  four: "md:grid-cols-2 xl:grid-cols-4",
};

export default function IconCardGrid({
  items,
  columns = "three",
  tone = "light",
}: IconCardGridProps) {
  return (
    <div className={cn("grid gap-5", columnClasses[columns])}>
      {items.map((item) => {
        const Icon = item.icon;
        const isDark = tone === "dark";

        return (
          <article
            key={item.title}
            className={cn(
              "rounded-[28px] border p-6 transition duration-300",
              isDark
                ? "border-white/10 bg-white/5 text-white hover:-translate-y-1 hover:bg-white/8"
                : "glass-card hover:-translate-y-1"
            )}
          >
            <div
              className={cn(
                "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
                isDark ? "bg-cyan-400/12 text-cyan-200" : "bg-slate-950 text-white"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className={cn("mt-5 text-xl font-semibold", isDark ? "text-white" : "text-slate-950")}>
              {item.title}
            </h3>
            <p className={cn("mt-3 text-sm leading-7", isDark ? "text-slate-300" : "text-slate-600")}>
              {item.description}
            </p>
            {item.bullets?.length ? (
              <ul className={cn("mt-5 space-y-2 text-sm", isDark ? "text-slate-200" : "text-slate-700")}>
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className={cn("mt-1 h-2 w-2 rounded-full", isDark ? "bg-cyan-300" : "bg-blue-600")} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {item.href ? (
              <SmartLink
                href={item.href}
                className={cn(
                  "mt-6 inline-flex items-center text-sm font-semibold",
                  isDark ? "text-cyan-200" : "text-blue-700"
                )}
              >
                {item.label ?? "查看详情"}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </SmartLink>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
