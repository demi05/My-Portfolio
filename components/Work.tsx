"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard, { type ProjectData } from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS: ProjectData[] = [
  {
    file: "chatter.tsx",
    tag: "AltSchool Africa Capstone",
    desc: "A text-first publishing platform. Rich-text editor with autosave, OAuth, row-level security, a realtime feed, and a creator analytics dashboard.",
    added: ["Next.js 15", "TypeScript", "Supabase", "Tiptap", "Recharts"],
    removed: ["templates", "guesswork"],
    href: "https://chatter-demi.vercel.app/",
    url: "chatter-demi.vercel.app",
    accent: "green",
    imageSrc: "projects/chatter.png",
    imageAlt: "Chatter app screenshot",
  },
  {
    file: "ncAkure.tsx",
    tag: "AIESEC in Nigeria · National Conference Akure 2025",
    desc: "Registration site built for a national AIESEC conference.",
    added: ["React", "Responsive UI", "Deadline-driven build"],
    removed: ["static PDFs", "sign-up sheets"],
    href: "https://ncakure25.netlify.app/",
    url: "ncAkure25.netlify.app",
    accent: "indigo",
    imageSrc: "projects/ncAkure.png",
    imageAlt: "AIESEC conference site screenshot",
  },
  {
    file: "AiNFunctionalHub.tsx",
    tag: "AIESEC in Nigeria hub",
    desc: "A functional hub for AIESEC in Nigeria, built to give members a single place to reach the resources and tools spread across the organization's different functional areas",
    added: ["React", "JavaScript", "Tailwind CSS"],
    removed: ["scattered resource links"],
    href: "https://hub.aiesec.ng/functionalhub",
    url: "hub.aiesec.ng/functionalhub",
    accent: "amber",
    imageSrc: "projects/functionalHub.png",
    imageAlt: "Functional Hub screenshot",
  },
  {
    file: "GlobalRangeFarms.tsx",
    tag: "Global Range Farms",
    desc: "A responsive website for a premium livestock company, showcasing their products and services.",
    added: ["Next", "TypeScript", "Tailwind CSS"],
    // removed: ["scattered resource links"],
    href: "https://www.globalrangefarms.com.ng",
    url: "globalrangefarms.com.ng",
    accent: "pink",
    imageSrc: "projects/globalRangeFarms.png",
    imageAlt: "Global Range Farms screenshot",
  },
  {
    file: "IYD.tsx",
    tag: "International Youth Day 2026",
    desc: "AIESEC in Nigeria event celebrating International Youth Day 2026.",
    added: ["React", "JavaScript", "Tailwind CSS"],
    // removed: ["scattered resource links"],
    href: "https://aiesec.ng/iyd",
    url: "aiesec.ng/iyd",
    accent: "pink",
    imageSrc: "projects/iyd.png",
    imageAlt: "AIESEC IYD 2026 screenshot",
  },
];

const STICK_TOP_BASE = 84;
const STICK_TOP_STEP = 30;

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      PROJECTS.forEach((_, i) => {
        const card = cardRefs.current[i];
        const nextSticky = stickyRefs.current[i + 1];
        if (!card || !nextSticky) return;

        gsap.to(card, {
          scale: 0.94,
          opacity: 0.45,
          filter: "blur(2px)",
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: nextSticky,
            start: "top 65%",
            end: "top 18%",
            scrub: 0.3,
          },
        });
      });
    }, sectionRef);

    const clearForPrint = () => {
      gsap.set(cardRefs.current.filter(Boolean), { clearProps: "all" });
    };
    const restoreAfterPrint = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("beforeprint", clearForPrint);
    window.addEventListener("afterprint", restoreAfterPrint);

    return () => {
      ctx.revert();
      window.removeEventListener("beforeprint", clearForPrint);
      window.removeEventListener("afterprint", restoreAfterPrint);
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative max-w-[720px] mx-auto px-6 py-20">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="text-2xl font-[800] tracking-tight">Work</h2>
        <span className="font-mono text-xs text-ink/50">{PROJECTS.length} files changed</span>
      </div>

      {PROJECTS.map((p, i) => {
        const isLast = i === PROJECTS.length - 1;
        return (
          <div key={p.file} className={isLast ? "print:h-auto" : "h-[90vh] print:h-auto"}>
            <div
              ref={(el) => {
                stickyRefs.current[i] = el;
              }}
              className="sticky print:static print:mb-6"
              style={{ top: STICK_TOP_BASE + i * STICK_TOP_STEP, zIndex: i + 1 }}
            >
              <ProjectCard
                project={p}
                topOffset={STICK_TOP_BASE + i * STICK_TOP_STEP}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}