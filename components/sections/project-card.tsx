import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

type ProjectCardProps = {
  project: {
    title: string;
    category: string;
    description: string;
    heroImage: string;
    href: string;
    tags?: string[];
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="glass-card overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        <Image src={project.heroImage} alt={project.title} fill className="object-cover transition duration-500 hover:scale-105" />
      </div>
      <div className="space-y-5 p-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
            {project.category}
          </span>
          {project.tags?.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              {tag}
            </span>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-950">{project.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{project.description}</p>
        </div>
        <ButtonLink href={project.href} variant="outline" className="group">
          查看详情
          <ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </ButtonLink>
      </div>
    </article>
  );
}
