"use client";

import { useDotReveal, useRevealOnScroll } from "@/lib/scrollReveal";

type Accent = "green" | "indigo" | "amber";

const ACCENT_CLASSES: Record<Accent, { dot: string; chip: string; text: string; hoverText: string; placeholder: string }> = {
  green: {
    dot: "bg-green",
    chip: "bg-green-tint text-green",
    text: "text-green",
    hoverText: "hover:text-green hover:border-green",
    placeholder: "bg-green-tint",
  },
  indigo: {
    dot: "bg-indigo",
    chip: "bg-indigo-tint text-indigo",
    text: "text-indigo",
    hoverText: "hover:text-indigo hover:border-indigo",
    placeholder: "bg-indigo-tint",
  },
  amber: {
    dot: "bg-amber",
    chip: "bg-amber-tint text-amber",
    text: "text-amber",
    hoverText: "hover:text-amber hover:border-amber",
    placeholder: "bg-amber-tint",
  },
};

export interface ProjectData {
  file: string;
  tag: string;
  desc: string;
  added: string[];
  removed: string[];
  href: string;
  url: string;
  accent: Accent;
  imageSrc?: string;
  imageAlt: string;
  mediaHint: string;
}

export default function ProjectCard({ project }: { project: ProjectData }) {
  const cardRef = useRevealOnScroll<HTMLDivElement>();
  const dotRef = useDotReveal<HTMLDivElement>();
  const c = ACCENT_CLASSES[project.accent];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[56px_1fr] mb-6">
      <div className="hidden sm:flex justify-center pt-2">
        <div ref={dotRef} className={`w-[13px] h-[13px] rounded-full ${c.dot} ring-[5px] ring-paper`} />
      </div>
      <div ref={cardRef} className="rounded-xl border border-line bg-white/60 overflow-hidden">
        {/* media slot */}
        <div className="relative aspect-video overflow-hidden" data-cursor="view">
          {project.imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.imageSrc}
              alt={project.imageAlt}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className={`absolute inset-2.5 rounded-lg border-[1.5px] border-dashed border-line flex flex-col items-center justify-center gap-2 text-center px-4 ${c.placeholder}`}>
              <b className="font-sans font-semibold text-[12.5px] text-ink/70">+ add media</b>
              <span className="font-mono text-xs text-ink/45">{project.mediaHint}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-ink/[0.03] border-y border-line">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-ink/15" />
            <span className="w-2 h-2 rounded-full bg-ink/15" />
            <span className="w-2 h-2 rounded-full bg-ink/15" />
          </div>
          <span className="font-mono text-[11px] text-ink/45 bg-ink/[0.04] rounded px-2.5 py-0.5 flex-1 max-w-[260px] truncate">
            {project.url}
          </span>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5 border-b border-line">
          <span className="font-mono text-sm font-medium">{project.file}</span>
          <span className="font-mono text-[11px] text-ink/45">{project.tag}</span>
        </div>

        <div className="px-5 py-5">
          <p className="text-[15px] leading-relaxed text-ink/80 max-w-2xl">{project.desc}</p>
          <div className="font-mono text-[13px] mt-4 space-y-1">
            {project.added.map((a) => (
              <div key={a} className={c.text}>
                <span className="select-none">+ </span>
                {a}
              </div>
            ))}
            {project.removed.map((r) => (
              <div key={r} className="text-ink/35 line-through">
                <span className="select-none">- </span>
                {r}
              </div>
            ))}
          </div>
          <a
            href={project.href}
            className={`font-mono inline-flex items-center gap-1 text-xs mt-5 border-b border-line transition-colors ${c.hoverText}`}
          >
            view diff →
          </a>
        </div>
      </div>
    </div>
  );
}