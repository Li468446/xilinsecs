import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";

type CtaBannerProps = {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  aside?: ReactNode;
};

export default function CtaBanner({ title, description, primary, secondary, aside }: CtaBannerProps) {
  return (
    <section className="site-shell">
      <div className="overflow-hidden rounded-[36px] border border-slate-900/5 bg-slate-950 px-6 py-10 text-white shadow-glass sm:px-8 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-blue-300">Start a project</p>
            <h2 className="heading-display mt-4 text-3xl font-semibold md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={primary.href} size="lg">
                {primary.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
          {aside ? <div className="self-end">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
