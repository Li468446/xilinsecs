import type { RoleRecord } from "@/lib/data/types";
import { ButtonLink } from "@/components/ui/button";

type RoleCardProps = {
  role: RoleRecord;
};

export default function RoleCard({ role }: RoleCardProps) {
  return (
    <article className="glass-card flex h-full flex-col p-6">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
        {role.location} · {role.mode}
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-slate-950">{role.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{role.description}</p>
      <div className="mt-5 space-y-2 text-sm text-slate-700">
        {role.expectations.slice(0, 3).map((item) => (
          <div key={item} className="flex gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <ButtonLink href={role.cta?.href ?? "/careers/open-roles/"} variant="outline">
          {role.cta?.label ?? "查看职位"}
        </ButtonLink>
      </div>
    </article>
  );
}
