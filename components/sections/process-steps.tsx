type ProcessStepsProps = {
  steps: string[];
};

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {steps.map((step, index) => (
        <article key={step} className="glass-card p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
            Step {index + 1}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-700">{step}</p>
        </article>
      ))}
    </div>
  );
}
