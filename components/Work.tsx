"use client";

import { useRef } from "react";
import ProjectCard, { type ProjectData } from "./ProjectCard";
import TimelineLine from "./TimelineLine";

const PROJECTS: ProjectData[] = [
  {
    file: "chatter.tsx",
    tag: "AltSchool Africa Capstone · solo · 10 days",
    desc: "A text-first publishing platform. Rich-text editor with autosave, OAuth, row-level security, a realtime feed, and a creator analytics dashboard.",
    added: ["Next.js 15", "TypeScript", "Supabase", "Tiptap", "Recharts"],
    removed: ["templates", "guesswork"],
    href: "#",
    url: "chatter.vercel.app",
    accent: "green",
    imageAlt: "Chatter app screenshot",
    mediaHint: "screenshot, GIF, or a 15–20s recording of the feed / editor / analytics dashboard",
  },
  {
    file: "aiesec/conference-site.tsx",
    tag: "AIESEC in Nigeria · national conference",
    desc: "Registration and schedule site built for a national AIESEC conference — built to hold up under real, simultaneous sign-up traffic on the day.",
    added: ["React", "Responsive UI", "Deadline-driven build"],
    removed: ["static PDFs", "sign-up sheets"],
    href: "#",
    url: "aiesec.ng",
    accent: "indigo",
    imageAlt: "AIESEC conference site screenshot",
    mediaHint: "screenshot of the registration flow or schedule page",
  },
  {
    file: "zheeta/App.tsx",
    tag: "De-Cloud23 Technologies · in production",
    desc: "Frontend for a class-based, affiliate-focused social platform helping Africans earn from everyday social activity and buddy events.",
    added: ["React", "TypeScript", "Tailwind CSS"],
    removed: ["idle feeds"],
    href: "#",
    url: "zheeta.com",
    accent: "amber",
    imageAlt: "Zheeta app screenshot",
    mediaHint: "screenshot of the social feed or affiliate dashboard",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="work" ref={sectionRef} className="relative max-w-[960px] mx-auto px-6 py-20">
      <TimelineLine containerRef={sectionRef} />
      <div className="flex items-baseline justify-between mb-10 sm:pl-14">
        <h2 className="text-2xl font-[800] tracking-tight">Work</h2>
        <span className="font-mono text-xs text-ink/50">{PROJECTS.length} files changed</span>
      </div>
      {PROJECTS.map((p) => (
        <ProjectCard key={p.file} project={p} />
      ))}
    </section>
  );
}
