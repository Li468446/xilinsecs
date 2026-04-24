import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";

type HeroAction = {
  label: string;
  href: string;
  variant?: "solid" | "outline";
};

type PageHeroProps = {
  kicker: string;
  title: string;
  description: string;
  actions?: HeroAction[];
  aside?: ReactNode;
  image?: string;
};

export default function PageHero({ kicker, title, description, actions = [], aside, image }: PageHeroProps) {
  return (
    <section className="site-shell">
      <div className="rainbow-panel relative overflow-hidden px-6 py-12 text-slate-950 sm:px-8 md:px-12 md:py-16">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,170,95,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(92,153,255,0.2),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(84,211,177,0.14),transparent_26%)]" />
        {image ? (
          <div className="absolute inset-y-0 right-0 hidden w-[42%] overflow-hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-l from-white/5 via-white/40 to-white" />
            <Image src={image} alt={title} fill className="object-cover opacity-88 mix-blend-multiply" priority />
          </div>
        ) : null}

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="max-w-3xl">
            <div className="section-kicker">{kicker}</div>
            <h1 className="heading-display mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{description}</p>
            {actions.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {actions.map((action) => (
                  <ButtonLink key={action.href} href={action.href} variant={action.variant ?? "solid"} size="lg">
                    {action.label}
                  </ButtonLink>
                ))}
              </div>
            ) : null}
          </div>

          {aside ? <div className="relative z-10 self-end">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
