"use client";

import { forwardRef } from "react";

type Accent = "green" | "indigo" | "amber";

const ACCENT_CLASSES: Record<
  Accent,
  { bar: string; chip: string; hoverText: string; placeholder: string }
> = {
  green: {
    bar: "bg-green",
    chip: "bg-green-tint text-green",
    hoverText: "hover:text-green hover:border-green",
    placeholder: "bg-green-tint",
  },
  indigo: {
    bar: "bg-indigo",
    chip: "bg-indigo-tint text-indigo",
    hoverText: "hover:text-indigo hover:border-indigo",
    placeholder: "bg-indigo-tint",
  },
  amber: {
    bar: "bg-amber",
    chip: "bg-amber-tint text-amber",
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
}

interface ProjectCardProps {
  project: ProjectData;
  topOffset?: number;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  function ProjectCard({ project, topOffset = 84 }, ref) {
    const c = ACCENT_CLASSES[project.accent];
    const hasRealLink = project.href && project.href !== "#";

    return (
      <div
        ref={ref}
        className="rounded-xl border border-line bg-paper shadow-[0_16px_44px_-14px_rgba(23,24,26,0.32)]"
       
      >
        <div className={`h-1.5 w-full ${c.bar}`} />

        <a
          href={project.href}
          target={hasRealLink ? "_blank" : undefined}
          rel={hasRealLink ? "noopener noreferrer" : undefined}
          className="relative h-full block"
          data-cursor="view"
        >
          {project.imageSrc ? (
            <img
              src={project.imageSrc}
              alt={project.imageAlt}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div
              className={`absolute inset-2.5 rounded-lg border-[1.5px] border-dashed border-line flex flex-col items-center justify-center gap-2 text-center px-4 ${c.placeholder}`}
            >
              <b className="font-sans font-semibold text-[12.5px] text-ink/70">+ add media</b>
              {/* {project.mediaHint && (
                <span className="font-mono text-xs text-ink/45">{project.mediaHint}</span>
              )} */}
            </div>
          )}
        </a>

        {/* fake browser bar — the URL itself is a real link to the project */}
        <div className="flex items-center gap-2 px-3.5 py-2 bg-ink/[0.03] border-y border-line">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-ink/15" />
            <span className="w-2 h-2 rounded-full bg-ink/15" />
            <span className="w-2 h-2 rounded-full bg-ink/15" />
          </div>
          <a
            href={project.href}
            target={hasRealLink ? "_blank" : undefined}
            rel={hasRealLink ? "noopener noreferrer" : undefined}
            className={`font-mono text-[11px] text-ink/45 bg-ink/[0.04] rounded px-2.5 py-0.5 flex-1 max-w-[260px] truncate hover:text-ink transition-colors ${
              hasRealLink ? "underline decoration-ink/20 hover:decoration-current" : ""
            }`}
          >
            {project.url}
          </a>
        </div>

        <div className="flex items-center justify-between px-5 py-2.5 border-b border-line">
          <span className="font-mono text-sm font-medium">{project.file}</span>
          <span className="font-mono text-[11px] text-ink/45">{project.tag}</span>
        </div>

        <div className="px-5 py-4">
          <p className="text-[14.5px] leading-relaxed text-ink/80 line-clamp-2">
            {project.desc}
          </p>

          {/* tech stack as compact wrapped chips instead of one row per
              item — this is what actually buys back the vertical space */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.added.map((a) => (
              <span
                key={a}
                className={`font-mono text-[11px] px-2 py-0.5 rounded-full ${c.chip}`}
              >
                + {a}
              </span>
            ))}
            {project.removed.map((r) => (
              <span
                key={r}
                className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-ink/[0.04] text-ink/35 line-through"
              >
                - {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default ProjectCard;