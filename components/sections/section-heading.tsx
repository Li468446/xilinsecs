type SectionHeadingProps = {
  kicker?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {kicker ? <div className="section-kicker">{kicker}</div> : null}
      <h2 className="heading-display mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">{description}</p> : null}
    </div>
  );
}

