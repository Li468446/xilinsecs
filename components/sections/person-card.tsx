import Image from "next/image";

type PersonCardProps = {
  person: {
    name: string;
    title: string;
    bio: string;
    image: string;
  };
};

export default function PersonCard({ person }: PersonCardProps) {
  return (
    <article className="glass-card overflow-hidden p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative h-28 w-28 overflow-hidden rounded-[24px] border border-white/60">
          <Image src={person.image} alt={person.name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-950">{person.name}</h3>
          <p className="mt-1 text-sm font-medium uppercase tracking-[0.16em] text-blue-700">{person.title}</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">{person.bio}</p>
        </div>
      </div>
    </article>
  );
}

