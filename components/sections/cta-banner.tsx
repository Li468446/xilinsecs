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
      <div className="rainbow-panel overflow-hidden px-6 py-10 text-slate-950 sm:px-8 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-blue-700">联系我们</p>
            <h2 className="heading-display mt-4 text-3xl font-semibold text-slate-950 md:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={primary.href} size="lg">
                {primary.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} size="lg" variant="outline">
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
